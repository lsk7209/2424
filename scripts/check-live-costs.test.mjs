import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseTursoUsage, parseVercelUsage, evaluateTokenExpiry, readTursoUsage } from './check-live-costs.mjs';

const usage = { rows_read: 855000000, rows_written: 0, storage_bytes: 120000, bytes_synced: 0 };
test('Turso current usage and legacy total preserve real values and zero', () => {
  assert.deepEqual(parseTursoUsage({ database: { usage } }), usage);
  assert.deepEqual(parseTursoUsage({ database: { total: usage } }), usage);
  const zeros = Object.fromEntries(Object.keys(usage).map(key => [key, 0]));
  assert.deepEqual(parseTursoUsage({ database: { usage: zeros } }), zeros);
  assert.equal(parseTursoUsage({ database: { usage: { ...usage, rows_read: '855000000' } } }).rows_read, 855000000);
});
test('Turso absent, malformed and unsafe counters cannot become zero', () => {
  for (const body of [{}, null, { database: {} }, { database: { usage: null, total: usage } }]) {
    assert.throws(() => parseTursoUsage(body));
  }
  for (const key of Object.keys(usage)) {
    for (const bad of [undefined, null, '', ' ', false, true, [], {}, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '9007199254740993']) {
      assert.throws(() => parseTursoUsage({ database: { usage: { ...usage, [key]: bad } } }), `${key}: ${String(bad)}`);
    }
  }
});
test('Vercel billed cost is validated separately from effective cost', () => {
  assert.deepEqual(parseVercelUsage({ totals: { billedCost: 0, effectiveCost: 42 } }), { billedCost: 0, effectiveCost: 42 });
  assert.deepEqual(parseVercelUsage({ grandTotal: { billed_cost: '39.03' } }), { billedCost: 39.03, effectiveCost: undefined });
  for (const totals of [{}, { effectiveCost: 42 }, { cost: 42 }, { billedCost: '' }, { billedCost: -1 }, { billedCost: null }, { billedCost: false }, { billedCost: Infinity }, { billedCost: 1, effectiveCost: 'invalid' }]) {
    assert.throws(() => parseVercelUsage({ totals }));
  }
  assert.throws(() => parseVercelUsage(null));
});

function runTurso(body, overrides = {}, status = 200, prelude = "") {
  const script = fileURLToPath(new URL('./check-live-costs.mjs', import.meta.url));
  const code = `globalThis.fetch = async (_url, options) => {
    if (!(options.signal instanceof AbortSignal)) throw new Error('Missing timeout signal');
    return { ok: ${status === 200}, status: ${status}, json: async () => (${JSON.stringify(body)}) };
  }; ${prelude} process.argv[1] = ${JSON.stringify(script)}; await import(${JSON.stringify(new URL('./check-live-costs.mjs', import.meta.url).href)});`;
  return spawnSync(process.execPath, ['--input-type=module', '-e', code], {
    encoding: 'utf8', timeout: 10000,
    env: { ...process.env, GITHUB_STEP_SUMMARY: '', GITHUB_ACTIONS: '', RUN_VERCEL_LIVE_CHECK: '0', RUN_TURSO_LIVE_CHECK: '1', REQUIRE_LIVE_COST_SECRETS: '0', TURSO_API_TOKEN: 'fixture', TURSO_ORG_SLUG: 'fixture', TURSO_DATABASES: 'fixture', TURSO_ROWS_READ_WARN: '900000000', TURSO_ROWS_READ_FAIL: '1000000000', TURSO_ROWS_WRITTEN_WARN: '', TURSO_ROWS_WRITTEN_FAIL: '', ...overrides },
  });
}
test('CLI enforces thresholds against actual usage and records valid zero writes', () => {
  const result = runTurso({ database: { usage } }, { TURSO_ROWS_READ_FAIL: '800000000' });
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /rows_read 855000000, rows_written 0/);
  assert.match(result.stdout, /at or above fail threshold 800000000/);
});
test('CLI fails missing data and HTTP errors even in optional credential mode', () => {
  for (const result of [runTurso({ database: {} }), runTurso({}, {}, 401)]) {
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stdout, /Turso usage check failed/);
    assert.doesNotMatch(result.stdout, /rows_read 0/);
  }
});
test('CLI passes below budget with validated counters', () => {
  const result = runTurso({ database: { usage } });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /rows_read 855000000/);
});

test('CLI exposes missing alert budgets and fails invalid configured thresholds', () => {
  const missing = runTurso({ database: { usage } }, { TURSO_ROWS_READ_WARN: '', TURSO_ROWS_READ_FAIL: '' });
  assert.equal(missing.status, 0, missing.stderr);
  assert.match(missing.stdout, /rows_read has no configured budget threshold/);
  for (const invalid of ['invalid', '-1', 'Infinity']) {
    const result = runTurso({ database: { usage } }, { TURSO_ROWS_READ_FAIL: invalid });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stdout, /Invalid threshold TURSO_ROWS_READ_FAIL/);
  }
});
function runVercel(body, overrides = {}) {
  const script = fileURLToPath(new URL('./check-live-costs.mjs', import.meta.url));
  const code = `import cp from 'node:child_process'; import { syncBuiltinESMExports } from 'node:module';
    cp.execSync = cp.execFileSync = () => ${JSON.stringify(JSON.stringify(body))}; syncBuiltinESMExports();
    process.argv[1] = ${JSON.stringify(script)}; await import(${JSON.stringify(new URL('./check-live-costs.mjs', import.meta.url).href)});`;
  return spawnSync(process.execPath, ['--input-type=module', '-e', code], {
    encoding: 'utf8', timeout: 10000,
    env: { ...process.env, GITHUB_STEP_SUMMARY: '', GITHUB_ACTIONS: '', RUN_VERCEL_LIVE_CHECK: '1', RUN_TURSO_LIVE_CHECK: '0', REQUIRE_LIVE_COST_SECRETS: '0', VERCEL_TOKEN: 'fixture', VERCEL_BILLED_COST_WARN_USD: '30', VERCEL_BILLED_COST_FAIL_USD: '40', VERCEL_TOKEN_EXPIRES_ON: '', ...overrides },
  });
}
test('Vercel CLI never reports effective-only or malformed totals as billed zero', () => {
  for (const body of [{}, { totals: { effectiveCost: 99 } }, { totals: { billedCost: 'bad' } }]) {
    const result = runVercel(body);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stdout, /Vercel usage check failed/);
    assert.doesNotMatch(result.stdout, /billed cost 0 USD/);
  }
  const zero = runVercel({ totals: { billedCost: 0, effectiveCost: 99 } });
  assert.equal(zero.status, 0, zero.stderr);
  assert.match(zero.stdout, /billed cost 0 USD, effective cost 99 USD/);
  const over = runVercel({ totals: { billedCost: 41 } });
  assert.equal(over.status, 1, over.stderr);
  assert.match(over.stdout, /at or above fail threshold 40 USD/);
});

const zeros = { rows_read: 0, rows_written: 0, storage_bytes: 0, bytes_synced: 0 };
const ok = () => ({ ok: true, json: async () => ({ database: { usage: zeros } }) });
test('expiry is strict and uses the start of the UTC date', () => {
  const now = Date.parse('2026-09-21T00:00:00Z');
  for (const value of [undefined, '']) assert.equal(evaluateTokenExpiry(value, now).kind, 'warning');
  for (const value of ['2026-02-30', '2026-9-22', ' 2026-09-22', 'secret', '2026-09-21T23:00:00Z']) {
    const result = evaluateTokenExpiry(value, now);
    assert.equal(result.kind, 'error');
    assert.ok(!result.message.includes(value));
  }
  assert.equal(evaluateTokenExpiry('2026-09-21', now).kind, 'error');
  assert.equal(evaluateTokenExpiry('2026-10-05', now).kind, 'warning');
  assert.equal(evaluateTokenExpiry('2026-10-05', now - 1).kind, 'report');
  assert.equal(evaluateTokenExpiry('2026-09-21', now - 1).kind, 'warning');
  assert.equal(evaluateTokenExpiry('2026-10-06', now).kind, 'report');
  assert.equal(evaluateTokenExpiry('2026-10-06', now).daysRemaining, 15);
});
test('CLI expiry warning and failure do not suppress cost query; skips ignore expiry', () => {
  for (const [value, status, level] of [['', 0, 'WARNING'], ['bad-secret-value', 1, 'ERROR'], ['2000-01-01', 1, 'ERROR']]) {
    const result = runVercel({ totals: { billedCost: 0 } }, { VERCEL_TOKEN_EXPIRES_ON: value });
    assert.equal(result.status, status, result.stderr);
    assert.match(result.stdout, new RegExp('\\[' + level + '\\]'));
    assert.match(result.stdout, /billed cost 0 USD/);
    assert.doesNotMatch(result.stdout, /bad-secret-value/);
  }
  for (const overrides of [{ RUN_VERCEL_LIVE_CHECK: '0' }, { VERCEL_TOKEN: '' }]) {
    const result = runVercel({}, { VERCEL_TOKEN_EXPIRES_ON: 'bad', ...overrides });
    assert.equal(result.status, 0, result.stderr);
    assert.doesNotMatch(result.stdout, /VERCEL_TOKEN_EXPIRES_ON/);
  }
});
test('transient HTTP errors retry twice with fresh signals and recover real zero', async () => {
  const signals = [], delays = [], urls = [], retries = []; let cancelled = 0;
  const result = await readTursoUsage('https://fixture', 'secret', {
    fetch: async (_url, options) => { urls.push(String(_url)); signals.push(options.signal); return signals.length < 3
      ? { ok: false, status: 503, body: { cancel: async () => { cancelled++; } } } : ok(); },
    sleep: async ms => { delays.push(ms); }, onRetry: count => retries.push(count),
  });
  assert.deepEqual(result, zeros); assert.deepEqual(delays, [1000, 2000]);
  assert.equal(new Set(signals).size, 3); assert.equal(cancelled, 2);
  assert.deepEqual(urls, Array(3).fill("https://fixture")); assert.deepEqual(retries, [1, 2]);
});
test('retry status allowlist and exact three attempt limit', async () => {
  for (const status of [408, 429, 500, 502, 503, 504, 400, 401, 403, 404, 501]) {
    let calls = 0;
    await assert.rejects(readTursoUsage('https://fixture', 'secret', {
      fetch: async () => { calls++; return { ok: false, status }; }, sleep: async () => {},
    }), /HTTP/);
    assert.equal(calls, [408, 429, 500, 502, 503, 504].includes(status) ? 3 : 1);
  }
});
test('malformed JSON and schema never retry or disclose response text', async () => {
  for (const json of [async () => { throw new SyntaxError('secret-response'); }, async () => { throw new Error('secret-response'); }, async () => ({})]) {
    let calls = 0;
    await assert.rejects(readTursoUsage('https://fixture', 'secret', {
      fetch: async () => { calls++; return { ok: true, json }; }, sleep: async () => {},
    }), error => !error.message.includes('secret'));
    assert.equal(calls, 1);
  }
});
test('network failures and body timeouts retry, without leaking errors', async () => {
  let calls = 0;
  assert.deepEqual(await readTursoUsage('https://fixture', 'secret', {
    fetch: async () => { if (++calls < 3) throw new TypeError('secret-network'); return ok(); }, sleep: async () => {},
  }), zeros);
  calls = 0;
  await assert.rejects(readTursoUsage('https://fixture', 'secret', {
    requestTimeoutMs: 5,
    fetch: async () => { calls++; return { ok: true, json: () => new Promise(() => {}) }; },
    sleep: async () => {},
  }), /timed out/);
  assert.equal(calls, 3);
});
test('shared deadline stops retries and prevents requests for remaining databases', async () => {
  let now = 0, calls = 0;
  const options = { deadline: 1500, now: () => now,
    fetch: async () => { calls++; now += 300; throw new Error('secret'); },
    sleep: async ms => { now += ms; },
  };
  await assert.rejects(readTursoUsage('https://fixture', 'secret', options), /budget exhausted/);
  const previous = calls; now = 1500;
  await assert.rejects(readTursoUsage('https://fixture', 'secret', options), /budget exhausted/);
  assert.equal(calls, previous);
});

test('CLI reports partial failures and all databases exhausted by shared budget', () => {
  const partial = runTurso({}, { TURSO_DATABASES: 'healthy,broken' }, 200, `
    globalThis.fetch = async url => String(url).includes('/healthy/')
      ? { ok: true, json: async () => ({ database: { usage: ${JSON.stringify(zeros)} } }) }
      : { ok: false, status: 401 };
  `);
  assert.equal(partial.status, 1, partial.stderr);
  assert.match(partial.stdout, /Turso healthy: rows_read 0/);
  assert.match(partial.stdout, /failed for broken: HTTP 401/);
  const exhausted = runTurso({}, { TURSO_DATABASES: 'first,second,third' }, 200, `
    let clock = 0; Date.now = () => clock;
    globalThis.fetch = async () => { clock = 240000; throw new Error('secret-network-token'); };
  `);
  assert.equal(exhausted.status, 1, exhausted.stderr);
  for (const database of ['first', 'second', 'third']) {
    assert.match(exhausted.stdout, new RegExp('failed for ' + database + ': Turso time budget exhausted'));
  }
  assert.doesNotMatch(exhausted.stdout, /secret-network-token|rows_read 0/);
});
test('CLI reports recovered database and retry count', () => {
  const result = runTurso({}, {}, 200, `
    let calls = 0;
    globalThis.fetch = async () => ++calls < 2 ? { ok: false, status: 503 }
      : { ok: true, json: async () => ({ database: { usage: ${JSON.stringify(zeros)} } }) };
  `);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Turso fixture: recovered after 1 retry/);
  assert.match(result.stdout, /Turso fixture: rows_read 0/);
});

test('valid JSON arriving at shared deadline cannot be reported as success', async () => {
  let now = 0;
  await assert.rejects(readTursoUsage('https://fixture', 'secret', {
    deadline: 100, now: () => now,
    fetch: async () => ({ ok: true, json: async () => { now = 100; return { database: { usage: zeros } }; } }),
  }), /budget exhausted/);
});
test('request timeout covers fetch and aborts every attempt', async () => {
  const signals = [];
  await assert.rejects(readTursoUsage('https://fixture', 'secret', {
    requestTimeoutMs: 5, sleep: async () => {},
    fetch: (_url, options) => { signals.push(options.signal); return new Promise(() => {}); },
  }), /timed out/);
  assert.equal(signals.length, 3);
  assert.ok(signals.every(signal => signal.aborted));
});

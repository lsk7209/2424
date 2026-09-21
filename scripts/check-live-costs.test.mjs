import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseTursoUsage, parseVercelUsage } from './check-live-costs.mjs';

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

function runTurso(body, overrides = {}, status = 200) {
  const script = fileURLToPath(new URL('./check-live-costs.mjs', import.meta.url));
  const code = `globalThis.fetch = async (_url, options) => {
    if (!(options.signal instanceof AbortSignal)) throw new Error('Missing timeout signal');
    return { ok: ${status === 200}, status: ${status}, json: async () => (${JSON.stringify(body)}) };
  }; process.argv[1] = ${JSON.stringify(script)}; await import(${JSON.stringify(new URL('./check-live-costs.mjs', import.meta.url).href)});`;
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
function runVercel(body) {
  const script = fileURLToPath(new URL('./check-live-costs.mjs', import.meta.url));
  const code = `import cp from 'node:child_process'; import { syncBuiltinESMExports } from 'node:module';
    cp.execSync = cp.execFileSync = () => ${JSON.stringify(JSON.stringify(body))}; syncBuiltinESMExports();
    process.argv[1] = ${JSON.stringify(script)}; await import(${JSON.stringify(new URL('./check-live-costs.mjs', import.meta.url).href)});`;
  return spawnSync(process.execPath, ['--input-type=module', '-e', code], {
    encoding: 'utf8', timeout: 10000,
    env: { ...process.env, GITHUB_STEP_SUMMARY: '', GITHUB_ACTIONS: '', RUN_VERCEL_LIVE_CHECK: '1', RUN_TURSO_LIVE_CHECK: '0', REQUIRE_LIVE_COST_SECRETS: '0', VERCEL_TOKEN: 'fixture', VERCEL_BILLED_COST_WARN_USD: '30', VERCEL_BILLED_COST_FAIL_USD: '40' },
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

#!/usr/bin/env node
import { execFileSync, execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const requireLiveSecrets = process.env.REQUIRE_LIVE_COST_SECRETS === "1";
const failures = [];
const warnings = [];
const reports = [];

function nonnegativeNumber(value, label, integer = false) {
  const validType = typeof value === "number" ||
    (typeof value === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value));
  const number = validType ? Number(value) : NaN;
  if (!Number.isFinite(number) || number < 0 || number > Number.MAX_SAFE_INTEGER ||
      (integer && !Number.isSafeInteger(number))) {
    throw new Error(`Invalid or missing ${label}`);
  }
  return number;
}

export function parseTursoUsage(body) {
  const database = body?.database;
  const total = database && Object.hasOwn(database, "usage") ? database.usage : database?.total;
  return Object.fromEntries(["rows_read", "rows_written", "storage_bytes", "bytes_synced"].map(
    (key) => [key, nonnegativeNumber(total?.[key], `Turso ${key}`, true)],
  ));
}

export function parseVercelUsage(body) {
  const totals = body && Object.hasOwn(body, "totals") ? body.totals : body?.grandTotal;
  const billedCost = nonnegativeNumber(totals?.billedCost ?? totals?.billed_cost, "Vercel billed cost");
  const effective = totals?.effectiveCost ?? totals?.effective_cost;
  const effectiveCost = effective === undefined ? undefined : nonnegativeNumber(effective, "Vercel effective cost");
  return { billedCost, effectiveCost };
}

export function evaluateTokenExpiry(value, now = Date.now()) {
  if (value == null || value === "") {
    return { kind: "warning", message: "VERCEL_TOKEN_EXPIRES_ON is not configured; token expiry is unknown." };
  }
  const expiry = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? Date.parse(`${value}T00:00:00.000Z`) : NaN;
  if (!Number.isFinite(expiry) || new Date(expiry).toISOString().slice(0, 10) !== value) {
    return { kind: "error", message: "Invalid VERCEL_TOKEN_EXPIRES_ON; expected a valid YYYY-MM-DD date." };
  }
  const remaining = expiry - now;
  const daysRemaining = Math.ceil(remaining / 86_400_000);
  if (remaining <= 0) {
    return { kind: "error", daysRemaining, message: `VERCEL_TOKEN_EXPIRES_ON ${value} has passed (start of date UTC); rotate the Vercel token.` };
  }
  return { kind: remaining <= 14 * 86_400_000 ? "warning" : "report", daysRemaining,
    message: `Vercel token expiry ${value}: ${daysRemaining} days remaining (start of date UTC).` };
}

const TURSO_BUDGET_MS = 240_000;
const RETRYABLE_HTTP = new Set([408, 429, 500, 502, 503, 504]);
const defaultSleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function tursoError(message, retryable = false) {
  return Object.assign(new Error(message), { retryable });
}

function cancelBody(response) {
  try { Promise.resolve(response?.body?.cancel()).catch(() => {}); } catch { /* Best effort. */ }
}

export async function readTursoUsage(url, token, options = {}) {
  const now = options.now ?? Date.now;
  const fetchUsage = options.fetch ?? globalThis.fetch;
  const sleep = options.sleep ?? defaultSleep;
  const deadline = options.deadline ?? now() + TURSO_BUDGET_MS;
  const requestTimeoutMs = Math.min(options.requestTimeoutMs ?? 30_000, 30_000);
  for (let attempt = 0; attempt < 3; attempt++) {
    const remaining = deadline - now();
    if (remaining <= 0) throw tursoError("Turso time budget exhausted.");
    const controller = new AbortController();
    let timer, response;
    const timedOut = new Promise((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        cancelBody(response);
        reject(tursoError("Turso request timed out.", true));
      }, Math.min(requestTimeoutMs, remaining));
    });
    let failure;
    try {
      return await Promise.race([timedOut, (async () => {
        try {
          response = await fetchUsage(url, { signal: controller.signal,
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
        } catch {
          throw tursoError("Turso network request failed.", true);
        }
        if (controller.signal.aborted) {
          cancelBody(response);
          throw tursoError("Turso request timed out.", true);
        }
        if (!response.ok) {
          cancelBody(response);
          throw tursoError(`HTTP ${response.status}`, RETRYABLE_HTTP.has(response.status));
        }
        let body;
        try { body = await response.json(); } catch (error) {
          cancelBody(response);
          const networkFailure = error instanceof TypeError ||
            error?.name === "AbortError" || error?.name === "TimeoutError";
          throw tursoError(networkFailure ? "Turso response read failed." : "Invalid Turso JSON response.", networkFailure);
        }
        let usage;
        try { usage = parseTursoUsage(body); } catch {
          throw tursoError("Invalid or missing Turso usage counters.");
        }
        if (now() >= deadline) throw tursoError("Turso time budget exhausted.");
        if (controller.signal.aborted) throw tursoError("Turso request timed out.", true);
        return usage;
      })()]);
    } catch (error) {
      failure = error;
    } finally {
      clearTimeout(timer);
    }
    if (now() >= deadline) throw tursoError("Turso time budget exhausted.");
    if (!failure.retryable || attempt === 2) throw failure;
    const delay = (attempt + 1) * 1000;
    if (deadline - now() <= delay) throw tursoError("Turso time budget exhausted.");
    options.onRetry?.(attempt + 1);
    await sleep(delay);
  }
}

function threshold(name, fallback) {
  const raw = process.env[name];
  if (raw == null || raw.trim() === "") return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    failures.push(`Invalid threshold ${name}; expected a nonnegative finite number.`);
    return fallback;
  }
  return value;
}

function emitNotice(kind, message) {
  const escaped = String(message).replace(/\r?\n/g, "%0A");
  if (process.env.GITHUB_ACTIONS) {
    console.log(`::${kind}::${escaped}`);
  }
  console.log(`[${kind.toUpperCase()}] ${message}`);
}

function checkThreshold(label, value, warnAt, failAt, unit = "") {
  if (!Number.isFinite(warnAt) && !Number.isFinite(failAt)) {
    warnings.push(`${label} has no configured budget threshold; usage is reported without budget alerts.`);
  }
  if (Number.isFinite(failAt) && value >= failAt) {
    failures.push(`${label} is ${value}${unit}, at or above fail threshold ${failAt}${unit}.`);
  } else if (Number.isFinite(warnAt) && value >= warnAt) {
    warnings.push(`${label} is ${value}${unit}, at or above warn threshold ${warnAt}${unit}.`);
  }
}

function checkVercelUsage() {
  if (process.env.RUN_VERCEL_LIVE_CHECK === "0") {
    reports.push("Vercel live usage check skipped by RUN_VERCEL_LIVE_CHECK=0.");
    return;
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    const message = "VERCEL_TOKEN is not configured; live Vercel usage check was skipped.";
    if (requireLiveSecrets) failures.push(message);
    else warnings.push(message);
    return;
  }

  const expiry = evaluateTokenExpiry(process.env.VERCEL_TOKEN_EXPIRES_ON);
  (expiry.kind === "error" ? failures : expiry.kind === "warning" ? warnings : reports).push(expiry.message);

  const usageArgs = ["usage", "--format", "json", "--no-color", "--non-interactive"];
  if (process.env.VERCEL_SCOPE) usageArgs.push("--scope", process.env.VERCEL_SCOPE);
  if (process.env.VERCEL_TEAM_ID) usageArgs.push("--team", process.env.VERCEL_TEAM_ID);

  let parsed;
  try {
    const vercel = process.platform === "win32" ? "vercel.cmd" : "vercel";
    let stdout;
    try {
      stdout =
        process.platform === "win32"
          ? execSync(["vercel", ...usageArgs].map((arg) => `"${String(arg).replace(/"/g, '\\"')}"`).join(" "), {
              encoding: "utf8",
              stdio: ["ignore", "pipe", "pipe"],
              timeout: 120000,
            })
          : execFileSync(vercel, usageArgs, {
              encoding: "utf8",
              stdio: ["ignore", "pipe", "pipe"],
              timeout: 120000,
            });
    } catch {
      const npxArgs = ["--yes", "vercel@latest", ...usageArgs];
      stdout =
        process.platform === "win32"
          ? execSync(["npx", ...npxArgs].map((arg) => `"${String(arg).replace(/"/g, '\\"')}"`).join(" "), {
              encoding: "utf8",
              stdio: ["ignore", "pipe", "pipe"],
              timeout: 120000,
            })
          : execFileSync("npx", npxArgs, {
              encoding: "utf8",
              stdio: ["ignore", "pipe", "pipe"],
              timeout: 120000,
            });
    }
    parsed = JSON.parse(stdout);
  } catch (error) {
    failures.push("Vercel usage check failed: CLI execution or JSON decoding failed. Verify credentials and CLI response.");
    return;
  }

  let usage;
  try {
    usage = parseVercelUsage(parsed);
  } catch (error) {
    failures.push(`Vercel usage check failed: ${error.message}`);
    return;
  }
  const { billedCost, effectiveCost } = usage;
  reports.push(`Vercel usage: billed cost ${billedCost} USD` +
    (effectiveCost === undefined ? "." : `, effective cost ${effectiveCost} USD.`));
  checkThreshold(
    "Vercel billed cost",
    billedCost,
    threshold("VERCEL_BILLED_COST_WARN_USD", Number.POSITIVE_INFINITY),
    threshold("VERCEL_BILLED_COST_FAIL_USD", Number.POSITIVE_INFINITY),
    " USD",
  );
}

function currentRepoUsesTurso() {
  const packagePath = path.join(process.cwd(), "package.json");
  if (!existsSync(packagePath)) return false;
  try {
    const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    return Boolean(deps["@libsql/client"] || deps["drizzle-orm"]);
  } catch {
    return false;
  }
}

async function checkTursoUsage() {
  if (process.env.RUN_TURSO_LIVE_CHECK === "0") {
    reports.push("Turso live usage check skipped by RUN_TURSO_LIVE_CHECK=0.");
    return;
  }

  const tursoExpected =
    process.env.RUN_TURSO_LIVE_CHECK === "1" || process.env.TURSO_EXPECTED === "1" || currentRepoUsesTurso();
  const token = process.env.TURSO_API_TOKEN;
  const organization = process.env.TURSO_ORG_SLUG;
  const databases = (process.env.TURSO_DATABASES || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const idleDatabases = new Set((process.env.TURSO_IDLE_DATABASES || "")
    .split(",").map(value => value.trim()).filter(Boolean));
  const unmonitoredIdleDatabases = [...idleDatabases].filter(database => !databases.includes(database));
  if (unmonitoredIdleDatabases.length > 0) {
    for (const database of unmonitoredIdleDatabases) {
      failures.push(`Invalid TURSO_IDLE_DATABASES: ${database} is not listed in TURSO_DATABASES.`);
    }
    return;
  }

  if (!token || !organization || databases.length === 0) {
    const missing = [
      !token && "TURSO_API_TOKEN",
      !organization && "TURSO_ORG_SLUG",
      databases.length === 0 && "TURSO_DATABASES",
    ].filter(Boolean);
    const message = `${missing.join(", ")} not configured; live Turso usage check was skipped.`;
    if (requireLiveSecrets && tursoExpected) failures.push(message);
    else warnings.push(message);
    return;
  }

  const to = new Date();
  const from = new Date(to.getTime() - 24 * 60 * 60 * 1000);

  const deadline = Date.now() + TURSO_BUDGET_MS;
  for (const database of databases) {
    const url = new URL(
      `https://api.turso.tech/v1/organizations/${encodeURIComponent(organization)}/databases/${encodeURIComponent(database)}/usage`,
    );
    url.searchParams.set("from", from.toISOString());
    url.searchParams.set("to", to.toISOString());

    let usage;
    let retries = 0;
    try {
      usage = await readTursoUsage(url, token, { deadline, onRetry: count => { retries = count; } });
    } catch (error) {
      const message = `Turso usage check failed for ${database}: ${error.message}`;
      failures.push(message);
      continue;
    }

    if (retries > 0) reports.push(`Turso ${database}: recovered after ${retries} ${retries === 1 ? "retry" : "retries"}.`);
    const { rows_read: rowsRead, rows_written: rowsWritten,
      storage_bytes: storageBytes, bytes_synced: bytesSynced } = usage;
    reports.push(
      `Turso ${database}: rows_read ${rowsRead}, rows_written ${rowsWritten}, storage_bytes ${storageBytes}, bytes_synced ${bytesSynced}.`,
    );
    if (idleDatabases.has(database)) {
      reports.push(`Turso ${database} idle-write guard active (warn on any writes).`);
      if (rowsWritten > 0) {
        warnings.push(`Turso ${database} is configured idle, but rows_written is ${rowsWritten} in the last 24 hours; check unexpected writes.`);
      }
    }

    checkThreshold(
      `Turso ${database} rows_read`,
      rowsRead,
      threshold("TURSO_ROWS_READ_WARN", Number.POSITIVE_INFINITY),
      threshold("TURSO_ROWS_READ_FAIL", Number.POSITIVE_INFINITY),
    );
    checkThreshold(
      `Turso ${database} rows_written`,
      rowsWritten,
      threshold("TURSO_ROWS_WRITTEN_WARN", Number.POSITIVE_INFINITY),
      threshold("TURSO_ROWS_WRITTEN_FAIL", Number.POSITIVE_INFINITY),
    );
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log("# Live Cost Watch");
  checkVercelUsage();
  await checkTursoUsage();

  for (const report of reports) console.log(`- ${report}`);
  for (const warning of warnings) emitNotice("warning", warning);
  for (const failure of failures) emitNotice("error", failure);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = [
      "# Live Cost Watch",
      "",
      ...reports.map((line) => `- ${line}`),
      ...warnings.map((line) => `- Warning: ${line}`),
      ...failures.map((line) => `- Error: ${line}`),
      "",
    ];
    await import("node:fs").then(({ appendFileSync }) => appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join("\n")));
  }

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

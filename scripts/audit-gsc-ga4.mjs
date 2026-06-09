import { existsSync, readFileSync } from "node:fs";
import { getArgValue, getSiteConfig } from "./seo-utils.mjs";

const site = getSiteConfig();
const gscDataPath = getArgValue("--gsc-data", "D:/tools/gsc/data.json");
const gscDomainPath = getArgValue("--gsc-domain", ".gsc-domain");
const googleKeyPath = getArgValue("--google-key", "D:/env/cursorai-451704-85a5abbe8eeb.json");
const expectedMeasurementId = getArgValue("--ga4-measurement", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-N2V7ZZP184");
const gaPropertyId = getArgValue("--ga4-property", process.env.GA4_PROPERTY_ID ?? site.gaPropertyId ?? "");
const siteUrl = normalizeUrl(readOptional(gscDomainPath) || site.url);

const gscSummary = getGscSummary(gscDataPath, siteUrl);
const ga4Api = gaPropertyId ? await getGa4ApiSummary(gaPropertyId, googleKeyPath) : null;
const ga4Summary = {
  measurementId: site.gaMeasurementId,
  expectedMeasurementId,
  measurementMatches: site.gaMeasurementId === expectedMeasurementId,
  propertyId: gaPropertyId || null,
  apiCheck: ga4Api?.status ?? "skipped: GA4_PROPERTY_ID missing",
  api: ga4Api,
  eventNames: ["page_view", "tool_used", "cta_clicked", "content_read_complete"],
};

console.log(
  JSON.stringify(
    {
      site: siteUrl,
      gsc: gscSummary,
      ga4: ga4Summary,
    },
    null,
    2,
  ),
);

function getGscSummary(path, targetSite) {
  if (!existsSync(path)) {
    return {
      status: "missing",
      dataPath: path,
      message: "Run D:/tools/gsc/run.py --collect-only and --analyze-only first.",
    };
  }

  const data = JSON.parse(readFileSync(path, "utf8"));
  const candidates = [targetSite, ensureTrailingSlash(targetSite), stripTrailingSlash(targetSite)];
  const key = candidates.find((candidate) => data[candidate]);
  if (!key) {
    return {
      status: "not_found",
      dataPath: path,
      availableSites: Object.keys(data).length,
    };
  }

  const siteData = data[key];
  const pages = siteData.pages ?? [];
  const queries = siteData.queries ?? [];
  const topPages = pages.slice(0, 10).map(toMetricItem);
  const opportunities = pages
    .filter((item) => item.impressions >= 5 && item.position <= 10 && item.ctr < 0.05)
    .slice(0, 10)
    .map(toMetricItem);

  return {
    status: "ok",
    property: key,
    period: siteData.period ?? null,
    pages: pages.length,
    queries: queries.length,
    topPages,
    lowCtrCandidates: opportunities,
  };
}

function toMetricItem(item) {
  return {
    target: item.keys?.[0] ?? "",
    clicks: item.clicks ?? 0,
    impressions: item.impressions ?? 0,
    ctr: Math.round((item.ctr ?? 0) * 10000) / 100,
    position: Math.round((item.position ?? 0) * 10) / 10,
  };
}

function readOptional(path) {
  if (!existsSync(path)) return "";
  return readFileSync(path, "utf8").trim();
}

function normalizeUrl(value) {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://${value}`;
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

async function getGa4ApiSummary(propertyId, keyPath) {
  if (!existsSync(keyPath)) {
    return {
      status: "skipped: google service account key missing",
      keyPath,
    };
  }

  try {
    const accessToken = await getGoogleAccessToken(keyPath);
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        limit: 10,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      return {
        status: `failed: GA4 Data API ${response.status}`,
        propertyId,
        detail: text.slice(0, 500),
      };
    }

    const data = JSON.parse(text);
    return {
      status: "ok",
      propertyId,
      rows: (data.rows ?? []).map((row) => ({
        eventName: row.dimensionValues?.[0]?.value ?? "",
        eventCount: Number(row.metricValues?.[0]?.value ?? 0),
      })),
    };
  } catch (error) {
    return {
      status: "failed: GA4 Data API exception",
      propertyId,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function getGoogleAccessToken(keyPath) {
  const key = JSON.parse(readFileSync(keyPath, "utf8"));
  const jwt = await createServiceAccountJwt(key, "https://www.googleapis.com/auth/analytics.readonly");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google token failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createServiceAccountJwt(key, scope) {
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const claim = base64Url(
    JSON.stringify({
      iss: key.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const data = `${header}.${claim}`;
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(key.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(data));
  return `${data}.${base64Url(signature)}`;
}

function pemToArrayBuffer(pem) {
  const base64 = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  return Uint8Array.from(Buffer.from(base64, "base64")).buffer;
}

function base64Url(value) {
  const buffer =
    typeof value === "string"
      ? Buffer.from(value)
      : Buffer.from(value instanceof ArrayBuffer ? new Uint8Array(value) : value);
  return buffer.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

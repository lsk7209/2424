import { existsSync, readFileSync } from "node:fs";
import { getArgValue, getSiteConfig, hasFlag } from "./seo-utils.mjs";

const site = getSiteConfig();
const siteUrl = getArgValue("--site", site.url).replace(/\/$/, "");
const sitemapUrl = getArgValue("--sitemap", `${siteUrl}/sitemap.xml`);
const googleKeyPath = getArgValue("--google-key", process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ?? "D:/env/gsc_credentials.json");
const shouldSubmit = hasFlag("--submit");

if (!existsSync(googleKeyPath)) {
  throw new Error(`Google service account key is missing: ${googleKeyPath}`);
}

const accessToken = await getGoogleAccessToken(googleKeyPath, "https://www.googleapis.com/auth/webmasters");
const sites = await listSites(accessToken);
const propertyUrl = selectProperty(sites, siteUrl);

console.log(`GSC property: ${propertyUrl}`);
console.log(`Sitemap: ${sitemapUrl}`);

if (shouldSubmit) {
  await submitSitemap(accessToken, propertyUrl, sitemapUrl);
  console.log("submit: ok");
} else {
  console.log("dry-run only. Add --submit to submit the sitemap to Search Console.");
}

const sitemap = await getSitemap(accessToken, propertyUrl, sitemapUrl);
console.log(JSON.stringify(summarizeSitemap(sitemap), null, 2));

function selectProperty(siteEntries, targetSiteUrl) {
  const host = new URL(targetSiteUrl).hostname.replace(/^www\./, "");
  const candidates = [
    `sc-domain:${host}`,
    `${targetSiteUrl}/`,
    targetSiteUrl,
    `https://www.${host}/`,
    `https://www.${host}`,
  ];

  const found = candidates.find((candidate) => siteEntries.some((entry) => entry.siteUrl === candidate));
  if (found) {
    return found;
  }

  const available = siteEntries.map((entry) => entry.siteUrl).join(", ");
  throw new Error(`No matching GSC property for ${targetSiteUrl}. Available properties: ${available || "(none)"}`);
}

async function listSites(accessToken) {
  const response = await googleFetch(accessToken, "https://www.googleapis.com/webmasters/v3/sites");
  const data = await response.json();
  return data.siteEntry ?? [];
}

async function submitSitemap(accessToken, propertyUrl, feedpath) {
  const response = await googleFetch(
    accessToken,
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(propertyUrl)}/sitemaps/${encodeURIComponent(feedpath)}`,
    { method: "PUT" },
  );
  await response.text();
}

async function getSitemap(accessToken, propertyUrl, feedpath) {
  const response = await googleFetch(
    accessToken,
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(propertyUrl)}/sitemaps/${encodeURIComponent(feedpath)}`,
  );
  return response.json();
}

function summarizeSitemap(sitemap) {
  const errors = Number(sitemap.errors ?? 0);
  const warnings = Number(sitemap.warnings ?? 0);
  return {
    path: sitemap.path,
    type: sitemap.type ?? null,
    isPending: Boolean(sitemap.isPending),
    lastSubmitted: sitemap.lastSubmitted ?? null,
    lastDownloaded: sitemap.lastDownloaded ?? null,
    warnings,
    errors,
    status: errors === 0 && warnings === 0 ? "success_or_pending_green_candidate" : "needs_attention",
    contents: (sitemap.contents ?? []).map((item) => ({
      type: item.type,
      submitted: item.submitted ?? null,
      indexed: item.indexed ?? null,
    })),
  };
}

async function googleFetch(accessToken, url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Search Console API failed: ${response.status} ${await response.text()}`);
  }

  return response;
}

async function getGoogleAccessToken(keyPath, scope) {
  const key = JSON.parse(readFileSync(keyPath, "utf8"));
  const jwt = await createServiceAccountJwt(key, scope);
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

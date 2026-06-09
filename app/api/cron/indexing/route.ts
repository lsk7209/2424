import crypto from "crypto";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const INDEXNOW_KEY = "4f8c2e1b9a6d4c37b2e1f9a8c6d5e3b0";
const GSC_INDEXING_LIMIT = 10;
// Slightly wider than the 5h cron interval to catch any timing drift
const PUBLISH_WINDOW_MS = 6 * 60 * 60 * 1000;
const FALLBACK_LIMIT = 5;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://searchadvisor.naver.com/indexnow",
] as const;
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters";

type SitemapUrl = {
  loc: string;
  lastmod: string;
};

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  token_uri: string;
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sitemap = await fetch(new URL("/sitemap.xml", siteConfig.url), {
    cache: "no-store",
    headers: { "user-agent": "today2424-indexing-cron/1.0" },
  });

  if (!sitemap.ok) {
    return Response.json({ ok: false, error: `sitemap ${sitemap.status}` }, { status: 502 });
  }

  const allUrls = extractSitemapUrls(await sitemap.text());
  const now = Date.now();

  // Pick URLs published/updated within the last 6h (newly published content)
  const newUrls = allUrls
    .filter((u) => u.lastmod && now - new Date(u.lastmod).getTime() < PUBLISH_WINDOW_MS)
    .map((u) => u.loc);

  // If nothing new, send top recent as heartbeat so the endpoint stays active
  const urls =
    newUrls.length > 0
      ? newUrls
      : allUrls
          .sort((a, b) => new Date(b.lastmod || 0).getTime() - new Date(a.lastmod || 0).getTime())
          .slice(0, FALLBACK_LIMIT)
          .map((u) => u.loc);

  const isNewContent = newUrls.length > 0;

  const [indexNowResults, googleIndexingResult, gscSitemap] = await Promise.all([
    Promise.all(INDEXNOW_ENDPOINTS.map((endpoint) => submitIndexNow(endpoint, urls))),
    submitGoogleIndexingApi(urls.slice(0, GSC_INDEXING_LIMIT)),
    submitGscSitemap(),
  ]);

  return Response.json({
    ok: true,
    newContent: isNewContent,
    submitted: urls.length,
    urls,
    endpoints: indexNowResults,
    googleIndexingApi: googleIndexingResult,
    gscSitemap,
  });
}

function extractSitemapUrls(xml: string): SitemapUrl[] {
  return Array.from(
    xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:[\s\S]*?<lastmod>([^<]+)<\/lastmod>)?/g),
  ).map((match) => ({
    loc: decodeXml(match[1]),
    lastmod: match[2] ? decodeXml(match[2]) : "",
  }));
}

async function submitIndexNow(endpoint: string, urls: string[]) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      host: new URL(siteConfig.url).host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  return { endpoint, status: response.status, ok: response.ok };
}

function createJwt(
  credentials: ServiceAccountCredentials,
  scope = "https://www.googleapis.com/auth/indexing",
): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      iss: credentials.client_email,
      scope,
      aud: credentials.token_uri,
      exp: now + 3600,
      iat: now,
    }),
  ).toString("base64url");

  const signingInput = `${header}.${payload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signingInput);
  const signature = sign.sign(credentials.private_key, "base64url");

  return `${signingInput}.${signature}`;
}

async function getGoogleAccessToken(
  credentials: ServiceAccountCredentials,
  scope = "https://www.googleapis.com/auth/indexing",
): Promise<string> {
  const jwt = createJwt(credentials, scope);
  const response = await fetch(credentials.token_uri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = (await response.json()) as { access_token?: string; error?: string };
  if (!data.access_token) {
    throw new Error(`token error: ${data.error ?? "unknown"}`);
  }
  return data.access_token;
}

async function submitGoogleIndexingApi(urls: string[]) {
  const rawKey = process.env.GOOGLE_INDEXING_SA_KEY;
  if (!rawKey) {
    return { skipped: true, reason: "GOOGLE_INDEXING_SA_KEY not set" };
  }

  let credentials: ServiceAccountCredentials;
  try {
    credentials = JSON.parse(rawKey) as ServiceAccountCredentials;
  } catch {
    return { skipped: true, reason: "invalid JSON in GOOGLE_INDEXING_SA_KEY" };
  }

  let accessToken: string;
  try {
    accessToken = await getGoogleAccessToken(credentials);
  } catch (err) {
    return { skipped: true, reason: String(err) };
  }

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url, type: "URL_UPDATED" }),
      });
      return { url, status: response.status, ok: response.ok };
    }),
  );

  return {
    submitted: urls.length,
    results: results.map((r) => (r.status === "fulfilled" ? r.value : { error: String(r.reason) })),
  };
}

async function submitGscSitemap() {
  const key = getGoogleServiceAccountKey();
  if (!key) {
    return {
      ok: false,
      skipped: "missing_google_service_account_json",
    };
  }

  try {
    const sitemapUrl = `${siteConfig.url}/sitemap.xml`;
    const accessToken = await getGoogleAccessToken(key, GSC_SCOPE);
    const sites = await googleJson<{ siteEntry?: Array<{ siteUrl: string }> }>(
      accessToken,
      "https://www.googleapis.com/webmasters/v3/sites",
    );
    const propertyUrl = selectGscProperty(sites.siteEntry ?? []);

    await googleRequest(
      accessToken,
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(propertyUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
      { method: "PUT" },
    );

    const sitemapStatus = await googleJson<Record<string, unknown>>(
      accessToken,
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(propertyUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    );

    return {
      ok: true,
      propertyUrl,
      sitemapUrl,
      errors: Number(sitemapStatus.errors ?? 0),
      warnings: Number(sitemapStatus.warnings ?? 0),
      isPending: Boolean(sitemapStatus.isPending),
      lastSubmitted: sitemapStatus.lastSubmitted ?? null,
      lastDownloaded: sitemapStatus.lastDownloaded ?? null,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function getGoogleServiceAccountKey() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;

  const json = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  const credentials = JSON.parse(json) as Partial<ServiceAccountCredentials>;
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("invalid_gsc_service_account_json");
  }

  return {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
    token_uri: credentials.token_uri ?? "https://oauth2.googleapis.com/token",
  };
}

function selectGscProperty(sites: Array<{ siteUrl: string }>) {
  const host = new URL(siteConfig.url).hostname.replace(/^www\./, "");
  const candidates = [
    `sc-domain:${host}`,
    `${siteConfig.url}/`,
    siteConfig.url,
    `https://www.${host}/`,
    `https://www.${host}`,
  ];

  const found = candidates.find((candidate) => sites.some((site) => site.siteUrl === candidate));
  if (!found) {
    throw new Error("matching_gsc_property_not_found");
  }
  return found;
}

async function googleJson<T>(accessToken: string, url: string) {
  const response = await googleRequest(accessToken, url);
  return response.json() as Promise<T>;
}

async function googleRequest(accessToken: string, url: string, init: RequestInit = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`gsc_api_${response.status}`);
  }

  return response;
}

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

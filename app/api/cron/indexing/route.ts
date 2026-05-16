import crypto from "crypto";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const INDEXNOW_KEY = "4f8c2e1b9a6d4c37b2e1f9a8c6d5e3b0";
const INDEXING_LIMIT = 20;
const GSC_INDEXING_LIMIT = 10;
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://searchadvisor.naver.com/indexnow",
] as const;

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

  const urls = extractSitemapUrls(await sitemap.text())
    .sort((a, b) => new Date(b.lastmod || 0).getTime() - new Date(a.lastmod || 0).getTime())
    .slice(0, INDEXING_LIMIT)
    .map((item) => item.loc);

  const [indexNowResults, googleIndexingResult] = await Promise.all([
    Promise.all(INDEXNOW_ENDPOINTS.map((endpoint) => submitIndexNow(endpoint, urls))),
    submitGoogleIndexingApi(urls.slice(0, GSC_INDEXING_LIMIT)),
  ]);

  return Response.json({
    ok: true,
    submitted: urls.length,
    endpoints: indexNowResults,
    googleIndexingApi: googleIndexingResult,
  });
}

function extractSitemapUrls(xml: string): SitemapUrl[] {
  return Array.from(xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:[\s\S]*?<lastmod>([^<]+)<\/lastmod>)?/g)).map(
    (match) => ({
      loc: decodeXml(match[1]),
      lastmod: match[2] ? decodeXml(match[2]) : "",
    }),
  );
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

  return {
    endpoint,
    status: response.status,
    ok: response.ok,
  };
}


function createJwt(credentials: ServiceAccountCredentials): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
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

async function getGoogleAccessToken(credentials: ServiceAccountCredentials): Promise<string> {
  const jwt = createJwt(credentials);
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

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

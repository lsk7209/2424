import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const INDEXNOW_KEY = "4f8c2e1b9a6d4c37b2e1f9a8c6d5e3b0";
const INDEXING_LIMIT = 20;
const INDEXNOW_ENDPOINTS = [
  "https://www.bing.com/indexnow",
  "https://searchadvisor.naver.com/indexnow",
] as const;

type SitemapUrl = {
  loc: string;
  lastmod: string;
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

  const results = await Promise.all(INDEXNOW_ENDPOINTS.map((endpoint) => submitIndexNow(endpoint, urls)));

  return Response.json({
    ok: true,
    submitted: urls.length,
    endpoints: results,
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

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

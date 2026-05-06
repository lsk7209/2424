import { readFileSync } from "node:fs";

const DEFAULT_TIMEOUT_MS = 15000;

export function getSiteConfig() {
  const source = readFileSync("lib/site.ts", "utf8");
  const getString = (key, fallback = "") => {
    const match = source.match(new RegExp(`${key}:\\s*"([^"]+)"`));
    return match?.[1] ?? fallback;
  };

  return {
    name: getString("name", "이사독립"),
    url: getString("url", "https://www.today2424.kr"),
    description: getString(
      "description",
      "이사 준비, 전세 계약 점검, 체크리스트, 계산기를 제공하는 한국어 주거 정보 사이트",
    ),
    adsensePublisherId: getString("adsensePublisherId", "ca-pub-3050601904412736"),
    gaMeasurementId: getString("gaMeasurementId", "G-N2V7ZZP184"),
  };
}

export function getArgValue(name, fallback = "") {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    return fallback;
  }
  return process.argv[index + 1];
}

export function hasFlag(name) {
  return process.argv.includes(name);
}

export function toAbsoluteUrl(siteUrl, path) {
  return new URL(path, siteUrl).toString();
}

export async function fetchText(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "today2424-seo-audit/1.0",
      },
    });

    const text = await response.text();
    return { ok: response.ok, status: response.status, url: response.url, text };
  } finally {
    clearTimeout(timeout);
  }
}

export function extractSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:[\s\S]*?<lastmod>([^<]+)<\/lastmod>)?/g)).map(
    (match) => ({
      loc: decodeXml(match[1]),
      lastmod: match[2] ? decodeXml(match[2]) : "",
    }),
  );
}

export function extractHtmlMeta(html) {
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "");
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    "";
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? "";
  const h1Count = (html.match(/<h1(\s|>)/gi) ?? []).length;
  const hasAdsenseScript = html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
  const hasAdsenseAccount = html.includes('name="google-adsense-account"');
  const hasGa = html.includes("googletagmanager.com/gtag/js");

  return {
    title,
    description: decodeHtml(description.trim()),
    canonical,
    h1Count,
    hasAdsenseScript,
    hasAdsenseAccount,
    hasGa,
  };
}

export function classifyPath(pathname) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/blog/")) return "blog";
  if (pathname.startsWith("/guide/")) return "guide";
  if (pathname.startsWith("/tools/")) return "tool";
  if (pathname === "/blog" || pathname === "/guide" || pathname === "/tools") return "index";
  return "page";
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function decodeHtml(value) {
  return decodeXml(value).replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

import {
  extractHtmlMeta,
  extractSitemapUrls,
  fetchText,
  getArgValue,
  getSiteConfig,
  toAbsoluteUrl,
} from "./seo-utils.mjs";

const site = getSiteConfig();
const siteUrl = getArgValue("--site", site.url).replace(/\/$/, "");
const canonicalSiteUrl = site.url.replace(/\/$/, "");
const limit = Number(getArgValue("--limit", "0"));
const errors = [];
const warnings = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

const robots = await fetchText(toAbsoluteUrl(siteUrl, "/robots.txt"));
check(robots.ok, `robots.txt fetch failed: ${robots.status}`);
if (robots.ok) {
  check(
    robots.text.includes(`Sitemap: ${canonicalSiteUrl}/sitemap.xml`) || robots.text.includes(`Sitemap: ${siteUrl}/sitemap.xml`),
    "robots.txt sitemap URL does not match canonical site URL",
  );
  check(robots.text.includes("User-Agent: Yeti"), "robots.txt does not explicitly allow Yeti");
  check(robots.text.includes("User-Agent: Daumoa"), "robots.txt does not explicitly allow Daumoa");
  check(robots.text.includes("User-Agent: GPTBot"), "robots.txt does not explicitly allow AI crawlers");
  check(robots.text.includes("User-Agent: Bytespider") && robots.text.includes("Disallow: /"), "robots.txt should block Bytespider");
}

const ads = await fetchText(toAbsoluteUrl(siteUrl, "/ads.txt"));
check(ads.ok, `ads.txt fetch failed: ${ads.status}`);
if (ads.ok) {
  check(ads.text.includes("google.com, pub-3050601904412736, DIRECT"), "ads.txt does not contain the expected AdSense publisher row");
}

const sitemap = await fetchText(toAbsoluteUrl(siteUrl, "/sitemap.xml"));
check(sitemap.ok, `sitemap.xml fetch failed: ${sitemap.status}`);
const sitemapUrls = sitemap.ok ? extractSitemapUrls(sitemap.text) : [];
check(sitemapUrls.length > 0, "sitemap.xml has no URLs");

const urlsToCheck = limit > 0 ? sitemapUrls.slice(0, limit) : sitemapUrls;
let checked = 0;

for (const item of urlsToCheck) {
  const response = await fetchText(item.loc);
  check(response.ok, `page fetch failed: ${response.status} ${item.loc}`);
  if (!response.ok) continue;

  checked += 1;
  const meta = extractHtmlMeta(response.text);
  const pathname = new URL(item.loc).pathname;
  const isHtmlPage = !["/sitemap.xml", "/robots.txt", "/rss.xml"].includes(pathname);

  if (isHtmlPage) {
    check(meta.title.length > 0, `missing title: ${item.loc}`);
    check(meta.description.length > 0, `missing description: ${item.loc}`);
    const expectedCanonical = new URL(pathname, canonicalSiteUrl).toString();
    check(normalizeUrl(meta.canonical) === normalizeUrl(expectedCanonical), `canonical mismatch: ${item.loc} -> ${meta.canonical}`);
    check(meta.h1Count === 1, `expected exactly one h1: ${item.loc} (${meta.h1Count})`);
    warn(meta.title.length <= 44, `title may be long for Naver: ${meta.title.length} chars ${item.loc}`);
    warn(meta.description.length <= 90, `description may be long for Naver: ${meta.description.length} chars ${item.loc}`);
  }
}

const home = await fetchText(siteUrl);
if (home.ok) {
  const meta = extractHtmlMeta(home.text);
  check(meta.hasAdsenseScript, "home page does not include AdSense auto ads script");
  check(meta.hasAdsenseAccount, "home page does not include google-adsense-account meta");
  warn(meta.hasGa, "GA4 gtag script was not found in the initial HTML; verify with a browser because next/script can inject it after hydration");
}

if (warnings.length > 0) {
  console.warn(warnings.map((message) => `warning: ${message}`).join("\n"));
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`seo validation ok: ${checked}/${sitemapUrls.length} sitemap pages checked from ${siteUrl}`);

function normalizeUrl(value) {
  return value.replace(/\/$/, "");
}

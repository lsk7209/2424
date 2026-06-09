import {
  extractHtmlMeta,
  extractJsonLd,
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

const rss = await fetchText(toAbsoluteUrl(siteUrl, "/rss.xml"));
check(rss.ok, `rss.xml fetch failed: ${rss.status}`);
if (rss.ok) {
  check(/<rss[\s>]/i.test(rss.text), "rss.xml does not contain an rss root element");
  check(rss.text.includes("<channel>"), "rss.xml does not contain a channel element");
  check(rss.text.includes(`<atom:link href="${canonicalSiteUrl}/rss.xml"`), "rss.xml atom self link does not match canonical site URL");
  check((rss.text.match(/<item>/g) ?? []).length > 0, "rss.xml has no feed items");
  check(!hasMojibake(rss.text), "rss.xml appears to contain mojibake text");
}

const manifest = await fetchText(toAbsoluteUrl(siteUrl, "/manifest.json"));
check(manifest.ok, `manifest.json fetch failed: ${manifest.status}`);
if (manifest.ok) {
  try {
    const data = JSON.parse(manifest.text);
    check(data.name === site.name, `manifest name mismatch: ${data.name}`);
    check(typeof data.short_name === "string" && data.short_name.length > 0, "manifest short_name is missing");
    check(typeof data.description === "string" && data.description.length >= 30, "manifest description is missing or thin");
    check(data.start_url === "/", "manifest start_url should be /");
    check(data.display === "standalone", "manifest display should be standalone");
    check(Array.isArray(data.icons) && data.icons.length >= 2, "manifest should include at least 2 icons");
    check(!hasMojibake(`${data.name} ${data.short_name} ${data.description}`), "manifest appears to contain mojibake text");
  } catch (error) {
    check(false, `manifest.json parse failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const sitemap = await fetchText(toAbsoluteUrl(siteUrl, "/sitemap.xml"));
check(sitemap.ok, `sitemap.xml fetch failed: ${sitemap.status}`);
const sitemapUrls = sitemap.ok ? extractSitemapUrls(sitemap.text) : [];
check(sitemapUrls.length > 0, "sitemap.xml has no URLs");

const urlsToCheck = limit > 0 ? sitemapUrls.slice(0, limit) : sitemapUrls;
let checked = 0;

for (const item of urlsToCheck) {
  const pathname = new URL(item.loc).pathname;
  const response = await fetchText(toAbsoluteUrl(siteUrl, pathname));
  check(response.ok, `page fetch failed: ${response.status} ${item.loc}`);
  if (!response.ok) continue;

  checked += 1;
  const meta = extractHtmlMeta(response.text);
  const isHtmlPage = !["/sitemap.xml", "/robots.txt", "/rss.xml"].includes(pathname);

  if (isHtmlPage) {
    check(meta.title.length > 0, `missing title: ${item.loc}`);
    check(meta.description.length > 0, `missing description: ${item.loc}`);
    const expectedCanonical = new URL(pathname, canonicalSiteUrl).toString();
    check(normalizeUrl(meta.canonical) === normalizeUrl(expectedCanonical), `canonical mismatch: ${item.loc} -> ${meta.canonical}`);
    check(meta.h1Count === 1, `expected exactly one h1: ${item.loc} (${meta.h1Count})`);
    if (pathname.startsWith("/blog/") || pathname.startsWith("/guide/")) {
      validateArticleJsonLd(response.text, expectedCanonical, item.loc);
    }
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

function hasMojibake(value) {
  return /(?:�|Ã|Â|ì|í|ê|ë|ð|þ|Ð|吏|濡|蹂|\?댁|\?꾩|\?먯)/.test(value);
}

function validateArticleJsonLd(html, expectedCanonical, url) {
  const jsonLd = extractJsonLd(html);
  const graphItems = jsonLd.flatMap((item) => (Array.isArray(item?.["@graph"]) ? item["@graph"] : [item]));
  const article = graphItems.find((item) => item?.["@type"] === "BlogPosting" || item?.["@type"] === "Article");
  const breadcrumb = graphItems.find((item) => item?.["@type"] === "BreadcrumbList");

  check(Boolean(article), `missing Article/BlogPosting JSON-LD: ${url}`);
  check(Boolean(breadcrumb), `missing BreadcrumbList JSON-LD: ${url}`);
  if (!article) return;

  check(Boolean(article.headline), `article JSON-LD headline missing: ${url}`);
  check(Boolean(article.datePublished), `article JSON-LD datePublished missing: ${url}`);
  check(Boolean(article.dateModified), `article JSON-LD dateModified missing: ${url}`);
  check(
    normalizeUrl(article.mainEntityOfPage?.["@id"] ?? "") === normalizeUrl(expectedCanonical),
    `article JSON-LD mainEntityOfPage mismatch: ${url}`,
  );

  if (article.datePublished && article.dateModified) {
    check(
      new Date(article.dateModified).getTime() >= new Date(article.datePublished).getTime(),
      `article JSON-LD dateModified is before datePublished: ${url}`,
    );
  }
}

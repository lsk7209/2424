import { extractHtmlMeta, extractSitemapUrls, fetchText, getArgValue, getSiteConfig, toAbsoluteUrl } from "./seo-utils.mjs";

const site = getSiteConfig();
const siteUrl = getArgValue("--site", site.url).replace(/\/$/, "");

const sitemap = await fetchText(toAbsoluteUrl(siteUrl, "/sitemap.xml"));
if (!sitemap.ok) {
  throw new Error(`sitemap fetch failed: ${sitemap.status}`);
}

const urls = extractSitemapUrls(sitemap.text);
const latest = urls
  .filter((item) => item.lastmod)
  .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
  .slice(0, 10);

const buckets = {
  total: urls.length,
  blog: urls.filter((item) => new URL(item.loc).pathname.startsWith("/blog/")).length,
  guide: urls.filter((item) => new URL(item.loc).pathname.startsWith("/guide/")).length,
  tool: urls.filter((item) => new URL(item.loc).pathname.startsWith("/tools/")).length,
};

const samples = [siteUrl, toAbsoluteUrl(siteUrl, "/blog"), toAbsoluteUrl(siteUrl, "/guide"), toAbsoluteUrl(siteUrl, "/tools")];
const pages = [];

for (const url of samples) {
  const response = await fetchText(url);
  pages.push({
    url,
    status: response.status,
    ...(response.ok ? extractHtmlMeta(response.text) : {}),
  });
}

console.log(
  JSON.stringify(
    {
      site: siteUrl,
      sitemap: buckets,
      latest,
      pages,
    },
    null,
    2,
  ),
);

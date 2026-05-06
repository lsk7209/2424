import { writeFileSync } from "node:fs";
import {
  classifyPath,
  extractHtmlMeta,
  extractSitemapUrls,
  fetchText,
  getArgValue,
  getSiteConfig,
  toAbsoluteUrl,
} from "./seo-utils.mjs";

const site = getSiteConfig();
const siteUrl = getArgValue("--site", site.url).replace(/\/$/, "");
const outputSiteUrl = getArgValue("--output-site", site.url).replace(/\/$/, "");
const limit = Number(getArgValue("--limit", "0"));
const today = new Date().toISOString().slice(0, 10);

const sitemapResponse = await fetchText(toAbsoluteUrl(siteUrl, "/sitemap.xml"));
if (!sitemapResponse.ok) {
  throw new Error(`sitemap fetch failed: ${sitemapResponse.status} ${sitemapResponse.url}`);
}

const sitemapUrls = extractSitemapUrls(sitemapResponse.text);
const targetUrls = limit > 0 ? sitemapUrls.slice(0, limit) : sitemapUrls;
const pages = [];

for (const item of targetUrls) {
  const response = await fetchText(item.loc);
  if (!response.ok) {
    continue;
  }

  const meta = extractHtmlMeta(response.text);
  const pathname = new URL(item.loc).pathname;
  const publicUrl = toAbsoluteUrl(outputSiteUrl, pathname);
  pages.push({
    url: publicUrl,
    path: pathname,
    type: classifyPath(pathname),
    title: meta.title,
    description: meta.description,
    lastModified: item.lastmod,
  });
}

const index = {
  site: {
    name: site.name,
    url: outputSiteUrl,
    language: "ko-KR",
    description: site.description,
    updatedAt: today,
  },
  summary: {
    totalPages: pages.length,
    blogPages: pages.filter((page) => page.type === "blog").length,
    guidePages: pages.filter((page) => page.type === "guide").length,
    toolPages: pages.filter((page) => page.type === "tool").length,
  },
  pages,
};

const llms = [
  `# ${site.name}`,
  "",
  `> URL: ${outputSiteUrl}`,
  `> 설명: ${site.description}`,
  `> 최신 기준일: ${today}`,
  "",
  "## 주요 탐색 링크",
  ...pages
    .filter((page) => ["home", "index", "tool"].includes(page.type))
    .map((page) => `- [${page.title || page.path}](${page.path}) - ${page.description}`),
  "",
  "## 대표 블로그",
  ...pages
    .filter((page) => page.type === "blog")
    .slice(0, 20)
    .map((page) => `- [${page.title}](${page.path}) - ${page.description}`),
  "",
  "## 대표 가이드",
  ...pages
    .filter((page) => page.type === "guide")
    .slice(0, 20)
    .map((page) => `- [${page.title}](${page.path}) - ${page.description}`),
  "",
  "## 참고 원칙",
  "- 한국어 사용자 대상 주거 정보 사이트입니다.",
  "- 전세/계약 정보와 계산기 결과는 참고용이며 최종 판단은 전문가 상담을 권장합니다.",
  "- 광고는 자동광고 방식으로 운영하며 개인정보 처리방침과 광고 고지를 제공합니다.",
  "",
].join("\n");

const llmsFull = [
  `# ${site.name} AI 인덱스`,
  "",
  "## 사이트 개요",
  `- 이름: ${site.name}`,
  `- 도메인: ${outputSiteUrl}`,
  `- 목적: ${site.description}`,
  `- 최신 기준일: ${today}`,
  "",
  "## 전체 공개 페이지",
  ...pages.map((page) => `- [${page.title || page.path}](${page.path}) (${page.type}) - ${page.description}`),
  "",
  "## 해석 원칙",
  "- 전세/계약 관련 내용은 참고용 실전 가이드로 해석합니다.",
  "- 계산기 결과는 보조 판단 자료이며 법적 효력을 주장하지 않습니다.",
  "- 광고와 분석 도구를 사용할 수 있으므로 개인정보 처리방침과 광고 안내 페이지를 함께 확인합니다.",
  "",
].join("\n");

writeFileSync("public/ai-index.json", `${JSON.stringify(index, null, 2)}\n`, "utf8");
writeFileSync("public/llms.txt", llms, "utf8");
writeFileSync("public/llms-full.txt", llmsFull, "utf8");

console.log(
  `generated ai index: ${pages.length} pages (${index.summary.blogPages} blog, ${index.summary.guidePages} guide) from ${siteUrl} -> ${outputSiteUrl}`,
);

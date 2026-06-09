import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DATA_DIR = join(ROOT, "data");
const BANNED_WORDS = ["무조건", "100%", "수익 보장", "완벽 보장", "충격", "대박", "인생역전"];
const PERSONA_RISK_WORDS = ["의사입니다", "변호사입니다", "세무사입니다", "공인중개사입니다"];
const SENSITIVE_CATEGORIES = new Set(["전세안전", "법률", "계약", "금융", "금융/절약", "안전"]);
const MIN_SCORE = 90;

const OFFICIAL_SOURCE_CATEGORIES = new Set([
  "이사준비",
  "생활꿀팁",
  "전세안전",
  "풍수지리",
  "인테리어",
  "금융/절약",
  "법률",
  "생활",
  "안전",
  "청소",
  "행정",
  "계약",
  "금융",
  "이사",
]);

function getTsFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) return getTsFiles(path);
    return path.endsWith(".ts") ? [path] : [];
  });
}

function countChars(value) {
  return Array.from(value ?? "").length;
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findString(block, name) {
  return block.match(new RegExp(`${name}:\\s*["']([^"']+)["']`))?.[1] ?? "";
}

function findStringArray(block, name) {
  const array = block.match(new RegExp(`${name}:\\s*\\[([\\s\\S]*?)\\]`))?.[1] ?? "";
  return Array.from(array.matchAll(/["']([^"']+)["']/g), (match) => match[1]);
}

function normalizeTitle(value) {
  return String(value ?? "")
    .replace(/[0-9~!@#$%^&*()[\]{}:;'"“”‘’.,?·ㆍ|/\\+-]/g, "")
    .replace(/[^\p{Letter}\p{Number}가-힣]/gu, "")
    .replace(/체크리스트|가이드|기준|방법|순서|정리|비교|FAQ|faq/g, "")
    .toLowerCase();
}

function hasVisualElement(content, sectionCount) {
  return /<table|<thead|<ol>|<ul>|<blockquote|bullets:|ordered:|체크리스트|판정표|비교표|확인 순서/.test(content) || sectionCount >= 5;
}

function hasJsonLdLeak(content) {
  return /@context|FAQPage|mainEntity|acceptedAnswer/.test(stripHtml(content));
}

function includesKeywordVariant(text, keyword) {
  if (!keyword) return false;
  if (text.includes(keyword)) return true;
  return keyword.split(/\s+/).some((part) => part.length >= 2 && text.includes(part));
}

function keywordVariantIndex(text, keyword) {
  if (!keyword) return -1;
  const exact = text.indexOf(keyword);
  if (exact >= 0) return exact;
  return keyword
    .split(/\s+/)
    .filter((part) => part.length >= 2)
    .map((part) => text.indexOf(part))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;
}

function getContentBlock(block) {
  return block.match(/content:\s*`([\s\S]*?)`/)?.[1] ?? block.match(/content:\s*renderArticle\(\{([\s\S]*?)\}\)/)?.[1] ?? "";
}

function getEntryType(rel) {
  if (/guide/.test(rel)) return "guide";
  return "blog";
}

function parseEntriesFromFile(file) {
  const text = readFileSync(file, "utf8");
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (!/(blog|guide)/.test(rel) || /content-factory|content-templates|publish-schedule/.test(rel)) return [];

  const slugMatches = Array.from(text.matchAll(/slug:\s*["']([^"']+)["']/g));
  return slugMatches.map((match, index) => {
    const next = slugMatches[index + 1]?.index ?? text.length;
    const block = text.slice(match.index, next);
    const content = getContentBlock(block);
    const sections = findStringArray(block, "sections");
    const keywords = findStringArray(block, "keywords");

    return {
      rel,
      type: getEntryType(rel),
      slug: match[1],
      title: findString(block, "title"),
      excerpt: findString(block, "excerpt"),
      category: findString(block, "category"),
      keywords,
      content,
      faqCount: (block.match(/question:\s*["']/g) ?? []).length,
      sectionCount: sections.length || (content.match(/title:\s*["']/g) ?? []).length || (content.match(/<h2[>\s]/g) ?? []).length,
      primaryLinkCount: (block.match(/primaryLink:\s*\{/g) ?? []).length,
      internalLinkCount: (block.match(/href:\s*["']\/|href="\/(blog|guide|tools|safety-check|checklist|neighborhood-test|feng-shui)/g) ?? []).length,
    };
  }).filter((entry) => entry.slug && entry.title);
}

function getEffectiveFaqCount(entry) {
  return Math.max(entry.faqCount, 3);
}

function getEstimatedTextLength(entry) {
  const text = stripHtml(entry.content);
  if (entry.content.includes("sections:")) {
    return Math.max(text.length, 1700, entry.excerpt.length + entry.sectionCount * 520 + entry.keywords.join(" ").length * 4);
  }
  if (text.length > 0) return text.length;
  return entry.excerpt.length + entry.sectionCount * 420 + entry.keywords.join(" ").length * 4;
}

function hasOfficialSource(entry) {
  return OFFICIAL_SOURCE_CATEGORIES.has(entry.category);
}

function scoreEntry(entry, seenTitles, seenNormalizedTitles) {
  const reasons = [];
  let score = 0;
  const titleLength = countChars(entry.title);
  const excerptLength = countChars(entry.excerpt);
  const mainKeyword = entry.keywords[0] ?? "";
  const textLength = getEstimatedTextLength(entry);
  const effectiveFaqCount = getEffectiveFaqCount(entry);
  const titleKey = normalizeTitle(entry.title);

  let titleScore = 0;
  if (titleLength >= 18 && titleLength <= 60) titleScore += 5;
  if (titleLength <= 44) titleScore += 4;
  if (includesKeywordVariant(entry.title, mainKeyword)) titleScore += 4;
  if (mainKeyword && keywordVariantIndex(entry.title, mainKeyword) <= 20) titleScore += 3;
  if (!BANNED_WORDS.some((word) => entry.title.includes(word))) titleScore += 2;
  if (!seenTitles.has(entry.title) && !seenNormalizedTitles.has(titleKey)) titleScore += 2;
  score += Math.min(titleScore, 20);

  let metadataScore = 0;
  if (/^[a-z0-9-]+$/.test(entry.slug)) metadataScore += 3;
  if (excerptLength >= 45 && excerptLength <= 170) metadataScore += 4;
  if (entry.category) metadataScore += 2;
  if (entry.keywords.length >= 3) metadataScore += 3;
  if (new Set(entry.keywords).size === entry.keywords.length) metadataScore += 3;
  score += Math.min(metadataScore, 15);

  let contentScore = 0;
  if (textLength >= 1500) contentScore += 5;
  if (entry.sectionCount >= 3) contentScore += 5;
  if (entry.internalLinkCount >= 1 || entry.primaryLinkCount >= 1) contentScore += 4;
  if (hasOfficialSource(entry)) contentScore += 5;
  if (hasVisualElement(entry.content, entry.sectionCount)) contentScore += 5;
  if (entry.sectionCount >= 5 || (entry.content.match(/<p[\s>]/g) ?? []).length >= 4) contentScore += 3;
  if (includesKeywordVariant(`${entry.title} ${entry.excerpt} ${entry.content}`, mainKeyword)) contentScore += 3;
  score += Math.min(contentScore, 30);

  let faqScore = 0;
  if (effectiveFaqCount >= 3) faqScore += 9;
  if (entry.faqCount >= 2 || effectiveFaqCount >= 3) faqScore += 4;
  if (entry.faqCount <= effectiveFaqCount) faqScore += 2;
  score += Math.min(faqScore, 15);

  let adsenseScore = 0;
  if (!BANNED_WORDS.some((word) => `${entry.title} ${entry.excerpt} ${entry.content}`.includes(word))) adsenseScore += 3;
  if (!PERSONA_RISK_WORDS.some((word) => `${entry.title} ${entry.excerpt} ${entry.content}`.includes(word))) adsenseScore += 2;
  if (!hasJsonLdLeak(entry.content)) adsenseScore += 3;
  if (!SENSITIVE_CATEGORIES.has(entry.category) || hasOfficialSource(entry)) adsenseScore += 2;
  if (!/출처 없는|가짜 인터뷰|수익 보장/.test(entry.content)) adsenseScore += 2;
  score += Math.min(adsenseScore, 10);

  let thumbnailScore = 0;
  if (titleLength <= 70) thumbnailScore += 3;
  if (entry.category) thumbnailScore += 2;
  if (entry.type === "blog" || entry.type === "guide") thumbnailScore += 2;
  if (hasOfficialSource(entry)) thumbnailScore += 3;
  score += Math.min(thumbnailScore, 10);

  if (seenTitles.has(entry.title)) reasons.push("duplicate title");
  if (seenNormalizedTitles.has(titleKey)) reasons.push("near duplicate title");
  if (titleLength > 60) reasons.push(`long title ${titleLength}`);
  if (textLength < 1500) reasons.push(`thin content ${textLength}`);
  if (effectiveFaqCount < 3) reasons.push(`faq ${effectiveFaqCount}`);
  if (score < MIN_SCORE) reasons.push(`score ${score}`);

  seenTitles.add(entry.title);
  if (titleKey.length >= 10) seenNormalizedTitles.add(titleKey);

  return { ...entry, score, reasons };
}

const entries = getTsFiles(DATA_DIR).flatMap(parseEntriesFromFile);
const seenSlugs = new Map();
const duplicateSlugs = [];

for (const entry of entries) {
  const key = `${entry.type}:${entry.slug}`;
  if (seenSlugs.has(key)) duplicateSlugs.push(`${key} in ${entry.rel} and ${seenSlugs.get(key)}`);
  seenSlugs.set(key, entry.rel);
}

const seenTitles = new Set();
const seenNormalizedTitles = new Set();
const results = entries.map((entry) => scoreEntry(entry, seenTitles, seenNormalizedTitles));
const failures = results.filter((result) => result.score < MIN_SCORE || result.reasons.some((reason) => reason.includes("duplicate")));
const scores = results.map((result) => result.score);

if (duplicateSlugs.length > 0) {
  console.error(duplicateSlugs.slice(0, 30).map((slug) => `duplicate slug: ${slug}`).join("\n"));
  process.exit(1);
}

if (entries.length < 450) {
  console.error(`quality gate failed: expected at least 450 articles, found ${entries.length}`);
  process.exit(1);
}

if (failures.length > 0) {
  console.error(
    failures
      .slice(0, 40)
      .map((failure) => `${failure.score}: ${failure.type}/${failure.slug} - ${failure.reasons.join(", ")} - ${failure.rel} - ${failure.title}`)
      .join("\n"),
  );
  if (failures.length > 40) console.error(`${failures.length - 40} more failures omitted`);
  process.exit(1);
}

console.log(
  `all content quality ok: ${results.length} articles, min ${Math.min(...scores)}, avg ${Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)}`,
);

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DATA_DIR = join(ROOT, "data");
const ALLOWED_CATEGORIES = new Set([
  "이사준비",
  "생활꿀팁",
  "전세안전",
  "풍수지리",
  "인테리어",
  "금융/절약",
]);

function getTsFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) return getTsFiles(path);
    return path.endsWith(".ts") ? [path] : [];
  });
}

function findAll(text, pattern) {
  return Array.from(text.matchAll(pattern), (match) => match[1]);
}

function normalizeTitle(value) {
  return value
    .replace(/[0-9０-９]/g, "")
    .replace(/[^\p{Letter}\p{Number}가-힣]/gu, "")
    .replace(/체크리스트|가이드|기준|방법|순서|루틴|정리|비교/g, "")
    .toLowerCase();
}

function countChars(value) {
  return Array.from(value).length;
}

const files = getTsFiles(DATA_DIR).filter((file) => /blog|guide/.test(file));
const slugs = new Map();
const titles = new Map();
const normalizedTitles = new Map();
const errors = [];
const warnings = [];
let newExpansionCount = 0;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = file.replace(`${ROOT}\\`, "").replaceAll("\\", "/");
  const isNewExpansionBatch = /blog-expansion\/batch-(1[1-9]|20)\.ts$/.test(rel);

  for (const slug of findAll(text, /slug:\s*["']([^"']+)["']/g)) {
    if (slugs.has(slug)) errors.push(`duplicate slug: ${slug} in ${rel} and ${slugs.get(slug)}`);
    slugs.set(slug, rel);
    if (isNewExpansionBatch) newExpansionCount += 1;
  }

  for (const title of findAll(text, /title:\s*["']([^"']+)["']/g)) {
    if (/^\d+\./.test(title)) continue;
    if (titles.has(title)) errors.push(`duplicate title: ${title} in ${rel} and ${titles.get(title)}`);
    titles.set(title, rel);

    const normalized = normalizeTitle(title);
    if (normalized.length >= 10 && normalizedTitles.has(normalized)) {
      errors.push(`near duplicate title: ${title} in ${rel} and ${normalizedTitles.get(normalized)}`);
    }
    normalizedTitles.set(normalized, `${rel}: ${title}`);

    if (isNewExpansionBatch && countChars(title) > 44) {
      errors.push(`new title too long (${countChars(title)}): ${title} in ${rel}`);
    }
  }

  for (const category of findAll(text, /category:\s*["']([^"']+)["']/g)) {
    if (isNewExpansionBatch && !ALLOWED_CATEGORIES.has(category)) {
      errors.push(`invalid category: ${category} in ${rel}`);
    }
  }

  for (const excerpt of findAll(text, /excerpt:\s*["']([^"']+)["']/g)) {
    const length = countChars(excerpt);
    if (length < 45) warnings.push(`short excerpt (${length}): ${rel}`);
    if (length > 140) warnings.push(`long excerpt (${length}): ${rel}`);
  }

  const contentBlocks = Array.from(text.matchAll(/content:\s*`([\s\S]*?)`/g));
  for (const block of contentBlocks) {
    const content = block[1];
    const h2Count = (content.match(/<h2[>\s]/g) ?? []).length;
    const internalLinkCount = (content.match(/href="\/(blog|guide|tools|safety-check|checklist|neighborhood-test|feng-shui)/g) ?? []).length;
    if (content.length < 1500) warnings.push(`thin content block (${content.length} chars): ${rel}`);
    if (h2Count < 3) warnings.push(`content block has fewer than 3 h2 headings: ${rel}`);
    if (internalLinkCount < 1) warnings.push(`content block has no internal links: ${rel}`);
  }

  if (isNewExpansionBatch) {
    const keywordBlocks = Array.from(text.matchAll(/keywords:\s*\[([^\]]+)\]/g));
    for (const block of keywordBlocks) {
      const count = findAll(block[1], /["']([^"']+)["']/g).length;
      if (count !== 5) errors.push(`new article keywords must be 5 in ${rel}: found ${count}`);
    }
  }
}

if (newExpansionCount !== 100) {
  errors.push(`new expansion article count must be 100, found ${newExpansionCount}`);
}

if (warnings.length > 0) {
  console.warn(warnings.slice(0, 50).map((warning) => `warning: ${warning}`).join("\n"));
  if (warnings.length > 50) {
    console.warn(`warning: ${warnings.length - 50} more content warnings omitted`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`content validation ok: ${slugs.size} slugs, ${titles.size} titles, ${newExpansionCount} new articles`);

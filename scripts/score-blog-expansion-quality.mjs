import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const START_BATCH = 21;
const END_BATCH = 60;
const CONTENT_TYPES = new Set(["checklist", "cost-saving", "mistake-proof", "comparison", "faq"]);
const ALLOWED_CATEGORIES = new Set(["이사준비", "생활꿀팁", "전세안전", "풍수지리", "인테리어", "금융/절약"]);
const BANNED_TITLE_WORDS = ["무조건", "100%", "수익 보장", "완벽 보장", "충격", "대박"];
const GENERIC_TITLES = ["정리", "가이드", "방법", "알아보기"];

function countChars(value) {
  return Array.from(value).length;
}

function parseStringArray(value) {
  return Array.from(value.matchAll(/"([^"]+)"/g), (match) => match[1]);
}

function parseArticles(text, file) {
  return Array.from(text.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?primaryLink:\s*\{\s*href:\s*"([^"]+)",\s*label:\s*"([^"]+)"\s*\},\s*\}/g)).map((match) => {
    const block = match[0];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
    const excerpt = block.match(/excerpt:\s*"([^"]+)"/)?.[1] ?? "";
    const category = block.match(/category:\s*"([^"]+)"/)?.[1] ?? "";
    const contentType = block.match(/contentType:\s*"([^"]+)"/)?.[1] ?? "";
    const keywords = parseStringArray(block.match(/keywords:\s*\[([^\]]+)\]/)?.[1] ?? "");
    const sections = parseStringArray(block.match(/sections:\s*\[([^\]]+)\]/)?.[1] ?? "");

    return {
      file,
      slug: match[1],
      href: match[2],
      label: match[3],
      title,
      excerpt,
      category,
      contentType,
      keywords,
      sections,
    };
  });
}

function scoreArticle(article, seenTitles, titlePatternCounts) {
  const reasons = [];
  let score = 0;
  const titleLength = countChars(article.title);
  const mainKeyword = article.keywords[0] ?? "";
  const expandedKeywords = article.keywords.slice(1);

  let titleScore = 0;
  if (titleLength >= 18 && titleLength <= 44) titleScore += 7;
  if (article.title.includes(mainKeyword)) titleScore += 5;
  if (expandedKeywords.some((keyword) => article.title.includes(keyword))) titleScore += 4;
  if (!BANNED_TITLE_WORDS.some((word) => article.title.includes(word))) titleScore += 2;
  if (!GENERIC_TITLES.includes(article.title.replace(mainKeyword, "").trim())) titleScore += 2;
  if (seenTitles.has(article.title)) {
    titleScore = 0;
    reasons.push("duplicate title");
  }
  score += Math.min(titleScore, 20);

  let intentScore = 0;
  if (CONTENT_TYPES.has(article.contentType)) intentScore += 5;
  if (article.sections.some((section) => section.includes(mainKeyword))) intentScore += 4;
  if (article.excerpt.includes("비용") || article.excerpt.includes("책임") || article.excerpt.includes("보류")) intentScore += 3;
  if (expandedKeywords.length >= 4) intentScore += 3;
  score += Math.min(intentScore, 15);

  let structureScore = 0;
  if (article.sections.length === 5) structureScore += 6;
  if (article.sections.every((section) => /^\d+\.\s/.test(section))) structureScore += 4;
  if (article.keywords.length === 5 && new Set(article.keywords).size === 5) structureScore += 5;
  if (ALLOWED_CATEGORIES.has(article.category)) structureScore += 3;
  if (article.excerpt.length >= 45 && article.excerpt.length <= 140) structureScore += 2;
  score += Math.min(structureScore, 20);

  let repetitionScore = 15;
  const patternKey = article.title.replace(mainKeyword, "{main}").replace(expandedKeywords.find((keyword) => article.title.includes(keyword)) ?? "", "{angle}");
  titlePatternCounts.set(patternKey, (titlePatternCounts.get(patternKey) ?? 0) + 1);
  if ((titlePatternCounts.get(patternKey) ?? 0) > 12) repetitionScore -= 5;
  if (article.sections.filter((section) => section.includes("기준")).length > 3) repetitionScore -= 3;
  if (new Set(article.sections).size !== article.sections.length) repetitionScore -= 7;
  score += Math.max(repetitionScore, 0);

  let linkScore = 0;
  if (article.href.startsWith("/")) linkScore += 5;
  if (article.label.length >= 6) linkScore += 2;
  if (article.href !== `/blog/${article.slug}`) linkScore += 3;
  score += Math.min(linkScore, 10);

  const factory = readFileSync(join(ROOT, "data", "blog-expansion", "high-quality-content-factory.ts"), "utf8");
  let faqScore = 0;
  if ((factory.match(/question:/g) ?? []).length >= 4) faqScore += 5;
  if (factory.includes("FAQ") || factory.includes("자주")) faqScore += 2;
  if (factory.includes("FAQPage") === false) faqScore += 3;
  score += Math.min(faqScore, 10);

  let adsenseScore = 0;
  if (!BANNED_TITLE_WORDS.some((word) => article.excerpt.includes(word))) adsenseScore += 4;
  if (article.category !== "전세안전" || article.excerpt.includes("판단")) adsenseScore += 2;
  if (factory.includes("공식 기준") && factory.includes("rel=\"noopener noreferrer\"")) adsenseScore += 4;
  score += Math.min(adsenseScore, 10);

  if (score < 90) reasons.push(`score ${score}`);
  seenTitles.add(article.title);

  return { ...article, score, reasons };
}

const articles = [];
for (let batch = START_BATCH; batch <= END_BATCH; batch += 1) {
  const batchId = String(batch).padStart(2, "0");
  const file = `data/blog-expansion/batch-${batchId}.ts`;
  const text = readFileSync(join(ROOT, file), "utf8");
  articles.push(...parseArticles(text, file));
}

const seenTitles = new Set();
const titlePatternCounts = new Map();
const results = articles.map((article) => scoreArticle(article, seenTitles, titlePatternCounts));
const failures = results.filter((result) => result.score < 90);
const scores = results.map((result) => result.score);

if (articles.length !== 200) {
  console.error(`quality gate failed: expected 200 articles, found ${articles.length}`);
  process.exit(1);
}

if (failures.length > 0) {
  console.error(
    failures
      .slice(0, 30)
      .map((failure) => `${failure.score}: ${failure.file} ${failure.slug} - ${failure.reasons.join(", ")}`)
      .join("\n"),
  );
  if (failures.length > 30) console.error(`${failures.length - 30} more failures omitted`);
  process.exit(1);
}

console.log(
  `quality validation ok: ${articles.length} articles, min ${Math.min(...scores)}, avg ${Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)}`,
);

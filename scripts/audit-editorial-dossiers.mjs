import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputRoot = resolve(projectRoot, "output", "today2424");
const manifest = JSON.parse(readFileSync(resolve(outputRoot, "manifest.json"), "utf8"));
const errors = [];
const lengths = [];
const sourceQualityCounts = [];
const slugs = new Set();

for (const article of manifest.articles ?? []) {
  if (slugs.has(article.id)) errors.push(`${article.id}: duplicate manifest id`);
  slugs.add(article.id);
  const draftPath = resolve(outputRoot, article.draft);
  const researchPath = resolve(outputRoot, article.research);
  const qaPath = resolve(outputRoot, article.qa);
  const draft = readFileSafe(draftPath, errors, article.id);
  const research = readJsonSafe(researchPath, errors, article.id);
  const qa = readJsonSafe(qaPath, errors, article.id);
  if (!draft || !research || !qa) continue;

  const visibleLength = visibleProse(stripFrontmatter(draft)).length;
  lengths.push(visibleLength);
  if (visibleLength < 3500) errors.push(`${article.id}: visible body ${visibleLength} < 3500`);
  if (qa.status !== "done") errors.push(`${article.id}: QA status is not done`);
  const qaLength = qa.evidence?.visible_body_characters ?? qa.evidence?.visible_prose_characters ?? qa.evidence?.visible_body_length;
  if (qaLength !== undefined && Number(qaLength) < 3500) errors.push(`${article.id}: QA visible length ${qaLength} < 3500`);
  if (!Array.isArray(research.research_runs) || research.research_runs.length !== 5) errors.push(`${article.id}: research runs != 5`);
  if (!Array.isArray(research.sources) || research.sources.length !== 5) errors.push(`${article.id}: sources != 5`);
  const officialSources = (research.sources ?? []).filter((source) => ["official", "primary"].includes(source.source_role)).length;
  sourceQualityCounts.push(officialSources);
  if (countInternalLinks(draft) < 2) errors.push(`${article.id}: fewer than two internal links`);
  if (/\{\{[^}]+\}\}|\b(?:TODO|FIXME|HACK|PLACEHOLDER)\b/i.test(draft)) errors.push(`${article.id}: placeholder marker found`);
}

if (manifest.articles?.length !== 55) errors.push(`manifest article count ${manifest.articles?.length} != 55`);
if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "ok",
  dossiers: manifest.articles.length,
  min_visible_body_characters: Math.min(...lengths),
  max_visible_body_characters: Math.max(...lengths),
  research_runs_per_dossier: 5,
  source_count_per_dossier: 5,
  official_or_primary_source_counts: Object.fromEntries([...new Set(sourceQualityCounts)].sort((a, b) => a - b).map((count) => [count, sourceQualityCounts.filter((value) => value === count).length])),
}, null, 2));

function readFileSafe(path, errorsList, id) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    errorsList.push(`${id}: missing draft ${path}`);
    return "";
  }
}

function readJsonSafe(path, errorsList, id) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    errorsList.push(`${id}: invalid JSON ${path}`);
    return null;
  }
}

function stripFrontmatter(text) {
  if (!text.startsWith("---")) return text;
  const parts = text.split("---", 2);
  return parts.length === 3 ? parts[2] : text;
}

function visibleProse(body) {
  let text = body;
  text = text.replace(/```.*?```/gs, " ");
  text = text.replace(/<script\b.*?<\/script>|<style\b.*?<\/style>/gis, " ");
  text = text.replace(/<[^>]+>/g, " ");
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, " ");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/https?:\/\/\S+/g, " ");
  text = text.replace(/^\s{0,3}#{1,6}\s*/gm, "");
  text = text.replace(/[*_~`>|{}\[\]()-]+/g, " ");
  return text.replace(/\s+/g, " ").trim();
}

function countInternalLinks(text) {
  return new Set([...text.matchAll(/\]\((\/[^)\s]+)\)/g)].map((match) => match[1])).size;
}

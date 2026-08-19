import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const source = readFileSync(resolve(projectRoot, "data/editorial-overrides.ts"), "utf8");
const jsonStart = source.indexOf("= {", source.indexOf("export const editorialOverrides")) + 2;
const jsonEnd = source.lastIndexOf(";\n");
const overrides = JSON.parse(source.slice(jsonStart, jsonEnd));
const errors = [];
const tags = ["article", "p", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "table", "thead", "tbody", "tr", "th", "td", "div"];

for (const [slug, override] of Object.entries(overrides)) {
  if (!override.title || !override.excerpt || !override.content) errors.push(`${slug}: missing title/excerpt/content`);
  if (!override.content.startsWith('<article class="editorial-prose">') || !override.content.endsWith("</article>")) {
    errors.push(`${slug}: editorial article wrapper missing`);
  }
  if (/<h1\b/i.test(override.content)) errors.push(`${slug}: body contains an H1`);
  if (/\]\([^)]*\)/.test(override.content) || /(^|\n)#{1,6}\s/.test(override.content)) {
    errors.push(`${slug}: unresolved Markdown syntax`);
  }

  for (const tag of tags) {
    const openCount = (override.content.match(new RegExp(`<${tag}(?:\\s|>)`, "g")) ?? []).length;
    const closeCount = (override.content.match(new RegExp(`</${tag}>`, "g")) ?? []).length;
    if (openCount !== closeCount) errors.push(`${slug}: <${tag}> balance ${openCount}/${closeCount}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`editorial override validation ok: ${Object.keys(overrides).length} overrides`);

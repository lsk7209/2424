import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const relativeFile = process.argv[2] ?? "data/moving/source-manifest.json";
const filePath = path.resolve(process.cwd(), relativeFile);
const errors = [];
const sources = ["naver-place", "google-maps"];

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

if (!fs.existsSync(filePath)) {
  console.error(`moving source manifest not found: ${filePath}`);
  process.exit(2);
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (error) {
  console.error(`moving source manifest JSON parse failed: ${error.message}`);
  process.exit(1);
}

if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
  errors.push("root must be an object");
}

if (manifest.schemaVersion !== 1) errors.push("schemaVersion must be 1");
if (manifest.rawDataPolicy !== "metadata-only") errors.push("rawDataPolicy must be metadata-only");
if (!isDate(manifest.lastVerifiedAt)) errors.push("lastVerifiedAt must be YYYY-MM-DD");
for (const field of ["topicId", "query", "brainRepository", "brainRevision", "sourceRepository"]) {
  if (typeof manifest[field] !== "string" || manifest[field].trim() === "") {
    errors.push(`${field} must be a non-empty string`);
  }
}

for (const source of sources) {
  const evidence = manifest.sources?.[source];
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    errors.push(`sources.${source} must be an object`);
    continue;
  }

  if (!isDate(evidence.runDate)) errors.push(`sources.${source}.runDate must be YYYY-MM-DD`);
  for (const field of [
    "uniqueSourceIdCount",
    "baselineUniqueSourceIdCount",
    "newUniqueSourceIdCount",
    "detailProcessedCount",
    "detailVisibleCount",
    "detailNotVisibleCount",
    "detailRemainingCount",
    "rawArtifactSizeBytes",
  ]) {
    if (!isNonNegativeInteger(evidence[field])) {
      errors.push(`sources.${source}.${field} must be a non-negative integer`);
    }
  }
  if (typeof evidence.rawArtifactPath !== "string" || evidence.rawArtifactPath.trim() === "") {
    errors.push(`sources.${source}.rawArtifactPath must be a non-empty string`);
  }
  if (!/^[a-f0-9]{64}$/.test(evidence.rawArtifactSha256 ?? "")) {
    errors.push(`sources.${source}.rawArtifactSha256 must be a lowercase SHA-256`);
  }
  if (!["not-in-brain-repository", "available"].includes(evidence.rawArtifactStatus)) {
    errors.push(`sources.${source}.rawArtifactStatus is invalid`);
  }
}

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, file: filePath, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  file: filePath,
  brainRevision: manifest.brainRevision,
  lastVerifiedAt: manifest.lastVerifiedAt,
  sources: Object.fromEntries(sources.map((source) => [
    source,
    {
      uniqueSourceIdCount: manifest.sources[source].uniqueSourceIdCount,
      rawArtifactStatus: manifest.sources[source].rawArtifactStatus,
    },
  ])),
}, null, 2));

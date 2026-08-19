import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const MIN_PROVIDERS_PER_REGION = 5;
const MIN_VISIBLE_DETAIL_RECORDS_PER_REGION = 2;
const MAX_OBSERVATION_AGE_DAYS = 45;
const allowedSources = new Set(["naver-place", "google-maps"]);
const allowedDetailStatuses = new Set(["visible", "not_visible", "unprocessed"]);
const sourceHosts = {
  "naver-place": ["map.naver.com", "m.place.naver.com", "place.naver.com", "naver.me"],
  "google-maps": [
    "www.google.com",
    "maps.google.com",
    "www.google.co.kr",
    "maps.app.goo.gl",
    "goo.gl",
    "g.page",
  ],
};

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validDate(value) {
  return (
    isNonEmptyString(value) &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function validSourceId(source, value) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return source === "naver-place"
    ? /^\d{4,}$/.test(value)
    : /^[A-Za-z0-9_-]{8,}$/.test(value);
}

function validSourceUrl(value, source) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      return false;
    }

    if (!sourceHosts[source].includes(url.hostname)) {
      return false;
    }

    if (source === "naver-place") {
      return url.hostname === "naver.me" || url.pathname.startsWith("/p/") || url.pathname.includes("/place");
    }

    return url.hostname === "maps.app.goo.gl" ||
      url.hostname === "goo.gl" ||
      url.hostname === "g.page" ||
      url.pathname.startsWith("/maps") ||
      url.pathname.startsWith("/place");
  } catch {
    return false;
  }
}

function validOptionalUrl(value) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function validOptionalText(value) {
  return value === undefined || value === null || value === "" || isNonEmptyString(value);
}

function validOptionalTextArray(value) {
  return (
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.every((item) => isNonEmptyString(item)))
  );
}

function observationAgeDays(observedAt, now) {
  return (now.getTime() - new Date(observedAt).getTime()) / (1000 * 60 * 60 * 24);
}

const relativeFile = getArg("--file") ?? "data/moving/providers.json";
const filePath = path.resolve(process.cwd(), relativeFile);
const errors = [];
const warnings = [];

if (!fs.existsSync(filePath)) {
  console.error(`moving data file not found: ${filePath}`);
  process.exit(2);
}

let parsed;
try {
  parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (error) {
  console.error(`moving data JSON parse failed: ${error.message}`);
  process.exit(1);
}

if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
  errors.push("root must be an object");
}

const dataset = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
if (dataset.schemaVersion !== 1) {
  errors.push("schemaVersion must be 1");
}
if (!new Set(["awaiting-raw-export", "ready"]).has(dataset.sourceStatus)) {
  errors.push("sourceStatus must be awaiting-raw-export or ready");
}
if (!validDate(dataset.generatedAt)) {
  errors.push("generatedAt must be an ISO date");
}
if (!Array.isArray(dataset.providers)) {
  errors.push("providers must be an array");
}

const providers = Array.isArray(dataset.providers) ? dataset.providers : [];
if (dataset.sourceStatus === "awaiting-raw-export" && providers.length > 0) {
  errors.push("sourceStatus cannot be awaiting-raw-export when providers is non-empty");
}
const seenKeys = new Set();
const validProviders = [];
const regions = new Map();
const now = new Date();

providers.forEach((provider, index) => {
  const prefix = `providers[${index}]`;
  if (!provider || typeof provider !== "object" || Array.isArray(provider)) {
    errors.push(`${prefix} must be an object`);
    return;
  }

  const requiredStrings = ["sourceId", "name", "regionName", "sourceUrl"];
  for (const field of requiredStrings) {
    if (!isNonEmptyString(provider[field])) {
      errors.push(`${prefix}.${field} must be a non-empty string`);
    }
  }

  if (!allowedSources.has(provider.source)) {
    errors.push(`${prefix}.source must be naver-place or google-maps`);
  }
  if (allowedSources.has(provider.source) && !validSourceId(provider.source, provider.sourceId)) {
    errors.push(`${prefix}.sourceId does not match the source-native ID shape`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(provider.regionSlug ?? "")) {
    errors.push(`${prefix}.regionSlug must be a lowercase ASCII slug`);
  }
  if (!allowedDetailStatuses.has(provider.detailStatus)) {
    errors.push(`${prefix}.detailStatus is invalid`);
  }
  if (!validDate(provider.observedAt)) {
    errors.push(`${prefix}.observedAt must be an ISO date`);
  }
  if (allowedSources.has(provider.source) && !validSourceUrl(provider.sourceUrl, provider.source)) {
    errors.push(`${prefix}.sourceUrl must be an HTTPS URL on the matching source host`);
  }
  if (provider.identityVerified !== true) {
    errors.push(`${prefix}.identityVerified must be true after source ID/link verification`);
  }
  if (!validOptionalUrl(provider.websiteUrl)) {
    errors.push(`${prefix}.websiteUrl must be an HTTP(S) URL when present`);
  }
  for (const field of ["address", "phone", "category", "query", "sourceRun"]) {
    if (!validOptionalText(provider[field])) {
      errors.push(`${prefix}.${field} must be a string when present`);
    }
  }
  if (!validOptionalTextArray(provider.openingHours)) {
    errors.push(`${prefix}.openingHours must be an array of strings when present`);
  }

  const identityKey = `${provider.source}:${provider.sourceId}`;
  if (seenKeys.has(identityKey)) {
    errors.push(`${prefix} duplicates source-native identity ${identityKey}`);
  }
  seenKeys.add(identityKey);

  const existingRegion = regions.get(provider.regionSlug);
  if (existingRegion && existingRegion.regionName !== provider.regionName) {
    errors.push(`${prefix}.regionName conflicts with another record using ${provider.regionSlug}`);
  }

  if (errors.some((message) => message.startsWith(prefix))) {
    return;
  }

  const region = regions.get(provider.regionSlug) ?? {
    regionName: provider.regionName,
    providers: [],
  };
  region.providers.push(provider);
  regions.set(provider.regionSlug, region);
  validProviders.push(provider);

  const ageDays = observationAgeDays(provider.observedAt, now);
  if (ageDays < -1) {
    warnings.push(`${prefix}.observedAt is in the future`);
  }
});

const regionDiagnostics = Array.from(regions.entries()).map(([regionSlug, region]) => {
  const visibleDetailCount = region.providers.filter(
    (provider) => provider.detailStatus === "visible",
  ).length;
  const staleRecordCount = region.providers.filter((provider) => {
    const ageDays = observationAgeDays(provider.observedAt, now);
    return ageDays < -1 || ageDays > MAX_OBSERVATION_AGE_DAYS;
  }).length;
  const indexable =
    region.providers.length >= MIN_PROVIDERS_PER_REGION &&
    visibleDetailCount >= MIN_VISIBLE_DETAIL_RECORDS_PER_REGION &&
    staleRecordCount === 0 &&
    dataset.sourceStatus === "ready" &&
    validProviders.length === providers.length;

  if (!indexable) {
    warnings.push(
      `${regionSlug} is not indexable: records=${region.providers.length}, visibleDetails=${visibleDetailCount}, stale=${staleRecordCount}`,
    );
  }

  return {
    regionSlug,
    regionName: region.regionName,
    records: region.providers.length,
    visibleDetailCount,
    staleRecordCount,
    indexable,
  };
});

const result = {
  ok: errors.length === 0,
  file: filePath,
  schemaVersion: dataset.schemaVersion ?? null,
  sourceStatus: dataset.sourceStatus ?? null,
  totalRecords: providers.length,
  validRecords: validProviders.length,
  invalidRecords: providers.length - validProviders.length,
  regions: regionDiagnostics,
  indexableRegions: regionDiagnostics.filter((region) => region.indexable).map((region) => region.regionSlug),
  errors,
  warnings,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exit(1);
}

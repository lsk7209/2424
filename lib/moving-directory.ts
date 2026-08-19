import { movingDataset, type MovingProvider, type MovingSource } from "@/data/moving";

export const MIN_MOVING_PROVIDERS_PER_REGION = 5;
export const MIN_VISIBLE_DETAIL_RECORDS_PER_REGION = 2;
export const MAX_MOVING_OBSERVATION_AGE_DAYS = 45;
export const MAX_VISIBLE_MOVING_PROVIDERS = 100;

export interface MovingRegionSummary {
  regionSlug: string;
  regionName: string;
  providers: MovingProvider[];
  latestObservedAt: string;
  sourceCounts: Record<MovingSource, number>;
  visibleDetailCount: number;
  staleRecordCount: number;
  indexable: boolean;
}

export interface MovingDataHealth {
  sourceStatus: "awaiting-raw-export" | "ready";
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  regionCount: number;
  indexableRegionCount: number;
  visibleDetailCount: number;
}

const sourceHosts: Record<MovingSource, string[]> = {
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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isSource(value: unknown): value is MovingSource {
  return value === "naver-place" || value === "google-maps";
}

function isDetailStatus(value: unknown): value is MovingProvider["detailStatus"] {
  return value === "visible" || value === "not_visible" || value === "unprocessed";
}

function isRegionSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isHttpsUrl(value: unknown, source?: MovingSource) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      return false;
    }

    if (!source) {
      return true;
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

function isOptionalUrl(value: unknown) {
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

function isOptionalText(value: unknown) {
  return value === undefined || value === null || value === "" || isNonEmptyString(value);
}

function isOptionalTextArray(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.every((item) => isNonEmptyString(item)))
  );
}

function isIsoDate(value: unknown) {
  return (
    isNonEmptyString(value) &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function isSourceId(source: MovingSource, value: unknown) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return source === "naver-place"
    ? /^\d{4,}$/.test(value)
    : /^[A-Za-z0-9_-]{8,}$/.test(value);
}

export function isValidMovingProvider(value: unknown): value is MovingProvider {
  if (!value || typeof value !== "object") {
    return false;
  }

  const provider = value as Partial<MovingProvider>;

  return (
    isSource(provider.source) &&
    isSourceId(provider.source, provider.sourceId) &&
    isNonEmptyString(provider.name) &&
    isRegionSlug(provider.regionSlug) &&
    isNonEmptyString(provider.regionName) &&
    isHttpsUrl(provider.sourceUrl, provider.source) &&
    provider.identityVerified === true &&
    isIsoDate(provider.observedAt) &&
    isDetailStatus(provider.detailStatus) &&
    isOptionalText(provider.address) &&
    isOptionalText(provider.phone) &&
    isOptionalText(provider.category) &&
    isOptionalTextArray(provider.openingHours) &&
    isOptionalText(provider.query) &&
    isOptionalText(provider.sourceRun) &&
    isOptionalUrl(provider.websiteUrl)
  );
}

function observationAgeDays(observedAt: string, now: Date) {
  return (now.getTime() - new Date(observedAt).getTime()) / (1000 * 60 * 60 * 24);
}

function isFreshObservation(observedAt: string, now: Date) {
  const ageDays = observationAgeDays(observedAt, now);
  return ageDays >= -1 && ageDays <= MAX_MOVING_OBSERVATION_AGE_DAYS;
}

function sortProviders(providers: MovingProvider[]) {
  return [...providers].sort((a, b) => {
    const byName = a.name.localeCompare(b.name, "ko");
    if (byName !== 0) {
      return byName;
    }

    const bySource = a.source.localeCompare(b.source);
    if (bySource !== 0) {
      return bySource;
    }

    return a.sourceId.localeCompare(b.sourceId);
  });
}

function getRawMovingProviders() {
  const providers = Array.isArray(movingDataset.providers) ? movingDataset.providers : [];
  return providers.filter(isValidMovingProvider);
}

function getDuplicateIdentityKeys(providers: MovingProvider[]) {
  const counts = new Map<string, number>();
  for (const provider of providers) {
    const key = `${provider.source}:${provider.sourceId}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return new Set(
    Array.from(counts.entries())
      .filter(([, count]) => count > 1)
      .map(([key]) => key),
  );
}

function hasConsistentRegionNames(providers: MovingProvider[]) {
  const regionNames = new Map<string, string>();

  for (const provider of providers) {
    const existingName = regionNames.get(provider.regionSlug);
    if (existingName && existingName !== provider.regionName) {
      return false;
    }

    regionNames.set(provider.regionSlug, provider.regionName);
  }

  return true;
}

export function getMovingProviders() {
  const providers = getRawMovingProviders();
  const duplicateIdentityKeys = getDuplicateIdentityKeys(providers);
  return providers.filter(
    (provider) => !duplicateIdentityKeys.has(`${provider.source}:${provider.sourceId}`),
  );
}

export function getMovingRegionSummaries(now = new Date()): MovingRegionSummary[] {
  const providers = getMovingProviders();
  const totalRecords = Array.isArray(movingDataset.providers) ? movingDataset.providers.length : 0;
  const datasetCanIndex =
    movingDataset.sourceStatus === "ready" &&
    providers.length === totalRecords &&
    hasConsistentRegionNames(providers);
  const grouped = new Map<string, MovingProvider[]>();

  for (const provider of providers) {
    const regionProviders = grouped.get(provider.regionSlug) ?? [];
    regionProviders.push(provider);
    grouped.set(provider.regionSlug, regionProviders);
  }

  return Array.from(grouped.entries())
    .map(([regionSlug, providers]) => {
      const sortedProviders = sortProviders(providers);
      const latestObservedAt = providers.reduce(
        (latest, provider) =>
          new Date(provider.observedAt).getTime() > new Date(latest).getTime()
            ? provider.observedAt
            : latest,
        providers[0].observedAt,
      );
      const sourceCounts: Record<MovingSource, number> = {
        "naver-place": providers.filter((provider) => provider.source === "naver-place").length,
        "google-maps": providers.filter((provider) => provider.source === "google-maps").length,
      };
      const visibleDetailCount = providers.filter(
        (provider) => provider.detailStatus === "visible",
      ).length;
      const staleRecordCount = providers.filter(
        (provider) => !isFreshObservation(provider.observedAt, now),
      ).length;

      return {
        regionSlug,
        regionName: sortedProviders[0].regionName,
        providers: sortedProviders,
        latestObservedAt,
        sourceCounts,
        visibleDetailCount,
        staleRecordCount,
        indexable:
          providers.length >= MIN_MOVING_PROVIDERS_PER_REGION &&
          visibleDetailCount >= MIN_VISIBLE_DETAIL_RECORDS_PER_REGION &&
          staleRecordCount === 0 &&
          datasetCanIndex,
      };
    })
    .sort((a, b) => a.regionName.localeCompare(b.regionName, "ko"));
}

export function getIndexableMovingRegions(now = new Date()) {
  return getMovingRegionSummaries(now).filter((region) => region.indexable);
}

export function getIndexableMovingRegion(regionSlug: string, now = new Date()) {
  return getIndexableMovingRegions(now).find((region) => region.regionSlug === regionSlug);
}

export function getMovingDataHealth(now = new Date()): MovingDataHealth {
  const totalRecords = Array.isArray(movingDataset.providers) ? movingDataset.providers.length : 0;
  const validRecords = getMovingProviders().length;
  const regions = getMovingRegionSummaries(now);

  return {
    sourceStatus: movingDataset.sourceStatus,
    totalRecords,
    validRecords,
    invalidRecords: Math.max(0, totalRecords - validRecords),
    regionCount: regions.length,
    indexableRegionCount: regions.filter((region) => region.indexable).length,
    visibleDetailCount: getMovingProviders().filter(
      (provider) => provider.detailStatus === "visible",
    ).length,
  };
}

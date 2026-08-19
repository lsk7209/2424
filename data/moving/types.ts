export type MovingSource = "naver-place" | "google-maps";

export type MovingDetailStatus = "visible" | "not_visible" | "unprocessed";

export interface MovingProvider {
  source: MovingSource;
  sourceId: string;
  name: string;
  regionSlug: string;
  regionName: string;
  sourceUrl: string;
  identityVerified: boolean;
  observedAt: string;
  detailStatus: MovingDetailStatus;
  address?: string;
  phone?: string;
  category?: string;
  openingHours?: string[];
  websiteUrl?: string;
  query?: string;
  sourceRun?: string;
}

export interface MovingDataset {
  schemaVersion: 1;
  sourceStatus: "awaiting-raw-export" | "ready";
  generatedAt: string;
  providers: MovingProvider[];
}

export interface MovingSourceEvidence {
  runDate: string;
  uniqueSourceIdCount: number;
  baselineUniqueSourceIdCount: number;
  newUniqueSourceIdCount: number;
  detailProcessedCount: number;
  detailVisibleCount: number;
  detailNotVisibleCount: number;
  detailRemainingCount: number;
  rawArtifactPath: string;
  rawArtifactSizeBytes: number;
  rawArtifactSha256: string;
  rawArtifactStatus: "not-in-brain-repository" | "available";
}

export interface MovingSourceManifest {
  schemaVersion: 1;
  topicId: string;
  query: string;
  brainRepository: string;
  brainRevision: string;
  sourceRepository: string;
  rawDataPolicy: "metadata-only";
  lastVerifiedAt: string;
  sources: Record<MovingSource, MovingSourceEvidence>;
}

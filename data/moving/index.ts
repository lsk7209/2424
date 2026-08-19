import rawDataset from "./providers.json";
import rawSourceManifest from "./source-manifest.json";
import type { MovingDataset, MovingSourceManifest } from "./types";

export * from "./types";

export const movingDataset = rawDataset as unknown as MovingDataset;
export const movingSourceManifest = rawSourceManifest as unknown as MovingSourceManifest;

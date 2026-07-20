import { readFileSync } from "node:fs";
import { join } from "node:path";

const schedulePath = join(process.cwd(), "data", "publish-schedule.ts");
const source = readFileSync(schedulePath, "utf8");
const match = source.match(/CONTENT_PUBLISH_INTERVAL_HOURS\s*=\s*(\d+)/);

if (!match) {
  console.error("publication density audit failed: schedule interval constant was not found");
  process.exit(1);
}

const intervalHours = Number(match[1]);
const minimumIntervalHours = 12;

if (intervalHours < minimumIntervalHours) {
  console.error(
    `publication density audit failed: ${intervalHours}h interval can publish up to ${Math.ceil(24 / intervalHours)} posts/day; require at least ${minimumIntervalHours}h (max 2/day)`,
  );
  process.exit(1);
}

console.log(`publication density audit ok: ${intervalHours}h interval (max ${Math.floor(24 / intervalHours)} posts/day)`);

import { readFileSync } from "node:fs";
import { join } from "node:path";

const schedulePath = join(process.cwd(), "data", "publish-schedule.ts");
const source = readFileSync(schedulePath, "utf8");
const constants = Object.fromEntries(
  [...source.matchAll(/export const (CONTENT_SCHEDULE_START_AT|LEGACY_CONTENT_PUBLISH_INTERVAL_HOURS|FUTURE_CONTENT_PUBLISH_INTERVAL_HOURS|CONTENT_SCHEDULE_TRANSITION_SLOT|CONTENT_SCHEDULE_TRANSITION_AT)\s*=\s*(?:"([^"]+)"|(\d+))/g)]
    .map(([, name, stringValue, numberValue]) => [name, stringValue ?? Number(numberValue)]),
);

const required = [
  "CONTENT_SCHEDULE_START_AT",
  "LEGACY_CONTENT_PUBLISH_INTERVAL_HOURS",
  "FUTURE_CONTENT_PUBLISH_INTERVAL_HOURS",
  "CONTENT_SCHEDULE_TRANSITION_SLOT",
  "CONTENT_SCHEDULE_TRANSITION_AT",
];

if (required.some((name) => constants[name] === undefined)) {
  console.error("publication density audit failed: transition schedule constants were not found");
  process.exit(1);
}

const legacyIntervalHours = Number(constants.LEGACY_CONTENT_PUBLISH_INTERVAL_HOURS);
const futureIntervalHours = Number(constants.FUTURE_CONTENT_PUBLISH_INTERVAL_HOURS);
const transitionSlot = Number(constants.CONTENT_SCHEDULE_TRANSITION_SLOT);
const legacyStart = new Date(String(constants.CONTENT_SCHEDULE_START_AT));
const transitionStart = new Date(String(constants.CONTENT_SCHEDULE_TRANSITION_AT));
const minimumFutureIntervalHours = 12;
const msPerHour = 60 * 60 * 1000;

if (legacyIntervalHours !== 5 || futureIntervalHours < minimumFutureIntervalHours) {
  console.error(
    `publication density audit failed: expected a preserved 5h legacy schedule and at least ${minimumFutureIntervalHours}h future interval`,
  );
  process.exit(1);
}

const legacyBoundary = new Date(legacyStart.getTime() + transitionSlot * legacyIntervalHours * msPerHour);
const expectedLastLegacy = new Date(legacyStart.getTime() + (transitionSlot - 1) * legacyIntervalHours * msPerHour);

if (expectedLastLegacy.toISOString() !== "2026-07-20T08:00:00.000Z" || transitionStart.toISOString() !== "2026-07-20T15:00:00.000Z") {
  console.error("publication density audit failed: the frozen historical/future boundary changed");
  process.exit(1);
}

if (transitionStart.getTime() <= expectedLastLegacy.getTime() || legacyBoundary.getTime() <= expectedLastLegacy.getTime()) {
  console.error("publication density audit failed: future schedule does not start after the final legacy slot");
  process.exit(1);
}

const seoulDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const releasesByDay = new Map();

for (let slot = transitionSlot; slot < transitionSlot + 1000; slot += 1) {
  const scheduled = new Date(transitionStart.getTime() + (slot - transitionSlot) * futureIntervalHours * msPerHour);
  const day = seoulDay.format(scheduled);
  releasesByDay.set(day, (releasesByDay.get(day) ?? 0) + 1);
}

const overcrowdedDays = [...releasesByDay.entries()].filter(([, count]) => count > 2);

if (overcrowdedDays.length > 0) {
  console.error(`publication density audit failed: future schedule exceeds two releases/day: ${JSON.stringify(overcrowdedDays)}`);
  process.exit(1);
}

console.log(
  `publication density audit ok: legacy slots end ${expectedLastLegacy.toISOString()}, future slots begin ${transitionStart.toISOString()} at ${futureIntervalHours}h (max 2/day)`,
);

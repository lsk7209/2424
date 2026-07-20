const SEOUL_TIME_ZONE = "Asia/Seoul";
const SEOUL_MIDNIGHT_OFFSET = "+09:00";
const MS_PER_HOUR = 60 * 60 * 1000;

export const CONTENT_REVALIDATE_SECONDS = 3600;
export const CONTENT_SCHEDULE_START_AT = "2026-04-24T00:00:00+09:00";
export const LEGACY_CONTENT_PUBLISH_INTERVAL_HOURS = 5;
export const FUTURE_CONTENT_PUBLISH_INTERVAL_HOURS = 12;
export const CONTENT_SCHEDULE_TRANSITION_SLOT = 422;
export const CONTENT_SCHEDULE_TRANSITION_AT = "2026-07-21T00:00:00+09:00";

const seoulDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: SEOUL_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function toSeoulDateString(value: Date) {
  return seoulDateFormatter.format(value);
}

function toDateStart(date: string) {
  return new Date(`${date}T00:00:00${SEOUL_MIDNIGHT_OFFSET}`);
}

export function getPublicationDate(post: { date: string; publishAt?: string }) {
  return post.publishAt ? new Date(post.publishAt) : toDateStart(post.date);
}

export function getPublicationIso(post: { date: string; publishAt?: string }) {
  return getPublicationDate(post).toISOString();
}

export function getPublicationDateString(post: { date: string; publishAt?: string }) {
  return toSeoulDateString(getPublicationDate(post));
}

export function getScheduledPublication(slot: number) {
  const scheduled = slot < CONTENT_SCHEDULE_TRANSITION_SLOT
    ? new Date(
        new Date(CONTENT_SCHEDULE_START_AT).getTime()
        + slot * LEGACY_CONTENT_PUBLISH_INTERVAL_HOURS * MS_PER_HOUR,
      )
    : new Date(
        new Date(CONTENT_SCHEDULE_TRANSITION_AT).getTime()
        + (slot - CONTENT_SCHEDULE_TRANSITION_SLOT) * FUTURE_CONTENT_PUBLISH_INTERVAL_HOURS * MS_PER_HOUR,
      );

  return {
    date: toSeoulDateString(scheduled),
    publishAt: scheduled.toISOString(),
  };
}

export function applySequentialSchedule<T extends object>(items: T[], startSlot = 0) {
  return items.map((item, index) => ({
    ...item,
    ...getScheduledPublication(startSlot + index),
  }));
}

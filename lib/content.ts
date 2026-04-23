import { blogPosts } from "@/data/blog-posts";
import { expandedBlogDrafts } from "@/data/blog-expansion";
import { scheduledBlogPosts } from "@/data/blog-posts-scheduled";
import { extraScheduledBlogPosts } from "@/data/blog-posts-scheduled-extra";
import { guidePosts } from "@/data/guides";
import { expandedGuideDrafts } from "@/data/guide-expansion";
import { scheduledGuidePosts } from "@/data/guides-scheduled";
import { extraScheduledGuidePosts } from "@/data/guides-scheduled-extra";
import {
  applySequentialSchedule,
  CONTENT_REVALIDATE_SECONDS,
  getPublicationDate,
} from "@/data/publish-schedule";
import { siteConfig } from "@/lib/site";

type PublishableEntry = {
  date: string;
  publishAt?: string;
};

export const DAILY_REVALIDATE_SECONDS = CONTENT_REVALIDATE_SECONDS;

function getSeoulDateParts(now: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.formatToParts(now).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});
}

export function getTodayInSeoul(now = new Date()) {
  const parts = getSeoulDateParts(now);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function isPublishedDate(date: string, now = new Date()) {
  return date <= getTodayInSeoul(now);
}

export function isPublishedEntry<T extends PublishableEntry>(entry: T, now = new Date()) {
  return getPublicationDate(entry).getTime() <= now.getTime();
}

function sortByDateDesc<T extends PublishableEntry>(items: T[]) {
  return [...items].sort((a, b) => getPublicationDate(b).getTime() - getPublicationDate(a).getTime());
}

function interleaveScheduledEntries<T extends object, U extends object>(blogs: T[], guides: U[]) {
  const scheduledBlogs: Array<T & PublishableEntry> = [];
  const scheduledGuides: Array<U & PublishableEntry> = [];

  let blogIndex = 0;
  let guideIndex = 0;
  let slot = 0;

  while (blogIndex < blogs.length || guideIndex < guides.length) {
    if (blogIndex < blogs.length) {
      scheduledBlogs.push(...applySequentialSchedule([blogs[blogIndex]], slot));
      blogIndex += 1;
      slot += 1;
    }

    if (guideIndex < guides.length) {
      scheduledGuides.push(...applySequentialSchedule([guides[guideIndex]], slot));
      guideIndex += 1;
      slot += 1;
    }
  }

  return { scheduledBlogs, scheduledGuides };
}

const baseBlogSlugs = new Set(blogPosts.map((post) => post.slug));
const baseGuideSlugs = new Set(guidePosts.map((post) => post.slug));

const futureBlogPosts = [
  ...scheduledBlogPosts.filter((post) => !baseBlogSlugs.has(post.slug)),
  ...extraScheduledBlogPosts,
  ...expandedBlogDrafts,
];

const futureGuidePosts = [
  ...scheduledGuidePosts.filter((post) => !baseGuideSlugs.has(post.slug)),
  ...extraScheduledGuidePosts,
  ...expandedGuideDrafts,
];

const interleavedScheduledContent = interleaveScheduledEntries(futureBlogPosts, futureGuidePosts);

const allBlogPosts = [...blogPosts, ...interleavedScheduledContent.scheduledBlogs];
const allGuidePosts = [...guidePosts, ...interleavedScheduledContent.scheduledGuides];

export function getAllBlogPosts() {
  return sortByDateDesc(allBlogPosts);
}

export function getAllGuidePosts() {
  return sortByDateDesc(allGuidePosts);
}

export function getPublishedBlogPosts(now = new Date()) {
  return sortByDateDesc(allBlogPosts.filter((post) => isPublishedEntry(post, now)));
}

export function getPublishedGuidePosts(now = new Date()) {
  return sortByDateDesc(allGuidePosts.filter((post) => isPublishedEntry(post, now)));
}

export function getPublishedBlogPostBySlug(slug: string, now = new Date()) {
  return getPublishedBlogPosts(now).find((post) => post.slug === slug);
}

export function getPublishedGuidePostBySlug(slug: string, now = new Date()) {
  return getPublishedGuidePosts(now).find((post) => post.slug === slug);
}

import { blogPosts } from "@/data/blog-posts";
import { scheduledBlogPosts } from "@/data/blog-posts-scheduled";
import { extraScheduledBlogPosts } from "@/data/blog-posts-scheduled-extra";
import { guidePosts } from "@/data/guides";
import { scheduledGuidePosts } from "@/data/guides-scheduled";
import { extraScheduledGuidePosts } from "@/data/guides-scheduled-extra";
import { siteConfig } from "@/lib/site";

export const DAILY_REVALIDATE_SECONDS = 86400;

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

function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

const baseBlogSlugs = new Set(blogPosts.map((post) => post.slug));
const baseGuideSlugs = new Set(guidePosts.map((post) => post.slug));

const futureBlogPosts = [
  ...scheduledBlogPosts.filter((post) => !baseBlogSlugs.has(post.slug)),
  ...extraScheduledBlogPosts,
];

const futureGuidePosts = [
  ...scheduledGuidePosts.filter((post) => !baseGuideSlugs.has(post.slug)),
  ...extraScheduledGuidePosts,
];

const allBlogPosts = [...blogPosts, ...futureBlogPosts];
const allGuidePosts = [...guidePosts, ...futureGuidePosts];

export function getAllBlogPosts() {
  return sortByDateDesc(allBlogPosts);
}

export function getAllGuidePosts() {
  return sortByDateDesc(allGuidePosts);
}

export function getPublishedBlogPosts(now = new Date()) {
  return sortByDateDesc(allBlogPosts.filter((post) => isPublishedDate(post.date, now)));
}

export function getPublishedGuidePosts(now = new Date()) {
  return sortByDateDesc(allGuidePosts.filter((post) => isPublishedDate(post.date, now)));
}

export function getPublishedBlogPostBySlug(slug: string, now = new Date()) {
  return getPublishedBlogPosts(now).find((post) => post.slug === slug);
}

export function getPublishedGuidePostBySlug(slug: string, now = new Date()) {
  return getPublishedGuidePosts(now).find((post) => post.slug === slug);
}

import { MetadataRoute } from "next";
import { getPublicationDate } from "@/data/publish-schedule";
import { tools } from "@/data/tools";
import { getPublishedBlogPosts, getPublishedGuidePosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

type SitemapEntry = MetadataRoute.Sitemap[number];

const SEARCH_DISCOVERY_EXCLUDED_PATHS = new Set([
  "/tools",
  "/neighborhood-test",
  "/feng-shui",
]);

function uniqueByUrl(entries: SitemapEntry[]) {
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/disclosure",
    "/editorial-policy",
    "/privacy",
    "/terms",
    "/blog",
    "/guide",
    "/safety-check",
    "/checklist",
  ]
    .filter((route) => !SEARCH_DISCOVERY_EXCLUDED_PATHS.has(route))
    .map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    }));

  const toolPages = tools
    .filter((tool) => tool.isReady && !SEARCH_DISCOVERY_EXCLUDED_PATHS.has(tool.href))
    .map((tool) => ({
      url: `${siteConfig.url}${tool.href}`,
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const blogPages = getPublishedBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: getPublicationDate(post),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guidePages = getPublishedGuidePosts().map((post) => ({
    url: `${siteConfig.url}/guide/${post.slug}`,
    lastModified: getPublicationDate(post),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return uniqueByUrl([...staticPages, ...toolPages, ...blogPages, ...guidePages]);
}

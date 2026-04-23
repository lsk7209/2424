import { MetadataRoute } from "next";
import { getPublicationDate } from "@/data/publish-schedule";
import { tools } from "@/data/tools";
import { getPublishedBlogPosts, getPublishedGuidePosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/disclosure",
    "/privacy",
    "/terms",
    "/blog",
    "/guide",
    "/tools",
    "/neighborhood-test",
    "/feng-shui",
    "/safety-check",
    "/checklist",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(siteConfig.updatedAt),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const toolPages = tools
    .filter((tool) => tool.isReady)
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

  return [...staticPages, ...toolPages, ...blogPages, ...guidePages];
}

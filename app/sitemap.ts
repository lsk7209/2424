import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { guidePosts } from "@/data/guides";
import { tools } from "@/data/tools";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static Pages
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
    priority: route === '' ? 1 : 0.8,
  }));

  // Tools Pages (Only Ready Tools)
  const toolPages = tools
    .filter((tool) => tool.isReady)
    .map((tool) => ({
      url: `${siteConfig.url}${tool.href}`,
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // Blog Posts
  const blogPages = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Guide Posts
  const guidePages = guidePosts.map((post) => ({
    url: `${siteConfig.url}/guide/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...blogPages, ...guidePages];
}

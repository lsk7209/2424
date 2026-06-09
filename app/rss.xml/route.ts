import { getPublicationDate } from "@/data/publish-schedule";
import { getPublishedBlogPosts, getPublishedGuidePosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const SITE_TITLE = "이사독립";
const SITE_DESCRIPTION =
  "이사 준비, 전세 계약 점검, 자취 생활 정보를 정리하는 이사독립 콘텐츠 피드입니다.";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const allPosts = [
    ...getPublishedBlogPosts().map((post) => ({ ...post, type: "blog" as const })),
    ...getPublishedGuidePosts().map((post) => ({ ...post, type: "guide" as const })),
  ].sort((a, b) => getPublicationDate(b).getTime() - getPublicationDate(a).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE} - 이사, 전세, 자취 생활 콘텐츠</title>
    <link>${siteConfig.url}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${allPosts
      .map((post) => {
        const url = `${siteConfig.url}/${post.type}/${post.slug}`;
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${getPublicationDate(post).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

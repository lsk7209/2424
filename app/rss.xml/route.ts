import { blogPosts } from '@/data/blog-posts';
import { guidePosts } from '@/data/guides';

const BASE_URL = 'https://today2424.kr';
const SITE_TITLE = '이사독립';
const SITE_DESCRIPTION =
  '이사 준비, 전세 계약 점검, 자취 생활 정보를 정리한 이사독립 콘텐츠 피드입니다.';

export async function GET() {
  const allPosts = [
    ...blogPosts.map((post) => ({ ...post, type: 'blog' as const })),
    ...guidePosts.map((post) => ({ ...post, type: 'guide' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE} - 이사, 전세, 자취 생활 콘텐츠</title>
    <link>${BASE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${allPosts
      .map((post) => {
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/${post.type}/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${post.type}/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

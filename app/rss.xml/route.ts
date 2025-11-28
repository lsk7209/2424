import { blogPosts } from '@/data/blog-posts';
import { guidePosts } from '@/data/guides';

const BASE_URL = 'https://today2424.kr';

export async function GET() {
    const allPosts = [
        ...blogPosts.map((post) => ({ ...post, type: 'blog' })),
        ...guidePosts.map((post) => ({ ...post, type: 'guide' })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>2424 - 이사, 전세, 부동산의 모든 것</title>
    <link>${BASE_URL}</link>
    <description>이사 준비, 전세 사기 예방, 부동산 상식 등 당신의 독립 생활을 돕는 유용한 정보를 제공합니다.</description>
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

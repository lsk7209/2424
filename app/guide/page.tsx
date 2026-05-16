import Link from "next/link";
import { BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";
import { getPublishedGuidePosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "가이드북",
  description: "등기부등본 보는 법, 계약서 작성, 전세보증보험, 이사 절차를 단계별로 정리한 실전 가이드 모음입니다. 계약 전 필수 확인.",
  path: "/guide",
  keywords: ["이사 가이드", "전세 계약 가이드", "등기부등본", "전세보증보험", "이사 준비 순서"],
});

export default function GuideIndexPage() {
  const posts = getPublishedGuidePosts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "이사독립 가이드북",
    description: "전세 계약, 이사 절차, 등기부등본 등 주거 실무 가이드 모음",
    url: absoluteUrl("/guide"),
    numberOfItems: posts.length,
    itemListElement: posts.slice(0, 10).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/guide/${post.slug}`),
      name: post.title,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Header />

      <main className="flex-1 container mx-auto py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">이사독립 가이드북</h1>
            <p className="text-lg text-muted-foreground">
              계약 전후에 필요한 절차와 실무 문서를 주제별로 정리했습니다.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/guide/${post.slug}`} className="block group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-muted">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <BookOpen className="w-3 h-3 mr-1" />
                        가이드
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

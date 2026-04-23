import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { guidePosts } from '@/data/guides';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: '가이드북',
  description: '등기부등본, 계약서, 보증보험, 이사 준비 절차를 주제별로 정리한 가이드 모음입니다.',
  path: '/guide',
  keywords: ['이사 가이드', '전세 계약 가이드', '등기부등본'],
});

export default function GuideIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">이사독립 가이드북</h1>
            <p className="text-lg text-muted-foreground">
              모르면 손해 보는 필수 정보, 쉽게 정리해 드립니다.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {guidePosts.map((post) => (
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

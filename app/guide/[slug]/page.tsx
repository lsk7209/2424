import { notFound } from 'next/navigation';
import Link from 'next/link';
import { guidePosts } from '@/data/guides';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, HelpCircle, CheckCircle2 } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GuidePostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: GuidePostPageProps) {
  const params = await props.params;
  const post = guidePosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${post.title} | 독립만세 가이드`,
    description: post.excerpt,
    keywords: post.keywords?.join(', '),
  };
}

export async function generateStaticParams() {
  return guidePosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function GuidePostPage(props: GuidePostPageProps) {
  const params = await props.params;
  const post = guidePosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container py-12">
        <article className="max-w-3xl mx-auto">
          {/* Back Link */}
          <div className="mb-8">
            <Link href="/guide">
              <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4 mr-2" />
                가이드 목록으로
              </Button>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-10 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1">
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                가이드
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight break-keep">
              {post.title}
            </h1>
            
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-lg text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <p>{post.excerpt}</p>
              </div>
            </div>

            {/* Keywords */}
            {post.keywords && (
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword) => (
                  <span key={keyword} className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    #{keyword}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg prose-green max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
              prose-p:text-gray-700 prose-p:leading-8
              prose-a:text-green-600 hover:prose-a:text-green-500 
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-img:rounded-xl prose-img:shadow-md
              prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section (AEO/GEO Optimized) */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-16 pt-10 border-t bg-gray-50/50 -mx-6 px-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">자주 묻는 질문 (FAQ)</h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white rounded-lg border shadow-sm">
                {post.faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="px-4">
                    <AccordionTrigger className="text-left font-medium text-lg py-4 hover:no-underline hover:text-green-600 transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t text-center">
            <h3 className="text-lg font-bold mb-2">이 가이드가 도움이 되셨나요?</h3>
            <p className="text-muted-foreground mb-6">친구들에게 공유하고 안전한 독립 생활을 응원해주세요!</p>
            <ShareButtons 
              title={post.title} 
              description={post.excerpt} 
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

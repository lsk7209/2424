import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronLeft, HelpCircle, Quote } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import PostCover from '@/components/PostCover';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import { processContent } from '@/lib/toc';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: BlogPostPageProps) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | 이사독립`,
    description: post.excerpt,
    keywords: post.keywords?.join(', '),
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Process content for TOC
  const { processedContent, toc } = processContent(post.content);

  // Find related posts (same category)
  const relatedPosts = blogPosts.filter(p => p.category === post.category);

  return (
    <div className="min-h-screen flex flex-col bg-white font-pretendard">
      <Header />

      <main className="flex-1 container max-w-4xl mx-auto py-12 px-4 md:px-6">
        <article className="mx-auto">
          {/* Back Link */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors text-base">
                <ChevronLeft className="w-5 h-5 mr-2" />
                블로그 목록으로
              </Button>
            </Link>
          </div>

          {/* Visual Cover Art */}
          <PostCover title={post.title} category={post.category} />

          {/* Header Info */}
          <header className="mb-12 space-y-8">
            <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground border-b pb-4">
              <CalendarDays className="w-5 h-5" />
              <time dateTime={post.date}>{post.date}</time>
              <span className="mx-2">|</span>
              <span className="font-medium text-blue-600">{post.category}</span>
            </div>

            {/* Excerpt Box - Enhanced Design */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-8 relative shadow-sm">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-blue-200 -z-10 opacity-50" />
              <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-relaxed pl-2 tracking-tight">
                {post.excerpt}
              </p>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-3">
              {post.keywords.map((keyword) => (
                <span key={keyword} className="text-sm font-medium px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-default">
                  #{keyword}
                </span>
              ))}
            </div>
          </header>

          {/* Table of Contents */}
          <TableOfContents toc={toc} />

          {/* Content - Expert Typography */}
          <div
            className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-gray-800
              prose-p:text-gray-700 prose-p:leading-loose prose-p:mb-8 prose-p:text-[1.125rem] md:prose-p:text-[1.25rem]
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
              prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-100 prose-strong:px-1
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
              prose-li:text-gray-700 prose-li:leading-loose prose-li:text-[1.125rem] md:prose-li:text-[1.25rem]
              prose-ul:my-8 prose-ol:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* FAQ Section (AEO/GEO Optimized) - Enhanced */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-20 pt-12 border-t-2 border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-2 rounded-full">
                  <HelpCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">자주 묻는 질문 (FAQ)</h2>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {post.faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                    <AccordionTrigger className="text-left font-bold text-xl py-6 hover:no-underline hover:text-blue-600 transition-colors">
                      <span className="mr-4 text-blue-500">Q.</span>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed text-lg pb-6 pl-8 border-t pt-4">
                      <span className="font-bold text-gray-400 mr-2">A.</span>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Share - Enhanced */}
          <div className="mt-20 pt-10 border-t border-gray-200 text-center bg-gray-50 rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">이 정보가 도움이 되셨나요?</h3>
            <p className="text-lg text-gray-600 mb-8">친구들에게 공유하고 함께 똑똑한 독립 생활을 즐겨보세요!</p>
            <ShareButtons
              title={post.title}
              description={post.excerpt}
            />
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} currentSlug={post.slug} type="blog" />
        </article>
      </main>

      <Footer />
    </div>
  );
}

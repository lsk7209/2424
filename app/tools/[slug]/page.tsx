import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools } from '@/data/tools';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Construction } from 'lucide-react';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: ToolPageProps) {
  const params = await props.params;
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.title} | 이사독립 도구함`,
    description: tool.description,
  };
}

export async function generateStaticParams() {
  // Only generate params for tools that are NOT external links (i.e., start with /tools/)
  return tools
    .filter((tool) => tool.href.startsWith('/tools/'))
    .map((tool) => ({
      slug: tool.slug,
    }));
}

export default async function ToolPage(props: ToolPageProps) {
  const params = await props.params;
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <div className="mb-8">
            <Link href="/tools">
              <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4 mr-2" />
                도구 목록으로
              </Button>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-10 space-y-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
              <tool.icon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              {tool.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {tool.description}
            </p>
          </header>

          {/* Tool Content Area */}
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-12 text-center">
            <Construction className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">준비 중인 기능입니다</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              현재 개발팀이 열심히 만들고 있습니다.<br />
              조금만 기다려주세요!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

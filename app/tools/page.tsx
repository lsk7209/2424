import Link from 'next/link';
import { tools } from '@/data/tools';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: '독립만세 도구함 - 자취 생활 필수 유틸리티',
  description: '이사 견적 계산기, 전월세 전환율 계산기 등 자취 생활에 꼭 필요한 도구들을 모았습니다.',
};

export default function ToolsIndexPage() {
  // AdSense Guard: Only show ready tools
  const readyTools = tools.filter(tool => tool.isReady);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">독립만세 도구함</h1>
            <p className="text-lg text-muted-foreground">
              복잡한 계산과 귀찮은 기록, 도구에게 맡기세요.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {readyTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.slug} href={tool.href} className="block group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-muted">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {tool.isNew && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Coming Soon Section for AdSense Safety (Instead of broken links) */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-6 text-center">준비 중인 도구들</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 opacity-60">
              {tools.filter(t => !t.isReady).map((tool) => (
                <Card key={tool.slug} className="bg-gray-100 border-dashed">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <tool.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">{tool.title}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

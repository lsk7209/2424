import Link from "next/link";
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
import { tools } from "@/data/tools";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "도구 모음",
  description:
    "이사 견적 계산기, 전월세 전환율 계산기, 중개수수료 계산기, D-Day 카운터 등 실전 도구를 한 번에 모았습니다.",
  path: "/tools",
  keywords: ["이사 계산기", "중개수수료 계산기", "전월세 전환율"],
});

export default function ToolsIndexPage() {
  const readyTools = tools.filter((tool) => tool.isReady);
  const upcomingTools = tools.filter((tool) => !tool.isReady);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto py-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              이사독립 도구 모음
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              계산과 비교가 필요한 순간에 바로 쓸 수 있는 실전형 도구만 모았습니다.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {readyTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link key={tool.slug} href={tool.href} className="block group">
                  <Card className="h-full border-muted transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        {tool.isNew && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="transition-colors group-hover:text-primary">
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

          <section className="space-y-6 border-t pt-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-950">준비 중인 도구</h2>
              <p className="mt-2 text-muted-foreground">
                완성도가 충분하지 않은 기능은 검수 안정성을 위해 숨기고 있습니다.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 opacity-70">
              {upcomingTools.map((tool) => (
                <Card key={tool.slug} className="border-dashed bg-gray-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <tool.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">{tool.title}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

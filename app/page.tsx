import Link from "next/link";
import { ArrowRight, CheckSquare, MapPin, Shield, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tools } from "@/data/tools";
import { absoluteUrl, siteConfig } from "@/lib/site";

const featuredTools = tools.filter((tool) => tool.isReady).slice(0, 4);

const faqItems = [
  {
    question: "이사독립 서비스는 무료인가요?",
    answer:
      "네. 현재 공개된 테스트, 체크리스트, 계산기와 정보성 콘텐츠는 무료로 이용할 수 있습니다.",
  },
  {
    question: "전세 위험 진단 결과는 법적 효력이 있나요?",
    answer:
      "아니요. 참고용 점검 도구이며 실제 계약 전에는 공인중개사, 법무사, 변호사 등 전문가 확인을 권장합니다.",
  },
  {
    question: "개인정보를 서버에 저장하나요?",
    answer:
      "서비스 이용에 꼭 필요한 최소 정보만 다루며, 테스트 성격상 브라우저 저장소를 활용하는 기능이 포함될 수 있습니다. 자세한 내용은 개인정보 처리방침에서 확인할 수 있습니다.",
  },
  {
    question: "어떤 사람에게 도움이 되나요?",
    answer:
      "사회초년생, 첫 자취 시작 사용자, 전세 계약 전 체크가 필요한 사용자, 이사 준비 일정이 막막한 사용자에게 특히 적합합니다.",
  },
];

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icons/icon-512.png"),
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contactEmail,
      availableLanguage: "Korean",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-sky-100/70 via-white to-transparent" />
          <div className="absolute left-1/2 top-0 h-[340px] w-[960px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/85 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                이사 준비, 계약 확인, 체크리스트를 한 곳에서
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
                이사할 때 꼭 필요한 정보만
                <br />
                한국어로 쉽게 정리했습니다
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                전세 계약 전 점검, 동네 찾기, 이사 체크리스트, 실전 계산기까지
                바로 사용하세요. 복잡한 준비 과정을 실제로 행동할 수 있는 화면으로
                바꿔드립니다.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-14 rounded-full px-8 text-lg shadow-xl shadow-primary/20">
                  <Link href="/neighborhood-test">
                    나에게 맞는 동네 찾기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 rounded-full px-8 text-lg">
                  <Link href="/tools">실전 계산기 모아보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto -mt-10 px-4 pb-20">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-0 bg-white shadow-lg shadow-slate-200/60">
              <CardHeader>
                <MapPin className="h-8 w-8 text-indigo-600" />
                <CardTitle>취향 기반 동네 탐색</CardTitle>
                <CardDescription>
                  추상적인 지역 비교 대신, 생활 스타일에 맞는 동네 후보를 먼저 좁힙니다.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 bg-white shadow-lg shadow-slate-200/60">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600" />
                <CardTitle>전세 계약 전 위험 점검</CardTitle>
                <CardDescription>
                  등기부등본과 보증금 관점에서 위험 신호를 빠르게 확인할 수 있습니다.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 bg-white shadow-lg shadow-slate-200/60">
              <CardHeader>
                <CheckSquare className="h-8 w-8 text-emerald-600" />
                <CardTitle>실제로 쓰는 준비 체크리스트</CardTitle>
                <CardDescription>
                  D-30부터 이사 당일까지 일정 순서대로 챙길 일을 바로 확인합니다.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
              바로 써먹는 핵심 도구
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
              검색으로 흩어진 정보를 찾기 전에, 지금 필요한 도구부터 실행해보세요.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link key={tool.slug} href={tool.href} className="group">
                  <Card className="h-full border-slate-200 bg-white/90 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl text-slate-900">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center text-sm font-semibold text-primary">
                      도구 열기
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid gap-6 rounded-[32px] bg-slate-950 px-6 py-10 text-white md:grid-cols-3 md:px-10">
            <div>
              <Sparkles className="mb-4 h-8 w-8 text-sky-300" />
              <h2 className="text-2xl font-bold">왜 이사독립인가</h2>
            </div>
            <div className="space-y-3 text-slate-200">
              <h3 className="font-semibold text-white">실전형 구성</h3>
              <p>
                읽고 끝나는 글보다, 체크하고 계산하고 비교하는 화면을 우선 제공합니다.
              </p>
            </div>
            <div className="space-y-3 text-slate-200">
              <h3 className="font-semibold text-white">정책 페이지 공개</h3>
              <p>
                소개, 문의, 개인정보 처리방침, 이용약관을 함께 제공해 서비스 신뢰 정보를 명확히 제공합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
                자주 묻는 질문
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                서비스 이용 전 가장 많이 확인하는 내용을 먼저 정리했습니다.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <Card key={item.question} className="border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 text-slate-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckSquare,
  FileText,
  MapPin,
  Shield,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tools } from "@/data/tools";
import { getPublishedBlogPosts, getPublishedGuidePosts } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const featuredTools = tools.filter((tool) => tool.isReady).slice(0, 6);

const trustItems = [
  {
    title: "계약 전 확인",
    description: "등기부등본, 보증금, 근저당처럼 놓치기 쉬운 위험 신호를 먼저 점검합니다.",
    icon: Shield,
  },
  {
    title: "이사 준비 순서",
    description: "D-30부터 이사 당일까지 해야 할 일을 일정 흐름에 맞춰 정리합니다.",
    icon: CheckSquare,
  },
  {
    title: "실전 계산",
    description: "이사비, 중개수수료, 전월세 전환처럼 바로 계산해야 하는 항목을 제공합니다.",
    icon: Calculator,
  },
];

const faqItems = [
  {
    question: "이사독립은 어떤 사이트인가요?",
    answer:
      "이사 준비, 전세 계약 점검, 자취 생활, 주거 관련 계산기를 한국어로 정리한 정보형 웹사이트입니다.",
  },
  {
    question: "콘텐츠는 누구에게 맞나요?",
    answer:
      "첫 자취를 준비하는 사용자, 전세 계약이 처음인 사용자, 이사 일정과 비용을 빠르게 확인하려는 사용자에게 맞습니다.",
  },
  {
    question: "전세 위험 진단 결과를 그대로 믿어도 되나요?",
    answer:
      "진단 결과는 참고용입니다. 실제 계약 전에는 등기부등본, 건축물대장, 보증보험 가능 여부를 확인하고 전문가 상담을 권장합니다.",
  },
  {
    question: "광고와 제휴 링크가 포함되나요?",
    answer:
      "사이트 운영을 위해 광고가 포함될 수 있으며, 광고와 제휴 운영 원칙은 별도 안내 페이지에 공개합니다.",
  },
];

const policyLinks = [
  { href: "/about", label: "운영 원칙", icon: FileText },
  { href: "/privacy", label: "개인정보 처리방침", icon: Shield },
  { href: "/contact", label: "문의 안내", icon: BookOpen },
  { href: "/disclosure", label: "광고 및 제휴 안내", icon: Calculator },
];

export default function Home() {
  const latestBlogPosts = getPublishedBlogPosts().slice(0, 3);
  const latestGuidePosts = getPublishedGuidePosts().slice(0, 3);

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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
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
        <section className="border-b bg-slate-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-20">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
                <MapPin className="h-4 w-4" />
                이사 준비와 전세 계약을 한 흐름으로 정리
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
                이사 전 확인할 것,
                <br />
                계약 전 놓치면 안 되는 것
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                이사독립은 전세 안전 점검, 이사 체크리스트, 동네 선택, 비용 계산을
                실제 행동 순서에 맞춰 제공하는 한국어 주거 정보 사이트입니다.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-lg px-6 text-base">
                  <Link href="/safety-check">
                    전세 위험 먼저 점검하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-lg px-6 text-base">
                  <Link href="/guide">가이드북 보기</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
                    </div>
                    <p className="leading-7 text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">바로 쓰는 핵심 도구</h2>
              <p className="mt-3 text-slate-600">
                계산, 비교, 점검이 필요한 순간에 먼저 열어볼 수 있는 기능입니다.
              </p>
            </div>
            <Link href="/tools" className="inline-flex items-center font-semibold text-blue-700">
              전체 도구 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link key={tool.slug} href={tool.href} className="group">
                  <Card className="h-full rounded-lg border-slate-200 transition-colors hover:border-blue-300">
                    <CardHeader>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-700">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="leading-7">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">최신 블로그</h2>
                  <p className="mt-2 text-slate-600">자취와 이사 준비에 필요한 실전 정보입니다.</p>
                </div>
                <Link href="/blog" className="text-sm font-semibold text-blue-700">
                  더보기
                </Link>
              </div>
              <div className="space-y-4">
                {latestBlogPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300">
                    <p className="text-sm font-semibold text-blue-700">{post.category}</p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 leading-7 text-slate-600">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">필수 가이드</h2>
                  <p className="mt-2 text-slate-600">계약 전후 절차와 서류 확인법을 정리했습니다.</p>
                </div>
                <Link href="/guide" className="text-sm font-semibold text-blue-700">
                  더보기
                </Link>
              </div>
              <div className="space-y-4">
                {latestGuidePosts.map((post) => (
                  <Link key={post.slug} href={`/guide/${post.slug}`} className="block rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300">
                    <p className="text-sm font-semibold text-emerald-700">{post.category}</p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 leading-7 text-slate-600">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:px-6">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">검수에 필요한 신뢰 정보</h2>
            <p className="mt-3 leading-7 text-slate-600">
              정보 출처, 개인정보, 광고 운영, 문의 경로를 분리해 사용자가 사이트 성격을 바로 확인할 수 있게 했습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {policyLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} className="rounded-lg border border-slate-200 p-5 font-semibold text-slate-800 transition-colors hover:border-blue-300 hover:text-blue-700">
                  <Icon className="mb-4 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t bg-slate-50">
          <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">자주 묻는 질문</h2>
              <p className="mt-3 text-slate-600">서비스 이용 전 확인할 내용을 간단히 정리했습니다.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <Card key={item.question} className="rounded-lg border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-950">{item.question}</CardTitle>
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

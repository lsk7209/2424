import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "서비스 소개",
  description:
    "이사독립이 어떤 원칙으로 운영되는지, 어떤 정보를 제공하는지, 어떻게 문의할 수 있는지 확인하세요.",
  path: "/about",
  keywords: ["서비스 소개", "이사독립", "운영 원칙"],
});

const valueItems = [
  {
    title: "실제 행동으로 이어지는 정보",
    body: "이사 준비와 전세 계약에서 바로 써먹을 수 있는 체크리스트와 계산기를 우선 제공합니다.",
  },
  {
    title: "신뢰 가능한 안내 구조",
    body: "소개, 문의, 개인정보 처리방침, 이용약관을 함께 제공해 서비스 운영 방식과 책임 범위를 명확히 안내합니다.",
  },
  {
    title: "초보자도 이해하기 쉬운 한국어",
    body: "부동산과 계약 용어를 가능한 한 쉽게 풀어 설명하고, 최종 판단이 필요한 부분은 전문가 상담을 권장합니다.",
  },
];

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `${siteConfig.name} 소개`,
    description:
      "이사독립의 서비스 목적, 운영 원칙, 문의 방법을 안내하는 페이지입니다.",
    url: absoluteUrl("/about"),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/icons/icon-512.png"),
      description: siteConfig.description,
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.contactEmail,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Header />

      <main className="flex-1 container py-10 md:py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          <section className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              이사 준비가 막막할 때
              <br />
              먼저 열어볼 수 있는 사이트를 목표로 합니다
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteConfig.name}은 이사 준비, 전세 계약 전 점검, 자취 시작 전 확인해야
              할 정보들을 이해하기 쉬운 한국어 화면으로 정리하는 서비스입니다.
            </p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>우리가 제공하는 것</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                동네 찾기 테스트, 전세 위험 진단, 이사 체크리스트, 실전 계산기,
                가이드와 블로그 콘텐츠를 통해 사용자가 필요한 정보를 빠르게 찾고
                실제 행동으로 이어질 수 있게 돕습니다.
              </p>
              <p>
                특히 첫 독립이나 첫 전세 계약처럼 실수가 비용으로 이어질 수 있는
                상황에서, 복잡한 용어보다 이해 가능한 순서와 체크 포인트를 우선합니다.
              </p>
            </CardContent>
          </Card>

          <section className="grid gap-6 md:grid-cols-3">
            {valueItems.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <Card>
            <CardHeader>
              <CardTitle>운영 원칙</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                1. 계약이나 법률 판단이 필요한 정보는 참고용으로 제공하고, 최종
                결정 전에는 전문가 확인을 권장합니다.
              </p>
              <p>
                2. 과장된 수익성 주장, 불분명한 출처, 의미 없는 자동 생성 문구 대신
                실제로 도움이 되는 설명과 도구를 우선합니다.
              </p>
              <p>
                3. 광고와 분석 도구를 사용할 수 있으며 관련 내용은{" "}
                <Link href="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
                  개인정보 처리방침
                </Link>
                과{" "}
                <Link href="/terms" className="font-medium text-primary underline-offset-4 hover:underline">
                  이용약관
                </Link>
                에서 확인할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="space-y-4 pt-6 text-center">
              <h2 className="text-2xl font-bold text-slate-950">문의 및 제안</h2>
              <p className="text-muted-foreground">
                서비스 오류 제보, 제휴 제안, 콘텐츠 개선 의견은 아래 경로로 받을 수 있습니다.
              </p>
              <p className="font-semibold text-slate-900">{siteConfig.contactEmail}</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  문의 페이지 보기
                </Link>
                <Link
                  href="/tools"
                  className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-white"
                >
                  도구 바로가기
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

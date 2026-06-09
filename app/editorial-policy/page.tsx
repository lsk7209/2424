import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "콘텐츠 작성 및 검수 기준",
  description:
    "이사입탁의 콘텐츠 작성 원칙, 출처 확인, 업데이트 기준, 광고와 편집 독립성, 오류 제보 절차를 안내합니다.",
  path: "/editorial-policy",
  keywords: ["콘텐츠 작성 기준", "편집 정책", "검수 기준", "출처 확인"],
});

const reviewItems = [
  {
    title: "공식 출처 우선 확인",
    body: "전세 계약, 이사 비용, 주거 안전처럼 판단에 영향을 주는 내용은 정부, 공공기관, 금융기관, 법령 안내 등 확인 가능한 출처를 우선 기준으로 삼습니다.",
  },
  {
    title: "실행 순서 중심 작성",
    body: "사용자가 바로 확인할 수 있도록 준비물, 확인 순서, 주의 신호, 다음 행동을 분리해 설명합니다. 과장된 확정 표현보다 확인 절차를 우선합니다.",
  },
  {
    title: "정기 업데이트와 오류 수정",
    body: "제도, 금리, 계약 관행처럼 바뀔 수 있는 정보는 수정 필요성을 점검하고, 오류 제보가 들어오면 확인 가능한 범위에서 반영합니다.",
  },
];

export default function EditorialPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "콘텐츠 작성 및 검수 기준",
    url: absoluteUrl("/editorial-policy"),
    description:
      "이사입탁의 콘텐츠 작성 원칙, 출처 확인, 업데이트 기준, 광고와 편집 독립성을 안내하는 페이지입니다.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.organization.name,
      url: siteConfig.url,
    },
    dateModified: siteConfig.updatedAt,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />

      <main className="container flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <section className="space-y-4 text-center">
            <p className="text-sm font-semibold text-primary">Editorial Policy</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              콘텐츠 작성 및 검수 기준
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteConfig.name}은 이사 준비, 전세 계약, 주거 생활 정보를 다룰 때 확인 가능한 근거와
              사용자의 실제 행동 순서를 우선합니다.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {reviewItems.map((item) => (
              <Card key={item.title} className="rounded-lg">
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
              <CardTitle>작성 원칙</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                글은 처음 이사하거나 전세 계약을 준비하는 사용자가 이해할 수 있는 표현을 기준으로
                작성합니다. 전문 용어가 필요한 경우에는 먼저 쉬운 설명을 붙이고, 사용자가 확인해야
                할 문서나 절차를 함께 제시합니다.
              </p>
              <p>
                위험 진단, 계산기, 체크리스트 결과는 참고 정보입니다. 실제 계약, 법률, 세무, 금융
                판단은 관련 기관의 최신 안내와 전문가 상담을 통해 다시 확인해야 합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>출처와 업데이트 기준</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                제도나 금액 기준이 있는 글은 공공기관, 법령, 금융기관, 지자체, 공식 서비스 안내처럼
                원문 확인이 가능한 출처를 우선합니다. 출처가 바뀌거나 기준일이 오래된 글은 수정
                필요성을 검토합니다.
              </p>
              <p>
                사이트 전체 기준일은 {siteConfig.updatedAt}이며, 개별 글은 발행일과 수정일을
                구조화 데이터에 함께 기록합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>광고와 편집 독립성</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-7 text-muted-foreground">
              <p>
                사이트 운영을 위해 Google AdSense 광고가 표시될 수 있습니다. 광고 노출 여부는 글의
                결론이나 추천 방향을 결정하지 않으며, 광고와 제휴 관련 안내는 별도 페이지에서
                공개합니다.
              </p>
              <p>
                자세한 내용은{" "}
                <Link href="/disclosure" className="font-medium text-primary underline-offset-4 hover:underline">
                  광고 및 제휴 안내
                </Link>
                에서 확인할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-2xl font-bold text-slate-950">오류 제보와 문의</h2>
              <p className="leading-7 text-muted-foreground">
                잘못된 정보, 오래된 기준, 접근성 문제, 광고 표시 문제를 발견했다면 문의 페이지나
                이메일로 알려주세요. 확인 가능한 제보는 우선순위를 정해 수정합니다.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-lg bg-primary px-5 py-3 text-center font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  문의 페이지
                </Link>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="rounded-lg border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

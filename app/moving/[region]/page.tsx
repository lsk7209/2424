import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Phone, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovingDirectoryTracker from "@/components/MovingDirectoryTracker";
import MovingSourceLink from "@/components/MovingSourceLink";
import { movingRegionGuidance } from "@/data/moving/region-guidance";
import { serializeJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import {
  getIndexableMovingRegion,
  getIndexableMovingRegions,
  MAX_VISIBLE_MOVING_PROVIDERS,
} from "@/lib/moving-directory";

interface MovingRegionPageProps {
  params: Promise<{
    region: string;
  }>;
}

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getIndexableMovingRegions().map((region) => ({ region: region.regionSlug }));
}

export async function generateMetadata(props: MovingRegionPageProps) {
  const params = await props.params;
  const region = getIndexableMovingRegion(params.region);
  const guidance = movingRegionGuidance[params.region];

  if (!region) {
    return {
      title: "지역 이사 업체 검색 결과",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: `${region.regionName} 이사 업체 검색 | 견적 비교 기준`,
    description: guidance
      ? `${guidance.decisionIntro} ${region.regionName} 이사 업체 검색 결과와 원문 링크를 확인하세요.`
      : `${region.regionName}에서 확인된 이사 업체 검색 결과를 원문 링크와 관찰 시각 기준으로 확인합니다. 업체 추천·순위 정보가 아닙니다.`,
    path: `/moving/${region.regionSlug}`,
    keywords: [`${region.regionName} 이사`, `${region.regionName} 포장이사`, `${region.regionName} 이삿짐센터`],
  });
}

function sourceLabel(source: "naver-place" | "google-maps") {
  return source === "naver-place" ? "네이버 지도" : "Google Maps";
}

function detailStatusLabel(status: "visible" | "not_visible" | "unprocessed") {
  if (status === "visible") {
    return "상세 페이지 수집됨";
  }
  if (status === "not_visible") {
    return "상세 정보 미확인";
  }
  return "상세 검증 대기";
}

export default async function MovingRegionPage(props: MovingRegionPageProps) {
  const params = await props.params;
  const region = getIndexableMovingRegion(params.region);

  if (!region) {
    notFound();
  }

  const visibleProviders = region.providers.slice(0, MAX_VISIBLE_MOVING_PROVIDERS);
  const guidance = movingRegionGuidance[region.regionSlug];
  const categoryCounts = Array.from(
    region.providers.reduce((counts, provider) => {
      counts.set(provider.category || "기타 이사 관련", (counts.get(provider.category || "기타 이사 관련") ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
  ).sort((a, b) => b[1] - a[1]);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${region.regionName} 이사 업체 검색 결과`,
    description: `${region.regionName}에서 수집 시점에 확인된 이사 업체 검색 결과`,
    url: absoluteUrl(`/moving/${region.regionSlug}`),
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: visibleProviders.length,
      itemListElement: visibleProviders.map((provider, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: provider.name,
      })),
    },
  };
  const faqSchema = guidance
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guidance.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;
  const observedDate = new Date(region.latestObservedAt).toLocaleDateString("ko-KR");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <MovingDirectoryTracker
        pageType="region"
        regionSlug={region.regionSlug}
        providerCount={region.providers.length}
        visibleDetailCount={region.visibleDetailCount}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
        />
      )}
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10 md:py-14">
        <div className="mx-auto max-w-5xl space-y-10">
          <nav aria-label="이동 경로" className="text-sm text-slate-500">
            <Link href="/moving" className="inline-flex items-center gap-1 hover:text-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              지역별 이사 업체 검색
            </Link>
          </nav>

          <header className="space-y-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              지역 검색 결과
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              {region.regionName} 이사 업체 검색 결과
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {region.regionName}을 검색했을 때 공개 지도에서 확인된 이사 관련 업체를 정리했습니다. 업체를 고르는 순위가 아니라,
              원문을 열어 최신 조건을 직접 비교하기 위한 목록입니다.
            </p>
          </header>

          <section className="grid gap-4 sm:grid-cols-3" aria-label="지역 검색 결과 요약">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">확인된 레코드</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{region.providers.length}</p>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">상세 페이지 수집</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{region.visibleDetailCount}</p>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">최근 관찰일</p>
              <p className="mt-2 text-xl font-bold text-slate-950">{observedDate}</p>
            </div>
          </section>

          <aside className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-7 text-blue-950">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <p className="font-bold">검색 결과의 범위</p>
                <p className="mt-1">
                  이 페이지는 {observedDate} 기준 공개 지도 검색 결과입니다. 현재 영업 여부, 가격, 보험, 서비스 품질, 순위 또는 업체 간 동일성을 보장하지 않습니다.
                  상담 전 원문과 계약 조건을 직접 확인하세요.
                </p>
              </div>
            </div>
          </aside>

          {guidance && (
            <section aria-labelledby="moving-decision-guide" className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-primary">지역별 비교 가이드</p>
                <h2 id="moving-decision-guide" className="mt-2 text-2xl font-bold text-slate-950">{guidance.decisionTitle}</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">{guidance.decisionIntro}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">이 검색 결과에서 보이는 구성</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guidance.focus}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {categoryCounts.map(([category, count]) => <li key={category}>{category} {count}개</li>)}
                  </ul>
                </article>
                <article className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">견적 전에 물어볼 질문</h3>
                  <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-700">
                    {guidance.questions.map((question) => <li key={question}>{question}</li>)}
                  </ol>
                </article>
              </div>
              <article className="rounded-2xl border border-slate-200 bg-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-950">{guidance.faq[0].question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{guidance.faq[0].answer}</p>
              </article>
            </section>
          )}

          <section aria-labelledby="moving-provider-list" className="space-y-5">
            <div>
              <h2 id="moving-provider-list" className="text-2xl font-bold text-slate-950">
                {region.regionName}에서 확인된 업체
              </h2>
              <p className="mt-2 text-slate-600">
                가나다순으로 표시하며, 표시 순서는 추천이나 품질 순위를 의미하지 않습니다.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {visibleProviders.map((provider) => (
                <article key={`${provider.source}:${provider.sourceId}`} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">{sourceLabel(provider.source)}</p>
                      <h3 className="mt-2 text-xl font-bold text-slate-950">{provider.name}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {detailStatusLabel(provider.detailStatus)}
                    </span>
                  </div>

                  <dl className="mt-5 space-y-3 text-sm text-slate-600">
                    {provider.category && (
                      <div>
                        <dt className="sr-only">업종</dt>
                        <dd>{provider.category}</dd>
                      </div>
                    )}
                    {provider.address && (
                      <div>
                        <dt className="sr-only">주소</dt>
                        <dd className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{provider.address}</dd>
                      </div>
                    )}
                    {provider.phone && (
                      <div>
                        <dt className="sr-only">전화번호</dt>
                        <dd className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{provider.phone}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4 text-sm">
                    <time dateTime={provider.observedAt} className="text-slate-500">
                      관찰 {new Date(provider.observedAt).toLocaleDateString("ko-KR")}
                    </time>
                    <MovingSourceLink
                      href={provider.sourceUrl}
                      source={provider.source}
                      regionSlug={region.regionSlug}
                      detailStatus={provider.detailStatus}
                    >
                      원문 확인
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </MovingSourceLink>
                  </div>
                </article>
              ))}
            </div>

            {region.providers.length > MAX_VISIBLE_MOVING_PROVIDERS && (
              <p className="rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">
                전체 {region.providers.length}개 중 {MAX_VISIBLE_MOVING_PROVIDERS}개를 표시합니다. 목록의 순서는 추천이 아니며, 더 최신인 원문 검색 결과를 우선 확인하세요.
              </p>
            )}
          </section>

          <section className="grid gap-4 md:grid-cols-2" aria-label="이사 준비 도움말">
            <Link href="/tools/moving-cost-calculator" className="rounded-2xl border bg-white p-6 transition hover:border-primary/40 hover:shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">이사 비용 계산기</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">견적 문의 전에 거리와 짐의 양을 기준으로 예상 비용을 계산해보세요.</p>
            </Link>
            <Link href="/guide/moving-center-selection" className="rounded-2xl border bg-white p-6 transition hover:border-primary/40 hover:shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">업체 견적 확인 가이드</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">방문 견적, 추가 작업비, 계약서에 남길 내용을 확인하세요.</p>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

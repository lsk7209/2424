import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { movingSourceManifest } from "@/data/moving";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovingDirectoryTracker from "@/components/MovingDirectoryTracker";
import { createPageMetadata } from "@/lib/metadata";
import { serializeJsonLd } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/site";
import { getIndexableMovingRegions, getMovingDataHealth } from "@/lib/moving-directory";

export const revalidate = 3600;

export function generateMetadata() {
  const regions = getIndexableMovingRegions();
  const baseMetadata = createPageMetadata({
    title: "지역별 이사 업체 검색",
    description: "공개 지도 검색 결과와 관찰 시각을 확인하며 지역별 이사 업체를 비교할 때 필요한 기준을 정리합니다.",
    path: "/moving",
    keywords: ["지역별 이사 업체", "이사업체 검색", "포장이사 업체", "이삿짐센터 검색"],
  });

  return {
    ...baseMetadata,
    robots: regions.length > 0 ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default function MovingDirectoryPage() {
  const regions = getIndexableMovingRegions();
  const health = getMovingDataHealth();

  const itemListSchema = regions.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "지역별 이사 업체 검색 결과",
        description: "원문 링크와 관찰 시각을 함께 확인하는 지역별 이사 업체 검색 결과",
        url: absoluteUrl("/moving"),
        numberOfItems: regions.length,
        itemListElement: regions.map((region, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${region.regionName} 이사 업체 검색`,
          url: absoluteUrl(`/moving/${region.regionSlug}`),
        })),
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <MovingDirectoryTracker
        pageType="hub"
        regionSlug="all"
        providerCount={health.validRecords}
        visibleDetailCount={health.visibleDetailCount}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }}
        />
      )}
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-10">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
            <p className="font-bold text-slate-900">lim-brain 수집 증거</p>
            <p className="mt-1">
              Naver {movingSourceManifest.sources["naver-place"].runDate} 수집본 {movingSourceManifest.sources["naver-place"].uniqueSourceIdCount.toLocaleString("ko-KR")}개와 Google {movingSourceManifest.sources["google-maps"].runDate} 수집본 {movingSourceManifest.sources["google-maps"].uniqueSourceIdCount.toLocaleString("ko-KR")}개의 source-native ID를 원본 데이터 저장소에서 대조했습니다.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              이 페이지에는 이사 관련 범주와 주소상 자치구를 확인할 수 있는 레코드만 표시합니다. 출처 간 이름·주소 일치만으로 동일 업체를 합치지 않습니다.
            </p>
          </aside>
          <header className="space-y-4">
            <p className="text-sm font-semibold text-primary">이사 업체 검색</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              지역별 이사 업체 검색
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              지도 서비스에서 확인한 이사 관련 업체 정보를 지역별로 모아, 원문 링크와 관찰 시각을 함께 보여드립니다.
              이 목록은 추천·순위·가격 비교가 아니라 직접 비교하기 위한 출발점입니다.
            </p>
          </header>

          {regions.length === 0 ? (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8" aria-labelledby="moving-data-status">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
                <div className="space-y-3">
                  <h2 id="moving-data-status" className="text-xl font-bold text-amber-950">
                    지역 페이지는 원본 검증 후 공개합니다
                  </h2>
                  <p className="leading-7 text-amber-900">
                    현재 공개용 원본 레코드가 연결되지 않았거나, 지역별 업체 수·상세 확인·관찰일 품질 게이트를 아직 통과하지 않았습니다.
                    수집 건수만으로 업체 페이지를 만들지 않도록 보호된 상태입니다.
                  </p>
                  <p className="text-sm leading-6 text-amber-800">
                    데이터 상태: {health.sourceStatus === "awaiting-raw-export" ? "원본 export 대기" : "검증 대기"} · 유효 레코드 {health.validRecords}개 · 공개 가능 지역 {health.indexableRegionCount}곳
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="grid gap-4 sm:grid-cols-3" aria-label="검색 결과 안내">
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">공개 가능 지역</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{regions.length}</p>
                </div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">유효 업체 레코드</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{health.validRecords}</p>
                </div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">상세 페이지 수집 레코드</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{health.visibleDetailCount}</p>
                </div>
              </section>

              <section aria-labelledby="moving-region-list" className="space-y-5">
                <div>
                  <h2 id="moving-region-list" className="text-2xl font-bold text-slate-950">지역 선택</h2>
                  <p className="mt-2 text-slate-600">지역을 선택하면 업체별 원문 링크와 확인 상태를 볼 수 있습니다.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {regions.map((region) => (
                    <Link
                      key={region.regionSlug}
                      href={`/moving/${region.regionSlug}`}
                      className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                            지역 검색 결과
                          </p>
                          <h3 className="mt-2 text-xl font-bold text-slate-950 group-hover:text-primary">
                            {region.regionName} 이사 업체
                          </h3>
                        </div>
                        <ArrowRight className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-sm text-slate-600">
                        {region.providers.length}개 레코드 · 최근 확인 {new Date(region.latestObservedAt).toLocaleDateString("ko-KR")}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="grid gap-4 md:grid-cols-2" aria-label="이사 업체 비교 도움말">
            <Link href="/tools/moving-cost-calculator" className="rounded-2xl border bg-white p-6 transition hover:border-primary/40 hover:shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">예상 이사 비용 먼저 계산하기</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">업체에 문의하기 전에 짐의 양·거리·층수를 기준으로 비교 기준을 잡아보세요.</p>
            </Link>
            <Link href="/guide/moving-center-selection" className="rounded-2xl border bg-white p-6 transition hover:border-primary/40 hover:shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">이사업체 견적 확인 순서</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">방문 견적, 추가 비용, 작업 범위를 확인할 때 놓치기 쉬운 항목을 정리했습니다.</p>
            </Link>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-sm leading-7 text-slate-600">
            <p className="font-bold text-slate-900">이 목록을 읽는 기준</p>
            <p className="mt-2">
              업체 정보는 수집 시점의 공개 지도 검색 결과입니다. 현재 영업 여부, 견적 금액, 보험 가입, 서비스 품질, 순위 또는 전국 누락 여부를 보장하지 않습니다.
              계약 전에는 업체 원문과 최신 상담 내용을 직접 확인하세요.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

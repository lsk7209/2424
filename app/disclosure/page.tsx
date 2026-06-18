import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: '광고 및 제휴 안내',
  description: '이사독립의 광고, 제휴 링크, 추천 콘텐츠 운영 원칙을 안내합니다.',
  path: '/disclosure',
  keywords: ['광고 안내', '제휴 안내', '추천 링크 고지'],
});

export default function DisclosurePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">광고 및 제휴 안내</h1>
            <p className="text-muted-foreground">
              서비스 내 광고와 추천 링크 운영 원칙을 투명하게 공개합니다.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. 광고 노출</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                이사독립은 서비스 운영 비용 충당을 위해 Google AdSense 광고를 포함할 수 있습니다.
              </p>
              <p>
                현재 광고 운영은 Google AdSense 자동광고 방식을 기준으로 하며, 본문 중간에 임의의 수동 광고 슬롯을 배치하지 않습니다.
              </p>
              <p>
                광고는 사용자의 콘텐츠 이용을 방해하거나 메뉴, 버튼, 다운로드 링크로 오인되지 않는 방식으로 운영하는 것을 원칙으로 합니다.
              </p>
              <p className="text-sm">
                AdSense 게시자 ID: <span className="font-semibold text-foreground">ca-pub-3050601904412736</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. 제휴 링크와 추천 콘텐츠</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                일부 글, 체크리스트, 도구 결과에는 외부 상품이나 서비스로 이동하는 추천 링크가 포함될 수 있습니다.
              </p>
              <p>
                이러한 링크를 통해 일정 수수료가 발생할 수 있으나, 추천 여부는 주제 적합성과 사용자 편의성을 우선으로 판단합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. 편집 독립성</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                광고 또는 제휴 가능성이 있더라도, 허위 정보나 과장된 표현을 대가로 제공하지 않습니다.
              </p>
              <p>
                계약, 법률, 금융 판단이 필요한 정보는 참고용으로 제공하며 최종 판단은 전문가 상담을 권장합니다.
              </p>
              <p>
                광고 게재 여부는 콘텐츠 주제 선정이나 결론에 영향을 주지 않으며, 사용자가 계약·금융·주거 안전 판단을 할 때는 공식 자료와 실제 서류 확인을 우선하도록 안내합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. 광고 관련 개인정보 안내</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                Google 및 제3자 광고 사업자는 쿠키와 식별자를 사용해 광고를 제공하고 측정할 수 있습니다. 자세한 내용은 개인정보 처리방침에서 확인할 수 있습니다.
              </p>
              <a
                href="/privacy"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                개인정보 처리방침 보기
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. 정보 확인과 공식 출처</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                부동산 계약, 이사 비용, 전월세 위험 진단은 사용자의 상황과 최신 제도에 따라 달라질 수 있습니다.
                이사납니다의 계산기와 체크리스트는 의사결정을 돕는 참고 자료이며, 계약 체결 전에는 등기부등본,
                건축물대장, 확정일자, 보증보험 가입 가능 여부를 직접 확인해야 합니다.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <a href="https://www.gov.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-200 p-4 text-sm hover:border-primary">
                  <strong className="block text-foreground">정부24</strong>
                  민원 서류와 공공 행정 정보를 확인합니다.
                </a>
                <a href="https://rt.molit.go.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-200 p-4 text-sm hover:border-primary">
                  <strong className="block text-foreground">국토교통부 실거래가</strong>
                  주변 거래 가격과 시세 흐름을 비교합니다.
                </a>
                <a href="https://www.khug.or.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-200 p-4 text-sm hover:border-primary">
                  <strong className="block text-foreground">주택도시보증공사</strong>
                  전세보증금 반환보증과 보증 제도를 확인합니다.
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. 문의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>광고 및 제휴 운영 방식에 대한 문의는 문의 페이지 또는 이메일로 접수할 수 있습니다.</p>
              <p>
                문의를 보낼 때는 문제가 된 페이지 주소, 광고 또는 링크가 표시된 위치, 확인한 날짜를 함께
                알려 주시면 검토가 빠릅니다. 단순 광고 노출 여부와 콘텐츠 오류는 분리해서 확인하며,
                주거 계약이나 이사 견적에 대한 개별 판단은 해당 업체, 공공기관, 전문가 상담을 우선해야 합니다.
              </p>
              <p>
                이사독립은 사용자가 광고와 본문을 혼동하지 않도록 정책 페이지를 공개합니다. 광고 수익은
                사이트 운영을 보조할 수 있지만, 전세 위험 신호, 계약 체크리스트, 이사 비용 설명의 결론을
                바꾸는 기준으로 사용하지 않습니다.
              </p>
              <p>
                본문에서 업체명, 서비스명, 공공기관 링크가 함께 등장하더라도 이는 확인 경로를 안내하기
                위한 목적입니다. 특정 업체 이용을 보장하거나 가격을 확정하지 않으며, 사용자는 실제 계약 전
                견적서, 약관, 환불 조건, 보험 적용 범위를 직접 확인해야 합니다.
              </p>
              <p>
                광고 관련 정정 요청은 페이지 단위로 기록해 검토합니다. 광고 위치가 본문 이해를 방해하거나
                정책 고지와 맞지 않는다고 판단되면 노출 방식을 조정할 수 있으며, 주거 안전과 계약 판단에
                필요한 설명은 광고 수익보다 우선합니다.
              </p>
              <p className="font-semibold text-foreground">contact@indielife.kr</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. 독자가 확인해야 할 기준</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                이사 비용, 중개보수, 전월세 계약, 보증보험, 청소·입주 서비스 안내는 지역과 계약 조건에 따라
                달라질 수 있습니다. 본문이나 제휴 링크에서 특정 업체명 또는 서비스명이 언급되더라도 이는
                확인 경로를 제공하기 위한 것이며, 실제 계약 전에는 견적서, 약관, 환불 조건, 방문 가능 시간,
                보험 적용 범위를 직접 확인해야 합니다.
              </p>
              <p>
                광고 또는 제휴 링크가 포함된 글에서도 편집 기준은 유지됩니다. 사용자가 주거 계약과 이사
                준비 과정에서 놓치기 쉬운 서류, 비용, 일정, 안전 확인 항목을 먼저 설명하고, 광고성 문구와
                정보성 안내가 혼동되지 않도록 페이지 단위로 고지합니다. 오류나 이해관계 표시가 부족한
                부분을 발견하면 문의 페이지로 정정 요청을 보내 주세요.
              </p>
              <p>
                계약 관련 판단은 가능한 한 공공기관, 임대차 신고 자료, 국토교통부 실거래가, 보증기관 안내,
                지자체 공지와 함께 대조하는 것이 좋습니다. 이사독립은 독자가 광고 노출 여부와 별개로
                필요한 체크리스트를 직접 검토할 수 있도록 운영 원칙과 연락 경로를 공개합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

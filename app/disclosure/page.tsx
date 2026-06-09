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
              <CardTitle>5. 문의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>광고 및 제휴 운영 방식에 대한 문의는 문의 페이지 또는 이메일로 접수할 수 있습니다.</p>
              <p className="font-semibold text-foreground">contact@indielife.kr</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

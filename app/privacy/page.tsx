import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site';

export const metadata = createPageMetadata({
  title: '개인정보 처리방침',
  description: '이사독립의 개인정보 처리 원칙과 쿠키, 분석 도구, 광고 관련 정책을 안내합니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">개인정보 처리방침</h1>
            <p className="text-muted-foreground">최종 수정일: 2026년 4월 23일</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. 처리 목적</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                {siteConfig.name}(이하 &quot;서비스&quot;)는 서비스 운영, 문의 응대, 이용 통계 확인, 광고 품질 개선을 위해 필요한 범위 안에서만 정보를 처리합니다.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>서비스 제공 및 오류 대응</li>
                <li>문의 및 제휴 요청 응대</li>
                <li>서비스 이용 현황 분석과 품질 개선</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. 보유 기간과 저장 방식</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                테스트나 체크리스트 기능 일부는 브라우저 저장소(localStorage)를 사용할 수 있습니다.
              </p>
              <p>
                사용자가 브라우저 데이터를 삭제하면 저장된 값도 함께 삭제되며, 서비스 운영자가 개인별 브라우저 저장값을 직접 조회하지는 않습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. 제3자 도구 사용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>서비스는 운영과 분석, 광고 제공을 위해 아래와 같은 제3자 도구를 사용할 수 있습니다.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Google Analytics 4: 방문 및 이용 흐름 분석</li>
                <li>Google AdSense: 광고 노출과 관련 측정</li>
              </ul>
              <p>
                각 도구의 쿠키 및 식별자 처리 방식은 해당 제공사의 정책에 따를 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. 이용자의 권리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>브라우저 저장소 데이터 삭제</li>
                <li>쿠키 차단 또는 삭제</li>
                <li>서비스 이용 중단 및 문의</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. 문의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>개인정보 처리와 관련한 문의는 아래 이메일로 접수할 수 있습니다.</p>
              <p className="font-semibold text-foreground">{siteConfig.contactEmail}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

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
                Google을 포함한 제3자 사업자는 쿠키, 웹 비콘, IP 주소, 브라우저 식별자와 같은 기술을 사용해 광고 노출, 광고 품질 측정, 부정 이용 방지, 서비스 분석을 수행할 수 있습니다.
              </p>
              <p>
                Google의 광고 쿠키 사용은 사용자가 이 사이트 또는 다른 사이트를 방문한 기록을 바탕으로 관련성 높은 광고를 제공하는 데 활용될 수 있습니다.
              </p>
              <p>
                사용자는 Google 광고 설정에서 개인 맞춤 광고를 관리하거나 사용 중지할 수 있습니다.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Google 광고 설정
                  </a>
                </li>
                <li>
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Google 파트너 사이트의 데이터 사용 안내
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. 쿠키 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                사용자는 브라우저 설정을 통해 쿠키 저장을 차단하거나 기존 쿠키를 삭제할 수 있습니다. 단, 쿠키를 제한하면 일부 기능, 분석, 광고 품질 측정이 정상적으로 동작하지 않을 수 있습니다.
              </p>
              <p>
                이 사이트는 사용자가 직접 입력한 민감한 개인정보를 공개 페이지에 게시하는 구조를 운영하지 않으며, 댓글이나 공개 회원 프로필 기능을 제공하지 않습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. 이용자의 권리</CardTitle>
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
              <CardTitle>6. 문의</CardTitle>
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

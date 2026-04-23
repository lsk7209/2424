import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site';

export const metadata = createPageMetadata({
  title: '이용약관',
  description: '이사독립 서비스 이용 시 적용되는 기본 약관과 책임 범위를 안내합니다.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">이용약관</h1>
            <p className="text-muted-foreground">최종 수정일: 2026년 4월 23일</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>제1조 목적</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                본 약관은 {siteConfig.name}(이하 &quot;서비스&quot;)가 제공하는 온라인 서비스의 이용과 관련해 서비스와 이용자 간의 권리, 의무, 책임사항을 정하는 것을 목적으로 합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제2조 서비스 내용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>이사 및 전세 계약 관련 정보성 콘텐츠 제공</li>
                <li>체크리스트, 테스트, 계산기 등 도구 제공</li>
                <li>문의 응대 및 운영 공지</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제3조 이용자의 책임</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>서비스를 불법적인 목적으로 이용해서는 안 됩니다.</li>
                <li>자동화된 공격, 해킹, 서비스 방해 행위를 해서는 안 됩니다.</li>
                <li>타인의 권리를 침해하는 방식으로 서비스를 이용해서는 안 됩니다.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제4조 면책</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>
                서비스에서 제공하는 정보와 계산 결과는 참고용입니다. 실제 계약, 법률 판단, 금전적 의사결정은 이용자 본인의 책임 아래 전문가와 함께 최종 확인해야 합니다.
              </p>
              <p>
                천재지변, 네트워크 장애, 외부 서비스 문제 등 불가항력 사유로 인해 서비스 제공이 중단될 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제5조 문의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-7">
              <p>서비스와 약관 관련 문의는 아래 이메일로 접수할 수 있습니다.</p>
              <p className="font-semibold text-foreground">{siteConfig.contactEmail}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

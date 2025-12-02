import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: '이용약관 - 이사독립',
    description: '이사독립의 이용약관입니다.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            이용약관
                        </h1>
                        <p className="text-muted-foreground">
                            최종 수정일: 2024년 11월 27일
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>제1조 (목적)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                본 약관은 이사독립(이하 "서비스")가 제공하는 모든 서비스의 이용과 관련하여
                                서비스와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제2조 (정의)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong className="text-foreground">"서비스"</strong>란 이사독립가 제공하는 모든 온라인 서비스를 의미합니다.</li>
                                <li><strong className="text-foreground">"이용자"</strong>란 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 모든 사람을 말합니다.</li>
                                <li><strong className="text-foreground">"콘텐츠"</strong>란 서비스에서 제공하는 모든 정보, 텍스트, 이미지, 동영상 등을 의미합니다.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제3조 (약관의 효력 및 변경)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.
                            </p>
                            <p>
                                2. 서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며,
                                약관이 변경되는 경우 서비스 내 공지사항을 통해 공지합니다.
                            </p>
                            <p>
                                3. 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제4조 (서비스의 제공)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>서비스는 다음과 같은 서비스를 제공합니다:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>동네 찾기 테스트 서비스</li>
                                <li>전세 사기 위험 진단 서비스</li>
                                <li>이사 체크리스트 서비스</li>
                                <li>풍수지리 테스트 서비스</li>
                                <li>기타 이사 관련 정보 제공 서비스</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제5조 (서비스의 중단)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                서비스는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수 있습니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>시스템 정기점검, 서버의 증설 및 교체, 네트워크의 불안정 등의 시스템 운영상 필요한 경우</li>
                                <li>정전, 서비스 설비의 장애, 서비스 이용 폭주 등으로 정상적인 서비스 제공이 불가능한 경우</li>
                                <li>기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제6조 (이용자의 의무)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>타인의 정보 도용</li>
                                <li>서비스의 정보를 변경하거나 서비스를 해킹하는 행위</li>
                                <li>서비스 운영을 고의로 방해하는 행위</li>
                                <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
                                <li>외설 또는 폭력적인 메시지, 화상, 음성 등을 공개 또는 게시하는 행위</li>
                                <li>기타 관련 법령에 위배되는 행위</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제7조 (면책조항)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                1. 서비스는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 및 기타 이에 준하는
                                불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
                            </p>
                            <p>
                                2. 서비스에서 제공하는 정보는 참고용이며, 법적 효력이 없습니다.
                                특히 전세 사기 진단 결과는 참고용 정보이므로 실제 계약 시에는
                                반드시 법무사나 전문가와 상담하시기 바랍니다.
                            </p>
                            <p>
                                3. 서비스는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나
                                상실한 것에 대하여 책임을 지지 않습니다.
                            </p>
                            <p>
                                4. 서비스는 이용자 상호간 또는 이용자와 제3자 간에 서비스를 매개로 발생한
                                분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제8조 (저작권)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                1. 서비스가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 서비스에 귀속됩니다.
                            </p>
                            <p>
                                2. 이용자는 서비스를 이용함으로써 얻은 정보를 서비스의 사전 승낙 없이
                                복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
                                제3자에게 이용하게 하여서는 안 됩니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>제9조 (분쟁 해결)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                1. 서비스와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법을 준거법으로 합니다.
                            </p>
                            <p>
                                2. 서비스와 이용자 간 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제소합니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground">
                                본 약관은 2024년 11월 27일부터 시행됩니다.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}

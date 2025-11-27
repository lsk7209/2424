import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: '개인정보 처리방침 - 독립만세',
    description: '독립만세의 개인정보 처리방침입니다.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            개인정보 처리방침
                        </h1>
                        <p className="text-muted-foreground">
                            최종 수정일: 2024년 11월 27일
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>1. 개인정보의 처리 목적</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                독립만세(이하 "서비스")는 다음의 목적을 위하여 개인정보를 처리합니다.
                                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                                이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>서비스 제공 및 개선</li>
                                <li>이용자 문의 응대</li>
                                <li>통계 분석 및 서비스 개선</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>2. 개인정보의 처리 및 보유 기간</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                <strong className="text-foreground">독립만세는 사용자의 개인정보를 서버에 저장하지 않습니다.</strong>
                            </p>
                            <p>
                                모든 사용자 데이터(테스트 결과, 체크리스트 진행 상황 등)는 사용자의 브라우저
                                로컬 스토리지에만 저장되며, 서비스 제공자는 이에 접근할 수 없습니다.
                            </p>
                            <p>
                                사용자가 브라우저 캐시를 삭제하거나 다른 기기에서 접속하는 경우
                                이전 데이터는 복구되지 않습니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>3. 개인정보의 제3자 제공</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                독립만세는 사용자의 개인정보를 제3자에게 제공하지 않습니다.
                            </p>
                            <p>
                                다만, 다음의 경우에는 예외로 합니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>사용자가 사전에 동의한 경우</li>
                                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>4. 개인정보의 파기</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                독립만세는 개인정보를 서버에 저장하지 않으므로 별도의 파기 절차가 필요하지 않습니다.
                            </p>
                            <p>
                                사용자는 언제든지 브라우저 설정에서 로컬 스토리지를 삭제하여
                                저장된 모든 데이터를 제거할 수 있습니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>5. 쿠키의 사용</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                독립만세는 서비스 개선 및 사용자 경험 향상을 위해 쿠키를 사용할 수 있습니다.
                            </p>
                            <p>
                                쿠키는 다음의 목적으로 사용됩니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>사용자 설정 저장</li>
                                <li>서비스 이용 통계 분석 (Google Analytics 등)</li>
                                <li>광고 표시 (Google AdSense 등)</li>
                            </ul>
                            <p>
                                사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나,
                                이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>6. 이용자의 권리</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                사용자는 언제든지 다음의 권리를 행사할 수 있습니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>로컬 스토리지에 저장된 데이터 삭제</li>
                                <li>쿠키 사용 거부 및 삭제</li>
                                <li>서비스 이용 중단</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>7. 개인정보 보호책임자</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                독립만세는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                                개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
                                아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <p><strong className="text-foreground">개인정보 보호책임자</strong></p>
                                <p>이메일: contact@indielife.kr</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>8. 개인정보 처리방침 변경</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                이 개인정보 처리방침은 2024년 11월 27일부터 적용됩니다.
                            </p>
                            <p>
                                법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는
                                변경사항의 시행 7일 전부터 서비스 내 공지사항을 통하여 고지할 것입니다.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}

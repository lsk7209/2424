import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: '문의 - 독립만세',
    description: '독립만세에 대한 문의사항이나 제안사항을 보내주세요.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            문의하기
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            서비스 개선 제안이나 문의사항을 보내주세요
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">이메일</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <a
                                    href="mailto:contact@indielife.kr"
                                    className="text-primary hover:underline"
                                >
                                    contact@indielife.kr
                                </a>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">카카오톡</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground">@독립만세</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <HelpCircle className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">FAQ</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground">준비 중입니다</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQ */}
                    <Card>
                        <CardHeader>
                            <CardTitle>자주 묻는 질문</CardTitle>
                            <CardDescription>
                                자주 문의하시는 내용을 정리했습니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Q. 서비스 이용은 무료인가요?</h3>
                                <p className="text-muted-foreground">
                                    네, 독립만세의 모든 서비스는 무료로 이용하실 수 있습니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Q. 전세 사기 진단 결과는 법적 효력이 있나요?</h3>
                                <p className="text-muted-foreground">
                                    전세 사기 진단은 참고용 정보이며, 법적 효력은 없습니다.
                                    실제 계약 전에는 반드시 법무사나 전문가와 상담하시기 바랍니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Q. 제휴 문의는 어떻게 하나요?</h3>
                                <p className="text-muted-foreground">
                                    제휴 문의는 contact@indielife.kr로 이메일 주시면 검토 후 회신 드리겠습니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Q. 개인정보는 안전한가요?</h3>
                                <p className="text-muted-foreground">
                                    독립만세는 사용자의 개인정보를 서버에 저장하지 않습니다.
                                    모든 데이터는 사용자의 브라우저에만 저장됩니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Q. 새로운 기능 제안을 하고 싶어요</h3>
                                <p className="text-muted-foreground">
                                    언제든 환영합니다! 이메일이나 카카오톡으로 제안해 주시면
                                    검토 후 서비스에 반영하도록 노력하겠습니다.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Business Hours */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">운영 시간 안내</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">평일</span>
                                <span className="font-medium">09:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">주말 및 공휴일</span>
                                <span className="font-medium">휴무</span>
                            </div>
                            <p className="text-muted-foreground pt-2">
                                * 문의 주신 내용은 영업일 기준 1-2일 내에 답변 드립니다.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}

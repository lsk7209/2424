import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, CheckSquare, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: '소개 - 독립만세',
    description: '독립만세는 이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼입니다.',
};

export default function AboutPage() {
    const features = [
        {
            icon: MapPin,
            title: '나만의 동네 찾기',
            description: '재미있는 테스트로 나에게 맞는 동네를 추천받아보세요.',
        },
        {
            icon: Shield,
            title: '전세 사기 진단',
            description: '깡통전세 위험도를 미리 확인하여 안전한 계약을 하세요.',
        },
        {
            icon: CheckSquare,
            title: '이사 체크리스트',
            description: '단계별 체크리스트로 빠짐없이 이사를 준비하세요.',
        },
        {
            icon: Sparkles,
            title: '풍수지리 테스트',
            description: '재미와 실용성을 겸비한 주거 유형 추천을 받아보세요.',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Hero */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            독립만세 소개
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            이사를 준비하는 모든 분들을 위한<br />
                            종합 정보 플랫폼
                        </p>
                    </div>

                    {/* Mission */}
                    <Card>
                        <CardHeader>
                            <CardTitle>우리의 미션</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                독립만세는 <strong className="text-foreground">이사라는 스트레스 상황을 독립이라는 설렘으로 재해석</strong>하여,
                                모든 분들이 안전하고 즐겁게 이사를 준비할 수 있도록 돕습니다.
                            </p>
                            <p>
                                첫 독립을 준비하는 청년부터 새로운 보금자리를 찾는 가족까지,
                                이사를 준비하는 모든 단계에서 필요한 정보와 도구를 제공합니다.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center">제공 서비스</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <Card key={index}>
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Values */}
                    <Card>
                        <CardHeader>
                            <CardTitle>핵심 가치</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">🎯 실용성</h3>
                                <p className="text-muted-foreground">
                                    실제로 도움이 되는 정보와 도구만을 제공합니다.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">🛡️ 신뢰성</h3>
                                <p className="text-muted-foreground">
                                    전세 사기 진단 등 중요한 정보는 정확한 계산식과 전문가 조언을 기반으로 합니다.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">😊 재미</h3>
                                <p className="text-muted-foreground">
                                    스트레스 받는 이사 준비 과정을 재미있게 만들어 드립니다.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact CTA */}
                    <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                        <CardContent className="pt-6 text-center space-y-4">
                            <h3 className="text-xl font-bold">문의하기</h3>
                            <p className="text-muted-foreground">
                                서비스 개선 제안이나 문의사항이 있으시면 언제든 연락주세요.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                문의하기
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}

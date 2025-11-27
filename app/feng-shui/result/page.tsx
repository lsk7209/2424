"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, RotateCcw, Home, ExternalLink, Sparkles } from 'lucide-react';
import { getFengShuiResult } from '@/lib/feng-shui-matcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function FengShuiResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [result, setResult] = useState<ReturnType<typeof getFengShuiResult> | null>(null);
    const [shareMessage, setShareMessage] = useState<string>('');

    useEffect(() => {
        const answersParam = searchParams.get('answers');
        if (!answersParam) {
            router.push('/feng-shui');
            return;
        }

        try {
            const answers = JSON.parse(decodeURIComponent(answersParam));
            const fengShuiResult = getFengShuiResult(answers);
            setResult(fengShuiResult);
        } catch (error) {
            router.push('/feng-shui');
        }
    }, [searchParams, router]);

    const handleShare = async () => {
        if (!result) return;

        const shareText = `나의 풍수지리 유형은 ${result.result.type}!\n\n독립만세에서 풍수지리 집터 테스트 해보세요!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '독립만세 - 풍수지리 집터 테스트',
                    text: shareText,
                    url: window.location.origin + '/feng-shui',
                });
            } catch {
                // 사용자가 공유를 취소한 경우
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareText + '\n' + window.location.origin);
                setShareMessage('결과가 클립보드에 복사되었습니다!');
                setTimeout(() => setShareMessage(''), 3000);
            } catch {
                setShareMessage('복사에 실패했습니다. 다시 시도해주세요.');
                setTimeout(() => setShareMessage(''), 3000);
            }
        }
    };

    const handleReset = () => {
        router.push('/feng-shui');
    };

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">결과를 분석하는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
                            <Sparkles className="h-5 w-5" />
                            <span className="font-medium">풍수지리 진단 완료</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {result.result.type}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            당신에게 맞는 집터를 찾았습니다!
                        </p>
                    </div>

                    {/* Main Result Card */}
                    <Card className="border-2 border-primary">
                        <CardHeader className="bg-primary/5">
                            <div className="text-center space-y-2">
                                <div className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-full text-2xl font-bold mb-2">
                                    {result.result.element}
                                </div>
                                <CardTitle className="text-2xl">
                                    {result.result.housing_type}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <p className="text-lg leading-relaxed text-center">
                                {result.result.description}
                            </p>

                            {/* Ideal Features */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">🏠 이상적인 집의 특징</h3>
                                <ul className="space-y-2">
                                    {result.result.ideal_features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary mt-1">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Colors */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">🎨 행운의 색상</h3>
                                <div className="flex gap-3">
                                    {result.result.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 bg-muted rounded-lg font-medium"
                                        >
                                            {color}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lucky Directions */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">🧭 행운의 방향</h3>
                                <div className="flex gap-3">
                                    {result.result.lucky_directions.map((direction, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                                        >
                                            {direction}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendations */}
                            {result.result.recommendations.length > 0 && (
                                <div className="pt-4 border-t space-y-3">
                                    <h3 className="font-semibold text-lg">💡 추천 아이템</h3>
                                    <div className="space-y-2">
                                        {result.result.recommendations.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-medium">{item.name}</span>
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Score Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>나의 성향 분석</CardTitle>
                            <CardDescription>
                                당신의 답변을 기반으로 분석한 결과입니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">분위기 선호도</span>
                                        <span className="text-muted-foreground">{result.scores.vibe}/10</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${result.scores.vibe * 10}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">편의성 중시도</span>
                                        <span className="text-muted-foreground">{result.scores.infra}/10</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${result.scores.infra * 10}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">예산 수준</span>
                                        <span className="text-muted-foreground">{result.scores.budget}/10</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-accent transition-all"
                                            style={{ width: `${result.scores.budget * 10}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" onClick={handleShare} className="gap-2">
                                <Share2 className="h-5 w-5" />
                                결과 공유하기
                            </Button>
                            <Button size="lg" variant="outline" onClick={handleReset} className="gap-2">
                                <RotateCcw className="h-5 w-5" />
                                다시 테스트하기
                            </Button>
                            <Button size="lg" variant="outline" asChild className="gap-2">
                                <Link href="/">
                                    <Home className="h-5 w-5" />
                                    홈으로
                                </Link>
                            </Button>
                        </div>

                        {/* Share Message Toast */}
                        {shareMessage && (
                            <div className="text-center">
                                <p className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg inline-block">
                                    {shareMessage}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* AdSense Placeholder */}
                    <div className="bg-muted/30 border-2 border-dashed rounded-lg p-8 text-center">
                        <p className="text-sm text-muted-foreground">광고 영역</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function FengShuiResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">로딩 중...</p>
                </div>
            </div>
        }>
            <FengShuiResultContent />
        </Suspense>
    );
}

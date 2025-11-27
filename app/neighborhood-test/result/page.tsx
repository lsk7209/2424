"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, RotateCcw, Home, ExternalLink } from 'lucide-react';
import { useNeighborhoodTest } from '@/lib/store';
import { getMatchResults } from '@/lib/neighborhood-matcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResultPage() {
    const router = useRouter();
    const { answers, resetTest, isCompleted } = useNeighborhoodTest();
    const [result, setResult] = useState<ReturnType<typeof getMatchResults> | null>(null);

    useEffect(() => {
        if (!isCompleted()) {
            router.push('/neighborhood-test');
            return;
        }

        const matchResult = getMatchResults(answers);
        setResult(matchResult);
    }, [answers, isCompleted, router]);

    const [shareMessage, setShareMessage] = useState<string>('');

    const handleShare = async () => {
        if (!result) return;

        const shareText = `나의 이상형 동네는 ${result.idealMatch.name}!\n하지만 현실은... ${result.realMatch.name} 😅\n\n독립만세에서 나만의 동네 찾기 테스트 해보세요!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '독립만세 - 나만의 동네 찾기',
                    text: shareText,
                    url: window.location.origin + '/neighborhood-test',
                });
            } catch {
                // 사용자가 공유를 취소한 경우 - 아무 작업 안 함
            }
        } else {
            // Fallback: Copy to clipboard
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
        resetTest();
        router.push('/neighborhood-test');
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
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            나만의 동네 찾기 결과
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            이상과 현실의 갭을 확인해보세요!
                        </p>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Ideal Match */}
                        <Card className="border-2 border-primary">
                            <CardHeader className="bg-primary/5">
                                <div className="text-center space-y-2">
                                    <div className="inline-block px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-2">
                                        이상형 동네
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl">
                                        {result.idealMatch.name}
                                    </CardTitle>
                                    <CardDescription className="text-base font-medium text-foreground">
                                        {result.idealMatch.archetype}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    {result.idealMatch.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {result.idealMatch.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {result.idealMatch.affiliate_products.length > 0 && (
                                    <div className="pt-4 border-t space-y-3">
                                        <h4 className="font-semibold text-sm text-muted-foreground">
                                            이 동네 필수 아이템
                                        </h4>
                                        {result.idealMatch.affiliate_products.slice(0, 2).map((product, index) => (
                                            <a
                                                key={index}
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="text-sm font-medium">{product.name}</span>
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Real Match */}
                        <Card className="border-2 border-accent">
                            <CardHeader className="bg-accent/5">
                                <div className="text-center space-y-2">
                                    <div className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-2">
                                        현실형 동네
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl">
                                        {result.realMatch.name}
                                    </CardTitle>
                                    <CardDescription className="text-base font-medium text-foreground">
                                        {result.realMatch.archetype}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    {result.realMatch.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {result.realMatch.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {result.realMatch.affiliate_products.length > 0 && (
                                    <div className="pt-4 border-t space-y-3">
                                        <h4 className="font-semibold text-sm text-muted-foreground">
                                            이 동네 필수 아이템
                                        </h4>
                                        {result.realMatch.affiliate_products.slice(0, 2).map((product, index) => (
                                            <a
                                                key={index}
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="text-sm font-medium">{product.name}</span>
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Score Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>나의 성향 분석</CardTitle>
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
                                    <p className="text-xs text-muted-foreground">
                                        {result.scores.vibe >= 7 ? '힙한 동네 선호' : result.scores.vibe >= 4 ? '적당한 분위기 선호' : '조용한 동네 선호'}
                                    </p>
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
                                    <p className="text-xs text-muted-foreground">
                                        {result.scores.infra >= 7 ? '편의시설 중요' : result.scores.infra >= 4 ? '적당한 편의성' : '자연 환경 선호'}
                                    </p>
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
                                    <p className="text-xs text-muted-foreground">
                                        {result.scores.budget >= 7 ? '프리미엄 선호' : result.scores.budget >= 4 ? '중간 예산' : '가성비 중시'}
                                    </p>
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

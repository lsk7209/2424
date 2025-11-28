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
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-purple-500/20">
            <Header />

            <main className="flex-1 container py-12 md:py-20 px-4">
                <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full mb-4 shadow-sm border border-purple-200">
                            <Sparkles className="h-4 w-4" />
                            <span className="font-bold text-sm">풍수지리 진단 완료</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            당신의 운명을 바꿀 집터는<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                {result.result.type}
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600">
                            나에게 딱 맞는 기운을 가진 곳을 찾았습니다! 🔮
                        </p>
                    </div>

                    {/* Main Result Card */}
                    <Card className="border-0 shadow-2xl shadow-purple-200/50 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300 bg-white">
                        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
                        <CardHeader className="bg-slate-50/50 pb-6 pt-10">
                            <div className="text-center space-y-4">
                                <div className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-2xl font-bold shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-transform">
                                    {result.result.element}
                                </div>
                                <CardTitle className="text-3xl md:text-4xl font-bold text-slate-800">
                                    {result.result.housing_type}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-8 px-6 md:px-10 pb-10">
                            <p className="text-lg leading-relaxed text-center text-slate-700 font-medium">
                                {result.result.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Ideal Features */}
                                <div className="space-y-4 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                                    <h3 className="font-bold text-lg flex items-center gap-2 text-purple-800">
                                        <span className="text-xl">🏠</span> 이상적인 집의 특징
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.result.ideal_features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3 text-slate-700">
                                                <span className="text-purple-600 mt-0.5 font-bold">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    {/* Colors */}
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                                            <span className="text-xl">🎨</span> 행운의 색상
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.result.colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 shadow-sm"
                                                >
                                                    {color}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lucky Directions */}
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                                            <span className="text-xl">🧭</span> 행운의 방향
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.result.lucky_directions.map((direction, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg font-medium shadow-sm"
                                                >
                                                    {direction}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lucky & Avoid Tips */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg flex items-center gap-2 text-emerald-600">
                                        <span className="text-xl">🍀</span> 행운을 부르는 팁
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.result.lucky_tips.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-3 text-slate-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                                <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                                                <span className="text-sm font-medium">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg flex items-center gap-2 text-rose-600">
                                        <span className="text-xl">⚠️</span> 이것만은 피하세요
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.result.avoid_tips.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-3 text-slate-700 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                                                <span className="text-rose-500 mt-0.5 font-bold">!</span>
                                                <span className="text-sm font-medium">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Recommendations */}
                            {result.result.recommendations.length > 0 && (
                                <div className="pt-8 border-t border-slate-100 space-y-4">
                                    <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800 justify-center">
                                        <span className="text-xl">💡</span> 복을 부르는 추천 아이템
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {result.result.recommendations.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-100 hover:border-purple-100 transition-all group"
                                            >
                                                <span className="font-medium text-slate-700 group-hover:text-purple-700">{item.name}</span>
                                                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-purple-500" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Score Summary */}
                    <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-center text-xl text-slate-800">📊 나의 성향 분석표</CardTitle>
                            <CardDescription className="text-center">
                                당신의 답변을 기반으로 분석한 결과입니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>분위기 선호도</span>
                                        <span className="text-purple-600">{result.scores.vibe * 10}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${result.scores.vibe * 10}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>편의성 중시도</span>
                                        <span className="text-indigo-600">{result.scores.infra * 10}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${result.scores.infra * 10}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>예산 수준</span>
                                        <span className="text-blue-600">{result.scores.budget * 10}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${result.scores.budget * 10}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-6 text-center">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" onClick={handleShare} className="w-full sm:w-auto px-8 h-14 text-lg rounded-full shadow-lg shadow-purple-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all gap-2 font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0">
                                <Share2 className="h-5 w-5" />
                                결과 공유하기
                            </Button>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button size="lg" variant="outline" onClick={handleReset} className="flex-1 sm:flex-none h-14 rounded-full border-2 hover:bg-slate-50 text-slate-600">
                                    <RotateCcw className="h-5 w-5 mr-2" />
                                    다시하기
                                </Button>
                                <Button size="lg" variant="outline" asChild className="flex-1 sm:flex-none h-14 rounded-full border-2 hover:bg-slate-50 text-slate-600">
                                    <Link href="/">
                                        <Home className="h-5 w-5 mr-2" />
                                        홈으로
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Share Message Toast */}
                        {shareMessage && (
                            <div className="animate-fade-in-up">
                                <p className="text-sm font-bold text-purple-600 bg-purple-50 px-6 py-3 rounded-full inline-block shadow-sm border border-purple-100">
                                    {shareMessage}
                                </p>
                            </div>
                        )}
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

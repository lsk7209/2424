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
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-primary/20">
            <Header />

            <main className="flex-1 container py-12 md:py-20 px-4">
                <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-2">
                            🎉 분석 완료!
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            나에게 딱 맞는 동네는?
                        </h1>
                        <p className="text-lg text-slate-600">
                            이상과 현실, 그 사이 어딘가... 😅
                        </p>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Ideal Match */}
                        <Card className="border-0 shadow-xl shadow-indigo-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-500" />
                            <CardHeader className="bg-white pb-2">
                                <div className="text-center space-y-3">
                                    <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold border border-indigo-100">
                                        💖 나의 이상형 동네
                                    </div>
                                    <CardTitle className="text-3xl md:text-4xl font-bold text-slate-800">
                                        {result.idealMatch.name}
                                    </CardTitle>
                                    <CardDescription className="text-lg font-medium text-indigo-500">
                                        {result.idealMatch.archetype}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6 bg-white">
                                <p className="text-slate-600 leading-relaxed text-center px-4">
                                    {result.idealMatch.description}
                                </p>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {result.idealMatch.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-100"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {result.idealMatch.affiliate_products.length > 0 && (
                                    <div className="pt-6 border-t border-slate-100 space-y-4">
                                        <h4 className="font-bold text-sm text-slate-400 text-center uppercase tracking-wider">
                                            이 동네 필수템
                                        </h4>
                                        <div className="space-y-2">
                                            {result.idealMatch.affiliate_products.slice(0, 2).map((product, index) => (
                                                <a
                                                    key={index}
                                                    href={product.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-all group/item"
                                                >
                                                    <span className="text-sm font-medium text-slate-700 group-hover/item:text-indigo-700">{product.name}</span>
                                                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover/item:text-indigo-500" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Rich Content: Pros & Cons */}
                                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-100">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-indigo-600 flex items-center gap-1">
                                            <span className="text-lg">👍</span> 장점
                                        </h4>
                                        <ul className="space-y-1">
                                            {result.idealMatch.pros.map((pro, idx) => (
                                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="text-indigo-400 mt-0.5">•</span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-rose-500 flex items-center gap-1">
                                            <span className="text-lg">👎</span> 단점
                                        </h4>
                                        <ul className="space-y-1">
                                            {result.idealMatch.cons.map((con, idx) => (
                                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="text-rose-300 mt-0.5">•</span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Rich Content: Fun Fact & Famous For */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    {result.idealMatch.funFact && (
                                        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                            <h4 className="font-bold text-sm text-indigo-800 mb-1 flex items-center gap-2">
                                                <span>💡</span> 알고 계셨나요?
                                            </h4>
                                            <p className="text-sm text-indigo-700 leading-relaxed">
                                                {result.idealMatch.funFact}
                                            </p>
                                        </div>
                                    )}

                                    {result.idealMatch.famousFor && (
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-sm text-slate-500 flex items-center gap-1">
                                                <span>📍</span> 핫플레이스
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.idealMatch.famousFor.map((place, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                                                        {place}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Real Match */}
                        <Card className="border-0 shadow-xl shadow-emerald-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                            <CardHeader className="bg-white pb-2">
                                <div className="text-center space-y-3">
                                    <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold border border-emerald-100">
                                        💰 현실적인 추천 동네
                                    </div>
                                    <CardTitle className="text-3xl md:text-4xl font-bold text-slate-800">
                                        {result.realMatch.name}
                                    </CardTitle>
                                    <CardDescription className="text-lg font-medium text-emerald-500">
                                        {result.realMatch.archetype}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6 bg-white">
                                <p className="text-slate-600 leading-relaxed text-center px-4">
                                    {result.realMatch.description}
                                </p>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {result.realMatch.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-100"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {result.realMatch.affiliate_products.length > 0 && (
                                    <div className="pt-6 border-t border-slate-100 space-y-4">
                                        <h4 className="font-bold text-sm text-slate-400 text-center uppercase tracking-wider">
                                            자취 꿀템 추천
                                        </h4>
                                        <div className="space-y-2">
                                            {result.realMatch.affiliate_products.slice(0, 2).map((product, index) => (
                                                <a
                                                    key={index}
                                                    href={product.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 transition-all group/item"
                                                >
                                                    <span className="text-sm font-medium text-slate-700 group-hover/item:text-emerald-700">{product.name}</span>
                                                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover/item:text-emerald-500" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Rich Content: Pros & Cons */}
                                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-100">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-emerald-600 flex items-center gap-1">
                                            <span className="text-lg">👍</span> 장점
                                        </h4>
                                        <ul className="space-y-1">
                                            {result.realMatch.pros.map((pro, idx) => (
                                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="text-emerald-400 mt-0.5">•</span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-rose-500 flex items-center gap-1">
                                            <span className="text-lg">👎</span> 단점
                                        </h4>
                                        <ul className="space-y-1">
                                            {result.realMatch.cons.map((con, idx) => (
                                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="text-rose-300 mt-0.5">•</span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Rich Content: Fun Fact & Famous For */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    {result.realMatch.funFact && (
                                        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                                            <h4 className="font-bold text-sm text-emerald-800 mb-1 flex items-center gap-2">
                                                <span>💡</span> 알고 계셨나요?
                                            </h4>
                                            <p className="text-sm text-emerald-700 leading-relaxed">
                                                {result.realMatch.funFact}
                                            </p>
                                        </div>
                                    )}

                                    {result.realMatch.famousFor && (
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-sm text-slate-500 flex items-center gap-1">
                                                <span>📍</span> 주요 명소
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.realMatch.famousFor.map((place, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                                                        {place}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Score Summary */}
                    <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-center text-xl text-slate-800">📊 나의 성향 분석표</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>힙한 분위기</span>
                                        <span className="text-indigo-600">{result.scores.vibe * 10}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${result.scores.vibe * 10}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-slate-500">
                                        {result.scores.vibe >= 7 ? '🔥 핫플레이스 매니아' : result.scores.vibe >= 4 ? '⚖️ 적당한 밸런스' : '🌿 조용한게 최고'}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>편의시설</span>
                                        <span className="text-emerald-600">{result.scores.infra * 10}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${result.scores.infra * 10}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-slate-500">
                                        {result.scores.infra >= 7 ? '🏪 슬세권 필수' : result.scores.infra >= 4 ? '⚖️ 있으면 좋음' : '🌲 자연인 모드'}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>가성비</span>
                                        <span className="text-amber-600">{100 - (result.scores.budget * 10)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${100 - (result.scores.budget * 10)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-slate-500">
                                        {result.scores.budget >= 7 ? '💎 플렉스 가능' : result.scores.budget >= 4 ? '⚖️ 합리적 소비' : '💰 가성비가 최고'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-6 text-center">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" onClick={handleShare} className="w-full sm:w-auto px-8 h-14 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all gap-2 font-bold">
                                <Share2 className="h-5 w-5" />
                                친구에게 결과 자랑하기
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
                                <p className="text-sm font-bold text-primary bg-primary/10 px-6 py-3 rounded-full inline-block shadow-sm">
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

/*
  ResultClient.tsx - Client component for Neighborhood Test Result page
  Provides UI with premium design, SEO-friendly structure, and sharing functionality.
*/
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Home, RotateCcw, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMatchResults } from '@/lib/neighborhood-matcher';
import { useNeighborhoodTest } from '@/lib/store';
import { absoluteUrl, siteConfig } from '@/lib/site';

export default function ResultClient() {
  const router = useRouter();
  const { answers, resetTest, isCompleted } = useNeighborhoodTest();
  const [shareMessage, setShareMessage] = useState('');
  const completed = isCompleted();
  const result = completed ? getMatchResults(answers) : null;

  useEffect(() => {
    if (!completed) {
      router.replace('/neighborhood-test');
    }
  }, [completed, router]);

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = `나의 이상형 동네는 ${result.idealMatch.name}!\n하지만 현실적인 추천은 ${result.realMatch.name}입니다.\n\n이사독립에서 테스트해보세요.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${siteConfig.name} - 나만의 동네 찾기`,
          text: shareText,
          url: absoluteUrl('/neighborhood-test'),
        });
      } catch {
        return;
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${absoluteUrl('/neighborhood-test')}`);
      setShareMessage('결과 링크를 복사했습니다.');
      window.setTimeout(() => setShareMessage(''), 3000);
    } catch {
      setShareMessage('복사에 실패했습니다. 다시 시도해 주세요.');
      window.setTimeout(() => setShareMessage(''), 3000);
    }
  };

  const handleReset = () => {
    resetTest();
    router.push('/neighborhood-test');
  };

  if (!result) {
    return (
      <div role="status" aria-live="polite" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">결과를 분석하는 중입니다.</p>
        </div>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '동네 매칭 결과',
    description: `이상형 동네: ${result.idealMatch.name}, 현실적인 추천: ${result.realMatch.name}`,
    url: absoluteUrl('/neighborhood-test/result'),
    mainEntity: {
      '@type': 'Thing',
      name: '동네 매칭 결과',
      description: '선택한 답변을 기준으로 이상형과 현실적인 추천 동네를 제안합니다.',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 container py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-2">
              분석 완료
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              나에게 맞는 동네 후보를 찾았습니다
            </h1>
            <p className="text-lg text-slate-600">이상과 현실 사이에서 균형 잡힌 추천을 확인해 보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl shadow-indigo-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-500" />
              <CardHeader className="bg-white pb-2">
                <div className="text-center space-y-3">
                  <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold border border-indigo-100">
                    이상형 동네
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-none">
                    {result.idealMatch.name}
                  </h2>
                  <CardDescription className="text-lg font-medium text-indigo-500">
                    {result.idealMatch.archetype}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-8 bg-white flex-1">
                <p className="text-slate-600 leading-relaxed text-center">
                  {result.idealMatch.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {result.idealMatch.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>
                {result.idealMatch.affiliate_products.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h3 className="font-bold text-sm text-slate-400 text-center uppercase tracking-wider">
                      이 동네 추천 아이템
                    </h3>
                    <div className="space-y-2">
                      {result.idealMatch.affiliate_products.slice(0, 2).map((product, idx) => (
                        <a key={idx} href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-all group/item">
                          <span className="text-sm font-medium text-slate-700 group-hover/item:text-indigo-700">
                            {product.name}
                          </span>
                          <ExternalLink className="h-4 w-4 text-slate-400 group-hover/item:text-indigo-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-emerald-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
              <CardHeader className="bg-white pb-2">
                <div className="text-center space-y-3">
                  <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold border border-emerald-100">
                    현실적인 추천
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-none">
                    {result.realMatch.name}
                  </h2>
                  <CardDescription className="text-lg font-medium text-emerald-500">
                    {result.realMatch.archetype}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-8 bg-white flex-1">
                <p className="text-slate-600 leading-relaxed text-center">
                  {result.realMatch.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {result.realMatch.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>
                {result.realMatch.affiliate_products.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h3 className="font-bold text-sm text-slate-400 text-center uppercase tracking-wider">
                      생활 추천 아이템
                    </h3>
                    <div className="space-y-2">
                      {result.realMatch.affiliate_products.slice(0, 2).map((product, idx) => (
                        <a key={idx} href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 transition-all group/item">
                          <span className="text-sm font-medium text-slate-700 group-hover/item:text-emerald-700">
                            {product.name}
                          </span>
                          <ExternalLink className="h-4 w-4 text-slate-400 group-hover/item:text-emerald-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-xl text-slate-800">나의 성향 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>분위기 선호</span>
                    <span className="text-indigo-600">{result.scores.vibe * 10}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${result.scores.vibe * 10}%` }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>편의시설 선호</span>
                    <span className="text-emerald-600">{result.scores.infra * 10}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${result.scores.infra * 10}%` }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>예산 여유</span>
                    <span className="text-amber-600">{100 - result.scores.budget * 10}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${100 - result.scores.budget * 10}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleShare}
                className="w-full sm:w-auto px-8 h-14 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all gap-2 font-bold"
                aria-label="결과 공유하기"
              >
                <Share2 className="h-5 w-5" />
                결과 공유하기
              </Button>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none h-14 rounded-full border-2 hover:bg-slate-50 text-slate-600"
                  aria-label="다시하기"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  다시하기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="flex-1 sm:flex-none h-14 rounded-full border-2 hover:bg-slate-50 text-slate-600"
                  aria-label="홈으로 이동"
                >
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    홈으로
                  </Link>
                </Button>
              </div>
            </div>
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

'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ruler, ArrowRightLeft, Grid } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function AreaConverterPage() {
  const [pyeong, setPyeong] = useState<string>('');
  const [sqm, setSqm] = useState<string>('');
  const hasTrackedRef = useRef(false);

  const maybeTrackUse = () => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent('tool_used', { tool_name: 'area_converter' });
    }
  };

  const handlePyeongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPyeong(val);
    if (val) {
      setSqm((parseFloat(val) * 3.305785).toFixed(2));
      maybeTrackUse();
    } else {
      setSqm('');
    }
  };

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (val) {
      setPyeong((parseFloat(val) * 0.3025).toFixed(2));
      maybeTrackUse();
    } else {
      setPyeong('');
    }
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "평수 ↔ 제곱미터 변환기",
    url: "https://www.today2424.kr/tools/area-converter",
    description: "평과 제곱미터를 실시간으로 양방향 변환하는 부동산 면적 계산기입니다.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <Header />

      <main className="flex-1 container mx-auto max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Ruler className="w-8 h-8 text-blue-600" />
            평수 ↔ 제곱미터 변환기
          </h1>
          <p className="text-gray-600">
            부동산 면적, 헷갈리지 마세요.<br />
            입력하는 즉시 자동으로 변환됩니다.
          </p>
        </div>

        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-blue-600 h-2" />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              {/* 평수 입력 */}
              <div className="flex-1 w-full space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-blue-500" /> 평 (Py)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={pyeong}
                    onChange={handlePyeongChange}
                    placeholder="예: 24"
                    className="h-16 text-2xl font-bold text-center bg-blue-50 border-blue-200 focus-visible:ring-blue-500"
                  />
                  <span className="absolute right-4 top-5 text-gray-400 font-medium">평</span>
                </div>
              </div>

              <div className="text-gray-400">
                <ArrowRightLeft className="w-8 h-8 rotate-90 md:rotate-0" />
              </div>

              {/* 제곱미터 입력 */}
              <div className="flex-1 w-full space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-green-500" /> 제곱미터 (㎡)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={sqm}
                    onChange={handleSqmChange}
                    placeholder="예: 79.3"
                    className="h-16 text-2xl font-bold text-center bg-green-50 border-green-200 focus-visible:ring-green-500"
                  />
                  <span className="absolute right-4 top-5 text-gray-400 font-medium">㎡</span>
                </div>
              </div>
            </div>

            {/* Visual Reference */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-center font-bold text-gray-900 mb-6">자주 찾는 면적 비교표</h3>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-bold text-gray-900">18평</div>
                  <div className="text-gray-500">59 ㎡</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-bold text-gray-900">24평</div>
                  <div className="text-gray-500">79~81 ㎡</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-bold text-gray-900">32평</div>
                  <div className="text-gray-500">105~109 ㎡</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mt-8 space-y-5 text-sm text-gray-600 leading-7">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">평과 제곱미터, 왜 헷갈릴까요?</h2>
            <p>
              한국 부동산 시장에서 면적은 여전히 <strong>평(坪)</strong>으로 표기되는 경우가 많지만,
              공식 문서와 등기부등본에는 <strong>㎡(제곱미터)</strong>로만 표기됩니다.
              1평은 약 3.306㎡이며, 반대로 1㎡는 약 0.3025평입니다.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">전용면적과 공급면적의 차이</h2>
            <p>
              매물 광고에서 말하는 평수는 대부분 <strong>공급면적(전용+공용)</strong> 기준입니다.
              실제로 생활하는 공간인 전용면적은 이보다 작으므로,
              계약 전 반드시 등기부등본의 전용면적을 확인하세요.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <p className="text-gray-500">관련 도구</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/tools/brokerage-fee-calculator" className="text-blue-600 hover:underline font-medium">중개수수료 계산기</Link>
              <Link href="/tools/moving-cost-calculator" className="text-blue-600 hover:underline font-medium">이사 견적 계산기</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

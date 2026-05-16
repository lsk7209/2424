'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, DollarSign, RefreshCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { trackEvent } from '@/lib/analytics';

export default function BrokerageFeeCalculatorPage() {
  const [type, setType] = useState<'rent' | 'sale'>('rent');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<{
    maxFee: number;
    rate: number;
    limit?: number;
  } | null>(null);

  const calculateFee = () => {
    const price = Number(amount) * 10000;
    if (!price) {
      return;
    }

    let rate = 0;
    let limit = 0;
    let calculatedFee = 0;

    if (type === 'sale') {
      if (price < 50000000) {
        rate = 0.6;
        limit = 250000;
      } else if (price < 200000000) {
        rate = 0.5;
        limit = 800000;
      } else if (price < 900000000) {
        rate = 0.4;
      } else if (price < 1200000000) {
        rate = 0.5;
      } else if (price < 1500000000) {
        rate = 0.6;
      } else {
        rate = 0.7;
      }
    } else if (price < 50000000) {
      rate = 0.5;
      limit = 200000;
    } else if (price < 100000000) {
      rate = 0.4;
      limit = 300000;
    } else if (price < 600000000) {
      rate = 0.3;
    } else if (price < 1200000000) {
      rate = 0.4;
    } else if (price < 1500000000) {
      rate = 0.5;
    } else {
      rate = 0.6;
    }

    calculatedFee = Math.floor(price * (rate / 100));

    if (limit > 0 && calculatedFee > limit) {
      calculatedFee = limit;
    }

    setResult({
      maxFee: calculatedFee,
      rate,
      limit,
    });
    trackEvent('tool_used', {
      tool_name: 'brokerage_fee_calculator',
      transaction_type: type,
      amount_manwon: Number(amount),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container mx-auto max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <DollarSign className="w-8 h-8 text-blue-600" />
            부동산 중개수수료 계산기
          </h1>
          <p className="text-gray-600">
            매매, 전세, 월세 거래의 법정 중개보수 상한 요율을 빠르게 확인하세요.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl p-6">
            <CardTitle className="text-xl font-bold">거래 정보 입력</CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-bold text-gray-800">거래 종류</Label>
              <RadioGroup value={type} onValueChange={(value) => setType(value as 'rent' | 'sale')} className="flex gap-4">
                <div className="flex-1">
                  <RadioGroupItem value="rent" id="rent" className="peer sr-only" />
                  <Label
                    htmlFor="rent"
                    className="flex items-center justify-center rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all font-bold text-lg"
                  >
                    전세 / 월세
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem value="sale" id="sale" className="peer sr-only" />
                  <Label
                    htmlFor="sale"
                    className="flex items-center justify-center rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all font-bold text-lg"
                  >
                    매매 / 교환
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-bold text-gray-800">거래 금액</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="예: 20000"
                  className="h-14 text-xl pl-4 pr-16"
                />
                <span className="absolute right-4 top-4 text-gray-500 font-medium">만원</span>
              </div>
              <p className="text-sm text-gray-500">
                월세는 보증금 + (월세 × 100) 금액으로 입력해 주세요.
              </p>
            </div>

            {result ? (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <p className="text-gray-600">최대 중개보수 (상한 요율 {result.rate}%)</p>
                  <div className="text-4xl font-bold text-blue-600">
                    {result.maxFee.toLocaleString()}원
                  </div>
                  <p className="text-sm text-gray-400">
                    부가세는 별도이며, 지역과 거래 조건에 따라 실제 협의 금액은 달라질 수 있습니다.
                    {result.limit && result.limit > 0 && ` (한도 ${result.limit.toLocaleString()}원 적용)`}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setResult(null);
                    setAmount('');
                  }}
                  variant="outline"
                  className="w-full mt-6 h-12"
                >
                  <RefreshCcw className="mr-2 w-4 h-4" /> 다시 계산하기
                </Button>
              </div>
            ) : (
              <Button
                onClick={calculateFee}
                className="w-full h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg"
                disabled={!amount}
              >
                수수료 계산하기 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </CardContent>
        </Card>

        <section className="mt-10 space-y-6 text-sm text-gray-600 leading-7">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">중개보수 상한 요율이란?</h2>
            <p>
              부동산 중개수수료(중개보수)는 매매·전세·월세 거래 금액에 따라 법으로 상한 요율이 정해져 있습니다.
              중개업소가 이 상한을 초과해 받는 것은 불법이며, 사전에 금액을 확인하고 협의하는 것이 좋습니다.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">월세 거래 금액 입력 방법</h2>
            <p>
              월세는 <strong>보증금 + (월세 × 100)</strong> 공식으로 환산한 금액을 입력하세요.
              예를 들어 보증금 1,000만원에 월세 50만원이라면 1,000 + (50 × 100) = 6,000만원을 입력합니다.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">부가세는 별도입니다</h2>
            <p>
              계산된 금액은 중개보수 상한액이며, 실제 청구 시 부가가치세(10%)가 추가될 수 있습니다.
              최종 금액은 중개업소와 사전에 서면으로 확인하세요.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <p className="text-gray-500">관련 도구 · 가이드</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/tools/moving-cost-calculator" className="text-blue-600 hover:underline font-medium">이사 견적 계산기</Link>
              <Link href="/tools/deposit-interest-calculator" className="text-blue-600 hover:underline font-medium">전월세 전환율 계산기</Link>
              <Link href="/safety-check" className="text-blue-600 hover:underline font-medium">전세 위험 진단</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DollarSign, ArrowRight, RefreshCcw } from 'lucide-react';

export default function BrokerageFeeCalculatorPage() {
  const [type, setType] = useState('rent'); // rent(임대차), sale(매매)
  const [amount, setAmount] = useState<string>(''); // 거래금액 (만원)
  const [result, setResult] = useState<{
    maxFee: number;
    rate: number;
    limit?: number;
  } | null>(null);

  const calculateFee = () => {
    const price = Number(amount) * 10000; // 원 단위
    if (!price) return;

    let rate = 0;
    let limit = 0;
    let calculatedFee = 0;

    if (type === 'sale') { // 매매/교환
      if (price < 50000000) { rate = 0.6; limit = 250000; }
      else if (price < 200000000) { rate = 0.5; limit = 800000; }
      else if (price < 900000000) { rate = 0.4; }
      else if (price < 1200000000) { rate = 0.5; }
      else if (price < 1500000000) { rate = 0.6; }
      else { rate = 0.7; }
    } else { // 임대차 (전월세)
      if (price < 50000000) { rate = 0.5; limit = 200000; }
      else if (price < 100000000) { rate = 0.4; limit = 300000; }
      else if (price < 600000000) { rate = 0.3; }
      else if (price < 1200000000) { rate = 0.4; }
      else if (price < 1500000000) { rate = 0.5; }
      else { rate = 0.6; }
    }

    calculatedFee = Math.floor((price * (rate / 100)));
    
    // 한도액 적용
    if (limit > 0 && calculatedFee > limit) {
      calculatedFee = limit;
    }

    setResult({
      maxFee: calculatedFee,
      rate: rate,
      limit: limit
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <DollarSign className="w-8 h-8 text-blue-600" />
            부동산 중개수수료 계산기
          </h1>
          <p className="text-gray-600">
            매매/전세/월세 거래 시 법정 중개보수 상한요율을 확인하세요.<br />
            (주택 기준, 부가세 별도)
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl p-6">
            <CardTitle className="text-xl font-bold">거래 정보 입력</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-8">
            {/* 거래 종류 */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-gray-800">거래 종류</Label>
              <RadioGroup value={type} onValueChange={setType} className="flex gap-4">
                <div className="flex-1">
                  <RadioGroupItem value="rent" id="rent" className="peer sr-only" />
                  <Label
                    htmlFor="rent"
                    className="flex items-center justify-center rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all font-bold text-lg"
                  >
                    전세/월세
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem value="sale" id="sale" className="peer sr-only" />
                  <Label
                    htmlFor="sale"
                    className="flex items-center justify-center rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all font-bold text-lg"
                  >
                    매매/교환
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 거래 금액 */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-gray-800">
                거래 금액 (보증금/매매가)
              </Label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="예: 20000 (2억원)"
                  className="h-14 text-xl pl-4 pr-16"
                />
                <span className="absolute right-4 top-4 text-gray-500 font-medium">만원</span>
              </div>
              <p className="text-sm text-gray-500">
                * 월세의 경우: 보증금 + (월세 × 100) 금액을 입력하세요.
              </p>
            </div>

            {result ? (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <p className="text-gray-600">최대 중개보수 (상한요율 {result.rate}%)</p>
                  <div className="text-4xl font-bold text-blue-600">
                    {result.maxFee.toLocaleString()} 원
                  </div>
                  <p className="text-sm text-gray-400">
                    * 부가세(VAT) 별도 금액입니다.
                    {result.limit && result.limit > 0 && ` (한도액 ${result.limit.toLocaleString()}원 적용)`}
                  </p>
                </div>
                
                <Button 
                  onClick={() => { setResult(null); setAmount(''); }} 
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
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, ArrowRight, RefreshCcw, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DepositInterestCalculatorPage() {
  const [deposit, setDeposit] = useState<string>(''); // 보증금 (만원)
  const [monthlyRent, setMonthlyRent] = useState<string>(''); // 월세 (만원)
  const [conversionRate, setConversionRate] = useState<string>('5.0'); // 전환율 (%)
  const [targetDeposit, setTargetDeposit] = useState<string>(''); // 변경할 보증금 (만원)
  
  const [result, setResult] = useState<{
    newMonthlyRent: number;
    diffMonthlyRent: number;
  } | null>(null);

  const calculate = () => {
    const dep = Number(deposit) * 10000;
    const rent = Number(monthlyRent) * 10000;
    const rate = Number(conversionRate) / 100;
    const targetDep = Number(targetDeposit) * 10000;

    if (!dep || !targetDep) return;

    // 전월세 전환율 공식: 월세 = (전세금 - 보증금) * 전환율 / 12
    // 여기서는 보증금 차액에 대한 월세 변화량을 계산
    
    const depositDiff = dep - targetDep; // 보증금이 줄어들면 양수(돌려받음), 늘어나면 음수(더 냄)
    
    // 보증금을 줄이고 월세를 늘리는 경우 (반전세 -> 월세)
    // 보증금을 늘리고 월세를 줄이는 경우 (월세 -> 전세)
    
    // 월세 변화량 = 보증금 차액 * 전환율 / 12
    const rentChange = (depositDiff * rate) / 12;
    
    // 새로운 월세 = 기존 월세 + 월세 변화량
    // 보증금이 줄어들면(depositDiff > 0) -> 월세는 늘어남(rentChange > 0)
    // 보증금이 늘어나면(depositDiff < 0) -> 월세는 줄어듦(rentChange < 0)
    
    const newRent = rent + rentChange;

    setResult({
      newMonthlyRent: Math.round(newRent / 10000), // 만원 단위 반올림
      diffMonthlyRent: Math.round(rentChange / 10000)
    });
  };

  const reset = () => {
    setDeposit('');
    setMonthlyRent('');
    setTargetDeposit('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Calculator className="w-8 h-8 text-blue-600" />
            전월세 전환율 계산기
          </h1>
          <p className="text-gray-600">
            보증금을 올리면 월세는 얼마나 줄어들까?<br />
            법정 전월세 전환율을 기준으로 계산해드립니다.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl p-6">
            <CardTitle className="text-xl font-bold">계산 정보 입력</CardTitle>
            <CardDescription className="text-blue-100">
              현재 계약 상태와 변경하고 싶은 보증금을 입력하세요.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">현재 보증금 (만원)</Label>
                <Input 
                  type="number" 
                  placeholder="예: 5000" 
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">현재 월세 (만원)</Label>
                <Input 
                  type="number" 
                  placeholder="예: 50" 
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-gray-700 flex items-center gap-2">
                전월세 전환율 (%)
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">통상 4~6%</span>
              </Label>
              <Input 
                type="number" 
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                step="0.1"
                className="text-lg h-12"
              />
              <p className="text-xs text-gray-500">
                * 주택임대차보호법상 상한선: 기준금리 + 2.0% (약 5.5%)
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-2">
                <Label className="font-bold text-blue-700">변경할 보증금 (만원)</Label>
                <Input 
                  type="number" 
                  placeholder="예: 10000" 
                  value={targetDeposit}
                  onChange={(e) => setTargetDeposit(e.target.value)}
                  className="text-lg h-12 border-blue-200 bg-blue-50"
                />
              </div>
            </div>

            {result ? (
              <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <p className="text-gray-600">예상되는 월세는</p>
                  <div className="text-4xl font-bold text-blue-600">
                    {result.newMonthlyRent.toLocaleString()} 만원
                  </div>
                  <p className={`text-sm font-medium ${result.diffMonthlyRent > 0 ? 'text-red-500' : 'text-green-600'}`}>
                    ({result.diffMonthlyRent > 0 ? '+' : ''}{result.diffMonthlyRent}만원 {result.diffMonthlyRent > 0 ? '인상' : '절약'})
                  </p>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button onClick={reset} variant="outline" className="flex-1 h-12">
                    <RefreshCcw className="mr-2 w-4 h-4" /> 초기화
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={calculate}
                className="w-full h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg mt-4"
                disabled={!deposit || !targetDeposit}
              >
                계산하기 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Alert className="mt-8 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800 font-bold">전월세 전환율이란?</AlertTitle>
          <AlertDescription className="text-blue-700 text-sm leading-relaxed mt-2">
            전세 보증금을 월세로 전환할 때 적용하는 비율입니다. <br/>
            <strong>계산식: (전세금 - 월세보증금) × 전환율 ÷ 12개월 = 월세</strong><br/>
            법정 전환율 한도 내에서 임대인과 협의하여 결정하는 것이 일반적입니다.
          </AlertDescription>
        </Alert>
      </main>

      <Footer />
    </div>
  );
}

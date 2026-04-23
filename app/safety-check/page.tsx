"use client";

import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle,
  Coins,
  FileText,
  Home,
  Info,
  RotateCcw,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { calculateSafetyRisk, formatAmount } from '@/lib/safety-calculator';

type Step = 'intro' | 'marketValue' | 'deposit' | 'mortgage' | 'result';

const propertyOptions = [
  { label: '아파트', description: '대표적인 공동주택 형태', icon: Building2 },
  { label: '빌라 / 다세대', description: '소형 주거지 계약 전에 특히 점검이 중요합니다.', icon: Home },
  { label: '오피스텔', description: '근저당과 임대차 조건을 함께 확인하세요.', icon: Building2 },
] as const;

export default function SafetyCheckPage() {
  const [step, setStep] = useState<Step>('intro');
  const [marketValue, setMarketValue] = useState('');
  const [deposit, setDeposit] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateSafetyRisk> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'marketValue' || step === 'deposit' || step === 'mortgage') {
      const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 100);
      return () => window.clearTimeout(timeoutId);
    }
  }, [step]);

  const getProgress = () => {
    switch (step) {
      case 'intro':
        return 20;
      case 'marketValue':
        return 45;
      case 'deposit':
        return 70;
      case 'mortgage':
        return 90;
      case 'result':
        return 100;
    }
  };

  const handleNext = () => {
    if (step === 'intro') {
      setStep('marketValue');
      return;
    }

    if (step === 'marketValue') {
      if (!marketValue || Number(marketValue) <= 0) {
        alert('매매 시세를 올바르게 입력해 주세요.');
        return;
      }

      setStep('deposit');
      return;
    }

    if (step === 'deposit') {
      if (!deposit || Number(deposit) <= 0) {
        alert('보증금을 올바르게 입력해 주세요.');
        return;
      }

      setStep('mortgage');
      return;
    }

    if (!mortgage || Number(mortgage) < 0) {
      alert('근저당 채권최고액을 입력해 주세요. 없으면 0을 입력하세요.');
      return;
    }

    const calculated = calculateSafetyRisk(Number(marketValue), Number(deposit), Number(mortgage));
    setResult(calculated);
    setStep('result');
  };

  const handleBack = () => {
    if (step === 'marketValue') {
      setStep('intro');
      return;
    }

    if (step === 'deposit') {
      setStep('marketValue');
      return;
    }

    if (step === 'mortgage') {
      setStep('deposit');
      return;
    }

    if (step === 'result') {
      setStep('mortgage');
    }
  };

  const handleReset = () => {
    setMarketValue('');
    setDeposit('');
    setMortgage('');
    setResult(null);
    setStep('intro');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleNext();
    }
  };

  const getResultIcon = () => {
    if (!result) {
      return null;
    }

    if (result.level === 'safe') {
      return <CheckCircle className="h-20 w-20 text-green-500" />;
    }

    if (result.level === 'warning') {
      return <AlertTriangle className="h-20 w-20 text-amber-500" />;
    }

    return <AlertCircle className="h-20 w-20 text-red-500" />;
  };

  const getResultColor = () => {
    if (!result) {
      return '';
    }

    if (result.level === 'safe') {
      return 'from-green-50 to-emerald-50 border-green-200';
    }

    if (result.level === 'warning') {
      return 'from-amber-50 to-orange-50 border-amber-200';
    }

    return 'from-red-50 to-rose-50 border-red-200';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 container mx-auto py-8 md:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                전세 사기 위험 진단기
              </h1>
              <p className="text-slate-600">
                시세, 보증금, 근저당 정보를 기준으로 위험 신호를 빠르게 점검합니다.
              </p>
            </div>

            {step !== 'result' && (
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden max-w-sm mx-auto">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            )}
          </div>

          <Card className="border-0 shadow-xl shadow-slate-200/60 overflow-hidden bg-white">
            {step !== 'result' && (
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-primary" />
            )}

            <CardContent className="p-6 md:p-10 min-h-[420px] flex flex-col justify-center">
              {step === 'intro' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center space-y-2">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">Step 1</span>
                    <h2 className="text-2xl font-bold text-slate-800">어떤 주택을 계약하려고 하나요?</h2>
                    <p className="text-sm text-slate-500">주택 유형을 고르면 다음 단계로 이동합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {propertyOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={handleNext}
                        className="flex items-center p-6 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group text-left"
                      >
                        <div className="bg-slate-100 p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-colors">
                          <option.icon className="h-6 w-6 text-slate-500 group-hover:text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-slate-800">{option.label}</div>
                          <div className="text-sm text-slate-500">{option.description}</div>
                        </div>
                        <ArrowRight className="ml-auto h-5 w-5 text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'marketValue' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center space-y-2">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">Step 2</span>
                    <h2 className="text-2xl font-bold text-slate-800">매매 시세는 얼마인가요?</h2>
                    <p className="text-slate-500 text-sm">국토부 실거래가나 KB 시세를 기준으로 입력해 주세요.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        ref={inputRef}
                        type="number"
                        placeholder="예: 50000"
                        value={marketValue}
                        onChange={(event) => setMarketValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-12 h-16 text-xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">만원</div>
                    </div>
                    {marketValue && (
                      <div className="text-center p-3 bg-primary/5 rounded-lg text-primary font-bold">
                        {formatAmount(Number(marketValue))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={handleBack} className="flex-1 h-14">
                      <ArrowLeft className="mr-2 h-4 w-4" /> 이전
                    </Button>
                    <Button size="lg" onClick={handleNext} className="flex-[2] h-14 text-lg">
                      다음 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'deposit' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center space-y-2">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">Step 3</span>
                    <h2 className="text-2xl font-bold text-slate-800">보증금은 얼마인가요?</h2>
                    <p className="text-slate-500 text-sm">실제 계약하려는 금액을 입력해 주세요.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Coins className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        ref={inputRef}
                        type="number"
                        placeholder="예: 30000"
                        value={deposit}
                        onChange={(event) => setDeposit(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-12 h-16 text-xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">만원</div>
                    </div>
                    {deposit && (
                      <div className="text-center p-3 bg-primary/5 rounded-lg text-primary font-bold">
                        {formatAmount(Number(deposit))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={handleBack} className="flex-1 h-14">
                      <ArrowLeft className="mr-2 h-4 w-4" /> 이전
                    </Button>
                    <Button size="lg" onClick={handleNext} className="flex-[2] h-14 text-lg">
                      다음 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'mortgage' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center space-y-2">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">Final Step</span>
                    <h2 className="text-2xl font-bold text-slate-800">근저당 채권최고액이 있나요?</h2>
                    <p className="text-slate-500 text-sm">등기부등본 &apos;을구&apos;의 채권최고액 합계를 입력해 주세요.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        ref={inputRef}
                        type="number"
                        placeholder="예: 0"
                        value={mortgage}
                        onChange={(event) => setMortgage(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-12 h-16 text-xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">만원</div>
                    </div>
                    {mortgage && (
                      <div className="text-center p-3 bg-primary/5 rounded-lg text-primary font-bold">
                        {formatAmount(Number(mortgage))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={handleBack} className="flex-1 h-14">
                      <ArrowLeft className="mr-2 h-4 w-4" /> 이전
                    </Button>
                    <Button size="lg" onClick={handleNext} className="flex-[2] h-14 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                      진단 결과 보기 <ShieldCheck className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'result' && result && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className={`text-center p-8 rounded-2xl bg-gradient-to-b ${getResultColor()} border-2`}>
                    <div className="flex justify-center mb-6">{getResultIcon()}</div>
                    <h2 className="text-3xl font-extrabold mb-2 text-slate-900">{result.message}</h2>
                    <div className="inline-block px-4 py-1 bg-white/50 rounded-full backdrop-blur-sm border border-black/5">
                      <p className="text-lg font-medium text-slate-700">
                        위험 비율: <span className="font-bold text-slate-900">{result.risk_ratio}%</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 px-2">
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${
                          result.level === 'safe'
                            ? 'bg-green-500'
                            : result.level === 'warning'
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(result.risk_ratio, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-400 px-1">
                      <span>안전</span>
                      <span>주의</span>
                      <span>위험</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" /> 참고 조언
                    </h3>
                    <ul className="space-y-3">
                      {result.advice.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleReset} variant="outline" size="lg" className="flex-1 h-14 border-2">
                      <RotateCcw className="mr-2 h-4 w-4" /> 다시 진단하기
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-6 text-sm text-slate-500">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" /> 등기부등본 확인 팁
            </h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>인터넷등기소(iros.go.kr)에서 열람할 수 있습니다.</li>
              <li>&apos;을구&apos;의 채권최고액을 모두 합산해 입력해 주세요.</li>
              <li>시세는 국토부 실거래가나 KB 시세를 함께 참고하면 좋습니다.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

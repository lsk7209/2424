"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, AlertTriangle, Info, ArrowRight, ArrowLeft, RotateCcw, ShieldCheck, Building2, Wallet, Coins, FileText } from 'lucide-react';
import { calculateSafetyRisk, formatAmount } from '@/lib/safety-calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Step = 'intro' | 'market_value' | 'deposit' | 'mortgage' | 'result';

export default function SafetyCheckPage() {
    const [step, setStep] = useState<Step>('intro');
    const [propertyType, setPropertyType] = useState<'apartment' | 'villa' | 'officetel'>('apartment');
    const [marketValue, setMarketValue] = useState<string>('');
    const [deposit, setDeposit] = useState<string>('');
    const [mortgage, setMortgage] = useState<string>('');
    const [result, setResult] = useState<ReturnType<typeof calculateSafetyRisk> | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when step changes
    useEffect(() => {
        if (step === 'market_value' || step === 'deposit' || step === 'mortgage') {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [step]);

    const handleNext = () => {
        if (step === 'intro') setStep('market_value');
        else if (step === 'market_value') {
            if (!marketValue || parseFloat(marketValue) <= 0) {
                alert('올바른 시세를 입력해주세요.');
                return;
            }
            setStep('deposit');
        }
        else if (step === 'deposit') {
            if (!deposit || parseFloat(deposit) <= 0) {
                alert('올바른 보증금을 입력해주세요.');
                return;
            }
            setStep('mortgage');
        }
        else if (step === 'mortgage') {
            if (mortgage === '' || parseFloat(mortgage) < 0) {
                alert('올바른 채권액을 입력해주세요 (없으면 0).');
                return;
            }
            calculateResult();
        }
    };

    const handleBack = () => {
        if (step === 'market_value') setStep('intro');
        else if (step === 'deposit') setStep('market_value');
        else if (step === 'mortgage') setStep('deposit');
        else if (step === 'result') setStep('mortgage');
    };

    const calculateResult = () => {
        const marketValueNum = parseFloat(marketValue);
        const depositNum = parseFloat(deposit);
        const mortgageNum = parseFloat(mortgage);

        const calculatedResult = calculateSafetyRisk(marketValueNum, depositNum, mortgageNum);
        setResult(calculatedResult);
        setStep('result');
    };

    const handleReset = () => {
        setMarketValue('');
        setDeposit('');
        setMortgage('');
        setResult(null);
        setStep('intro');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    const getProgress = () => {
        switch (step) {
            case 'intro': return 25;
            case 'market_value': return 50;
            case 'deposit': return 75;
            case 'mortgage': return 90;
            case 'result': return 100;
        }
    };

    const getResultIcon = () => {
        if (!result) return null;
        switch (result.level) {
            case 'safe': return <CheckCircle className="h-20 w-20 text-green-500" />;
            case 'warning': return <AlertTriangle className="h-20 w-20 text-amber-500" />;
            case 'danger': return <AlertCircle className="h-20 w-20 text-red-500" />;
        }
    };

    const getResultColor = () => {
        if (!result) return '';
        switch (result.level) {
            case 'safe': return 'from-green-50 to-emerald-50 border-green-200';
            case 'warning': return 'from-amber-50 to-orange-50 border-amber-200';
            case 'danger': return 'from-red-50 to-rose-50 border-red-200';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-1 container mx-auto py-8 md:py-16 px-4">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Header & Progress */}
                    <div className="space-y-6 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                                전세 사기 위험 진단기
                            </h1>
                            <p className="text-slate-600">
                                안전한 전세 계약을 위한 필수 체크! 🛡️
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

                    {/* Wizard Content */}
                    <Card className="border-0 shadow-xl shadow-slate-200/60 overflow-hidden bg-white">
                        {step !== 'result' && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />
                        )}

                        <CardContent className="p-6 md:p-10 min-h-[400px] flex flex-col justify-center">
                            {/* Step 1: Intro & Type */}
                            {step === 'intro' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="text-center space-y-2">
                                        <span className="text-primary font-bold tracking-wider text-sm uppercase">Step 1</span>
                                        <h2 className="text-2xl font-bold text-slate-800">어떤 집을 알아보고 계신가요?</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { value: 'apartment', label: '아파트', icon: Building2 },
                                            { value: 'villa', label: '빌라 / 다세대', icon: HomeIcon },
                                            { value: 'officetel', label: '오피스텔', icon: Building2 },
                                        ].map((type) => (
                                            <button
                                                key={type.value}
                                                onClick={() => {
                                                    setPropertyType(type.value as any);
                                                    handleNext();
                                                }}
                                                className="flex items-center p-6 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group text-left"
                                            >
                                                <div className="bg-slate-100 p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-colors">
                                                    <type.icon className="h-6 w-6 text-slate-500 group-hover:text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-800">{type.label}</div>
                                                    <div className="text-sm text-slate-500">가장 일반적인 주거 형태입니다</div>
                                                </div>
                                                <ArrowRight className="ml-auto h-5 w-5 text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Market Value */}
                            {step === 'market_value' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="text-center space-y-2">
                                        <span className="text-primary font-bold tracking-wider text-sm uppercase">Step 2</span>
                                        <h2 className="text-2xl font-bold text-slate-800">매매 시세는 얼마인가요?</h2>
                                        <p className="text-slate-500 text-sm">부동산 앱이나 국토부 실거래가를 참고하세요</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                            <Input
                                                ref={inputRef}
                                                type="number"
                                                placeholder="예: 50000 (5억원)"
                                                value={marketValue}
                                                onChange={(e) => setMarketValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                className="pl-12 h-16 text-xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">만원</div>
                                        </div>
                                        {marketValue && (
                                            <div className="text-center p-3 bg-primary/5 rounded-lg text-primary font-bold">
                                                {formatAmount(parseFloat(marketValue))}
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

                            {/* Step 3: Deposit */}
                            {step === 'deposit' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="text-center space-y-2">
                                        <span className="text-primary font-bold tracking-wider text-sm uppercase">Step 3</span>
                                        <h2 className="text-2xl font-bold text-slate-800">전세 보증금은 얼마인가요?</h2>
                                        <p className="text-slate-500 text-sm">계약하려는 금액을 입력해주세요</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Coins className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                            <Input
                                                ref={inputRef}
                                                type="number"
                                                placeholder="예: 30000 (3억원)"
                                                value={deposit}
                                                onChange={(e) => setDeposit(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                className="pl-12 h-16 text-xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">만원</div>
                                        </div>
                                        {deposit && (
                                            <div className="text-center p-3 bg-primary/5 rounded-lg text-primary font-bold">
                                                {formatAmount(parseFloat(deposit))}
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

                            {/* Step 4: Mortgage */}
                            {step === 'mortgage' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="text-center space-y-2">
                                        <span className="text-primary font-bold tracking-wider text-sm uppercase">Final Step</span>
                                        <h2 className="text-2xl font-bold text-slate-800">근저당(빚)이 있나요?</h2>
                                        <p className="text-slate-500 text-sm">등기부등본 '을구'의 채권최고액 합계 (없으면 0)</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                            <Input
                                                ref={inputRef}
                                                type="number"
                                                placeholder="예: 0 (없음)"
                                                value={mortgage}
                                                onChange={(e) => setMortgage(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                className="pl-12 h-16 text-xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">만원</div>
                                        </div>
                                        {mortgage && (
                                            <div className="text-center p-3 bg-primary/5 rounded-lg text-primary font-bold">
                                                {formatAmount(parseFloat(mortgage))}
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

                            {/* Result Step */}
                            {step === 'result' && result && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className={`text-center p-8 rounded-2xl bg-gradient-to-b ${getResultColor()} border-2`}>
                                        <div className="flex justify-center mb-6 animate-bounce-slow">
                                            {getResultIcon()}
                                        </div>
                                        <h2 className="text-3xl font-extrabold mb-2 text-slate-900">
                                            {result.message}
                                        </h2>
                                        <div className="inline-block px-4 py-1 bg-white/50 rounded-full backdrop-blur-sm border border-black/5">
                                            <p className="text-lg font-medium text-slate-700">
                                                위험 비율: <span className="font-bold text-slate-900">{result.risk_ratio}%</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2 px-2">
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                            <div
                                                className={`h-full transition-all duration-1000 ease-out ${result.level === 'safe' ? 'bg-green-500' :
                                                        result.level === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${Math.min(result.risk_ratio, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs font-medium text-slate-400 px-1">
                                            <span>안전 (0%)</span>
                                            <span>주의 (70%)</span>
                                            <span>위험 (80%+)</span>
                                        </div>
                                    </div>

                                    {/* Advice */}
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                            <Info className="h-5 w-5 text-primary" /> 전문가 조언
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

                                    {/* CTA */}
                                    <div className="flex gap-3 pt-4">
                                        <Button onClick={handleReset} variant="outline" size="lg" className="flex-1 h-14 border-2">
                                            <RotateCcw className="mr-2 h-4 w-4" /> 다시 진단하기
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Info Card - Always visible but subtle */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-6 text-sm text-slate-500">
                        <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4" /> 등기부등본 확인 팁
                        </h3>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>인터넷등기소(iros.go.kr)에서 700원에 열람 가능합니다.</li>
                            <li>'을구'의 채권최고액을 모두 합산하여 입력하세요.</li>
                            <li>시세는 국토부 실거래가 또는 KB시세를 참고하세요.</li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Icon component helper
function HomeIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

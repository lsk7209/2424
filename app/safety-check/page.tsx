"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { calculateSafetyRisk, formatAmount } from '@/lib/safety-calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SafetyCheckPage() {
    const [propertyType, setPropertyType] = useState<'apartment' | 'villa' | 'officetel'>('apartment');
    const [marketValue, setMarketValue] = useState<string>('');
    const [deposit, setDeposit] = useState<string>('');
    const [mortgage, setMortgage] = useState<string>('');
    const [result, setResult] = useState<ReturnType<typeof calculateSafetyRisk> | null>(null);

    const handleCalculate = () => {
        const marketValueNum = parseFloat(marketValue);
        const depositNum = parseFloat(deposit);
        const mortgageNum = parseFloat(mortgage);

        if (!marketValueNum || !depositNum || mortgageNum === undefined) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (marketValueNum <= 0 || depositNum <= 0 || mortgageNum < 0) {
            alert('올바른 금액을 입력해주세요.');
            return;
        }

        const calculatedResult = calculateSafetyRisk(marketValueNum, depositNum, mortgageNum);
        setResult(calculatedResult);
    };

    const handleReset = () => {
        setMarketValue('');
        setDeposit('');
        setMortgage('');
        setResult(null);
    };

    const getResultIcon = () => {
        if (!result) return null;

        switch (result.level) {
            case 'safe':
                return <CheckCircle className="h-16 w-16 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="h-16 w-16 text-amber-500" />;
            case 'danger':
                return <AlertCircle className="h-16 w-16 text-red-500" />;
        }
    };

    const getResultColor = () => {
        if (!result) return '';

        switch (result.level) {
            case 'safe':
                return 'border-green-500 bg-green-50';
            case 'warning':
                return 'border-amber-500 bg-amber-50';
            case 'danger':
                return 'border-red-500 bg-red-50';
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            전세 사기 위험 진단기
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            깡통전세 위험도를 미리 확인하세요
                        </p>
                    </div>

                    {/* Input Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>매물 정보 입력</CardTitle>
                            <CardDescription>
                                등기부등본을 참고하여 정확한 정보를 입력해주세요
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Property Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">주택 유형</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'apartment' as const, label: '아파트' },
                                        { value: 'villa' as const, label: '빌라' },
                                        { value: 'officetel' as const, label: '오피스텔' },
                                    ].map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => setPropertyType(type.value)}
                                            className={`p-3 rounded-lg border-2 font-medium transition-all ${propertyType === type.value
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Market Value */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    매매 시세 (만원)
                                    <div className="group relative">
                                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border z-10">
                                            부동산 앱이나 최근 거래 내역을 참고하여 현재 시세를 입력하세요.
                                        </div>
                                    </div>
                                </label>
                                <Input
                                    type="number"
                                    placeholder="예: 50000 (5억원)"
                                    value={marketValue}
                                    onChange={(e) => setMarketValue(e.target.value)}
                                    className="text-lg h-12"
                                />
                                {marketValue && (
                                    <p className="text-sm text-muted-foreground">
                                        {formatAmount(parseFloat(marketValue))}
                                    </p>
                                )}
                            </div>

                            {/* Deposit */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">나의 보증금 (만원)</label>
                                <Input
                                    type="number"
                                    placeholder="예: 30000 (3억원)"
                                    value={deposit}
                                    onChange={(e) => setDeposit(e.target.value)}
                                    className="text-lg h-12"
                                />
                                {deposit && (
                                    <p className="text-sm text-muted-foreground">
                                        {formatAmount(parseFloat(deposit))}
                                    </p>
                                )}
                            </div>

                            {/* Mortgage */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    선순위 채권 최고액 (만원)
                                    <div className="group relative">
                                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border z-10">
                                            등기부등본의 '을구'에서 확인할 수 있습니다. 근저당권 설정액을 모두 합산하세요.
                                        </div>
                                    </div>
                                </label>
                                <Input
                                    type="number"
                                    placeholder="예: 15000 (1.5억원)"
                                    value={mortgage}
                                    onChange={(e) => setMortgage(e.target.value)}
                                    className="text-lg h-12"
                                />
                                {mortgage && (
                                    <p className="text-sm text-muted-foreground">
                                        {formatAmount(parseFloat(mortgage))}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button onClick={handleCalculate} size="lg" className="flex-1">
                                    위험도 진단하기
                                </Button>
                                <Button onClick={handleReset} variant="outline" size="lg">
                                    초기화
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Result */}
                    {result && (
                        <Card className={`border-2 ${getResultColor()}`}>
                            <CardContent className="pt-8 space-y-6">
                                {/* Icon and Message */}
                                <div className="text-center space-y-4">
                                    <div className="flex justify-center">
                                        {getResultIcon()}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl md:text-3xl font-bold">
                                            {result.message}
                                        </h2>
                                        <p className="text-lg">
                                            위험 비율: <span className="font-bold">{result.risk_ratio}%</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="h-4 bg-white rounded-full overflow-hidden border">
                                        <div
                                            className={`h-full transition-all ${result.level === 'safe'
                                                ? 'bg-green-500'
                                                : result.level === 'warning'
                                                    ? 'bg-amber-500'
                                                    : 'bg-red-500'
                                                }`}
                                            style={{ width: `${Math.min(result.risk_ratio, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>0%</span>
                                        <span>70%</span>
                                        <span>80%</span>
                                        <span>100%</span>
                                    </div>
                                </div>

                                {/* Advice */}
                                <div className="space-y-3 pt-4 border-t">
                                    <h3 className="font-semibold">전문가 조언</h3>
                                    <ul className="space-y-2">
                                        {result.advice.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                {result.level !== 'safe' && (
                                    <div className="pt-4 border-t">
                                        <div className="bg-white rounded-lg p-4 border">
                                            <p className="text-sm font-medium mb-3">
                                                {result.level === 'warning' ? '보증보험 가입을 확인하세요' : '법률 상담이 필요합니다'}
                                            </p>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    등기부등본 열람
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    법률 상담 받기
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Info Card */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">등기부등본 보는 법</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <p className="font-medium mb-1">1. 인터넷 등기소에서 열람</p>
                                <p className="text-muted-foreground">
                                    대법원 인터넷등기소(www.iros.go.kr)에서 700원에 열람 가능합니다.
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">2. 을구 확인</p>
                                <p className="text-muted-foreground">
                                    등기부등본의 '을구(권리관계)' 부분에서 근저당권 설정액을 확인하세요.
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">3. 선순위 채권 합산</p>
                                <p className="text-muted-foreground">
                                    여러 개의 근저당권이 있다면 모두 합산하여 입력하세요.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

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

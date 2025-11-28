"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fengShuiQuestions } from '@/data/feng-shui-questions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FengShuiPage() {
    const router = useRouter();
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const question = fengShuiQuestions.find(q => q.id === currentQuestion);
    const progress = (currentQuestion / fengShuiQuestions.length) * 100;

    useEffect(() => {
        // 현재 질문에 대한 기존 답변이 있으면 선택 상태로 설정
        if (answers[currentQuestion] !== undefined) {
            setSelectedOption(answers[currentQuestion]);
        } else {
            setSelectedOption(null);
        }
    }, [currentQuestion, answers]);

    const handleOptionSelect = (optionIndex: number) => {
        setSelectedOption(optionIndex);

        const newAnswers = {
            ...answers,
            [currentQuestion]: optionIndex,
        };

        setAnswers(newAnswers);

        // Auto-advance after 300ms
        setTimeout(() => {
            if (currentQuestion < fengShuiQuestions.length) {
                setCurrentQuestion(prev => prev + 1);
            } else {
                // 마지막 질문이면 결과 페이지로 이동
                const answersParam = encodeURIComponent(JSON.stringify(newAnswers));
                router.push(`/feng-shui/result?answers=${answersParam}`);
            }
        }, 300);
    };

    const handleNext = () => {
        if (selectedOption === null) return;

        if (currentQuestion === fengShuiQuestions.length) {
            // 마지막 질문이면 결과 페이지로 이동
            const answersParam = encodeURIComponent(JSON.stringify(answers));
            router.push(`/feng-shui/result?answers=${answersParam}`);
        } else {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setCurrentQuestion(1);
        setSelectedOption(null);
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto py-8 md:py-16">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            풍수지리 집터 테스트
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            사주 오행 기반 맞춤형 주거 유형을 찾아보세요
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>질문 {currentQuestion} / {fengShuiQuestions.length}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {/* Question Card */}
                    <Card className="border-2">
                        <CardContent className="pt-8 pb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                                {question.text}
                            </h2>

                            <div className="space-y-3">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${selectedOption === index
                                            ? 'border-primary bg-primary/5 shadow-md'
                                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-base md:text-lg font-medium">
                                                {option.text}
                                            </span>
                                            {selectedOption === index && (
                                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                    <svg
                                                        className="w-4 h-4 text-white"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <div className="flex justify-between gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handlePrev}
                            disabled={currentQuestion === 1}
                            className="flex-1 max-w-[200px]"
                        >
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            이전
                        </Button>

                        <Button
                            size="lg"
                            onClick={handleNext}
                            disabled={selectedOption === null}
                            className="flex-1 max-w-[200px]"
                        >
                            {currentQuestion === fengShuiQuestions.length ? '결과 보기' : '다음'}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    {/* Reset Button */}
                    <div className="text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="text-muted-foreground"
                        >
                            처음부터 다시하기
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

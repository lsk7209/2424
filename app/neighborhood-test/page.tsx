'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { neighborhoodQuestions } from '@/data/neighborhood-questions';
import { useNeighborhoodTest } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NeighborhoodTestPage() {
    const router = useRouter();
    const { answers, currentQuestion, setAnswer, nextQuestion, prevQuestion, resetTest, isCompleted } = useNeighborhoodTest();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const question = neighborhoodQuestions.find(q => q.id === currentQuestion);
    const progress = (currentQuestion / neighborhoodQuestions.length) * 100;

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
        setAnswer(currentQuestion, optionIndex);
    };

    const handleNext = () => {
        if (selectedOption === null) return;

        if (currentQuestion === neighborhoodQuestions.length) {
            // 마지막 질문이면 결과 페이지로 이동
            router.push('/neighborhood-test/result');
        } else {
            nextQuestion();
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 1) {
            prevQuestion();
        }
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 container max-w-2xl mx-auto py-12 px-4">
                <div className="space-y-8">
                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>질문 {currentQuestion} / {neighborhoodQuestions.length}</span>
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
                            {currentQuestion === neighborhoodQuestions.length ? '결과 보기' : '다음'}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    {/* Reset Button */}
                    <div className="text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                resetTest();
                                setSelectedOption(null);
                            }}
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

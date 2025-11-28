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
        // 방문 시 이미 완료된 상태라면, 새로운 테스트를 위해 초기화
        // (결과 페이지에서 뒤로가기로 왔거나, 재방문한 경우)
        if (isCompleted()) {
            resetTest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

        // Auto-advance after 300ms
        setTimeout(() => {
            if (currentQuestion < neighborhoodQuestions.length) {
                nextQuestion();
            } else {
                router.push('/neighborhood-test/result');
            }
        }, 300);
    };

    const handleNext = () => {
        if (selectedOption === null) return;

        if (currentQuestion === neighborhoodQuestions.length) {
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
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-primary/20">
            <Header />

            <main className="flex-1 container max-w-4xl lg:max-w-5xl mx-auto py-12 md:py-20 px-4 flex flex-col">
                <div className="space-y-8 animate-fade-in-up">
                    {/* Progress */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm font-medium text-slate-500">
                            <span>Question {currentQuestion}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-3 rounded-full bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-purple-500" />
                    </div>

                    {/* Question Card */}
                    <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-sm ring-1 ring-slate-100">
                        <CardContent className="pt-10 pb-8 px-6 md:px-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-snug text-slate-800">
                                <span className="text-primary mr-2">Q{currentQuestion}.</span>
                                {question.text}
                            </h2>

                            <div className="space-y-4">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden ${selectedOption === index
                                            ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                                            : 'border-slate-100 bg-white hover:border-primary/30 hover:bg-slate-50 hover:scale-[1.01]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <span className={`text-lg font-medium transition-colors ${selectedOption === index ? 'text-primary' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                {option.text}
                                            </span>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === index ? 'border-primary bg-primary' : 'border-slate-300 group-hover:border-primary/50'}`}>
                                                {selectedOption === index && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <div className="flex justify-between gap-4 pt-4">
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={handlePrev}
                            disabled={currentQuestion === 1}
                            className="text-slate-400 hover:text-slate-600 hover:bg-transparent px-0"
                        >
                            <ChevronLeft className="mr-1 h-5 w-5" />
                            이전 질문
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                if (confirm('정말 처음부터 다시 하시겠습니까?')) {
                                    resetTest();
                                    setSelectedOption(null);
                                }
                            }}
                            className="text-slate-300 hover:text-red-400 hover:bg-transparent text-xs"
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

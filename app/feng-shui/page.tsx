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
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-purple-500/20">
            <Header />

            <main className="flex-1 container max-w-4xl lg:max-w-5xl mx-auto py-12 md:py-20 px-4 flex flex-col">
                <div className="space-y-8 animate-fade-in-up">
                    {/* Progress */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm font-medium text-slate-500">
                            <span>Question {currentQuestion}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-3 rounded-full bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500" />
                    </div>

                    {/* Question Card */}
                    <Card className="border-0 shadow-xl shadow-purple-200/50 overflow-hidden bg-white/80 backdrop-blur-sm ring-1 ring-purple-100">
                        <CardContent className="pt-10 pb-8 px-6 md:px-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-snug text-slate-800">
                                <span className="text-purple-600 mr-2">Q{currentQuestion}.</span>
                                {question.text}
                            </h2>

                            <div className="space-y-4">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden ${selectedOption === index
                                            ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02]'
                                            : 'border-slate-100 bg-white hover:border-purple-300 hover:bg-purple-50/50 hover:scale-[1.01]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <span className={`text-lg font-medium transition-colors ${selectedOption === index ? 'text-purple-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                {option.text}
                                            </span>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === index ? 'border-purple-500 bg-purple-500' : 'border-slate-300 group-hover:border-purple-300'}`}>
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
                                    handleReset();
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

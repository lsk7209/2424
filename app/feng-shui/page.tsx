"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { fengShuiQuestions } from '@/data/feng-shui-questions';

export default function FengShuiPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const question = fengShuiQuestions.find((item) => item.id === currentQuestion);
  const progress = (currentQuestion / fengShuiQuestions.length) * 100;
  const selectedOption = answers[currentQuestion] ?? null;

  const handleOptionSelect = (optionIndex: number) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion]: optionIndex,
    };

    setAnswers(nextAnswers);

    window.setTimeout(() => {
      if (currentQuestion < fengShuiQuestions.length) {
        setCurrentQuestion((value) => value + 1);
        return;
      }

      const answersParam = encodeURIComponent(JSON.stringify(nextAnswers));
      router.push(`/feng-shui/result?answers=${answersParam}`);
    }, 300);
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((value) => value - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(1);
  };

  if (!question) {
    return <div>질문을 불러오는 중입니다.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-purple-500/20">
      <Header />

      <main className="flex-1 container max-w-4xl lg:max-w-5xl mx-auto py-12 md:py-20 px-4 flex flex-col">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium text-slate-500">
              <span>질문 {currentQuestion}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-3 rounded-full bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500"
            />
          </div>

          <Card className="border-0 shadow-xl shadow-purple-200/50 overflow-hidden bg-white/80 backdrop-blur-sm ring-1 ring-purple-100">
            <CardContent className="pt-10 pb-8 px-6 md:px-10">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-snug text-slate-800">
                <span className="text-purple-600 mr-2">Q{currentQuestion}.</span>
                {question.text}
              </h1>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02]'
                        : 'border-slate-100 bg-white hover:border-purple-300 hover:bg-purple-50/50 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span
                        className={`text-lg font-medium transition-colors ${
                          selectedOption === index
                            ? 'text-purple-700'
                            : 'text-slate-700 group-hover:text-slate-900'
                        }`}
                      >
                        {option.text}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedOption === index
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-slate-300 group-hover:border-purple-300'
                        }`}
                      >
                        {selectedOption === index && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
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

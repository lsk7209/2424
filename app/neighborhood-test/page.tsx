'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { neighborhoodQuestions } from '@/data/neighborhood-questions';
import { useNeighborhoodTest } from '@/lib/store';

export default function NeighborhoodTestPage() {
  const router = useRouter();
  const {
    answers,
    currentQuestion,
    setAnswer,
    nextQuestion,
    prevQuestion,
    resetTest,
    isCompleted,
  } = useNeighborhoodTest();

  const question = neighborhoodQuestions.find((item) => item.id === currentQuestion);
  const progress = (currentQuestion / neighborhoodQuestions.length) * 100;
  const selectedOption = answers[currentQuestion] ?? null;

  useEffect(() => {
    if (isCompleted()) {
      resetTest();
    }
  }, [isCompleted, resetTest]);

  const handleOptionSelect = (optionIndex: number) => {
    setAnswer(currentQuestion, optionIndex);

    window.setTimeout(() => {
      if (currentQuestion < neighborhoodQuestions.length) {
        nextQuestion();
        return;
      }

      router.push('/neighborhood-test/result');
    }, 300);
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      prevQuestion();
    }
  };

  if (!question) {
    return <div>질문을 불러오는 중입니다.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-primary/20">
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
              className="h-3 rounded-full bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-purple-500"
            />
          </div>

          <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-sm ring-1 ring-slate-100">
            <CardContent className="pt-10 pb-8 px-6 md:px-10">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-snug text-slate-800">
                <span className="text-primary mr-2">Q{currentQuestion}.</span>
                {question.text}
              </h1>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden ${
                      selectedOption === index
                        ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                        : 'border-slate-100 bg-white hover:border-primary/30 hover:bg-slate-50 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span
                        className={`text-lg font-medium transition-colors ${
                          selectedOption === index
                            ? 'text-primary'
                            : 'text-slate-700 group-hover:text-slate-900'
                        }`}
                      >
                        {option.text}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedOption === index
                            ? 'border-primary bg-primary'
                            : 'border-slate-300 group-hover:border-primary/50'
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
                if (confirm('처음부터 다시 시작할까요?')) {
                  resetTest();
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

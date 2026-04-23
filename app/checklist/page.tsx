"use client";

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Download, ExternalLink, RotateCcw, Trophy } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { checklistData } from '@/data/checklist-data';
import confetti from 'canvas-confetti';

const CHECKLIST_STORAGE_KEY = 'checklist-progress';

export default function ChecklistPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') {
      return new Set();
    }

    const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!saved) {
      return new Set();
    }

    try {
      return new Set(JSON.parse(saved));
    } catch {
      return new Set();
    }
  });

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const totalTasks = checklistData.reduce((sum, section) => sum + section.tasks.length, 0);
  const showCelebration = completedTasks.size > 0 && completedTasks.size === totalTasks;

  useEffect(() => {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(Array.from(completedTasks)));
    if (showCelebration) {
      triggerConfetti();
    }
  }, [completedTasks, showCelebration]);

  const isTaskCompleted = (dDay: string, taskIndex: number) => {
    return completedTasks.has(`${dDay}-${taskIndex}`);
  };

  const getTotalProgress = () => {
    return Math.round((completedTasks.size / totalTasks) * 100);
  };

  const toggleTask = (dDay: string, taskIndex: number) => {
    const taskId = `${dDay}-${taskIndex}`;
    const nextCompleted = new Set(completedTasks);

    if (nextCompleted.has(taskId)) {
      nextCompleted.delete(taskId);
    } else {
      nextCompleted.add(taskId);
    }

    setCompletedTasks(nextCompleted);
  };

  const handleReset = () => {
    if (!confirm('모든 체크를 초기화하시겠습니까?')) {
      return;
    }

    setCompletedTasks(new Set());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    let text = '이사독립 - 이사 체크리스트\n\n';
    checklistData.forEach((section) => {
      text += `${section.d_day}: ${section.title}\n`;
      section.tasks.forEach((task, index) => {
        const checked = isTaskCompleted(section.d_day, index) ? '[✓]' : '[ ]';
        text += `  ${checked} ${task.text}\n`;
      });
      text += '\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '이사체크리스트.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 container max-w-3xl mx-auto py-8 md:py-12 px-4 pb-32">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              D-30 이사 작전지도
            </h1>
            <p className="text-lg text-slate-600">
              단계별로 체크하며 빠짐없는 이사를 준비하세요.
            </p>
          </div>

          <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-4 mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-700">이사 준비율</span>
                <span className="text-xs text-slate-500">
                  ({completedTasks.size} / {checklistData.reduce((sum, section) => sum + section.tasks.length, 0)})
                </span>
              </div>
              <span className="text-xl font-extrabold text-primary">{getTotalProgress()}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-violet-500 transition-all duration-500 ease-out"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>

          {showCelebration && (
            <div className="animate-fade-in-up">
              <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm animate-bounce">
                      <Trophy className="h-12 w-12 text-yellow-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">이사 준비 완료! 축하합니다.</h2>
                    <p className="text-indigo-100">
                      새로운 보금자리에서도 좋은 일만 가득하시길 바랍니다.
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center pt-2">
                    <Button onClick={handleDownload} variant="secondary" size="lg" className="font-bold shadow-lg">
                      <Download className="mr-2 h-4 w-4" /> 체크리스트 저장
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Accordion type="multiple" defaultValue={['D-30']} className="space-y-4">
            {checklistData.map((section) => {
              const sectionCompletedCount = section.tasks.filter((_, index) =>
                isTaskCompleted(section.d_day, index),
              ).length;
              const isSectionComplete = sectionCompletedCount === section.tasks.length;
              const sectionProgress = Math.round((sectionCompletedCount / section.tasks.length) * 100);

              return (
                <AccordionItem
                  key={section.d_day}
                  value={section.d_day}
                  className={`border rounded-xl px-2 bg-white transition-all ${
                    isSectionComplete ? 'border-primary/30 bg-primary/5' : 'border-slate-200'
                  }`}
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-4">
                    <div className="flex items-center justify-between w-full pr-2">
                      <div className="text-left">
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-bold ${isSectionComplete ? 'text-primary' : 'text-slate-800'}`}>
                            {section.d_day}
                          </span>
                          <span className="text-base font-semibold text-slate-700">
                            {section.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${isSectionComplete ? 'bg-primary' : 'bg-slate-300'}`}
                              style={{ width: `${sectionProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{sectionProgress}%</span>
                        </div>
                      </div>
                      {isSectionComplete && (
                        <CheckCircle2 className="h-6 w-6 text-primary animate-in zoom-in duration-300" />
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 pt-2">
                      {section.tasks.map((task, index) => {
                        const completed = isTaskCompleted(section.d_day, index);

                        return (
                          <div
                            key={index}
                            onClick={() => toggleTask(section.d_day, index)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${
                              completed
                                ? 'bg-primary/5 border-primary/20 shadow-none'
                                : 'bg-white border-slate-100 hover:border-primary/50 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-0.5 transition-colors ${completed ? 'text-primary' : 'text-slate-300'}`}>
                                {completed ? (
                                  <CheckCircle2 className="h-6 w-6" />
                                ) : (
                                  <Circle className="h-6 w-6" />
                                )}
                              </div>

                              <div className="flex-1 space-y-1">
                                <p
                                  className={`font-medium transition-all ${
                                    completed
                                      ? 'text-slate-500 line-through decoration-slate-300'
                                      : 'text-slate-700'
                                  }`}
                                >
                                  {task.text}
                                </p>

                                {task.has_affiliate && task.affiliate_info && (
                                  <div onClick={(event) => event.stopPropagation()}>
                                    <a
                                      href={task.affiliate_info.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline bg-primary/10 px-2 py-1 rounded-full"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      {task.affiliate_info.label} 추천
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="flex gap-3 justify-center pt-8">
            <Button onClick={handleReset} variant="ghost" size="sm" className="text-slate-400 hover:text-red-500 hover:bg-red-50">
              <RotateCcw className="mr-2 h-4 w-4" /> 초기화
            </Button>
          </div>
        </div>
      </main>

      {getTotalProgress() > 0 && !showCelebration && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
          <Button
            onClick={handleDownload}
            size="lg"
            className="rounded-full h-14 w-14 p-0 shadow-xl bg-slate-900 hover:bg-slate-800"
          >
            <Download className="h-6 w-6 text-white" />
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
}

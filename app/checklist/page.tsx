"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2, Circle, ExternalLink, Download, RotateCcw } from 'lucide-react';
import { checklistData } from '@/data/checklist-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ChecklistPage() {
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    const toggleTask = (dDay: string, taskIndex: number) => {
        const taskId = `${dDay}-${taskIndex}`;
        const newCompleted = new Set(completedTasks);

        if (newCompleted.has(taskId)) {
            newCompleted.delete(taskId);
        } else {
            newCompleted.add(taskId);
        }

        setCompletedTasks(newCompleted);
    };

    const isTaskCompleted = (dDay: string, taskIndex: number) => {
        return completedTasks.has(`${dDay}-${taskIndex}`);
    };

    const getTotalProgress = () => {
        const totalTasks = checklistData.reduce((sum, section) => sum + section.tasks.length, 0);
        const completed = completedTasks.size;
        return Math.round((completed / totalTasks) * 100);
    };

    const handleReset = () => {
        if (confirm('모든 체크를 초기화하시겠습니까?')) {
            setCompletedTasks(new Set());
        }
    };

    const handleDownload = () => {
        // 체크리스트를 텍스트로 변환
        let text = '독립만세 - 이사 체크리스트\n\n';
        checklistData.forEach(section => {
            text += `${section.d_day}: ${section.title}\n`;
            section.tasks.forEach((task, index) => {
                const checked = isTaskCompleted(section.d_day, index) ? '[✓]' : '[ ]';
                text += `  ${checked} ${task.text}\n`;
            });
            text += '\n';
        });

        // 다운로드
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '이사체크리스트.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container py-8 md:py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            D-30 이사 작전지도
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            단계별로 체크하며 완벽한 이사를 준비하세요
                        </p>
                    </div>

                    {/* Progress Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>전체 진행률</CardTitle>
                                    <CardDescription>
                                        {completedTasks.size} / {checklistData.reduce((sum, s) => sum + s.tasks.length, 0)} 완료
                                    </CardDescription>
                                </div>
                                <div className="text-3xl font-bold text-primary">
                                    {getTotalProgress()}%
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${getTotalProgress()}%` }}
                                />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button onClick={handleDownload} variant="outline" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    체크리스트 다운로드
                                </Button>
                                <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
                                    <RotateCcw className="h-4 w-4" />
                                    초기화
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Checklist Accordion */}
                    <Accordion type="multiple" defaultValue={['D-30', 'D-14']} className="space-y-4">
                        {checklistData.map((section) => {
                            const sectionCompleted = section.tasks.filter((_, index) =>
                                isTaskCompleted(section.d_day, index)
                            ).length;
                            const sectionProgress = Math.round((sectionCompleted / section.tasks.length) * 100);

                            return (
                                <AccordionItem
                                    key={section.d_day}
                                    value={section.d_day}
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center justify-between w-full pr-4">
                                            <div className="text-left">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-bold text-primary">
                                                        {section.d_day}
                                                    </span>
                                                    <span className="text-base font-semibold">
                                                        {section.title}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {sectionCompleted} / {section.tasks.length} 완료 ({sectionProgress}%)
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-3 pt-4">
                                            {section.tasks.map((task, index) => {
                                                const completed = isTaskCompleted(section.d_day, index);

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`p-4 rounded-lg border transition-all ${completed ? 'bg-muted/50 border-primary/30' : 'bg-background'
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <button
                                                                onClick={() => toggleTask(section.d_day, index)}
                                                                className="mt-0.5 flex-shrink-0"
                                                            >
                                                                {completed ? (
                                                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                                                ) : (
                                                                    <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                                                                )}
                                                            </button>

                                                            <div className="flex-1 space-y-2">
                                                                <p
                                                                    className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''
                                                                        }`}
                                                                >
                                                                    {task.text}
                                                                </p>

                                                                {task.has_affiliate && task.affiliate_info && (
                                                                    <a
                                                                        href={task.affiliate_info.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                                                    >
                                                                        <ExternalLink className="h-4 w-4" />
                                                                        {task.affiliate_info.label}
                                                                    </a>
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

                    {/* Tips Card */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">💡 이사 준비 팁</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <p className="font-medium mb-1">1. 여유있게 준비하세요</p>
                                <p className="text-muted-foreground">
                                    최소 한 달 전부터 준비를 시작하면 스트레스를 줄일 수 있습니다.
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">2. 박스에 라벨링 필수</p>
                                <p className="text-muted-foreground">
                                    어느 방의 물건인지, 깨지기 쉬운 물건인지 표시하면 정리가 쉽습니다.
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">3. 귀중품은 직접 운반</p>
                                <p className="text-muted-foreground">
                                    중요 서류, 귀금속, 현금 등은 이사 업체에 맡기지 말고 직접 챙기세요.
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">4. 전입신고는 14일 이내</p>
                                <p className="text-muted-foreground">
                                    이사 후 14일 이내에 전입신고를 하지 않으면 과태료가 부과될 수 있습니다.
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

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MOVING_DATE_KEY = 'movingDate';

const milestones = [
  { day: 30, title: '이사업체 예약과 짐 정리 시작', desc: '손없는 날과 예산을 기준으로 업체를 비교하세요.' },
  { day: 14, title: '입주청소와 가구 배치 확정', desc: '버릴 물건 정리와 새집 동선 점검을 같이 진행하세요.' },
  { day: 7, title: '주소 이전과 공과금 이전 신청', desc: '도시가스, 인터넷, 우편물 주소를 미리 바꾸세요.' },
  { day: 1, title: '최종 점검과 귀중품 챙기기', desc: '서류, 열쇠, 현금, 휴대품을 따로 보관하세요.' },
] as const;

function calculateDDay(dateStr: string) {
  if (!dateStr) {
    return null;
  }

  const targetDate = new Date(dateStr);
  const today = new Date();
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return differenceInDays(targetDate, today);
}

export default function DDayCounterPage() {
  const [movingDate, setMovingDate] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return localStorage.getItem(MOVING_DATE_KEY) ?? '';
  });
  const [dDay, setDDay] = useState<number | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const savedDate = localStorage.getItem(MOVING_DATE_KEY);
    return savedDate ? calculateDDay(savedDate) : null;
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDate = event.target.value;
    setMovingDate(nextDate);
    setDDay(calculateDDay(nextDate));
    localStorage.setItem(MOVING_DATE_KEY, nextDate);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container mx-auto max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Clock className="w-8 h-8 text-blue-600" />
            이사 D-Day 카운터
          </h1>
          <p className="text-gray-600">
            이사 날짜를 설정하고 남은 기간에 맞는 준비 항목을 확인하세요.
          </p>
        </div>

        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full max-w-xs space-y-2">
                <Label className="text-center block text-lg font-bold text-gray-700">이사 예정일</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={movingDate}
                    onChange={handleDateChange}
                    className="h-14 text-xl text-center font-bold"
                  />
                  <CalendarIcon className="absolute right-4 top-4 text-gray-400 w-6 h-6 pointer-events-none" />
                </div>
              </div>

              {dDay !== null && movingDate && (
                <div className="text-center animate-in zoom-in-50 duration-500">
                  <p className="text-gray-500 mb-2">이사까지</p>
                  <div className="text-6xl font-black text-blue-600 tracking-tighter">
                    {dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : `D+${Math.abs(dDay)}`}
                  </div>
                  <p className="text-gray-400 mt-2 font-medium">
                    {format(new Date(movingDate), 'yyyy년 M월 d일 (E)', { locale: ko })}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {dDay !== null && dDay >= 0 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-150">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              남은 기간별 체크 포인트
            </h2>

            <div className="grid gap-4">
              {milestones.map((milestone) => {
                const isPassed = dDay < milestone.day;
                const isUpcoming = dDay >= milestone.day && dDay <= milestone.day + 5;

                return (
                  <div
                    key={milestone.day}
                    className={`relative p-5 rounded-xl border-2 transition-all ${
                      isPassed
                        ? 'bg-gray-100 border-gray-200 opacity-60'
                        : isUpcoming
                          ? 'bg-white border-blue-500 shadow-md scale-105 z-10'
                          : 'bg-white border-transparent shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-black text-xl ${isPassed ? 'text-gray-400' : 'text-blue-600'}`}>
                        D-{milestone.day}
                      </span>
                      {isUpcoming && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                          지금 챙기세요
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-lg ${isPassed ? 'text-gray-500' : 'text-gray-900'}`}>
                      {milestone.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{milestone.desc}</p>
                  </div>
                );
              })}
            </div>

            <Button asChild className="w-full h-14 text-lg font-bold bg-gray-900 hover:bg-gray-800">
              <Link href="/checklist">전체 체크리스트 보러가기</Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

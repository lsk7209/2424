'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { differenceInDays, format, addDays, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DDayCounterPage() {
  const [movingDate, setMovingDate] = useState<string>('');
  const [dDay, setDDay] = useState<number | null>(null);

  useEffect(() => {
    // Load from local storage if available
    const savedDate = localStorage.getItem('movingDate');
    if (savedDate) {
      setMovingDate(savedDate);
      calculateDDay(savedDate);
    }
  }, []);

  const calculateDDay = (dateStr: string) => {
    if (!dateStr) return;
    const targetDate = new Date(dateStr);
    const today = new Date();
    // Reset time part for accurate day calculation
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diff = differenceInDays(targetDate, today);
    setDDay(diff);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setMovingDate(date);
    calculateDDay(date);
    localStorage.setItem('movingDate', date);
  };

  const milestones = [
    { day: 30, title: '이사업체 예약 & 짐 정리 시작', desc: '손없는날 확인하고 견적 비교하기' },
    { day: 14, title: '입주청소 예약 & 가구 배치 구상', desc: '버릴 가구 신고하고 배치도 그리기' },
    { day: 7, title: '공과금 정산 준비 & 주소 이전', desc: '도시가스, 인터넷 이전 신청하기' },
    { day: 1, title: '최종 점검 & 귀중품 챙기기', desc: '현금 준비하고 쓰레기 봉투 사두기' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Clock className="w-8 h-8 text-blue-600" />
            이사 D-Day 카운터
          </h1>
          <p className="text-gray-600">
            이사 날짜를 설정하고 남은 기간별<br className="md:hidden" /> 필수 체크리스트를 확인하세요.
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

              {dDay !== null && (
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
                    className={`
                      relative p-5 rounded-xl border-2 transition-all
                      ${isPassed ? 'bg-gray-100 border-gray-200 opacity-60' : 
                        isUpcoming ? 'bg-white border-blue-500 shadow-md scale-105 z-10' : 
                        'bg-white border-transparent shadow-sm'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-black text-xl ${isPassed ? 'text-gray-400' : 'text-blue-600'}`}>
                        D-{milestone.day}
                      </span>
                      {isUpcoming && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                          지금 챙기세요!
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
            
            <Button 
              className="w-full h-14 text-lg font-bold bg-gray-900 hover:bg-gray-800"
              onClick={() => window.location.href = '/checklist'}
            >
              전체 체크리스트 보러가기
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { trackEvent } from '@/lib/analytics';
import { Truck, Package, Home, ArrowRight, RefreshCcw, Calculator } from 'lucide-react';

export default function MovingCostCalculatorPage() {
  const [step, setStep] = useState(1);

  // State for inputs
  const [moveType, setMoveType] = useState('general'); // general(일반), semi(반포장), packing(포장)
  const [roomSize, setRoomSize] = useState('one-room'); // one-room, two-room, apartment
  const [distance, setDistance] = useState(10); // km
  const [floor, setFloor] = useState(1);
  const [hasElevator, setHasElevator] = useState('yes');

  const calculateCost = () => {
    setStep(2);
    trackEvent('tool_used', {
      tool_name: 'moving_cost_calculator',
      move_type: moveType,
      room_size: roomSize,
      distance_km: distance,
    });
  };

  const resetCalculator = () => {
    setStep(1);
    setMoveType('general');
    setRoomSize('one-room');
    setDistance(10);
    setFloor(1);
    setHasElevator('yes');
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "이사 견적 비교 준비 도구",
    url: "https://www.today2424.kr/tools/moving-cost-calculator",
    description: "이사 조건을 정리해 업체 견적을 같은 기준으로 비교하도록 돕는 무료 도구입니다. 실제 견적이나 시세를 산출하지 않습니다.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <Header />

      <main className="flex-1 container mx-auto max-w-2xl py-8 md:py-16 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Truck className="w-8 h-8 text-blue-600" />
            이사 견적 비교 준비 도구
          </h1>
          <p className="text-gray-600">
            이사 조건을 정리해 업체에 같은 기준으로 문의할 수 있도록 돕습니다.<br className="md:hidden" /> 실제 견적·시세를 산출하는 도구는 아닙니다.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl p-6">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              {step === 1 ? '이사 정보 입력' : '견적 비교 요청 요약'}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {step === 1 ? '업체에 같은 조건을 전달하기 위해 아래 정보를 정리하세요.' : '이 조건을 같은 범위로 전달해 받은 견적을 비교하세요.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {step === 1 ? (
              <div className="space-y-8">
                {/* 1. 이사 종류 */}
                <div className="space-y-4">
                  <Label className="text-lg font-bold text-gray-800">어떤 이사를 하시나요?</Label>
                  <RadioGroup value={moveType} onValueChange={setMoveType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="general" id="general" className="peer sr-only" />
                      <Label
                        htmlFor="general"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 cursor-pointer transition-all"
                      >
                        <Truck className="mb-3 h-6 w-6" />
                        <span className="font-bold">일반이사</span>
                        <span className="text-xs text-gray-500 mt-1">짐만 옮겨드려요</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="semi" id="semi" className="peer sr-only" />
                      <Label
                        htmlFor="semi"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 cursor-pointer transition-all"
                      >
                        <Package className="mb-3 h-6 w-6" />
                        <span className="font-bold">반포장이사</span>
                        <span className="text-xs text-gray-500 mt-1">큰 짐만 포장/정리</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="packing" id="packing" className="peer sr-only" />
                      <Label
                        htmlFor="packing"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 cursor-pointer transition-all"
                      >
                        <Home className="mb-3 h-6 w-6" />
                        <span className="font-bold">포장이사</span>
                        <span className="text-xs text-gray-500 mt-1">처음부터 끝까지</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* 2. 집 크기 */}
                <div className="space-y-4">
                  <Label className="text-lg font-bold text-gray-800">현재 집의 크기는?</Label>
                  <Select value={roomSize} onValueChange={setRoomSize}>
                    <SelectTrigger className="w-full h-12 text-lg">
                      <SelectValue placeholder="집 크기 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-room">원룸 (10평 이하)</SelectItem>
                      <SelectItem value="two-room">투룸/오피스텔 (10~20평)</SelectItem>
                      <SelectItem value="apartment">아파트 (20평 이상)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 3. 이동 거리 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-bold text-gray-800">이동 거리는 얼마나 되나요?</Label>
                    <span className="text-blue-600 font-bold text-lg">{distance} km</span>
                  </div>
                  <Slider
                    value={[distance]}
                    onValueChange={(value) => setDistance(value[0])}
                    max={200}
                    step={5}
                    className="py-4"
                  />
                  <p className="text-sm text-gray-500 text-right">출발지와 도착지 기준의 예상 이동 거리</p>
                </div>

                {/* 4. 층수 및 엘리베이터 */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-bold text-gray-800">도착지 층수</Label>
                    <Input
                      type="number"
                      value={floor}
                      onChange={(e) => setFloor(Number(e.target.value))}
                      min={1}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-lg font-bold text-gray-800">엘리베이터 유무</Label>
                    <Select value={hasElevator} onValueChange={setHasElevator}>
                      <SelectTrigger className="w-full h-12 text-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">있음</SelectItem>
                        <SelectItem value="no">없음 (계단/사다리)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={calculateCost}
                  className="w-full h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg mt-8"
                >
                  비교 조건 정리하기 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center space-y-2">
                  <p className="text-lg font-bold text-blue-950">업체에 전달할 비교 조건을 정리했습니다</p>
                  <p className="text-sm leading-6 text-blue-900">이 도구는 실제 업체 견적이나 시장 시세를 계산하지 않습니다. 아래 조건과 작업 범위를 같은 방식으로 전달한 뒤 견적서를 비교하세요.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100">
                  <h3 className="font-bold text-gray-900 border-b pb-2">견적 상세 내역</h3>
                  <div className="flex justify-between text-gray-600">
                    <span>이사 종류</span>
                    <span className="font-medium text-gray-900">
                      {moveType === 'general' ? '일반이사' : moveType === 'semi' ? '반포장이사' : '포장이사'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>주거 형태</span>
                    <span className="font-medium text-gray-900">
                      {roomSize === 'one-room' ? '원룸' : roomSize === 'two-room' ? '투룸' : '아파트'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>이동 거리</span>
                    <span className="font-medium text-gray-900">{distance} km</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>작업 환경</span>
                    <span className="font-medium text-gray-900">
                      {floor}층 / {hasElevator === 'yes' ? '엘리베이터 있음' : '엘리베이터 없음'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    className="flex-1 h-12 text-lg"
                  >
                    <RefreshCcw className="mr-2 w-4 h-4" /> 다시 계산하기
                  </Button>
                  <Button
                    className="flex-1 h-12 text-lg bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      trackEvent('cta_clicked', {
                        cta_name: 'moving_quote_compare',
                        tool_name: 'moving_cost_calculator',
                      });
                      window.location.assign('/guide/moving-center-selection');
                    }}
                  >
                    견적 비교 가이드 보기
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEO Content */}
        <article className="mt-16 prose prose-blue max-w-none">
          <h2>이사 견적 비교 전에 조건을 통일해야 하는 이유</h2>
          <p>
            이사 견적은 짐의 양, 작업 인원, 이동 거리, 출입·주차 환경, 날짜와 포함 작업에 따라 달라질 수 있습니다. 그래서 이 도구는 가격을 단정하지 않고, 업체마다 같은 조건을 전달하도록 돕습니다.
          </p>
          <h3>견적서에서 함께 확인할 항목</h3>
          <ul>
            <li><strong>작업 범위:</strong> 포장·운반·배치·정리·가구 분해와 조립 중 어디까지 포함되는지</li>
            <li><strong>조건부 비용:</strong> 사다리차, 주차, 계단, 장거리 운반, 날짜·시간 변경 시 어떤 기준이 적용되는지</li>
            <li><strong>별도 작업:</strong> 에어컨·TV·정수기 등 설치·해체가 필요한 품목의 담당과 비용</li>
            <li><strong>기록:</strong> 지급 시점·변경·취소 조건과 파손·분실 발생 시 연락 방법</li>
          </ul>
          <p>
            입력 결과를 견적 요청 메모로 사용한 뒤, 받은 견적서의 포함·제외 항목을 같은 순서로 표시해 보세요. 낮은 금액만으로는 같은 서비스 범위인지 판단하기 어렵습니다.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}

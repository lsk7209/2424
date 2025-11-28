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
import { Truck, Package, Home, ArrowRight, RefreshCcw, Calculator } from 'lucide-react';

export default function MovingCostCalculatorPage() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  // State for inputs
  const [moveType, setMoveType] = useState('general'); // general(일반), semi(반포장), packing(포장)
  const [roomSize, setRoomSize] = useState('one-room'); // one-room, two-room, apartment
  const [distance, setDistance] = useState(10); // km
  const [floor, setFloor] = useState(1);
  const [hasElevator, setHasElevator] = useState('yes');

  const calculateCost = () => {
    let baseCost = 0;

    // 1. 이사 종류 및 평수에 따른 기본 비용 (단위: 만원)
    if (moveType === 'general') { // 일반이사 (용달)
      if (roomSize === 'one-room') baseCost = 15;
      else if (roomSize === 'two-room') baseCost = 30;
      else baseCost = 50;
    } else if (moveType === 'semi') { // 반포장이사
      if (roomSize === 'one-room') baseCost = 30;
      else if (roomSize === 'two-room') baseCost = 60;
      else baseCost = 90;
    } else { // 포장이사
      if (roomSize === 'one-room') baseCost = 50;
      else if (roomSize === 'two-room') baseCost = 90;
      else baseCost = 140;
    }

    // 2. 거리 비용 추가 (10km 초과 시 10km당 2만원)
    if (distance > 10) {
      const extraDistance = distance - 10;
      baseCost += Math.ceil(extraDistance / 10) * 2;
    }

    // 3. 층수 및 엘리베이터 비용 (사다리차 등)
    if (hasElevator === 'no' && floor > 1) {
      // 엘리베이터 없는 고층은 사다리차 필수 또는 인건비 추가
      baseCost += (floor - 1) * 3; // 층당 3만원 추가
    }

    // 4. 성수기/손없는날 변동성 (단순 예시로 10% 범위 추가)
    // 실제로는 날짜 입력받아 처리해야 하지만 여기선 범위로 보여줌

    setResult(baseCost);
    setStep(2);
  };

  const resetCalculator = () => {
    setStep(1);
    setResult(null);
    setMoveType('general');
    setRoomSize('one-room');
    setDistance(10);
    setFloor(1);
    setHasElevator('yes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Truck className="w-8 h-8 text-blue-600" />
            이사 견적 계산기
          </h1>
          <p className="text-gray-600">
            이사 종류, 집 크기, 거리를 입력하면<br className="md:hidden" /> 예상 이사 비용을 알려드립니다.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl p-6">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              {step === 1 ? '이사 정보 입력' : '견적 계산 결과'}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {step === 1 ? '정확한 견적을 위해 아래 정보를 입력해주세요.' : '입력하신 정보를 바탕으로 산출된 예상 비용입니다.'}
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
                  <p className="text-sm text-gray-500 text-right">서울 시내 평균 10~20km</p>
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
                  견적 확인하기 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                  <p className="text-gray-600 text-lg">고객님의 예상 이사 비용은</p>
                  <div className="text-5xl font-bold text-blue-600 tracking-tight">
                    {result?.toLocaleString()} <span className="text-2xl text-gray-500">만원 ~</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    * 작업 환경, 날짜(손없는날), 옵션에 따라 실제 비용은 달라질 수 있습니다.
                  </p>
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
                    onClick={() => window.open('https://search.naver.com/search.naver?query=포장이사견적비교', '_blank')}
                  >
                    실제 견적 비교하기
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEO Content */}
        <article className="mt-16 prose prose-blue max-w-none">
          <h2>이사 비용, 어떻게 결정되나요?</h2>
          <p>
            이사 비용은 크게 <strong>짐의 양(톤수)</strong>, <strong>작업 인원</strong>, <strong>이동 거리</strong>, 그리고 <strong>사다리차 사용 여부</strong>에 따라 결정됩니다.
          </p>
          <ul>
            <li><strong>일반이사:</strong> 짐을 고객이 직접 포장하고 정리하며, 업체는 운송만 담당합니다. 가장 저렴합니다.</li>
            <li><strong>반포장이사:</strong> 업체가 포장과 운송을 돕지만, 큰 짐 정리 외 잔짐 정리는 고객이 합니다.</li>
            <li><strong>포장이사:</strong> 포장부터 운송, 정리, 청소까지 업체가 모두 담당합니다. 가장 편하지만 비용이 높습니다.</li>
          </ul>
        </article>
      </main>

      <Footer />
    </div>
  );
}

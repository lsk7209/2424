'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ruler, ArrowRightLeft, Grid } from 'lucide-react';

export default function AreaConverterPage() {
  const [pyeong, setPyeong] = useState<string>('');
  const [sqm, setSqm] = useState<string>('');

  const handlePyeongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPyeong(val);
    if (val) {
      // 1평 = 3.305785 m2
      setSqm((parseFloat(val) * 3.305785).toFixed(2));
    } else {
      setSqm('');
    }
  };

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (val) {
      // 1 m2 = 0.3025 평
      setPyeong((parseFloat(val) * 0.3025).toFixed(2));
    } else {
      setPyeong('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-pretendard">
      <Header />

      <main className="flex-1 container max-w-2xl py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Ruler className="w-8 h-8 text-blue-600" />
            평수 ↔ 제곱미터 변환기
          </h1>
          <p className="text-gray-600">
            부동산 면적, 헷갈리지 마세요.<br />
            입력하는 즉시 자동으로 변환됩니다.
          </p>
        </div>

        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-blue-600 h-2" />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              {/* 평수 입력 */}
              <div className="flex-1 w-full space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-blue-500" /> 평 (Py)
                </Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    value={pyeong}
                    onChange={handlePyeongChange}
                    placeholder="예: 24"
                    className="h-16 text-2xl font-bold text-center bg-blue-50 border-blue-200 focus-visible:ring-blue-500"
                  />
                  <span className="absolute right-4 top-5 text-gray-400 font-medium">평</span>
                </div>
              </div>

              <div className="text-gray-400">
                <ArrowRightLeft className="w-8 h-8 rotate-90 md:rotate-0" />
              </div>

              {/* 제곱미터 입력 */}
              <div className="flex-1 w-full space-y-3">
                <Label className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-green-500" /> 제곱미터 (㎡)
                </Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    value={sqm}
                    onChange={handleSqmChange}
                    placeholder="예: 79.3"
                    className="h-16 text-2xl font-bold text-center bg-green-50 border-green-200 focus-visible:ring-green-500"
                  />
                  <span className="absolute right-4 top-5 text-gray-400 font-medium">㎡</span>
                </div>
              </div>
            </div>

            {/* Visual Reference */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-center font-bold text-gray-900 mb-6">자주 찾는 면적 비교표</h3>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-bold text-gray-900">18평</div>
                  <div className="text-gray-500">59 ㎡</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-bold text-gray-900">24평</div>
                  <div className="text-gray-500">79~81 ㎡</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-bold text-gray-900">32평</div>
                  <div className="text-gray-500">105~109 ㎡</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

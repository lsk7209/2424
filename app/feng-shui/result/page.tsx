import { Metadata } from 'next';
import { Suspense } from 'react';
import FengShuiResultClient from './FengShuiResultClient';

export const metadata: Metadata = {
    title: '풍수지리 테스트 결과 | 독립만세',
    description: '나의 풍수지리 유형과 맞춤형 집터 추천 결과를 확인하세요.',
};

export default function FengShuiResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">로딩 중...</p>
                </div>
            </div>
        }>
            <FengShuiResultClient />
        </Suspense>
    );
}

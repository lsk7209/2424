import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'D-30 이사 작전지도 - 이사독립',
    description: '단계별 이사 준비 체크리스트. 한 달 전부터 이사 당일까지 놓치지 말아야 할 모든 것을 정리했습니다.',
    keywords: ['이사 체크리스트', '이사 준비', 'D-30', '이사 계획', '이사 준비물', '이사 절차'],
    openGraph: {
        title: 'D-30 이사 작전지도 - 이사독립',
        description: '단계별 이사 준비 체크리스트',
        type: 'website',
        url: '/checklist',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'D-30 이사 작전지도 - 이사독립',
        description: '단계별 이사 준비 체크리스트',
    },
};

export { default } from './page';

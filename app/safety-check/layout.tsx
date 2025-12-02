import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '전세 사기 위험 진단기 - 이사독립',
    description: '깡통전세 위험도를 미리 확인하세요. 등기부등본 기반 전세 사기 위험도 진단 및 안전한 계약을 위한 가이드를 제공합니다.',
    keywords: ['전세 사기', '깡통전세', '전세 진단', '등기부등본', '전세 위험도', '전세 계약', '보증보험'],
    openGraph: {
        title: '전세 사기 위험 진단기 - 이사독립',
        description: '깡통전세 위험도를 미리 확인하세요',
        type: 'website',
        url: '/safety-check',
    },
    twitter: {
        card: 'summary_large_image',
        title: '전세 사기 위험 진단기 - 이사독립',
        description: '깡통전세 위험도를 미리 확인하세요',
    },
};

export { default } from './page';

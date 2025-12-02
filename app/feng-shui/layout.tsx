import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '풍수지리 집터 테스트 - 이사독립',
    description: '사주 오행 기반 맞춤형 주거 유형을 찾아보세요. 木火土金水 오행 분석으로 당신에게 맞는 집터를 추천해드립니다.',
    keywords: ['풍수지리', '집터', '사주', '오행', '주거 유형', '집 찾기', '풍수', '인테리어'],
    openGraph: {
        title: '풍수지리 집터 테스트 - 이사독립',
        description: '사주 오행 기반 맞춤형 주거 유형 추천',
        type: 'website',
        url: '/feng-shui',
    },
    twitter: {
        card: 'summary_large_image',
        title: '풍수지리 집터 테스트 - 이사독립',
        description: '사주 오행 기반 맞춤형 주거 유형 추천',
    },
};

export default function FengShuiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '나만의 동네 찾기 테스트 - 이사독립',
    description: '이상과 현실의 갭을 확인하는 MBTI 스타일 동네 찾기 테스트. 당신에게 딱 맞는 동네를 추천해드립니다.',
    keywords: ['동네 찾기', '동네 추천', '자취', '원룸', '동네 테스트', '이사', '독립', '서울 동네'],
    openGraph: {
        title: '나만의 동네 찾기 테스트 - 이사독립',
        description: '이상과 현실의 갭을 확인하는 MBTI 스타일 동네 찾기',
        type: 'website',
        url: '/neighborhood-test',
    },
    twitter: {
        card: 'summary_large_image',
        title: '나만의 동네 찾기 테스트 - 이사독립',
        description: '이상과 현실의 갭을 확인하는 MBTI 스타일 동네 찾기',
    },
};

export default function NeighborhoodTestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

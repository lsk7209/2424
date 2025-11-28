// This is a server component for the result page
import ResultClient from './ResultClient';

export const metadata = {
    title: '나만의 동네 찾기 결과 | 독립만세',
    description: '당신에게 딱 맞는 이상형 동네와 현실적인 추천 동네를 확인하고, 결과를 공유해보세요.',
    openGraph: {
        title: '나만의 동네 찾기 결과',
        description: '당신에게 딱 맞는 이상형 동네와 현실적인 추천 동네를 확인하고, 결과를 공유해보세요.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/neighborhood-test/result`,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: '동네 찾기 결과 이미지',
            },
        ],
        locale: 'ko_KR',
        type: 'website',
    },
};

export default function ResultPage() {
    return <ResultClient />;
}

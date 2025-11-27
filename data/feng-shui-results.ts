import { FengShuiResult } from '@/types';

/**
 * 풍수지리 테스트 결과
 * 오행(木火土金水) 기반 주거 유형 추천
 */
export const fengShuiResults: FengShuiResult[] = [
    {
        id: 'wood-type',
        type: '목(木)형 - 성장하는 나무 기운',
        element: '木',
        description: '당신은 성장과 발전을 추구하는 나무 기운을 가지고 있습니다. 햇빛이 잘 들고 통풍이 좋은 공간에서 에너지를 얻으며, 자연과 가까운 환경을 선호합니다.',
        housing_type: '중층 아파트 또는 테라스가 있는 주택',
        ideal_features: [
            '동향 또는 남향 (햇빛 충분)',
            '발코니나 테라스 (식물 키우기 좋음)',
            '공원이나 녹지 근처',
            '3-7층 (적당한 높이)',
            '통풍이 잘 되는 구조',
        ],
        colors: ['연두색', '초록색', '베이지'],
        lucky_directions: ['동쪽', '남동쪽'],
        recommendations: [
            {
                name: '공기정화 식물 세트',
                link: 'https://www.coupang.com/vp/products/example1',
                image_url: '/images/plant-set.jpg',
            },
            {
                name: '원목 가구 세트',
                link: 'https://www.coupang.com/vp/products/example2',
                image_url: '/images/wood-furniture.jpg',
            },
        ],
    },
    {
        id: 'fire-type',
        type: '화(火)형 - 타오르는 불꽃 기운',
        element: '火',
        description: '당신은 열정적이고 활동적인 불꽃 기운을 가지고 있습니다. 밝고 화려한 환경을 좋아하며, 사람들과의 교류에서 에너지를 얻습니다.',
        housing_type: '고층 아파트 또는 도심 오피스텔',
        ideal_features: [
            '남향 (최대한 밝게)',
            '높은 층수 (10층 이상)',
            '탁 트인 전망',
            '상업지구나 번화가 근처',
            '넓은 거실 공간',
        ],
        colors: ['빨강', '주황', '분홍'],
        lucky_directions: ['남쪽', '남동쪽'],
        recommendations: [
            {
                name: 'LED 무드등 세트',
                link: 'https://www.coupang.com/vp/products/example3',
                image_url: '/images/mood-light.jpg',
            },
            {
                name: '화려한 인테리어 소품',
                link: 'https://www.coupang.com/vp/products/example4',
                image_url: '/images/decor.jpg',
            },
        ],
    },
    {
        id: 'earth-type',
        type: '토(土)형 - 안정된 대지 기운',
        element: '土',
        description: '당신은 안정적이고 편안한 대지 기운을 가지고 있습니다. 아늑하고 따뜻한 분위기를 선호하며, 실용성과 편의성을 중시합니다.',
        housing_type: '중저층 아파트 또는 빌라',
        ideal_features: [
            '남서향 또는 중앙 위치',
            '4-6층 (안정적인 높이)',
            '넓은 수납 공간',
            '편의시설 가까운 곳',
            '방음이 잘 되는 구조',
        ],
        colors: ['베이지', '갈색', '노란색'],
        lucky_directions: ['남서쪽', '북동쪽'],
        recommendations: [
            {
                name: '수납 정리 용품 세트',
                link: 'https://www.coupang.com/vp/products/example5',
                image_url: '/images/storage.jpg',
            },
            {
                name: '아늑한 러그',
                link: 'https://www.coupang.com/vp/products/example6',
                image_url: '/images/rug.jpg',
            },
        ],
    },
    {
        id: 'metal-type',
        type: '금(金)형 - 단단한 금속 기운',
        element: '金',
        description: '당신은 명확하고 정돈된 금속 기운을 가지고 있습니다. 깔끔하고 모던한 환경을 선호하며, 효율성과 기능성을 중요하게 생각합니다.',
        housing_type: '신축 오피스텔 또는 모던 아파트',
        ideal_features: [
            '서향 또는 북서향',
            '깔끔한 화이트 톤 인테리어',
            '최신 시설과 설비',
            '업무 공간 분리 가능',
            '보안 시스템 완비',
        ],
        colors: ['흰색', '회색', '은색'],
        lucky_directions: ['서쪽', '북서쪽'],
        recommendations: [
            {
                name: '미니멀 가구 세트',
                link: 'https://www.coupang.com/vp/products/example7',
                image_url: '/images/minimal-furniture.jpg',
            },
            {
                name: '스마트 홈 기기',
                link: 'https://www.coupang.com/vp/products/example8',
                image_url: '/images/smart-home.jpg',
            },
        ],
    },
    {
        id: 'water-type',
        type: '수(水)형 - 흐르는 물 기운',
        element: '水',
        description: '당신은 유연하고 차분한 물 기운을 가지고 있습니다. 조용하고 평화로운 환경을 선호하며, 사색과 휴식을 중요하게 생각합니다.',
        housing_type: '저층 빌라 또는 단독주택',
        ideal_features: [
            '북향 (시원한 환경)',
            '1-3층 (낮은 층)',
            '조용한 주택가',
            '물 근처 (강, 호수, 분수)',
            '프라이버시 확보',
        ],
        colors: ['파랑', '검정', '남색'],
        lucky_directions: ['북쪽', '북동쪽'],
        recommendations: [
            {
                name: '가습기 및 공기청정기',
                link: 'https://www.coupang.com/vp/products/example9',
                image_url: '/images/humidifier.jpg',
            },
            {
                name: '차분한 조명',
                link: 'https://www.coupang.com/vp/products/example10',
                image_url: '/images/calm-light.jpg',
            },
        ],
    },
];

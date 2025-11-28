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
        lucky_tips: ['현관 입구에 관엽식물을 두면 재물운이 상승합니다.', '거실에는 나무 소재의 가구를 배치하세요.', '침실 커튼은 밝은 녹색 계열이 좋습니다.'],
        avoid_tips: ['차가운 금속 소재의 인테리어는 피하세요.', '서쪽으로 머리를 두고 자지 마세요.', '집안에 시든 꽃이나 식물을 방치하지 마세요.'],
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
        lucky_tips: ['거실 조명을 밝고 화려하게 유지하세요.', '붉은색 계열의 쿠션이나 액자로 포인트를 주세요.', '주방을 항상 청결하게 유지하면 건강운이 좋아집니다.'],
        avoid_tips: ['집안을 어둡거나 습하게 두지 마세요.', '북쪽으로 머리를 두고 자면 에너지가 떨어질 수 있습니다.', '수족관이나 어항은 가급적 피하는 것이 좋습니다.'],
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
        lucky_tips: ['거실에 도자기나 토기 장식품을 두면 좋습니다.', '가구는 낮고 안정감 있는 디자인을 선택하세요.', '노란색 계열의 러그를 깔면 가정운이 좋아집니다.'],
        avoid_tips: ['너무 높은 고층 아파트는 기운이 불안정할 수 있습니다.', '푸른색 위주의 차가운 인테리어는 피하세요.', '현관에 거울이 정면으로 보이지 않게 하세요.'],
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
        lucky_tips: ['화이트 톤이나 메탈 소재의 인테리어가 행운을 부릅니다.', '원형 거울이나 시계를 걸어두면 좋습니다.', '침실은 최대한 심플하고 깔끔하게 유지하세요.'],
        avoid_tips: ['붉은색을 과하게 사용하면 기운이 충돌할 수 있습니다.', '남쪽으로 머리를 두고 자지 마세요.', '오래된 목재 가구는 피하는 것이 좋습니다.'],
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
        lucky_tips: ['작은 어항이나 미니 분수를 두면 재물운이 흐릅니다.', '침구는 차분한 블루나 그레이 톤이 좋습니다.', '욕실을 항상 청결하고 건조하게 유지하세요.'],
        avoid_tips: ['너무 강한 조명이나 화려한 색상은 피하세요.', '흙이 많은 화분을 침실에 두지 마세요.', '현관이 너무 밝으면 기운이 흩어질 수 있습니다.'],
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

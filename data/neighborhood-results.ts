import { NeighborhoodResult } from '@/types';

export const neighborhoodResults: NeighborhoodResult[] = [
    // 이상형 동네들 (높은 vibe, 높은 budget)
    {
        id: 'hannam',
        name: '한남동 유엔빌리지',
        archetype: '세계 시민의 성지',
        description: '한강뷰 카페에서 브런치를 즐기고, 감성 편집샵을 구경하는 당신. 외국인 친구들과 자연스럽게 영어로 대화하며 글로벌한 라이프스타일을 즐깁니다.',
        tags: ['힙스터', '고급', '한강뷰', '외국인 많음', '브런치'],
        match_type: 'ideal',
        affiliate_products: [
            {
                name: '프리미엄 에스프레소 머신',
                link: 'https://coupa.ng/example1',
                image_url: '/products/espresso.jpg'
            },
            {
                name: '북유럽 감성 인테리어 소품',
                link: 'https://coupa.ng/example2',
                image_url: '/products/interior.jpg'
            }
        ]
    },
    {
        id: 'seongsu',
        name: '성수동',
        archetype: '힙스터들의 성지',
        description: '공장을 개조한 카페에서 핸드드립 커피를 마시고, 독립 서점에서 시간을 보내는 당신. SNS에 올릴 감성 사진은 기본입니다.',
        tags: ['힙스터', '카페', '감성', '핫플', '인스타'],
        match_type: 'ideal',
        affiliate_products: [
            {
                name: '빈티지 감성 조명',
                link: 'https://coupa.ng/example3',
                image_url: '/products/lamp.jpg'
            },
            {
                name: '감성 캠핑 체어',
                link: 'https://coupa.ng/example4',
                image_url: '/products/chair.jpg'
            }
        ]
    },
    {
        id: 'yeonnam',
        name: '연남동',
        archetype: '로컬 크리에이터의 아지트',
        description: '골목골목 숨은 맛집을 찾아다니고, 작은 갤러리와 공방을 구경하는 재미. 여유로운 주말 오후가 일상입니다.',
        tags: ['감성', '맛집', '골목', '여유', '예술'],
        match_type: 'ideal',
        affiliate_products: [
            {
                name: '홈카페 원두 세트',
                link: 'https://coupa.ng/example5',
                image_url: '/products/coffee.jpg'
            }
        ]
    },
    {
        id: 'gangnam',
        name: '강남역',
        archetype: '도심 속 편의왕',
        description: '24시간 편의점, 심야 배달, 새벽 헬스장까지. 모든 것이 가까운 초역세권 라이프를 즐깁니다.',
        tags: ['편의성', '역세권', '24시간', '번화가'],
        match_type: 'ideal',
        affiliate_products: [
            {
                name: '스마트 도어락',
                link: 'https://coupa.ng/example6',
                image_url: '/products/doorlock.jpg'
            }
        ]
    },

    // 현실형 동네들 (저렴한 budget)
    {
        id: 'sinlim',
        name: '신림동 고시촌',
        archetype: '가성비 끝판왕',
        description: '월세 30만원으로 독립 성공! 고시원 특유의 아늑함(?)과 편의점 도시락이 주식인 진정한 자취생의 삶.',
        tags: ['저렴', '고시원', '학생가', '편의점'],
        match_type: 'real',
        affiliate_products: [
            {
                name: '미니 전기밥솥',
                link: 'https://coupa.ng/example7',
                image_url: '/products/ricecooker.jpg'
            },
            {
                name: '접이식 책상',
                link: 'https://coupa.ng/example8',
                image_url: '/products/desk.jpg'
            }
        ]
    },
    {
        id: 'nowon',
        name: '노원구',
        archetype: '실속파의 안식처',
        description: '넓은 평수에 저렴한 월세, 조용한 주거환경. 힙하진 않지만 살기엔 최고입니다.',
        tags: ['저렴', '조용', '넓음', '주거지'],
        match_type: 'real',
        affiliate_products: [
            {
                name: '가성비 침구 세트',
                link: 'https://coupa.ng/example9',
                image_url: '/products/bedding.jpg'
            }
        ]
    },
    {
        id: 'guro',
        name: '구로 디지털단지',
        archetype: '직장인의 현실',
        description: '회사 근처 원룸. 출퇴근 10분의 행복을 위해 감성은 포기했습니다. 하지만 퇴근 후 여유시간이 많아요!',
        tags: ['직장 근처', '편의성', '원룸', '실용'],
        match_type: 'real',
        affiliate_products: [
            {
                name: '공기청정기',
                link: 'https://coupa.ng/example10',
                image_url: '/products/airpurifier.jpg'
            }
        ]
    },
    {
        id: 'bucheon',
        name: '부천',
        archetype: '서울 아닌 서울',
        description: '서울은 아니지만 지하철로 30분이면 강남! 넓은 집에 저렴한 월세, 이것이 진정한 가성비입니다.',
        tags: ['경기도', '저렴', '넓음', '지하철'],
        match_type: 'real',
        affiliate_products: [
            {
                name: '대용량 수납장',
                link: 'https://coupa.ng/example11',
                image_url: '/products/storage.jpg'
            }
        ]
    },
    {
        id: 'sangbong',
        name: '상봉동',
        archetype: '숨은 보석',
        description: '중랑천 산책로와 조용한 주거지. 힙하진 않지만 살기 좋은 동네입니다.',
        tags: ['조용', '공원', '저렴', '주거지'],
        match_type: 'real',
        affiliate_products: [
            {
                name: '자전거',
                link: 'https://coupa.ng/example12',
                image_url: '/products/bike.jpg'
            }
        ]
    },
    {
        id: 'junggye',
        name: '중계동',
        archetype: '평범한 일상',
        description: '학원가와 주택가가 공존하는 평범한 동네. 특별할 건 없지만 불편할 것도 없습니다.',
        tags: ['평범', '주거지', '학원가', '조용'],
        match_type: 'real',
        affiliate_products: [
            {
                name: 'LED 스탠드',
                link: 'https://coupa.ng/example13',
                image_url: '/products/lamp2.jpg'
            }
        ]
    }
];

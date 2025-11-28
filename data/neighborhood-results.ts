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
        pros: ['연예인이 이웃일 확률 높음', '완벽한 치안과 프라이버시', '최고급 인프라와 문화시설'],
        cons: ['극악의 언덕길 (등산 필수)', '편의점 가려면 차 타야 함', '통장 잔고가 빛의 속도로 사라짐'],
        funFact: '유엔빌리지에는 배달 기사님들도 길을 잃는 미로 같은 골목이 있다고 합니다.',
        famousFor: ['유엔빌리지 길', '디뮤지엄', '고급 빌라촌'],
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
        pros: ['매주 열리는 새로운 팝업스토어', '서울숲 산책 가능', '평지라 자전거 타기 좋음'],
        cons: ['주말엔 사람 반 공기 반', '어딜 가나 웨이팅 지옥', '월세가 강남 뺨침'],
        funFact: '성수동 붉은 벽돌 건물은 시에서 보존을 권장해서 혜택을 준다고 해요.',
        famousFor: ['서울숲', '카페거리', '아틀리에길'],
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
        pros: ['경의선 숲길(연트럴파크) 보유', '개성 있는 개인 상점 많음', '홍대입구역 교통 편리'],
        cons: ['주말엔 돗자리 펼 자리도 없음', '주차 공간 전멸', '밤늦게까지 시끌벅적'],
        funFact: '연남동 골목 사이사이에는 아직도 70-80년대 주택의 모습이 남아있어요.',
        famousFor: ['연트럴파크', '미로골목', '동진시장'],
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
        pros: ['슬리퍼 신고 모든 해결 가능 (슬세권)', '교통의 요지 (어디든 감)', '배달 음식 종류 무한대'],
        cons: ['창문 열면 매연과 소음', '월세 대비 방 크기 코딱지', '출퇴근 시간 지옥철'],
        funFact: '강남역 지하상가는 길 잃기 딱 좋은 던전으로 유명하죠.',
        famousFor: ['강남역 지하상가', '맛집 거리', '학원가'],
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
        pros: ['서울에서 가장 저렴한 월세', '물가가 싸서 생활비 절약', '순대타운 가까움'],
        cons: ['지옥의 2호선 출근길', '언덕길이 많아 강제 하체 운동', '치안이 조금 걱정됨'],
        funFact: '신림동 순대타운은 사실 순대보다 백순대가 더 유명합니다.',
        famousFor: ['순대타운', '도림천', '녹두거리'],
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
        pros: ['같은 가격이면 강남보다 2배 넓음', '조용하고 쾌적한 주거 환경', '학군이 좋아 치안 좋음'],
        cons: ['강남까지 가려면 1시간', '힙한 카페 찾기 힘듦', '친구들이 멀다고 안 옴'],
        funFact: '노원구는 서울에서 아파트가 가장 많은 구 중 하나입니다.',
        famousFor: ['경춘선 숲길', '불암산', '학원가'],
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
        pros: ['걸어서 출퇴근 가능 (워라밸)', '이마트, 깔깔거리 등 편의시설', '오피스텔 공급 많음'],
        cons: ['주말엔 유령 도시 느낌', '회사가 너무 가까워도 스트레스', '비행기 소음'],
        funFact: '구로디지털단지는 과거 수출의 다리라 불리던 공단 지역이었습니다.',
        famousFor: ['깔깔거리', '이마트', '지밸리몰'],
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
        pros: ['서울 전세값으로 내 집 마련 가능', '7호선으로 강남 접근성 굿', '대형 마트와 공원 많음'],
        cons: ['출퇴근 시간 7호선은 지옥', '서울 친구들 만나기 힘듦', '행정구역상 경기도'],
        funFact: '부천은 영화제와 만화축제로 유명한 문화 도시입니다.',
        famousFor: ['부천국제판타스틱영화제', '상동 호수공원', '만화박물관'],
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
        pros: ['코스트코, 이마트, 홈플러스 슬세권', 'KTX/경춘선/7호선 트리플 역세권', '중랑천 산책하기 좋음'],
        cons: ['아직 개발 중인 곳이 많음', '밤에는 조금 어두울 수 있음', '문화 시설 부족'],
        funFact: '상봉역에는 강릉으로 가는 KTX가 정차합니다.',
        famousFor: ['코스트코 상봉점', '중랑천', '망우역사문화공원'],
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
        pros: ['유해시설 없는 청정 구역', '불암산 등산로 가까움', '치안 매우 좋음'],
        cons: ['지하철역이 조금 멀 수 있음', '밤 10시 되면 다 문 닫음', '재미있는 놀거리는 부족'],
        funFact: '중계동 은행사거리는 강북의 대치동이라 불립니다.',
        famousFor: ['은행사거리', '불암산', '북서울미술관'],
        affiliate_products: [
            {
                name: 'LED 스탠드',
                link: 'https://coupa.ng/example13',
                image_url: '/products/lamp2.jpg'
            }
        ]
    }
];

import { Question } from '@/types';

/**
 * 풍수지리 집터 테스트 질문
 * 사주 오행(木火土金水) 기반 맞춤형 주거 유형 추천
 */
export const fengShuiQuestions: Question[] = [
    {
        id: 1,
        text: '당신의 출생 계절은 언제인가요?',
        options: [
            {
                text: '봄 (3월~5월)',
                scores: { vibe: 7, infra: 5, budget: 6 }, // 木 - 성장, 발전
            },
            {
                text: '여름 (6월~8월)',
                scores: { vibe: 9, infra: 8, budget: 8 }, // 火 - 열정, 활동
            },
            {
                text: '가을 (9월~11월)',
                scores: { vibe: 5, infra: 6, budget: 7 }, // 金 - 안정, 수확
            },
            {
                text: '겨울 (12월~2월)',
                scores: { vibe: 3, infra: 4, budget: 5 }, // 水 - 고요, 휴식
            },
        ],
    },
    {
        id: 2,
        text: '아침에 일어났을 때 가장 먼저 보고 싶은 풍경은?',
        options: [
            {
                text: '푸른 나무와 공원',
                scores: { vibe: 4, infra: 3, budget: 5 },
            },
            {
                text: '햇살 가득한 탁 트인 전망',
                scores: { vibe: 8, infra: 7, budget: 8 },
            },
            {
                text: '조용한 주택가',
                scores: { vibe: 2, infra: 4, budget: 4 },
            },
            {
                text: '활기찬 도심 풍경',
                scores: { vibe: 9, infra: 9, budget: 9 },
            },
        ],
    },
    {
        id: 3,
        text: '집에서 가장 중요하게 생각하는 요소는?',
        options: [
            {
                text: '채광 (햇빛이 잘 드는 것)',
                scores: { vibe: 7, infra: 5, budget: 7 },
            },
            {
                text: '통풍 (바람이 잘 통하는 것)',
                scores: { vibe: 5, infra: 4, budget: 5 },
            },
            {
                text: '방음 (조용한 것)',
                scores: { vibe: 2, infra: 6, budget: 6 },
            },
            {
                text: '접근성 (교통이 편리한 것)',
                scores: { vibe: 8, infra: 9, budget: 8 },
            },
        ],
    },
    {
        id: 4,
        text: '당신이 선호하는 집의 층수는?',
        options: [
            {
                text: '1-2층 (지상과 가까운 곳)',
                scores: { vibe: 3, infra: 5, budget: 4 },
            },
            {
                text: '3-5층 (중간층)',
                scores: { vibe: 5, infra: 6, budget: 6 },
            },
            {
                text: '6-10층 (높은 층)',
                scores: { vibe: 7, infra: 7, budget: 7 },
            },
            {
                text: '11층 이상 (고층)',
                scores: { vibe: 9, infra: 8, budget: 9 },
            },
        ],
    },
    {
        id: 5,
        text: '집 근처에 있으면 좋을 것 같은 시설은?',
        options: [
            {
                text: '공원이나 산책로',
                scores: { vibe: 3, infra: 4, budget: 5 },
            },
            {
                text: '카페와 맛집',
                scores: { vibe: 8, infra: 8, budget: 7 },
            },
            {
                text: '대형마트와 편의점',
                scores: { vibe: 6, infra: 9, budget: 6 },
            },
            {
                text: '도서관이나 문화시설',
                scores: { vibe: 5, infra: 6, budget: 6 },
            },
        ],
    },
    {
        id: 6,
        text: '당신의 에너지 충전 방식은?',
        options: [
            {
                text: '자연 속에서 산책하며',
                scores: { vibe: 2, infra: 3, budget: 4 },
            },
            {
                text: '친구들과 활발하게 놀며',
                scores: { vibe: 9, infra: 8, budget: 8 },
            },
            {
                text: '집에서 조용히 쉬며',
                scores: { vibe: 1, infra: 5, budget: 5 },
            },
            {
                text: '새로운 장소 탐험하며',
                scores: { vibe: 8, infra: 7, budget: 7 },
            },
        ],
    },
    {
        id: 7,
        text: '선호하는 집의 방향(향)은?',
        options: [
            {
                text: '동향 (아침 햇살)',
                scores: { vibe: 6, infra: 5, budget: 6 },
            },
            {
                text: '남향 (하루 종일 햇빛)',
                scores: { vibe: 8, infra: 7, budget: 8 },
            },
            {
                text: '서향 (오후 햇살)',
                scores: { vibe: 5, infra: 6, budget: 5 },
            },
            {
                text: '북향 (시원한 환경)',
                scores: { vibe: 3, infra: 5, budget: 4 },
            },
        ],
    },
    {
        id: 8,
        text: '집 주변 환경으로 선호하는 것은?',
        options: [
            {
                text: '조용한 주택가',
                scores: { vibe: 2, infra: 4, budget: 5 },
            },
            {
                text: '활기찬 상업지구',
                scores: { vibe: 9, infra: 9, budget: 8 },
            },
            {
                text: '대학가 분위기',
                scores: { vibe: 7, infra: 7, budget: 6 },
            },
            {
                text: '한적한 외곽',
                scores: { vibe: 1, infra: 2, budget: 3 },
            },
        ],
    },
    {
        id: 9,
        text: '당신의 생활 패턴은?',
        options: [
            {
                text: '이른 아침형 인간 (오전 활동)',
                scores: { vibe: 5, infra: 6, budget: 6 },
            },
            {
                text: '저녁형 인간 (오후/저녁 활동)',
                scores: { vibe: 7, infra: 8, budget: 7 },
            },
            {
                text: '야행성 (밤 활동)',
                scores: { vibe: 8, infra: 9, budget: 8 },
            },
            {
                text: '불규칙 (상황에 따라)',
                scores: { vibe: 6, infra: 7, budget: 6 },
            },
        ],
    },
    {
        id: 10,
        text: '집에서 가장 많은 시간을 보내는 활동은?',
        options: [
            {
                text: '휴식과 수면',
                scores: { vibe: 2, infra: 4, budget: 5 },
            },
            {
                text: '취미 활동 (운동, 게임 등)',
                scores: { vibe: 6, infra: 6, budget: 6 },
            },
            {
                text: '재택근무/공부',
                scores: { vibe: 5, infra: 7, budget: 7 },
            },
            {
                text: '친구 초대/파티',
                scores: { vibe: 9, infra: 8, budget: 8 },
            },
        ],
    },
];

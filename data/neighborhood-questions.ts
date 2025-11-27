import { Question } from '@/types';

export const neighborhoodQuestions: Question[] = [
    {
        id: 1,
        text: "주말 오후, 나는 주로...",
        options: [
            {
                text: "조용한 카페에서 책 읽기",
                scores: { vibe: 2, infra: 3, budget: 5 }
            },
            {
                text: "핫플 카페에서 인스타 찍기",
                scores: { vibe: 9, infra: 8, budget: 8 }
            },
            {
                text: "공원에서 산책하기",
                scores: { vibe: 1, infra: 2, budget: 3 }
            },
            {
                text: "편의점 앞 벤치에서 맥주",
                scores: { vibe: 5, infra: 9, budget: 4 }
            }
        ]
    },
    {
        id: 2,
        text: "집 근처에 꼭 있어야 하는 것은?",
        options: [
            {
                text: "24시간 편의점",
                scores: { vibe: 6, infra: 10, budget: 5 }
            },
            {
                text: "대형 공원",
                scores: { vibe: 2, infra: 1, budget: 6 }
            },
            {
                text: "감성 카페 거리",
                scores: { vibe: 9, infra: 7, budget: 8 }
            },
            {
                text: "대형마트",
                scores: { vibe: 4, infra: 8, budget: 4 }
            }
        ]
    },
    {
        id: 3,
        text: "이상적인 출퇴근 시간은?",
        options: [
            {
                text: "30분 이내 (비싸도 OK)",
                scores: { vibe: 7, infra: 8, budget: 9 }
            },
            {
                text: "1시간 정도 (적당한 가격)",
                scores: { vibe: 5, infra: 6, budget: 5 }
            },
            {
                text: "1시간 반 이상도 괜찮아 (저렴하게)",
                scores: { vibe: 3, infra: 4, budget: 2 }
            },
            {
                text: "재택근무라 상관없음",
                scores: { vibe: 4, infra: 5, budget: 6 }
            }
        ]
    },
    {
        id: 4,
        text: "나의 월 생활비는?",
        options: [
            {
                text: "100만원 미만",
                scores: { vibe: 3, infra: 5, budget: 2 }
            },
            {
                text: "100~200만원",
                scores: { vibe: 5, infra: 6, budget: 5 }
            },
            {
                text: "200~300만원",
                scores: { vibe: 7, infra: 7, budget: 7 }
            },
            {
                text: "300만원 이상",
                scores: { vibe: 9, infra: 8, budget: 10 }
            }
        ]
    },
    {
        id: 5,
        text: "밤 11시, 배가 고프다면?",
        options: [
            {
                text: "집에 있는 라면 끓여먹기",
                scores: { vibe: 2, infra: 3, budget: 2 }
            },
            {
                text: "편의점 도시락",
                scores: { vibe: 5, infra: 10, budget: 4 }
            },
            {
                text: "배달 앱 켜기",
                scores: { vibe: 6, infra: 8, budget: 6 }
            },
            {
                text: "심야 맛집 찾아가기",
                scores: { vibe: 9, infra: 9, budget: 8 }
            }
        ]
    },
    {
        id: 6,
        text: "이웃과의 관계는?",
        options: [
            {
                text: "인사도 안 하는 게 좋아",
                scores: { vibe: 8, infra: 7, budget: 7 }
            },
            {
                text: "가볍게 인사 정도",
                scores: { vibe: 6, infra: 6, budget: 5 }
            },
            {
                text: "친하게 지내고 싶어",
                scores: { vibe: 3, infra: 4, budget: 4 }
            },
            {
                text: "이웃? 그게 뭐야?",
                scores: { vibe: 9, infra: 8, budget: 8 }
            }
        ]
    },
    {
        id: 7,
        text: "주거 형태 선호도는?",
        options: [
            {
                text: "신축 오피스텔",
                scores: { vibe: 8, infra: 9, budget: 8 }
            },
            {
                text: "깔끔한 빌라",
                scores: { vibe: 5, infra: 6, budget: 5 }
            },
            {
                text: "오래된 아파트",
                scores: { vibe: 3, infra: 7, budget: 4 }
            },
            {
                text: "단독/다가구 주택",
                scores: { vibe: 4, infra: 3, budget: 3 }
            }
        ]
    },
    {
        id: 8,
        text: "동네 분위기는?",
        options: [
            {
                text: "조용하고 한적한 주택가",
                scores: { vibe: 1, infra: 2, budget: 3 }
            },
            {
                text: "적당히 번화한 상업지구",
                scores: { vibe: 6, infra: 8, budget: 6 }
            },
            {
                text: "트렌디한 핫플레이스",
                scores: { vibe: 10, infra: 9, budget: 9 }
            },
            {
                text: "대학가 같은 활기찬 곳",
                scores: { vibe: 7, infra: 9, budget: 5 }
            }
        ]
    },
    {
        id: 9,
        text: "집에서 가장 중요한 것은?",
        options: [
            {
                text: "채광과 뷰",
                scores: { vibe: 7, infra: 5, budget: 8 }
            },
            {
                text: "방음과 보안",
                scores: { vibe: 6, infra: 6, budget: 7 }
            },
            {
                text: "넓은 평수",
                scores: { vibe: 5, infra: 4, budget: 6 }
            },
            {
                text: "저렴한 월세",
                scores: { vibe: 3, infra: 5, budget: 2 }
            }
        ]
    },
    {
        id: 10,
        text: "여가 시간에는?",
        options: [
            {
                text: "집에서 넷플릭스",
                scores: { vibe: 4, infra: 5, budget: 3 }
            },
            {
                text: "헬스장/요가",
                scores: { vibe: 7, infra: 8, budget: 7 }
            },
            {
                text: "전시회/공연 관람",
                scores: { vibe: 9, infra: 7, budget: 8 }
            },
            {
                text: "등산/자전거",
                scores: { vibe: 2, infra: 1, budget: 4 }
            }
        ]
    }
];

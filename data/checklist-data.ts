import { ChecklistItem } from '@/types';

export const checklistData: ChecklistItem[] = [
    {
        d_day: 'D-30',
        title: '한 달 전 준비사항',
        tasks: [
            {
                text: '이사 날짜 확정 및 이사 업체 견적 받기',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '이사 업체 비교 견적',
                    url: 'https://example.com/moving-company',
                },
            },
            {
                text: '안 쓰는 물건 정리 (중고거래, 기부)',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '중고거래 플랫폼 바로가기',
                    url: 'https://example.com/used-market',
                },
            },
            {
                text: '새 집 계약서 확인 및 등기부등본 열람',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '전입신고 준비 서류 확인',
                is_completed: false,
                has_affiliate: false,
            },
        ],
    },
    {
        d_day: 'D-14',
        title: '2주 전 준비사항',
        tasks: [
            {
                text: '입주 청소 업체 예약',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '청소 업체 비교하기',
                    url: 'https://example.com/cleaning',
                },
            },
            {
                text: '인터넷/TV 설치 신청',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '인터넷 가입 혜택 보기',
                    url: 'https://example.com/internet',
                },
            },
            {
                text: '가스/전기/수도 개통 신청',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '우편물 주소 변경 신청',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '이사 박스 및 포장재 구매',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '튼튼한 이사 박스 구매',
                    url: 'https://coupa.ng/example-box',
                },
            },
        ],
    },
    {
        d_day: 'D-7',
        title: '일주일 전 준비사항',
        tasks: [
            {
                text: '짐 싸기 시작 (계절 옷, 책 등)',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '냉장고 음식 정리 및 비우기',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '이사 업체 최종 확인 및 결제',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '현재 집 관리사무소에 이사 통보',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '엘리베이터 사용 예약',
                is_completed: false,
                has_affiliate: false,
            },
        ],
    },
    {
        d_day: 'D-3',
        title: '3일 전 준비사항',
        tasks: [
            {
                text: '귀중품 및 중요 서류 따로 보관',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '세탁기, 냉장고 물 빼기',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '가전제품 전선 정리 및 라벨링',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '전선 정리 용품',
                    url: 'https://coupa.ng/example-cable',
                },
            },
            {
                text: '이삿짐 최종 점검 및 박스 번호 매기기',
                is_completed: false,
                has_affiliate: false,
            },
        ],
    },
    {
        d_day: 'D-1',
        title: '하루 전 준비사항',
        tasks: [
            {
                text: '필수품 가방 따로 챙기기 (세면도구, 옷 등)',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '현재 집 청소 및 정리',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '이사 당일 동선 및 주차 위치 확인',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '새 집 열쇠 및 비밀번호 확인',
                is_completed: false,
                has_affiliate: false,
            },
        ],
    },
    {
        d_day: 'D-Day',
        title: '이사 당일',
        tasks: [
            {
                text: '이사 업체 도착 시간 확인',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '이삿짐 파손 여부 확인',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '구 집 가스/전기/수도 점검 및 잠금',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '새 집 가구 배치 지시',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '이사 비용 정산',
                is_completed: false,
                has_affiliate: false,
            },
        ],
    },
    {
        d_day: 'D+1',
        title: '이사 다음 날',
        tasks: [
            {
                text: '전입신고 (14일 이내)',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '택배 주소 변경',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '은행, 카드사 주소 변경',
                is_completed: false,
                has_affiliate: false,
            },
            {
                text: '필요한 생활용품 구매',
                is_completed: false,
                has_affiliate: true,
                affiliate_info: {
                    label: '신규 입주 필수템',
                    url: 'https://coupa.ng/example-essentials',
                },
            },
            {
                text: '동네 편의시설 파악 (마트, 병원, 약국 등)',
                is_completed: false,
                has_affiliate: false,
            },
        ],
    },
];

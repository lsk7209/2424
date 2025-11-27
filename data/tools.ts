import { Calculator, Ruler, Map, Shield, CheckSquare, Truck, Home, DollarSign, Clock, Volume2 } from 'lucide-react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  href: string;
  category: '계산기' | '진단/테스트' | '생활편의' | '안전';
  isNew?: boolean;
  isReady: boolean; // AdSense Guard: Hide unfinished tools
}

export const tools: Tool[] = [
  // Existing Tools (Ready)
  {
    slug: 'neighborhood-test',
    title: '나만의 동네 찾기',
    description: 'MBTI 스타일로 알아보는 나에게 딱 맞는 동네 추천',
    icon: Map,
    href: '/neighborhood-test',
    category: '진단/테스트',
    isReady: true,
  },
  {
    slug: 'feng-shui',
    title: '풍수지리 집터 테스트',
    description: '사주 오행 기반 맞춤형 주거 유형 및 인테리어 추천',
    icon: Home,
    href: '/feng-shui',
    category: '진단/테스트',
    isReady: true,
  },
  {
    slug: 'safety-check',
    title: '전세 사기 위험 진단',
    description: '등기부등본 데이터 기반 깡통전세 위험도 분석',
    icon: Shield,
    href: '/safety-check',
    category: '안전',
    isReady: true,
  },
  {
    slug: 'checklist',
    title: 'D-30 이사 작전지도',
    description: '이사 한 달 전부터 챙겨야 할 단계별 체크리스트',
    icon: CheckSquare,
    href: '/checklist',
    category: '생활편의',
    isReady: true,
  },

  // New Tools (Planned - Hidden for AdSense Review)
  // TODO: Implement these tools one by one. 
  // DO NOT expose empty pages to Google Bots.
  {
    slug: 'moving-cost-calculator',
    title: '이사 견적 계산기',
    description: '짐 양, 거리, 층수에 따른 예상 이사 비용 산출',
    icon: Truck,
    href: '/tools/moving-cost-calculator',
    category: '계산기',
    isNew: true,
    isReady: false,
  },
  {
    slug: 'deposit-interest-calculator',
    title: '전월세 전환율 계산기',
    description: '보증금 증액/감액 시 월세가 얼마나 변하는지 계산',
    icon: Calculator,
    href: '/tools/deposit-interest-calculator',
    category: '계산기',
    isNew: true,
    isReady: false,
  },
  {
    slug: 'brokerage-fee-calculator',
    title: '중개수수료 계산기',
    description: '거래 금액에 따른 부동산 중개수수료(복비) 상한요율 확인',
    icon: DollarSign,
    href: '/tools/brokerage-fee-calculator',
    category: '계산기',
    isNew: true,
    isReady: false,
  },
  {
    slug: 'area-converter',
    title: '평수/제곱미터 변환기',
    description: '㎡ ↔ 평 실시간 변환 및 시각적 크기 체감',
    icon: Ruler,
    href: '/tools/area-converter',
    category: '계산기',
    isNew: true,
    isReady: false,
  },
  {
    slug: 'd-day-counter',
    title: '이사 D-Day 카운터',
    description: '이사 날짜까지 남은 시간과 주요 일정 알림',
    icon: Clock,
    href: '/tools/d-day-counter',
    category: '생활편의',
    isNew: true,
    isReady: false,
  },
  {
    slug: 'noise-measure',
    title: '층간소음 측정 기록기',
    description: '집 보러 갔을 때 주변 소음 데시벨 측정 및 기록',
    icon: Volume2,
    href: '/tools/noise-measure',
    category: '생활편의',
    isNew: true,
    isReady: false,
  },
];

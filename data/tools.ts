import {
  Calculator,
  Clock,
  DollarSign,
  Home,
  Map,
  type LucideIcon,
  CheckSquare,
  Ruler,
  Shield,
  Truck,
  Volume2,
} from 'lucide-react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: '계산기' | '진단/테스트' | '생활편의' | '안전';
  isNew?: boolean;
  isReady: boolean;
}

export const tools: Tool[] = [
  {
    slug: 'neighborhood-test',
    title: '나만의 동네 찾기',
    description: '생활 취향과 선호도를 바탕으로 나에게 맞는 동네 후보를 추천합니다.',
    icon: Map,
    href: '/neighborhood-test',
    category: '진단/테스트',
    isReady: true,
  },
  {
    slug: 'feng-shui',
    title: '풍수지리 집터 테스트',
    description: '주거 성향과 분위기를 바탕으로 어울리는 집터 성향을 확인합니다.',
    icon: Home,
    href: '/feng-shui',
    category: '진단/테스트',
    isReady: true,
  },
  {
    slug: 'safety-check',
    title: '전세 사기 위험 진단',
    description: '시세, 보증금, 근저당 정보를 바탕으로 위험 신호를 빠르게 점검합니다.',
    icon: Shield,
    href: '/safety-check',
    category: '안전',
    isReady: true,
  },
  {
    slug: 'checklist',
    title: 'D-30 이사 체크리스트',
    description: '이사 한 달 전부터 당일까지 단계별로 확인할 일을 정리했습니다.',
    icon: CheckSquare,
    href: '/checklist',
    category: '생활편의',
    isReady: true,
  },
  {
    slug: 'moving-cost-calculator',
    title: '이사 견적 계산기',
    description: '짐 양, 거리, 층수를 기준으로 예상 이사 비용을 계산합니다.',
    icon: Truck,
    href: '/tools/moving-cost-calculator',
    category: '계산기',
    isNew: true,
    isReady: true,
  },
  {
    slug: 'deposit-interest-calculator',
    title: '전월세 전환율 계산기',
    description: '보증금이 바뀔 때 월세가 얼마나 달라지는지 계산합니다.',
    icon: Calculator,
    href: '/tools/deposit-interest-calculator',
    category: '계산기',
    isNew: true,
    isReady: true,
  },
  {
    slug: 'brokerage-fee-calculator',
    title: '중개수수료 계산기',
    description: '거래 금액 기준으로 중개보수 상한 요율을 빠르게 확인합니다.',
    icon: DollarSign,
    href: '/tools/brokerage-fee-calculator',
    category: '계산기',
    isNew: true,
    isReady: true,
  },
  {
    slug: 'area-converter',
    title: '평수/제곱미터 변환기',
    description: '평과 제곱미터를 실시간으로 변환하고 면적 감각을 돕습니다.',
    icon: Ruler,
    href: '/tools/area-converter',
    category: '계산기',
    isNew: true,
    isReady: true,
  },
  {
    slug: 'd-day-counter',
    title: '이사 D-Day 카운터',
    description: '이사까지 남은 시간과 시점별 준비 항목을 확인합니다.',
    icon: Clock,
    href: '/tools/d-day-counter',
    category: '생활편의',
    isNew: true,
    isReady: true,
  },
  {
    slug: 'noise-measure',
    title: '층간소음 측정 기록기',
    description: '집을 볼 때 주변 소음을 기록하고 비교할 수 있는 도구입니다.',
    icon: Volume2,
    href: '/tools/noise-measure',
    category: '생활편의',
    isNew: true,
    isReady: false,
  },
];

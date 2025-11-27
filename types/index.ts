// 동네 찾기 질문 구조
export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      vibe: number; // 0: Quiet, 10: Hip
      infra: number; // 0: Nature, 10: Convenience
      budget: number; // 0: Low, 10: High
    };
  }[];
}

// 동네 결과 구조
export interface NeighborhoodResult {
  id: string;
  name: string; // e.g., "성수동"
  archetype: string; // e.g., "힙스터들의 성지"
  description: string;
  tags: string[];
  match_type: 'ideal' | 'real';
  affiliate_products: {
    name: string;
    link: string; // Coupang Link
    image_url: string;
  }[];
}

// 체크리스트 구조
export interface ChecklistItem {
  d_day: string; // "D-30"
  title: string;
  tasks: {
    text: string;
    is_completed: boolean;
    has_affiliate: boolean;
    affiliate_info?: {
      label: string; // "최저가 박스 사러가기"
      url: string;
    };
  }[];
}

// 풍수지리 테스트 결과
export interface FengShuiResult {
  id: string;
  type: string; // "목(木)형 - 성장하는 나무 기운"
  element: string; // "木", "火", "土", "金", "水"
  description: string;
  housing_type: string; // "중층 아파트 또는 테라스가 있는 주택"
  ideal_features: string[]; // 이상적인 집의 특징
  colors: string[]; // 행운의 색상
  lucky_directions: string[]; // 행운의 방향
  recommendations: {
    name: string;
    link: string;
    image_url: string;
  }[];
}

// 전세 사기 진단 결과
export interface SafetyResult {
  risk_ratio: number;
  level: 'safe' | 'warning' | 'danger';
  message: string;
  advice: string[];
}

// 사용자 답변 저장
export interface UserAnswers {
  [questionId: number]: number; // questionId -> selected option index
}

// 점수 집계
export interface ScoreResult {
  vibe: number;
  infra: number;
  budget: number;
}

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "move-waste-disposal-checklist",
    title: "이사 폐기물 처리 빠뜨리기 쉬운 대형폐기물",
    excerpt: "이사 폐기물 처리를 판단할 때 대형폐기물만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "checklist",
    keywords: ["이사 폐기물 처리", "대형폐기물", "종량제봉투", "재활용 요일", "수거 예약"],
    sections: ["1. 대형폐기물 기준 먼저 세우기", "2. 이사 폐기물 처리에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-waste-disposal-cost",
    title: "이사 폐기물 처리 초보자가 보는 종량제봉투",
    excerpt: "이사 폐기물 처리를 판단할 때 종량제봉투만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "cost-saving",
    keywords: ["이사 폐기물 처리", "종량제봉투", "대형폐기물", "재활용 요일", "수거 예약"],
    sections: ["1. 이사 폐기물 처리 총비용 나누기", "2. 종량제봉투에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-waste-disposal-mistake",
    title: "이사 폐기물 처리 보류 신호와 재활용 요일",
    excerpt: "이사 폐기물 처리를 판단할 때 재활용 요일만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "mistake-proof",
    keywords: ["이사 폐기물 처리", "재활용 요일", "대형폐기물", "종량제봉투", "수거 예약"],
    sections: ["1. 재활용 요일에서 생기는 착각", "2. 이사 폐기물 처리을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-waste-disposal-compare",
    title: "이사 폐기물 처리 서류·사진 수거 예약 정리",
    excerpt: "이사 폐기물 처리를 판단할 때 수거 예약만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "comparison",
    keywords: ["이사 폐기물 처리", "수거 예약", "대형폐기물", "종량제봉투", "재활용 요일"],
    sections: ["1. 이사 폐기물 처리 선택지 나누기", "2. 수거 예약 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-waste-disposal-faq",
    title: "이사 폐기물 처리 한 달 뒤 보는 상황별 기준",
    excerpt: "이사 폐기물 처리를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "faq",
    keywords: ["이사 폐기물 처리", "상황별 기준", "대형폐기물", "종량제봉투", "재활용 요일"],
    sections: ["1. 이사 폐기물 처리에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  }
];

export const blogExpansionBatch27 = createQualityExpansionPosts(seeds);

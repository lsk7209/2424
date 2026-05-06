import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "move-cleaning-check-checklist",
    title: "입주청소 점검 빠뜨리기 쉬운 청소 범위",
    excerpt: "입주청소 점검를 판단할 때 청소 범위만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "checklist",
    keywords: ["입주청소 점검", "청소 범위", "하자 사진", "곰팡이 확인", "환불 기준"],
    sections: ["1. 청소 범위 기준 먼저 세우기", "2. 입주청소 점검에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "move-cleaning-check-cost",
    title: "입주청소 점검 초보자가 보는 하자 사진",
    excerpt: "입주청소 점검를 판단할 때 하자 사진만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "cost-saving",
    keywords: ["입주청소 점검", "하자 사진", "청소 범위", "곰팡이 확인", "환불 기준"],
    sections: ["1. 입주청소 점검 총비용 나누기", "2. 하자 사진에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "move-cleaning-check-mistake",
    title: "입주청소 점검 보류 신호와 곰팡이 확인",
    excerpt: "입주청소 점검를 판단할 때 곰팡이 확인만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "mistake-proof",
    keywords: ["입주청소 점검", "곰팡이 확인", "청소 범위", "하자 사진", "환불 기준"],
    sections: ["1. 곰팡이 확인에서 생기는 착각", "2. 입주청소 점검을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "move-cleaning-check-compare",
    title: "입주청소 점검 서류·사진 환불 기준 정리",
    excerpt: "입주청소 점검를 판단할 때 환불 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "comparison",
    keywords: ["입주청소 점검", "환불 기준", "청소 범위", "하자 사진", "곰팡이 확인"],
    sections: ["1. 입주청소 점검 선택지 나누기", "2. 환불 기준 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "move-cleaning-check-faq",
    title: "입주청소 점검 한 달 뒤 보는 상황별 기준",
    excerpt: "입주청소 점검를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "faq",
    keywords: ["입주청소 점검", "상황별 기준", "청소 범위", "하자 사진", "곰팡이 확인"],
    sections: ["1. 입주청소 점검에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch23 = createQualityExpansionPosts(seeds);

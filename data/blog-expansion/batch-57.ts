import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-kitchen-organize-checklist",
    title: "원룸 주방 정리, 싱크대 수납 먼저 보는 법",
    excerpt: "원룸 주방 정리를 판단할 때 싱크대 수납만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["원룸 주방 정리", "싱크대 수납", "냄새 관리", "조리도구", "분리수거"],
    sections: ["1. 싱크대 수납 기준 먼저 세우기", "2. 원룸 주방 정리에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-kitchen-organize-cost",
    title: "원룸 주방 정리 비용 줄이는 냄새 관리 기준",
    excerpt: "원룸 주방 정리를 판단할 때 냄새 관리만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["원룸 주방 정리", "냄새 관리", "싱크대 수납", "조리도구", "분리수거"],
    sections: ["1. 원룸 주방 정리 총비용 나누기", "2. 냄새 관리에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-kitchen-organize-mistake",
    title: "원룸 주방 정리 실수 막는 조리도구 순서",
    excerpt: "원룸 주방 정리를 판단할 때 조리도구만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["원룸 주방 정리", "조리도구", "싱크대 수납", "냄새 관리", "분리수거"],
    sections: ["1. 조리도구에서 생기는 착각", "2. 원룸 주방 정리을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-kitchen-organize-compare",
    title: "원룸 주방 정리 비교할 때 분리수거부터",
    excerpt: "원룸 주방 정리를 판단할 때 분리수거만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["원룸 주방 정리", "분리수거", "싱크대 수납", "냄새 관리", "조리도구"],
    sections: ["1. 원룸 주방 정리 선택지 나누기", "2. 분리수거 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-kitchen-organize-faq",
    title: "원룸 주방 정리 FAQ, 상황별 기준 핵심 답변",
    excerpt: "원룸 주방 정리를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["원룸 주방 정리", "상황별 기준", "싱크대 수납", "냄새 관리", "조리도구"],
    sections: ["1. 원룸 주방 정리에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch57 = createQualityExpansionPosts(seeds);

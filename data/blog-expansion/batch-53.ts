import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-small-storage-checklist",
    title: "원룸 수납 배치, 침대 밑부터 보기",
    excerpt: "원룸 수납 배치를 판단할 때 침대 밑 수납만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["원룸 수납 배치", "침대 밑 수납", "벽선반", "동선 확보", "계절짐"],
    sections: ["1. 침대 밑 수납 기준 먼저 세우기", "2. 원룸 수납 배치에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-small-storage-cost",
    title: "원룸 수납 배치 비용 줄이는 벽선반 기준",
    excerpt: "원룸 수납 배치를 판단할 때 벽선반만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["원룸 수납 배치", "벽선반", "침대 밑 수납", "동선 확보", "계절짐"],
    sections: ["1. 원룸 수납 배치 총비용 나누기", "2. 벽선반에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-small-storage-mistake",
    title: "원룸 수납 배치 실수 막는 동선 확보 순서",
    excerpt: "원룸 수납 배치를 판단할 때 동선 확보만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["원룸 수납 배치", "동선 확보", "침대 밑 수납", "벽선반", "계절짐"],
    sections: ["1. 동선 확보에서 생기는 착각", "2. 원룸 수납 배치을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-small-storage-compare",
    title: "원룸 수납 배치 비교할 때 계절짐부터",
    excerpt: "원룸 수납 배치를 판단할 때 계절짐만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["원룸 수납 배치", "계절짐", "침대 밑 수납", "벽선반", "동선 확보"],
    sections: ["1. 원룸 수납 배치 선택지 나누기", "2. 계절짐 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-small-storage-faq",
    title: "원룸 수납 배치 FAQ, 상황별 기준 핵심 답변",
    excerpt: "원룸 수납 배치를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["원룸 수납 배치", "상황별 기준", "침대 밑 수납", "벽선반", "동선 확보"],
    sections: ["1. 원룸 수납 배치에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch53 = createQualityExpansionPosts(seeds);

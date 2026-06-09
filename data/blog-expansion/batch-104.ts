import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-bed-under-storage-checklist",
    title: "침대 밑 수납: 습기부터 보는 순서",
    excerpt: "침대 밑 수납은 습기를 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 먼지와 계절 물건까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["침대 밑 수납", "습기", "먼지", "계절 물건", "꺼내기 쉬움"],
    sections: ["습기 기준을 먼저 적기", "침대 밑 수납에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide/studio-storage-planning-guide", label: "수납 배치 보기" },
  },
  {
    slug: "interior-bed-under-storage-cost",
    title: "침대 밑 수납 비용 아끼는 먼지 질문",
    excerpt: "침대 밑 수납에서 비용이 커지는 지점은 대개 먼지를 늦게 묻는 순간입니다. 먼지, 계절 물건을 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["침대 밑 수납", "먼지", "습기", "계절 물건", "꺼내기 쉬움"],
    sections: ["침대 밑 수납 총비용을 나누기", "먼지에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide/studio-storage-planning-guide", label: "수납 배치 보기" },
  },
  {
    slug: "interior-bed-under-storage-mistake",
    title: "침대 밑 수납에서 놓치기 쉬운 계절 물건",
    excerpt: "침대 밑 수납은 계절 물건만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 먼지와 계절 물건을 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["침대 밑 수납", "계절 물건", "습기", "먼지", "꺼내기 쉬움"],
    sections: ["계절 물건에서 자주 생기는 착각", "침대 밑 수납을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide/studio-storage-planning-guide", label: "수납 배치 보기" },
  },
  {
    slug: "interior-bed-under-storage-compare",
    title: "침대 밑 수납 비교 전 보는 꺼내기 쉬움",
    excerpt: "침대 밑 수납을 비교할 때는 꺼내기 쉬움 하나로 판단하지 않는 편이 안전합니다. 먼지, 계절 물건, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["침대 밑 수납", "꺼내기 쉬움", "습기", "먼지", "계절 물건"],
    sections: ["침대 밑 수납 선택지를 나누기", "꺼내기 쉬움 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/guide/studio-storage-planning-guide", label: "수납 배치 보기" },
  },
  {
    slug: "interior-bed-under-storage-faq",
    title: "침대 밑 수납 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "침대 밑 수납을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 먼지와 계절 물건까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["침대 밑 수납", "상황별 기준", "습기", "먼지", "계절 물건"],
    sections: ["침대 밑 수납에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/guide/studio-storage-planning-guide", label: "수납 배치 보기" },
  }
];

export const blogExpansionBatch104 = createQualityExpansionPosts(seeds);

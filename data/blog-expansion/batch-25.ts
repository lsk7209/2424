import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "move-packing-order-checklist",
    title: "이삿짐 포장 순서, 깨지기 쉬운 짐 먼저 보는 법",
    excerpt: "이삿짐 포장 순서를 판단할 때 깨지기 쉬운 짐만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "checklist",
    keywords: ["이삿짐 포장 순서", "깨지기 쉬운 짐", "첫날 박스", "라벨링", "분실 방지"],
    sections: ["1. 깨지기 쉬운 짐 기준 먼저 세우기", "2. 이삿짐 포장 순서에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-packing-order-cost",
    title: "이삿짐 포장 순서 비용 줄이는 첫날 박스 기준",
    excerpt: "이삿짐 포장 순서를 판단할 때 첫날 박스만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "cost-saving",
    keywords: ["이삿짐 포장 순서", "첫날 박스", "깨지기 쉬운 짐", "라벨링", "분실 방지"],
    sections: ["1. 이삿짐 포장 순서 총비용 나누기", "2. 첫날 박스에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-packing-order-mistake",
    title: "이삿짐 포장 라벨링 실수 막는 순서",
    excerpt: "이삿짐 포장 순서를 판단할 때 라벨링만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "mistake-proof",
    keywords: ["이삿짐 포장 순서", "라벨링", "깨지기 쉬운 짐", "첫날 박스", "분실 방지"],
    sections: ["1. 라벨링에서 생기는 착각", "2. 이삿짐 포장 순서을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-packing-order-compare",
    title: "이삿짐 포장 순서 비교할 때 분실 방지부터",
    excerpt: "이삿짐 포장 순서를 판단할 때 분실 방지만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "comparison",
    keywords: ["이삿짐 포장 순서", "분실 방지", "깨지기 쉬운 짐", "첫날 박스", "라벨링"],
    sections: ["1. 이삿짐 포장 순서 선택지 나누기", "2. 분실 방지 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-packing-order-faq",
    title: "이삿짐 포장 순서 FAQ, 상황별 기준 핵심 답변",
    excerpt: "이삿짐 포장 순서를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "faq",
    keywords: ["이삿짐 포장 순서", "상황별 기준", "깨지기 쉬운 짐", "첫날 박스", "라벨링"],
    sections: ["1. 이삿짐 포장 순서에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  }
];

export const blogExpansionBatch25 = createQualityExpansionPosts(seeds);

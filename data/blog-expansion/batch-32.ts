import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-contract-special-checklist",
    title: "전세 특약 문구 후회 줄이는 대출 불가",
    excerpt: "전세 특약 문구를 판단할 때 대출 불가만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["전세 특약 문구", "대출 불가", "권리변동 금지", "체납 확인", "보증보험 불가"],
    sections: ["1. 대출 불가 기준 먼저 세우기", "2. 전세 특약 문구에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "계약서 가이드 보기" },
  },
  {
    slug: "jeonse-contract-special-cost",
    title: "전세 특약 문구 좋은 조건 권리변동 금지 판별",
    excerpt: "전세 특약 문구를 판단할 때 권리변동 금지만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["전세 특약 문구", "권리변동 금지", "대출 불가", "체납 확인", "보증보험 불가"],
    sections: ["1. 전세 특약 문구 총비용 나누기", "2. 권리변동 금지에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "계약서 가이드 보기" },
  },
  {
    slug: "jeonse-contract-special-mistake",
    title: "전세 특약 문구 숨은 비용 체납 확인 찾기",
    excerpt: "전세 특약 문구를 판단할 때 체납 확인만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["전세 특약 문구", "체납 확인", "대출 불가", "권리변동 금지", "보증보험 불가"],
    sections: ["1. 체납 확인에서 생기는 착각", "2. 전세 특약 문구을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "계약서 가이드 보기" },
  },
  {
    slug: "jeonse-contract-special-compare",
    title: "전세 특약 문구 바로 묻는 보증보험 불가 질문",
    excerpt: "전세 특약 문구를 판단할 때 보증보험 불가만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["전세 특약 문구", "보증보험 불가", "대출 불가", "권리변동 금지", "체납 확인"],
    sections: ["1. 전세 특약 문구 선택지 나누기", "2. 보증보험 불가 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "계약서 가이드 보기" },
  },
  {
    slug: "jeonse-contract-special-faq",
    title: "전세 특약 문구 마지막 점검 상황별 기준",
    excerpt: "전세 특약 문구를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["전세 특약 문구", "상황별 기준", "대출 불가", "권리변동 금지", "체납 확인"],
    sections: ["1. 전세 특약 문구에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "계약서 가이드 보기" },
  }
];

export const blogExpansionBatch32 = createQualityExpansionPosts(seeds);

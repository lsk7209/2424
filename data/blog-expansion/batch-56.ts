import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-rental-safe-checklist",
    title: "월세집 인테리어 후회 줄이는 무타공 선반",
    excerpt: "월세집 인테리어를 판단할 때 무타공 선반만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["월세집 인테리어", "무타공 선반", "원상복구", "접착 후크", "계약 특약"],
    sections: ["1. 무타공 선반 기준 먼저 세우기", "2. 월세집 인테리어에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-rental-safe-cost",
    title: "월세집 인테리어 좋은 조건 원상복구 판별",
    excerpt: "월세집 인테리어를 판단할 때 원상복구만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["월세집 인테리어", "원상복구", "무타공 선반", "접착 후크", "계약 특약"],
    sections: ["1. 월세집 인테리어 총비용 나누기", "2. 원상복구에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-rental-safe-mistake",
    title: "월세집 인테리어 숨은 비용 접착 후크 찾기",
    excerpt: "월세집 인테리어를 판단할 때 접착 후크만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["월세집 인테리어", "접착 후크", "무타공 선반", "원상복구", "계약 특약"],
    sections: ["1. 접착 후크에서 생기는 착각", "2. 월세집 인테리어을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-rental-safe-compare",
    title: "월세집 인테리어 바로 묻는 계약 특약 질문",
    excerpt: "월세집 인테리어를 판단할 때 계약 특약만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["월세집 인테리어", "계약 특약", "무타공 선반", "원상복구", "접착 후크"],
    sections: ["1. 월세집 인테리어 선택지 나누기", "2. 계약 특약 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-rental-safe-faq",
    title: "월세집 인테리어 마지막 점검 상황별 기준",
    excerpt: "월세집 인테리어를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["월세집 인테리어", "상황별 기준", "무타공 선반", "원상복구", "접착 후크"],
    sections: ["1. 월세집 인테리어에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch56 = createQualityExpansionPosts(seeds);

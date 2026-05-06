import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-brokerage-fee-checklist",
    title: "중개수수료 절약, 요율표 먼저 보는 법",
    excerpt: "중개수수료 절약를 판단할 때 요율표만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["중개수수료 절약", "요율표", "상한요율", "월세 환산", "현금영수증"],
    sections: ["1. 요율표 기준 먼저 세우기", "2. 중개수수료 절약에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "saving-brokerage-fee-cost",
    title: "중개수수료 절약 비용 줄이는 상한요율 기준",
    excerpt: "중개수수료 절약를 판단할 때 상한요율만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["중개수수료 절약", "상한요율", "요율표", "월세 환산", "현금영수증"],
    sections: ["1. 중개수수료 절약 총비용 나누기", "2. 상한요율에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "saving-brokerage-fee-mistake",
    title: "중개수수료 절약 실수 막는 월세 환산 순서",
    excerpt: "중개수수료 절약를 판단할 때 월세 환산만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["중개수수료 절약", "월세 환산", "요율표", "상한요율", "현금영수증"],
    sections: ["1. 월세 환산에서 생기는 착각", "2. 중개수수료 절약을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "saving-brokerage-fee-compare",
    title: "중개수수료 절약 비교할 때 현금영수증부터",
    excerpt: "중개수수료 절약를 판단할 때 현금영수증만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["중개수수료 절약", "현금영수증", "요율표", "상한요율", "월세 환산"],
    sections: ["1. 중개수수료 절약 선택지 나누기", "2. 현금영수증 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "saving-brokerage-fee-faq",
    title: "중개수수료 절약 FAQ, 상황별 기준 핵심 답변",
    excerpt: "중개수수료 절약를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["중개수수료 절약", "상황별 기준", "요율표", "상한요율", "월세 환산"],
    sections: ["1. 중개수수료 절약에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  }
];

export const blogExpansionBatch49 = createQualityExpansionPosts(seeds);

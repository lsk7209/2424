import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-subscription-cleanup-checklist",
    title: "자취 구독비 정리 후회 줄이는 인터넷",
    excerpt: "자취 구독비 정리를 판단할 때 인터넷만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["자취 구독비 정리", "인터넷", "OTT", "정기배송", "자동결제"],
    sections: ["1. 인터넷 기준 먼저 세우기", "2. 자취 구독비 정리에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-subscription-cleanup-cost",
    title: "자취 구독비 정리 좋은 조건 OTT 판별",
    excerpt: "자취 구독비 정리를 판단할 때 OTT만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["자취 구독비 정리", "OTT", "인터넷", "정기배송", "자동결제"],
    sections: ["1. 자취 구독비 정리 총비용 나누기", "2. OTT에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-subscription-cleanup-mistake",
    title: "자취 구독비 정리 숨은 비용 정기배송 찾기",
    excerpt: "자취 구독비 정리를 판단할 때 정기배송만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["자취 구독비 정리", "정기배송", "인터넷", "OTT", "자동결제"],
    sections: ["1. 정기배송에서 생기는 착각", "2. 자취 구독비 정리을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-subscription-cleanup-compare",
    title: "자취 구독비 정리 바로 묻는 자동결제 질문",
    excerpt: "자취 구독비 정리를 판단할 때 자동결제만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["자취 구독비 정리", "자동결제", "인터넷", "OTT", "정기배송"],
    sections: ["1. 자취 구독비 정리 선택지 나누기", "2. 자동결제 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-subscription-cleanup-faq",
    title: "자취 구독비 정리 마지막 점검 상황별 기준",
    excerpt: "자취 구독비 정리를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["자취 구독비 정리", "상황별 기준", "인터넷", "OTT", "정기배송"],
    sections: ["1. 자취 구독비 정리에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  }
];

export const blogExpansionBatch52 = createQualityExpansionPosts(seeds);

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-option-appliance-buy-checklist",
    title: "옵션 가전 구매 판단: 중고 구매부터 보는 순서",
    excerpt: "옵션 가전 구매 판단은 중고 구매를 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 수리 비용과 퇴실 원상복구까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["옵션 가전 구매 판단", "중고 구매", "수리 비용", "퇴실 원상복구", "보증 기간"],
    sections: ["중고 구매 기준을 먼저 적기", "옵션 가전 구매 판단에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide/appliance-inspection-form-guide", label: "가전 점검표 보기" },
  },
  {
    slug: "saving-option-appliance-buy-cost",
    title: "옵션 가전 구매 판단 비용 아끼는 수리 비용 질문",
    excerpt: "옵션 가전 구매 판단에서 비용이 커지는 지점은 대개 수리 비용을 늦게 묻는 순간입니다. 수리 비용, 퇴실 원상복구를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["옵션 가전 구매 판단", "수리 비용", "중고 구매", "퇴실 원상복구", "보증 기간"],
    sections: ["옵션 가전 구매 판단 총비용을 나누기", "수리 비용에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide/appliance-inspection-form-guide", label: "가전 점검표 보기" },
  },
  {
    slug: "saving-option-appliance-buy-mistake",
    title: "옵션 가전 구매 판단에서 놓치기 쉬운 퇴실 원상복구",
    excerpt: "옵션 가전 구매 판단은 퇴실 원상복구만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 수리 비용과 퇴실 원상복구를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["옵션 가전 구매 판단", "퇴실 원상복구", "중고 구매", "수리 비용", "보증 기간"],
    sections: ["퇴실 원상복구에서 자주 생기는 착각", "옵션 가전 구매 판단을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide/appliance-inspection-form-guide", label: "가전 점검표 보기" },
  },
  {
    slug: "saving-option-appliance-buy-compare",
    title: "옵션 가전 구매 판단 비교 전 보는 보증 기간",
    excerpt: "옵션 가전 구매 판단을 비교할 때는 보증 기간 하나로 판단하지 않는 편이 안전합니다. 수리 비용, 퇴실 원상복구, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["옵션 가전 구매 판단", "보증 기간", "중고 구매", "수리 비용", "퇴실 원상복구"],
    sections: ["옵션 가전 구매 판단 선택지를 나누기", "보증 기간 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/guide/appliance-inspection-form-guide", label: "가전 점검표 보기" },
  },
  {
    slug: "saving-option-appliance-buy-faq",
    title: "옵션 가전 구매 판단 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "옵션 가전 구매 판단을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 수리 비용과 퇴실 원상복구까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["옵션 가전 구매 판단", "상황별 기준", "중고 구매", "수리 비용", "퇴실 원상복구"],
    sections: ["옵션 가전 구매 판단에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/guide/appliance-inspection-form-guide", label: "가전 점검표 보기" },
  }
];

export const blogExpansionBatch95 = createQualityExpansionPosts(seeds);

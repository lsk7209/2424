import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-broker-fee-receipt-checklist",
    title: "중개보수 영수증 관리: 상한요율부터 보는 순서",
    excerpt: "중개보수 영수증 관리는 상한요율을 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 현금영수증과 계약 유형까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["중개보수 영수증 관리", "상한요율", "현금영수증", "계약 유형", "추가 수수료"],
    sections: ["상한요율 기준을 먼저 적기", "중개보수 영수증 관리에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개보수 계산 보기" },
  },
  {
    slug: "saving-broker-fee-receipt-cost",
    title: "중개보수 영수증 관리 비용 아끼는 현금영수증 질문",
    excerpt: "중개보수 영수증 관리에서 비용이 커지는 지점은 대개 현금영수증을 늦게 묻는 순간입니다. 현금영수증, 계약 유형을 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["중개보수 영수증 관리", "현금영수증", "상한요율", "계약 유형", "추가 수수료"],
    sections: ["중개보수 영수증 관리 총비용을 나누기", "현금영수증에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개보수 계산 보기" },
  },
  {
    slug: "saving-broker-fee-receipt-mistake",
    title: "중개보수 영수증 관리에서 놓치기 쉬운 계약 유형",
    excerpt: "중개보수 영수증 관리는 계약 유형만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 현금영수증과 계약 유형을 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["중개보수 영수증 관리", "계약 유형", "상한요율", "현금영수증", "추가 수수료"],
    sections: ["계약 유형에서 자주 생기는 착각", "중개보수 영수증 관리을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개보수 계산 보기" },
  },
  {
    slug: "saving-broker-fee-receipt-compare",
    title: "중개보수 영수증 관리 비교 전 보는 추가 수수료",
    excerpt: "중개보수 영수증 관리를 비교할 때는 추가 수수료 하나로 판단하지 않는 편이 안전합니다. 현금영수증, 계약 유형, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["중개보수 영수증 관리", "추가 수수료", "상한요율", "현금영수증", "계약 유형"],
    sections: ["중개보수 영수증 관리 선택지를 나누기", "추가 수수료 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개보수 계산 보기" },
  },
  {
    slug: "saving-broker-fee-receipt-faq",
    title: "중개보수 영수증 관리 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "중개보수 영수증 관리를 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 현금영수증과 계약 유형까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["중개보수 영수증 관리", "상황별 기준", "상한요율", "현금영수증", "계약 유형"],
    sections: ["중개보수 영수증 관리에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개보수 계산 보기" },
  }
];

export const blogExpansionBatch100 = createQualityExpansionPosts(seeds);

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-deposit-interest-loss-checklist",
    title: "보증금 이자 기회비용: 월세 전환부터 보는 순서",
    excerpt: "보증금 이자 기회비용은 월세 전환을 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 예금 이자와 관리비 포함까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["보증금 이자 기회비용", "월세 전환", "예금 이자", "관리비 포함", "총 주거비"],
    sections: ["월세 전환 기준을 먼저 적기", "보증금 이자 기회비용에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "전월세 전환 계산 보기" },
  },
  {
    slug: "saving-deposit-interest-loss-cost",
    title: "보증금 이자 기회비용 비용 아끼는 예금 이자 질문",
    excerpt: "보증금 이자 기회비용에서 비용이 커지는 지점은 대개 예금 이자를 늦게 묻는 순간입니다. 예금 이자, 관리비 포함을 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["보증금 이자 기회비용", "예금 이자", "월세 전환", "관리비 포함", "총 주거비"],
    sections: ["보증금 이자 기회비용 총비용을 나누기", "예금 이자에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "전월세 전환 계산 보기" },
  },
  {
    slug: "saving-deposit-interest-loss-mistake",
    title: "보증금 이자 기회비용에서 놓치기 쉬운 관리비 포함",
    excerpt: "보증금 이자 기회비용은 관리비 포함만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 예금 이자와 관리비 포함을 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["보증금 이자 기회비용", "관리비 포함", "월세 전환", "예금 이자", "총 주거비"],
    sections: ["관리비 포함에서 자주 생기는 착각", "보증금 이자 기회비용을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "전월세 전환 계산 보기" },
  },
  {
    slug: "saving-deposit-interest-loss-compare",
    title: "보증금 이자 기회비용 비교 전 보는 총 주거비",
    excerpt: "보증금 이자 기회비용을 비교할 때는 총 주거비 하나로 판단하지 않는 편이 안전합니다. 예금 이자, 관리비 포함, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["보증금 이자 기회비용", "총 주거비", "월세 전환", "예금 이자", "관리비 포함"],
    sections: ["보증금 이자 기회비용 선택지를 나누기", "총 주거비 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "전월세 전환 계산 보기" },
  },
  {
    slug: "saving-deposit-interest-loss-faq",
    title: "보증금 이자 기회비용 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "보증금 이자 기회비용을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 예금 이자와 관리비 포함까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["보증금 이자 기회비용", "상황별 기준", "월세 전환", "예금 이자", "관리비 포함"],
    sections: ["보증금 이자 기회비용에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "전월세 전환 계산 보기" },
  }
];

export const blogExpansionBatch96 = createQualityExpansionPosts(seeds);

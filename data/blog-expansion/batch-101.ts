import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-wall-damage-proof-checklist",
    title: "벽 손상 없는 꾸미기: 무타공 선반부터 보는 순서",
    excerpt: "벽 손상 없는 꾸미기는 무타공 선반을 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 접착 후크와 원상복구까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["벽 손상 없는 꾸미기", "무타공 선반", "접착 후크", "원상복구", "퇴실 사진"],
    sections: ["무타공 선반 기준을 먼저 적기", "벽 손상 없는 꾸미기에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide/room-photo-shot-list-guide", label: "퇴실 사진 가이드 보기" },
  },
  {
    slug: "interior-wall-damage-proof-cost",
    title: "벽 손상 없는 꾸미기 비용 아끼는 접착 후크 질문",
    excerpt: "벽 손상 없는 꾸미기에서 비용이 커지는 지점은 대개 접착 후크를 늦게 묻는 순간입니다. 접착 후크, 원상복구를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["벽 손상 없는 꾸미기", "접착 후크", "무타공 선반", "원상복구", "퇴실 사진"],
    sections: ["벽 손상 없는 꾸미기 총비용을 나누기", "접착 후크에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide/room-photo-shot-list-guide", label: "퇴실 사진 가이드 보기" },
  },
  {
    slug: "interior-wall-damage-proof-mistake",
    title: "벽 손상 없는 꾸미기에서 놓치기 쉬운 원상복구",
    excerpt: "벽 손상 없는 꾸미기는 원상복구만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 접착 후크와 원상복구를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["벽 손상 없는 꾸미기", "원상복구", "무타공 선반", "접착 후크", "퇴실 사진"],
    sections: ["원상복구에서 자주 생기는 착각", "벽 손상 없는 꾸미기을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide/room-photo-shot-list-guide", label: "퇴실 사진 가이드 보기" },
  },
  {
    slug: "interior-wall-damage-proof-compare",
    title: "벽 손상 없는 꾸미기 비교 전 보는 퇴실 사진",
    excerpt: "벽 손상 없는 꾸미기를 비교할 때는 퇴실 사진 하나로 판단하지 않는 편이 안전합니다. 접착 후크, 원상복구, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["벽 손상 없는 꾸미기", "퇴실 사진", "무타공 선반", "접착 후크", "원상복구"],
    sections: ["벽 손상 없는 꾸미기 선택지를 나누기", "퇴실 사진 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/guide/room-photo-shot-list-guide", label: "퇴실 사진 가이드 보기" },
  },
  {
    slug: "interior-wall-damage-proof-faq",
    title: "벽 손상 없는 꾸미기 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "벽 손상 없는 꾸미기를 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 접착 후크와 원상복구까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["벽 손상 없는 꾸미기", "상황별 기준", "무타공 선반", "접착 후크", "원상복구"],
    sections: ["벽 손상 없는 꾸미기에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/guide/room-photo-shot-list-guide", label: "퇴실 사진 가이드 보기" },
  }
];

export const blogExpansionBatch101 = createQualityExpansionPosts(seeds);

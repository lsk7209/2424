import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-cable-line-clean-checklist",
    title: "케이블 정리 동선: 멀티탭 위치부터 보는 순서",
    excerpt: "케이블 정리 동선은 멀티탭 위치를 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 화재 예방과 청소 편의까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["케이블 정리 동선", "멀티탭 위치", "화재 예방", "청소 편의", "책상 배치"],
    sections: ["멀티탭 위치 기준을 먼저 적기", "케이블 정리 동선에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "방 정리 가이드 보기" },
  },
  {
    slug: "interior-cable-line-clean-cost",
    title: "케이블 정리 동선 비용 아끼는 화재 예방 질문",
    excerpt: "케이블 정리 동선에서 비용이 커지는 지점은 대개 화재 예방을 늦게 묻는 순간입니다. 화재 예방, 청소 편의를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["케이블 정리 동선", "화재 예방", "멀티탭 위치", "청소 편의", "책상 배치"],
    sections: ["케이블 정리 동선 총비용을 나누기", "화재 예방에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "방 정리 가이드 보기" },
  },
  {
    slug: "interior-cable-line-clean-mistake",
    title: "케이블 정리 동선에서 놓치기 쉬운 청소 편의",
    excerpt: "케이블 정리 동선은 청소 편의만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 화재 예방과 청소 편의를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["케이블 정리 동선", "청소 편의", "멀티탭 위치", "화재 예방", "책상 배치"],
    sections: ["청소 편의에서 자주 생기는 착각", "케이블 정리 동선을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "방 정리 가이드 보기" },
  },
  {
    slug: "interior-cable-line-clean-compare",
    title: "케이블 정리 동선 비교 전 보는 책상 배치",
    excerpt: "케이블 정리 동선을 비교할 때는 책상 배치 하나로 판단하지 않는 편이 안전합니다. 화재 예방, 청소 편의, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["케이블 정리 동선", "책상 배치", "멀티탭 위치", "화재 예방", "청소 편의"],
    sections: ["케이블 정리 동선 선택지를 나누기", "책상 배치 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "방 정리 가이드 보기" },
  },
  {
    slug: "interior-cable-line-clean-faq",
    title: "케이블 정리 동선 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "케이블 정리 동선을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 화재 예방과 청소 편의까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["케이블 정리 동선", "상황별 기준", "멀티탭 위치", "화재 예방", "청소 편의"],
    sections: ["케이블 정리 동선에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "방 정리 가이드 보기" },
  }
];

export const blogExpansionBatch103 = createQualityExpansionPosts(seeds);

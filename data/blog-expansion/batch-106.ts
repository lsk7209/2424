import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-rental-lighting-safe-checklist",
    title: "월세집 조명 교체: 원상복구부터 보는 순서",
    excerpt: "월세집 조명 교체는 원상복구를 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 전구 규격과 밝기까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["월세집 조명 교체", "원상복구", "전구 규격", "밝기", "전기 안전"],
    sections: ["원상복구 기준을 먼저 적기", "월세집 조명 교체에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "조명 분위기 보기" },
  },
  {
    slug: "interior-rental-lighting-safe-cost",
    title: "월세집 조명 교체 비용 아끼는 전구 규격 질문",
    excerpt: "월세집 조명 교체에서 비용이 커지는 지점은 대개 전구 규격을 늦게 묻는 순간입니다. 전구 규격, 밝기를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["월세집 조명 교체", "전구 규격", "원상복구", "밝기", "전기 안전"],
    sections: ["월세집 조명 교체 총비용을 나누기", "전구 규격에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "조명 분위기 보기" },
  },
  {
    slug: "interior-rental-lighting-safe-mistake",
    title: "월세집 조명 교체에서 놓치기 쉬운 밝기",
    excerpt: "월세집 조명 교체는 밝기만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 전구 규격과 밝기를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["월세집 조명 교체", "밝기", "원상복구", "전구 규격", "전기 안전"],
    sections: ["밝기에서 자주 생기는 착각", "월세집 조명 교체을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "조명 분위기 보기" },
  },
  {
    slug: "interior-rental-lighting-safe-compare",
    title: "월세집 조명 교체 비교 전 보는 전기 안전",
    excerpt: "월세집 조명 교체를 비교할 때는 전기 안전 하나로 판단하지 않는 편이 안전합니다. 전구 규격, 밝기, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["월세집 조명 교체", "전기 안전", "원상복구", "전구 규격", "밝기"],
    sections: ["월세집 조명 교체 선택지를 나누기", "전기 안전 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "조명 분위기 보기" },
  },
  {
    slug: "interior-rental-lighting-safe-faq",
    title: "월세집 조명 교체 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "월세집 조명 교체를 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 전구 규격과 밝기까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["월세집 조명 교체", "상황별 기준", "원상복구", "전구 규격", "밝기"],
    sections: ["월세집 조명 교체에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "조명 분위기 보기" },
  }
];

export const blogExpansionBatch106 = createQualityExpansionPosts(seeds);

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-curtain-light-block-checklist",
    title: "커튼 암막 선택: 창문 방향부터 보는 순서",
    excerpt: "커튼 암막 선택은 창문 방향을 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 채광과 냉난방비까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["커튼 암막 선택", "창문 방향", "채광", "냉난방비", "설치 방식"],
    sections: ["창문 방향 기준을 먼저 적기", "커튼 암막 선택에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "interior-curtain-light-block-cost",
    title: "커튼 암막 선택 비용 아끼는 채광 질문",
    excerpt: "커튼 암막 선택에서 비용이 커지는 지점은 대개 채광을 늦게 묻는 순간입니다. 채광, 냉난방비를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["커튼 암막 선택", "채광", "창문 방향", "냉난방비", "설치 방식"],
    sections: ["커튼 암막 선택 총비용을 나누기", "채광에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "interior-curtain-light-block-mistake",
    title: "커튼 암막 선택에서 놓치기 쉬운 냉난방비",
    excerpt: "커튼 암막 선택은 냉난방비만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 채광과 냉난방비를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["커튼 암막 선택", "냉난방비", "창문 방향", "채광", "설치 방식"],
    sections: ["냉난방비에서 자주 생기는 착각", "커튼 암막 선택을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "interior-curtain-light-block-compare",
    title: "커튼 암막 선택 비교 전 보는 설치 방식",
    excerpt: "커튼 암막 선택을 비교할 때는 설치 방식 하나로 판단하지 않는 편이 안전합니다. 채광, 냉난방비, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["커튼 암막 선택", "설치 방식", "창문 방향", "채광", "냉난방비"],
    sections: ["커튼 암막 선택 선택지를 나누기", "설치 방식 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "interior-curtain-light-block-faq",
    title: "커튼 암막 선택 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "커튼 암막 선택을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 채광과 냉난방비까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["커튼 암막 선택", "상황별 기준", "창문 방향", "채광", "냉난방비"],
    sections: ["커튼 암막 선택에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  }
];

export const blogExpansionBatch102 = createQualityExpansionPosts(seeds);

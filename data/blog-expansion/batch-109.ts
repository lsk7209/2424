import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-laundry-drying-zone-checklist",
    title: "빨래 건조 공간: 제습기부터 보는 순서",
    excerpt: "빨래 건조 공간은 제습기를 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 창문과 동선 방해까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["빨래 건조 공간", "제습기", "창문", "동선 방해", "냄새 예방"],
    sections: ["제습기 기준을 먼저 적기", "빨래 건조 공간에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/blog/balcony-free-laundry-rack-plan", label: "빨래 건조대 배치 보기" },
  },
  {
    slug: "interior-laundry-drying-zone-cost",
    title: "빨래 건조 공간 비용 아끼는 창문 질문",
    excerpt: "빨래 건조 공간에서 비용이 커지는 지점은 대개 창문을 늦게 묻는 순간입니다. 창문, 동선 방해를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["빨래 건조 공간", "창문", "제습기", "동선 방해", "냄새 예방"],
    sections: ["빨래 건조 공간 총비용을 나누기", "창문에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/blog/balcony-free-laundry-rack-plan", label: "빨래 건조대 배치 보기" },
  },
  {
    slug: "interior-laundry-drying-zone-mistake",
    title: "빨래 건조 공간에서 놓치기 쉬운 동선 방해",
    excerpt: "빨래 건조 공간은 동선 방해만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 창문과 동선 방해를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["빨래 건조 공간", "동선 방해", "제습기", "창문", "냄새 예방"],
    sections: ["동선 방해에서 자주 생기는 착각", "빨래 건조 공간을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/blog/balcony-free-laundry-rack-plan", label: "빨래 건조대 배치 보기" },
  },
  {
    slug: "interior-laundry-drying-zone-compare",
    title: "빨래 건조 공간 비교 전 보는 냄새 예방",
    excerpt: "빨래 건조 공간을 비교할 때는 냄새 예방 하나로 판단하지 않는 편이 안전합니다. 창문, 동선 방해, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["빨래 건조 공간", "냄새 예방", "제습기", "창문", "동선 방해"],
    sections: ["빨래 건조 공간 선택지를 나누기", "냄새 예방 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/blog/balcony-free-laundry-rack-plan", label: "빨래 건조대 배치 보기" },
  },
  {
    slug: "interior-laundry-drying-zone-faq",
    title: "빨래 건조 공간 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "빨래 건조 공간을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 창문과 동선 방해까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["빨래 건조 공간", "상황별 기준", "제습기", "창문", "동선 방해"],
    sections: ["빨래 건조 공간에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/blog/balcony-free-laundry-rack-plan", label: "빨래 건조대 배치 보기" },
  }
];

export const blogExpansionBatch109 = createQualityExpansionPosts(seeds);

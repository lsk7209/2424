import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "feng-sleep-light-noise-checklist",
    title: "수면 빛 소음 균형: 암막 커튼부터 보는 순서",
    excerpt: "수면 빛 소음 균형은 암막 커튼을 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. 소음원과 침대 위치까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.",
    category: "풍수지리",
    contentType: "checklist",
    keywords: ["수면 빛 소음 균형", "암막 커튼", "소음원", "침대 위치", "휴식 루틴"],
    sections: ["암막 커튼 기준을 먼저 적기", "수면 빛 소음 균형에서 기록해야 할 항목", "현장에서 바로 확인할 사진", "보류해야 하는 위험 신호", "오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "수면 공간 보기" },
  },
  {
    slug: "feng-sleep-light-noise-cost",
    title: "수면 빛 소음 균형 비용 아끼는 소음원 질문",
    excerpt: "수면 빛 소음 균형에서 비용이 커지는 지점은 대개 소음원을 늦게 묻는 순간입니다. 소음원, 침대 위치를 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.",
    category: "풍수지리",
    contentType: "cost-saving",
    keywords: ["수면 빛 소음 균형", "소음원", "암막 커튼", "침대 위치", "휴식 루틴"],
    sections: ["수면 빛 소음 균형 총비용을 나누기", "소음원에서 새는 돈 찾기", "줄이면 안 되는 비용 구분", "견적과 영수증 남기는 법", "다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "수면 공간 보기" },
  },
  {
    slug: "feng-sleep-light-noise-mistake",
    title: "수면 빛 소음 균형에서 놓치기 쉬운 침대 위치",
    excerpt: "수면 빛 소음 균형은 침대 위치만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. 소음원과 침대 위치를 기록으로 남기는 방식까지 함께 정리했습니다.",
    category: "풍수지리",
    contentType: "mistake-proof",
    keywords: ["수면 빛 소음 균형", "침대 위치", "암막 커튼", "소음원", "휴식 루틴"],
    sections: ["침대 위치에서 자주 생기는 착각", "수면 빛 소음 균형을 급하게 정하면 생기는 일", "문자와 사진으로 남길 내용", "나중에 다투기 쉬운 지점", "실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "수면 공간 보기" },
  },
  {
    slug: "feng-sleep-light-noise-compare",
    title: "수면 빛 소음 균형 비교 전 보는 휴식 루틴",
    excerpt: "수면 빛 소음 균형을 비교할 때는 휴식 루틴 하나로 판단하지 않는 편이 안전합니다. 소음원, 침대 위치, 생활 동선을 함께 보며 보류 신호를 가릅니다.",
    category: "풍수지리",
    contentType: "comparison",
    keywords: ["수면 빛 소음 균형", "휴식 루틴", "암막 커튼", "소음원", "침대 위치"],
    sections: ["수면 빛 소음 균형 선택지를 나누기", "휴식 루틴 기준으로 비교하기", "좋은 조건과 보류 조건", "생활 동선까지 함께 보기", "최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "수면 공간 보기" },
  },
  {
    slug: "feng-sleep-light-noise-faq",
    title: "수면 빛 소음 균형 FAQ: 상황별 기준에서 막히는 질문",
    excerpt: "수면 빛 소음 균형을 처음 확인할 때 자주 막히는 질문을 상황별 기준부터 풀었습니다. 소음원과 침대 위치까지 이어서 확인하면 결정 기준이 분명해집니다.",
    category: "풍수지리",
    contentType: "faq",
    keywords: ["수면 빛 소음 균형", "상황별 기준", "암막 커튼", "소음원", "침대 위치"],
    sections: ["수면 빛 소음 균형에서 자주 묻는 질문", "상황별 기준 답변부터 확인하기", "상황별로 달라지는 항목", "공식 안내와 함께 볼 내용", "마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "수면 공간 보기" },
  }
];

export const blogExpansionBatch120 = createQualityExpansionPosts(seeds);

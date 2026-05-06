import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-deposit-risk-checklist",
    title: "깡통전세 위험, 시세 확인 먼저 보는 법",
    excerpt: "깡통전세 위험를 판단할 때 시세 확인만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["깡통전세 위험", "시세 확인", "선순위채권", "보증금 비율", "경매 배당"],
    sections: ["1. 시세 확인 기준 먼저 세우기", "2. 깡통전세 위험에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-deposit-risk-cost",
    title: "깡통전세 위험 비용 줄이는 선순위채권 기준",
    excerpt: "깡통전세 위험를 판단할 때 선순위채권만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["깡통전세 위험", "선순위채권", "시세 확인", "보증금 비율", "경매 배당"],
    sections: ["1. 깡통전세 위험 총비용 나누기", "2. 선순위채권에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-deposit-risk-mistake",
    title: "깡통전세 위험 실수 막는 보증금 비율 순서",
    excerpt: "깡통전세 위험를 판단할 때 보증금 비율만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["깡통전세 위험", "보증금 비율", "시세 확인", "선순위채권", "경매 배당"],
    sections: ["1. 보증금 비율에서 생기는 착각", "2. 깡통전세 위험을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-deposit-risk-compare",
    title: "깡통전세 위험 비교할 때 경매 배당부터",
    excerpt: "깡통전세 위험를 판단할 때 경매 배당만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["깡통전세 위험", "경매 배당", "시세 확인", "선순위채권", "보증금 비율"],
    sections: ["1. 깡통전세 위험 선택지 나누기", "2. 경매 배당 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-deposit-risk-faq",
    title: "깡통전세 위험 FAQ, 상황별 기준 핵심 답변",
    excerpt: "깡통전세 위험를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["깡통전세 위험", "상황별 기준", "시세 확인", "선순위채권", "보증금 비율"],
    sections: ["1. 깡통전세 위험에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  }
];

export const blogExpansionBatch33 = createQualityExpansionPosts(seeds);

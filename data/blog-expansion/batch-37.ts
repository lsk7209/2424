import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-moveout-return-checklist",
    title: "전세금 반환 준비, 내용증명 먼저 보는 법",
    excerpt: "전세금 반환 준비를 판단할 때 내용증명만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["전세금 반환 준비", "내용증명", "임차권등기", "퇴거 일정", "보증기관 청구"],
    sections: ["1. 내용증명 기준 먼저 세우기", "2. 전세금 반환 준비에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-moveout-return-cost",
    title: "전세금 반환 준비 비용 줄이는 임차권등기 기준",
    excerpt: "전세금 반환 준비를 판단할 때 임차권등기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["전세금 반환 준비", "임차권등기", "내용증명", "퇴거 일정", "보증기관 청구"],
    sections: ["1. 전세금 반환 준비 총비용 나누기", "2. 임차권등기에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-moveout-return-mistake",
    title: "전세금 반환 준비 실수 막는 퇴거 일정 순서",
    excerpt: "전세금 반환 준비를 판단할 때 퇴거 일정만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["전세금 반환 준비", "퇴거 일정", "내용증명", "임차권등기", "보증기관 청구"],
    sections: ["1. 퇴거 일정에서 생기는 착각", "2. 전세금 반환 준비을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-moveout-return-compare",
    title: "전세금 반환 준비 비교할 때 보증기관 청구부터",
    excerpt: "전세금 반환 준비를 판단할 때 보증기관 청구만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["전세금 반환 준비", "보증기관 청구", "내용증명", "임차권등기", "퇴거 일정"],
    sections: ["1. 전세금 반환 준비 선택지 나누기", "2. 보증기관 청구 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-moveout-return-faq",
    title: "전세금 반환 준비 FAQ, 상황별 기준 핵심 답변",
    excerpt: "전세금 반환 준비를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["전세금 반환 준비", "상황별 기준", "내용증명", "임차권등기", "퇴거 일정"],
    sections: ["1. 전세금 반환 준비에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  }
];

export const blogExpansionBatch37 = createQualityExpansionPosts(seeds);

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-insurance-condition-checklist",
    title: "전세보증보험 조건 빠뜨리기 쉬운 HUG 가입",
    excerpt: "전세보증보험 조건를 판단할 때 HUG 가입만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["전세보증보험 조건", "HUG 가입", "보증한도", "임대인 동의", "반환보증"],
    sections: ["1. HUG 가입 기준 먼저 세우기", "2. 전세보증보험 조건에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-insurance-condition-cost",
    title: "전세보증보험 조건 초보자가 보는 보증한도",
    excerpt: "전세보증보험 조건를 판단할 때 보증한도만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["전세보증보험 조건", "보증한도", "HUG 가입", "임대인 동의", "반환보증"],
    sections: ["1. 전세보증보험 조건 총비용 나누기", "2. 보증한도에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-insurance-condition-mistake",
    title: "전세보증보험 조건 보류 신호와 임대인 동의",
    excerpt: "전세보증보험 조건를 판단할 때 임대인 동의만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["전세보증보험 조건", "임대인 동의", "HUG 가입", "보증한도", "반환보증"],
    sections: ["1. 임대인 동의에서 생기는 착각", "2. 전세보증보험 조건을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-insurance-condition-compare",
    title: "전세보증보험 조건 서류·사진 반환보증 정리",
    excerpt: "전세보증보험 조건를 판단할 때 반환보증만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["전세보증보험 조건", "반환보증", "HUG 가입", "보증한도", "임대인 동의"],
    sections: ["1. 전세보증보험 조건 선택지 나누기", "2. 반환보증 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-insurance-condition-faq",
    title: "전세보증보험 조건 한 달 뒤 보는 상황별 기준",
    excerpt: "전세보증보험 조건를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["전세보증보험 조건", "상황별 기준", "HUG 가입", "보증한도", "임대인 동의"],
    sections: ["1. 전세보증보험 조건에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  }
];

export const blogExpansionBatch31 = createQualityExpansionPosts(seeds);

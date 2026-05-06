import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-rent-budget-checklist",
    title: "월세 예산 짜기 빠뜨리기 쉬운 고정비",
    excerpt: "월세 예산 짜기를 판단할 때 고정비만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["월세 예산 짜기", "고정비", "관리비", "교통비", "비상금"],
    sections: ["1. 고정비 기준 먼저 세우기", "2. 월세 예산 짜기에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "saving-rent-budget-cost",
    title: "월세 예산 짜기 초보자가 보는 관리비",
    excerpt: "월세 예산 짜기를 판단할 때 관리비만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["월세 예산 짜기", "관리비", "고정비", "교통비", "비상금"],
    sections: ["1. 월세 예산 짜기 총비용 나누기", "2. 관리비에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "saving-rent-budget-mistake",
    title: "월세 예산 짜기 보류 신호와 교통비",
    excerpt: "월세 예산 짜기를 판단할 때 교통비만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["월세 예산 짜기", "교통비", "고정비", "관리비", "비상금"],
    sections: ["1. 교통비에서 생기는 착각", "2. 월세 예산 짜기을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "saving-rent-budget-compare",
    title: "월세 예산 짜기 서류·사진 비상금 정리",
    excerpt: "월세 예산 짜기를 판단할 때 비상금만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["월세 예산 짜기", "비상금", "고정비", "관리비", "교통비"],
    sections: ["1. 월세 예산 짜기 선택지 나누기", "2. 비상금 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "saving-rent-budget-faq",
    title: "월세 예산 짜기 한 달 뒤 보는 상황별 기준",
    excerpt: "월세 예산 짜기를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["월세 예산 짜기", "상황별 기준", "고정비", "관리비", "교통비"],
    sections: ["1. 월세 예산 짜기에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  }
];

export const blogExpansionBatch47 = createQualityExpansionPosts(seeds);

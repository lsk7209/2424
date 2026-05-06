import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-landlord-tax-checklist",
    title: "임대인 체납 확인 계약 전 국세완납 확인법",
    excerpt: "임대인 체납 확인를 판단할 때 국세완납만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["임대인 체납 확인", "국세완납", "지방세완납", "열람 동의", "계약 전 서류"],
    sections: ["1. 국세완납 기준 먼저 세우기", "2. 임대인 체납 확인에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-landlord-tax-cost",
    title: "임대인 체납 확인 실패 줄이는 지방세완납 체크",
    excerpt: "임대인 체납 확인를 판단할 때 지방세완납만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["임대인 체납 확인", "지방세완납", "국세완납", "열람 동의", "계약 전 서류"],
    sections: ["1. 임대인 체납 확인 총비용 나누기", "2. 지방세완납에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-landlord-tax-mistake",
    title: "임대인 체납 확인 현장 점검 열람 동의 포인트",
    excerpt: "임대인 체납 확인를 판단할 때 열람 동의만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["임대인 체납 확인", "열람 동의", "국세완납", "지방세완납", "계약 전 서류"],
    sections: ["1. 열람 동의에서 생기는 착각", "2. 임대인 체납 확인을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-landlord-tax-compare",
    title: "임대인 체납 확인 계약 서류 최종 질문",
    excerpt: "임대인 체납 확인를 판단할 때 계약 전 서류만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["임대인 체납 확인", "계약 전 서류", "국세완납", "지방세완납", "열람 동의"],
    sections: ["1. 임대인 체납 확인 선택지 나누기", "2. 계약 전 서류 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  },
  {
    slug: "jeonse-landlord-tax-faq",
    title: "임대인 체납 확인 관리 기준, 상황별 기준까지",
    excerpt: "임대인 체납 확인를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["임대인 체납 확인", "상황별 기준", "국세완납", "지방세완납", "열람 동의"],
    sections: ["1. 임대인 체납 확인에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/safety-check", label: "전세 안전진단 보기" },
  }
];

export const blogExpansionBatch34 = createQualityExpansionPosts(seeds);

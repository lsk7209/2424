import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "feng-entrance-clean-checklist",
    title: "현관 정리 풍수 후회 줄이는 신발장",
    excerpt: "현관 정리 풍수를 판단할 때 신발장만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "checklist",
    keywords: ["현관 정리 풍수", "신발장", "조명", "우산 보관", "첫인상"],
    sections: ["1. 신발장 기준 먼저 세우기", "2. 현관 정리 풍수에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-entrance-clean-cost",
    title: "현관 정리 풍수 좋은 조건 조명 판별",
    excerpt: "현관 정리 풍수를 판단할 때 조명만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "cost-saving",
    keywords: ["현관 정리 풍수", "조명", "신발장", "우산 보관", "첫인상"],
    sections: ["1. 현관 정리 풍수 총비용 나누기", "2. 조명에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-entrance-clean-mistake",
    title: "현관 정리 풍수 숨은 비용 우산 보관 찾기",
    excerpt: "현관 정리 풍수를 판단할 때 우산 보관만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "mistake-proof",
    keywords: ["현관 정리 풍수", "우산 보관", "신발장", "조명", "첫인상"],
    sections: ["1. 우산 보관에서 생기는 착각", "2. 현관 정리 풍수을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-entrance-clean-compare",
    title: "현관 정리 풍수 바로 묻는 첫인상 질문",
    excerpt: "현관 정리 풍수를 판단할 때 첫인상만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "comparison",
    keywords: ["현관 정리 풍수", "첫인상", "신발장", "조명", "우산 보관"],
    sections: ["1. 현관 정리 풍수 선택지 나누기", "2. 첫인상 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-entrance-clean-faq",
    title: "현관 정리 풍수 마지막 점검 상황별 기준",
    excerpt: "현관 정리 풍수를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "faq",
    keywords: ["현관 정리 풍수", "상황별 기준", "신발장", "조명", "우산 보관"],
    sections: ["1. 현관 정리 풍수에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  }
];

export const blogExpansionBatch60 = createQualityExpansionPosts(seeds);

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-shared-space-rule-checklist",
    title: "쉐어하우스 생활 규칙 후회 줄이는 공용주방",
    excerpt: "쉐어하우스 생활 규칙를 판단할 때 공용주방만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["쉐어하우스 생활 규칙", "공용주방", "청소 순번", "공동비", "냉장고 공간"],
    sections: ["1. 공용주방 기준 먼저 세우기", "2. 쉐어하우스 생활 규칙에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-shared-space-rule-cost",
    title: "쉐어하우스 생활 규칙 좋은 조건 청소 순번 판별",
    excerpt: "쉐어하우스 생활 규칙를 판단할 때 청소 순번만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["쉐어하우스 생활 규칙", "청소 순번", "공용주방", "공동비", "냉장고 공간"],
    sections: ["1. 쉐어하우스 생활 규칙 총비용 나누기", "2. 청소 순번에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-shared-space-rule-mistake",
    title: "쉐어하우스 생활 규칙 숨은 비용 공동비 찾기",
    excerpt: "쉐어하우스 생활 규칙를 판단할 때 공동비만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["쉐어하우스 생활 규칙", "공동비", "공용주방", "청소 순번", "냉장고 공간"],
    sections: ["1. 공동비에서 생기는 착각", "2. 쉐어하우스 생활 규칙을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-shared-space-rule-compare",
    title: "쉐어하우스 생활 규칙 바로 묻는 냉장고 공간 질문",
    excerpt: "쉐어하우스 생활 규칙를 판단할 때 냉장고 공간만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["쉐어하우스 생활 규칙", "냉장고 공간", "공용주방", "청소 순번", "공동비"],
    sections: ["1. 쉐어하우스 생활 규칙 선택지 나누기", "2. 냉장고 공간 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-shared-space-rule-faq",
    title: "쉐어하우스 생활 규칙 마지막 점검 상황별 기준",
    excerpt: "쉐어하우스 생활 규칙를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["쉐어하우스 생활 규칙", "상황별 기준", "공용주방", "청소 순번", "공동비"],
    sections: ["1. 쉐어하우스 생활 규칙에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch44 = createQualityExpansionPosts(seeds);

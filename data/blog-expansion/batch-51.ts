import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-option-cost-checklist",
    title: "풀옵션 비용 빠뜨리기 쉬운 가전 수리",
    excerpt: "풀옵션 비용를 판단할 때 가전 수리만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["풀옵션 비용", "가전 수리", "소모품", "초기비용", "퇴실 정산"],
    sections: ["1. 가전 수리 기준 먼저 세우기", "2. 풀옵션 비용에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-option-cost-cost",
    title: "풀옵션 비용 초보자가 보는 소모품",
    excerpt: "풀옵션 비용를 판단할 때 소모품만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["풀옵션 비용", "소모품", "가전 수리", "초기비용", "퇴실 정산"],
    sections: ["1. 풀옵션 비용 총비용 나누기", "2. 소모품에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-option-cost-mistake",
    title: "풀옵션 비용 보류 신호와 초기비용",
    excerpt: "풀옵션 비용를 판단할 때 초기비용만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["풀옵션 비용", "초기비용", "가전 수리", "소모품", "퇴실 정산"],
    sections: ["1. 초기비용에서 생기는 착각", "2. 풀옵션 비용을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-option-cost-compare",
    title: "풀옵션 비용 서류·사진 퇴실 정산 정리",
    excerpt: "풀옵션 비용를 판단할 때 퇴실 정산만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["풀옵션 비용", "퇴실 정산", "가전 수리", "소모품", "초기비용"],
    sections: ["1. 풀옵션 비용 선택지 나누기", "2. 퇴실 정산 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-option-cost-faq",
    title: "풀옵션 비용 한 달 뒤 보는 상황별 기준",
    excerpt: "풀옵션 비용를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["풀옵션 비용", "상황별 기준", "가전 수리", "소모품", "초기비용"],
    sections: ["1. 풀옵션 비용에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  }
];

export const blogExpansionBatch51 = createQualityExpansionPosts(seeds);

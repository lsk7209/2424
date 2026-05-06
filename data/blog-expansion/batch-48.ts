import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-management-fee-checklist",
    title: "관리비 명세서 후회 줄이는 공용전기",
    excerpt: "관리비 명세서를 판단할 때 공용전기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["관리비 명세서", "공용전기", "수도요금", "청소비", "인터넷 포함"],
    sections: ["1. 공용전기 기준 먼저 세우기", "2. 관리비 명세서에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-management-fee-cost",
    title: "관리비 명세서 좋은 조건 수도요금 판별",
    excerpt: "관리비 명세서를 판단할 때 수도요금만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["관리비 명세서", "수도요금", "공용전기", "청소비", "인터넷 포함"],
    sections: ["1. 관리비 명세서 총비용 나누기", "2. 수도요금에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-management-fee-mistake",
    title: "관리비 명세서 숨은 비용 청소비 찾기",
    excerpt: "관리비 명세서를 판단할 때 청소비만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["관리비 명세서", "청소비", "공용전기", "수도요금", "인터넷 포함"],
    sections: ["1. 청소비에서 생기는 착각", "2. 관리비 명세서을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-management-fee-compare",
    title: "관리비 명세서 바로 묻는 인터넷 포함 질문",
    excerpt: "관리비 명세서를 판단할 때 인터넷 포함만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["관리비 명세서", "인터넷 포함", "공용전기", "수도요금", "청소비"],
    sections: ["1. 관리비 명세서 선택지 나누기", "2. 인터넷 포함 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  },
  {
    slug: "saving-management-fee-faq",
    title: "관리비 명세서 마지막 점검 상황별 기준",
    excerpt: "관리비 명세서를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["관리비 명세서", "상황별 기준", "공용전기", "수도요금", "청소비"],
    sections: ["1. 관리비 명세서에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools", label: "생활비 도구 보기" },
  }
];

export const blogExpansionBatch48 = createQualityExpansionPosts(seeds);

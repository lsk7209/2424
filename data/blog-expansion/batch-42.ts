import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-mold-humidity-checklist",
    title: "원룸 습기 관리 계약 전 제습기 확인법",
    excerpt: "원룸 습기 관리를 판단할 때 제습기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["원룸 습기 관리", "제습기", "환기 시간", "곰팡이", "창문 결로"],
    sections: ["1. 제습기 기준 먼저 세우기", "2. 원룸 습기 관리에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-mold-humidity-cost",
    title: "원룸 습기 관리 실패 줄이는 환기 시간 체크",
    excerpt: "원룸 습기 관리를 판단할 때 환기 시간만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["원룸 습기 관리", "환기 시간", "제습기", "곰팡이", "창문 결로"],
    sections: ["1. 원룸 습기 관리 총비용 나누기", "2. 환기 시간에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-mold-humidity-mistake",
    title: "원룸 습기 관리 현장 점검 곰팡이 포인트",
    excerpt: "원룸 습기 관리를 판단할 때 곰팡이만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["원룸 습기 관리", "곰팡이", "제습기", "환기 시간", "창문 결로"],
    sections: ["1. 곰팡이에서 생기는 착각", "2. 원룸 습기 관리을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-mold-humidity-compare",
    title: "원룸 습기 관리 선택 전 창문 결로 질문",
    excerpt: "원룸 습기 관리를 판단할 때 창문 결로만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["원룸 습기 관리", "창문 결로", "제습기", "환기 시간", "곰팡이"],
    sections: ["1. 원룸 습기 관리 선택지 나누기", "2. 창문 결로 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "living-mold-humidity-faq",
    title: "원룸 습기 관리 기준, 상황별 기준까지",
    excerpt: "원룸 습기 관리를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["원룸 습기 관리", "상황별 기준", "제습기", "환기 시간", "곰팡이"],
    sections: ["1. 원룸 습기 관리에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch42 = createQualityExpansionPosts(seeds);

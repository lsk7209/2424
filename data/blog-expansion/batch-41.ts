import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-trash-calendar-checklist",
    title: "분리수거 요일표, 재활용 먼저 보는 법",
    excerpt: "분리수거 요일표를 판단할 때 재활용만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["분리수거 요일표", "재활용", "음식물쓰레기", "종량제", "배출 시간"],
    sections: ["1. 재활용 기준 먼저 세우기", "2. 분리수거 요일표에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-trash-calendar-cost",
    title: "분리수거 요일표 비용 줄이는 음식물쓰레기 기준",
    excerpt: "분리수거 요일표를 판단할 때 음식물쓰레기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["분리수거 요일표", "음식물쓰레기", "재활용", "종량제", "배출 시간"],
    sections: ["1. 분리수거 요일표 총비용 나누기", "2. 음식물쓰레기에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-trash-calendar-mistake",
    title: "분리수거 요일표 실수 막는 종량제 순서",
    excerpt: "분리수거 요일표를 판단할 때 종량제만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["분리수거 요일표", "종량제", "재활용", "음식물쓰레기", "배출 시간"],
    sections: ["1. 종량제에서 생기는 착각", "2. 분리수거 요일표을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-trash-calendar-compare",
    title: "분리수거 요일표 비교할 때 배출 시간부터",
    excerpt: "분리수거 요일표를 판단할 때 배출 시간만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["분리수거 요일표", "배출 시간", "재활용", "음식물쓰레기", "종량제"],
    sections: ["1. 분리수거 요일표 선택지 나누기", "2. 배출 시간 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-trash-calendar-faq",
    title: "분리수거 요일표 FAQ, 상황별 기준 핵심 답변",
    excerpt: "분리수거 요일표를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["분리수거 요일표", "상황별 기준", "재활용", "음식물쓰레기", "종량제"],
    sections: ["1. 분리수거 요일표에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  }
];

export const blogExpansionBatch41 = createQualityExpansionPosts(seeds);

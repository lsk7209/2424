import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "interior-desk-layout-checklist",
    title: "작은 방 책상 배치 빠뜨리기 쉬운 콘센트 위치",
    excerpt: "작은 방 책상 배치를 판단할 때 콘센트 위치만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "checklist",
    keywords: ["작은 방 책상 배치", "콘센트 위치", "창문 빛", "의자 동선", "집중 공간"],
    sections: ["1. 콘센트 위치 기준 먼저 세우기", "2. 작은 방 책상 배치에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-desk-layout-cost",
    title: "작은 방 책상 배치 초보자가 보는 창문 빛",
    excerpt: "작은 방 책상 배치를 판단할 때 창문 빛만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "cost-saving",
    keywords: ["작은 방 책상 배치", "창문 빛", "콘센트 위치", "의자 동선", "집중 공간"],
    sections: ["1. 작은 방 책상 배치 총비용 나누기", "2. 창문 빛에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-desk-layout-mistake",
    title: "작은 방 책상 배치 보류 신호와 의자 동선",
    excerpt: "작은 방 책상 배치를 판단할 때 의자 동선만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "mistake-proof",
    keywords: ["작은 방 책상 배치", "의자 동선", "콘센트 위치", "창문 빛", "집중 공간"],
    sections: ["1. 의자 동선에서 생기는 착각", "2. 작은 방 책상 배치을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-desk-layout-compare",
    title: "작은 방 책상 배치 서류·사진 집중 공간 정리",
    excerpt: "작은 방 책상 배치를 판단할 때 집중 공간만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "comparison",
    keywords: ["작은 방 책상 배치", "집중 공간", "콘센트 위치", "창문 빛", "의자 동선"],
    sections: ["1. 작은 방 책상 배치 선택지 나누기", "2. 집중 공간 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  },
  {
    slug: "interior-desk-layout-faq",
    title: "작은 방 책상 배치 한 달 뒤 보는 상황별 기준",
    excerpt: "작은 방 책상 배치를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "인테리어",
    contentType: "faq",
    keywords: ["작은 방 책상 배치", "상황별 기준", "콘센트 위치", "창문 빛", "의자 동선"],
    sections: ["1. 작은 방 책상 배치에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/guide", label: "주거 가이드 보기" },
  }
];

export const blogExpansionBatch55 = createQualityExpansionPosts(seeds);

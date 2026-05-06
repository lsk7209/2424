import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "feng-bedroom-layout-checklist",
    title: "침대 위치 풍수 계약 전 문 방향 확인법",
    excerpt: "침대 위치 풍수를 판단할 때 문 방향만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "checklist",
    keywords: ["침대 위치 풍수", "문 방향", "창문 위치", "수면 동선", "거울 배치"],
    sections: ["1. 문 방향 기준 먼저 세우기", "2. 침대 위치 풍수에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-bedroom-layout-cost",
    title: "침대 위치 풍수 창문 위치 실패 줄이는 체크",
    excerpt: "침대 위치 풍수를 판단할 때 창문 위치만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "cost-saving",
    keywords: ["침대 위치 풍수", "창문 위치", "문 방향", "수면 동선", "거울 배치"],
    sections: ["1. 침대 위치 풍수 총비용 나누기", "2. 창문 위치에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-bedroom-layout-mistake",
    title: "침대 위치 풍수 현장 점검 수면 동선 포인트",
    excerpt: "침대 위치 풍수를 판단할 때 수면 동선만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "mistake-proof",
    keywords: ["침대 위치 풍수", "수면 동선", "문 방향", "창문 위치", "거울 배치"],
    sections: ["1. 수면 동선에서 생기는 착각", "2. 침대 위치 풍수을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-bedroom-layout-compare",
    title: "침대 위치 풍수 선택 전 거울 배치 질문",
    excerpt: "침대 위치 풍수를 판단할 때 거울 배치만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "comparison",
    keywords: ["침대 위치 풍수", "거울 배치", "문 방향", "창문 위치", "수면 동선"],
    sections: ["1. 침대 위치 풍수 선택지 나누기", "2. 거울 배치 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-bedroom-layout-faq",
    title: "침대 위치 풍수 관리 기준, 상황별 기준까지",
    excerpt: "침대 위치 풍수를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "faq",
    keywords: ["침대 위치 풍수", "상황별 기준", "문 방향", "창문 위치", "수면 동선"],
    sections: ["1. 침대 위치 풍수에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  }
];

export const blogExpansionBatch58 = createQualityExpansionPosts(seeds);

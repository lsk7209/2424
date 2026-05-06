import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "feng-desk-energy-checklist",
    title: "책상 방향 풍수 빠뜨리기 쉬운 집중력",
    excerpt: "책상 방향 풍수를 판단할 때 집중력만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "checklist",
    keywords: ["책상 방향 풍수", "집중력", "채광", "벽면 배치", "동선 정리"],
    sections: ["1. 집중력 기준 먼저 세우기", "2. 책상 방향 풍수에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-desk-energy-cost",
    title: "책상 방향 풍수 초보자가 보는 채광",
    excerpt: "책상 방향 풍수를 판단할 때 채광만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "cost-saving",
    keywords: ["책상 방향 풍수", "채광", "집중력", "벽면 배치", "동선 정리"],
    sections: ["1. 책상 방향 풍수 총비용 나누기", "2. 채광에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-desk-energy-mistake",
    title: "책상 방향 풍수 보류 신호와 벽면 배치",
    excerpt: "책상 방향 풍수를 판단할 때 벽면 배치만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "mistake-proof",
    keywords: ["책상 방향 풍수", "벽면 배치", "집중력", "채광", "동선 정리"],
    sections: ["1. 벽면 배치에서 생기는 착각", "2. 책상 방향 풍수을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-desk-energy-compare",
    title: "책상 방향 풍수 동선 정리 사진 기록법",
    excerpt: "책상 방향 풍수를 판단할 때 동선 정리만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "comparison",
    keywords: ["책상 방향 풍수", "동선 정리", "집중력", "채광", "벽면 배치"],
    sections: ["1. 책상 방향 풍수 선택지 나누기", "2. 동선 정리 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  },
  {
    slug: "feng-desk-energy-faq",
    title: "책상 방향 풍수 한 달 뒤 보는 상황별 기준",
    excerpt: "책상 방향 풍수를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "풍수지리",
    contentType: "faq",
    keywords: ["책상 방향 풍수", "상황별 기준", "집중력", "채광", "벽면 배치"],
    sections: ["1. 책상 방향 풍수에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "집 풍수 테스트 보기" },
  }
];

export const blogExpansionBatch59 = createQualityExpansionPosts(seeds);

import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-one-room-noise-checklist",
    title: "원룸 소음 체크 빠뜨리기 쉬운 벽간소음",
    excerpt: "원룸 소음 체크를 판단할 때 벽간소음만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["원룸 소음 체크", "벽간소음", "층간소음", "도로 소음", "방문 시간"],
    sections: ["1. 벽간소음 기준 먼저 세우기", "2. 원룸 소음 체크에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/neighborhood-test", label: "동네 적합도 테스트" },
  },
  {
    slug: "living-one-room-noise-cost",
    title: "원룸 소음 체크 초보자가 보는 층간소음",
    excerpt: "원룸 소음 체크를 판단할 때 층간소음만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["원룸 소음 체크", "층간소음", "벽간소음", "도로 소음", "방문 시간"],
    sections: ["1. 원룸 소음 체크 총비용 나누기", "2. 층간소음에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/neighborhood-test", label: "동네 적합도 테스트" },
  },
  {
    slug: "living-one-room-noise-mistake",
    title: "원룸 소음 체크 도로 소음 보류 신호",
    excerpt: "원룸 소음 체크를 판단할 때 도로 소음만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["원룸 소음 체크", "도로 소음", "벽간소음", "층간소음", "방문 시간"],
    sections: ["1. 도로 소음에서 생기는 착각", "2. 원룸 소음 체크을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/neighborhood-test", label: "동네 적합도 테스트" },
  },
  {
    slug: "living-one-room-noise-compare",
    title: "원룸 소음 체크 서류·사진 방문 시간 정리",
    excerpt: "원룸 소음 체크를 판단할 때 방문 시간만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["원룸 소음 체크", "방문 시간", "벽간소음", "층간소음", "도로 소음"],
    sections: ["1. 원룸 소음 체크 선택지 나누기", "2. 방문 시간 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/neighborhood-test", label: "동네 적합도 테스트" },
  },
  {
    slug: "living-one-room-noise-faq",
    title: "원룸 소음 체크 한 달 뒤 보는 상황별 기준",
    excerpt: "원룸 소음 체크를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["원룸 소음 체크", "상황별 기준", "벽간소음", "층간소음", "도로 소음"],
    sections: ["1. 원룸 소음 체크에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/neighborhood-test", label: "동네 적합도 테스트" },
  }
];

export const blogExpansionBatch39 = createQualityExpansionPosts(seeds);

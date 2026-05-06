import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-security-window-checklist",
    title: "원룸 방범 체크, 방범창 먼저 보는 법",
    excerpt: "원룸 방범 체크를 판단할 때 방범창만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["원룸 방범 체크", "방범창", "도어락", "CCTV", "골목 조명"],
    sections: ["1. 방범창 기준 먼저 세우기", "2. 원룸 방범 체크에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/safety-check", label: "안전진단 보기" },
  },
  {
    slug: "living-security-window-cost",
    title: "원룸 방범 체크 비용 줄이는 도어락 기준",
    excerpt: "원룸 방범 체크를 판단할 때 도어락만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["원룸 방범 체크", "도어락", "방범창", "CCTV", "골목 조명"],
    sections: ["1. 원룸 방범 체크 총비용 나누기", "2. 도어락에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/safety-check", label: "안전진단 보기" },
  },
  {
    slug: "living-security-window-mistake",
    title: "원룸 방범 체크 실수 막는 CCTV 순서",
    excerpt: "원룸 방범 체크를 판단할 때 CCTV만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["원룸 방범 체크", "CCTV", "방범창", "도어락", "골목 조명"],
    sections: ["1. CCTV에서 생기는 착각", "2. 원룸 방범 체크을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/safety-check", label: "안전진단 보기" },
  },
  {
    slug: "living-security-window-compare",
    title: "원룸 방범 체크 비교할 때 골목 조명부터",
    excerpt: "원룸 방범 체크를 판단할 때 골목 조명만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["원룸 방범 체크", "골목 조명", "방범창", "도어락", "CCTV"],
    sections: ["1. 원룸 방범 체크 선택지 나누기", "2. 골목 조명 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/safety-check", label: "안전진단 보기" },
  },
  {
    slug: "living-security-window-faq",
    title: "원룸 방범 체크 FAQ, 상황별 기준 핵심 답변",
    excerpt: "원룸 방범 체크를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["원룸 방범 체크", "상황별 기준", "방범창", "도어락", "CCTV"],
    sections: ["1. 원룸 방범 체크에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/safety-check", label: "안전진단 보기" },
  }
];

export const blogExpansionBatch45 = createQualityExpansionPosts(seeds);

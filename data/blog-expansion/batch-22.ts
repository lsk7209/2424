import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "move-estimate-contract-checklist",
    title: "이사 견적 계약 전 방문견적 확인법",
    excerpt: "이사 견적 계약를 판단할 때 방문견적만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "checklist",
    keywords: ["이사 견적 계약", "방문견적", "추가요금", "계약서 문구", "파손 보상"],
    sections: ["1. 방문견적 기준 먼저 세우기", "2. 이사 견적 계약에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사 비용 계산하기" },
  },
  {
    slug: "move-estimate-contract-cost",
    title: "이사 견적 계약 실패 줄이는 추가요금 체크",
    excerpt: "이사 견적 계약를 판단할 때 추가요금만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "cost-saving",
    keywords: ["이사 견적 계약", "추가요금", "방문견적", "계약서 문구", "파손 보상"],
    sections: ["1. 이사 견적 계약 총비용 나누기", "2. 추가요금에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사 비용 계산하기" },
  },
  {
    slug: "move-estimate-contract-mistake",
    title: "이사 견적 계약 현장 점검 계약서 문구 포인트",
    excerpt: "이사 견적 계약를 판단할 때 계약서 문구만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "mistake-proof",
    keywords: ["이사 견적 계약", "계약서 문구", "방문견적", "추가요금", "파손 보상"],
    sections: ["1. 계약서 문구에서 생기는 착각", "2. 이사 견적 계약을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사 비용 계산하기" },
  },
  {
    slug: "move-estimate-contract-compare",
    title: "이사 견적 계약 선택 전 파손 보상 질문",
    excerpt: "이사 견적 계약를 판단할 때 파손 보상만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "comparison",
    keywords: ["이사 견적 계약", "파손 보상", "방문견적", "추가요금", "계약서 문구"],
    sections: ["1. 이사 견적 계약 선택지 나누기", "2. 파손 보상 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사 비용 계산하기" },
  },
  {
    slug: "move-estimate-contract-faq",
    title: "이사 견적 계약 관리 기준, 상황별 기준까지",
    excerpt: "이사 견적 계약를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "faq",
    keywords: ["이사 견적 계약", "상황별 기준", "방문견적", "추가요금", "계약서 문구"],
    sections: ["1. 이사 견적 계약에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사 비용 계산하기" },
  }
];

export const blogExpansionBatch22 = createQualityExpansionPosts(seeds);

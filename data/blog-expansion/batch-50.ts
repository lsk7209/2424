import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "saving-moving-cost-checklist",
    title: "이사비 절약 계약 전 비수기 확인법",
    excerpt: "이사비 절약를 판단할 때 비수기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "checklist",
    keywords: ["이사비 절약", "비수기", "짐 줄이기", "방문견적", "추가요금"],
    sections: ["1. 비수기 기준 먼저 세우기", "2. 이사비 절약에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사비 계산기 보기" },
  },
  {
    slug: "saving-moving-cost-cost",
    title: "이사비 절약 실패 줄이는 짐 줄이기 체크",
    excerpt: "이사비 절약를 판단할 때 짐 줄이기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "cost-saving",
    keywords: ["이사비 절약", "짐 줄이기", "비수기", "방문견적", "추가요금"],
    sections: ["1. 이사비 절약 총비용 나누기", "2. 짐 줄이기에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사비 계산기 보기" },
  },
  {
    slug: "saving-moving-cost-mistake",
    title: "이사비 절약 현장 점검 방문견적 포인트",
    excerpt: "이사비 절약를 판단할 때 방문견적만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "mistake-proof",
    keywords: ["이사비 절약", "방문견적", "비수기", "짐 줄이기", "추가요금"],
    sections: ["1. 방문견적에서 생기는 착각", "2. 이사비 절약을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사비 계산기 보기" },
  },
  {
    slug: "saving-moving-cost-compare",
    title: "이사비 절약 선택 전 추가요금 질문",
    excerpt: "이사비 절약를 판단할 때 추가요금만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "comparison",
    keywords: ["이사비 절약", "추가요금", "비수기", "짐 줄이기", "방문견적"],
    sections: ["1. 이사비 절약 선택지 나누기", "2. 추가요금 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사비 계산기 보기" },
  },
  {
    slug: "saving-moving-cost-faq",
    title: "이사비 절약 관리 기준, 상황별 기준까지",
    excerpt: "이사비 절약를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "금융/절약",
    contentType: "faq",
    keywords: ["이사비 절약", "상황별 기준", "비수기", "짐 줄이기", "방문견적"],
    sections: ["1. 이사비 절약에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools/moving-cost-calculator", label: "이사비 계산기 보기" },
  }
];

export const blogExpansionBatch50 = createQualityExpansionPosts(seeds);

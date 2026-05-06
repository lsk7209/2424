import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-broker-check-checklist",
    title: "공인중개사 확인 계약 전 등록번호 확인법",
    excerpt: "공인중개사 확인를 판단할 때 등록번호만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["공인중개사 확인", "등록번호", "중개보수", "설명서", "책임보험"],
    sections: ["1. 등록번호 기준 먼저 세우기", "2. 공인중개사 확인에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "jeonse-broker-check-cost",
    title: "공인중개사 확인 실패 줄이는 중개보수 체크",
    excerpt: "공인중개사 확인를 판단할 때 중개보수만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["공인중개사 확인", "중개보수", "등록번호", "설명서", "책임보험"],
    sections: ["1. 공인중개사 확인 총비용 나누기", "2. 중개보수에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "jeonse-broker-check-mistake",
    title: "공인중개사 확인 현장 점검 설명서 포인트",
    excerpt: "공인중개사 확인를 판단할 때 설명서만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["공인중개사 확인", "설명서", "등록번호", "중개보수", "책임보험"],
    sections: ["1. 설명서에서 생기는 착각", "2. 공인중개사 확인을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "jeonse-broker-check-compare",
    title: "공인중개사 확인 선택 전 책임보험 질문",
    excerpt: "공인중개사 확인를 판단할 때 책임보험만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["공인중개사 확인", "책임보험", "등록번호", "중개보수", "설명서"],
    sections: ["1. 공인중개사 확인 선택지 나누기", "2. 책임보험 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  },
  {
    slug: "jeonse-broker-check-faq",
    title: "공인중개사 확인 관리 기준, 상황별 기준까지",
    excerpt: "공인중개사 확인를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["공인중개사 확인", "상황별 기준", "등록번호", "중개보수", "설명서"],
    sections: ["1. 공인중개사 확인에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools/brokerage-fee-calculator", label: "중개수수료 계산하기" },
  }
];

export const blogExpansionBatch38 = createQualityExpansionPosts(seeds);

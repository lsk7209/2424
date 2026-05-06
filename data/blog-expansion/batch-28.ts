import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "move-day-final-checklist",
    title: "이사 당일 확인 후회 줄이는 잔금 송금",
    excerpt: "이사 당일 확인를 판단할 때 잔금 송금만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "checklist",
    keywords: ["이사 당일 확인", "잔금 송금", "열쇠 인계", "계량기 사진", "하자 기록"],
    sections: ["1. 잔금 송금 기준 먼저 세우기", "2. 이사 당일 확인에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-day-final-cost",
    title: "이사 당일 확인 좋은 조건 열쇠 인계 판별",
    excerpt: "이사 당일 확인를 판단할 때 열쇠 인계만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "cost-saving",
    keywords: ["이사 당일 확인", "열쇠 인계", "잔금 송금", "계량기 사진", "하자 기록"],
    sections: ["1. 이사 당일 확인 총비용 나누기", "2. 열쇠 인계에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-day-final-mistake",
    title: "이사 당일 확인 숨은 비용 계량기 사진 찾기",
    excerpt: "이사 당일 확인를 판단할 때 계량기 사진만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "mistake-proof",
    keywords: ["이사 당일 확인", "계량기 사진", "잔금 송금", "열쇠 인계", "하자 기록"],
    sections: ["1. 계량기 사진에서 생기는 착각", "2. 이사 당일 확인을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-day-final-compare",
    title: "이사 당일 확인 바로 묻는 하자 기록 질문",
    excerpt: "이사 당일 확인를 판단할 때 하자 기록만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "comparison",
    keywords: ["이사 당일 확인", "하자 기록", "잔금 송금", "열쇠 인계", "계량기 사진"],
    sections: ["1. 이사 당일 확인 선택지 나누기", "2. 하자 기록 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  },
  {
    slug: "move-day-final-faq",
    title: "이사 당일 확인 마지막 점검 상황별 기준",
    excerpt: "이사 당일 확인를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "이사준비",
    contentType: "faq",
    keywords: ["이사 당일 확인", "상황별 기준", "잔금 송금", "열쇠 인계", "계량기 사진"],
    sections: ["1. 이사 당일 확인에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/checklist", label: "이사 체크리스트 보기" },
  }
];

export const blogExpansionBatch28 = createQualityExpansionPosts(seeds);

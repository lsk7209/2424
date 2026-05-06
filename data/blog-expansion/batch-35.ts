import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "jeonse-loan-timing-checklist",
    title: "전세대출 일정 빠뜨리기 쉬운 사전심사",
    excerpt: "전세대출 일정를 판단할 때 사전심사만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "checklist",
    keywords: ["전세대출 일정", "사전심사", "잔금일", "은행 서류", "대출 특약"],
    sections: ["1. 사전심사 기준 먼저 세우기", "2. 전세대출 일정에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "jeonse-loan-timing-cost",
    title: "전세대출 일정 초보자가 보는 잔금일",
    excerpt: "전세대출 일정를 판단할 때 잔금일만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "cost-saving",
    keywords: ["전세대출 일정", "잔금일", "사전심사", "은행 서류", "대출 특약"],
    sections: ["1. 전세대출 일정 총비용 나누기", "2. 잔금일에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "jeonse-loan-timing-mistake",
    title: "전세대출 일정 보류 신호와 은행 서류",
    excerpt: "전세대출 일정를 판단할 때 은행 서류만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "mistake-proof",
    keywords: ["전세대출 일정", "은행 서류", "사전심사", "잔금일", "대출 특약"],
    sections: ["1. 은행 서류에서 생기는 착각", "2. 전세대출 일정을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "jeonse-loan-timing-compare",
    title: "전세대출 일정 서류·사진 대출 특약 정리",
    excerpt: "전세대출 일정를 판단할 때 대출 특약만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "comparison",
    keywords: ["전세대출 일정", "대출 특약", "사전심사", "잔금일", "은행 서류"],
    sections: ["1. 전세대출 일정 선택지 나누기", "2. 대출 특약 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  },
  {
    slug: "jeonse-loan-timing-faq",
    title: "전세대출 일정 한 달 뒤 보는 상황별 기준",
    excerpt: "전세대출 일정를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "전세안전",
    contentType: "faq",
    keywords: ["전세대출 일정", "상황별 기준", "사전심사", "잔금일", "은행 서류"],
    sections: ["1. 전세대출 일정에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/tools/deposit-interest-calculator", label: "이자 계산기 보기" },
  }
];

export const blogExpansionBatch35 = createQualityExpansionPosts(seeds);

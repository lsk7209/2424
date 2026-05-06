import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-season-maintenance-checklist",
    title: "계절별 집 관리 계약 전 여름 냉방 확인법",
    excerpt: "계절별 집 관리를 판단할 때 여름 냉방만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["계절별 집 관리", "여름 냉방", "겨울 난방", "환기", "벌레 예방"],
    sections: ["1. 여름 냉방 기준 먼저 세우기", "2. 계절별 집 관리에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "living-season-maintenance-cost",
    title: "계절별 집 관리 실패 줄이는 겨울 난방 체크",
    excerpt: "계절별 집 관리를 판단할 때 겨울 난방만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["계절별 집 관리", "겨울 난방", "여름 냉방", "환기", "벌레 예방"],
    sections: ["1. 계절별 집 관리 총비용 나누기", "2. 겨울 난방에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "living-season-maintenance-mistake",
    title: "계절별 집 관리 현장 점검 환기 포인트",
    excerpt: "계절별 집 관리를 판단할 때 환기만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["계절별 집 관리", "환기", "여름 냉방", "겨울 난방", "벌레 예방"],
    sections: ["1. 환기에서 생기는 착각", "2. 계절별 집 관리을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "living-season-maintenance-compare",
    title: "계절별 집 관리 선택 전 벌레 예방 질문",
    excerpt: "계절별 집 관리를 판단할 때 벌레 예방만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["계절별 집 관리", "벌레 예방", "여름 냉방", "겨울 난방", "환기"],
    sections: ["1. 계절별 집 관리 선택지 나누기", "2. 벌레 예방 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  },
  {
    slug: "living-season-maintenance-faq",
    title: "계절별 집 관리 기준, 상황별 기준까지",
    excerpt: "계절별 집 관리를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["계절별 집 관리", "상황별 기준", "여름 냉방", "겨울 난방", "환기"],
    sections: ["1. 계절별 집 관리에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/feng-shui", label: "집 분위기 테스트 보기" },
  }
];

export const blogExpansionBatch46 = createQualityExpansionPosts(seeds);

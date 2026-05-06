import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
  {
    slug: "living-delivery-address-checklist",
    title: "택배 주소 관리 빠뜨리기 쉬운 공동현관",
    excerpt: "택배 주소 관리를 판단할 때 공동현관만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "checklist",
    keywords: ["택배 주소 관리", "공동현관", "무인택배함", "배송 메모", "분실 예방"],
    sections: ["1. 공동현관 기준 먼저 세우기", "2. 택배 주소 관리에서 문서로 남길 것", "3. 현장에서 사진으로 확인할 항목", "4. 보류해야 할 위험 신호", "5. 오늘 바로 적용할 순서"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-delivery-address-cost",
    title: "택배 주소 관리 초보자가 보는 무인택배함",
    excerpt: "택배 주소 관리를 판단할 때 무인택배함만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "cost-saving",
    keywords: ["택배 주소 관리", "무인택배함", "공동현관", "배송 메모", "분실 예방"],
    sections: ["1. 택배 주소 관리 총비용 나누기", "2. 무인택배함에서 새는 지출 찾기", "3. 줄여도 되는 비용과 안 되는 비용", "4. 견적서에 남길 문장", "5. 다음 달 다시 볼 항목"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-delivery-address-mistake",
    title: "택배 주소 관리 보류 신호와 배송 메모",
    excerpt: "택배 주소 관리를 판단할 때 배송 메모만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "mistake-proof",
    keywords: ["택배 주소 관리", "배송 메모", "공동현관", "무인택배함", "분실 예방"],
    sections: ["1. 배송 메모에서 생기는 착각", "2. 택배 주소 관리을 급하게 정하면 생기는 일", "3. 담당자 답변 기록법", "4. 나중에 다투는 지점", "5. 실수 후 바로잡는 순서"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-delivery-address-compare",
    title: "택배 주소 관리 서류·사진 분실 예방 정리",
    excerpt: "택배 주소 관리를 판단할 때 분실 예방만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "comparison",
    keywords: ["택배 주소 관리", "분실 예방", "공동현관", "무인택배함", "배송 메모"],
    sections: ["1. 택배 주소 관리 선택지 나누기", "2. 분실 예방 기준으로 비교하기", "3. 좋은 조건과 보류 조건", "4. 생활 동선까지 같이 보기", "5. 최종 선택 전 재확인"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  },
  {
    slug: "living-delivery-address-faq",
    title: "택배 주소 관리 한 달 뒤 보는 상황별 기준",
    excerpt: "택배 주소 관리를 판단할 때 상황별 기준만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.",
    category: "생활꿀팁",
    contentType: "faq",
    keywords: ["택배 주소 관리", "상황별 기준", "공동현관", "무인택배함", "배송 메모"],
    sections: ["1. 택배 주소 관리에서 자주 묻는 질문", "2. 상황별 기준 답변 확인하기", "3. 상황별로 달라지는 항목", "4. 공식 안내와 함께 볼 것", "5. 마지막 점검 질문"],
    primaryLink: { href: "/checklist", label: "생활 체크리스트 보기" },
  }
];

export const blogExpansionBatch43 = createQualityExpansionPosts(seeds);

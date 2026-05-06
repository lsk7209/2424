export interface ContentFaqItem {
  question: string;
  answer: string;
}

export interface ContentQualityEntry {
  title: string;
  excerpt: string;
  category: string;
  keywords?: string[];
  faq?: ContentFaqItem[];
}

export interface OfficialSource {
  href: string;
  label: string;
  description: string;
}

const OFFICIAL_SOURCES: Record<string, OfficialSource> = {
  이사준비: {
    href: "https://www.gov.kr",
    label: "정부24 생활민원 안내",
    description: "전입신고, 확정일자, 생활민원처럼 이사와 함께 처리할 행정 절차를 확인할 수 있습니다.",
  },
  생활꿀팁: {
    href: "https://www.consumer.go.kr",
    label: "소비자24 피해 예방 정보",
    description: "생활용품, 계약, 서비스 이용 중 발생할 수 있는 소비자 분쟁 기준을 확인할 수 있습니다.",
  },
  전세안전: {
    href: "https://www.molit.go.kr",
    label: "국토교통부 주거정책 안내",
    description: "전월세, 주택 임대차, 보증금 보호와 관련한 공식 정책 정보를 확인할 수 있습니다.",
  },
  풍수지리: {
    href: "https://www.kma.go.kr",
    label: "기상청 생활기상 정보",
    description: "습도, 환기, 계절별 생활환경처럼 집 안 컨디션과 연결되는 생활기상 정보를 확인할 수 있습니다.",
  },
  인테리어: {
    href: "https://www.consumer.go.kr",
    label: "소비자24 제품 안전 정보",
    description: "가구, 생활용품, 설치 서비스 구매 전 피해 예방 기준을 확인할 수 있습니다.",
  },
  "금융/절약": {
    href: "https://www.fss.or.kr",
    label: "금융감독원 금융소비자 정보",
    description: "대출, 예금, 금융상품과 관련한 소비자 유의사항을 확인할 수 있습니다.",
  },
  법률: {
    href: "https://www.iros.go.kr",
    label: "대법원 인터넷등기소",
    description: "등기부등본 열람과 권리관계 확인에 필요한 공식 등기 정보를 확인할 수 있습니다.",
  },
  생활: {
    href: "https://www.gov.kr",
    label: "정부24 생활민원 안내",
    description: "이사 후 생활 행정과 민원 처리 기준을 확인할 수 있습니다.",
  },
  안전: {
    href: "https://www.molit.go.kr",
    label: "국토교통부 주거정책 안내",
    description: "주거 안전, 임대차 보호, 주택 관련 공식 정책 정보를 확인할 수 있습니다.",
  },
  청소: {
    href: "https://www.consumer.go.kr",
    label: "소비자24 생활 안전 정보",
    description: "청소 서비스, 생활용품, 제품 안전과 관련한 소비자 정보를 확인할 수 있습니다.",
  },
  행정: {
    href: "https://www.gov.kr",
    label: "정부24 민원서비스",
    description: "전입신고, 주민센터 업무, 각종 민원 발급 절차를 확인할 수 있습니다.",
  },
  계약: {
    href: "https://www.molit.go.kr",
    label: "국토교통부 임대차 정책",
    description: "주택 임대차 계약과 보증금 보호에 관한 공식 기준을 확인할 수 있습니다.",
  },
  금융: {
    href: "https://www.fss.or.kr",
    label: "금융감독원 금융소비자 정보",
    description: "보증보험, 대출, 금융상품 이용 전 확인할 소비자 정보를 확인할 수 있습니다.",
  },
  이사: {
    href: "https://www.gov.kr",
    label: "정부24 이사 관련 민원",
    description: "이사 전후 필요한 공공 민원과 생활 행정 절차를 확인할 수 있습니다.",
  },
};

const FALLBACK_SOURCE: OfficialSource = {
  href: "https://www.gov.kr",
  label: "정부24 공식 안내",
  description: "생활 행정과 공공 민원 기준은 최신 공식 안내를 함께 확인하는 것이 안전합니다.",
};

function normalizeQuestion(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function getMainKeyword(entry: ContentQualityEntry) {
  return entry.keywords?.[0] ?? entry.title.split(/[,:]/)[0] ?? entry.title;
}

export function getOfficialSource(category: string) {
  return OFFICIAL_SOURCES[category] ?? FALLBACK_SOURCE;
}

export function getEnhancedFaq(entry: ContentQualityEntry) {
  const existing = entry.faq ?? [];
  const seen = new Set(existing.map((item) => normalizeQuestion(item.question)));
  const mainKeyword = getMainKeyword(entry);
  const source = getOfficialSource(entry.category);

  const candidates: ContentFaqItem[] = [
    {
      question: `${mainKeyword}를 확인할 때 가장 먼저 볼 기준은 무엇인가요?`,
      answer: `${mainKeyword}는 비용, 책임 범위, 기록 가능 여부를 먼저 나눠 보는 것이 좋습니다. 말로만 설명된 조건보다 계약서, 견적서, 사진처럼 나중에 다시 확인할 수 있는 근거를 우선하세요.`,
    },
    {
      question: `공식 기준은 어디에서 함께 확인해야 하나요?`,
      answer: `${source.label}에서 최신 안내를 함께 확인하세요. 이 글은 실무적인 판단 순서를 돕기 위한 자료이며, 제도나 서류 기준은 공식 안내가 우선입니다.`,
    },
    {
      question: `${mainKeyword}는 언제 다시 점검해야 하나요?`,
      answer: `계약, 예약, 입주, 퇴실처럼 돈이나 책임이 확정되기 전에는 다시 점검하는 편이 안전합니다. 특히 날짜, 금액, 담당자, 사진 기록이 바뀌었는지 확인하면 분쟁 가능성을 줄일 수 있습니다.`,
    },
  ];

  const enhanced = [...existing];
  for (const item of candidates) {
    const key = normalizeQuestion(item.question);
    if (enhanced.length >= 3) break;
    if (!seen.has(key)) {
      enhanced.push(item);
      seen.add(key);
    }
  }

  return enhanced;
}

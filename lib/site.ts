export const siteConfig = {
  name: "이사독립",
  shortName: "이사독립",
  url: "https://today2424.kr",
  title: "이사 준비부터 전세 계약까지 한 번에 정리하는 실전 가이드",
  description:
    "이사독립은 이사 준비, 전세 계약 점검, 체크리스트, 계산기, 자취 생활 정보를 한 곳에서 제공하는 한국어 이사 정보 플랫폼입니다.",
  ogDescription:
    "이사 준비, 계약 확인, 체크리스트, 계산기, 가이드를 한 곳에서 확인하세요.",
  keywords: [
    "이사",
    "이사 준비",
    "전세 계약",
    "전세 사기",
    "이사 체크리스트",
    "동네 찾기",
    "중개수수료 계산기",
    "전월세 전환율",
    "자취",
    "독립",
  ],
  contactEmail: "contact@indielife.kr",
  persona: {
    type: "주거 생활 정보 편집팀",
    audience: "처음 독립하거나 이사를 준비하는 1인 가구와 전세·월세 계약 전 위험 신호를 직접 점검하려는 임차인",
    promise: "이사 준비, 전세 계약, 자취 생활을 체크리스트와 공식 출처 중심으로 정리합니다.",
    tone: "짧고 실무적인 한국어로, 불안을 과장하지 않고 확인 순서를 먼저 제시합니다.",
    disclaimer: "전세·계약·금융 정보는 참고용이며 최종 판단은 공식 안내와 전문가 상담을 함께 확인해야 합니다.",
    knowsAbout: [
      "이사 준비",
      "전세 계약 전 점검",
      "자취 생활 비용",
      "생활 행정",
      "주거 안전 체크리스트",
    ],
    avoidExpressions: ["100% 보장", "무조건 안전", "수익 보장", "전문 자격 사칭"],
  },
  organization: {
    name: "이사독립",
    legalName: "이사독립",
    logoPath: "/icons/icon-512.png",
    sameAs: ["https://today2424.kr/about", "https://today2424.kr/disclosure"],
  },
  adsensePublisherId: "ca-pub-3050601904412736",
  gaMeasurementId: "G-N2V7ZZP184",
  gaPropertyId: "534327620",
  googleSiteVerification: [
    "uNiRiMcBHgmWHzDMwY8XGV42sXJZ9SSaaz3IhPLvHSA",
    "pF0tbNpwRxDbYPYV9M-5ayLeLcgbmY98ntc489E4toU",
  ],
  naverSiteVerification: "ddf23ab0bbb03a73fe3a29afa1bc6bc8fe2c8881",
  updatedAt: "2026-05-16",
  timeZone: "Asia/Seoul",
} as const;

export const sitePersona = {
  voice: "practical-guide",
  tone: "친근하고 실용적 (해요체)",
  description: "이사와 전세 계약을 여러 번 경험한 선배처럼, 복잡한 부동산·계약 절차를 이해하기 쉽게 안내하는 정보 제공자",
  target: [
    "첫 자취·독립을 준비하는 20~30대",
    "전세 계약이 처음인 사회초년생",
    "이사 비용과 일정을 빠르게 확인해야 하는 직장인",
  ],
  disclaimer: "법률·금융 판단은 참고용이며, 최종 결정 전 전문가 상담을 권장합니다.",
  contentGuidelines: {
    minLength: 1500,
    targetLength: 2500,
    internalLinksMin: 3,
    externalLinksMin: 2,
    faqRequired: true,
    structuredHeadings: true,
  },
  prohibitions: [
    "전문 자격 사칭 금지 (공인중개사, 변호사, 세무사 등)",
    "과장된 수익성·안전성 주장 금지",
    "불분명한 출처 인용 금지",
  ],
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

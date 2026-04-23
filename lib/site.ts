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
  adsensePublisherId: "ca-pub-3050601904412736",
  gaMeasurementId: "G-N2V7ZZP184",
  googleSiteVerification: "uNiRiMcBHgmWHzDMwY8XGV42sXJZ9SSaaz3IhPLvHSA",
  naverSiteVerification: "ddf23ab0bbb03a73fe3a29afa1bc6bc8fe2c8881",
  updatedAt: "2026-04-23",
  timeZone: "Asia/Seoul",
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

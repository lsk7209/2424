import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "이사 견적 계산기: 비교 조건 정리 도구",
  description: "이사 종류·집 크기·거리·층수를 정리해 업체 견적을 같은 기준으로 비교하세요. 실제 견적이나 시세를 산출하지 않는 준비 도구입니다.",
  path: "/tools/moving-cost-calculator",
  keywords: ["이사 견적 계산기", "이사 견적 비교", "포장이사 견적", "이삿짐센터 비교", "이사 계약 체크리스트"],
});

export default function MovingCostCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

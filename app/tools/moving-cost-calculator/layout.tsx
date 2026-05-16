import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "이사 견적 계산기",
  description: "이사 종류(일반·반포장·포장)와 집 크기, 이동 거리, 층수를 선택하면 예상 이사 비용을 즉시 계산합니다. 업체 부르기 전 먼저 확인하세요.",
  path: "/tools/moving-cost-calculator",
  keywords: ["이사 견적 계산기", "이사 비용", "포장이사 비용", "이삿짐센터 비용", "이사 비용 계산"],
});

export default function MovingCostCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

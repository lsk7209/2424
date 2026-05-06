import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "이사 견적 계산기",
  description: "이사 종류, 집 크기, 거리, 층수 기준으로 예상 이사 비용을 계산하는 도구입니다.",
  path: "/tools/moving-cost-calculator",
  keywords: ["이사 견적 계산기", "이사 비용", "포장이사 비용"],
});

export default function MovingCostCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

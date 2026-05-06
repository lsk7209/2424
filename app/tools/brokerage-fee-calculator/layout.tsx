import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "중개수수료 계산기",
  description: "주택 거래 금액과 거래 유형에 따른 중개보수 상한 요율을 계산합니다.",
  path: "/tools/brokerage-fee-calculator",
  keywords: ["중개수수료 계산기", "부동산 중개보수", "복비 계산"],
});

export default function BrokerageFeeCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "중개수수료 계산기",
  description: "매매·전세·월세 거래 금액을 입력하면 법정 중개보수 상한 요율을 즉시 계산합니다. 복비 얼마인지 계약 전 바로 확인하세요.",
  path: "/tools/brokerage-fee-calculator",
  keywords: ["중개수수료 계산기", "부동산 중개보수", "복비 계산", "전세 중개보수", "매매 수수료"],
});

export default function BrokerageFeeCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

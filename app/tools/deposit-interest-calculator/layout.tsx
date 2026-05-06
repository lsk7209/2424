import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "전월세 전환율 계산기",
  description: "보증금 변경 시 월세가 얼마나 달라지는지 전월세 전환율 기준으로 계산합니다.",
  path: "/tools/deposit-interest-calculator",
  keywords: ["전월세 전환율 계산기", "월세 계산", "보증금 월세 전환"],
});

export default function DepositInterestCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

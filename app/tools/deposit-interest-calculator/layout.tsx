import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "전월세 전환율 계산기",
  description: "전세 보증금과 월세를 입력하면 전월세 전환율을 계산합니다. 전세·월세 전환 시 적정 금액이 얼마인지 바로 확인하세요.",
  path: "/tools/deposit-interest-calculator",
  keywords: ["전월세 전환율 계산기", "월세 계산", "보증금 월세 전환", "전세 월세 비교", "전환율 계산"],
});

export default function DepositInterestCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

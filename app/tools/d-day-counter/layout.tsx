import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "이사 D-Day 카운터",
  description: "이사 날짜를 입력하면 D-Day를 계산하고, D-30·D-14·D-7·D-1 시점별 필수 준비 항목을 자동으로 안내합니다.",
  path: "/tools/d-day-counter",
  keywords: ["이사 디데이", "이사 일정", "이사 준비 체크", "이사 D-Day", "이사 날짜 계산"],
});

export default function DDayCounterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

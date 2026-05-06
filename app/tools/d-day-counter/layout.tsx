import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "이사 D-Day 카운터",
  description: "이사 날짜까지 남은 기간과 시점별 준비 항목을 확인하는 도구입니다.",
  path: "/tools/d-day-counter",
  keywords: ["이사 디데이", "이사 일정", "이사 준비 체크"],
});

export default function DDayCounterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

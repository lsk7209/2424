import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "평수 제곱미터 변환기",
  description: "평과 제곱미터를 실시간으로 변환하고 방 크기 감각을 빠르게 확인합니다.",
  path: "/tools/area-converter",
  keywords: ["평수 계산기", "제곱미터 변환", "면적 변환"],
});

export default function AreaConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

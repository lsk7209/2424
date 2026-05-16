import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "평수 제곱미터 변환기",
  description: "평수를 제곱미터로, 제곱미터를 평으로 실시간 변환합니다. 부동산 매물 면적 표기가 헷갈릴 때 즉시 비교 확인하세요.",
  path: "/tools/area-converter",
  keywords: ["평수 계산기", "제곱미터 변환", "면적 변환", "평 m2 변환", "부동산 평수"],
});

export default function AreaConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

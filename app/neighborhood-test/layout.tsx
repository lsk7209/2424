import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "나만의 동네 찾기 테스트",
  description:
    "생활 스타일과 취향을 바탕으로 나에게 맞는 동네 후보를 찾아보는 테스트입니다.",
  path: "/neighborhood-test",
  keywords: ["동네 찾기", "동네 추천", "이사 지역 선택"],
});

export default function NeighborhoodTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

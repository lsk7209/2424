import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "풍수지리 집터 테스트",
  description:
    "주거 취향과 분위기를 바탕으로 어울리는 집터 성향과 인테리어 방향을 확인하는 테스트입니다.",
  path: "/feng-shui",
  keywords: ["풍수지리", "집터 테스트", "인테리어 성향"],
});

export default function FengShuiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "풍수지리 집터 테스트",
  description:
    "생활 방식과 분위기 선호를 질문에 답해 나에게 어울리는 집터 성향과 인테리어 방향을 재미있게 확인하는 테스트입니다.",
  path: "/feng-shui",
  keywords: ["풍수지리", "집터 테스트", "인테리어 성향", "집터 유형", "주거 성향 테스트"],
});

export default function FengShuiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

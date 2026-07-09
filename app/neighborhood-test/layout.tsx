import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "나만의 동네 찾기 테스트",
    description:
      "출퇴근 거리, 조용함, 편의시설, 가격대 등 생활 스타일 질문에 답하면 나에게 맞는 동네 유형을 추천합니다. 이사할 지역 고민 시 시작하세요.",
    path: "/neighborhood-test",
    keywords: ["동네 찾기", "동네 추천", "이사 지역 선택", "서울 동네 추천", "자취 동네"],
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function NeighborhoodTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "D-30 이사 체크리스트",
  description:
    "이사 30일 전부터 당일까지 놓치기 쉬운 행정, 이사 업체, 짐 정리, 공과금 이전을 단계별로 체크합니다. 인쇄해서 써도 좋아요.",
  path: "/checklist",
  keywords: ["이사 체크리스트", "D-30 체크리스트", "이사 준비", "이사 할 일", "이사 순서"],
});

export { default } from "./page";

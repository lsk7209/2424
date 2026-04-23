import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "D-30 이사 체크리스트",
  description:
    "이사 한 달 전부터 당일까지 순서대로 확인할 수 있는 실전형 체크리스트입니다.",
  path: "/checklist",
  keywords: ["이사 체크리스트", "D-30 체크리스트", "이사 준비"],
});

export { default } from "./page";

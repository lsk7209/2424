import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "전세 사기 위험 진단",
  description:
    "시세, 보증금, 근저당 정보를 기준으로 전세 계약 전 위험 신호를 빠르게 점검하는 도구입니다.",
  path: "/safety-check",
  keywords: ["전세 사기", "전세 위험 진단", "등기부등본 점검"],
});

export { default } from "./page";

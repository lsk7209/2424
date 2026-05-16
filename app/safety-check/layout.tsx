import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "전세 사기 위험 진단",
  description:
    "시세 대비 보증금 비율, 근저당 설정액, 집주인 정보를 입력하면 전세 계약 전 위험 신호를 단계별로 점검합니다. 깡통전세 여부를 빠르게 확인하세요.",
  path: "/safety-check",
  keywords: ["전세 사기", "전세 위험 진단", "등기부등본 점검", "깡통전세 확인", "전세 안전 진단"],
});

export { default } from "./page";

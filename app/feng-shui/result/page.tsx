import { Metadata } from "next";
import { Suspense } from "react";
import FengShuiResultClient from "./FengShuiResultClient";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "풍수지리 테스트 결과",
  description:
    "풍수지리 집터 테스트 결과와 추천 방향을 확인하는 페이지입니다.",
  path: "/feng-shui/result",
});

export default function FengShuiResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">결과를 불러오는 중입니다.</p>
          </div>
        </div>
      }
    >
      <FengShuiResultClient />
    </Suspense>
  );
}

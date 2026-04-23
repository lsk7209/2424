import { createPageMetadata } from "@/lib/metadata";
import ResultClient from "./ResultClient";

export const metadata = createPageMetadata({
  title: "동네 찾기 테스트 결과",
  description:
    "테스트 답변을 바탕으로 이상형 동네와 현실적인 추천 동네를 확인하는 결과 페이지입니다.",
  path: "/neighborhood-test/result",
});

export default function ResultPage() {
  return <ResultClient />;
}

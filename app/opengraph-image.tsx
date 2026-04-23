import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "linear-gradient(135deg, #fff8f1 0%, #eef7ff 55%, #dff6ef 100%)",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            color: "#1d4ed8",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 18,
              height: 18,
              borderRadius: 9999,
              backgroundColor: "#2563eb",
            }}
          />
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              maxWidth: 900,
            }}
          >
            이사 준비부터 전세 계약까지
            <br />
            한 번에 정리하는 실전 가이드
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.5,
              color: "#334155",
              maxWidth: 860,
            }}
          >
            체크리스트, 전세 위험 진단, 동네 찾기, 이사 계산기를 한 사이트에서
            바로 사용하세요.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#475569",
          }}
        >
          <div style={{ display: "flex" }}>today2424.kr</div>
          <div
            style={{
              display: "flex",
              padding: "12px 22px",
              borderRadius: 9999,
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              fontWeight: 700,
            }}
          >
            한국어 이사 정보 플랫폼
          </div>
        </div>
      </div>
    ),
    size,
  );
}

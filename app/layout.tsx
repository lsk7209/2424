import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "독립만세 - 이사/독립 종합 가이드",
  description: "이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼. 동네 찾기 테스트, 전세 사기 진단, 이사 체크리스트까지!",
  keywords: ["이사", "독립", "전세", "원룸", "자취", "동네 추천", "이사 체크리스트", "이사 준비", "전세 계약", "풍수지리", "깡통전세"],
  authors: [{ name: "독립만세" }],
  creator: "독립만세",
  publisher: "독립만세",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "독립만세 - 이사/독립 종합 가이드",
    description: "이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼",
    type: "website",
    locale: "ko_KR",
    siteName: "독립만세",
  },
  twitter: {
    card: "summary_large_image",
    title: "독립만세 - 이사/독립 종합 가이드",
    description: "이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'uNiRiMcBHgmWHzDMwY8XGV42sXJZ9SSaaz3IhPLvHSA',
    other: {
      'naver-site-verification': 'ddf23ab0bbb03a73fe3a29afa1bc6bc8fe2c8881',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

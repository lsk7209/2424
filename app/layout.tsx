import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://today2424.kr'),
  title: "이사독립 - 이사 준비부터 전세 계약까지 완벽 가이드 | 동네 찾기 테스트",
  description: "이사독립은 이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼입니다. 나만의 동네 찾기 테스트, 전세 사기 위험 진단, 풍수지리 집터 테스트, D-30 이사 체크리스트까지 제공합니다. 안전하고 행복한 독립 생활을 시작하세요.",
  keywords: ["이사", "독립", "전세", "원룸", "자취", "동네 추천", "이사 체크리스트", "이사 준비", "전세 계약", "풍수지리", "깡통전세", "전세 사기", "이사 계산기", "전월세 전환율", "중개수수료", "이사 체크리스트", "동네 찾기", "부동산", "임대차", "전세 보증금"],
  authors: [{ name: "이사독립" }],
  creator: "이사독립",
  publisher: "이사독립",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "이사독립 - 이사 준비부터 전세 계약까지 완벽 가이드 | 동네 찾기 테스트",
    description: "이사독립은 이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼입니다. 나만의 동네 찾기 테스트, 전세 사기 위험 진단, 풍수지리 집터 테스트, D-30 이사 체크리스트까지 제공합니다. 안전하고 행복한 독립 생활을 시작하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "이사독립",
    url: "https://today2424.kr",
    images: [
      {
        url: "https://today2424.kr/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "이사독립 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "이사독립 - 이사 준비부터 전세 계약까지 완벽 가이드 | 동네 찾기 테스트",
    description: "이사독립은 이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼입니다. 나만의 동네 찾기 테스트, 전세 사기 위험 진단, 풍수지리 집터 테스트, D-30 이사 체크리스트까지 제공합니다.",
    images: ["https://today2424.kr/icons/icon-512.png"],
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
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* PWA meta tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

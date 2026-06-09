import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsTracker from "@/components/analytics/GoogleAnalyticsTracker";
import { createSeoDescription, createSeoTitle } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const rootTitle = createSeoTitle(siteConfig.title);
const rootDescription = createSeoDescription(siteConfig.description);
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.organization.name,
  legalName: siteConfig.organization.legalName,
  url: siteConfig.url,
  logo: absoluteUrl(siteConfig.organization.logoPath),
  description: siteConfig.description,
  email: siteConfig.contactEmail,
  sameAs: siteConfig.organization.sameAs,
  knowsAbout: siteConfig.persona.knowsAbout,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.contactEmail,
    availableLanguage: "ko-KR",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.organization.name,
    url: siteConfig.url,
  },
  audience: {
    "@type": "Audience",
    audienceType: siteConfig.persona.audience,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: rootTitle,
  description: rootDescription,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: rootTitle,
    description: createSeoDescription(siteConfig.ogDescription),
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: rootTitle,
    description: createSeoDescription(siteConfig.ogDescription),
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [...siteConfig.googleSiteVerification],
    other: {
      "naver-site-verification": siteConfig.naverSiteVerification,
    },
  },
  alternates: {
    canonical: siteConfig.url,
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
        {/* Resource hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <meta name="google-adsense-account" content={siteConfig.adsensePublisherId} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsensePublisherId}`}
          crossOrigin="anonymous"
          data-overlays="bottom"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${siteConfig.gaMeasurementId}', { send_page_view: false });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="이사독립 RSS 피드"
          href={`${siteConfig.url}/rss.xml`}
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

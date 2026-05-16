import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

const SEO_TITLE_LIMIT = 50;
const SEO_DESCRIPTION_LIMIT = 130;
const TITLE_SEPARATOR = " | ";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

function trimToLimit(value: string, limit: number) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit - 1).trimEnd()}…`;
}

export function createSeoTitle(title: string, suffix: string = siteConfig.name) {
  const fullTitle = `${title}${TITLE_SEPARATOR}${suffix}`;

  if (fullTitle.length <= SEO_TITLE_LIMIT) {
    return fullTitle;
  }

  const titleLimit = SEO_TITLE_LIMIT - suffix.length - TITLE_SEPARATOR.length;
  return `${trimToLimit(title, titleLimit)}${TITLE_SEPARATOR}${suffix}`;
}

export function createSeoDescription(description: string) {
  return trimToLimit(description, SEO_DESCRIPTION_LIMIT);
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = createSeoTitle(title);
  const seoDescription = createSeoDescription(description);
  const ogImage = absoluteUrl("/opengraph-image");

  return {
    title: fullTitle,
    description: seoDescription,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description: seoDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} 대표 이미지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: seoDescription,
      images: [ogImage],
    },
  };
}

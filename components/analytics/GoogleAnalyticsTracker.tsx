"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { siteConfig } from "@/lib/site";

const PAGE_VIEW_RETRY_LIMIT = 10;
const PAGE_VIEW_RETRY_DELAY_MS = 100;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const pagePath = search ? `${pathname}?${search}` : pathname;
    let attempts = 0;
    let timeoutId: number | null = null;

    const sendPageView = () => {
      if (window.gtag) {
        window.gtag("config", siteConfig.gaMeasurementId, {
          page_path: pagePath,
        });
        return;
      }

      attempts += 1;
      if (attempts < PAGE_VIEW_RETRY_LIMIT) {
        timeoutId = window.setTimeout(sendPageView, PAGE_VIEW_RETRY_DELAY_MS);
      }
    };

    sendPageView();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname, search]);

  return null;
}

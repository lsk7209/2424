"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface MovingDirectoryTrackerProps {
  pageType: "hub" | "region";
  regionSlug: string;
  providerCount: number;
  visibleDetailCount: number;
}

export default function MovingDirectoryTracker({
  pageType,
  regionSlug,
  providerCount,
  visibleDetailCount,
}: MovingDirectoryTrackerProps) {
  const lastTrackedKeyRef = useRef<string | null>(null);
  const trackingKey = `${pageType}:${regionSlug}:${providerCount}:${visibleDetailCount}`;

  useEffect(() => {
    if (lastTrackedKeyRef.current === trackingKey) {
      return;
    }

    lastTrackedKeyRef.current = trackingKey;
    trackEvent("moving_directory_view", {
      page_type: pageType,
      region_slug: regionSlug,
      provider_count: providerCount,
      visible_detail_count: visibleDetailCount,
    });
  }, [pageType, providerCount, regionSlug, trackingKey, visibleDetailCount]);

  return null;
}

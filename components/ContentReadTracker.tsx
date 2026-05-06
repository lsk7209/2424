"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const READ_DEPTH_RATIO = 0.7;
const READ_TIME_MS = 45000;

interface ContentReadTrackerProps {
  contentType: "blog" | "guide";
  slug: string;
  title: string;
  category: string;
}

export default function ContentReadTracker({ contentType, slug, title, category }: ContentReadTrackerProps) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const startedAt = Date.now();

    const maybeTrack = () => {
      if (hasTrackedRef.current) {
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 1;
      const stayedLongEnough = Date.now() - startedAt >= READ_TIME_MS;

      if (scrollRatio >= READ_DEPTH_RATIO || stayedLongEnough) {
        hasTrackedRef.current = true;
        trackEvent("content_read_complete", {
          content_type: contentType,
          content_slug: slug,
          content_title: title,
          content_category: category,
          read_depth_ratio: Math.round(scrollRatio * 100) / 100,
        });
        window.removeEventListener("scroll", maybeTrack);
      }
    };

    const timerId = window.setTimeout(maybeTrack, READ_TIME_MS);
    window.addEventListener("scroll", maybeTrack, { passive: true });
    maybeTrack();

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("scroll", maybeTrack);
    };
  }, [category, contentType, slug, title]);

  return null;
}

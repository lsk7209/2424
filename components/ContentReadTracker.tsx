"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const READ_DEPTH_RATIO = 0.7;
const READ_TIME_MS = 45000;
const SCROLL_MILESTONES = [25, 50, 75] as const;

interface ContentReadTrackerProps {
  contentType: "blog" | "guide";
  slug: string;
  title: string;
  category: string;
}

export default function ContentReadTracker({ contentType, slug, title, category }: ContentReadTrackerProps) {
  const hasTrackedRef = useRef(false);
  const trackedMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const startedAt = Date.now();
    trackedMilestonesRef.current = new Set();

    const getScrollRatio = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      return scrollableHeight > 0 ? window.scrollY / scrollableHeight : 1;
    };

    const maybeTrackMilestones = () => {
      const pct = Math.round(getScrollRatio() * 100);
      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !trackedMilestonesRef.current.has(milestone)) {
          trackedMilestonesRef.current.add(milestone);
          trackEvent("scroll_depth", {
            content_type: contentType,
            content_slug: slug,
            scroll_percent: milestone,
          });
        }
      }
    };

    const maybeTrackComplete = () => {
      if (hasTrackedRef.current) return;
      const scrollRatio = getScrollRatio();
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
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const handleScroll = () => {
      maybeTrackMilestones();
      maybeTrackComplete();
    };

    const timerId = window.setTimeout(maybeTrackComplete, READ_TIME_MS);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [category, contentType, slug, title]);

  return null;
}

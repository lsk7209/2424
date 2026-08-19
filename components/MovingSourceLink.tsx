"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface MovingSourceLinkProps {
  href: string;
  source: "naver-place" | "google-maps";
  regionSlug: string;
  detailStatus: "visible" | "not_visible" | "unprocessed";
  children: ReactNode;
}

export default function MovingSourceLink({
  href,
  source,
  regionSlug,
  detailStatus,
  children,
}: MovingSourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
      onClick={() =>
        trackEvent("moving_source_click", {
          source,
          region_slug: regionSlug,
          detail_status: detailStatus,
        })
      }
    >
      {children}
    </a>
  );
}

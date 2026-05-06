import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateMetadata() {
  return {
    title: "Tool Not Found",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function generateStaticParams() {
  return [];
}

export default function ToolFallbackPage() {
  notFound();
}

import { readFileSync } from "node:fs";
import { getArgValue, getSiteConfig, toAbsoluteUrl, fetchText } from "./seo-utils.mjs";

const site = getSiteConfig();
const siteUrl = getArgValue("--site", site.url).replace(/\/$/, "");
const expectedAdsTxt = "google.com, pub-3050601904412736, DIRECT, f08c47fec0942fa0";
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

const layout = readFileSync("app/layout.tsx", "utf8");
const siteConfig = readFileSync("lib/site.ts", "utf8");
const disclosure = readFileSync("app/disclosure/page.tsx", "utf8");
const privacy = readFileSync("app/privacy/page.tsx", "utf8");

check(
  layout.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"),
  "AdSense auto ads script is missing from app/layout.tsx",
);
check(
  layout.includes('data-overlays="bottom"'),
  "AdSense auto ads script should keep anchor overlays at the bottom to reduce layout shift",
);
check(
  layout.includes("google-adsense-account") && siteConfig.includes("ca-pub-3050601904412736"),
  "google-adsense-account meta or publisher id is missing",
);
check(
  !/<ins[^>]+className?=["'][^"']*adsbygoogle/i.test(layout),
  "manual AdSense slot markup found in app/layout.tsx",
);
check(
  !/data-ad-slot|data-ad-format|data-ad-client/i.test(readProjectSurface()),
  "manual AdSense slot attributes found; this site should use auto ads only",
);
check(
  disclosure.includes("자동광고") && disclosure.includes("수동 광고 슬롯") && disclosure.includes("ca-pub-3050601904412736"),
  "ad disclosure page should explain auto ads, no manual slots, and publisher id",
);
check(
  privacy.includes("Google 광고 설정") &&
    privacy.includes("policies.google.com/technologies/partner-sites") &&
    privacy.includes("쿠키") &&
    privacy.includes("웹 비콘") &&
    privacy.includes("IP 주소"),
  "privacy page is missing required Google advertising cookie disclosures",
);

const ads = await fetchText(toAbsoluteUrl(siteUrl, "/ads.txt"));
check(ads.ok, `ads.txt fetch failed: ${ads.status}`);
if (ads.ok) {
  check(ads.text.trim() === expectedAdsTxt, "ads.txt does not exactly match the expected AdSense row");
}

const pages = ["/", "/about", "/privacy", "/terms", "/contact", "/disclosure", "/editorial-policy", "/blog", "/guide"];
for (const path of pages) {
  const response = await fetchText(toAbsoluteUrl(siteUrl, path));
  check(response.ok, `required AdSense review page failed: ${response.status} ${path}`);
  if (response.ok) {
    check(response.text.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"), `AdSense script missing on ${path}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`adsense validation ok: auto ads, ads.txt, policy pages, and required pages checked from ${siteUrl}`);

function readProjectSurface() {
  return [
    "app/layout.tsx",
    "app/blog/[slug]/page.tsx",
    "app/guide/[slug]/page.tsx",
    "data/content-templates.ts",
    "components/Footer.tsx",
    "components/Header.tsx",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
}

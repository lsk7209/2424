import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const sourceRepository = process.env.MOVING_SOURCE_REPOSITORY ?? "D:/web/korea-local-business-datasets";
const sourceRevision = "origin/main";
const naverFile = "data/collection-runs/2026-08-06/naver-isa-corrected-results.json";
const googleFile = "data/collection-runs/2026-08-07/google-isa-all-unique-final.json";
const outputFile = path.resolve(process.cwd(), "data/moving/providers.json");

const regionByDistrict = new Map([
  ["마포구", ["seoul-mapo", "서울 마포구"]],
  ["서대문구", ["seoul-seodaemun", "서울 서대문구"]],
  ["영등포구", ["seoul-yeongdeungpo", "서울 영등포구"]],
  ["은평구", ["seoul-eunpyeong", "서울 은평구"]],
  ["강서구", ["seoul-gangseo", "서울 강서구"]],
  ["양천구", ["seoul-yangcheon", "서울 양천구"]],
  ["용산구", ["seoul-yongsan", "서울 용산구"]],
  ["구로구", ["seoul-guro", "서울 구로구"]],
  ["강남구", ["seoul-gangnam", "서울 강남구"]],
  ["종로구", ["seoul-jongno", "서울 종로구"]],
  ["동작구", ["seoul-dongjak", "서울 동작구"]],
  ["관악구", ["seoul-gwanak", "서울 관악구"]],
]);
const acceptedNaverCategories = new Set(["이사", "포장이사", "해외이사"]);
const acceptedGoogleCategories = new Set(["이삿짐 운송업체", "용달화물업체", "운송 서비스", "보관이사업체"]);

function readSource(file) {
  return JSON.parse(execFileSync("git", ["-C", sourceRepository, "show", `${sourceRevision}:${file}`], { encoding: "utf8" }));
}

function findRegion(address) {
  for (const [district, [regionSlug, regionName]] of regionByDistrict) {
    if (address.includes(district)) return { regionSlug, regionName };
  }
  return null;
}

const naver = readSource(naverFile);
const google = readSource(googleFile);
const providers = [
  ...naver.results
    .filter((record) => acceptedNaverCategories.has(record.category))
    .flatMap((record) => {
      const region = findRegion(record.address ?? "");
      return region ? [{
        source: "naver-place",
        sourceId: record.place_id,
        name: record.name,
        category: record.category,
        address: record.address,
        regionSlug: region.regionSlug,
        regionName: region.regionName,
        sourceUrl: `https://map.naver.com/p/entry/place/${record.place_id}`,
        identityVerified: true,
        observedAt: "2026-08-06T23:42:17+09:00",
        detailStatus: "visible",
        query: naver.query,
        sourceRun: naverFile,
      }] : [];
    }),
  ...google.results
    .filter((record) => acceptedGoogleCategories.has(record.category))
    .flatMap((record) => {
      const region = findRegion(record.address ?? "");
      return region ? [{
        source: "google-maps",
        sourceId: record.google_place_id,
        name: record.name,
        category: record.category,
        address: record.address,
        phone: record.phone,
        regionSlug: region.regionSlug,
        regionName: region.regionName,
        sourceUrl: record.place_url,
        identityVerified: true,
        observedAt: "2026-08-07T12:00:00+09:00",
        detailStatus: "visible",
        query: google.query,
        sourceRun: googleFile,
      }] : [];
    }),
];

fs.writeFileSync(outputFile, `${JSON.stringify({ schemaVersion: 1, sourceStatus: "ready", generatedAt: new Date().toISOString(), providers }, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, providers: providers.length }, null, 2));

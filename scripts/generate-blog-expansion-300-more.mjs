import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const EXPANSION_DIR = join(ROOT, "data", "blog-expansion");
const START_BATCH = 61;
const END_BATCH = 120;
const POSTS_PER_BATCH = 5;

const contentTypes = ["checklist", "cost-saving", "mistake-proof", "comparison", "faq"];
const suffixes = ["checklist", "cost", "mistake", "compare", "faq"];

const clusters = [
  ["이사준비", "move-quote-phone-script", "이사 견적 전화 질문", "방문 견적 전 준비", "추가요금 질문", "파손 보상 확인", "계약 문자 기록", "/tools/moving-cost-calculator", "이사 비용 계산기 보기"],
  ["이사준비", "move-box-label-system", "이삿짐 박스 라벨링", "방별 색상 구분", "첫날 박스 분리", "깨짐주의 표시", "분실 방지 메모", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-fridge-empty-plan", "냉장고 비우기 계획", "냉동식품 소진", "이사 전날 전원", "보냉가방 준비", "음식물 쓰레기", "/checklist", "이사 준비 순서 보기"],
  ["이사준비", "move-kids-pet-day-plan", "아이 반려동물 이사 당일", "임시 맡김 장소", "동선 분리", "소음 스트레스", "필수 물품 가방", "/checklist", "이사 당일 체크 보기"],
  ["이사준비", "move-highrise-elevator-booking", "고층 이사 엘리베이터 예약", "관리실 협의", "사다리차 가능 여부", "주차 공간 확보", "민원 안내문", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-rainy-day-protection", "비 오는 날 이사 준비", "방수 포장", "현관 보양", "박스 젖음 방지", "일정 변경 기준", "/guide", "이사 가이드 보기"],
  ["이사준비", "move-first-night-bag", "이사 첫날 생존 가방", "세면도구", "충전기", "상비약", "갈아입을 옷", "/checklist", "첫날 준비물 보기"],
  ["이사준비", "move-address-change-priority", "주소 변경 우선순위", "전입신고", "금융 주소", "택배 주소", "자동이체 정보", "/checklist", "주소 변경 체크 보기"],
  ["이사준비", "move-cleaning-photo-proof", "입주청소 사진 증빙", "하자 사진", "청소 범위", "추가비 기준", "작업 전후 비교", "/guide", "입주 전 점검 보기"],
  ["이사준비", "move-storage-service-check", "보관이사 서비스 점검", "보관 기간", "습도 관리", "보험 조건", "출고 일정", "/tools/moving-cost-calculator", "보관이사 비용 보기"],
  ["전세안전", "jeonse-owner-id-match", "임대인 신분 확인", "등기부 소유자", "대리계약 위임장", "인감증명서", "계좌 명의", "/safety-check", "전세 위험 진단 보기"],
  ["전세안전", "jeonse-transfer-same-day", "잔금일 전입신고 순서", "확정일자", "전세권 설정", "열람 시간", "주민센터 방문", "/guide", "계약 절차 가이드 보기"],
  ["전세안전", "jeonse-agent-license-check", "중개사무소 등록 확인", "등록번호", "공제증서", "설명 의무", "중개보수 영수증", "/tools/brokerage-fee-calculator", "중개수수료 계산 보기"],
  ["전세안전", "jeonse-special-clause-redline", "전세 특약 문구 검토", "대출 불가 해제", "근저당 말소", "보증보험 조건", "수리 책임", "/guide", "계약서 가이드 보기"],
  ["전세안전", "jeonse-building-ledger-check", "건축물대장 확인", "위반건축물", "용도 확인", "면적 차이", "주소 일치", "/safety-check", "전세 안전 체크 보기"],
  ["전세안전", "jeonse-market-price-proof", "전세 시세 증빙", "실거래가", "주변 매물", "감정가", "보증금 비율", "/safety-check", "깡통전세 점검 보기"],
  ["전세안전", "jeonse-deposit-transfer-record", "보증금 송금 기록", "계좌 명의", "입금 메모", "영수증", "계약금 잔금", "/guide", "계약 기록 가이드 보기"],
  ["전세안전", "jeonse-renewal-notice-timing", "계약갱신 통보 시점", "문자 기록", "증액 한도", "묵시적 갱신", "퇴거 일정", "/guide", "전세 갱신 가이드 보기"],
  ["전세안전", "jeonse-moveout-proof-mail", "퇴거 통보 내용증명", "보증금 반환", "통보 기한", "문자 증거", "임차권등기", "/safety-check", "보증금 반환 준비 보기"],
  ["전세안전", "jeonse-auction-warning-sign", "경매 위험 신호", "압류 가압류", "세금 체납", "배당 순위", "등기 변동", "/safety-check", "경매 위험 점검 보기"],
  ["생활꿀팁", "living-boiler-season-check", "원룸 보일러 계절 점검", "난방비", "온수 압력", "예약 기능", "동파 예방", "/tools", "생활 도구 보기"],
  ["생활꿀팁", "living-window-condensation-routine", "창문 결로 관리 루틴", "환기 시간", "물기 제거", "커튼 위치", "곰팡이 예방", "/guide/studio-storage-planning-guide", "수납 배치 보기"],
  ["생활꿀팁", "living-shoe-cabinet-odor", "신발장 냄새 관리", "제습제 위치", "환기 습관", "우산 보관", "탈취제 교체", "/guide", "생활 관리 가이드 보기"],
  ["생활꿀팁", "living-small-kitchen-sink", "작은 주방 싱크대 관리", "배수구 냄새", "물때 제거", "조리도구 동선", "분리수거", "/guide", "주방 정리 가이드 보기"],
  ["생활꿀팁", "living-night-noise-memo", "야간 소음 기록법", "시간대 메모", "녹음 기준", "관리실 문의", "분쟁 예방", "/neighborhood-test", "동네 성향 테스트 보기"],
  ["생활꿀팁", "living-shared-bathroom-rule", "공용 화장실 사용 규칙", "청소 순번", "소모품 비용", "환기", "갈등 기록", "/guide/shared-bills-proof-guide", "공동 비용 가이드 보기"],
  ["생활꿀팁", "living-delivery-theft-prevention", "택배 분실 예방", "배송 메모", "무인택배함", "공동현관", "분실 신고", "/checklist", "생활 체크리스트 보기"],
  ["생활꿀팁", "living-utility-photo-meter", "계량기 사진 기록", "전기 계량기", "수도 계량기", "가스 검침", "정산일", "/checklist", "이사 정산 체크 보기"],
  ["생활꿀팁", "living-season-clothes-storage", "계절 옷 보관 순서", "세탁 후 보관", "압축팩", "습기 관리", "라벨링", "/guide/studio-storage-planning-guide", "수납 가이드 보기"],
  ["생활꿀팁", "living-cctv-entrance-check", "공동현관 CCTV 확인", "야간 귀가", "택배 위치", "관리 주체", "사각지대", "/safety-check", "생활 안전 점검 보기"],
  ["금융/절약", "saving-rent-auto-transfer", "월세 자동이체 관리", "이체일", "입금자명", "영수증", "연체 예방", "/tools/deposit-interest-calculator", "월세 계산 보기"],
  ["금융/절약", "saving-moving-season-price", "이사 성수기 비용", "손 없는 날", "주말 요금", "방문 견적", "예약 시점", "/tools/moving-cost-calculator", "이사비 계산 보기"],
  ["금융/절약", "saving-first-home-budget", "첫 독립 예산표", "보증금", "월세", "관리비", "초기 가전", "/tools", "생활비 도구 보기"],
  ["금융/절약", "saving-utility-bill-split", "공과금 분담 기준", "동거 정산", "계량기 사진", "월별 내역", "입금 기록", "/guide/shared-bills-proof-guide", "분담 증빙 보기"],
  ["금융/절약", "saving-option-appliance-buy", "옵션 가전 구매 판단", "중고 구매", "수리 비용", "퇴실 원상복구", "보증 기간", "/guide/appliance-inspection-form-guide", "가전 점검표 보기"],
  ["금융/절약", "saving-deposit-interest-loss", "보증금 이자 기회비용", "월세 전환", "예금 이자", "관리비 포함", "총 주거비", "/tools/deposit-interest-calculator", "전월세 전환 계산 보기"],
  ["금융/절약", "saving-contract-before-spend", "계약 전 지출 보류", "가구 구매", "이사 예약", "청소 예약", "대출 승인", "/guide", "계약 전 체크 보기"],
  ["금융/절약", "saving-repair-cost-boundary", "수리비 부담 기준", "소모품", "하자", "입주 전 사진", "집주인 협의", "/guide/room-photo-shot-list-guide", "사진 기록 가이드 보기"],
  ["금융/절약", "saving-small-room-electricity", "원룸 전기요금 절약", "대기전력", "에어컨 사용", "전기장판", "누진 구간", "/tools", "생활비 계산 보기"],
  ["금융/절약", "saving-broker-fee-receipt", "중개보수 영수증 관리", "상한요율", "현금영수증", "계약 유형", "추가 수수료", "/tools/brokerage-fee-calculator", "중개보수 계산 보기"],
  ["인테리어", "interior-wall-damage-proof", "벽 손상 없는 꾸미기", "무타공 선반", "접착 후크", "원상복구", "퇴실 사진", "/guide/room-photo-shot-list-guide", "퇴실 사진 가이드 보기"],
  ["인테리어", "interior-curtain-light-block", "커튼 암막 선택", "창문 방향", "채광", "냉난방비", "설치 방식", "/feng-shui", "집 분위기 테스트 보기"],
  ["인테리어", "interior-cable-line-clean", "케이블 정리 동선", "멀티탭 위치", "화재 예방", "청소 편의", "책상 배치", "/guide", "방 정리 가이드 보기"],
  ["인테리어", "interior-bed-under-storage", "침대 밑 수납", "습기", "먼지", "계절 물건", "꺼내기 쉬움", "/guide/studio-storage-planning-guide", "수납 배치 보기"],
  ["인테리어", "interior-entrance-zone", "현관 작은 수납존", "신발장", "우산", "분리수거", "외출 동선", "/guide", "현관 정리 보기"],
  ["인테리어", "interior-rental-lighting-safe", "월세집 조명 교체", "원상복구", "전구 규격", "밝기", "전기 안전", "/feng-shui", "조명 분위기 보기"],
  ["인테리어", "interior-desk-window-glare", "책상 창가 눈부심", "모니터 위치", "커튼", "콘센트", "집중 공간", "/guide", "책상 배치 보기"],
  ["인테리어", "interior-kitchen-counter-zone", "주방 조리대 구역화", "칼 도마 위치", "건조 공간", "동선", "청소 습관", "/guide", "주방 정리 보기"],
  ["인테리어", "interior-laundry-drying-zone", "빨래 건조 공간", "제습기", "창문", "동선 방해", "냄새 예방", "/blog/balcony-free-laundry-rack-plan", "빨래 건조대 배치 보기"],
  ["인테리어", "interior-small-room-mirror", "작은 방 거울 배치", "채광 반사", "동선", "수면 위치", "벽 손상", "/feng-shui", "방 분위기 테스트 보기"],
  ["풍수지리", "feng-entrance-light-routine", "현관 조명 풍수", "첫인상", "신발 정리", "밝기", "외출 동선", "/feng-shui", "풍수 테스트 보기"],
  ["풍수지리", "feng-bed-window-distance", "침대와 창문 거리", "수면 안정", "바람길", "커튼", "머리 방향", "/feng-shui", "침실 성향 보기"],
  ["풍수지리", "feng-desk-back-wall", "책상 뒤 벽 배치", "집중감", "문 시야", "콘센트", "조명", "/feng-shui", "집중 공간 테스트 보기"],
  ["풍수지리", "feng-kitchen-fire-water", "주방 불과 물 배치", "가스레인지", "싱크대", "조리 동선", "청결", "/feng-shui", "주방 분위기 보기"],
  ["풍수지리", "feng-plant-small-room", "작은 방 식물 배치", "채광", "습도", "동선", "관리 난이도", "/feng-shui", "식물 배치 보기"],
  ["풍수지리", "feng-mirror-entrance-check", "현관 거울 위치", "외출 확인", "빛 반사", "동선", "수납장", "/feng-shui", "현관 풍수 보기"],
  ["풍수지리", "feng-color-zone-room", "방 색상 구역", "휴식 공간", "업무 공간", "조명", "가구 톤", "/feng-shui", "색상 성향 보기"],
  ["풍수지리", "feng-clutter-energy-flow", "잡동사니 정리 풍수", "바닥 물건", "수납 한계", "환기", "청소 루틴", "/feng-shui", "정리 성향 테스트 보기"],
  ["풍수지리", "feng-balcony-air-path", "베란다 바람길", "창문 개방", "빨래 건조", "습기", "식물 위치", "/feng-shui", "바람길 점검 보기"],
  ["풍수지리", "feng-sleep-light-noise", "수면 빛 소음 균형", "암막 커튼", "소음원", "침대 위치", "휴식 루틴", "/feng-shui", "수면 공간 보기"],
];

const titleTemplates = [
  (main, angle) => `${main}: ${angle}부터 보는 순서`,
  (main, angle) => `${main} 비용 아끼는 ${angle} 질문`,
  (main, angle) => `${main}에서 놓치기 쉬운 ${angle}`,
  (main, angle) => `${main} 비교 전 보는 ${angle}`,
  (main, angle) => `${main} FAQ: ${angle}에서 막히는 질문`,
];

const sectionTemplates = {
  checklist: (main, angle) => [
    `${angle} 기준을 먼저 적기`,
    `${main}에서 기록해야 할 항목`,
    "현장에서 바로 확인할 사진",
    "보류해야 하는 위험 신호",
    "오늘 바로 적용할 순서",
  ],
  "cost-saving": (main, angle) => [
    `${main} 총비용을 나누기`,
    `${angle}에서 새는 돈 찾기`,
    "줄이면 안 되는 비용 구분",
    "견적과 영수증 남기는 법",
    "다음 달 다시 볼 항목",
  ],
  "mistake-proof": (main, angle) => [
    `${angle}에서 자주 생기는 착각`,
    `${main}을 급하게 정하면 생기는 일`,
    "문자와 사진으로 남길 내용",
    "나중에 다투기 쉬운 지점",
    "실수 후 바로잡는 순서",
  ],
  comparison: (main, angle) => [
    `${main} 선택지를 나누기`,
    `${angle} 기준으로 비교하기`,
    "좋은 조건과 보류 조건",
    "생활 동선까지 함께 보기",
    "최종 선택 전 재확인",
  ],
  faq: (main, angle) => [
    `${main}에서 자주 묻는 질문`,
    `${angle} 답변부터 확인하기`,
    "상황별로 달라지는 항목",
    "공식 안내와 함께 볼 내용",
    "마지막 점검 질문",
  ],
};

const excerptTemplates = {
  checklist: (main, angle, third, fourth) =>
    `${main}${topic(main)} ${withObject(angle)} 먼저 정해야 뒤늦은 확인을 줄일 수 있습니다. ${withAnd(third)} ${fourth}까지 한 번에 볼 수 있도록 현장 순서로 정리했습니다.`,
  "cost-saving": (main, angle, third, fourth) =>
    `${main}에서 비용이 커지는 지점은 대개 ${withObject(angle)} 늦게 묻는 순간입니다. ${third}, ${withObject(fourth)} 나눠 보고 줄일 비용과 줄이면 안 되는 비용을 구분합니다.`,
  "mistake-proof": (main, angle, third, fourth) =>
    `${main}${topic(main)} ${angle}만 믿고 넘기면 나중에 설명이 달라질 수 있습니다. ${withAnd(third)} ${withObject(fourth)} 기록으로 남기는 방식까지 함께 정리했습니다.`,
  comparison: (main, angle, third, fourth) =>
    `${withObject(main)} 비교할 때는 ${angle} 하나로 판단하지 않는 편이 안전합니다. ${third}, ${fourth}, 생활 동선을 함께 보며 보류 신호를 가릅니다.`,
  faq: (main, angle, third, fourth) =>
    `${withObject(main)} 처음 확인할 때 자주 막히는 질문을 ${angle}부터 풀었습니다. ${withAnd(third)} ${fourth}까지 이어서 확인하면 결정 기준이 분명해집니다.`,
};

function hasBatchim(value) {
  const charCode = value.charCodeAt(value.length - 1);
  if (charCode < 0xac00 || charCode > 0xd7a3) return false;
  return (charCode - 0xac00) % 28 !== 0;
}

function topic(value) {
  return hasBatchim(value) ? "은" : "는";
}

function object(value) {
  return hasBatchim(value) ? "을" : "를";
}

function and(value) {
  return hasBatchim(value) ? "과" : "와";
}

function withObject(value) {
  return `${value}${object(value)}`;
}

function withAnd(value) {
  return `${value}${and(value)}`;
}

function normalizeTitle(value) {
  return value
    .replace(/[0-9~!@#$%^&*()[\]{}:;'"“”‘’.,·?/\\+-]/g, "")
    .replace(/[^\p{Letter}\p{Number}가-힣]/gu, "")
    .replace(/체크리스트|가이드|기준|방법|순서|정리|비교|FAQ|faq|확인하기|질문/g, "")
    .toLowerCase();
}

function countChars(value) {
  return Array.from(value).length;
}

function extractExistingValues() {
  const values = new Set();
  const normalizedTitles = new Set();
  const files = [
    "data/blog-posts.ts",
    "data/guides.ts",
    ...Array.from({ length: START_BATCH - 1 }, (_, index) => `data/blog-expansion/batch-${String(index + 1).padStart(2, "0")}.ts`),
    ...Array.from({ length: 20 }, (_, index) => `data/guide-expansion/batch-${String(index + 1).padStart(2, "0")}.ts`),
  ];

  for (const file of files) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    const text = readFileSync(path, "utf8");
    for (const match of text.matchAll(/(?:slug|title):\s*["']([^"']+)["']/g)) {
      values.add(match[1]);
      if (!/^[a-z0-9-]+$/.test(match[1])) normalizedTitles.add(normalizeTitle(match[1]));
    }
  }

  return { values, normalizedTitles };
}

function assertUniqueArticle(article, seenValues, seenNormalizedTitles) {
  if (seenValues.has(article.slug)) throw new Error(`duplicate slug: ${article.slug}`);
  if (seenValues.has(article.title)) throw new Error(`duplicate title: ${article.title}`);

  const normalized = normalizeTitle(article.title);
  if (normalized.length >= 10 && seenNormalizedTitles.has(normalized)) {
    throw new Error(`near duplicate title: ${article.title}`);
  }

  if (countChars(article.title) > 44) {
    throw new Error(`title too long (${countChars(article.title)}): ${article.title}`);
  }

  seenValues.add(article.slug);
  seenValues.add(article.title);
  seenNormalizedTitles.add(normalized);
}

function createArticle(cluster, variantIndex) {
  const [category, slugBase, mainKeyword, secondKeyword, thirdKeyword, fourthKeyword, fifthKeyword, href, label] = cluster;
  const type = contentTypes[variantIndex];
  const angle = [secondKeyword, thirdKeyword, fourthKeyword, fifthKeyword, "상황별 기준"][variantIndex];
  const keywords = [mainKeyword, angle, secondKeyword, thirdKeyword, fourthKeyword, fifthKeyword]
    .filter((keyword, index, self) => self.indexOf(keyword) === index)
    .slice(0, 5);

  if (keywords.length !== 5) {
    throw new Error(`keyword generation failed for ${slugBase}-${suffixes[variantIndex]}`);
  }

  return {
    slug: `${slugBase}-${suffixes[variantIndex]}`,
    title: titleTemplates[variantIndex](mainKeyword, angle),
    excerpt: excerptTemplates[type](mainKeyword, angle, thirdKeyword, fourthKeyword),
    category,
    contentType: type,
    keywords,
    sections: sectionTemplates[type](mainKeyword, angle),
    primaryLink: { href, label },
  };
}

function formatArticle(article) {
  return `  {
    slug: "${article.slug}",
    title: "${article.title}",
    excerpt: "${article.excerpt}",
    category: "${article.category}",
    contentType: "${article.contentType}",
    keywords: [${article.keywords.map((keyword) => `"${keyword}"`).join(", ")}],
    sections: [${article.sections.map((section) => `"${section}"`).join(", ")}],
    primaryLink: { href: "${article.primaryLink.href}", label: "${article.primaryLink.label}" },
  }`;
}

function writeBatch(batchNumber, articles) {
  const batchId = String(batchNumber).padStart(2, "0");
  const content = `import { createQualityExpansionPosts, type QualityArticleSeed } from "./high-quality-content-factory";

const seeds: QualityArticleSeed[] = [
${articles.map(formatArticle).join(",\n")}
];

export const blogExpansionBatch${batchId} = createQualityExpansionPosts(seeds);
`;

  writeFileSync(join(EXPANSION_DIR, `batch-${batchId}.ts`), content, "utf8");
}

function writeIndex() {
  const batchNumbers = Array.from({ length: END_BATCH }, (_, index) => index + 1);
  const imports = batchNumbers
    .map((number) => {
      const batchId = String(number).padStart(2, "0");
      return `import { blogExpansionBatch${batchId} } from "./batch-${batchId}";`;
    })
    .join("\n");
  const spreads = batchNumbers
    .map((number) => `  ...blogExpansionBatch${String(number).padStart(2, "0")},`)
    .join("\n");

  writeFileSync(
    join(EXPANSION_DIR, "index.ts"),
    `${imports}\n\nexport const expandedBlogDrafts = [\n${spreads}\n];\n`,
    "utf8",
  );
}

const { values, normalizedTitles } = extractExistingValues();
const articles = clusters.flatMap((cluster) => contentTypes.map((_, variantIndex) => createArticle(cluster, variantIndex)));

if (articles.length !== 300) {
  throw new Error(`expected 300 generated articles, found ${articles.length}`);
}

for (const article of articles) {
  assertUniqueArticle(article, values, normalizedTitles);
}

for (let batchNumber = START_BATCH; batchNumber <= END_BATCH; batchNumber += 1) {
  const start = (batchNumber - START_BATCH) * POSTS_PER_BATCH;
  writeBatch(batchNumber, articles.slice(start, start + POSTS_PER_BATCH));
}

writeIndex();
console.log(`generated ${articles.length} articles in batch-${START_BATCH}..batch-${END_BATCH}`);

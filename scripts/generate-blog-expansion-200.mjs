import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const EXPANSION_DIR = join(ROOT, "data", "blog-expansion");
const START_BATCH = 21;
const END_BATCH = 60;
const POSTS_PER_BATCH = 5;

const contentTypes = ["checklist", "cost-saving", "mistake-proof", "comparison", "faq"];
const suffixes = ["checklist", "cost", "mistake", "compare", "faq"];

const clusters = [
  ["이사준비", "move-admin-docs", "이사 행정서류", "전입신고", "확정일자", "주소 변경", "우편물 이전", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-estimate-contract", "이사 견적 계약", "방문견적", "추가요금", "계약서 문구", "파손 보상", "/tools/moving-cost-calculator", "이사 비용 계산하기"],
  ["이사준비", "move-cleaning-check", "입주청소 점검", "청소 범위", "하자 사진", "곰팡이 확인", "환불 기준", "/guide", "주거 가이드 보기"],
  ["이사준비", "move-utility-transfer", "공과금 이전", "전기요금", "가스검침", "수도정산", "인터넷 이전", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-packing-order", "이삿짐 포장 순서", "깨지기 쉬운 짐", "첫날 박스", "라벨링", "분실 방지", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-elevator-parking", "이삿날 엘리베이터", "관리사무소", "주차 동선", "사다리차", "민원 예방", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-waste-disposal", "이사 폐기물 처리", "대형폐기물", "종량제봉투", "재활용 요일", "수거 예약", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-day-final", "이사 당일 확인", "잔금 송금", "열쇠 인계", "계량기 사진", "하자 기록", "/checklist", "이사 체크리스트 보기"],
  ["이사준비", "move-after-settle", "이사 후 정리", "전입 완료", "택배 주소", "관리비 고지서", "동네 편의시설", "/neighborhood-test", "동네 적합도 테스트"],
  ["전세안전", "jeonse-registry-check", "등기부등본 확인", "갑구 을구", "근저당권", "소유자 일치", "신탁 등기", "/guide", "계약 가이드 보기"],
  ["전세안전", "jeonse-insurance-condition", "전세보증보험 조건", "HUG 가입", "보증한도", "임대인 동의", "반환보증", "/safety-check", "전세 안전진단 보기"],
  ["전세안전", "jeonse-contract-special", "전세 특약 문구", "대출 불가", "권리변동 금지", "체납 확인", "보증보험 불가", "/guide", "계약서 가이드 보기"],
  ["전세안전", "jeonse-deposit-risk", "깡통전세 위험", "시세 확인", "선순위채권", "보증금 비율", "경매 배당", "/safety-check", "전세 안전진단 보기"],
  ["전세안전", "jeonse-landlord-tax", "임대인 체납 확인", "국세완납", "지방세완납", "열람 동의", "계약 전 서류", "/safety-check", "전세 안전진단 보기"],
  ["전세안전", "jeonse-loan-timing", "전세대출 일정", "사전심사", "잔금일", "은행 서류", "대출 특약", "/tools/deposit-interest-calculator", "이자 계산기 보기"],
  ["전세안전", "jeonse-renewal-safe", "전세 갱신 계약", "증액 한도", "확정일자", "계약갱신청구권", "보증보험 연장", "/guide", "계약 가이드 보기"],
  ["전세안전", "jeonse-moveout-return", "전세금 반환 준비", "내용증명", "임차권등기", "퇴거 일정", "보증기관 청구", "/safety-check", "전세 안전진단 보기"],
  ["전세안전", "jeonse-broker-check", "공인중개사 확인", "등록번호", "중개보수", "설명서", "책임보험", "/tools/brokerage-fee-calculator", "중개수수료 계산하기"],
  ["생활꿀팁", "living-one-room-noise", "원룸 소음 체크", "벽간소음", "층간소음", "도로 소음", "방문 시간", "/neighborhood-test", "동네 적합도 테스트"],
  ["생활꿀팁", "living-utility-bills", "자취 공과금 관리", "전기요금", "가스요금", "수도요금", "자동이체", "/tools", "생활 도구 보기"],
  ["생활꿀팁", "living-trash-calendar", "분리수거 요일표", "재활용", "음식물쓰레기", "종량제", "배출 시간", "/checklist", "생활 체크리스트 보기"],
  ["생활꿀팁", "living-mold-humidity", "원룸 습기 관리", "제습기", "환기 시간", "곰팡이", "창문 결로", "/guide", "주거 가이드 보기"],
  ["생활꿀팁", "living-delivery-address", "택배 주소 관리", "공동현관", "무인택배함", "배송 메모", "분실 예방", "/checklist", "생활 체크리스트 보기"],
  ["생활꿀팁", "living-shared-space-rule", "쉐어하우스 생활 규칙", "공용주방", "청소 순번", "공동비", "냉장고 공간", "/guide", "주거 가이드 보기"],
  ["생활꿀팁", "living-security-window", "원룸 방범 체크", "방범창", "도어락", "CCTV", "골목 조명", "/safety-check", "안전진단 보기"],
  ["생활꿀팁", "living-season-maintenance", "계절별 집 관리", "여름 냉방", "겨울 난방", "환기", "벌레 예방", "/feng-shui", "집 분위기 테스트 보기"],
  ["금융/절약", "saving-rent-budget", "월세 예산 짜기", "고정비", "관리비", "교통비", "비상금", "/tools/deposit-interest-calculator", "이자 계산기 보기"],
  ["금융/절약", "saving-management-fee", "관리비 명세서", "공용전기", "수도요금", "청소비", "인터넷 포함", "/tools", "생활비 도구 보기"],
  ["금융/절약", "saving-brokerage-fee", "중개수수료 절약", "요율표", "상한요율", "월세 환산", "현금영수증", "/tools/brokerage-fee-calculator", "중개수수료 계산하기"],
  ["금융/절약", "saving-moving-cost", "이사비 절약", "비수기", "짐 줄이기", "방문견적", "추가요금", "/tools/moving-cost-calculator", "이사비 계산기 보기"],
  ["금융/절약", "saving-option-cost", "풀옵션 비용", "가전 수리", "소모품", "초기비용", "퇴실 정산", "/tools", "생활비 도구 보기"],
  ["금융/절약", "saving-subscription-cleanup", "자취 구독비 정리", "인터넷", "OTT", "정기배송", "자동결제", "/tools", "생활비 도구 보기"],
  ["인테리어", "interior-small-storage", "원룸 수납 배치", "침대 밑 수납", "벽선반", "동선 확보", "계절짐", "/guide", "주거 가이드 보기"],
  ["인테리어", "interior-lighting-zone", "자취방 조명 배치", "간접조명", "책상 조도", "수면등", "전기요금", "/feng-shui", "집 분위기 테스트 보기"],
  ["인테리어", "interior-desk-layout", "작은 방 책상 배치", "콘센트 위치", "창문 빛", "의자 동선", "집중 공간", "/guide", "주거 가이드 보기"],
  ["인테리어", "interior-rental-safe", "월세집 인테리어", "무타공 선반", "원상복구", "접착 후크", "계약 특약", "/guide", "주거 가이드 보기"],
  ["인테리어", "interior-kitchen-organize", "원룸 주방 정리", "싱크대 수납", "냄새 관리", "조리도구", "분리수거", "/guide", "주거 가이드 보기"],
  ["풍수지리", "feng-bedroom-layout", "침대 위치 풍수", "문 방향", "창문 위치", "수면 동선", "거울 배치", "/feng-shui", "집 풍수 테스트 보기"],
  ["풍수지리", "feng-desk-energy", "책상 방향 풍수", "집중력", "채광", "벽면 배치", "동선 정리", "/feng-shui", "집 풍수 테스트 보기"],
  ["풍수지리", "feng-entrance-clean", "현관 정리 풍수", "신발장", "조명", "우산 보관", "첫인상", "/feng-shui", "집 풍수 테스트 보기"],
];

const titleTemplates = [
  (main, angle) => `${main}, ${angle} 먼저 보는 법`,
  (main, angle) => `${main} 비용 줄이는 ${angle} 기준`,
  (main, angle) => `${main} 실수 막는 ${angle} 순서`,
  (main, angle) => `${main} 비교할 때 ${angle}부터`,
  (main, angle) => `${main} FAQ, ${angle} 핵심 답변`,
  (main, angle) => `${main} 계약 전 ${angle} 확인법`,
  (main, angle) => `${main} 실패 줄이는 ${angle} 체크`,
  (main, angle) => `${main} 현장 점검 ${angle} 포인트`,
  (main, angle) => `${main} 선택 전 ${angle} 질문`,
  (main, angle) => `${main} 관리 기준, ${angle}까지`,
  (main, angle) => `${main} 빠뜨리기 쉬운 ${angle}`,
  (main, angle) => `${main} 초보자가 보는 ${angle}`,
  (main, angle) => `${main} 보류 신호와 ${angle}`,
  (main, angle) => `${main} 서류·사진 ${angle} 정리`,
  (main, angle) => `${main} 한 달 뒤 보는 ${angle}`,
  (main, angle) => `${main} 후회 줄이는 ${angle}`,
  (main, angle) => `${main} 좋은 조건 ${angle} 판별`,
  (main, angle) => `${main} 숨은 비용 ${angle} 찾기`,
  (main, angle) => `${main} 바로 묻는 ${angle} 질문`,
  (main, angle) => `${main} 마지막 점검 ${angle}`,
];

const sectionTemplates = {
  checklist: (main, angle) => [
    `1. ${angle} 기준 먼저 세우기`,
    `2. ${main}에서 문서로 남길 것`,
    "3. 현장에서 사진으로 확인할 항목",
    "4. 보류해야 할 위험 신호",
    "5. 오늘 바로 적용할 순서",
  ],
  "cost-saving": (main, angle) => [
    `1. ${main} 총비용 나누기`,
    `2. ${angle}에서 새는 지출 찾기`,
    "3. 줄여도 되는 비용과 안 되는 비용",
    "4. 견적서에 남길 문장",
    "5. 다음 달 다시 볼 항목",
  ],
  "mistake-proof": (main, angle) => [
    `1. ${angle}에서 생기는 착각`,
    `2. ${main}을 급하게 정하면 생기는 일`,
    "3. 담당자 답변 기록법",
    "4. 나중에 다투는 지점",
    "5. 실수 후 바로잡는 순서",
  ],
  comparison: (main, angle) => [
    `1. ${main} 선택지 나누기`,
    `2. ${angle} 기준으로 비교하기`,
    "3. 좋은 조건과 보류 조건",
    "4. 생활 동선까지 같이 보기",
    "5. 최종 선택 전 재확인",
  ],
  faq: (main, angle) => [
    `1. ${main}에서 자주 묻는 질문`,
    `2. ${angle} 답변 확인하기`,
    "3. 상황별로 달라지는 항목",
    "4. 공식 안내와 함께 볼 것",
    "5. 마지막 점검 질문",
  ],
};

function normalizeTitle(value) {
  return value
    .replace(/[0-9~!@#$%^&*()[\]{}:;'"“”‘’.,?·ㆍ|/\\+-]/g, "")
    .replace(/[^\p{Letter}\p{Number}가-힣]/gu, "")
    .replace(/체크리스트|가이드|기준|방법|순서|정리|비교|FAQ|faq|확인법|포인트|질문/g, "")
    .toLowerCase();
}

function extractExistingValues() {
  const values = new Set();
  const normalizedTitles = new Set();
  const dataFiles = [
    "data/blog-posts.ts",
    "data/guides.ts",
    ...Array.from({ length: 20 }, (_, index) => `data/blog-expansion/batch-${String(index + 1).padStart(2, "0")}.ts`),
    ...Array.from({ length: 10 }, (_, index) => `data/guide-expansion/batch-${String(index + 1).padStart(2, "0")}.ts`),
  ];

  for (const file of dataFiles) {
    const path = join(ROOT, file);
    let text = "";
    try {
      text = readFileSync(path, "utf8");
    } catch {
      continue;
    }

    for (const match of text.matchAll(/(?:slug|title):\s*["']([^"']+)["']/g)) {
      values.add(match[1]);
      if (!/^[a-z0-9-]+$/.test(match[1])) normalizedTitles.add(normalizeTitle(match[1]));
    }
  }

  return { values, normalizedTitles };
}

function countChars(value) {
  return Array.from(value).length;
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

function createTitle(mainKeyword, angle, clusterIndex, variantIndex) {
  const template = titleTemplates[(clusterIndex * contentTypes.length + variantIndex) % titleTemplates.length];
  const title = template(mainKeyword, angle)
    .replace("계약 계약 전", "계약 전")
    .replace("공과금 이전 바로 묻는 인터넷 이전 질문", "공과금 이전, 인터넷 이전 묻기")
    .replace("순서 실수 막는 라벨링 순서", "라벨링 실수 막는 순서")
    .replace("선택 전 계약 전 서류 질문", "계약 서류 최종 질문")
    .replace("보류 신호와 도로 소음", "도로 소음 보류 신호")
    .replace("관리 관리 기준", "관리 기준")
    .replace("원룸 수납 배치, 침대 밑 수납 먼저 보는 법", "원룸 수납 배치, 침대 밑부터 보기")
    .replace("실패 줄이는 창문 위치 체크", "창문 위치 실패 줄이는 체크")
    .replace("서류·사진 동선 정리 정리", "동선 정리 사진 기록법");
  if (countChars(title) <= 44) return title;
  return `${mainKeyword}, ${angle} 기준`;
}

function createArticle(cluster, clusterIndex, variantIndex) {
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
    title: createTitle(mainKeyword, angle, clusterIndex, variantIndex),
    excerpt: `${mainKeyword}를 판단할 때 ${angle}만 보면 놓치는 지점이 있습니다. 비용, 책임, 기록, 보류 신호까지 함께 보는 실전 가이드입니다.`,
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
const articles = clusters.flatMap((cluster, clusterIndex) =>
  contentTypes.map((_, variantIndex) => createArticle(cluster, clusterIndex, variantIndex)),
);

if (articles.length !== 200) {
  throw new Error(`expected 200 generated articles, found ${articles.length}`);
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

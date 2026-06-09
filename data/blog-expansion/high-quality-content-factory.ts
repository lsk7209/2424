import type { BlogPost } from "../blog-posts";

type BlogCategory = BlogPost["category"];
type ArticleType = "checklist" | "cost-saving" | "mistake-proof" | "comparison" | "faq";

export interface QualityArticleSeed {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  contentType: ArticleType;
  keywords: [string, string, string, string, string];
  sections: [string, string, string, string, string];
  sectionContents?: [string, string, string, string, string];
  primaryLink: {
    href: string;
    label: string;
  };
}

const CATEGORY_CONTEXT: Record<
  BlogCategory,
  {
    reader: string;
    risk: string;
    officialHref: string;
    officialLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
    evidence: string;
    disclaimer: string;
  }
> = {
  이사준비: {
    reader: "이사 일정을 앞둔 사람",
    risk: "예약 누락, 추가요금, 이삿날 동선 혼선",
    officialHref: "https://www.gov.kr",
    officialLabel: "정부24 생활민원 안내",
    secondaryHref: "/checklist",
    secondaryLabel: "이사 체크리스트 보기",
    evidence: "예약 문자, 견적서, 현장 사진, 관리실 안내문",
    disclaimer: "지역, 건물 규칙, 업체 약관에 따라 실제 처리 방식은 달라질 수 있습니다.",
  },
  생활꿀팁: {
    reader: "자취와 생활비를 직접 관리하는 사람",
    risk: "반복 지출, 냄새·습기·소음 같은 생활 불편",
    officialHref: "https://www.consumer.go.kr",
    officialLabel: "소비자24 피해 예방 정보",
    secondaryHref: "/tools",
    secondaryLabel: "생활 계산기 모아보기",
    evidence: "사용 전후 사진, 월별 비용 내역, 관리실 문의 기록",
    disclaimer: "생활 팁은 집 구조와 관리 규정에 따라 효과가 달라질 수 있습니다.",
  },
  전세안전: {
    reader: "계약 전 보증금 안전을 확인하려는 세입자",
    risk: "보증금 손실, 권리관계 착오, 계약 조건 누락",
    officialHref: "https://www.molit.go.kr",
    officialLabel: "국토교통부 주거정책 안내",
    secondaryHref: "/safety-check",
    secondaryLabel: "전세 안전진단 계산기",
    evidence: "등기부등본, 건축물대장, 계약서, 송금 기록",
    disclaimer: "전세·계약 판단은 참고용 정보이며, 실제 계약 전에는 공인중개사·법률 전문가 확인이 필요합니다.",
  },
  풍수지리: {
    reader: "집의 분위기와 생활 동선을 함께 보는 사람",
    risk: "공간 배치 불편, 수면 리듬 저하, 환기 부족",
    officialHref: "https://www.kma.go.kr",
    officialLabel: "기상청 생활기상 정보",
    secondaryHref: "/feng-shui",
    secondaryLabel: "집 풍수 테스트 보기",
    evidence: "채광 시간, 창문 위치, 동선 사진, 수면 기록",
    disclaimer: "풍수 관점은 생활 동선을 정리하는 참고 기준이며 과학적 효과를 보장하지 않습니다.",
  },
  인테리어: {
    reader: "작은 집을 깔끔하게 쓰려는 1인 가구",
    risk: "수납 부족, 동선 막힘, 퇴실 원상복구 비용",
    officialHref: "https://www.consumer.go.kr",
    officialLabel: "소비자24 제품 안전 정보",
    secondaryHref: "/guide",
    secondaryLabel: "주거 가이드 더 보기",
    evidence: "설치 전후 사진, 제품 규격, 벽면 상태, 퇴실 기준",
    disclaimer: "임대주택은 계약서와 관리 규정을 먼저 확인한 뒤 설치 여부를 정해야 합니다.",
  },
  "금융/절약": {
    reader: "주거비와 생활비를 줄이려는 사람",
    risk: "숨은 비용, 자동결제 누락, 과소비",
    officialHref: "https://www.fss.or.kr",
    officialLabel: "금융감독원 금융소비자 정보",
    secondaryHref: "/tools/deposit-interest-calculator",
    secondaryLabel: "예금 이자 계산기 보기",
    evidence: "월별 입출금 내역, 영수증, 계약서, 자동이체 목록",
    disclaimer: "금융·비용 정보는 개인 조건에 따라 달라지므로 최종 결정 전 공식 안내를 확인해야 합니다.",
  },
};

const TYPE_CONTEXT: Record<
  ArticleType,
  {
    summaryTitle: string;
    comparisonTitle: string;
    checklistTitle: string;
    closingTitle: string;
    angle: string;
  }
> = {
  checklist: {
    summaryTitle: "3분 점검 요약",
    comparisonTitle: "현장에서 바로 나누는 기준",
    checklistTitle: "실행 순서 체크리스트",
    closingTitle: "체크리스트 결론",
    angle: "무엇을 먼저 확인해야 하는지",
  },
  "cost-saving": {
    summaryTitle: "비용 절약 요약",
    comparisonTitle: "줄일 비용과 줄이면 안 되는 비용",
    checklistTitle: "지출 방어 체크리스트",
    closingTitle: "절약 기준 결론",
    angle: "돈이 새는 지점을 어떻게 막을지",
  },
  "mistake-proof": {
    summaryTitle: "실수 예방 요약",
    comparisonTitle: "자주 틀리는 지점 비교",
    checklistTitle: "실수 차단 체크리스트",
    closingTitle: "실수 예방 결론",
    angle: "나중에 분쟁이 되는 지점을 어떻게 남길지",
  },
  comparison: {
    summaryTitle: "비교 판단 요약",
    comparisonTitle: "선택지 비교표",
    checklistTitle: "최종 선택 체크리스트",
    closingTitle: "비교 결론",
    angle: "좋은 조건과 보류 조건을 어떻게 가를지",
  },
  faq: {
    summaryTitle: "질문별 핵심 답변",
    comparisonTitle: "질문이 갈리는 기준",
    checklistTitle: "답변 확인 체크리스트",
    closingTitle: "FAQ 결론",
    angle: "자주 묻는 질문에 어떤 순서로 답할지",
  },
};

const HOOKS = [
  "처음에는 사소해 보여도 실제 일정이 다가오면 가장 먼저 비용과 시간으로 돌아오는 항목입니다.",
  "검색으로는 쉽게 보이지만 현장에서는 말로만 확인하고 넘어가서 문제가 되는 경우가 많습니다.",
  "잘한 선택과 아쉬운 선택의 차이는 큰 정보가 아니라 작은 기록을 남겼는지에서 갈립니다.",
  "한 번 정하면 되돌리기 어려운 일일수록 판단 기준을 미리 적어두는 편이 안전합니다.",
  "초보자가 놓치기 쉬운 부분은 대개 마지막 순간에 확인하려고 미룬 항목입니다.",
] as const;

const SECTION_OPENERS = [
  "이 단계에서는 설명을 많이 듣는 것보다 실제로 남는 자료를 먼저 봐야 합니다.",
  "겉으로 보기에는 비슷해도 생활에 들어가면 차이가 커지는 지점이 있습니다.",
  "계약이나 예약 전에 한 번 더 묻는 것만으로도 나중의 분쟁을 줄일 수 있습니다.",
  "좋은 조건은 말보다 문서, 사진, 금액처럼 다시 확인 가능한 형태로 남습니다.",
  "마지막 결정 전에는 편의보다 반복되는 비용과 책임 범위를 먼저 봐야 합니다.",
] as const;

function hashText(value: string) {
  return Array.from(value).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function pick<T>(items: readonly T[], seed: string, offset = 0) {
  return items[(hashText(seed) + offset) % items.length];
}

function hasBatchim(value: string) {
  const charCode = value.charCodeAt(value.length - 1);
  if (charCode < 0xac00 || charCode > 0xd7a3) return false;
  return (charCode - 0xac00) % 28 !== 0;
}

function topic(value: string) {
  return hasBatchim(value) ? "은" : "는";
}

function subject(value: string) {
  return hasBatchim(value) ? "이" : "가";
}

function object(value: string) {
  return hasBatchim(value) ? "을" : "를";
}

function withTopic(value: string) {
  return `${value}${topic(value)}`;
}

function withSubject(value: string) {
  return `${value}${subject(value)}`;
}

function withObject(value: string) {
  return `${value}${object(value)}`;
}

function createFaq(seed: QualityArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword, fifthKeyword] = seed.keywords;
  const context = CATEGORY_CONTEXT[seed.category];

  return [
    {
      question: `${mainKeyword}은 언제 확인하는 게 좋나요?`,
      answer: `${mainKeyword}은 결제, 계약, 예약처럼 되돌리기 어려운 결정 전에 확인하는 편이 좋습니다. 특히 ${secondKeyword}와 ${thirdKeyword}는 나중에 비용이나 책임 범위로 이어질 수 있어 초반 기준을 세워야 합니다.`,
    },
    {
      question: `${secondKeyword}만 보면 충분한가요?`,
      answer: `아닙니다. ${secondKeyword}가 좋아 보여도 ${fourthKeyword}와 ${fifthKeyword}가 불분명하면 보류하는 편이 안전합니다. 조건이 좋을수록 말로만 확인하지 말고 ${context.evidence}처럼 다시 볼 수 있는 자료를 남기세요.`,
    },
    {
      question: `기록은 어디까지 남겨야 하나요?`,
      answer: `최소한 날짜, 금액, 담당자, 위치, 변경 조건은 남겨야 합니다. 사진은 전체 장면과 세부 장면을 함께 찍고, 문자나 메모에는 왜 그 결정을 했는지 한 줄로 적어두면 나중에 비교가 쉬워집니다.`,
    },
    {
      question: `바로 결정해도 되는 신호는 무엇인가요?`,
      answer: `비용, 책임, 일정, 예외 조건이 같은 방향으로 설명되고 증빙도 남길 수 있다면 진행해도 좋습니다. 반대로 답변이 매번 달라지거나 공식 기준과 다르면 한 번 더 확인해야 합니다.`,
    },
  ];
}

function renderSummary(seed: QualityArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword] = seed.keywords;
  const type = TYPE_CONTEXT[seed.contentType];

  return `
    <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8 not-prose">
      <p class="font-bold text-slate-900 mb-3">${type.summaryTitle}</p>
      <ul class="space-y-2 text-slate-700 text-sm md:text-base">
        <li>${withTopic(mainKeyword)} 한 항목만 보지 말고 조건, 시점, 기록을 함께 확인합니다.</li>
        <li>${withTopic(secondKeyword)} 당장 편해 보여도 반복 비용과 책임 범위를 같이 봐야 합니다.</li>
        <li>${withTopic(thirdKeyword)} 사진, 문자, 영수증처럼 다시 볼 수 있는 자료로 남겨야 합니다.</li>
      </ul>
    </div>`;
}

function renderComparison(seed: QualityArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword] = seed.keywords;
  const type = TYPE_CONTEXT[seed.contentType];

  return `
    <div class="overflow-x-auto my-8 not-prose">
      <table class="w-full border-collapse text-sm md:text-base">
        <caption class="sr-only">${type.comparisonTitle}</caption>
        <thead>
          <tr class="bg-slate-100 text-slate-900">
            <th class="border border-slate-200 p-3 text-left">비교 항목</th>
            <th class="border border-slate-200 p-3 text-left">진행해도 좋은 신호</th>
            <th class="border border-slate-200 p-3 text-left">보류해야 할 신호</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-200 p-3">${mainKeyword}</td>
            <td class="border border-slate-200 p-3">기준과 비용이 문서로 남아 있음</td>
            <td class="border border-slate-200 p-3">말로만 설명하고 근거가 부족함</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-3">${secondKeyword}</td>
            <td class="border border-slate-200 p-3">추가 조건과 예외가 미리 정리됨</td>
            <td class="border border-slate-200 p-3">추가 비용이 나중에 정해진다고 함</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-3">${thirdKeyword}</td>
            <td class="border border-slate-200 p-3">${fourthKeyword}까지 함께 확인됨</td>
            <td class="border border-slate-200 p-3">사진, 날짜, 담당자 기록이 없음</td>
          </tr>
        </tbody>
      </table>
    </div>`;
}

function renderChecklist(seed: QualityArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword, fifthKeyword] = seed.keywords;
  const type = TYPE_CONTEXT[seed.contentType];

  return `
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8 not-prose">
      <p class="font-bold text-blue-900 mb-3">${type.checklistTitle}</p>
      <ul class="space-y-2 text-blue-900 text-sm md:text-base">
        <li>${mainKeyword} 판단 기준을 한 문장으로 적었다.</li>
        <li>${secondKeyword} 비용과 책임 범위를 확인했다.</li>
        <li>${thirdKeyword} 관련 사진이나 캡처를 남겼다.</li>
        <li>${withSubject(fourthKeyword)} 애매하면 보류할 기준을 정했다.</li>
        <li>${withObject(fifthKeyword)} 계약서, 견적서, 문자 중 하나로 다시 확인했다.</li>
      </ul>
    </div>`;
}

const SOURCE_RULES = [
  {
    patterns: ["전세", "보증보험", "보증금", "HUG", "갱신", "퇴거", "경매"],
    href: "https://www.khug.or.kr",
    label: "HUG 전세보증 안내",
    note: "보증금과 보증보험 조건은 기관 공지와 상품 조건을 함께 확인해야 합니다.",
  },
  {
    patterns: ["등기부", "소유자", "근저당", "권리", "압류", "가압류"],
    href: "https://www.iros.go.kr",
    label: "인터넷등기소 등기 열람",
    note: "등기사항은 발급 시점 기준으로 다시 확인해야 합니다.",
  },
  {
    patterns: ["건축물대장", "위반건축물", "용도", "면적"],
    href: "https://www.gov.kr",
    label: "정부24 건축물대장 안내",
    note: "건축물대장은 주소, 용도, 면적, 위반 여부 확인에 활용합니다.",
  },
  {
    patterns: ["중개", "중개보수", "공인중개", "수수료", "계약"],
    href: "https://www.molit.go.kr",
    label: "국토교통부 부동산 거래 안내",
    note: "중개보수와 설명 의무는 거래 유형별 기준이 다릅니다.",
  },
  {
    patterns: ["월세", "예금", "이자", "자동이체", "금융", "생활비"],
    href: "https://www.fss.or.kr",
    label: "금융감독원 금융소비자 정보",
    note: "금융 조건은 개인 상황과 상품 조건에 따라 달라질 수 있습니다.",
  },
  {
    patterns: ["수리", "제품", "가전", "견적", "청소", "파손", "보관"],
    href: "https://www.consumer.go.kr",
    label: "소비자24 피해 예방 정보",
    note: "서비스와 제품 분쟁은 계약 조건, 사진, 영수증 같은 증빙이 중요합니다.",
  },
  {
    patterns: ["전입신고", "주소", "주민센터", "민원", "배송"],
    href: "https://www.gov.kr",
    label: "정부24 생활민원 안내",
    note: "민원 처리 방식은 지역과 기관 운영 기준에 따라 달라질 수 있습니다.",
  },
  {
    patterns: ["비", "결로", "습기", "환기", "동파", "창문", "건조"],
    href: "https://www.kma.go.kr",
    label: "기상청 생활기상 정보",
    note: "습기와 결로는 계절, 환기, 실내외 온도 차의 영향을 크게 받습니다.",
  },
] as const;

function getSourceContext(seed: QualityArticleSeed) {
  const category = CATEGORY_CONTEXT[seed.category];
  const haystack = [seed.title, seed.excerpt, seed.category, ...seed.keywords, ...seed.sections].join(" ");
  const matched = SOURCE_RULES.find((rule) => rule.patterns.some((pattern) => haystack.includes(pattern)));

  return {
    href: matched?.href ?? category.officialHref,
    label: matched?.label ?? category.officialLabel,
    note: matched?.note ?? category.disclaimer,
  };
}

function renderSourceBox(seed: QualityArticleSeed) {
  const context = CATEGORY_CONTEXT[seed.category];
  const source = getSourceContext(seed);
  const disclaimer = source.note === context.disclaimer ? "" : ` ${context.disclaimer}`;

  return `
    <aside class="rounded-xl border border-slate-200 bg-white p-6 my-10 not-prose">
      <p class="text-sm font-bold text-blue-700">공식 기준 함께 확인</p>
      <p class="mt-2 text-slate-700 leading-7">${source.note}${disclaimer}</p>
      <a href="${source.href}" rel="noopener noreferrer" target="_blank" class="mt-3 inline-flex font-bold text-blue-600 hover:underline">${source.label}</a>
    </aside>`;
}

function renderSection(seed: QualityArticleSeed, title: string, index: number) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword, fifthKeyword] = seed.keywords;
  const context = CATEGORY_CONTEXT[seed.category];
  const opener = pick(SECTION_OPENERS, seed.slug, index);
  const showComparison = index === 1 || seed.contentType === "comparison";
  const showChecklist = index === 3 || seed.contentType === "checklist";

  return `
    <h2>${title}</h2>
    <p>${opener} ${context.reader}에게 ${withTopic(mainKeyword)} 작은 선택처럼 보여도 실제로는 ${withObject(context.risk)} 좌우합니다. 그래서 ${withObject(secondKeyword)} 볼 때는 지금 좋은 조건인지보다 나중에 같은 조건을 다시 확인할 수 있는지를 먼저 봐야 합니다.</p>
    <p>${withTopic(thirdKeyword)} 구두 설명만으로 끝내면 비교가 어렵습니다. 사진, 날짜, 금액, 담당자 이름을 함께 남기고 ${fourthKeyword}까지 연결해서 보면 판단이 훨씬 분명해집니다. ${withSubject(fifthKeyword)} 애매하면 바로 결정하지 말고 보류 기준을 먼저 세우세요.</p>
    <p>실무적으로는 전체 장면을 한 번 찍고, 문제가 될 수 있는 부분을 가까이에서 한 번 더 찍는 방식이 좋습니다. 문자로는 “언제, 누가, 어떤 조건으로 확인했는지”를 남기면 충분합니다. 이 정도만 해도 같은 설명을 다시 들어야 하는 상황을 줄일 수 있습니다.</p>
    ${showComparison ? renderComparison(seed) : ""}
    ${showChecklist ? renderChecklist(seed) : ""}
    <blockquote>
      <p>${mainKeyword}에서 망설여진다면 좋은 조건을 찾는 것보다 나쁜 조건을 걸러내는 질문부터 하세요. 답변이 일정하고 기록으로 남길 수 있으면 진행 가능성이 높고, 답변이 바뀌면 보류 신호입니다.</p>
    </blockquote>`;
}

function renderLinks(seed: QualityArticleSeed) {
  const context = CATEGORY_CONTEXT[seed.category];

  return `
    <div class="grid gap-4 md:grid-cols-2 my-10 not-prose">
      <a href="${seed.primaryLink.href}" class="block rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:bg-blue-50 transition-colors">
        <span class="text-xs font-bold text-blue-600">관련 도구</span>
        <p class="mt-2 font-bold text-slate-900">${seed.primaryLink.label}</p>
      </a>
      <a href="${context.secondaryHref}" class="block rounded-xl border border-slate-200 p-5 hover:border-green-300 hover:bg-green-50 transition-colors">
        <span class="text-xs font-bold text-green-600">함께 확인</span>
        <p class="mt-2 font-bold text-slate-900">${context.secondaryLabel}</p>
      </a>
    </div>`;
}

function renderContent(seed: QualityArticleSeed) {
  const context = CATEGORY_CONTEXT[seed.category];
  const type = TYPE_CONTEXT[seed.contentType];
  const [mainKeyword, secondKeyword] = seed.keywords;
  const hook = pick(HOOKS, seed.slug);

  return `
    <article class="prose prose-slate max-w-none">
      <p class="lead text-xl text-slate-600 font-medium">${seed.excerpt} ${hook}</p>
      ${renderSummary(seed)}
      <p>${seed.title}의 핵심은 ${withObject(type.angle)} 정하는 것입니다. ${withObject(mainKeyword)} 한 번에 해결하려고 하면 놓치는 부분이 생기기 쉽습니다. 대신 ${secondKeyword}, 비용, 책임, 기록을 나눠 보면 지금 결정해도 되는지 훨씬 빠르게 판단할 수 있습니다.</p>
      <p>이 글은 ${context.reader}가 실제로 확인할 수 있는 순서에 맞춰 정리했습니다. 전문적인 판단이 필요한 항목은 공식 자료를 함께 확인하고, 현장에서 바로 쓸 수 있는 기준은 체크리스트와 비교표로 남겼습니다.</p>
      ${seed.sections.map((section, index) => renderSection(seed, section, index)).join("")}
      ${renderSourceBox(seed)}
      ${renderLinks(seed)}
      <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-6 my-10 not-prose">
        <p class="font-bold text-indigo-900 mb-2">${type.closingTitle}</p>
        <p class="text-indigo-800 leading-7">오늘 바로 할 일은 많지 않습니다. 기준 한 줄을 적고, 확인할 사진을 남기고, 애매한 조건을 문자로 다시 묻는 것입니다. 이 세 가지가 있으면 ${mainKeyword}에서 생길 수 있는 실수 대부분을 계약 전이나 지출 전에 걸러낼 수 있습니다.</p>
      </div>
    </article>`;
}

export function createQualityExpansionPost(
  seed: QualityArticleSeed,
): Omit<BlogPost, "date" | "publishAt"> {
  return {
    slug: seed.slug,
    title: seed.title,
    excerpt: seed.excerpt,
    category: seed.category,
    keywords: [...seed.keywords],
    faq: createFaq(seed),
    content: renderContent(seed),
  };
}

export function createQualityExpansionPosts(seeds: QualityArticleSeed[]) {
  return seeds.map(createQualityExpansionPost);
}

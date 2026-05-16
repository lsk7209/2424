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
  }
> = {
  이사준비: {
    reader: "이사 일정을 앞둔 사람",
    risk: "예약 누락과 이삿날 혼선",
    officialHref: "https://www.gov.kr",
    officialLabel: "정부24 생활민원 안내",
    secondaryHref: "/checklist",
    secondaryLabel: "이사 체크리스트 보기",
  },
  생활꿀팁: {
    reader: "자취와 생활비를 직접 관리하는 사람",
    risk: "반복 지출과 생활 불편",
    officialHref: "https://www.consumer.go.kr",
    officialLabel: "소비자24 피해 예방 정보",
    secondaryHref: "/tools",
    secondaryLabel: "생활 계산기 모아보기",
  },
  전세안전: {
    reader: "계약 전 보증금 안전을 확인하려는 세입자",
    risk: "보증금 손실과 권리관계 착오",
    officialHref: "https://www.molit.go.kr",
    officialLabel: "국토교통부 주거정책 안내",
    secondaryHref: "/safety-check",
    secondaryLabel: "전세 안전진단 계산기",
  },
  풍수지리: {
    reader: "집의 분위기와 생활 동선을 함께 보는 사람",
    risk: "공간 배치 불편과 수면 리듬 저하",
    officialHref: "https://www.kma.go.kr",
    officialLabel: "기상청 생활기상 정보",
    secondaryHref: "/feng-shui",
    secondaryLabel: "집 풍수 테스트 보기",
  },
  인테리어: {
    reader: "작은 집을 깔끔하게 쓰려는 1인 가구",
    risk: "수납 부족과 원상복구 비용",
    officialHref: "https://www.consumer.go.kr",
    officialLabel: "소비자24 제품 안전 정보",
    secondaryHref: "/guide",
    secondaryLabel: "주거 가이드 더 보기",
  },
  "금융/절약": {
    reader: "주거비와 생활비를 줄이려는 사람",
    risk: "숨은 비용과 과소비",
    officialHref: "https://www.fss.or.kr",
    officialLabel: "금융감독원 금융소비자 정보",
    secondaryHref: "/tools/deposit-interest-calculator",
    secondaryLabel: "예금 이자 계산기 보기",
  },
};

const TYPE_CONTEXT: Record<
  ArticleType,
  {
    summaryTitle: string;
    comparisonTitle: string;
    checklistTitle: string;
    closingTitle: string;
    tableHeaders: [string, string, string];
  }
> = {
  checklist: {
    summaryTitle: "3분 점검 요약",
    comparisonTitle: "현장에서 바로 나누는 기준",
    checklistTitle: "확인 순서 체크리스트",
    closingTitle: "체크리스트 결론",
    tableHeaders: ["확인 항목", "진행해도 좋은 신호", "보류해야 할 신호"],
  },
  "cost-saving": {
    summaryTitle: "비용 절약 핵심",
    comparisonTitle: "줄일 비용과 줄이면 안 되는 비용",
    checklistTitle: "지출 방어 체크리스트",
    closingTitle: "절약 기준 결론",
    tableHeaders: ["비용 항목", "줄여도 되는 부분", "확인 없이 줄이면 위험한 부분"],
  },
  "mistake-proof": {
    summaryTitle: "실수 예방 요약",
    comparisonTitle: "자주 틀리는 지점 비교",
    checklistTitle: "실수 차단 체크리스트",
    closingTitle: "실수 예방 결론",
    tableHeaders: ["상황", "안전한 처리", "흔한 실수"],
  },
  comparison: {
    summaryTitle: "비교 판단 요약",
    comparisonTitle: "선택지 비교표",
    checklistTitle: "최종 선택 체크리스트",
    closingTitle: "비교 결론",
    tableHeaders: ["비교 항목", "유리한 조건", "다시 봐야 할 조건"],
  },
  faq: {
    summaryTitle: "질문별 핵심 답변",
    comparisonTitle: "질문이 갈리는 기준",
    checklistTitle: "답변 확인 체크리스트",
    closingTitle: "FAQ 결론",
    tableHeaders: ["질문", "짧은 답", "추가 확인"],
  },
};

const SECTION_OPENERS = [
  "이 단계에서는 설명을 많이 듣는 것보다 실제로 남는 자료를 먼저 봐야 합니다.",
  "겉으로 보기에는 비슷해도 생활에 들어가면 차이가 커지는 지점이 있습니다.",
  "계약이나 예약 전에 한 번 더 묻는 것만으로도 나중의 분쟁을 줄일 수 있습니다.",
  "좋은 조건은 말보다 문서, 사진, 금액처럼 확인 가능한 흔적으로 남습니다.",
  "마지막 결정 전에는 편의보다 반복되는 비용과 책임 범위를 다시 보는 편이 안전합니다.",
] as const;

function createFaq(seed: QualityArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword] = seed.keywords;

  return [
    {
      question: `${mainKeyword}는 언제 확인하는 게 가장 좋나요?`,
      answer: `${mainKeyword}는 계약, 예약, 구매처럼 되돌리기 어려운 결정을 하기 전에 확인하는 것이 좋습니다. 특히 ${secondKeyword}와 ${thirdKeyword}는 비용과 생활 만족도에 바로 영향을 주기 때문에 초반에 기준을 세워야 합니다.`,
    },
    {
      question: `${secondKeyword}가 좋아 보여도 보류해야 할 때가 있나요?`,
      answer: `네. ${secondKeyword}가 좋아 보여도 책임 범위, 추가 비용, 기록 방식이 불분명하면 보류하는 편이 낫습니다. 조건이 좋을수록 말로만 확인하지 말고 문자, 견적서, 계약서 문구로 남기는 것이 안전합니다.`,
    },
    {
      question: `${thirdKeyword}는 사진으로 남겨야 하나요?`,
      answer: `${thirdKeyword}는 가능하면 사진이나 캡처로 남겨야 합니다. 날짜와 위치가 함께 남으면 나중에 같은 조건을 비교하거나 담당자와 다시 확인할 때 훨씬 분명합니다.`,
    },
    {
      question: `${fourthKeyword}까지 확인하면 시간이 너무 오래 걸리지 않나요?`,
      answer: `처음에는 번거롭지만 ${fourthKeyword}를 빠뜨리면 나중에 비용이나 불편으로 돌아오는 경우가 많습니다. 최소한 좋은 신호와 보류 신호를 각각 하나씩 적어 두면 결정 속도도 빨라집니다.`,
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
        <li>${mainKeyword}는 한 항목만 보지 말고 조건, 시점, 기록을 함께 봐야 합니다.</li>
        <li>${secondKeyword}는 당장의 편의보다 반복되는 비용과 책임 범위가 중요합니다.</li>
        <li>${thirdKeyword}는 사진과 메모로 남겨야 나중에 비교와 협의가 쉬워집니다.</li>
      </ul>
    </div>`;
}

function renderComparison(seed: QualityArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword] = seed.keywords;
  const type = TYPE_CONTEXT[seed.contentType];
  const [firstHeader, secondHeader, thirdHeader] = type.tableHeaders;

  return `
    <div class="overflow-x-auto my-8 not-prose">
      <table class="w-full border-collapse text-sm md:text-base">
        <caption class="sr-only">${type.comparisonTitle}</caption>
        <thead>
          <tr class="bg-slate-100 text-slate-900">
            <th class="border border-slate-200 p-3 text-left">${firstHeader}</th>
            <th class="border border-slate-200 p-3 text-left">${secondHeader}</th>
            <th class="border border-slate-200 p-3 text-left">${thirdHeader}</th>
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
            <td class="border border-slate-200 p-3">반복 지출과 책임 범위가 분명함</td>
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
        <li><input type="checkbox" disabled class="mr-2" />${mainKeyword} 기준을 한 문장으로 적었다.</li>
        <li><input type="checkbox" disabled class="mr-2" />${secondKeyword} 비용과 책임 범위를 확인했다.</li>
        <li><input type="checkbox" disabled class="mr-2" />${thirdKeyword} 관련 사진이나 캡처를 남겼다.</li>
        <li><input type="checkbox" disabled class="mr-2" />${fourthKeyword}가 애매하면 보류 기준을 정했다.</li>
        <li><input type="checkbox" disabled class="mr-2" />${fifthKeyword}는 계약서나 견적서 문구로 다시 확인했다.</li>
      </ul>
    </div>`;
}

function renderSection(seed: QualityArticleSeed, title: string, index: number) {
  const [mainKeyword] = seed.keywords;
  const showComparison = index === 1 || seed.contentType === "comparison";
  const showChecklist = index === 3 || seed.contentType === "checklist";

  const bodyContent = seed.sectionContents?.[index];

  if (bodyContent) {
    return `
    <h2>${title}</h2>
    <p>${bodyContent}</p>
    ${showComparison ? renderComparison(seed) : ""}
    ${showChecklist ? renderChecklist(seed) : ""}`;
  }

  const [, secondKeyword, thirdKeyword, fourthKeyword] = seed.keywords;
  const context = CATEGORY_CONTEXT[seed.category];
  const opener = SECTION_OPENERS[index % SECTION_OPENERS.length];

  return `
    <h2>${title}</h2>
    <p>${opener} ${context.reader}에게 ${mainKeyword}는 작은 선택처럼 보여도 ${context.risk}을 좌우할 수 있습니다. 그래서 ${secondKeyword}를 볼 때는 현재 조건과 나중에 바뀔 가능성을 나눠 적어 두는 것이 좋습니다.</p>
    <p>${thirdKeyword}는 말로 들으면 괜찮아 보여도 사진, 날짜, 금액이 빠지면 비교하기 어렵습니다. ${fourthKeyword}까지 같이 확인하면 나중에 같은 조건을 다시 볼 때 판단 속도가 빨라지고, 불필요한 비용을 줄일 수 있습니다.</p>
    ${showComparison ? renderComparison(seed) : ""}
    ${showChecklist ? renderChecklist(seed) : ""}
    <blockquote>
      <p>${mainKeyword}에서 애매한 답변이 나오면 바로 결정하지 말고, 같은 질문을 문자로 다시 남겨 보세요. 답변이 명확해지는지 보는 것만으로도 위험 신호를 거를 수 있습니다.</p>
    </blockquote>`;
}

function renderLinks(seed: QualityArticleSeed) {
  const context = CATEGORY_CONTEXT[seed.category];

  return `
    <div class="grid gap-4 md:grid-cols-2 my-10 not-prose">
      <a href="${seed.primaryLink.href}" class="block rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:bg-blue-50 transition-colors">
        <span class="text-xs font-bold text-blue-600">관련 가이드</span>
        <p class="mt-2 font-bold text-slate-900">${seed.primaryLink.label}</p>
      </a>
      <a href="${context.secondaryHref}" class="block rounded-xl border border-slate-200 p-5 hover:border-green-300 hover:bg-green-50 transition-colors">
        <span class="text-xs font-bold text-green-600">함께 확인</span>
        <p class="mt-2 font-bold text-slate-900">${context.secondaryLabel}</p>
      </a>
    </div>
    <p>공식 기준이나 제도 변화가 걸린 주제라면 <a href="${context.officialHref}" rel="noopener noreferrer" target="_blank">${context.officialLabel}</a>도 함께 확인하세요. 이 글은 판단 순서를 잡는 데 맞춰 작성했으며, 신청 조건이나 서류 양식은 공식 안내가 우선입니다.</p>`;
}

function renderContent(seed: QualityArticleSeed) {
  const context = CATEGORY_CONTEXT[seed.category];
  const type = TYPE_CONTEXT[seed.contentType];
  const [mainKeyword] = seed.keywords;

  return `
    <article class="prose prose-slate max-w-none">
      <p class="lead text-xl text-slate-600 font-medium">${seed.excerpt} ${mainKeyword}는 ${context.reader}에게 작은 차이처럼 보여도 실제로는 ${context.risk}을 좌우합니다.</p>
      ${renderSummary(seed)}
      <p>${seed.title}을 판단할 때는 하나의 정답보다 확인 순서가 중요합니다. 아래 기준은 계약, 예약, 구매, 정리처럼 바로 실행해야 하는 상황에서 빠르게 적용할 수 있도록 구성했습니다.</p>
      ${seed.sections.map((section, index) => renderSection(seed, section, index)).join("")}
      ${renderLinks(seed)}
      <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-6 my-10 not-prose">
        <p class="font-bold text-indigo-900 mb-2">${type.closingTitle}</p>
        <p class="text-indigo-800 leading-7">오늘 바로 할 일은 기준을 먼저 적고, 비용과 책임을 확인하고, 애매한 답변을 기록으로 남기는 것입니다. 이 세 가지가 있으면 대부분의 실수는 계약 전이나 예약 전에 걸러낼 수 있습니다.</p>
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

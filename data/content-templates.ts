type Tone = "blue" | "green" | "yellow" | "red" | "indigo";

interface ContentCallout {
  tone: Tone;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

interface ContentSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
  subsections?: Array<{
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
  callout?: ContentCallout;
}

interface ArticleOptions {
  lead: string;
  sections: ContentSection[];
  closingCallout?: ContentCallout;
}

const toneClasses: Record<
  Tone,
  { wrapper: string; title: string; body: string; link: string }
> = {
  blue: {
    wrapper: "bg-blue-50 border border-blue-200",
    title: "text-blue-900",
    body: "text-blue-800",
    link: "text-blue-600",
  },
  green: {
    wrapper: "bg-green-50 border border-green-200",
    title: "text-green-900",
    body: "text-green-800",
    link: "text-green-600",
  },
  yellow: {
    wrapper: "bg-yellow-50 border border-yellow-200",
    title: "text-yellow-900",
    body: "text-yellow-800",
    link: "text-yellow-700",
  },
  red: {
    wrapper: "bg-red-50 border border-red-200",
    title: "text-red-900",
    body: "text-red-800",
    link: "text-red-700",
  },
  indigo: {
    wrapper: "bg-indigo-50 border border-indigo-200",
    title: "text-indigo-900",
    body: "text-indigo-800",
    link: "text-indigo-600",
  },
};

function renderCallout(callout: ContentCallout) {
  const tone = toneClasses[callout.tone];
  const link = callout.href && callout.linkLabel
    ? `
      <a href="${callout.href}" class="${tone.link} font-bold hover:underline flex items-center">
        ${callout.linkLabel}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>`
    : "";

  return `
    <div class="${tone.wrapper} p-6 rounded-xl my-6">
      <p class="${tone.title} font-bold mb-2">${callout.title}</p>
      <p class="${tone.body} text-sm leading-7">${callout.body}</p>
      ${link}
    </div>`;
}

function renderSection(section: ContentSection) {
  const paragraphs = section.paragraphs
    ?.map((paragraph) => `<p>${paragraph}</p>`)
    .join("") ?? "";
  const bullets = section.bullets
    ? `<h3>체크할 항목</h3><ul>${section.bullets
        .map((bullet) => `<li>${bullet}</li>`)
        .join("")}</ul>`
    : "";
  const ordered = section.ordered
    ? `<h3>진행 순서</h3><ol>${section.ordered
        .map((item) => `<li>${item}</li>`)
        .join("")}</ol>`
    : "";
  const subsections = section.subsections
    ?.map((subsection) => {
      const subsectionParagraphs = subsection.paragraphs
        ?.map((paragraph) => `<p>${paragraph}</p>`)
        .join("") ?? "";
      const subsectionBullets = subsection.bullets
        ? `<ul>${subsection.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`
        : "";

      return `
        <h3>${subsection.title}</h3>
        ${subsectionParagraphs}
        ${subsectionBullets}`;
    })
    .join("") ?? "";
  const callout = section.callout ? renderCallout(section.callout) : "";

  return `
    <h2>${section.title}</h2>
    ${paragraphs}
    <p>이 항목은 한 번 읽고 넘기기보다 날짜, 비용, 책임자를 같이 적어야 실전에서 쓸 수 있습니다. 특히 이사, 계약, 퇴실처럼 다시 확인하기 어려운 일은 사진이나 캡처를 남기면 나중에 같은 조건을 비교하기 쉽습니다.</p>
    ${bullets}
    ${ordered}
    ${subsections}
    ${callout}
    <blockquote>
      <p>${section.title}에서 애매한 답이 나오면 바로 결정하지 말고, 문자나 문서로 다시 확인한 뒤 다음 단계로 넘어가세요.</p>
    </blockquote>`;
}

export function renderArticle({ lead, sections, closingCallout }: ArticleOptions) {
  return `
    <article class="prose prose-slate max-w-none">
      <p class="lead text-xl text-slate-600 font-medium">${lead}</p>
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8 not-prose">
        <p class="font-bold text-slate-900 mb-3">핵심 요약</p>
        <ul class="space-y-2 text-slate-700 text-sm md:text-base">
          <li>먼저 돈, 시간, 책임 범위를 나눠 확인해야 합니다.</li>
          <li>말로 들은 내용은 계약서, 문자, 사진처럼 다시 볼 수 있는 기록으로 남겨야 합니다.</li>
          <li>결정이 애매하면 바로 진행하지 말고 공식 기준과 관련 가이드를 한 번 더 확인하세요.</li>
        </ul>
      </div>
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8 not-prose">
        <p class="font-bold text-blue-900 mb-2">다음 행동으로 이어가기</p>
        <p class="text-blue-800 text-sm md:text-base leading-7 mb-4">읽은 내용을 바로 적용하려면 일정과 비용을 먼저 분리해 확인하세요.</p>
        <div class="flex flex-wrap gap-3">
          <a href="/checklist" class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white no-underline hover:bg-blue-700">이사 체크리스트 보기</a>
          <a href="/tools" class="inline-flex items-center rounded-lg border border-blue-300 px-4 py-2 text-sm font-bold text-blue-700 no-underline hover:bg-blue-100">계산기 도구 보기</a>
        </div>
      </div>
      ${sections.map(renderSection).join("")}
      ${closingCallout ? renderCallout(closingCallout) : ""}
    </article>
  `;
}

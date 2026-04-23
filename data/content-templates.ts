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
      <h4 class="${tone.title} font-bold mb-2">${callout.title}</h4>
      <p class="${tone.body} text-sm leading-7">${callout.body}</p>
      ${link}
    </div>`;
}

function renderSection(section: ContentSection) {
  const paragraphs = section.paragraphs
    ?.map((paragraph) => `<p>${paragraph}</p>`)
    .join("") ?? "";
  const bullets = section.bullets
    ? `<ul>${section.bullets
        .map((bullet) => `<li>${bullet}</li>`)
        .join("")}</ul>`
    : "";
  const ordered = section.ordered
    ? `<ol>${section.ordered
        .map((item) => `<li>${item}</li>`)
        .join("")}</ol>`
    : "";
  const callout = section.callout ? renderCallout(section.callout) : "";

  return `
    <h2>${section.title}</h2>
    ${paragraphs}
    ${bullets}
    ${ordered}
    ${callout}`;
}

export function renderArticle({ lead, sections, closingCallout }: ArticleOptions) {
  return `
    <article class="prose prose-slate max-w-none">
      <p class="lead text-xl text-slate-600 font-medium">${lead}</p>
      ${sections.map(renderSection).join("")}
      ${closingCallout ? renderCallout(closingCallout) : ""}
    </article>
  `;
}

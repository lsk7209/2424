import type { BlogPost } from "../blog-posts";
import { renderArticle } from "../content-templates";

type BlogCategory = BlogPost["category"];

export interface ExpansionArticleSeed {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  keywords: [string, string, string, string, string];
  sections: [string, string, string, string, string];
  primaryLink: {
    href: string;
    label: string;
  };
}

const calloutTones = ["blue", "green", "yellow", "indigo", "red"] as const;

function getChecklist(seed: ExpansionArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword] = seed.keywords;

  return [
    `${mainKeyword}를 한 번에 해결하려고 하지 말고 공간·시간·돈 중 어디가 문제인지 먼저 나눕니다.`,
    `${secondKeyword}는 눈에 보이는 불편보다 반복되는 패턴을 기준으로 판단합니다.`,
    `${thirdKeyword}가 필요한 항목은 사진, 금액, 날짜를 함께 남겨 다음 결정의 근거로 씁니다.`,
  ];
}

function getOrderedSteps(seed: ExpansionArticleSeed) {
  const [mainKeyword, secondKeyword, thirdKeyword, fourthKeyword] = seed.keywords;

  return [
    `${mainKeyword}와 직접 연결되는 현재 상태를 적습니다.`,
    `${secondKeyword} 때문에 생기는 반복 지출이나 불편을 표시합니다.`,
    `${thirdKeyword}에서 바로 바꿀 수 있는 행동을 하나만 정합니다.`,
    `${fourthKeyword}는 일주일 뒤 다시 확인해 유지할지 조정합니다.`,
  ];
}

function createSections(seed: ExpansionArticleSeed) {
  const [mainKeyword, secondKeyword] = seed.keywords;

  return seed.sections.map((title, index) => {
    const tone = calloutTones[index % calloutTones.length];
    const baseParagraphs = [
      `${title}는 ${mainKeyword}를 실제 생활에서 적용할 때 가장 먼저 갈리는 지점입니다. 검색으로 읽은 정보보다 내 방 구조, 계약 조건, 생활 시간표에 맞는 기준을 세우는 편이 실수가 적습니다.`,
      `${secondKeyword}까지 함께 보면 단순한 팁이 아니라 반복 가능한 생활 규칙으로 바뀝니다. 한 번 정한 기준은 사진이나 메모로 남겨 두면 이사, 퇴실, 재계약 때 다시 쓰기 쉽습니다.`,
    ];

    if (index === 0) {
      return {
        title,
        paragraphs: baseParagraphs,
        bullets: getChecklist(seed),
      };
    }

    if (index === 2) {
      return {
        title,
        paragraphs: baseParagraphs,
        ordered: getOrderedSteps(seed),
      };
    }

    if (index === 4) {
      return {
        title,
        paragraphs: baseParagraphs,
        callout: {
          tone,
          title: `${mainKeyword}는 기록이 남아야 관리됩니다`,
          body: `${seed.title}에서 다룬 기준은 한 번 보고 끝내기보다 체크리스트와 연결할 때 효과가 큽니다. 관련 도구나 기존 가이드를 함께 보면 실행 순서가 더 분명해집니다.`,
          href: seed.primaryLink.href,
          linkLabel: seed.primaryLink.label,
        },
      };
    }

    return {
      title,
      paragraphs: baseParagraphs,
    };
  });
}

function createFaq(seed: ExpansionArticleSeed) {
  const [mainKeyword, secondKeyword] = seed.keywords;

  return [
    {
      question: `${mainKeyword}는 언제부터 준비하는 게 좋나요?`,
      answer: `${mainKeyword}가 생활 불편이나 비용으로 반복되기 전에 기준을 세우는 편이 좋습니다. 이사 전이면 계약 직후, 거주 중이면 한 달 지출이나 생활 패턴이 보이는 시점부터 점검하면 충분합니다.`,
    },
    {
      question: `${secondKeyword}까지 꼭 같이 봐야 하나요?`,
      answer: `네. ${secondKeyword}를 빼면 당장은 편해 보여도 나중에 정산, 수납, 안전, 비용 문제가 따로 생길 수 있습니다. 체크 항목을 적게 잡더라도 같이 보는 편이 실전성이 높습니다.`,
    },
  ];
}

export function createExpansionPost(seed: ExpansionArticleSeed): Omit<BlogPost, "date" | "publishAt"> {
  const [mainKeyword] = seed.keywords;

  return {
    slug: seed.slug,
    title: seed.title,
    excerpt: seed.excerpt,
    category: seed.category,
    keywords: [...seed.keywords],
    faq: createFaq(seed),
    content: renderArticle({
      lead: `${seed.excerpt} 핵심은 ${mainKeyword}를 생활 동선과 비용 기준으로 나눠 보는 것입니다. 작은 기준을 미리 정해두면 나중에 더 큰 수리비, 정산 갈등, 불필요한 구매를 줄일 수 있습니다.`,
      sections: createSections(seed),
      closingCallout: {
        tone: "blue",
        title: `${mainKeyword}는 오늘 바로 기준을 정하세요`,
        body: "좋은 정보도 생활표로 옮기지 않으면 금방 잊힙니다. 지금 사는 집 기준으로 체크 항목 세 가지만 적어두면 다음 선택이 훨씬 쉬워집니다.",
        href: seed.primaryLink.href,
        linkLabel: seed.primaryLink.label,
      },
    }),
  };
}

export function createExpansionPosts(seeds: ExpansionArticleSeed[]) {
  return seeds.map(createExpansionPost);
}

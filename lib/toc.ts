
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function processContent(html: string): { processedContent: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let idCounter = 0;

  // h2, h3 태그를 찾아서 id를 부여하고 toc 배열에 추가
  const processedContent = html.replace(/<(h[23])>(.*?)<\/\1>/g, (match, tag, content) => {
    const id = `section-${idCounter++}`;
    const level = parseInt(tag.charAt(1));
    // 태그 내부의 HTML 태그 제거 (순수 텍스트만 추출)
    const text = content.replace(/<[^>]*>/g, '');
    
    toc.push({ id, text, level });
    
    // 원래 태그에 id 속성 추가
    return `<${tag} id="${id}">${content}</${tag}>`;
  });

  return { processedContent, toc };
}

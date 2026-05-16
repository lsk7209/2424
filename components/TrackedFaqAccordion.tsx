'use client';

import { trackEvent } from '@/lib/analytics';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface TrackedFaqAccordionProps {
  items: FaqItem[];
  slug: string;
  contentType: 'blog' | 'guide';
  accent?: 'blue' | 'green';
}

export default function TrackedFaqAccordion({ items, slug, contentType, accent = 'blue' }: TrackedFaqAccordionProps) {
  const hoverClass = accent === 'green' ? 'hover:text-green-600' : 'hover:text-blue-600';
  const markerClass = accent === 'green' ? 'text-green-500' : 'text-blue-500';

  const handleValueChange = (value: string) => {
    if (!value) return;
    const index = parseInt(value.replace('item-', ''), 10);
    const question = items[index]?.question;
    if (question) {
      trackEvent('faq_opened', {
        content_type: contentType,
        content_slug: slug,
        faq_question: question.slice(0, 100),
        faq_index: index,
      });
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4" onValueChange={handleValueChange}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <AccordionTrigger className={`text-left font-bold text-xl py-6 hover:no-underline ${hoverClass} transition-colors`}>
            <span className={`mr-4 ${markerClass}`}>Q.</span>
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed text-lg pb-6 pl-8 border-t pt-4">
            <span className="font-bold text-gray-400 mr-2">A.</span>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

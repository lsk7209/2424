'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  toc: TocItem[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-gray-50/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white border-b hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <List className="w-5 h-5 text-blue-600" />
          목차
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <nav className="p-4 bg-white">
          <ul className="space-y-1">
            {toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`block py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
                    activeId === item.id
                      ? 'bg-blue-50 text-blue-700 font-bold translate-x-1'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

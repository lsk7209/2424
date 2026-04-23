'use client';

import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  description: string;
  url?: string;
}

export default function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';

  const handleCopyLink = async () => {
    try {
      const textToCopy = [title, description, currentUrl].filter(Boolean).join('\n');
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      return;
    }
  };

  return (
    <div className="flex justify-center my-8 w-full">
      <Button
        onClick={handleCopyLink}
        className={`
          relative overflow-hidden group flex items-center gap-3 px-8 py-6 rounded-full text-lg
          font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1
          ${
            copied
              ? 'bg-green-500 hover:bg-green-600 text-white ring-4 ring-green-200'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ring-4 ring-blue-100'
          }
        `}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

        {copied ? (
          <>
            <Check className="w-6 h-6 animate-bounce" />
            <span>링크를 복사했습니다</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-6 h-6" />
            <span>링크 공유하기</span>
          </>
        )}
      </Button>
    </div>
  );
}

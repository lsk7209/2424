'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  description: string;
  url?: string;
}

export default function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  // 클라이언트 사이드에서만 URL 확인
  const currentUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';

  const handleCopyLink = async () => {
    try {
      // 제목과 링크를 함께 복사
      const textToCopy = `${title}\n${currentUrl}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex justify-center my-8 w-full">
      <Button 
        onClick={handleCopyLink}
        className={`
          relative overflow-hidden group
          flex items-center gap-3 
          px-8 py-6 rounded-full 
          text-lg font-bold shadow-xl 
          transition-all duration-300 transform hover:-translate-y-1
          ${copied 
            ? 'bg-green-500 hover:bg-green-600 text-white ring-4 ring-green-200' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ring-4 ring-blue-100'
          }
        `}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        
        {copied ? (
          <>
            <Check className="w-6 h-6 animate-bounce" />
            <span>복사되었습니다!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-6 h-6" />
            <span>이 꿀팁 공유하기 (링크 복사)</span>
          </>
        )}
      </Button>
    </div>
  );
}

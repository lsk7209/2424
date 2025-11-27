'use client';

import { 
  Truck, 
  Lightbulb, 
  ShieldCheck, 
  Compass, 
  Palette, 
  PiggyBank, 
  BookOpen, 
  Gavel, 
  Sparkles,
  Home,
  FileText,
  LucideIcon
} from 'lucide-react';

interface PostCoverProps {
  title: string;
  category: string;
}

const categoryConfig: Record<string, { icon: LucideIcon; gradient: string; pattern: string }> = {
  // 블로그 카테고리
  '이사준비': { 
    icon: Truck, 
    gradient: 'from-blue-500 to-cyan-400',
    pattern: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 20%)'
  },
  '생활꿀팁': { 
    icon: Lightbulb, 
    gradient: 'from-amber-400 to-orange-500',
    pattern: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)'
  },
  '전세안전': { 
    icon: ShieldCheck, 
    gradient: 'from-emerald-500 to-teal-600',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.1) 20px)'
  },
  '풍수지리': { 
    icon: Compass, 
    gradient: 'from-violet-500 to-purple-600',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)'
  },
  '인테리어': { 
    icon: Palette, 
    gradient: 'from-pink-400 to-rose-500',
    pattern: 'linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%, rgba(255,255,255,0.1))'
  },
  '금융/절약': { 
    icon: PiggyBank, 
    gradient: 'from-indigo-500 to-blue-600',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2.5px)'
  },
  
  // 가이드 카테고리
  '법률': { 
    icon: Gavel, 
    gradient: 'from-slate-600 to-slate-800',
    pattern: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
  },
  '생활': { 
    icon: Home, 
    gradient: 'from-green-500 to-emerald-600',
    pattern: 'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)'
  },
  '안전': { 
    icon: ShieldCheck, 
    gradient: 'from-red-500 to-orange-600',
    pattern: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)'
  },
  '청소': { 
    icon: Sparkles, 
    gradient: 'from-cyan-400 to-blue-500',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
  },
  '행정': { 
    icon: FileText, 
    gradient: 'from-gray-500 to-gray-700',
    pattern: 'linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)'
  },
  '계약': { 
    icon: FileText, 
    gradient: 'from-blue-600 to-indigo-700',
    pattern: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)'
  },
};

export default function PostCover({ title, category }: PostCoverProps) {
  const config = categoryConfig[category] || { 
    icon: BookOpen, 
    gradient: 'from-gray-400 to-gray-600',
    pattern: '' 
  };
  
  const Icon = config.icon;

  return (
    <div className={`relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-lg bg-gradient-to-br ${config.gradient}`}>
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ 
          backgroundImage: config.pattern,
          backgroundSize: category === '금융/절약' ? '20px 20px' : '100% 100%'
        }} 
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-6 shadow-inner">
          <Icon className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-md" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold max-w-3xl leading-tight drop-shadow-lg break-keep">
          {title}
        </h1>
        <div className="mt-4 px-4 py-1 bg-black/20 rounded-full text-sm md:text-base backdrop-blur-md border border-white/10">
          {category}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from 'next/link';
import { Home, MapPin, Sparkles, Shield, CheckSquare, Wrench, BookOpen, PenTool } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: '홈', icon: Home },
        { href: '/neighborhood-test', label: '동네찾기', icon: MapPin },
        { href: '/safety-check', label: '전세진단', icon: Shield },
        { href: '/tools', label: '도구함', icon: Wrench },
        { href: '/guide', label: '가이드', icon: BookOpen },
        { href: '/blog', label: '블로그', icon: PenTool },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        독립만세
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* 모바일 네비게이션 (간소화) */}
                <div className="md:hidden flex items-center gap-4">
                     <Link
                        href="/tools"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        도구함
                    </Link>
                    <Link
                        href="/neighborhood-test"
                        className="text-sm font-medium text-primary"
                    >
                        테스트 시작
                    </Link>
                </div>
            </div>
        </header>
    );
}

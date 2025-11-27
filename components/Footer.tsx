import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 브랜드 */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            독립만세
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            이사를 준비하는<br />
                            모든 분들을 위한 종합 가이드
                        </p>
                    </div>

                    {/* 서비스 */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">서비스</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/neighborhood-test" className="hover:text-primary transition-colors">
                                    나만의 동네 찾기
                                </Link>
                            </li>
                            <li>
                                <Link href="/safety-check" className="hover:text-primary transition-colors">
                                    전세 사기 진단
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="hover:text-primary transition-colors">
                                    독립만세 도구함
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">콘텐츠</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/guide" className="hover:text-primary transition-colors">
                                    가이드북
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">
                                    블로그
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    소개
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 법적 고지 */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">법적 고지</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    개인정보 처리방침
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    문의하기
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {currentYear} 독립만세. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

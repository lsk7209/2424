import Link from 'next/link';
import { MapPin, Sparkles, Shield, CheckSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const tools = [
    {
      icon: MapPin,
      title: '나만의 동네 찾기',
      description: '이상과 현실의 갭을 확인하는 MBTI 스타일 테스트',
      href: '/neighborhood-test',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Sparkles,
      title: '풍수지리 집터 테스트',
      description: '사주 오행 기반 맞춤형 주거 유형 추천',
      href: '/feng-shui',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Shield,
      title: '전세 사기 위험 진단',
      description: '깡통전세 위험도를 한눈에 확인하세요',
      href: '/safety-check',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: CheckSquare,
      title: 'D-30 이사 작전지도',
      description: '단계별 이사 준비 체크리스트',
      href: '/checklist',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                이사를{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  독립
                </span>
                으로
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                스트레스는 줄이고, 설렘은 더하는<br />
                이사 준비 종합 가이드
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg h-12">
                <Link href="/neighborhood-test">
                  동네 찾기 테스트 시작
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-12">
                <Link href="/safety-check">
                  전세 사기 진단하기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="container py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                독립만세가 제공하는 서비스
              </h2>
              <p className="text-lg text-muted-foreground">
                재미있는 테스트부터 실용적인 도구까지
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.href} href={tool.href}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${tool.color}`} />
                        </div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <CardDescription className="text-base">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-primary font-medium">
                          시작하기
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              첫 독립, 준비되셨나요?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              지금 바로 나에게 맞는 동네를 찾아보세요!
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg h-12">
              <Link href="/neighborhood-test">
                동네 찾기 테스트 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

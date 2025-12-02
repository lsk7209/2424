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
      title: '나만의 동네 찾기 🏠',
      description: '내 성향에 딱 맞는 동네는 어디일까? MBTI보다 정확한 동네 추천 테스트',
      href: '/neighborhood-test',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      borderColor: 'border-indigo-200',
    },
    {
      icon: Sparkles,
      title: '풍수지리 집터 테스트 ✨',
      description: '이 집이 나랑 맞을까? 사주 오행으로 분석하는 나만의 명당 찾기',
      href: '/feng-shui',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
    },
    {
      icon: Shield,
      title: '전세 사기 위험 진단 🛡️',
      description: '내 보증금은 안전할까? 등기부등본만 있으면 1분 만에 위험도 분석',
      href: '/safety-check',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      icon: CheckSquare,
      title: '이사 준비 체크리스트 ✅',
      description: 'D-30부터 D-Day까지, 파워 J가 만든 완벽한 이사 타임라인',
      href: '/checklist',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-200',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/20 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-sm mb-8 animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-primary">2025년 독립 가이드 업데이트 완료</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
              이사를 <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 relative">
                독립
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              으로
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              불안한 전세 계약부터 낯선 동네 찾기까지.<br />
              <span className="font-semibold text-slate-800">이사독립</span>가 당신의 홀로서기를 완벽하게 도와드릴게요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                <Link href="/neighborhood-test">
                  나에게 맞는 동네 찾기 🏠
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all">
                <Link href="/safety-check">
                  전세 사기 무료 진단 🛡️
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="container mx-auto px-4 pb-24 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} className="group">
                  <Card className={`h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative bg-white/80 backdrop-blur-sm`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${tool.bgColor} rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:scale-150`} />

                    <CardHeader className="relative">
                      <div className={`w-14 h-14 rounded-2xl ${tool.bgColor} ${tool.borderColor} border flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-7 w-7 ${tool.color}`} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 mt-2">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">
                        지금 시작하기
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-20 -mt-20" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mb-20" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                첫 독립, <br className="md:hidden" />
                <span className="text-primary">설렘</span>만 남기세요.
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                복잡한 계산과 불안한 마음은 이사독립가 덜어드릴게요.<br />
                지금 바로 당신만의 독립 라이프를 시작해보세요.
              </p>
              <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-lg font-bold">
                <Link href="/neighborhood-test">
                  동네 찾기 테스트 시작하기 🚀
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import Link from 'next/link';
import { MapPin, Sparkles, Shield, CheckSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  // SEO/GEO/AEO 최적화를 위한 구조화된 데이터
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '이사독립',
    url: 'https://today2424.kr',
    logo: 'https://today2424.kr/icons/icon-512.png',
    description: '이사를 준비하는 모든 분들을 위한 종합 정보 플랫폼',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@indielife.kr',
      availableLanguage: 'Korean',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '이사독립',
    url: 'https://today2424.kr',
    description: '이사 준비부터 전세 계약까지 완벽 가이드',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://today2424.kr/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '이사독립 서비스는 무료인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 이사독립의 모든 서비스는 무료로 이용하실 수 있습니다. 동네 찾기 테스트, 전세 사기 진단, 풍수지리 테스트, 이사 체크리스트 등 모든 기능을 무료로 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '전세 사기 진단 결과는 정확한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '전세 사기 진단은 등기부등본 정보를 기반으로 위험도를 분석하는 참고용 도구입니다. 법적 효력은 없으며, 실제 계약 전에는 반드시 법무사나 전문가와 상담하시기 바랍니다.',
        },
      },
      {
        '@type': 'Question',
        name: '어떤 서비스를 제공하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '이사독립은 나만의 동네 찾기 테스트, 전세 사기 위험 진단, 풍수지리 집터 테스트, D-30 이사 체크리스트, 이사 견적 계산기, 전월세 전환율 계산기 등 이사와 독립 생활에 필요한 다양한 도구와 정보를 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '개인정보는 안전하게 보호되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 이사독립은 사용자의 개인정보를 서버에 저장하지 않습니다. 모든 데이터는 사용자의 브라우저에만 저장되며, 개인정보 처리방침을 준수합니다.',
        },
      },
    ],
  };
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
      {/* SEO/GEO/AEO 최적화: 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
              <span className="font-semibold text-slate-800">이사독립</span>이 당신의 홀로서기를 완벽하게 도와드릴게요.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              독립을 위한 필수 도구들
            </h2>
            <h3 className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              이사 준비부터 전세 계약까지, 필요한 모든 것을 한 곳에서
            </h3>
          </div>
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

        {/* FAQ Section for AEO */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              자주 묻는 질문
            </h2>
            <h3 className="text-lg md:text-xl text-slate-600 text-center mb-12">
              이사독립에 대해 궁금하신 점을 확인하세요
            </h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">이사독립 서비스는 무료인가요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    네, 이사독립의 모든 서비스는 무료로 이용하실 수 있습니다. 동네 찾기 테스트, 전세 사기 진단, 풍수지리 테스트, 이사 체크리스트 등 모든 기능을 무료로 제공합니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">전세 사기 진단 결과는 정확한가요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    전세 사기 진단은 등기부등본 정보를 기반으로 위험도를 분석하는 참고용 도구입니다. 법적 효력은 없으며, 실제 계약 전에는 반드시 법무사나 전문가와 상담하시기 바랍니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">어떤 서비스를 제공하나요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    이사독립은 나만의 동네 찾기 테스트, 전세 사기 위험 진단, 풍수지리 집터 테스트, D-30 이사 체크리스트, 이사 견적 계산기, 전월세 전환율 계산기 등 이사와 독립 생활에 필요한 다양한 도구와 정보를 제공합니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">개인정보는 안전하게 보호되나요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    네, 이사독립은 사용자의 개인정보를 서버에 저장하지 않습니다. 모든 데이터는 사용자의 브라우저에만 저장되며, 개인정보 처리방침을 준수합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
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
              <h3 className="text-xl md:text-2xl font-semibold text-slate-200">
                안전하고 행복한 독립 생활의 시작
              </h3>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                복잡한 계산과 불안한 마음은 이사독립이 덜어드릴게요.<br />
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

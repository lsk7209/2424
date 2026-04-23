export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  date: string;
  category: '이사준비' | '생활꿀팁' | '전세안전' | '풍수지리' | '인테리어' | '금융/절약';
  coverImage?: string;
  keywords: string[]; // SEO Keywords
  faq?: { question: string; answer: string }[]; // AEO/GEO Optimized FAQ
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'jeonse-fraud-prevention-guide',
    title: '사회초년생을 위한 전세사기 예방 가이드 2025: 깡통전세 피하는 법',
    excerpt: '등기부등본 보는 법부터 특약사항, 전세보증보험까지. 내 소중한 보증금을 지키기 위해 계약 전 반드시 확인해야 할 체크리스트를 완벽하게 정리했습니다.',
    date: '2025-11-28',
    category: '전세안전',
    keywords: ['전세사기 예방', '깡통전세 판별법', '등기부등본 보는법', '전세보증보험', '사회초년생 전세'],
    faq: [
      {
        question: '깡통전세란 무엇인가요?',
        answer: '깡통전세란 집주인의 주택담보대출 금액과 전세 보증금의 합계가 집값의 70~80%를 넘어, 집이 경매로 넘어갔을 때 보증금을 온전히 돌려받기 어려운 상태를 말합니다.'
      },
      {
        question: '전세 계약 시 가장 먼저 확인해야 할 서류는?',
        answer: '등기부등본(등기사항전부증명서)입니다. 특히 을구의 근저당권 설정액과 갑구의 소유자 일치 여부를 반드시 확인해야 합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">최근 전세 사기 피해가 급증하면서 불안해하는 분들이 많습니다. "설마 나한테 그런 일이 생기겠어?"라는 안일한 생각이 가장 위험합니다. 정확한 지식과 꼼꼼한 확인만이 내 소중한 보증금을 지킬 수 있는 유일한 방법입니다.</p>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg not-prose">
          <h4 class="text-blue-900 font-bold mb-2 text-lg">💡 계약 전, 1분 만에 안전 진단해보세요!</h4>
          <p class="text-blue-800 mb-4">계약하려는 집의 보증금과 시세만 알면, AI가 깡통전세 위험도를 분석해 드립니다.</p>
          <a href="/safety-check" class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors no-underline shadow-md">
            🏠 전세 사기 위험도 무료 진단하기 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </a>
        </div>

        <h2>1. 등기부등본, '3번 확인의 법칙'을 기억하세요</h2>
        <p>등기부등본은 부동산의 신분증입니다. 계약 전, 잔금 치르기 전, 그리고 전입신고 당일 등 <strong>최소 3번</strong>은 확인해야 합니다.</p>
        
        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
                <span class="font-bold text-slate-800">📖 심화 학습</span>
                <p class="text-sm text-slate-600">표제부, 갑구, 을구 보는 법을 아직 모른다면?</p>
            </div>
            <a href="/guide/how-to-read-registry" class="text-blue-600 font-bold hover:underline text-sm">등기부등본 보는 법 가이드 →</a>
        </div>

        <h3>갑구(소유권)에서 봐야 할 것</h3>
        <ul>
          <li><strong>소유자 일치 여부:</strong> 계약하러 나온 사람이 등기부상 소유자와 동일인인지 신분증을 대조하여 확인하세요.</li>
          <li><strong>위험한 단어 찾기:</strong> '가압류', '가처분', '가등기', '예고등기' 등의 단어가 보이면 피해야 합니다.</li>
        </ul>

        <h3>을구(소유권 이외의 권리)에서 봐야 할 것</h3>
        <ul>
          <li><strong>근저당권 설정액:</strong> 집주인이 집을 담보로 은행에서 빌린 돈입니다.</li>
          <li><strong>안전한 집의 공식:</strong> <span class="bg-yellow-100 px-2 py-1 rounded font-bold">(근저당권 설정액 + 내 전세 보증금) < 집 시세의 70%</span></li>
        </ul>

        <div class="bg-red-50 p-6 rounded-xl border border-red-200 my-8">
          <h4 class="text-red-700 font-bold mb-3 flex items-center text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            절대 계약하면 안 되는 '신탁 등기'
          </h4>
          <p class="text-red-800 leading-relaxed">
            등기부등본 갑구에 <strong>'신탁'</strong>이라는 단어가 있다면 일단 멈추세요. 이는 집의 실제 소유권이 집주인이 아닌 '신탁 회사'에 있다는 뜻입니다.<br><br>
            이 경우 집주인(위탁자)과 맺은 계약은 <strong>무효</strong>가 될 수 있으며, 보증금을 한 푼도 돌려받지 못하고 쫓겨날 수 있습니다.
          </p>
        </div>

        <h2>2. 전세보증보험, 선택이 아닌 필수</h2>
        <p>전세보증보험은 집주인이 보증금을 돌려주지 않을 때 보증 기관(HUG, HF, SGI)이 대신 돌려주는 제도입니다.</p>
        
        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
                <span class="font-bold text-slate-800">📖 심화 학습</span>
                <p class="text-sm text-slate-600">HUG, HF, SGI 차이점과 가입 조건이 궁금하다면?</p>
            </div>
            <a href="/guide/jeonse-insurance-guide" class="text-blue-600 font-bold hover:underline text-sm">보증보험 가이드 →</a>
        </div>

        <h2>3. 특약사항으로 나를 지키는 방패 만들기</h2>
        <p>계약서 특약사항 한 줄이 법적 효력을 발휘하여 나를 지켜줍니다. 공인중개사에게 아래 특약들을 넣어달라고 당당하게 요구하세요.</p>
        
        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
                <span class="font-bold text-slate-800">📖 심화 학습</span>
                <p class="text-sm text-slate-600">표준임대차계약서 작성법과 필수 특약 5가지</p>
            </div>
            <a href="/guide/standard-rental-contract" class="text-blue-600 font-bold hover:underline text-sm">계약서 작성 가이드 →</a>
        </div>

        <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 my-6">
          <h4 class="font-bold text-gray-900 mb-4">✅ 필수 특약사항 복사해서 쓰세요</h4>
          <ol class="space-y-3 list-decimal list-inside text-gray-700">
            <li><strong>"전세자금대출 미승인 시 계약금 전액을 즉시 반환한다."</strong></li>
            <li><strong>"임대인은 잔금 지급일 다음 날까지 현재의 권리 상태(근저당권 등)를 유지한다."</strong></li>
            <li><strong>"전세보증보험 가입 불가 시 계약을 무효로 하고 계약금을 반환한다."</strong></li>
            <li><strong>"임대인은 국세 및 지방세 체납 사실이 없음을 확인한다."</strong></li>
          </ol>
        </div>

        <h2>4. 전입신고와 확정일자는 '이사 당일' 즉시!</h2>
        <p>이사 당일은 정신이 없겠지만, 무엇보다 먼저 해야 할 일은 <strong>전입신고</strong>와 <strong>확정일자</strong> 받기입니다.</p>
        <ul>
          <li><strong>대항력 확보:</strong> 전입신고 + 점유(이사)를 하면 다음 날 0시부터 제3자에게 내 권리를 주장할 수 있는 힘이 생깁니다.</li>
          <li><strong>우선변제권 확보:</strong> 여기에 확정일자까지 받으면, 집이 경매로 넘어갔을 때 후순위 권리자보다 먼저 배당받을 수 있습니다.</li>
        </ul>

        <div class="mt-12 p-6 bg-indigo-50 rounded-xl text-center">
          <h3 class="text-xl font-bold text-indigo-900 mb-2">아직도 불안하신가요?</h3>
          <p class="text-indigo-700 mb-6">복잡한 계산은 저희에게 맡기세요. 보증금과 융자금만 입력하면 끝!</p>
          <a href="/safety-check" class="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all transform hover:scale-105 no-underline shadow-lg">
            👉 전세 안전진단 계산기 바로가기
          </a>
        </div>
      </article>
    `,
  },
  {
    slug: 'moving-checklist-d30',
    title: '이사 D-30, 완벽한 이사를 위한 타임라인 (체크리스트 포함)',
    excerpt: '이사는 하루 만에 끝나는 것이 아닙니다. D-30부터 D-Day까지, 한 달 전부터 준비해야 할 일들을 주차별로 상세하게 정리해드립니다.',
    date: '2025-11-27',
    category: '이사준비',
    keywords: ['이사 체크리스트', '이사 준비', '포장이사 견적', '입주청소', '공과금 정산'],
    faq: [
      {
        question: '이사업체 예약은 언제 해야 하나요?',
        answer: '최소 한 달 전(D-30)에 해야 합니다. 손 없는 날이나 주말, 월말은 예약이 빨리 마감되므로 2달 전에 하는 것이 좋습니다.'
      },
      {
        question: '폐가전 수거는 어떻게 신청하나요?',
        answer: '폐가전 무상방문수거 서비스(1599-0903)를 이용하면 무료로 수거해갑니다. 대형 가구는 주민센터나 편의점에서 폐기물 스티커를 구매해야 합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">이사는 단순한 짐 옮기기가 아닙니다. 수많은 행정 절차와 예약이 필요한 거대한 프로젝트죠. D-30부터 차근차근 준비해야 이사 당일 당황하지 않고 여유롭게 새 출발을 할 수 있습니다.</p>

        <div class="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg not-prose">
          <h4 class="text-green-900 font-bold mb-2 text-lg">📅 이사 준비, 헷갈리시나요?</h4>
          <p class="text-green-800 mb-4">남은 날짜만 입력하면, 오늘 해야 할 일을 자동으로 알려드립니다.</p>
          <div class="flex gap-3 flex-wrap">
            <a href="/tools/d-day-counter" class="inline-flex items-center bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-colors no-underline shadow-sm text-sm">
              ⏰ D-Day 카운터 쓰러가기
            </a>
            <a href="/checklist" class="inline-flex items-center bg-white text-green-700 border border-green-200 px-5 py-2.5 rounded-lg font-bold hover:bg-green-50 transition-colors no-underline shadow-sm text-sm">
              ✅ 전체 체크리스트 보기
            </a>
          </div>
        </div>

        <h2>📅 D-30: 이사 준비의 시작 (한 달 전)</h2>
        <p>이사 한 달 전은 '선택과 예약'의 시기입니다. 인기 있는 업체나 날짜는 금방 마감되니 서둘러야 합니다.</p>
        
        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
                <span class="font-bold text-slate-800">📖 심화 학습</span>
                <p class="text-sm text-slate-600">호구 당하지 않는 이사업체 선정 노하우</p>
            </div>
            <a href="/guide/moving-center-selection" class="text-blue-600 font-bold hover:underline text-sm">업체 선정 가이드 →</a>
        </div>

        <ul>
          <li><strong>이사 날짜 확정:</strong> 현재 살고 있는 집의 만기일과 새집 입주일을 조율합니다.</li>
          <li><strong>이사업체 선정 및 계약:</strong> 최소 3군데 이상 견적을 비교하세요. 전화로만 묻지 말고 반드시 <strong>방문 견적</strong>을 받아야 합니다.</li>
          <li><strong>불필요한 짐 정리 (중요!):</strong> 이사 비용은 '짐의 양'에 비례합니다. 1년 이상 안 쓴 물건은 과감히 버리세요.</li>
        </ul>

        <h2>📅 D-14: 행정 절차 및 예약 (2주 전)</h2>
        <p>이제 구체적인 실행 계획을 세워야 할 때입니다.</p>
        <ul>
          <li><strong>입주청소 예약:</strong> 새집 청소는 전문가에게 맡기는 것이 정신 건강에 좋습니다.</li>
          <li><strong>엘리베이터 예약:</strong> 현재 사는 곳과 이사 갈 곳의 관리사무소에 미리 연락하여 이사 날짜를 알리고 엘리베이터 사용을 예약하세요.</li>
          <li><strong>가구/가전 배치 구상:</strong> 새집 도면을 구해 가구 배치를 미리 시뮬레이션해보세요.</li>
        </ul>

        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-200 my-8">
          <h4 class="text-indigo-900 font-bold mb-2">💡 이사 비용이 궁금하다면?</h4>
          <p class="text-indigo-800 mb-4 text-sm">우리 집 평수와 짐 양으로 대략적인 이사 견적을 미리 계산해보세요. 바가지 요금을 예방할 수 있습니다.</p>
          <a href="/tools/moving-cost-calculator" class="text-indigo-600 font-bold hover:underline flex items-center">
            💰 이사 견적 계산기 바로가기 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <h2>📅 D-7: 공과금 및 주소 이전 준비 (1주 전)</h2>
        <ul>
          <li><strong>도시가스/인터넷 이전 신청:</strong> 철거 및 설치 예약을 미리 해야 당일 인터넷 없이 지내는 불편함을 겪지 않습니다.</li>
          <li><strong>우편물 주소 이전 서비스:</strong> 우체국 주거이전 서비스를 신청하세요.</li>
          <li><strong>폐가전/폐가구 배출 신고:</strong> 버리고 갈 큰 짐들에 스티커를 붙이거나 '폐가전 무상방문수거'를 예약하세요.</li>
        </ul>

        <h2>📅 D-1: 최종 점검 (하루 전)</h2>
        <ul>
          <li><strong>귀중품 별도 보관:</strong> 현금, 보석, 중요 서류, 노트북 등은 개인 가방에 따로 챙기세요.</li>
          <li><strong>쓰레기봉투 준비:</strong> 100L 종량제 봉투를 넉넉히(3~4장) 준비하세요.</li>
          <li><strong>냉장고 비우기:</strong> 냉장고 음식은 아이스박스에 담거나 미리 먹어서 비워두세요.</li>
        </ul>

        <h2>🚚 D-Day: 이사 당일</h2>
        
        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
                <span class="font-bold text-slate-800">📖 심화 학습</span>
                <p class="text-sm text-slate-600">이사 당일 주민센터에서 꼭 해야 할 일</p>
            </div>
            <a href="/guide/administrative-welfare-center" class="text-blue-600 font-bold hover:underline text-sm">행정 업무 가이드 →</a>
        </div>

        <ol>
          <li><strong>공과금 정산:</strong> 전기, 가스, 수도 요금을 계량기 확인 후 정산합니다.</li>
          <li><strong>이삿짐 확인:</strong> 파손되거나 분실된 물건이 없는지 이사팀 철수 전 꼼꼼히 확인하세요.</li>
          <li><strong>전입신고 및 확정일자:</strong> 짐 정리가 끝나면 즉시 주민센터를 방문하거나 온라인으로 신고하세요.</li>
        </ol>
      </article>
    `,
  },
  {
    slug: 'feng-shui-interior-tips',
    title: '복을 부르는 원룸 풍수지리 인테리어 꿀팁',
    excerpt: '좁은 원룸에서도 실천할 수 있는 간단한 풍수지리 팁! 재물운과 건강운을 높이는 가구 배치와 소품 활용법을 알려드립니다.',
    date: '2025-11-26',
    category: '풍수지리',
    keywords: ['원룸 풍수지리', '침대 머리 방향', '풍수 인테리어', '현관 거울 위치', '재물운 인테리어'],
    faq: [
      {
        question: '침대 머리는 어느 방향이 좋은가요?',
        answer: '방문을 열었을 때 대각선 방향에 위치하여 심리적 안정감을 주는 것이 가장 좋습니다. 머리를 창문 쪽으로 두는 것도 좋습니다.'
      },
      {
        question: '현관에 거울이 있으면 안 좋나요?',
        answer: '현관문을 열자마자 정면에 보이는 거울은 들어오는 복을 반사한다고 합니다. 측면에 배치하는 것이 좋습니다.'
      }
    ],
    content: `
      <article>
        <p class="lead">풍수지리는 미신이 아니라 '공간 심리학'입니다. 내가 머무는 공간이 편안하고 안정감 있어야 하는 일도 잘 풀리는 법이죠. 좁은 원룸이나 오피스텔에서도 쉽게 따라 할 수 있는 복을 부르는 인테리어 꿀팁을 소개합니다.</p>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg not-prose">
          <h4 class="text-purple-900 font-bold mb-2 text-lg">🔮 내 방의 기운은 어떨까?</h4>
          <p class="text-purple-800 mb-4">사주 오행을 기반으로 나에게 딱 맞는 집터와 인테리어 방향을 알려드립니다.</p>
          <a href="/feng-shui" class="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors no-underline shadow-md">
            ✨ 풍수지리 집터 테스트 하러가기 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </a>
        </div>

        <h2>1. 현관: 운이 들어오는 통로</h2>
        <p>현관은 집의 얼굴이자 기운이 드나드는 곳입니다. 항상 밝고 깨끗하게 유지해야 합니다.</p>
        <ul>
          <li><strong>신발 정리:</strong> 신발은 신발장에 넣고, 나와 있는 신발은 가지런히 정리하세요.</li>
          <li><strong>거울 위치:</strong> 문을 열었을 때 정면에 거울이 있으면 복이 반사되어 나갑니다. 왼쪽(재물운)이나 오른쪽(명예운) 측면에 두세요.</li>
          <li><strong>조명:</strong> 현관 센서등은 항상 밝게 유지하세요. 어두운 현관은 음기를 부릅니다.</li>
        </ul>

        <h2>2. 침실(침대): 휴식과 재충전의 공간</h2>
        <p>잠을 잘 자야 건강하고 활력이 생깁니다. 침대 위치가 핵심입니다.</p>
        <ul>
          <li><strong>대각선 배치:</strong> 방문을 열었을 때 대각선으로 보이는 곳이 가장 안정적인 '사랑받는 자리'입니다.</li>
          <li><strong>머리 방향:</strong> 화장실이나 주방 쪽으로 머리를 두지 마세요. 창문 쪽이나 벽 쪽이 좋습니다.</li>
          <li><strong>거울 주의:</strong> 자는 모습이 거울에 비치면 기가 빨린다고 합니다. 침대 맞은편 거울은 피하거나 천으로 덮어두세요.</li>
        </ul>

        <h2>3. 주방: 건강과 재물의 상징</h2>
        <ul>
          <li><strong>칼과 가위 수납:</strong> 날카로운 도구는 흉한 기운을 내뿜으므로 보이지 않게 수납장에 넣어두세요.</li>
          <li><strong>냉장고 위 비우기:</strong> 냉장고 위에 전자레인지나 잡동사니를 쌓아두지 마세요. 기의 흐름을 막습니다.</li>
          <li><strong>설거지 바로 하기:</strong> 쌓여있는 설거지는 나쁜 기운을 만듭니다. 바로바로 치우고 배수구도 청결하게 관리하세요.</li>
        </ul>

        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
          <h4 class="text-yellow-800 font-bold mb-2">💡 풍수지리 플러스 팁</h4>
          <p class="text-sm text-yellow-700">집안에 죽은 식물(드라이플라워 포함)을 두지 마세요. 생기 있는 관엽식물을 두면 공기 정화는 물론 좋은 기운을 불러옵니다. 특히 현관 입구의 관엽식물은 나쁜 기운을 걸러주는 역할을 합니다.</p>
        </div>
      </article>
    `
  },
  {
    slug: 'small-room-mirror-placement',
    title: '좁은 방이 2배 넓어 보이는 거울 배치법',
    excerpt: '답답한 원룸, 거울 하나만 잘 둬도 확 달라집니다. 공간 확장 효과를 주는 마법의 거울 인테리어 노하우를 공개합니다.',
    date: '2025-11-28',
    category: '인테리어',
    keywords: ['원룸 인테리어', '거울 배치', '좁은방 꾸미기', '공간 활용', '전신거울'],
    faq: [
      {
        question: '전신 거울은 어디에 두는 게 좋나요?',
        answer: '창문 맞은편이나 방문 옆 빈 벽에 두면 빛을 반사해 공간이 더 넓고 환해 보입니다.'
      },
      {
        question: '거울 프레임은 어떤 게 좋을까요?',
        answer: '좁은 방에는 프레임이 없거나(노프레임) 얇은 화이트/메탈 프레임이 공간을 덜 차지해 보이고 깔끔합니다.'
      }
    ],
    content: `
      <article>
        <p class="lead">좁은 자취방, 가구를 줄일 수 없다면 시각적인 착시를 이용해보세요. 거울은 좁은 공간을 넓어 보이게 만드는 최고의 인테리어 소품입니다. 단순히 얼굴을 보는 용도를 넘어 공간을 확장하는 마법의 거울 배치법을 알려드립니다.</p>

        <h2>1. 창문 반대편에 배치하기 (채광 극대화)</h2>
        <p>창문 맞은편이나 빛이 들어오는 각도에 맞춰 거울을 배치해보세요.</p>
        <ul>
          <li><strong>효과:</strong> 창문으로 들어오는 자연광을 거울이 반사하여 방 전체를 환하게 만듭니다.</li>
          <li><strong>착시:</strong> 마치 창문이 하나 더 있는 듯한 개방감을 주어 방이 훨씬 넓어 보입니다.</li>
        </ul>

        <h2>2. 좁은 현관 측면 배치</h2>
        <p>원룸의 현관은 대부분 좁고 답답합니다. 신발장 맞은편이나 측면 벽에 거울을 달아보세요.</p>
        <ul>
          <li><strong>효과:</strong> 좁은 통로가 두 배로 넓어 보이는 효과가 있습니다.</li>
          <li><strong>실용성:</strong> 외출 전 옷매무새를 점검하기에도 완벽한 위치입니다.</li>
        </ul>

        <h2>3. 가로로 긴 거울 활용하기</h2>
        <p>책상 위나 침대 헤드 위쪽 벽면에 가로로 긴 거울을 걸어보세요.</p>
        <ul>
          <li><strong>효과:</strong> 벽면이 확장되어 보여 방의 가로폭이 넓어 보이는 효과를 줍니다.</li>
          <li><strong>인테리어:</strong> 갤러리 같은 세련된 분위기를 연출할 수 있습니다.</li>
        </ul>

        <h2>4. 거울 뒤 수납공간 활용 (틈새 수납)</h2>
        <p>공간이 부족하다면 '수납형 전신거울'을 추천합니다.</p>
        <ul>
          <li>거울 뒤쪽에 행거가 있거나 선반이 있는 제품을 사용하면, 전신 거울의 기능과 수납 해결을 동시에 할 수 있습니다.</li>
          <li>회전형 거울을 사용하면 필요할 때만 거울을 쓰고 평소에는 옷걸이로 활용할 수 있어 공간 효율적입니다.</li>
        </ul>
      </article>
    `
  },
  {
    slug: 'daiso-lighting-tips',
    title: '다이소 5천원으로 끝내는 자취방 감성 조명 세팅',
    excerpt: '비싼 조명 필요 없습니다. 다이소 꿀템으로 완성하는 아늑한 무드등 인테리어 가이드.',
    date: '2025-11-28',
    category: '생활꿀팁',
    keywords: ['다이소 조명', '자취방 조명', '무드등', '가성비 인테리어', '앵두전구'],
    faq: [
      {
        question: '건전지형 조명이 좋나요, USB형이 좋나요?',
        answer: '장시간 켜둘 예정이라면 건전지 교체 비용이 없는 USB형을 추천합니다. 이동이 잦다면 건전지형이 편합니다.'
      },
      {
        question: '조명 색깔은 어떤 게 좋은가요?',
        answer: '휴식을 위한 침실에는 따뜻한 노란빛(전구색)이 좋고, 공부나 작업을 하는 책상에는 하얀빛(주광색)이 좋습니다.'
      }
    ],
    content: `
      <article>
        <p class="lead">인테리어의 완성은 조명이라고 하죠. 하지만 비싼 디자이너 조명은 부담스럽습니다. 단돈 5천 원으로 우리 집을 감성 카페처럼 바꾸는 다이소 조명 활용법을 소개합니다.</p>

        <h2>1. 앵두 전구 (줄조명) 활용법</h2>
        <p>다이소 스테디셀러 앵두 전구는 어디에나 잘 어울립니다.</p>
        <ul>
          <li><strong>커튼 봉에 감기:</strong> 커튼을 따라 은은하게 내려오는 빛이 로맨틱한 분위기를 만듭니다.</li>
          <li><strong>벽면 트리 만들기:</strong> 크리스마스 시즌이 아니어도 벽에 지그재그로 붙여 사진을 집게로 걸어두면 포토월이 됩니다.</li>
          <li><strong>유리병에 넣기:</strong> 다 먹은 와인병이나 예쁜 유리병에 전구를 구겨 넣으면 그 자체로 훌륭한 무드등이 됩니다.</li>
        </ul>

        <h2>2. 터치식 무드등</h2>
        <p>침대 협탁이 허전하다면 3천 원~5천 원대 터치 무드등을 추천합니다.</p>
        <ul>
          <li><strong>수유등/독서등:</strong> 밝기 조절이 되는 제품을 고르면 자기 전 스마트폰을 하거나 책을 읽을 때 눈이 편안합니다.</li>
          <li><strong>디자인:</strong> 달 모양, 구름 모양 등 다양한 디자인이 있어 취향대로 고를 수 있습니다.</li>
        </ul>

        <h2>3. 스탠드형 조명 리폼하기</h2>
        <p>다이소의 저렴한 플라스틱 스탠드도 갓을 씌우거나 패브릭 천을 덮으면 고급스러운 조명으로 변신합니다.</p>
        <ul>
          <li>좋아하는 패턴의 손수건이나 얇은 천을 조명 갓 위에 살짝 덮어주세요. 빛이 은은하게 퍼지며 방 분위기가 확 바뀝니다. (단, LED 전구 사용 필수! 발열이 심한 전구는 화재 위험이 있습니다.)</li>
        </ul>
      </article>
    `
  },
  {
    slug: 'deposit-transfer-checklist',
    title: '전세 계약금 송금 전 체크리스트: 계좌번호 하나로 보증금 날리지 않는 법',
    excerpt: '등기부등본 확인부터 명의 일치, 가계약 주의사항, 송금 메모까지. 계약금 보내기 전에 반드시 확인해야 할 실전 체크리스트를 정리했습니다.',
    date: '2026-04-23',
    category: '전세안전',
    keywords: ['전세 계약금', '가계약 체크리스트', '보증금 사기 예방', '계좌 명의 확인', '전세 계약 주의사항'],
    faq: [
      {
        question: '가계약금도 돌려받을 수 있나요?',
        answer: '문구와 약정 조건에 따라 다릅니다. 단순히 계좌만 받고 송금했다면 돌려받기 어려운 경우도 있어, 송금 전 반환 조건을 문자나 계약서로 남기는 것이 중요합니다.'
      },
      {
        question: '집주인 본인 계좌가 아니면 무조건 위험한가요?',
        answer: '대리인 거래나 법인 명의 거래는 가능하지만, 위임장과 신분 확인이 끝나기 전에는 송금하지 않는 것이 안전합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">전세 계약에서 가장 위험한 순간은 계약금을 보내는 바로 그 순간입니다. 한 번 잘못 송금하면 되돌리기 어렵고, 사기성 거래라면 이후 절차가 훨씬 복잡해집니다. 아래 체크리스트는 계약금 송금 직전에 반드시 확인해야 할 핵심만 담았습니다.</p>

        <div class="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-lg not-prose">
          <h4 class="text-red-900 font-bold mb-2 text-lg">🚨 송금 전 3초 점검</h4>
          <ul class="text-red-800 space-y-1 text-sm">
            <li>등기부등본상 소유자와 계약 상대방 이름이 같은가</li>
            <li>계좌 명의가 집주인 또는 검증된 대리인과 일치하는가</li>
            <li>반환 조건과 특약 문구가 문자 또는 계약서에 남아 있는가</li>
          </ul>
        </div>

        <h2>1. 송금 전에 반드시 받아야 할 자료</h2>
        <ul>
          <li><strong>등기부등본 최신본:</strong> 갑구 소유자, 을구 근저당권, 가압류 여부를 다시 확인하세요.</li>
          <li><strong>신분증 또는 사업자 정보:</strong> 개인 거래인지, 법인·대리인 거래인지 명확히 구분해야 합니다.</li>
          <li><strong>매물 정보 캡처:</strong> 광고글, 중개사 설명, 보증금·월세·관리비 내용을 화면 캡처로 남겨두세요.</li>
        </ul>

        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span class="font-bold text-slate-800">📖 같이 보면 좋은 가이드</span>
            <p class="text-sm text-slate-600">등기부등본과 권리관계가 아직 헷갈린다면?</p>
          </div>
          <a href="/guide/how-to-read-registry" class="text-blue-600 font-bold hover:underline text-sm">등기부등본 보는 법 →</a>
        </div>

        <h2>2. 계좌번호보다 먼저 확인할 것: 명의 일치</h2>
        <p>계약 상대가 "급해서 다른 계좌로 보내달라"고 하는 순간부터 위험도가 올라갑니다.</p>
        <ul>
          <li><strong>집주인 본인 계좌:</strong> 가장 안전합니다. 이름 일치만으로 끝내지 말고 주민등록상 이름 철자까지 맞는지 보세요.</li>
          <li><strong>배우자·가족 계좌:</strong> 편의상 쓰는 경우도 있지만, 위임 근거 없이 송금하면 나중에 분쟁이 생깁니다.</li>
          <li><strong>법인 명의 계좌:</strong> 사업자등록증, 법인 등기, 담당자 재직 확인이 필요합니다.</li>
        </ul>

        <h2>3. 가계약일수록 조건을 더 정확히 남겨야 합니다</h2>
        <p>가계약은 금액이 작아 보여도 법적으로 계약의 일부로 판단될 수 있습니다. 구두 합의만 믿지 마세요.</p>

        <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200 my-6">
          <h4 class="font-bold text-yellow-900 mb-3">✅ 문자나 카톡에 남겨둘 문장 예시</h4>
          <ul class="space-y-2 text-yellow-800 text-sm">
            <li>"본 송금액은 전세 계약을 위한 가계약금이며, 등기부등본·보증보험 가입 가능 여부 확인 후 본계약 진행을 전제로 합니다."</li>
            <li>"확인 결과 문제가 있거나 계약 조건이 달라질 경우 전액 반환하는 것으로 합니다."</li>
            <li>"입금 계좌 명의자와 계약 당사자의 관계 및 권한을 확인했습니다."</li>
          </ul>
        </div>

        <h2>4. 송금 메모와 증거 보관도 중요합니다</h2>
        <ul>
          <li><strong>송금 메모:</strong> "OO동 전세 가계약금"처럼 거래 목적이 드러나게 적으세요.</li>
          <li><strong>계좌이체 확인증 저장:</strong> 은행 앱 화면만 보지 말고 PDF나 이미지로 별도 저장하세요.</li>
          <li><strong>통화 내용 요약 문자:</strong> 전화로 합의한 내용은 끊고 나서 문자로 다시 정리해 두는 것이 좋습니다.</li>
        </ul>

        <h2>5. 이런 말이 나오면 송금 보류가 맞습니다</h2>
        <ul>
          <li><strong>"오늘 안 보내면 다른 사람한테 넘긴다"</strong></li>
          <li><strong>"등기부등본은 나중에 보면 된다"</strong></li>
          <li><strong>"계좌는 제 것이 아니지만 문제 없다"</strong></li>
          <li><strong>"가계약금은 무조건 못 돌려준다"</strong></li>
        </ul>

        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-200 my-8">
          <h4 class="text-indigo-900 font-bold mb-2">💡 숫자로 먼저 안전 점검하기</h4>
          <p class="text-indigo-800 mb-4 text-sm">시세, 보증금, 근저당 정보만 알면 계약 전 위험도를 먼저 점검할 수 있습니다.</p>
          <a href="/safety-check" class="text-indigo-600 font-bold hover:underline flex items-center">
            전세 사기 위험 진단 바로가기
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <h2>6. 최종 체크리스트</h2>
        <ol>
          <li>등기부등본 최신본 확인</li>
          <li>소유자 이름과 계좌 명의 일치 확인</li>
          <li>가계약금 반환 조건 문자 기록</li>
          <li>송금 목적 메모 남기기</li>
          <li>이체 확인증과 광고 캡처 저장</li>
        </ol>
      </article>
    `
  },
  {
    slug: 'maintenance-fee-red-flags',
    title: '오피스텔 관리비 폭탄 피하는 법: 계약 전에 꼭 물어봐야 할 7가지',
    excerpt: '월세보다 관리비가 더 무서운 집도 있습니다. 공용관리비, 인터넷, 수도, 전기, 주차비까지 계약 전에 반드시 확인해야 할 질문을 정리했습니다.',
    date: '2026-04-23',
    category: '금융/절약',
    keywords: ['오피스텔 관리비', '원룸 관리비', '관리비 폭탄', '월세 절약', '관리비 체크리스트'],
    faq: [
      {
        question: '관리비는 왜 매물마다 차이가 큰가요?',
        answer: '건물 구조, 엘리베이터·주차장·경비 인력 유무, 개별 계량 여부에 따라 크게 달라집니다. 특히 오피스텔은 공동관리 항목이 많아 차이가 큽니다.'
      },
      {
        question: '관리비에 전기요금이 포함되면 더 좋은 건가요?',
        answer: '무조건 그렇지는 않습니다. 포함형은 편하지만 사용량이 적어도 고정비가 높을 수 있으니 실제 평균 납부 금액을 확인하는 편이 안전합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">보증금과 월세만 보고 계약했다가, 매달 빠져나가는 관리비 때문에 후회하는 경우가 많습니다. 특히 오피스텔은 관리비 구조가 복잡해서 실제 체감 주거비가 크게 달라질 수 있습니다.</p>

        <h2>1. &quot;관리비 10만 원&quot;만 믿으면 안 되는 이유</h2>
        <p>광고에 적힌 관리비는 보통 공용관리비만 적는 경우가 많습니다. 여기에 전기, 수도, 가스, 인터넷, 주차비가 따로 붙으면 실제 부담은 훨씬 커집니다.</p>

        <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200 my-6">
          <h4 class="font-bold text-yellow-900 mb-3">⚠️ 계약 전에 꼭 물어볼 질문</h4>
          <ul class="space-y-2 text-yellow-800 text-sm">
            <li>공용관리비에 포함되는 항목은 정확히 무엇인가요?</li>
            <li>전기, 수도, 가스는 개별 계량인가요?</li>
            <li>인터넷과 TV는 의무 가입인가요?</li>
            <li>주차비, 승강기 유지비, 청소비가 별도인가요?</li>
          </ul>
        </div>

        <h2>2. 관리비 내역서가 있으면 꼭 받아보세요</h2>
        <p>말로만 설명 듣지 말고, 최근 2~3개월 관리비 내역서를 요청하세요. 평균 금액을 확인하는 것이 가장 정확합니다.</p>
        <ul>
          <li><strong>여름·겨울 차이:</strong> 냉난방이 포함되는 구조인지 확인해야 합니다.</li>
          <li><strong>세입자 변경 직전 금액:</strong> 빈집 기간이 길면 평균이 낮게 보일 수 있습니다.</li>
          <li><strong>공실 관리비:</strong> 입주 전 공실 기간 비용을 세입자에게 넘기지 않는지도 확인하세요.</li>
        </ul>

        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span class="font-bold text-slate-800">📖 같이 보면 좋은 가이드</span>
            <p class="text-sm text-slate-600">관리비 항목 구조를 한 번에 이해하고 싶다면?</p>
          </div>
          <a href="/guide/maintenance-fee-guide" class="text-blue-600 font-bold hover:underline text-sm">관리비 확인 가이드 →</a>
        </div>

        <h2>3. 이런 매물은 특히 주의하세요</h2>
        <ul>
          <li><strong>&quot;관리비는 대충 10만 원쯤&quot;</strong>처럼 설명이 모호한 경우</li>
          <li><strong>인터넷·TV가 묶여 있어 해지 불가</strong>라고 하는 경우</li>
          <li><strong>전기와 냉난방 사용량을 개별 확인할 수 없는</strong> 경우</li>
          <li><strong>주차 등록비, 카드키 비용</strong> 같은 초기 비용을 뒤늦게 말하는 경우</li>
        </ul>

        <h2>4. 실제 체감 월 고정비 계산법</h2>
        <p>계약 전에는 월세만 보지 말고 아래처럼 합산해서 비교해야 합니다.</p>
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
          <p class="font-semibold text-slate-900 mb-2">실질 월 주거비 = 월세 + 공용관리비 + 평균 개별 공과금 + 인터넷/주차비</p>
          <p class="text-sm text-slate-600">예: 월세 55만 원 + 관리비 10만 원 + 전기/가스 7만 원 + 인터넷 2만 원 = 실제 74만 원</p>
        </div>

        <h2>5. 체크리스트 요약</h2>
        <ol>
          <li>관리비 포함 항목을 문서로 확인</li>
          <li>최근 2~3개월 내역서 요청</li>
          <li>개별 계량 여부 확인</li>
          <li>인터넷·주차·카드키 추가 비용 확인</li>
          <li>실질 월 주거비로 다른 매물과 비교</li>
        </ol>
      </article>
    `
  },
  {
    slug: 'lease-end-notice-template',
    title: '전세·월세 만기 통보 문자 예시: 계약 종료 전에 이렇게 보내면 분쟁이 줄어든다',
    excerpt: '만기 전에 언제, 어떤 문구로 통보해야 하는지 헷갈린다면 이 글부터 보세요. 전세·월세 종료 통보 예시와 증거 남기는 방법을 정리했습니다.',
    date: '2026-04-23',
    category: '전세안전',
    keywords: ['전세 만기 통보', '월세 만기 문자', '계약 종료 통보', '보증금 반환 준비', '임대차 종료'],
    faq: [
      {
        question: '언제까지 통보해야 안전한가요?',
        answer: '보통 계약 종료 2~3개월 전에 미리 통보하는 것이 가장 안전합니다. 계약서 특약이나 개별 상황에 따라 다를 수 있어 늦지 않게 남겨두는 편이 좋습니다.'
      },
      {
        question: '전화로 말했으면 충분한가요?',
        answer: '전화만으로는 나중에 증거가 약할 수 있습니다. 통화 후 문자나 카카오톡으로 동일한 내용을 다시 남겨두는 것이 좋습니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">계약 만기가 다가오는데 집주인에게 어떻게 말을 꺼내야 할지 막막한 경우가 많습니다. 말 한마디를 애매하게 남기면 보증금 반환 시점과 계약 종료 여부를 두고 분쟁이 커질 수 있습니다.</p>

        <h2>1. 문자로 남겨야 하는 이유</h2>
        <ul>
          <li><strong>계약 종료 의사</strong>를 분명하게 남길 수 있습니다.</li>
          <li><strong>나중에 보증금 반환 요구의 출발점</strong>이 됩니다.</li>
          <li><strong>통화 내용이 바뀌더라도</strong> 기록이 남습니다.</li>
        </ul>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
          <h4 class="text-blue-900 font-bold mb-2 text-lg">✉️ 가장 무난한 문자 예시</h4>
          <p class="text-blue-800 text-sm leading-7">
            안녕하세요. 임차인 OOO입니다.<br/>
            현재 거주 중인 OOO호 임대차 계약은 2026년 O월 O일에 만료될 예정입니다.<br/>
            저는 계약을 연장하지 않고 만기일에 맞춰 퇴거할 예정이므로, 보증금 반환 준비를 부탁드립니다.<br/>
            확인 부탁드립니다.
          </p>
        </div>

        <h2>2. 이렇게 보내면 더 좋습니다</h2>
        <ul>
          <li><strong>주소/호수 포함:</strong> 여러 채를 가진 집주인은 헷갈릴 수 있습니다.</li>
          <li><strong>퇴거 의사 명시:</strong> &quot;연장하지 않겠습니다&quot;를 분명히 적으세요.</li>
          <li><strong>보증금 반환 언급:</strong> 만기일 반환 준비를 요청하는 문장을 같이 넣으세요.</li>
        </ul>

        <h2>3. 답장이 없을 때</h2>
        <p>답장이 없더라도 메시지 발송 기록은 남습니다. 그래도 불안하면 다음 순서로 가면 됩니다.</p>
        <ol>
          <li>같은 내용을 한 번 더 문자 또는 카카오톡으로 전송</li>
          <li>통화 후 통화 요약 문자를 다시 전송</li>
          <li>만기 직전에도 반응이 없으면 내용증명 검토</li>
        </ol>

        <div class="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span class="font-bold text-slate-800">📖 같이 보면 좋은 가이드</span>
            <p class="text-sm text-slate-600">집주인이 보증금을 늦게 주겠다고 하면?</p>
          </div>
          <a href="/guide/deposit-return-delay" class="text-blue-600 font-bold hover:underline text-sm">내용증명 작성 가이드 →</a>
        </div>

        <h2>4. 피해야 할 표현</h2>
        <ul>
          <li><strong>&quot;아마 나갈 것 같아요&quot;</strong>처럼 애매한 표현</li>
          <li><strong>감정 섞인 비난</strong>이나 협박성 표현</li>
          <li><strong>보증금 반환 시점이 빠진</strong> 단순 알림</li>
        </ul>

        <h2>5. 만기 전에 같이 준비할 것</h2>
        <ul>
          <li>퇴실일과 이사일 정리</li>
          <li>계약서, 입금내역, 대화 내역 보관</li>
          <li>새 집 계약 일정과 보증금 연결 계획 점검</li>
        </ul>
      </article>
    `
  },
  {
    slug: 'first-appliance-budget-plan',
    title: '첫 자취 가전 우선순위: 한 번에 다 사지 말고 이것부터 사세요',
    excerpt: '냉장고, 세탁기, 전자레인지, 청소기 중 무엇부터 사야 할지 고민된다면 우선순위부터 정해야 합니다. 예산별 자취 가전 구성을 정리했습니다.',
    date: '2026-04-23',
    category: '생활꿀팁',
    keywords: ['자취 가전 추천', '원룸 가전 우선순위', '첫 자취 예산', '가전 구매 순서', '자취 필수템'],
    faq: [
      {
        question: '첫 자취에 건조기까지 꼭 필요한가요?',
        answer: '공간과 예산이 넉넉하지 않다면 우선순위는 아닙니다. 세탁기, 냉장고, 전자레인지처럼 생활 필수 장비부터 갖추는 편이 효율적입니다.'
      },
      {
        question: '중고 가전으로 시작해도 괜찮나요?',
        answer: '냉장고와 세탁기는 상태만 좋다면 중고도 가능합니다. 다만 배송, 설치, 소비전력, 위생 상태를 꼭 확인해야 합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">첫 자취를 시작하면 당장 다 사고 싶지만, 예산은 늘 부족합니다. 가전은 한 번 잘못 사면 공간도 차지하고 다시 처분하기도 번거롭기 때문에 우선순위를 정하는 것이 중요합니다.</p>

        <h2>1. 가장 먼저 필요한 가전 3개</h2>
        <ol>
          <li><strong>냉장고:</strong> 식비를 줄이고 생활 패턴을 안정시키는 핵심입니다.</li>
          <li><strong>세탁기:</strong> 빨래방 비용과 시간을 줄여줍니다.</li>
          <li><strong>전자레인지:</strong> 간편식, 도시락, 냉장 식재료 활용도가 크게 올라갑니다.</li>
        </ol>

        <h2>2. 예산 50만 원 이하라면</h2>
        <ul>
          <li>중고 냉장고</li>
          <li>중고 또는 소형 세탁기</li>
          <li>보급형 전자레인지</li>
          <li>스탠드형 선풍기 또는 소형 난방기 중 계절형 1개</li>
        </ul>

        <h2>3. 예산 100만 원 전후라면</h2>
        <ul>
          <li>에너지 효율이 나은 냉장고</li>
          <li>통돌이 또는 소형 드럼세탁기</li>
          <li>전자레인지 + 간단한 전기포트</li>
          <li>청소기 또는 무선청소기 입문형</li>
        </ul>

        <div class="bg-green-50 p-6 rounded-xl border border-green-200 my-8">
          <h4 class="text-green-900 font-bold mb-2">💡 절약 포인트</h4>
          <ul class="text-green-800 text-sm space-y-1">
            <li>가전보다 배송비와 설치비가 더 커질 수 있으니 반드시 포함 금액으로 비교하세요.</li>
            <li>원룸이라면 크기보다 소음과 소비전력이 체감 만족도에 더 큰 영향을 줍니다.</li>
            <li>멀티탭, 수납장, 작은 조명 같은 주변 품목 예산도 같이 남겨두세요.</li>
          </ul>
        </div>

        <h2>4. 나중에 사도 되는 가전</h2>
        <ul>
          <li>대형 TV</li>
          <li>건조기</li>
          <li>로봇청소기</li>
          <li>오븐, 에어프라이어 같은 취향형 조리 가전</li>
        </ul>

        <h2>5. 구매 전 체크리스트</h2>
        <ul>
          <li>설치 공간 실측</li>
          <li>문 열리는 방향 확인</li>
          <li>소비전력과 월 전기요금 추정</li>
          <li>엘리베이터/계단 반입 가능 여부 확인</li>
        </ul>
      </article>
    `
  }
];



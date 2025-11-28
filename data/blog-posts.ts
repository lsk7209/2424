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
      <article>
        <p class="lead">최근 전세 사기 피해가 급증하면서 불안해하는 분들이 많습니다. "설마 나한테 그런 일이 생기겠어?"라는 안일한 생각이 가장 위험합니다. 정확한 지식과 꼼꼼한 확인만이 내 소중한 보증금을 지킬 수 있는 유일한 방법입니다. 사회초년생도 쉽게 이해할 수 있도록 전세 계약 전 반드시 확인해야 할 핵심 포인트를 정리해 드립니다.</p>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg not-prose">
          <h4 class="text-blue-900 font-bold mb-2 text-lg">💡 계약 전, 1분 만에 안전 진단해보세요!</h4>
          <p class="text-blue-800 mb-4">계약하려는 집의 보증금과 시세만 알면, AI가 깡통전세 위험도를 분석해 드립니다.</p>
          <a href="/safety-check" class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors no-underline shadow-md">
            🏠 전세 사기 위험도 무료 진단하기 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </a>
        </div>

        <h2>1. 등기부등본, '3번 확인의 법칙'을 기억하세요</h2>
        <p>등기부등본은 부동산의 신분증입니다. 계약 전, 잔금 치르기 전, 그리고 전입신고 당일 등 <strong>최소 3번</strong>은 확인해야 합니다. 공인중개사가 보여주는 것만 믿지 말고, 대법원 인터넷등기소에서 직접 열람해보는 습관을 들이세요.</p>
        
        <h3>갑구(소유권)에서 봐야 할 것</h3>
        <ul>
          <li><strong>소유자 일치 여부:</strong> 계약하러 나온 사람이 등기부상 소유자와 동일인인지 신분증을 대조하여 확인하세요. 대리인이 나왔다면 위임장과 인감증명서를 반드시 요구해야 합니다.</li>
          <li><strong>위험한 단어 찾기:</strong> '가압류', '가처분', '가등기', '예고등기' 등의 단어가 보이면 뒤도 돌아보지 말고 피해야 합니다. 소유권 분쟁이 있는 매우 위험한 집입니다.</li>
        </ul>

        <h3>을구(소유권 이외의 권리)에서 봐야 할 것</h3>
        <ul>
          <li><strong>근저당권 설정액:</strong> 집주인이 집을 담보로 은행에서 빌린 돈입니다.</li>
          <li><strong>안전한 집의 공식:</strong> <span class="bg-yellow-100 px-2 py-1 rounded font-bold">(근저당권 설정액 + 내 전세 보증금) < 집 시세의 70%</span></li>
          <li>이 비율을 넘어가면 집이 경매로 넘어갔을 때 보증금을 전액 돌려받지 못할 확률이 매우 높은 '깡통전세'입니다.</li>
        </ul>

        <div class="bg-red-50 p-6 rounded-xl border border-red-200 my-8">
          <h4 class="text-red-700 font-bold mb-3 flex items-center text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            절대 계약하면 안 되는 '신탁 등기'
          </h4>
          <p class="text-red-800 leading-relaxed">
            등기부등본 갑구에 <strong>'신탁'</strong>이라는 단어가 있다면 일단 멈추세요. 이는 집의 실제 소유권이 집주인이 아닌 '신탁 회사'에 있다는 뜻입니다.<br><br>
            이 경우 집주인(위탁자)과 맺은 계약은 <strong>무효</strong>가 될 수 있으며, 보증금을 한 푼도 돌려받지 못하고 쫓겨날 수 있습니다. 반드시 신탁 원부를 발급받아 신탁 회사의 동의가 있는지 확인해야 하며, 전문가의 도움 없이는 계약하지 않는 것이 좋습니다.
          </p>
        </div>

        <h2>2. 전세보증보험, 선택이 아닌 필수</h2>
        <p>전세보증보험은 집주인이 보증금을 돌려주지 않을 때 보증 기관(HUG, HF, SGI)이 대신 돌려주는 제도입니다. 계약 전 집주인에게 "보증보험 가입에 동의하시나요?"라고 묻는 것만으로도 사기꾼을 1차적으로 걸러낼 수 있습니다.</p>
        <ul>
          <li><strong>HUG(주택도시보증공사):</strong> 가장 많이 이용하며, 전세금 안심대출보증도 가능합니다.</li>
          <li><strong>가입 조건 체크:</strong> 전세 보증금과 선순위 채권의 합이 주택 가격의 90% 이내여야 합니다 (2024년 기준 강화됨). 공시지가의 126% 룰을 꼭 기억하세요.</li>
        </ul>

        <h2>3. 특약사항으로 나를 지키는 방패 만들기</h2>
        <p>계약서 특약사항 한 줄이 법적 효력을 발휘하여 나를 지켜줍니다. 공인중개사에게 아래 특약들을 넣어달라고 당당하게 요구하세요.</p>
        <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 my-6">
          <h4 class="font-bold text-gray-900 mb-4">✅ 필수 특약사항 복사해서 쓰세요</h4>
          <ol class="space-y-3 list-decimal list-inside text-gray-700">
            <li><strong>"전세자금대출 미승인 시 계약금 전액을 즉시 반환한다."</strong> <br><span class="text-sm text-gray-500 pl-6">- 건물의 문제로 대출이 안 될 경우 계약금을 날리는 것을 방지합니다.</span></li>
            <li><strong>"임대인은 잔금 지급일 다음 날까지 현재의 권리 상태(근저당권 등)를 유지한다."</strong> <br><span class="text-sm text-gray-500 pl-6">- 내가 전입신고를 하기 전에 집주인이 몰래 대출을 받는 '시간차 공격'을 막습니다.</span></li>
            <li><strong>"전세보증보험 가입 불가 시 계약을 무효로 하고 계약금을 반환한다."</strong></li>
            <li><strong>"임대인은 국세 및 지방세 체납 사실이 없음을 확인한다."</strong></li>
          </ol>
        </div>

        <h2>4. 전입신고와 확정일자는 '이사 당일' 즉시!</h2>
        <p>이사 당일은 정신이 없겠지만, 무엇보다 먼저 해야 할 일은 <strong>전입신고</strong>와 <strong>확정일자</strong> 받기입니다.</p>
        <ul>
          <li><strong>대항력 확보:</strong> 전입신고 + 점유(이사)를 하면 다음 날 0시부터 제3자에게 내 권리를 주장할 수 있는 힘이 생깁니다.</li>
          <li><strong>우선변제권 확보:</strong> 여기에 확정일자까지 받으면, 집이 경매로 넘어갔을 때 후순위 권리자보다 먼저 배당받을 수 있습니다.</li>
          <li><strong>팁:</strong> 주민센터 방문이 어렵다면 '정부24' 앱과 '인터넷등기소'를 통해 온라인으로도 가능합니다.</li>
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
      <article>
        <p class="lead">이사는 단순한 짐 옮기기가 아닙니다. 수많은 행정 절차와 예약이 필요한 거대한 프로젝트죠. D-30부터 차근차근 준비해야 이사 당일 당황하지 않고 여유롭게 새 출발을 할 수 있습니다. 시기별 필수 체크리스트를 확인하세요.</p>

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
        <ul>
          <li><strong>이사 날짜 확정:</strong> 현재 살고 있는 집의 만기일과 새집 입주일을 조율합니다. '손 없는 날'이나 '금요일/월말'은 비용이 20~30% 비쌀 수 있으니, 가능하다면 평일 중간을 공략하세요.</li>
          <li><strong>이사업체 선정 및 계약:</strong> 최소 3군데 이상 견적을 비교하세요. 전화로만 묻지 말고 반드시 <strong>방문 견적</strong>을 받아야 나중에 추가 요금 시비가 없습니다.</li>
          <li><strong>불필요한 짐 정리 (중요!):</strong> 이사 비용은 '짐의 양'에 비례합니다. 1년 이상 안 쓴 물건, 입지 않는 옷은 과감히 버리거나 당근마켓에 판매하세요. 짐을 줄이는 것이 돈을 버는 길입니다.</li>
        </ul>

        <h2>📅 D-14: 행정 절차 및 예약 (2주 전)</h2>
        <p>이제 구체적인 실행 계획을 세워야 할 때입니다.</p>
        <ul>
          <li><strong>입주청소 예약:</strong> 새집 청소는 전문가에게 맡기는 것이 정신 건강에 좋습니다. 평당 10,000원~15,000원 선이며, 이사 하루 전날 하는 것이 가장 좋습니다.</li>
          <li><strong>엘리베이터 예약:</strong> 현재 사는 곳과 이사 갈 곳의 관리사무소에 미리 연락하여 이사 날짜를 알리고 엘리베이터 사용을 예약하세요. (사용료 발생 가능)</li>
          <li><strong>가구/가전 배치 구상:</strong> 새집 도면을 구해 가구 배치를 미리 시뮬레이션해보세요. 이사 당일 직원분들에게 "이건 여기, 저건 저기 놔주세요"라고 명확히 지시해야 두 번 일하지 않습니다.</li>
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
          <li><strong>우편물 주소 이전 서비스:</strong> 우체국 주거이전 서비스를 신청(유료/무료 확인)하여 우편물이 새 주소로 오도록 하세요.</li>
          <li><strong>금융 주소 변경:</strong> 카드사, 은행 등 금융기관 주소를 한 번에 변경하는 '금융주소 한번에' 서비스를 이용하세요.</li>
          <li><strong>폐가전/폐가구 배출 신고:</strong> 버리고 갈 큰 짐들에 스티커를 붙이거나 '폐가전 무상방문수거 서비스(1599-0903)'를 예약하세요.</li>
        </ul>

        <h2>📅 D-1: 최종 점검 (하루 전)</h2>
        <ul>
          <li><strong>귀중품 별도 보관:</strong> 현금, 보석, 중요 서류, 노트북 등은 이삿짐 트럭에 싣지 말고 개인 가방이나 자가용에 따로 챙기세요. 분실 시 보상받기 어렵습니다.</li>
          <li><strong>쓰레기봉투 준비:</strong> 100L 종량제 봉투를 넉넉히(3~4장) 준비하세요. 이사 당일 나오는 쓰레기가 생각보다 많습니다.</li>
          <li><strong>냉장고 비우기:</strong> 냉장고 음식은 아이스박스에 담거나 미리 먹어서 비워두세요.</li>
          <li><strong>현금 준비:</strong> 이사 당일 식대, 간식비, 혹은 잔금 정산 시 자투리 금액 처리를 위해 10만 원 정도의 현금을 준비해두면 유용합니다.</li>
        </ul>

        <h2>🚚 D-Day: 이사 당일</h2>
        <ol>
          <li><strong>공과금 정산:</strong> 전기, 가스, 수도 요금을 계량기 확인 후 정산합니다. (관리실이나 각 공급업체에 전화)</li>
          <li><strong>이삿짐 확인:</strong> 파손되거나 분실된 물건이 없는지 이사팀 철수 전 꼼꼼히 확인하세요. 바닥 찍힘 등도 체크해야 합니다.</li>
          <li><strong>전입신고 및 확정일자:</strong> 짐 정리가 끝나면 즉시 주민센터를 방문하거나 온라인으로 신고하세요. 보증금 보호를 위해 가장 중요한 절차입니다.</li>
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
  }
];

export interface GuidePost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  date: string;
  category: '법률' | '생활' | '안전' | '청소' | '행정' | '계약' | '금융' | '이사';
  coverImage?: string;
  keywords: string[]; // SEO Keywords
  faq?: { question: string; answer: string }[]; // AEO/GEO Optimized FAQ
}

export const guidePosts: GuidePost[] = [
  {
    slug: 'how-to-read-registry',
    title: '등기부등본 보는 법 A to Z: 전세 사기 피하는 필수 생존 지식',
    excerpt: '집 계약 전 필수! 표제부, 갑구, 을구의 의미와 반드시 확인해야 할 위험 신호를 완벽하게 분석해드립니다.',
    date: '2025-11-28',
    category: '법률',
    keywords: ['등기부등본 보는법', '전세 계약 주의사항', '근저당권 계산', '갑구 을구 차이'],
    faq: [
      {
        question: '등기부등본은 어디서 발급받나요?',
        answer: '대법원 인터넷등기소(iros.go.kr)에서 누구나 열람 및 발급이 가능합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">부동산 계약 전, 등기부등본을 볼 줄 모르면 내 보증금은 '운'에 맡겨야 합니다. 표제부, 갑구, 을구의 핵심만 짚어드립니다.</p>
        
        <div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <h3 class="text-blue-900 font-bold text-lg mb-2">💡 3초 요약</h3>
            <ul class="list-disc list-inside text-blue-800 space-y-1">
                <li><strong>표제부:</strong> 내가 계약하려는 집주소와 일치하는지 확인</li>
                <li><strong>갑구:</strong> 집주인(소유자)이 계약자와 동일인인지 확인</li>
                <li><strong>을구:</strong> 빚(근저당권)이 얼마나 있는지 확인 (가장 중요!)</li>
            </ul>
        </div>

        <h2>1. 표제부: 집의 신분증</h2>
        <p>건물의 주소, 면적, 용도 등이 적혀 있습니다. 계약서상의 주소와 100% 일치해야 합니다.</p>
        <ul class="list-none pl-0 space-y-2">
            <li class="flex items-start gap-2">
                <span class="text-red-500 font-bold">⚠️ 주의:</span>
                <span>다세대주택(빌라)은 지번뿐만 아니라 <strong>동, 호수</strong>까지 정확히 일치해야 합니다.</span>
            </li>
            <li class="flex items-start gap-2">
                <span class="text-blue-500 font-bold">Tip:</span>
                <span>'근린생활시설'로 표기되어 있다면 전세자금대출이 불가능할 수 있으니 주의하세요.</span>
            </li>
        </ul>

        <hr class="my-8 border-slate-200" />

        <h2>2. 갑구: 소유권에 관한 사항</h2>
        <p>현재 집주인이 누구인지, 소유권에 문제가 없는지 보여줍니다.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 class="font-bold text-slate-900 mb-2">✅ 확인해야 할 것</h4>
                <p class="text-sm text-slate-600">가장 마지막 순위의 소유자가 현재 집주인입니다. 신분증과 대조하여 이름, 주민번호 앞자리가 일치하는지 확인하세요.</p>
            </div>
            <div class="p-4 bg-red-50 rounded-xl border border-red-200">
                <h4 class="font-bold text-red-900 mb-2">❌ 피해야 할 단어</h4>
                <p class="text-sm text-red-800">가압류, 가처분, 가등기, 예고등기, 경매개시결정. 이런 단어가 보이면 즉시 계약을 중단하세요.</p>
            </div>
        </div>

        <hr class="my-8 border-slate-200" />

        <h2>3. 을구: 소유권 이외의 권리 (빚)</h2>
        <p>이 집을 담보로 빚이 얼마나 있는지 보여줍니다. <strong>깡통전세</strong>를 피하기 위해 가장 꼼꼼히 봐야 합니다.</p>
        
        <h3 class="text-lg font-bold mt-6 mb-3">안전한 집 계산 공식</h3>
        <div class="bg-slate-900 text-white p-6 rounded-xl text-center mb-6">
            <p class="text-lg font-medium">
                (근저당권 설정액 + 내 전세 보증금) <br/>
                <span class="text-yellow-400">≤ 집 시세의 70%</span>
            </p>
        </div>
        <p>채권최고액(은행이 빌려준 돈의 120~130%)을 기준으로 계산해야 안전합니다. 말소된 권리는 빨간 줄이 그어져 있으니, 살아있는 권리만 합산하세요.</p>
        
        <div class="mt-8">
            <a href="/safety-check" class="block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-bold rounded-xl transition-colors no-underline">
                내 보증금 안전할까? 1분 만에 진단하기 →
            </a>
        </div>
      </article>
    `
  },
  {
    slug: 'standard-rental-contract',
    title: '표준임대차계약서 작성 가이드: 특약사항 한 줄이 내 돈을 지킨다',
    excerpt: '법무부가 권장하는 표준임대차계약서, 빈칸 없이 꼼꼼하게 채우는 방법과 필수 특약사항 5가지.',
    date: '2025-11-28',
    category: '법률',
    keywords: ['표준임대차계약서', '전세 계약 특약', '임대차계약 주의사항'],
    faq: [
      {
        question: '특약사항은 법적 효력이 있나요?',
        answer: '네, 강행규정을 위반하지 않는 한 유효합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">계약서는 집주인과 나 사이의 법입니다. "좋은 게 좋은 거지"라고 넘겼다가는 나중에 피눈물 흘릴 수 있습니다. 빈칸 하나도 허투루 넘기지 마세요.</p>

        <h2>1. 임대인, 임차인 인적사항</h2>
        <p>반드시 <strong>신분증</strong>을 직접 확인하고 기재해야 합니다.</p>
        <ul class="list-disc list-inside space-y-2 text-slate-700">
            <li>집주인이 못 나온다면? 위임장 + 인감증명서(본인발급) 필수 확인</li>
            <li>공동명의라면? 명의자 전원의 동의(도장) 필요</li>
        </ul>

        <hr class="my-8 border-slate-200" />

        <h2>2. 계약 내용 (보증금, 월세)</h2>
        <p>금액은 위조 방지를 위해 <strong>한글과 숫자를 병기</strong>합니다. (예: 금 일억 원 정 (₩100,000,000))</p>
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl my-4">
            <span class="font-bold text-yellow-800">💡 계좌 이체 주의사항</span>
            <p class="text-sm text-yellow-700 mt-1">계약금, 잔금 등 모든 돈은 반드시 <strong>등기부상 소유자 명의의 계좌</strong>로 입금해야 합니다. 가족이나 대리인 계좌는 절대 금물!</p>
        </div>

        <hr class="my-8 border-slate-200" />

        <h2>3. 특약사항: 나를 지키는 방패</h2>
        <p>구두로 약속한 내용은 법적 효력이 약합니다. 사소한 것이라도 특약에 적으세요.</p>
        
        <div class="space-y-4 my-6">
            <div class="border border-slate-200 rounded-xl overflow-hidden">
                <div class="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700">필수 특약 BEST 3</div>
                <div class="p-4 space-y-3">
                    <div class="flex gap-3">
                        <span class="text-indigo-600 font-bold">1.</span>
                        <p class="text-sm">전세자금대출 미승인 시 계약금 전액을 즉시 반환한다.</p>
                    </div>
                    <div class="flex gap-3">
                        <span class="text-indigo-600 font-bold">2.</span>
                        <p class="text-sm">임대인은 잔금 지급일 다음 날까지 현재의 권리 상태(근저당권 등)를 유지한다. (시간차 대출 방지)</p>
                    </div>
                    <div class="flex gap-3">
                        <span class="text-indigo-600 font-bold">3.</span>
                        <p class="text-sm">임대인은 전세보증보험 가입에 동의하며, 가입 불가 시 계약을 해지하고 보증금을 반환한다.</p>
                    </div>
                </div>
            </div>
        </div>

        <p>이 외에도 반려동물 키우기, 못 박기, 옵션 수리 비용 부담 등 애매한 부분은 미리 협의하여 적어두는 것이 좋습니다.</p>
      </article>
    `
  },
  {
    slug: 'jeonse-insurance-guide',
    title: '전세보증보험 가입 조건 및 반려 사유 총정리 (HUG, HF, SGI)',
    excerpt: '내 보증금을 지키는 최후의 보루. 보증보험 가입 조건부터 거절되는 이유까지 상세하게 알려드립니다.',
    date: '2025-11-28',
    category: '금융',
    keywords: ['전세보증보험', 'HUG 보증보험', '전세금 반환 보증', '보증보험 가입조건'],
    faq: [
      {
        question: '집주인 동의가 필요한가요?',
        answer: '아니요, 집주인 동의 없이도 가입 가능합니다. 단, 집주인에게 통지는 갑니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">전세보증보험은 선택이 아닌 필수입니다. 내 소중한 보증금을 지키는 최후의 보루, 가입 조건부터 거절 사유까지 꼼꼼히 따져보세요.</p>

        <h2>1. 보증기관별 특징 비교</h2>
        <div class="overflow-x-auto my-6">
            <table class="w-full text-sm text-left text-slate-600 border-collapse">
                <thead class="text-xs text-slate-700 uppercase bg-slate-100">
                    <tr>
                        <th class="px-4 py-3 border">구분</th>
                        <th class="px-4 py-3 border">HUG (주택도시보증공사)</th>
                        <th class="px-4 py-3 border">HF (한국주택금융공사)</th>
                        <th class="px-4 py-3 border">SGI (서울보증보험)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-3 border font-bold">특징</td>
                        <td class="px-4 py-3 border">가장 대중적, 안심대출 가능</td>
                        <td class="px-4 py-3 border">보증료 저렴, 소득요건 있음</td>
                        <td class="px-4 py-3 border">고액 전세 가능, 보증료 비쌈</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 border font-bold">집주인 동의</td>
                        <td class="px-4 py-3 border">불필요 (통지만 감)</td>
                        <td class="px-4 py-3 border">불필요</td>
                        <td class="px-4 py-3 border">일부 필요할 수 있음</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>2. 가입이 거절되는 대표적인 이유 (가입 불가)</h2>
        <ul class="space-y-3 my-4">
            <li class="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <span class="text-red-500 font-bold">❌</span>
                <div>
                    <strong>위반건축물:</strong> 건축물대장에 '위반건축물'로 등재된 경우 (불법 증축 등)
                </div>
            </li>
            <li class="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <span class="text-red-500 font-bold">❌</span>
                <div>
                    <strong>선순위 채권 과다:</strong> (근저당권 + 선순위 보증금)이 주택 가격의 60~80%를 초과하는 경우
                </div>
            </li>
            <li class="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <span class="text-red-500 font-bold">❌</span>
                <div>
                    <strong>전세가율 90% 초과:</strong> 전세 보증금이 주택 가격(공시지가의 126%)의 90%를 넘는 경우 (2024년 기준)
                </div>
            </li>
        </ul>

        <div class="mt-8 p-6 bg-indigo-50 rounded-2xl text-center">
            <h3 class="text-indigo-900 font-bold text-lg mb-2">내 집은 보증보험 가입 될까?</h3>
            <p class="text-indigo-700 mb-4 text-sm">계약 전에 미리 확인하지 않으면 낭패를 볼 수 있습니다.</p>
            <a href="/safety-check" class="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors no-underline">
                안전진단 계산기로 확인하기
            </a>
        </div>
      </article>
    `
  },
  {
    slug: 'moving-center-selection',
    title: '호구 당하지 않는 포장이사 업체 선정 체크리스트',
    excerpt: '이사 비용, 부르는 게 값? 견적 비교하는 법부터 추가 비용 폭탄 피하는 노하우 공개.',
    date: '2025-11-28',
    category: '이사',
    keywords: ['포장이사 견적', '이사업체 추천', '이사 비용 줄이기', '방문견적'],
    faq: [
      {
        question: '방문 견적은 꼭 받아야 하나요?',
        answer: '네, 전화 견적과 실제 짐 양이 다르면 당일 추가 비용 시비가 생길 수 있습니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">이사업체 잘 고르면 이사가 편해지고, 잘못 고르면 가구가 상하고 마음도 상합니다. 호구 당하지 않는 견적 비교 노하우를 공개합니다.</p>

        <h2>1. 견적 비교의 정석</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                <div class="text-2xl mb-2">📞</div>
                <div class="font-bold text-slate-800">전화 견적 (비추천)</div>
                <p class="text-xs text-slate-500 mt-1">정확하지 않아 당일 추가 요금 발생 확률 99%</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-100 shadow-sm text-center transform scale-105">
                <div class="text-2xl mb-2">👀</div>
                <div class="font-bold text-indigo-800">방문 견적 (필수)</div>
                <p class="text-xs text-indigo-600 mt-1">짐 양, 작업 환경을 직접 보고 정확한 금액 산출</p>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                <div class="text-2xl mb-2">📱</div>
                <div class="font-bold text-slate-800">비교 어플</div>
                <p class="text-xs text-slate-500 mt-1">대략적인 시세 파악용으로 활용</p>
            </div>
        </div>

        <h2>2. 허가 업체 확인하기</h2>
        <p>무허가 업체는 이사 중 파손이나 분실 사고가 발생했을 때 보상받기 어렵습니다.</p>
        <ul class="list-disc list-inside text-slate-700">
            <li><strong>확인 방법:</strong> '허가이사종합정보' 사이트에서 업체명 검색</li>
            <li><strong>필수 서류:</strong> 화물자동차운송주선사업 허가증, 적재물배상책임보험 가입 증명서</li>
        </ul>

        <hr class="my-8 border-slate-200" />

        <h2>3. 계약서에 반드시 적어야 할 것 (추가 비용 방지)</h2>
        <p>구두 계약은 위험합니다. 아래 내용을 서면 계약서에 명시하세요.</p>
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
            <div class="flex items-center gap-2">
                <input type="checkbox" checked readOnly class="text-indigo-600 rounded" />
                <span>식대 및 수고비 포함 여부 (별도 요구 금지 명시)</span>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" checked readOnly class="text-indigo-600 rounded" />
                <span>사다리차 비용 (층수, 조건에 따라 명확히)</span>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" checked readOnly class="text-indigo-600 rounded" />
                <span>에어컨 탈부착, 벽걸이 TV 설치 비용</span>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" checked readOnly class="text-indigo-600 rounded" />
                <span>작업 인원 (남자 N명, 여자 N명) 및 외국인 노동자 여부</span>
            </div>
        </div>
      </article>
    `
  },
  {
    slug: 'administrative-welfare-center',
    title: '이사 당일 주민센터 업무: 전입신고, 확정일자, 대형폐기물',
    excerpt: '이사 날 정신없는데 주민센터 가서 뭐 해야 하지? 한 번에 끝내는 행정 업무 가이드.',
    date: '2025-11-28',
    category: '행정',
    keywords: ['전입신고', '확정일자', '대형폐기물 스티커', '이사 행정'],
    faq: [
      {
        question: '인터넷으로도 가능한가요?',
        answer: '네, 정부24에서 전입신고, 인터넷등기소에서 확정일자 부여가 가능합니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">이사 당일은 몸이 열 개라도 모자랍니다. 짐 정리는 나중에 해도 되지만, 법적 효력이 있는 행정 업무는 반드시 당일에 끝내야 합니다.</p>

        <div class="flex flex-col md:flex-row gap-4 my-8">
            <div class="flex-1 bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
                <h3 class="font-bold text-lg mb-2 flex items-center gap-2">
                    <span>1️⃣</span> 전입신고 + 확정일자
                </h3>
                <p class="text-indigo-100 text-sm mb-4">내 보증금을 지키는 가장 강력한 무기입니다. 미루면 대항력이 생기지 않습니다.</p>
                <ul class="text-sm space-y-1">
                    <li>📍 <strong>어디서?</strong> 관할 주민센터 또는 정부24(온라인)</li>
                    <li>⏰ <strong>언제?</strong> 이사 당일 즉시</li>
                    <li>📄 <strong>준비물:</strong> 신분증, 계약서 원본</li>
                </ul>
            </div>
            <div class="flex-1 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <h3 class="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span>2️⃣</span> 각종 공과금 정산
                </h3>
                <p class="text-slate-600 text-sm mb-4">이전 세입자가 쓴 요금을 내가 내지 않으려면 계량기 확인이 필수입니다.</p>
                <ul class="text-sm text-slate-600 space-y-1">
                    <li>⚡ <strong>전기:</strong> 한전(123) 전화 후 계량기 지침 불러주기</li>
                    <li>🔥 <strong>가스:</strong> 도시가스 고객센터 (미리 철거 예약 필수)</li>
                    <li>💧 <strong>수도:</strong> 지역 수도사업소 또는 관리실 정산</li>
                </ul>
            </div>
        </div>

        <h2>3. 대형 폐기물 처리</h2>
        <p>이사 갈 때 버리는 가구, 그냥 두고 가면 과태료 대상입니다.</p>
        <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li><strong>주민센터 방문:</strong> 폐기물 스티커 구매 후 부착</li>
            <li><strong>인터넷 신청:</strong> 구청 홈페이지 또는 '빼기' 어플 활용</li>
            <li><strong>무상 수거:</strong> 상태가 좋은 가전은 '폐가전 무상방문수거(1599-0903)' 이용</li>
        </ul>

        <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <span class="font-bold text-yellow-800">💡 Tip: 종량제 봉투</span>
            <p class="text-sm text-yellow-700 mt-1">이사 오기 전 동네에서 쓰던 종량제 봉투는 전입신고 시 주민센터에서 '전입 인증 스티커'를 받으면 새 동네에서도 사용할 수 있습니다. 버리지 말고 챙겨오세요!</p>
        </div>
      </article>
    `
  },
  {
    slug: 'safe-door-lock-password',
    title: '자취방 도어락 비밀번호 안전하게 관리하는 법',
    excerpt: '몰래카메라, 지문 흔적... 도어락 비밀번호 노출을 막는 보안 수칙.',
    date: '2025-11-28',
    category: '안전',
    keywords: ['도어락 비밀번호', '자취방 보안', '현관문 안전'],
    faq: [
      {
        question: '비밀번호는 얼마나 자주 바꿔야 하나요?',
        answer: '최소 3개월에 한 번은 변경하는 것이 좋습니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">혼자 사는 집, 보안은 과할수록 좋습니다. 도어락 비밀번호 관리만 잘해도 침입 범죄를 예방할 수 있습니다.</p>

        <h2>1. 마스터 비밀번호 초기화 (가장 중요!)</h2>
        <div class="bg-red-50 p-6 rounded-xl border border-red-100 my-6">
            <h3 class="text-red-800 font-bold mb-2">🚨 알고 계셨나요?</h3>
            <p class="text-red-700 text-sm leading-relaxed">
                내가 비밀번호를 바꿔도, 건물주나 이전 세입자가 설정해둔 '마스터 비밀번호'가 남아있다면 문이 열릴 수 있습니다. 이사 온 첫날 반드시 초기화해야 합니다.
            </p>
        </div>
        <p><strong>초기화 방법:</strong> 도어락 제조사마다 다르지만, 보통 건전지 커버 안쪽의 '등록' 버튼을 누르고 특정 번호 조합을 입력합니다. (제조사 홈페이지 매뉴얼 참조)</p>

        <hr class="my-8 border-slate-200" />

        <h2>2. 허수 기능 활용하기</h2>
        <p>비밀번호를 누를 때 지문 자국이 남거나, 엿보는 사람을 방지하는 기능입니다.</p>
        <div class="flex items-center gap-4 my-4 p-4 bg-slate-50 rounded-xl">
            <div class="text-3xl">🔢</div>
            <div>
                <div class="font-bold text-slate-800">사용법</div>
                <p class="text-sm text-slate-600">비밀번호 앞이나 뒤에 아무 숫자나 마구 누르세요.<br/>예: <span class="text-slate-400">123958</span> + <strong>내비번(1234)</strong> + <span class="text-slate-400">0592</span></p>
            </div>
        </div>

        <h2>3. 이중 잠금 설정</h2>
        <p>집 안에 있을 때는 '이중 잠금' 기능을 켜두세요. 밖에서 비밀번호를 알아도 문을 열 수 없습니다. (보통 '열림/닫힘' 버튼을 3~5초간 꾹 누르면 설정됩니다.)</p>

        <div class="mt-8">
            <h3 class="font-bold text-slate-800 mb-3">추가 보안 꿀템 추천</h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li class="flex items-center gap-2 p-3 border border-slate-200 rounded-lg">
                    <span>🚪</span>
                    <span class="text-sm">휴대용 도어락 (여행용으로도 굿)</span>
                </li>
                <li class="flex items-center gap-2 p-3 border border-slate-200 rounded-lg">
                    <span>📹</span>
                    <span class="text-sm">현관 CCTV (모형이라도 효과 있음)</span>
                </li>
                <li class="flex items-center gap-2 p-3 border border-slate-200 rounded-lg">
                    <span>🪟</span>
                    <span class="text-sm">창문 잠금장치 (저층 필수)</span>
                </li>
            </ul>
        </div>
      </article>
    `
  },
  {
    slug: 'mold-removal-tips',
    title: '벽지 곰팡이 제거 및 결로 예방 가이드',
    excerpt: '지긋지긋한 곰팡이, 락스만 뿌린다고 해결될까? 근본적인 원인 해결과 제거 방법.',
    date: '2025-11-28',
    category: '청소',
    keywords: ['곰팡이 제거', '결로 예방', '벽지 곰팡이', '원룸 습기'],
    faq: [
      {
        question: '환기는 얼마나 해야 하나요?',
        answer: '하루 2번, 10분 이상 맞통풍이 되도록 환기하는 것이 가장 좋습니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">지긋지긋한 곰팡이, 단순히 닦아내기만 하면 100% 다시 생깁니다. 근본적인 원인을 잡고 완벽하게 제거하는 루틴을 알려드립니다.</p>

        <h2>1. 곰팡이 제거 4단계 루틴</h2>
        <div class="space-y-4 my-6">
            <div class="flex gap-4 items-start">
                <div class="bg-indigo-100 text-indigo-700 font-bold rounded-lg px-3 py-1 shrink-0">Step 1</div>
                <div>
                    <h4 class="font-bold text-slate-800">완벽 건조</h4>
                    <p class="text-sm text-slate-600">드라이기나 선풍기로 곰팡이 부위를 바짝 말려주세요. 젖은 상태에서는 약품 효과가 떨어집니다.</p>
                </div>
            </div>
            <div class="flex gap-4 items-start">
                <div class="bg-indigo-100 text-indigo-700 font-bold rounded-lg px-3 py-1 shrink-0">Step 2</div>
                <div>
                    <h4 class="font-bold text-slate-800">약품 도포 (락스 vs 전용제거제)</h4>
                    <p class="text-sm text-slate-600">휴지에 락스를 묻혀 곰팡이 부위에 붙여두고 30분~1시간 방치합니다. (환기 필수!)</p>
                </div>
            </div>
            <div class="flex gap-4 items-start">
                <div class="bg-indigo-100 text-indigo-700 font-bold rounded-lg px-3 py-1 shrink-0">Step 3</div>
                <div>
                    <h4 class="font-bold text-slate-800">닦아내기 & 건조</h4>
                    <p class="text-sm text-slate-600">젖은 걸레로 닦아내고 다시 마른 걸레로 물기를 제거한 뒤 완벽하게 말립니다.</p>
                </div>
            </div>
            <div class="flex gap-4 items-start">
                <div class="bg-indigo-100 text-indigo-700 font-bold rounded-lg px-3 py-1 shrink-0">Step 4</div>
                <div>
                    <h4 class="font-bold text-slate-800">방지 코팅</h4>
                    <p class="text-sm text-slate-600">곰팡이 방지제나 발수 코팅제를 뿌려 재발을 막습니다.</p>
                </div>
            </div>
        </div>

        <hr class="my-8 border-slate-200" />

        <h2>2. 결로 예방 생활 습관</h2>
        <p>곰팡이의 주원인은 '결로(이슬 맺힘)'입니다. 습기 관리가 핵심입니다.</p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
            <li class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span class="text-2xl block mb-2">💨</span>
                <strong>환기 하루 2번</strong>
                <p class="text-xs text-slate-500 mt-1">아침, 저녁 10분씩 맞통풍 환기</p>
            </li>
            <li class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span class="text-2xl block mb-2">🛋️</span>
                <strong>가구 거리두기</strong>
                <p class="text-xs text-slate-500 mt-1">벽에서 5~10cm 띄워서 배치 (공기 순환)</p>
            </li>
        </ul>
      </article>
    `
  },
  {
    slug: 'real-estate-app-tips',
    title: '직방, 다방, 피터팬... 부동산 앱 허위매물 거르는 법',
    excerpt: '사진에 속지 마세요. 부동산 앱으로 방 구할 때 호구 잡히지 않는 필터링 노하우.',
    date: '2025-11-28',
    category: '생활',
    keywords: ['부동산 앱', '허위매물 구별', '자취방 구하기'],
    faq: [
      {
        question: '시세보다 너무 싼 방은 왜 그런가요?',
        answer: '99% 허위매물이거나 융자가 많은 위험한 집, 혹은 반지하일 가능성이 높습니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">직방, 다방, 피터팬... 편리하지만 함정도 많습니다. 헛걸음하지 않고 진짜 좋은 방을 구하는 필터링 노하우를 공개합니다.</p>

        <h2>1. 허위매물 99% 구별법</h2>
        <p>싸고 좋은 방은 없습니다. 아래 특징이 보이면 거르세요.</p>
        <div class="bg-red-50 p-6 rounded-xl border border-red-100 space-y-3">
            <div class="flex items-start gap-3">
                <span class="text-red-500 font-bold">❌</span>
                <span><strong>시세보다 현저히 저렴함:</strong> 주변 시세보다 10~20만 원 싸다면 의심하세요.</span>
            </div>
            <div class="flex items-start gap-3">
                <span class="text-red-500 font-bold">❌</span>
                <span><strong>설명이 모호함:</strong> "일단 오세요", "상담 후 조정 가능" 등 구체적인 정보가 없는 경우.</span>
            </div>
            <div class="flex items-start gap-3">
                <span class="text-red-500 font-bold">❌</span>
                <span><strong>등록일자가 오래됨:</strong> 3개월 이상 된 매물은 이미 나갔거나 낚시용일 확률이 높습니다.</span>
            </div>
        </div>

        <hr class="my-8 border-slate-200" />

        <h2>2. 방문 전 필수 체크리스트 (로드뷰)</h2>
        <p>무작정 방문하지 말고, 로드뷰로 주변 환경을 먼저 확인하세요.</p>
        <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li><strong>언덕 경사도:</strong> 사진으로는 평지 같아 보이지만 실제로는 등산 코스일 수 있습니다.</li>
            <li><strong>편의시설:</strong> 편의점, 세탁소, 버스 정류장이 도보 5분 거리에 있는지 확인하세요.</li>
            <li><strong>유해시설:</strong> 유흥가, 모텔촌 한가운데 있는 집은 치안이 불안할 수 있습니다.</li>
        </ul>

        <div class="mt-8 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <span class="font-bold text-indigo-800">💡 Tip: 중개사에게 전화할 때</span>
            <p class="text-sm text-indigo-700 mt-1">"이 방 있나요?"라고 묻지 말고, <strong>"광고 번호 1234번 매물, 보증금 5000에 40만 원 맞나요? 지금 바로 볼 수 있나요?"</strong>라고 구체적으로 물어보세요. 말이 바뀌면 바로 끊으시면 됩니다.</p>
        </div>
      </article>
    `
  },
  {
    slug: 'noise-complaint-guide',
    title: '층간소음, 벽간소음 법적 기준과 현명한 대처법',
    excerpt: '참을 만큼 참았다면? 쪽지 붙이기부터 이웃사이센터 신고까지 단계별 대응 매뉴얼.',
    date: '2025-11-28',
    category: '생활',
    keywords: ['층간소음 신고', '벽간소음', '이웃사이센터', '소음 기준'],
    faq: [
      {
        question: '직접 찾아가서 항의해도 되나요?',
        answer: '직접 찾아가 초인종을 누르거나 문을 두드리는 행위는 주거침입 등으로 역고소 당할 수 있으니 관리실을 통하세요.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">매일 밤 쿵쿵거리는 발소리, 참다 참다 폭발하기 직전인가요? 감정적인 대응은 오히려 독이 됩니다. 법적으로 현명하게 대처하는 단계별 매뉴얼입니다.</p>

        <h2>1. 대응 원칙: 직접 대면 금지</h2>
        <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
            <p class="font-bold text-yellow-800 mb-1">⚠️ 주의하세요!</p>
            <p class="text-sm text-yellow-700">윗집 초인종을 누르거나 문을 두드리는 행위, 현관문 앞에 쪽지를 붙이는 행위는 <strong>주거침입</strong>이나 <strong>명예훼손</strong>으로 역고소 당할 수 있습니다.</p>
        </div>

        <h2>2. 단계별 대처 프로세스</h2>
        <div class="space-y-6">
            <div class="relative pl-8 border-l-2 border-slate-200">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300"></div>
                <h4 class="font-bold text-slate-800">Step 1. 관리실(중재자) 통하기</h4>
                <p class="text-sm text-slate-600 mt-1">관리사무소나 집주인에게 연락하여 인터폰으로 주의를 주도록 요청하세요. 가장 안전하고 기본적인 방법입니다.</p>
            </div>
            <div class="relative pl-8 border-l-2 border-slate-200">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300"></div>
                <h4 class="font-bold text-slate-800">Step 2. 증거 수집</h4>
                <p class="text-sm text-slate-600 mt-1">소음 발생 일시, 종류, 지속 시간을 꼼꼼히 기록하고 녹음하세요. 데시벨 측정 어플을 활용하는 것도 좋습니다.</p>
            </div>
            <div class="relative pl-8 border-l-2 border-slate-200">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 class="font-bold text-indigo-700">Step 3. 이웃사이센터 신고</h4>
                <p class="text-sm text-slate-600 mt-1">환경부에서 운영하는 <strong>'층간소음 이웃사이센터(1661-2642)'</strong>에 상담을 신청하세요. 전문가가 방문하여 소음을 측정하고 중재해줍니다.</p>
            </div>
        </div>

        <hr class="my-8 border-slate-200" />

        <h2>3. 법적 기준 (데시벨)</h2>
        <p>아래 기준을 초과해야 법적으로 층간소음으로 인정받을 수 있습니다.</p>
        <ul class="list-disc list-inside text-slate-700">
            <li><strong>주간 (06:00 ~ 22:00):</strong> 1분 등가소음도 39dB 이상</li>
            <li><strong>야간 (22:00 ~ 06:00):</strong> 1분 등가소음도 34dB 이상</li>
            <li>(최고소음도는 주간 57dB, 야간 52dB)</li>
        </ul>
      </article>
    `
  },
  {
    slug: 'deposit-return-delay',
    title: '집주인이 보증금을 안 돌려줄 때 내용증명 작성법 (양식 포함)',
    excerpt: '만기가 지났는데 돈이 없다는 집주인. 내용증명 발송으로 심리적 압박하고 법적 증거 남기기.',
    date: '2025-11-28',
    category: '법률',
    keywords: ['내용증명 작성법', '보증금 반환 소송', '임차권등기명령'],
    faq: [
      {
        question: '내용증명은 변호사가 써야 하나요?',
        answer: '아니요, 육하원칙에 맞춰 사실관계를 명확히 적으면 개인이 작성해도 충분한 효력이 있습니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">계약 만기일이 지났는데 "새 세입자 구해지면 줄게"라며 버티는 집주인. 더 이상 기다리지 마세요. 내용증명은 법적 조치의 시작을 알리는 강력한 경고장입니다.</p>

        <h2>1. 내용증명, 왜 보내야 할까?</h2>
        <ul class="list-none pl-0 space-y-3 my-4">
            <li class="flex items-start gap-3">
                <span class="text-2xl">📢</span>
                <div>
                    <strong>심리적 압박:</strong> "이 세입자는 법적으로 대응할 준비가 되었구나"라는 인식을 심어주어 태도를 바꾸게 합니다.
                </div>
            </li>
            <li class="flex items-start gap-3">
                <span class="text-2xl">⚖️</span>
                <div>
                    <strong>증거 확보:</strong> 추후 보증금 반환 소송 시 "계약 해지 통보를 명확히 했다"는 결정적인 증거가 됩니다.
                </div>
            </li>
        </ul>

        <h2>2. 내용증명 작성 필수 요소 (양식)</h2>
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm">
            <p class="mb-2"><strong>수신인:</strong> 임대인 이름 (주소)</p>
            <p class="mb-4"><strong>발신인:</strong> 임차인 이름 (주소)</p>
            
            <p class="mb-2 font-bold">[제목: 임대차 계약 해지 및 보증금 반환 요청]</p>
            <ol class="list-decimal list-inside space-y-2">
                <li>본인은 귀하와 20XX년 X월 X일, 서울시 OO구 OO동... 소재 부동산에 대하여 임대차 계약을 체결하였습니다.</li>
                <li>본 계약은 20XX년 X월 X일 만료되며, 본인은 계약 연장 의사가 없음을 문자/통화로 이미 통보하였습니다.</li>
                <li>따라서 만기일에 보증금 OOO원을 즉시 반환해 주시기를 바랍니다.</li>
                <li>만약 반환되지 않을 경우, <strong>임차권등기명령 신청 및 보증금 반환 소송</strong>을 진행할 예정이며, 이에 따른 모든 법적 비용과 지연 이자는 귀하가 부담해야 함을 고지합니다.</li>
            </ol>
        </div>

        <div class="mt-6">
            <h3 class="font-bold text-slate-800 mb-2">💡 발송 방법</h3>
            <p class="text-slate-600">똑같은 문서 3통을 작성하여 우체국 창구에 가서 "내용증명 보내주세요"라고 하면 됩니다. (1통은 집주인에게, 1통은 우체국 보관, 1통은 내가 보관)</p>
        </div>
      </article>
    `
  },
  {
    slug: 'auction-process-guide',
    title: '살던 집이 경매로 넘어갔을 때 대처 프로세스 5단계',
    excerpt: '경매 개시 결정 등기 우편물을 받았다면? 당황하지 말고 이 순서대로만 하세요.',
    date: '2025-11-28',
    category: '법률',
    keywords: ['부동산 경매 절차', '배당요구', '임차인 대항력', '경매 권리분석'],
    faq: [
      {
        question: '배당요구를 안 하면 어떻게 되나요?',
        answer: '선순위 임차인이라도 배당요구를 안 하면 경매 대금에서 돈을 못 받고, 낙찰자에게 달라고 해야 합니다. 상황에 따라 전략이 다릅니다.'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">어느 날 법원에서 날아온 '경매 개시 결정' 등기. 하늘이 무너지는 것 같겠지만, 정신만 똑바로 차리면 보증금을 지킬 수 있습니다. 반드시 해야 할 5가지 절차입니다.</p>

        <h2>1. 경매 진행 프로세스 5단계</h2>
        <div class="space-y-6 my-6">
            <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                    <h4 class="font-bold text-slate-800">경매 개시 결정 & 송달</h4>
                    <p class="text-sm text-slate-600">집이 압류되고 경매가 시작되었음을 알리는 등기가 옵니다.</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                    <h4 class="font-bold text-slate-800">배당요구 종기일 결정 (★매우 중요)</h4>
                    <p class="text-sm text-slate-600">법원이 정한 날짜까지 <strong>'권리신고 및 배당요구신청서'</strong>를 제출해야 돈을 받을 수 있습니다. 이 날짜를 놓치면 한 푼도 못 받습니다!</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                    <h4 class="font-bold text-slate-800">매각 기일 (입찰)</h4>
                    <p class="text-sm text-slate-600">사람들이 입찰을 하여 낙찰자를 정하는 날입니다.</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                    <h4 class="font-bold text-slate-800">매각 허가 & 대금 납부</h4>
                    <p class="text-sm text-slate-600">낙찰자가 돈을 내면 소유권이 넘어갑니다.</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">5</div>
                <div>
                    <h4 class="font-bold text-slate-800">배당 기일</h4>
                    <p class="text-sm text-slate-600">순위에 따라 돈을 나눠 갖는 날입니다.</p>
                </div>
            </div>
        </div>

        <hr class="my-8 border-slate-200" />

        <h2>2. 내가 선순위일까 후순위일까?</h2>
        <p>말소기준권리(근저당 등)보다 내 전입신고+확정일자가 빠르면 <strong>선순위</strong>, 늦으면 <strong>후순위</strong>입니다.</p>
        <ul class="list-disc list-inside text-slate-700 space-y-2">
            <li><strong>선순위 임차인:</strong> 보증금을 전액 돌려받을 때까지 집을 비워주지 않아도 됩니다. (낙찰자가 물어줘야 함)</li>
            <li><strong>후순위 임차인:</strong> 낙찰금에서 배당받고, 모자란 돈은 받기 어렵습니다. 최우선변제금 대상인지 확인해야 합니다.</li>
        </ul>
      </article>
    `
  },
  {
    slug: 'priority-repayment-amount',
    title: '최우선변제금: 소액 임차인 보호 범위와 기준',
    excerpt: '집이 망해도 최소한의 돈은 건진다. 지역별 최우선변제금 범위와 기준 시점 확인법.',
    date: '2025-11-28',
    category: '법률',
    keywords: ['최우선변제금', '소액임차인', '보증금 보호', '서울 최우선변제'],
    faq: [
      {
        question: '기준 시점이 언제인가요?',
        answer: '내 계약일이 아니라, 내 집의 가장 먼저 설정된 담보물권(근저당권) 설정일 기준입니다. 이게 중요합니다!'
      }
    ],
    content: `
      <article class="prose prose-slate max-w-none">
        <p class="lead text-xl text-slate-600 font-medium">집이 경매로 넘어가고 내가 후순위라 해도, 국가에서 "이 돈만큼은 무조건 먼저 챙겨줘라"라고 정한 금액이 있습니다. 바로 최우선변제금입니다.</p>

        <h2>1. 최우선변제금이란?</h2>
        <p>소액 임차인을 보호하기 위해, 선순위 근저당권자보다도 먼저 보증금 중 일정액을 배당해주는 제도입니다.</p>
        <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-200 my-4">
            <span class="font-bold text-indigo-800">✅ 필수 조건 3가지</span>
            <ol class="list-decimal list-inside text-indigo-700 mt-2 space-y-1">
                <li>보증금이 법에서 정한 <strong>소액 보증금 범위</strong> 내여야 함</li>
                <li>경매 개시 결정 등기 전까지 <strong>전입신고 + 점유(이사)</strong>를 마쳐야 함</li>
                <li>배당요구 종기일까지 <strong>배당요구</strong>를 해야 함</li>
            </ol>
        </div>

        <h2>2. 지역별 기준 금액 (2024년 기준)</h2>
        <p class="text-sm text-slate-500 mb-2">*주의: 내 계약일이 아니라 <strong>선순위 담보물권 설정일</strong> 당시의 법 기준을 따릅니다.</p>
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-slate-600 border-collapse">
                <thead class="text-xs text-slate-700 uppercase bg-slate-100">
                    <tr>
                        <th class="px-4 py-3 border">지역</th>
                        <th class="px-4 py-3 border">보증금 범위</th>
                        <th class="px-4 py-3 border">최우선 변제액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-3 border font-bold">서울</td>
                        <td class="px-4 py-3 border">1억 6,500만 원 이하</td>
                        <td class="px-4 py-3 border">최대 5,500만 원</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 border font-bold">과밀억제권역<br/>(세종, 용인, 화성, 김포)</td>
                        <td class="px-4 py-3 border">1억 4,500만 원 이하</td>
                        <td class="px-4 py-3 border">최대 4,800만 원</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 border font-bold">광역시<br/>(안산, 광주, 파주, 이천, 평택)</td>
                        <td class="px-4 py-3 border">8,500만 원 이하</td>
                        <td class="px-4 py-3 border">최대 2,800만 원</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 border font-bold">그 밖의 지역</td>
                        <td class="px-4 py-3 border">7,500만 원 이하</td>
                        <td class="px-4 py-3 border">최대 2,500만 원</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </article>
    `
  }
];

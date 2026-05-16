# Status | 마지막: 2026-05-17
## 현재 작업
종합 최적화 완료: 페르소나, SEO, 속도, 색인, GA4 이벤트, 구조화 데이터
## 최근 변경 (최근 5개만)
- 05-17: Naver 타이틀 경고 10건 수정(blog 2개, guide 8개) → 153페이지 모두 44자 이하
- 05-17: blog/guide 목록 ItemList 스키마, 도구 7개 WebApplication 스키마 추가(GSC 리치 스니펫)
- 05-17: TrackedFaqAccordion 컴포넌트 - FAQ 클릭 시 faq_opened 이벤트 발송(GA4)
- 05-17: ContentReadTracker 스크롤 마일스톤(25/50/75%) scroll_depth 이벤트 추가(GA4)
- 05-17: Header 네비게이션 클릭 추적 nav_clicked 이벤트 추가(GA4)
## TODO
- [ ] AdSense 콘솔에서 payment-hold 결제 계정 확인 항목 직접 처리 (수동 필요)
- [ ] AdSense 사이트 상태가 READY로 바뀌는지 재확인
- [ ] GSC에서 사이트맵(/sitemap.xml) 수동 재제출 → 95개→최신 글 수로 색인 확대
- [ ] GA4/GSC API 인증 공유 후 실제 데이터 기반 추가 최적화
## 결정사항
- IndexNow: api.indexnow.org(글로벌) + Bing + Naver 3개 엔드포인트, 하루 2회(UTC 03:00, 15:00)
- 광고: AdSense 자동광고 방식 유지, 수동 광고 블록 추가 없음
- 성능: AdSense 제3자 쿠키 경고는 광고 유지 조건에서 허용
- 페르소나: sitePersona 객체로 lib/site.ts에 공식 정의
## 주의
- AdSense 결제 보류 해제는 API 처리 불가, 로그인된 콘솔에서 본인/주소/PIN/세금/결제수단 확인 필요
- GSC 사이트맵은 ISR 1시간 자동갱신되나, GSC 재크롤은 수동 제출하거나 크론 핑으로 유도 필요
- GA4 스트림: today2424.kr / G-N2V7ZZP184 / ID:14420832086 (코드 설정 일치 확인됨)

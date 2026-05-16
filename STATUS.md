# Status | 마지막: 2026-05-16
## 현재 작업
종합 최적화 완료: 페르소나 정의, SEO, 속도, 색인 자동화, GA4 이벤트
## 최근 변경 (최근 5개만)
- 05-16: IndexNow에 api.indexnow.org(Google 포함) 추가, Google 사이트맵 핑 추가, 크론 하루 2회로 변경
- 05-16: RSS 자동발견 링크(<link rel="alternate">) layout.tsx에 추가
- 05-16: Pretendard 폰트 CDN 로딩 추가(Windows 한국어 폰트 정상화), GA4/AdSense preconnect 힌트 추가
- 05-16: SEO title 한도 40→50자, description 80→130자 (검색결과 표시 범위 충족)
- 05-16: 중개수수료/평수변환/D-day 계산기 tool_used 이벤트 추가, 도구 메타 설명 전면 확장
## TODO
- [ ] AdSense 콘솔에서 payment-hold 결제 계정 확인 항목 직접 처리 (수동 필요)
- [ ] AdSense 사이트 상태가 READY로 바뀌는지 재확인
- [ ] GSC에서 사이트맵(/sitemap.xml) 수동 재제출 → 95개→최신 글 수로 색인 확대
- [ ] GA4 실제 트래픽 지표 공유 후 취약 페이지 추가 최적화
## 결정사항
- IndexNow: api.indexnow.org(글로벌) + Bing + Naver 3개 엔드포인트, 하루 2회(UTC 03:00, 15:00)
- 광고: AdSense 자동광고 방식 유지, 수동 광고 블록 추가 없음
- 성능: AdSense 제3자 쿠키 경고는 광고 유지 조건에서 허용
- 페르소나: sitePersona 객체로 lib/site.ts에 공식 정의
## 주의
- AdSense 결제 보류 해제는 API 처리 불가, 로그인된 콘솔에서 본인/주소/PIN/세금/결제수단 확인 필요
- GSC 사이트맵은 ISR 1시간 자동갱신되나, GSC 재크롤은 수동 제출하거나 크론 핑으로 유도 필요
- GA4 스트림: today2424.kr / G-N2V7ZZP184 / ID:14420832086 (코드 설정 일치 확인됨)

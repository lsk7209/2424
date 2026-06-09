# Status | 마지막: 2026-06-09

## 현재 작업
AdSense 검수, GSC sitemap 자동 제출, canonical host, SEO/AEO/GEO, 콘텐츠 품질 게이트 최적화 완료

## 최근 변경 (최근 5개만)
- 06-09: today2424.kr canonical 통일, Vercel 도메인 리다이렉트 루프 원인 제거
- 06-09: GSC Sitemaps API 제출 스크립트와 cron 제출 결과 추가
- 06-09: AdSense 자동광고 전용 정책 고지, 개인정보 광고 쿠키 고지, 검증 스크립트 추가
- 06-09: 블로그/가이드 상세 신뢰 박스, reviewedBy/citation JSON-LD, CTA/내부링크/H3 템플릿 보강
- 05-17: GA4 이벤트, ItemList/WebApplication 스키마, 제목 경고 개선 반영

## TODO
- [ ] GitHub/Vercel 배포 완료 후 `https://today2424.kr` 리다이렉트 루프 해소 확인
- [ ] 배포 후 GSC sitemap 재제출 및 errors 0 / warnings 0 / 성공 상태 재확인
- [ ] AdSense 사이트 상태가 READY로 바뀌는지 재확인
- [ ] AdSense 콘솔 payment-hold 결제 계정 확인 항목은 수동 처리

## 결정사항
- 광고: AdSense 자동광고 방식 유지, 수동 광고 슬롯 추가 없음
- GSC: Search Console Sitemaps API로 `/sitemap.xml` 제출 및 상태 확인
- IndexNow: api.indexnow.org + Bing + Naver 엔드포인트 유지
- SEO: canonical URL은 `https://today2424.kr` 기준
- 콘텐츠: 공식 출처, 검토 기준, FAQ, 내부링크, CTA 신호를 템플릿과 상세 페이지에서 보강

## 주의
- Vercel CLI/API 직접 배포 금지. 배포는 GitHub push 후 Vercel 연동으로만 진행
- GSC 사이트맵 오류 1건은 현재 production redirect loop 영향이며, 이번 배포 후 재제출 필요
- GA4 스트림: today2424.kr / G-N2V7ZZP184 / property 534327620
- `GSC_SERVICE_ACCOUNT_JSON` 또는 `GOOGLE_SERVICE_ACCOUNT_JSON`이 운영 환경에 없으면 cron의 GSC sitemap 제출은 skip됨

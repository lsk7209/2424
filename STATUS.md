# Status | 마지막: 2026-05-06
## 현재 작업
속도/SEO/AdSense 후속 최적화: GA4 CSP 오류 수정 및 프로덕션 검증 완료
## 최근 변경 (최근 5개만)
- 05-06: GA4 이미지 비콘 CSP 허용 추가, Lighthouse Best Practices 73→77
- 05-06: GA4 핵심 이벤트 추가: tool_used, content_read_complete, cta_clicked
- 05-06: GSC 확인: today2424.kr/www 속성 개선 이슈 0개, 현재 노출 데이터 적어 조치 없음
- 05-06: 최신 20개 URL Google/Bing/Naver 색인 제출 완료, 모두 200 응답
- 05-06: 전체 454개 글 품질 게이트 추가, 최저 91점/평균 98점 통과
## TODO
- [ ] AdSense 콘솔에서 payment-hold 결제 계정 확인 항목 직접 처리
- [ ] AdSense 사이트 상태가 READY로 바뀌는지 재확인
## 결정사항
- 광고: AdSense 자동광고 방식 유지, 수동 광고 블록 추가 없음
- 성능: AdSense 제3자 쿠키 경고는 광고 유지 조건에서 허용
## 주의
- AdSense 결제 보류 해제는 API 처리 불가, 로그인된 콘솔에서 본인/주소/PIN/세금/결제수단 확인 필요
- GA4 초기 HTML 감지는 서버 HTML 기준 false일 수 있으나 브라우저 dataLayer/gtag로 검증 완료
- 예약 발행 후 확장 글 URL은 현재 시각 기준 404가 정상

# Status | 마지막: 2026-05-06
## 현재 작업
GSC/GA4 후속 최적화: GSC 이슈 없음 확인, GA4 핵심 이벤트 추가 완료
## 최근 변경 (최근 5개만)
- 05-06: GA4 핵심 이벤트 추가: tool_used, content_read_complete, cta_clicked
- 05-06: GSC 확인: today2424.kr/www 속성 개선안 0개, 현재 노출 데이터 적어 조치 없음
- 05-06: 최신 20개 URL Google/Bing/Naver 색인 제출 완료, 모두 200 응답
- 05-06: AdSense API 재확인: today2424.kr GETTING_READY, 정책 이슈 0개, payment-hold 유지
- 05-06: 전체 454개 글 품질 게이트 추가, 최저 91점/평균 98점 통과
- 05-06: 블로그·가이드 상세에 보강 FAQ와 공식 출처 확인 박스 추가
## TODO
- [ ] AdSense 콘솔에서 payment-hold 결제 계정 확인 항목 직접 처리
- [ ] AdSense 사이트 상태가 READY로 바뀌는지 재확인
## 결정사항
- 광고: AdSense 자동광고 방식 유지, 수동 광고 블록 추가 없음
- 발행: 신규 글은 5시간 간격 예약 발행 유지
## 주의
- AdSense 결제 보류 해제는 API로 처리 불가, 로그인된 콘솔에서 본인/주소/PIN/세금/결제수단 확인 필요
- today2424.kr ads.txt, GA4, AdSense 스크립트는 공개 브라우저 기준 정상
- 예약 발행 전 확장 글 URL은 현재 시각 기준 404가 정상
- GA4 Data API Property ID는 로컬에서 확인되지 않아 프론트 이벤트 동작을 브라우저 dataLayer로 검증

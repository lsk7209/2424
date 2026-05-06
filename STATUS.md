# Status | 마지막: 2026-05-06
## 현재 작업
AdSense/SEO/콘텐츠/색인 자동화 최적화 배포 완료
## 최근 변경 (최근 5개만)
- 05-06: 수동 AdSense 슬롯 제거, 자동광고 스크립트만 유지
- 05-06: AI 인덱스/LLMS 생성, SEO 검증, live audit, 색인 제출 dry-run 스크립트 추가
- 05-06: RSS 정렬을 publishAt 기준으로 수정, CSP를 AdSense/GA 호환으로 강화
- 05-06: GSC/GA4/AdSense API 읽기 확인 및 sitemap/검수 상태 점검
- 05-06: 콘텐츠 excerpt/H2/내부링크 경고 제거 및 대표 페이지 브라우저 검증
- 05-06: Vercel 프로덕션 배포, IndexNow 키 파일, 일일 색인 Cron 등록
## TODO
- [ ] AdSense 콘솔의 payment-hold 알림 직접 처리
- [ ] 변경분 커밋 및 원격 push
## 결정사항
- 광고: 애드센스 검수 전 수동 슬롯 제거, 자동광고만 유지
- 기준 도메인: `https://www.today2424.kr`
- 색인: 최신 20개 URL은 수동 제출 완료, 이후 매일 05:00 KST IndexNow 자동 제출
- WordPress 플러그인/테마/댓글: Next.js 프로젝트라 대상 없음
## 주의
- GSC www sitemap은 warnings/errors 0이지만 indexed 0 상태
- Lighthouse Best Practices 77은 AdSense 서드파티 쿠키/Issues 영향

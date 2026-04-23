# Status | 마지막: 2026-04-23
## 현재 작업
애드센스 검수 보강과 콘텐츠 확장 완료, 커밋/배포 대기
## 최근 변경 (최근 5개만)
- 04-23: 블로그/가이드/문의 콘텐츠 깨짐 복원 및 내부 링크 정리
- 04-23: `광고 및 제휴 안내` 페이지 추가 및 푸터/사이트맵 연결
- 04-23: `manifest.json`, `icon-192.png`, `icon-512.png` 추가로 PWA/메타 404 제거
- 04-23: 신규 콘텐츠 2건 추가 (`deposit-transfer-checklist`, `house-viewing-checklist`)
- 04-23: lint/build 통과 및 브라우저 헤드리스 검증 완료
## TODO
- [ ] 원격 저장소 커밋/푸시
- [ ] 실서비스 배포 후 GA4 실시간 수집 여부 확인
- [ ] AdSense 사이트 재검토 요청 상태 확인
## 결정사항
- 도메인: `https://today2424.kr` 기준으로 메타, canonical, GSC 경로 통일
- 추적: GA4 ID `G-N2V7ZZP184` 유지
- 콘텐츠: 현재 블로그 7개, 가이드 14개 공개 상태
## 주의
- `baseline-browser-mapping` 업데이트 권고는 남아 있으나 lint/build 실패 원인은 아님
- GSC 자동 개선 스크립트는 기존 기준 `today2424.kr` 이슈 0건으로 종료됨

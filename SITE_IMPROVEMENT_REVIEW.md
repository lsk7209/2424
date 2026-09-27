# today2424.kr 종합 개선 검토 (2026-09-27)

> 코드/아키텍처, SEO·AdSense·콘텐츠, 보안, CI/운영 4개 영역을 병렬 조사한 결과를 종합했습니다.
> 코드 수정은 하지 않았고, 우선순위별 실행 항목만 정리했습니다.

## 요약 (Top 5 즉시 조치 권장)

1. **CI에 빌드/린트/타입체크/콘텐츠 품질 게이트가 전혀 연결되어 있지 않음** — 현재 GitHub Actions는 비용 감시·배포 후 인덱싱만 돌고, `lint`/`tsc --noEmit`/`build`/`validate-seo`/`validate-content`/`validate-adsense` 등은 로컬 수동 실행 전용. 깨진 빌드나 정책 위반 콘텐츠가 그대로 배포될 수 있음.
2. **CSP가 `unsafe-inline`/`unsafe-eval`을 전면 허용** (`next.config.ts`) — XSS 방어 효과가 사실상 없음.
3. **체크리스트/D-Day 페이지의 localStorage 초기화 방식이 하이드레이션 불일치를 유발** — 로드 시 화면이 깜빡이거나 SSR/CSR 불일치 경고 발생 가능.
4. **`app/` 전체에 error.tsx/loading.tsx/not-found.tsx 없음** — 런타임 에러 시 스타일 없는 기본 에러 화면 노출.
5. **OG 이미지가 전 페이지 공통 1종** — 소셜/카카오톡 공유 시 글마다 다른 이미지가 아니라 항상 동일한 정적 이미지 노출, 클릭률 손해.

---

## 1. 보안

### High
- **CSP `unsafe-inline`/`unsafe-eval` 허용** — `next.config.ts:8` `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com ...`. GA4/AdSense 인라인 스니펫 때문에 열어둔 것으로 보이나, nonce/hash 기반 CSP로 전환하면 제거 가능.

### Medium
- **스크립트 기본값에 실사용 GCP 프로젝트 ID 하드코딩** — `scripts/audit-gsc-ga4.mjs:7`, `scripts/submit-indexing.mjs:8`가 `D:/env/cursorai-451704-85a5abbe8eeb.json`(Windows 전용 경로 + 프로젝트 ID `cursorai-451704`)를 기본값으로 사용. 비밀키 자체는 없지만 불필요한 식별정보 노출이며, CI/Linux 환경에서는 이 기본값이 무의미(파일 없음)함.
- **cron 인증 비교가 타이밍 세이프하지 않음** — `app/api/cron/indexing/route.ts:35`에서 `authHeader !== \`Bearer ${cronSecret}\`` 단순 비교 사용. 이 라우트는 Google Indexing API/IndexNow/GSC sitemap 제출을 트리거하는 유일한 외부 호출 endpoint이므로 `crypto.timingSafeEqual`로 교체 권장. Rate limiting도 없음.
- **"Turso paused dataset" 경고는 사후 감지일 뿐** — 최근 커밋(`d790f39`, `b3f6aed`)은 `scripts/check-live-costs.mjs`의 모니터링/경고 로직만 개선. 실제 앱 코드에는 `@libsql/client` 등 Turso 클라이언트 자체가 없어(`package.json` 미포함) DB 쓰기를 사전 차단하거나 쿼리 안전성을 보장하지 않음 — 현재는 리스크가 낮지만 향후 실제 DB 연동 시 재검토 필요.

### Low
- IndexNow 키가 `app/api/cron/indexing/route.ts:8`에 하드코딩되어 있으나 IndexNow 설계상 공개 파일(`/{key}.txt`)과 짝을 이뤄야 하므로 정상. 키 회전 시 두 곳을 함께 갱신할 것.
- `post-deploy-indexing.yml`만 다른 워크플로우와 달리 `permissions:` 블록이 없음 — `permissions: {}` 추가 권장(방어적 조치, 실질 위험은 낮음).
- `npm audit`/lockfile 감사 단계가 CI에 없음.

### 확인 결과 문제 없음
- `.env*`가 `.gitignore`에 포함되어 있고 git에 커밋된 적 없음.
- 서비스 계정 JSON은 서버 사이드(node runtime)에서만 읽히고 클라이언트 번들에 노출되지 않음.
- `dangerouslySetInnerHTML` 사용처는 모두 JSON-LD(JSON.stringify) 또는 1차 콘텐츠(`data/*.ts`) 렌더링뿐, 사용자 입력이 흘러들어가는 곳 없음.
- 의존성 메이저 버전이 최신(Next 16.2.4, React 19.2.0)이고 눈에 띄는 취약 패키지 없음.

---

## 2. SEO / AdSense / 콘텐츠

### High
- **콘텐츠 품질/SEO/AdSense 검증 스크립트가 CI에 연결되어 있지 않음** — `validate-seo.mjs`, `validate-content.mjs`, `validate-adsense.mjs`, `score-all-content-quality.mjs`, `validate-editorial-overrides.mjs` 등이 존재하지만 워크플로우 어디에도 호출되지 않음. STATUS.md는 "완료"라고 적어뒀지만 실제로는 수동 실행 의존.
- **OG 이미지가 전 페이지 공통** — `app/opengraph-image.tsx`가 정적 그라디언트 카드 1종을 모든 블로그/가이드/툴 페이지에 재사용(`lib/metadata.ts`의 `absoluteUrl("/opengraph-image")`). `next/og`의 동적 세그먼트를 활용해 글 제목/카테고리를 반영한 이미지로 바꾸면 공유 클릭률 개선 여지 큼.
- **sitemap lastmod가 전 페이지 동일한 고정값** — `app/sitemap.ts`가 모든 정적 라우트에 `siteConfig.updatedAt`(수동 편집 문자열, 현재 "2026-05-16")을 그대로 사용. 실제 변경 시점과 무관해 구글이 신호를 신뢰하지 않을 수 있음. STATUS.md에도 GSC sitemap 오류/리다이렉트 루프가 미해결로 남아있어 우선 점검 필요.
- **BreadcrumbList 구조화 데이터 전무** — `/blog/[slug]`, `/guide/[slug]`, `/moving/[region]` 등 계층 구조가 있는데도 breadcrumb JSON-LD가 코드베이스 어디에도 없음(리치 결과·크롤 경로 신호 손실).

### Medium
- `app/tools/[slug]/page.tsx`가 `dynamicParams=false` + `generateStaticParams` 빈 배열을 반환하는 죽은 404-fallback 라우트 — 제거하거나 목적을 명확히 문서화.
- `CONTENT_MASTER_PLAN.md`(100개 아이디어, 2025-11-27)와 `ADDITIONAL_CONTENT_IDEAS.md`가 실제 산출물(블로그 120개 배치 파일 ≈600+ 포스트, 가이드 10개 배치)에 비해 크게 뒤처져 오히려 혼선을 줄 수 있음 — STATUS.md만 최신이므로 나머지는 아카이브 표시 권장.
- `site-config/`에는 `site-persona.yaml`만 있고, 실제 사이트 설정(도메인, AdSense publisher ID, GA ID, 인증 코드)은 `lib/site.ts`에 분산 — 두 위치의 역할 경계가 불명확.
- 개인정보처리방침/이용약관은 GA4·AdSense·쿠키를 언급하지만 "자동광고" 명칭이나 ads.txt를 직접 언급하지 않음 — 심사 시 검토자가 연결짓기 어려울 수 있음.

### Low
- `public/llms.txt`, `public/llms-full.txt`가 존재하지만 `robots.ts`/`sitemap.ts`에서 참조되지 않음 — AI 크롤러 허용 정책과 연계해 발견 신호로 노출 가능.
- `ads.txt`는 단일 DIRECT 행으로 정상이나, `CONTENT_MASTER_PLAN.md`의 월 수익 목표 대비 추가 네트워크 확장 여지는 열어둘 것.

---

## 3. 코드 / 아키텍처

### High
- **localStorage 초기화로 인한 하이드레이션 불일치** — `app/checklist/page.tsx:21-36`, `app/tools/d-day-counter/page.tsx:39-54`가 `useState` 초기화 함수에서 `typeof window === 'undefined'` 분기로 SSR 시 빈 값을 반환하고 클라이언트에서 실값을 읽음. 최초 하이드레이션 시 값이 다시 그려지는 "깜빡임" 및 React 하이드레이션 경고 발생 가능 — `useEffect`로 마운트 후 읽도록 수정 권장.
- **`app/` 전체에 error.tsx/loading.tsx/not-found.tsx/global-error.tsx 없음** — 15개 이상 라우트가 모두 Next.js 기본 에러 화면에 의존, 라우트 단위 로딩 UI도 없음.
- **개발 머신 전용 경로 하드코딩** — `scripts/submit-indexing.mjs:8`의 `D:/env/cursorai-451704-85a5abbe8eeb.json` 기본값(보안 항목과 중복 지적, CI/Linux에서 무의미).

### Medium
- **동일한 퀴즈 UX에 서로 다른 상태 관리 방식** — `feng-shui`는 URL 쿼리스트링으로 답변을 전달(`JSON.stringify` 후 `router.push`), `neighborhood-test`는 zustand 스토어 사용. 페이로드 크기 제한·새로고침 시 유실 위험이 있는 URL 방식을 스토어 방식으로 통일 권장.
- **`scripts/` 내 외부 API 호출에 재시도/부분 실패 처리 없음** — `submit-indexing.mjs`, `submit-gsc-sitemap.mjs`, `audit-gsc-ga4.mjs` 모두 단일 실패 시 배치 전체가 중단되고 진행 상황 보고가 없음.
- **`lib/content.ts`의 목록 조회 함수가 매 호출마다 재정렬/재필터** — `getPublishedBlogPosts`/`getPublishedGuidePosts`(105-119행)가 메모이제이션 없이 실행되며, 123개 블로그 배치 + 가이드 데이터를 대상으로 페이지당 2회 이상 호출됨(`revalidate=3600`으로 영향은 제한적이나 캐시 미스 시 낭비).
- **동일 목적의 레이아웃 패턴이 두 가지로 분화** — `feng-shui`/`neighborhood-test`는 수동 pass-through 컴포넌트로 `noindex` 처리, `checklist`/`safety-check`는 `export { default } from "./page"` 패턴 사용. `lib/metadata.ts`의 `createPageMetadata`에 `noindex` 옵션을 추가해 통일 가능.

### Low
- 타입 정의가 `types/index.ts`, `data/moving/types.ts`, 각 `lib/*.ts` 인라인 등 3곳 이상에 분산 — strict 모드·`any` 없음은 양호하나 위치 통일 여지 있음.
- `data/blog-expansion/`(123개 배치 파일) + `data/guide-expansion/`(11개 배치) 구조가 grep/감사하기엔 파일 수가 많음 — 콘텐츠가 수작업 저작물이면 유지, 아니라면 단일 데이터 파일 구조 고려.

---

## 4. CI / 운영 자동화

### High
- **빌드/린트/타입체크가 어떤 워크플로우에도 없음** — `package.json`에 `typecheck` 스크립트조차 없음(`tsconfig.json`은 `strict:true`/`noEmit:true`이지만 아무도 `tsc`를 실행하지 않음). PR 단계에서 빌드 깨짐을 잡을 수 없고 Vercel 배포 시점에야 발견됨.
- **CI 실패가 어디에도 통지되지 않음** — 3개 워크플로우 모두 실패 시 GitHub Actions 탭에만 남고 Slack/이메일/이슈 코멘트 알림 없음. 특히 "fail closed on live cost checks"(7ea0ace)로 비용 초과 시 하드 실패하도록 만들어놨는데 아무도 알아채지 못하면 무의미.
- **GSC sitemap 재제출이 로컬 스크립트에 의존** — `scripts/submit-gsc-sitemap.mjs:7`가 `D:/env/gsc_credentials.json`(Windows 전용) 기본값을 가지며 어떤 워크플로우/cron에도 연결되어 있지 않음. STATUS.md에 따르면 운영 환경에 서비스 계정 시크릿이 없으면 cron에서도 skip되므로, 사실상 특정 로컬 머신에만 의존하는 단일 장애점.

### Medium
- `post-deploy-indexing.yml`만 `timeout-minutes`/`concurrency`/`permissions` 블록이 없음(다른 두 워크플로우는 셋 다 설정).
- `vercel.json`의 5시간 주기 cron(`/api/cron/indexing`)과 `post-deploy-indexing.yml`의 배포 완료 후 동일 endpoint 호출이 중복 트리거될 가능성 — 의도된 것인지 확인 필요("ci: reduce duplicate cost audit runs" 이력을 보면 팀이 이미 중복 실행을 정리 중).
- **테스트 커버리지 사실상 전무** — `scripts/check-live-costs.test.mjs` 1개뿐, 나머지 20여 개 스크립트와 앱 라우트/컴포넌트에는 테스트가 전혀 없음.
- `audit-hosting-costs.mjs`의 cron 인증 가드 탐지가 정규식+상대경로 4단계 추적 휴리스틱이라 새로운 인증 방식(공유 미들웨어 등)을 놓칠 수 있음.
- `post-deploy-indexing.yml`에 `workflow_dispatch`가 없어 배포 없이 수동 재실행 불가.

### Low
- 워크플로우 대상 브랜치에 `master`/`develop`이 남아있음 — 실제 사용 브랜치(`main`)와 불일치 시 정리.
- Node 버전이 최근 22→24로 변경된 이력이 있어 `package.json`/Vercel 런타임 설정과의 정합성 재확인 필요.

---

## 우선순위 실행 리스트 (영역 통합, 상위 10개)

1. CI에 `lint` + `tsc --noEmit` + `build` 게이트 추가 (push/PR 시 실행)
2. CSP에서 `unsafe-inline`/`unsafe-eval` 제거 (nonce/hash 방식 전환)
3. `validate-seo`/`validate-content`/`validate-adsense`/`score-all-content-quality`를 CI 워크플로우에 연결
4. 체크리스트/D-Day 페이지 localStorage 초기화를 `useEffect` 기반으로 수정 (하이드레이션 불일치 해소)
5. CI 실패 알림 채널 추가 (Slack webhook 또는 이슈 자동 생성)
6. `app/` 전역 `error.tsx`/`not-found.tsx` 추가
7. GSC sitemap 재제출을 CI/cron으로 이전 (로컬 머신 의존 제거, `D:/env/...` 하드코딩 제거)
8. OG 이미지를 글별 동적 생성으로 전환 (`next/og` 동적 세그먼트)
9. BreadcrumbList JSON-LD 추가
10. cron 인증 비교를 `crypto.timingSafeEqual`로 교체 + rate limit 검토

---

*이 문서는 코드 변경 없이 조사 결과만 정리한 것입니다. 특정 항목부터 실제 수정에 들어갈지 알려주시면 진행하겠습니다.*

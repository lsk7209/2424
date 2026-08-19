# 작업 인계

## Release candidate preparation (2026-08-19T18:59:35+09:00)

- Previous remote/production baseline: `0602ddf` on GitHub `main`; the release candidate contains only the reviewed editorial override integration, 55 dossier artifacts, validators, and this handoff update.
- Explicitly excluded from staging: existing user-dirty files `app/blog/[slug]/page.tsx`, `app/feed/route.ts`, `app/guide/[slug]/page.tsx`, `components/analytics/GoogleAnalyticsTracker.tsx`, and `package-lock.json`.
- Release evidence before external mutation: `npm run generate:editorial-overrides`, `npm run validate:editorial-overrides`, `npm run audit:editorial-dossiers`, lint, TypeScript, build, full live SEO validation 78/78, AdSense validation, moving validators, GSC/GA4 audit, and four local production-route renders all passed.
- Rollback: retain `0602ddf` as the known-good previous commit/deployment. If the release fails, revert the release commit or select the previous Vercel deployment; do not reset unrelated worktree changes.
- Next step: stage only the owned paths, review the staged diff, commit, push `main`, then verify the Vercel deployment and public rewritten routes before any GSC submission or URL inspection request.

## Editorial override integration checkpoint (2026-08-19T18:56:06+09:00)

- User goal: continue the article-by-article rewrite so every retained article has a research-backed, human editorial draft connected to the Next.js content model.
- Current state: all 55 dossiers remain complete and validated. `scripts/generate-editorial-overrides.mjs` now deterministically converts the 55 MDX drafts into `data/editorial-overrides.ts`; `lib/content.ts` applies title, excerpt, and HTML body overrides by slug while preserving date, category, keywords, FAQ, and publication scheduling. `package.json` exposes the reproducible `generate:editorial-overrides` command.
- Fresh local verification: generator produced 55 overrides; `npm run validate:editorial-overrides` and `npm run audit:editorial-dossiers` passed for all 55 dossiers, with no H1 or unresolved Markdown link syntax in generated output. `npm run lint`, `npm exec -- tsc --noEmit`, and `npm run build` passed. A temporary production server on port 3110 returned 200 for four representative rewritten routes (`/blog/jeonse-fraud-prevention-guide`, `/guide/moving-center-selection`, `/guide/officetel-contract-checklist`, `/blog/daiso-lighting-tips`), each with one H1, the editorial body marker, no raw Markdown, and the canonical `https://today2424.kr/...` URL. `validate:content`, `validate:moving`, `validate:moving:manifest`, and `validate:adsense` passed. Full live SEO validation passed 78/78 sitemap URLs with seven regional description-length warnings only.
- Live/read-only evidence: current public sitemap is 78 URLs (24 blog, 30 guide, 5 tools); the 54 source-inventory dossier routes are live, but the new override bodies are not public until a deployment. GSC API is healthy for `https://today2424.kr/` but the 2026-07-20..2026-08-16 window has 6 pages, 5 queries, 0 clicks, and 5 impressions; GA4 measurement `G-N2V7ZZP184` / property `534327620` matches and API health is `ok`.
- Changed files or systems: added `data/editorial-overrides.ts` and `scripts/generate-editorial-overrides.mjs`; updated `lib/content.ts`, `package.json`, `scripts/validate-seo.mjs`, `docs/HANDOFF.md`, and the existing editorial manifest/dossier artifacts. No WordPress, Vercel, GitHub push, GSC submission, URL inspection, or production content mutation was performed in this checkpoint. Existing user-dirty source files remain untouched.
- Side effects / rollback: the generated map is reproducible from `output/today2424/drafts/*.mdx`; remove the import/application block in `lib/content.ts` and the generator script/map to roll back the local integration, leaving the original data files intact. Do not reset the working tree.
- Risks / blockers: the public site still serves the previous deployed content until an explicitly authorized preview/production deployment. Seven `/moving/*` descriptions exceed the conservative Naver length warning; they are editorial metadata handoff items, not silently auto-edited. No ranking or indexing outcome is guaranteed by these checks.
- Next step: review the preview on 390/768/1366px, then stop at the deployment/GSC authorization boundary; the dated site-optimizer audit, patch plan, implementation guide, and v1.2 content handoff are now stored under `C:\Users\dlatj\.codex\site-optimizer-state\today2424.kr\reports\`.

## Article-by-article editorial pass checkpoint (2026-08-19T18:33:00+09:00)

- User goal: improve every retained article through an individual research run, source analysis, dedicated persona, original Korean draft, and QA rather than a shared template.
- Current state: all 55 retained article dossiers are complete in `output/today2424/`: each has a dedicated persona, a research JSON with 5 research runs and 5 sources, a draft with at least 3,500 visible body characters under persona-writer's `visible_prose` rule, and a `done` QA JSON. `output/today2424/manifest.json` lists 55 unique entries with distinct structure/title/opening signatures. The final five contract dossiers passed their anti-template, placeholder, and route checks, so no staged dossier remains.
- Completed IDs: `moving-estimate-contract-record`, `moving-checklist-d30`, `deposit-loan-timeline`, `parking-and-delivery-noise-check`, `appliance-electric-bill-planning`, `deposit-transfer-checklist`, `moving-center-selection`, `rental-contract-special-clauses-guide`, `entry-inspection-form-guide`, `room-measurement-mistakes`, `monthly-rent-receipt-guide`, `moving-box-label-system`, `maintenance-fee-red-flags`, `pet-friendly-rent-check`, `winter-window-condensation-hacks`, `rent-budget-sheet-guide`, `broker-fee-negotiation-myths`, `move-out-cleaning-budget`, `studio-storage-planning-guide`, `internet-install-booking-guide`, `landlord-tax-arrears-check`, `secondhand-furniture-checklist`, `gas-electric-water-change-guide`, `lease-end-notice-template`, `freelance-tenant-income-proof`, `one-room-security-check`, `house-viewing-checklist`, `jeonse-loan-documents-guide`, `rainy-day-house-viewing`, `online-transfer-address-guide`, `studio-mold-signs`, `first-appliance-budget-plan`, `move-out-checklist`, `mold-repair-request-template`, `house-photo-record-guide`, `how-to-read-registry`, `administrative-welfare-center`, `utility-transfer-move-day`, `daiso-lighting-tips`, `feng-shui-interior-tips`, `mold-removal-tips`, `priority-repayment-amount`, `part-time-worker-rent-docs`, `real-estate-app-tips`, `safe-door-lock-password`, `small-room-mirror-placement`, `auction-process-guide`, `maintenance-fee-guide`, `noise-complaint-guide`, and `standard-rental-contract`.
- Fresh validation: manifest JSON parses with 55 entries and covers all 54 source-inventory slugs plus the standalone original. Persona-writer-aligned measurement found visible prose from 3,555 to 6,452 characters, zero literal placeholder patterns, zero broken internal routes, and a maximum 8-token shingle Jaccard of 0.007049 (below the 0.05 anti-template gate). All 55 research and QA JSON files parse; each research file has 5 runs and 5 sources, and the nine repaired contract files use five official sources each. Per-file `git diff --no-index --check` reported zero whitespace diagnostics. The original persona path `personas/today2424/persona.md` remains outside the output folder and is intentionally referenced as-is.
- Not done: no dossier work remains. The `moving-estimate-contract-record` dossier is a standalone original article outside the current 54 source slugs. No draft has been published, scheduled, uploaded, or sent to WordPress in this editorial turn. No production deployment or GSC submission was triggered by these draft artifacts.
- Side effects / rollback: only new or edited editorial artifacts under `output/today2424/`, `personas/today2424/article-personas/`, and this handoff are in scope. Existing user-dirty source files remain untouched. Remove or revert only the new dossier files if the editorial batch is rejected; do not reset the working tree.
- Next step: editorial batch is complete; preserve this handoff and make any publication, deployment, or GSC action only as a separately authorized operation.

## Whole-site Google visibility audit (2026-08-19T15:40:00+09:00)

- User goal: continue improving the entire site for Google visibility until the actionable work is complete; do not confuse successful deployment with a promised ranking outcome.
- Technical evidence: live SEO validation passed for 30 sampled sitemap URLs; live audit reports 530 sitemap URLs (426 blog, 80 guide, 5 tools, plus other routes) with 200 status, canonical, one H1, GA4, and AdSense markers on sampled hub pages. `robots.txt`, `rss.xml`, `ads.txt`, `llms.txt`, and `llms-full.txt` return 200; `ads.txt` has the configured direct Google publisher line. AdSense validation passed.
- Content evidence: `score:all-content` passed for 904 articles (minimum 91, average 99); publication-density audit passed at a controlled maximum of two future publications per day; content validation passed for 904 slugs / 1,030 titles / 800 new articles. Those checks are only structural: direct source review found 402 currently public expanded blog posts and 50 expanded guides with repeated fixed paragraphs, summaries, comparison tables, checklists, and FAQ phrasing; 398 additional blog posts were scheduled to follow. This is not sufficient originality or first-hand evidence for ranking and is a scaled-content risk.
- Search evidence: GSC property and sitemap are healthy, but the latest available period has only 5 queries / 6 pages / 0 clicks and the sitemap inventory remains 530 submitted / 0 indexed while Google processes it. This is insufficient to prove site-wide rankings or choose query-specific rewrites. GA4 collection is healthy but has a similarly small sample.
- Remediation in progress: withhold all 850 template-expanded entries from published/scheduled content, leaving the hand-authored and separately scheduled inventory available. This deliberately makes prior template-only URLs unavailable rather than continuing to feed repetitive pages into the sitemap; reintroduce only after a source-backed, individually reviewed rewrite. Also remove the unsupported `SearchAction` schema because `/blog?q=` did not perform a search.
- Deployment and live verification: commit `9a51c9e` was pushed to GitHub `main` and Vercel Git integration production deployment `https://2424-hnvp9qpjh-limsubs-projects.vercel.app` reached Ready. On `https://today2424.kr`, sitemap returned 200 with 78 URLs (down from 530); a representative withdrawn template URL returned 404 and was absent from the sitemap; a retained core article and `/moving/seoul-mapo` returned 200; homepage HTML no longer contained `SearchAction`. No additional GSC sitemap submission was made because the existing submission is healthy and Google is still processing it.
- Gap / follow-up: PSI API calls were skipped after public endpoint 429 responses for mobile and desktop samples; no performance regression was inferred. Recheck CWV when API quota permits. After deployment, verify the reduced sitemap and then use GSC performance data to select high-intent articles for individual rewrites rather than restarting bulk generation.

## Editorial recovery foundation (2026-08-19T16:05:00+09:00)

- Created a truthful, non-recommendation editorial persona at `personas/today2424/persona.md` with two distinct short structural samples under `personas/today2424/samples/`.
- The source direction for future moving-estimate articles is limited to current Korea Consumer Agency guidance and the National Law Information Center rules for moving-freight estimates, contracts, and evidence. No provider recommendation, live-price claim, or invented personal experience is permitted.
- This is intentionally not publishable content yet: the two planned articles still require their own 3,500+ Korean-character drafts, `research.json`, `qa.json`, and manifest-level anti-template review under the persona-writer quality gates. Do not publish the samples.

## Local moving-content ranking reinforcement (2026-08-19T15:25:00+09:00)

- User goal: strengthen the moving-provider regional pages for Google search quality without inventing provider quality, pricing, availability, or local facilities.
- Completed locally: added `data/moving/region-guidance.ts` with distinct decision-support copy for all seven indexable Seoul regions. `app/moving/[region]/page.tsx` now renders source-derived category composition, region-specific comparison questions, one visible FAQ, region-specific title/description metadata, and matching visible-content `FAQPage` JSON-LD. Reworked `data/guides.ts` (`/guide/moving-center-selection`) to remove unsupported price/probability claims, add a comparison-and-contract-record checklist, a current official legal reference, and a contextual link to `/moving`.
- Reworked the only currently GSC-visible moving tool (`/tools/moving-cost-calculator`): removed the unsupported fixed-price algorithm and external search handoff, changed it into a transparent quote-comparison preparation tool, updated its metadata/schema/tool-card copy, and linked its result state to the on-site comparison guide. It now clearly says it does not calculate a live quote or market price.
- Validation: `npm run lint`, `npm run build`, and `git diff --check` passed. The build generated `/moving` plus all 7 `/moving/[region]` SSG paths (543 static pages total).
- Rendered local verification: production-mode local server returned 200 for `/moving/seoul-mapo`, `/guide/moving-center-selection`, and `/tools/moving-cost-calculator`; each emitted its production canonical. The regional page rendered its visible FAQ plus `FAQPage` schema and source-derived category content, the guide emitted `Article` plus `FAQPage` schema, and the tool rendered its no-live-price disclosure. The temporary server was stopped after verification.
- Read-only GSC/GA4 checkpoint: GSC was healthy (sitemap errors/warnings 0; last download `2026-08-19T06:02:02.371Z`) but still reports the prior 530 submitted / 0 indexed inventory. The latest available performance window (`2026-07-20` through `2026-08-16`) has only 6 pages and 5 queries with 0 clicks, so it cannot prove ranking or direct a query-level rewrite; GA4 measurement `G-N2V7ZZP184` and API health were confirmed.
- Scope boundary: the provider data remains a collected-search-result directory only; no ranking, endorsement, price, availability, or unverified provider claims were added. Existing user modifications remain unstaged and untouched: `app/blog/[slug]/page.tsx`, `app/feed/route.ts`, `app/guide/[slug]/page.tsx`, `components/analytics/GoogleAnalyticsTracker.tsx`, and `package-lock.json`.
- Deployment: commit `060ec25` was pushed to GitHub `main` and deployed through Vercel Git integration as production deployment `dpl_BrJAwmeitoK3ns5qUnoB7CLMPLTp` (READY; aliases include `https://today2424.kr`).
- Live verification: `https://today2424.kr/moving/seoul-mapo`, `/guide/moving-center-selection`, `/tools/moving-cost-calculator`, and `/sitemap.xml` each returned 200. The regional page has the distinct comparison guide and `FAQPage` schema; the guide has its rewritten comparison section and `FAQPage` schema; the tool has the no-live-price disclosure; sitemap includes the regional URL.
- GSC: sitemap `https://today2424.kr/sitemap.xml` was resubmitted at `2026-08-19T06:31:51.247Z`. It is pending Google processing; API reports 0 warnings and 0 errors, with the prior inventory still 530 submitted / 0 indexed.
- Next step: after Google reads the resubmitted sitemap and enough impressions accumulate, review query/page performance and adjust actual underperforming search intent rather than guessing at rankings.

## GitHub 배포 및 GSC 제출 완료 (2026-08-19T15:02:01+09:00)

- 배포: 이사 pSEO 커밋 `6c83d2c`를 GitHub `main`에 push했고, Vercel Git 연동 Production deployment `dpl_4B4hr6bQpz6MQYtJaMV7dF3y1Yhn`이 Ready 상태가 됐다. alias는 `https://today2424.kr`이다.
- 라이브 검증: `https://today2424.kr/moving` 200 및 마포 상세 `https://today2424.kr/moving/seoul-mapo` 200을 확인했고, 허브에는 마포 지역 링크가, 상세에는 68개 레코드가 표시됐다. live sitemap은 530개 URL을 제공한다.
- GSC: `https://today2424.kr/` property에서 `https://today2424.kr/sitemap.xml`을 라이브 반영 후 재제출했다. API 응답은 errors 0, warnings 0, `isPending: true`, lastSubmitted `2026-08-19T06:02:01.200Z`다. 마지막 API contents 수치는 Google 재처리 전 507 / indexed 0이므로 새 530개 URL의 처리 완료를 뜻하지 않는다.
- 사용자 기존 변경: `app/blog/[slug]/page.tsx`, `app/feed/route.ts`, `app/guide/[slug]/page.tsx`, `components/analytics/GoogleAnalyticsTracker.tsx`, `package-lock.json`은 배포 rebase 동안 stash로 보존 후 원상 복구했으며 커밋에 포함하지 않았다.
- 다음 한 단계: GSC가 sitemap을 다시 읽은 뒤 제출 URL 수와 색인 상태를 재확인한다. 원격 페이지의 취소·재제출·개별 URL 색인 요청은 별도 지시 없이 수행하지 않는다.

## 이사 업체 pSEO 적용 완료 (2026-08-19)

- 사용자 목표: `korea-local-business-datasets`의 이사 관련 원본에서 비관련 결과를 제외하고 `today2424.kr` pSEO에 적용.
- 적용 데이터: Naver 원본 300개에서 이사·포장이사·해외이사만, Google 원본 118개에서 이삿짐 운송·용달화물·운송 서비스·보관이사만 통과시켰다. 주소에서 서울 자치구를 확인할 수 없는 98개는 지역 pSEO에 넣지 않았다.
- 결과: source-native ID를 병합하지 않은 284개 레코드가 생성됐다. 색인 가능 페이지는 서울 마포구 68, 서대문구 36, 영등포구 53, 은평구 30, 강서구 41, 양천구 26, 용산구 17의 7개다. 구로·강남·종로·동작·관악은 최소 5개 미만이라 sitemap/pSEO에서 제외된다.
- 변경 파일: `data/moving/providers.json`, `data/moving/source-manifest.json`, `scripts/import-moving-baseline.mjs`, `package.json`, `app/moving/page.tsx`.
- 재현: `npm run import:moving:baseline`은 `D:\web\korea-local-business-datasets`의 `origin/main` 원본을 읽어 providers 데이터를 다시 생성한다. 원본 revision은 `57d85af24d146b2cc6f108ad46e06ebf87de235a`이며 Naver/Google 원본 SHA-256도 manifest에 기록했다.
- 검증: `npm run validate:moving:manifest`, `npm run validate:moving`, `npm run lint`, `npm run build` 모두 통과. build에서 `/moving` 및 7개 `/moving/[region]` 정적 경로가 생성됐다.
- 부작용/경계: 지도 수집 시점의 검색 결과만 표시하며 추천·순위·가격·보험·현재 영업 또는 출처 간 동일 업체를 주장하지 않는다. 배포, GitHub push, GSC 제출/색인 요청은 실행하지 않았다.
- 다음 한 단계: 로컬 preview에서 7개 지역 페이지의 원문 링크와 모바일 레이아웃을 확인한 후, 배포 여부를 별도로 결정한다.

## 원본 저장소 정정 확인 (2026-08-19)

- 앞선 "원본 export가 없다" 판단은 `korea-local-business-datasets`의 오래된 로컬 checkout만 확인한 오류였다. 사용자가 지정한 원격 `main`을 fetch해 revision `57d85af24d146b2cc6f108ad46e06ebf87de235a`에서 실제 원본을 확인했다.
- Naver 원본: `data/collection-runs/2026-08-06/naver-isa-corrected-results.json`, 이사 검색 결과 300개. 범주 분포는 이사 127, 포장이사 133, 해외이사 18이며 홈크리닝/청소/아파트청소 22개도 함께 있어 pSEO 연결 때 제외해야 한다.
- Google 원본: `data/collection-runs/2026-08-07/google-isa-all-unique-final.json`, 118개. 이삿짐 운송·용달화물·운송 서비스·보관이사 93개가 후보이고 은행·의류·청소·장비대여 등 관련 없는 25개는 제외 대상이다.
- 두 원본 모두 source-native ID를 가진 공개 지도 관찰 결과다. 실제 영업, 품질, 가격, 보험, 가용성 또는 추천 순위를 입증하지 않으며, Naver 300개와 Google 118개는 이름/주소로 병합하지 않는다.
- 다음 구현 단계: 관련 범주만 원본 ID 기준으로 정규화하고, 수집일·원문 링크·관찰 범위를 표시하는 마포권 이사 업체 검색 pSEO 페이지에 연결한다. 배포는 별도 승인 전까지 하지 않는다.

## 재개 점검 (2026-08-19T14:34:56+09:00)

- 사용자 요청: 중단된 이사 업체 원본 연결 작업을 재개함.
- 확인 결과: 인계에 지정된 `D:\program-codex\naver\naver-place-find` 경로가 현재 존재하지 않는다. `D:\web\korea-local-business-datasets`의 현재 `origin/main` 트리에도 `2026-08-18-isa-national` 원본은 없고, 이사 관련 파일은 기존 도구 페이지뿐이다.
- 대체 확인: `lim-brain` 원격 `main`은 manifest에 기록된 `4318c80413750dd96219c71c0bd81eb96f22d2f9`와 일치했다. 비인증 GitHub Tree API 조회는 private repository 때문에 404였으며, 원본을 회수할 수 있는 근거가 아니다.
- 검증: `npm run validate:moving:manifest` 통과 (Naver 4,784 / Google 1,278, raw 상태 `not-in-brain-repository`), `npm run validate:moving` 통과 (0 records, `awaiting-raw-export`, 색인 가능 지역 0).
- 변경/부작용: 애플리케이션 데이터나 코드는 수정하지 않았고, 이 인계 기록만 갱신했다. 현 데이터 해시: `providers.json` `AC1E55BB...54B6D9`, `source-manifest.json` `CD9C74FC...ED5C85`.
- 현재 차단점: 원본 JSON 본문 또는 source-native ID, 링크, 지역, 관찰일, 상세 상태를 포함하는 동등한 검증 가능 export가 없다.
- 다음 한 단계: 원본 export가 복구되면 먼저 별도 파일로 schema·행 수·SHA-256을 대조한 후에만 정규화 변환을 실행하고 `providers.json`을 연결한다. 이 상태에서는 지역 페이지 공개·배포·GSC 제출을 수행하지 않는다.

## GitHub 원본 재확인 (2026-08-19)

- 사용자 요청: `https://github.com/lsk7209/lim-brain`의 이사 업체를 pSEO에 적용.
- `lim-brain` 로컬 clone에서 `git fetch origin main` 후 최신 원격 revision `4318c80413750dd96219c71c0bd81eb96f22d2f9`을 직접 확인했다.
- 해당 revision의 `collections/topics/moving/`에는 Naver 4,784개와 Google 1,278개의 2026-08-18 지역 확장 요약, raw export 경로, SHA-256, 부분 detail checkpoint만 있다. `SOURCE_BOUNDARIES.md`와 두 source README는 원본 결과를 metadata-only Brain 밖의 `D:\program-codex\naver\naver-place-find`에 둔다고 명시한다.
- 실제 업체명·source-native ID·원문 링크·지역·관찰일을 갖춘 provider 레코드는 GitHub 트리에 없다. 따라서 업체별 또는 지역별 업체 목록 pSEO를 현 GitHub 데이터만으로 생성하지 않았다.
- 재개 조건은 변함없다: 원본 export 또는 동등한 provider-level export를 확보하고, manifest SHA-256/건수 대조와 `validate:moving`을 통과해야 한다.

## 다른 컴퓨터 수집분 복구 조사 (2026-08-19)

- `lim-brain` 원격의 2026-08-18 run summary는 수집이 실제 수행됐음을 뒷받침한다. Naver raw export는 4,739,915 bytes / SHA-256 `b71e54c4...880355e`, Google raw export는 1,532,466 bytes / SHA-256 `3d8d8604...1f3cbb`로 기록돼 있다.
- 현 컴퓨터에서 명시된 원본 경로, Brain의 동기 경로 설정, `D:\program-codex`, `D:\claude-backup`, `D:\codex`, `D:\.codex`의 관련 파일명·manifest 문자열을 조회했으나 raw export를 찾지 못했다.
- 결론: 다른 컴퓨터의 수집 원본이 GitHub metadata-only Brain에 동기화되지 않은 상태다. 해당 컴퓨터에서 두 raw JSON을 확보하거나 이 컴퓨터에 복사하면 해시와 행 수를 대조해 pSEO 변환을 재개할 수 있다.

## 현재 상태

- 기준 시각: 2026-08-19T14:15:10+09:00
- 사용자 목표: `lim-brain`에 기록된 이사 업체 수집 결과를 `today2424.kr`의 지역별 pSEO 구조에 안전하게 연결
- 현재 단계: GitHub `lim-brain`의 최신 moving manifest를 대조하고 `today2424`에 source manifest·검증·상태 표시를 연결했으며, 로컬 검증을 완료함

## 확인된 사실

- 대상 프로젝트: `D:\web\today2424\2424`, canonical `https://today2424.kr`
- `lim-brain` moving topic에는 2026-08-18 기준 Naver 4,784개·Google 1,278개 고유 식별자와 detail checkpoint 요약이 있음
- GitHub `lim-brain` 최신 main은 `4318c80413750dd96219c71c0bd81eb96f22d2f9`이며 `collections/topics/moving`에는 수집 요약·artifact 경로·SHA-256만 있음
- moving README와 `SOURCE_BOUNDARIES.md`는 raw 결과를 `D:\program-codex\naver\naver-place-find` 외부 workspace에 둔다고 명시하고, 현재 checkout·전체 Git 이력에는 raw JSON이 없음
- 확인된 raw artifact는 Naver 4,739,915 bytes / SHA-256 `b71e...355e`, Google 1,532,466 bytes / SHA-256 `3d8d...3cbb`로 manifest에 기록함. 파일 본문은 현재 환경에 없음
- 현재 live sitemap은 507개 URL이며 기본 live/SEO/AdSense 검증은 통과했지만, 최신 GSC 수집 기간의 클릭은 0이고 sitemap API의 indexed contents는 0으로 보고됨
- GSC URL Inspection 대표 확인에서 콘텐츠·도구 URL 3개는 `PASS / Submitted and indexed`; 홈은 사용자 canonical `https://today2424.kr/`에 대해 Google canonical을 `https://www.today2424.kr/`로 선택함
- 현재 live 헤더에서 non-www 홈은 200, www 홈은 non-www로 307 redirect이므로 홈 canonical 차이는 stale GSC 신호인지 재수집 후 재확인해야 함
- 따라서 원본 레코드를 추정하거나 지역별 빈 페이지를 먼저 공개하지 않음

## 기존 변경 보존

작업 시작 전부터 다음 파일은 사용자 변경으로 보존한다.

- `app/blog/[slug]/page.tsx`
- `app/feed/route.ts`
- `app/guide/[slug]/page.tsx`
- `components/analytics/GoogleAnalyticsTracker.tsx`
- `package-lock.json`

## 이번 작업의 변경 범위

- `data/moving/`에 source-native 식별자, 관찰일, detail 상태, 지역 slug를 포함한 정규화 계약 추가
- `data/moving/source-manifest.json`에 GitHub moving topic의 run 수량·detail checkpoint·raw artifact 경로·SHA-256 연결
- `scripts/validate-moving-data.mjs`로 입력 JSON의 식별자 중복·원문 도메인·관찰일·지역 품질을 검사
- `scripts/validate-moving-manifest.mjs`로 Brain manifest의 revision·source별 수량·SHA-256·raw 상태를 검사
- 원본 파일이 없으면 빈 데이터셋으로 유지하고 indexable region을 0으로 계산
- 검증된 지역만 `/moving/[region]`에 렌더링하고 sitemap에 추가
- `sourceStatus=ready`, source ID/link 대응 확인, 중복 없는 전체 데이터, 최근 관찰일을 모두 만족해야 색인 가능
- 합성 ready fixture에서 5개 레코드·상세 확인 2개·신선한 관찰일 조건으로 indexable region 생성까지 검증 후 fixture 삭제
- Naver/Google 레코드는 이름·주소·전화번호만으로 합치지 않음
- 수집 결과를 추천·순위·가격·보험·영업 상태로 표현하지 않음
- `MovingDirectoryTracker`로 지역 디렉터리 조회를 `moving_directory_view`, 원문 링크 클릭을 `moving_source_click`으로 측정하되 지역 slug·source·상태·수량만 전송
- 같은 `regionSlug`에 서로 다른 `regionName`이 섞이면 validator뿐 아니라 런타임 indexability도 차단
- `/moving` 대기 상태에 lim-brain의 Naver 4,784개·Google 1,278개 수집 증거를 표시하되, 업체 레코드로 오인되지 않도록 raw 미연결 상태를 명시

## 검증·부작용·롤백

- 로컬 lint/typecheck/moving 데이터/기존 콘텐츠 검증과 live SEO·AdSense 검증을 실행했다.
- `npm run build`: 통과, `/moving` 및 조건부 `/moving/[region]` 라우트 생성 확인
- `npm run validate:moving:manifest`: 통과, Brain revision `4318c804...` 및 source별 수량·raw 상태 확인
- GSC URL Inspection: 홈 `NEUTRAL / Duplicate`, 콘텐츠·도구 대표 3개 `PASS / Submitted and indexed`
- `next build`, GitHub push, Vercel 배포, GSC 제출/색인 요청은 이 단계에서 실행하지 않는다.
- 롤백은 새로 추가한 `data/moving/`, `lib/moving-directory.ts`, `app/moving/`, `components/MovingDirectoryTracker.tsx`, `components/MovingSourceLink.tsx`, `scripts/validate-moving-data.mjs`와 sitemap 변경을 되돌리면 된다.

## 다음 한 단계

외부 workspace에 기록된 Naver/Google raw artifact 본문을 확보해 schema를 먼저 확인하고, 그 다음 정규화된 레코드만 `data/moving/providers.json`에 연결한다. `npm run validate:moving:manifest`와 `npm run validate:moving`을 모두 통과한 지역만 preview에서 확인한 뒤 배포 여부를 별도로 판단한다.

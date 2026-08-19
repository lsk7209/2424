# 지역별 이사 업체 pSEO 데이터

이 디렉터리는 `lim-brain`의 수집 결과를 `today2424`에 연결하기 위한 공개용 정규화 데이터 경계입니다.

현재 `providers.json`은 원본 레코드가 연결되지 않은 상태를 명시하는 빈 데이터셋입니다. `lim-brain`에 있는 수집 요약의 업체 수만으로는 업체명·주소·원문 링크를 재구성할 수 없으므로, 원본을 추정해 페이지를 만들지 않습니다.

`source-manifest.json`에는 GitHub `lim-brain`에서 확인한 2026-08-18 `이사` 수집의 source별 ID 수, 상세 checkpoint, raw artifact 경로·SHA-256을 보존합니다. 이 manifest는 수집 증거이며 업체 레코드 자체가 아닙니다. 현재 raw artifact 상태는 `not-in-brain-repository`입니다.

## 입력 계약

`providers.json`의 `providers` 배열에 다음 필드를 가진 레코드를 넣습니다.

- `source`: `naver-place` 또는 `google-maps`
- `sourceId`: 해당 서비스의 원본 식별자. 두 서비스의 ID를 합치지 않음
- `name`, `regionSlug`, `regionName`: 수집 화면에서 확인된 값
- `sourceUrl`: 사용자가 원문 검색 결과를 다시 확인할 수 있는 HTTPS 링크
- `identityVerified`: source-native ID와 원문 링크의 대응을 수집기에서 확인했을 때만 `true`
- `observedAt`: 관찰 시각(ISO 8601)
- `detailStatus`: `visible`, `not_visible`, `unprocessed` 중 하나
- `address`, `phone`, `category`, `openingHours`, `websiteUrl`: 원문에 보이는 경우에만 입력

선택 필드인 `query`와 `sourceRun`은 수집 재현성과 원본 run 추적에 사용합니다. 주소·상호명·전화번호가 비슷하다는 이유만으로 Naver와 Google 레코드를 합치지 않습니다.

## 공개 게이트

지역 페이지는 다음을 모두 만족할 때만 생성되고 sitemap에 들어갑니다.

- 유효한 업체 레코드 5개 이상
- `detailStatus=visible` 레코드 2개 이상
- 모든 레코드의 `observedAt`이 최근 45일 이내
- 각 레코드의 source-native ID와 원문 HTTPS 링크가 유효함

이 기준은 검색엔진의 보장 기준이 아니라, 수집 카드만 반복한 얇은 페이지와 오래된 업체 정보를 먼저 공개하지 않기 위한 내부 품질 게이트입니다.

검증 명령:

```powershell
node scripts/validate-moving-data.mjs
```

다른 파일을 검사할 때는 다음처럼 실행합니다.

```powershell
node scripts/validate-moving-data.mjs --file path/to/providers.json
```

원본 수집의 최신 상태·가격·보험·영업 여부·전국 누락 여부는 이 데이터 계약만으로 보장하지 않습니다. 지역 페이지에서는 관찰 시각과 원문 링크를 함께 보여주며, 업체 추천·순위·품질 보증 문구를 사용하지 않습니다.

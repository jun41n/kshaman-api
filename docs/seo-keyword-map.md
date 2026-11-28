# MyTestType Search Intent Map

This is the working keyword and answer-intent map for the four active services.
Search volume is intentionally left for Search Console and keyword-tool validation;
these are hypotheses, not guaranteed ranking terms.

## Past life

| Intent | Query themes | Landing content | Primary action |
| --- | --- | --- | --- |
| Test discovery | AI 전생 테스트, 전생 캐릭터 테스트, 얼굴로 보는 전생 | `/` | Start the test |
| Historical curiosity | 조선시대 전생 직업, 왕이었을까 무사였을까, 조선시대 직업 테스트 | `/` plus past-life guide | Upload a face photo |
| Result curiosity | 전생 직업 종류, 전생 결과, 전생 이미지 만들기 | Past-life result and guide | Share the result |

Answer targets: explain what the experience does, what a face photo is used for,
what the result means, and why the result is entertainment rather than a factual
historical or personality claim.

## Face reading

| Intent | Query themes | Landing content | Primary action |
| --- | --- | --- | --- |
| Test discovery | AI 관상 테스트, 사진 관상, 얼굴 관상 테스트 | `/gwansang/` | Start face reading |
| Feature curiosity | 이마 관상, 눈 관상, 코 관상, 입 관상 | Face-reading guide | Upload a face photo |
| Interpretation limits | 관상으로 성격을 알 수 있나, 관상 보는 법 | Face-reading FAQ | Start a cultural reading |

Answer targets: distinguish visible facial impressions from traditional symbols,
describe the main regions in plain language, and state the entertainment-only scope.

## Palm reading

| Intent | Query themes | Landing content | Primary action |
| --- | --- | --- | --- |
| Test discovery | AI 손금 테스트, 사진으로 손금 보기, 손바닥 손금 분석 | `/palm-reading/` | Take or upload a palm photo |
| Line curiosity | 생명선, 두뇌선, 감정선, 운명선, 재물선 | Palm-reading guide | Start palm reading |
| How-to | 오른손 왼손 손금 차이, 손금 사진 찍는 법, 손금 궁합 | Palm FAQ and guide | Upload a palm photo |

Answer targets: explain what can be observed in a photo, how to capture a useful
image, what each traditional line is called, and what the service does not predict.

## Saju

| Intent | Query themes | Landing content | Primary action |
| --- | --- | --- | --- |
| Test discovery | AI 사주팔자, 무료 사주풀이, 사주 테스트 | `/k-shaman/` | Enter birth information |
| Topic curiosity | 사주 재물운, 사주 연애운, 사주 직업운, 올해 운세 | Saju explanation content | Start a reading |
| Method curiosity | 생년월일 사주, 사주 명리학, 사주 보는 법 | Saju FAQ | Start a reading |

Answer targets: explain the birth-information flow, traditional calendar terms,
the difference between calculation and interpretation, and the entertainment scope.

## Cross-category content rules

- Every guide must answer the main question in the opening paragraph.
- Every guide must link to one relevant test and two related guides.
- Titles must describe the page honestly; no keyword-only or duplicate pages.
- Visible FAQ content must match any FAQ structured data.
- Korean is the first content language; translated pages must preserve intent,
  not translate keywords mechanically.
- Claims about health, lifespan, guaranteed wealth, destiny, or identity remain
  explicitly out of scope.

## Measurement fields

Track by service and page: impressions, clicks, CTR, average position, country,
landing page, test_start, result_complete, result_share, support_cta_click, and
support_complete. Search Console query data is the source for replacing these
hypotheses with observed search demand.

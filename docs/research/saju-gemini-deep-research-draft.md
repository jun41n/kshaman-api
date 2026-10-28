# Gemini Deep Research: Saju Calculation Rules (Draft)

> Status: Gemini Deep Research completed. This is still an internal review
> note, not production authority. Source-level review is required before
> adding more historical data or enabling alternative schools.

## Research scope

- 입춘 절입시를 기준으로 한 연주 전환
- 24절기 중 절(節)의 절입시를 기준으로 한 월주 전환
- 한국 표준시의 역사적 변경과 서머타임
- 지방평균시와 진태양시/균시차 보정의 분리
- 23:00 자시의 야자시·조자시·정자시 차이
- 출생 시각 미상 처리
- 동일 입력 반복성, 계산 엔진과 해석 텍스트의 분리

## Findings from the completed Gemini report

1. The primary modern convention changes the year pillar at the
   astronomical 입춘 ingress rather than Gregorian New Year or Lunar New Year.
2. The month pillar changes at the ingress time of the
   relevant 12 solar terms, not at a calendar-day boundary.
3. Competing views including 동지세수설 exist; this must be an
   explicit product policy decision, not an accidental implementation detail.
4. Competing rules exist for the 23:00-01:00 子時 window,
   including 정자시 and 야자시·조자시. The engine must select and record one
   policy, and test the boundary cases.
5. The safer contract is not to assign an arbitrary time when birth time is
   unknown. The safer contract is to return only the determinable three pillars
   and mark the hour pillar as unknown.
6. Longitude/local-mean-time correction must remain separate from the
   equation-of-time/true-solar-time correction to avoid double correction.
7. A pure deterministic calculation function, stable JSON
   output, and golden tests around every boundary.

## Candidate sources surfaced by Gemini

These are leads, not approved sources. The final Deep Research report must
state which claims each source actually supports and assign confidence.

- Korean Astronomy and Space Science Institute daylight-saving reference:
  https://harg.kasi.re.kr/pro_plus/down/200307/200307_058-066.pdf
- OpenFate solar-term calculation:
  https://wiki.openfate.ai/ko/bazi/calendar/solar-longitude-solar-terms
- OpenFate equation-of-time reference:
  https://wiki.openfate.ai/ko/bazi/calendar/equation-of-time
- OpenFate year-pillar boundary:
  https://wiki.openfate.ai/ko/bazi/four-pillars/year-pillar
- Kim Man-tae related 야자시·조자시 reference:
  https://namestory.dsso.kr/bbs/board.php?bo_table=sub3_1&wr_id=216
- KMCSaju discussion of 야자시·조자시:
  https://kmcsaju.com/column/myungri-20260816-3860c810
- DestinySeek discussion of 子時:
  https://destinyseek.com/ko/guides/zi-time-theory/
- OpenFate reference on local mean time and true solar time:
  https://wiki.openfate.ai/ko/ziwei/calculation-variants/local-mean-time-true-solar-time-equation-of-time

## Implementation gate

Do not replace `sajuCalc.ts` or update curated interpretation records until the
final report is available and the following decisions are reviewed:

- selected year/month boundary policy and time-scale definition;
- selected 子時 policy, including 23:00 and 00:00 behavior;
- supported historical timezone/DST range;
- whether true-solar-time correction is optional, required, or excluded;
- unknown-hour output contract;
- at least 20 golden fixtures covering all boundaries.

## Implemented today

- `artifacts/api-server/src/lib/ai/sajuCalc.ts` now calculates year/month/day/hour
  pillars using an astronomical solar-longitude approximation and explicit
  policy metadata.
- Default policy is 입춘, 12절, UTC+09:00, and 정자시 at 23:00.
- Missing birth hour returns a null hour pillar instead of a fabricated value.
- `docs/saju-validation-matrix.md` records the 20-case release matrix.

## Not silently enabled

Historical Korean timezone/DST reconstruction, true-solar-time correction,
동지세수설, and 야자시 are explicit follow-up options. They require a selected
authoritative dataset and policy review before activation.


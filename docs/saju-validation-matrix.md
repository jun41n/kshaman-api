# Saju Calculation Validation Matrix

This matrix is the release gate for the deterministic calculation contract.
The default policy is 입춘 / 12절 / KST / 정자시. This is cultural and
entertainment guidance, not a scientific prediction.

| Case | Input condition | Expected invariant |
|---|---|---|
| 1 | Before 입춘 | Previous saju year pillar |
| 2 | At/after 입춘 | New saju year pillar |
| 3 | Before 경칩 | 寅 month branch |
| 4 | At/after 경칩 | 卯 month branch |
| 5 | Before 청명 | 卯 month branch |
| 6 | At/after 청명 | 辰 month branch |
| 7 | Before 입하 | 辰 month branch |
| 8 | At/after 입하 | 巳 month branch |
| 9 | Before 망종 | 巳 month branch |
| 10 | At/after 망종 | 午 month branch |
| 11 | 22:59 local time | Same civil date for day pillar |
| 12 | 23:00 local time | Next civil date for default 정자시 policy |
| 13 | 00:00 local time | 子 hour, current civil date |
| 14 | 01:00 local time | 丑 hour |
| 15 | Birth hour missing | Hour pillar is `null`; no fabricated hour |
| 16 | Asia/Seoul UTC+09 | Stable conversion to calculation instant |
| 17 | Explicit non-KST offset | Same wall time can produce a different boundary result |
| 18 | Same input repeated | Same pillars and policy metadata |
| 19 | 23:00 boundary repeated | Same next-day day pillar every run |
| 20 | Boundary-near input | `boundaryCase` is surfaced internally for review |

## Current evidence

- API typecheck passed after the calculator replacement.
- Smoke cases confirmed the 2024 입춘 and 경칩 transitions.
- 23:00 input advanced the day pillar under 정자시.
- Missing hour returned `hourPillar: null` and `timeUnknown: true`.

## Remaining hardening

Independent comparison against the Korean Astronomy and Space Science
Institute's 2024 calendar data found that the current solar-longitude
approximation places the 2024 입춘 and 경칩 boundaries a few minutes early
(KASI lists 2024-02-04 17:27 and 2024-03-05 11:23 KST). This is acceptable for
ordinary dates but not for a production-grade boundary contract. The current
implementation therefore remains a verified prototype, not a final ephemeris
implementation. The next release gate is to use an authoritative term-time
dataset or a selected ephemeris library and add exact minute-level fixtures.

Source used for this comparison:
https://astro.kasi.re.kr/file/astro_almanac_pdf/20231023135218580.pdf

동지세수설, 야자시, true solar time, and DST history remain review-only
options and are not silently enabled.

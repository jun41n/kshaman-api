# 관상·손금 지식 저장소 보강 조사

- 조사일: 2026-10-28
- 조사 도구: Google Gemini Deep Research
- 적용 원칙: 관상과 손금을 서로 다른 전통으로 유지하고, 관찰값과 상징적 해석을 분리한다.
- 운영 상태: 아래의 보수적 항목만 API의 `curated` 카탈로그에 반영했다. 결정론적 예측, 건강·수명·재산 판정, 성별 규칙은 반영하지 않았다.

## 1. 조사 결과 요약

### 관상

- 한국 전통 관상학의 삼정·오관·십이궁은 얼굴 영역을 조직하는 문화적 용어로 사용할 수 있다.
- 얼굴 사진에서는 얼굴 영역, 표정, 좌우 비대칭, 조명, 각도, 가림, 해상도를 관찰 변수로 분리한다.
- 전통 상징은 보이는 특징을 먼저 기술한 뒤 조건부 문화 참고로만 렌더링한다.
- 건강, 지능, 범죄성, 인종·성별·나이 판단으로 확장하지 않는다.

### 손금

- 서양 손금의 주요 선, 언덕, 손 모양은 분류 용어로 사용할 수 있다.
- 주로 쓰는 손과 덜 쓰는 손을 비교하는 전통이 있지만 학파 차이가 있으므로 단일 규칙으로 고정하지 않는다.
- 생명선은 수명, 선의 모양은 재산·건강·성공을 확정하는 근거로 사용하지 않는다.
- 사진이 흐리거나 좌우 방향이 불명확하면 해석보다 재촬영 안내를 우선한다.

## 2. 출처

### 관상

1. 한국학중앙연구원, 「관상」, 한국민족문화대백과사전: https://encykorea.aks.ac.kr/Article/E0004873
2. 한국학중앙연구원, 「얼굴」, 한국민족문화대백과사전: https://encykorea.aks.ac.kr/Article/E0036194

십이궁의 세부 대응과 일부 현대 해설 사이트는 전통 자료와 상업적 재해석이 섞여 있어 `review-needed`로 취급했다.

### 손금

1. Encyclopaedia Britannica, “Palmistry”: https://www.britannica.com/topic/palmistry
2. Palmistry Path, “The Major Lines of the Palm”: https://palmistrypath.com/blog/beginner/major-lines-overview/
3. Palmistry Path, “Western Palmistry Basics”: https://palmistrypath.com/blog/beginner/western-palmistry-basics/
4. Project Gutenberg, Cheiro, *Palmistry for All*: https://www.gutenberg.org/cache/epub/20480/pg20480-images.html
5. Palmistry Path, “Which Hand Do You Read in Palmistry?”: https://palmistrypath.com/blog/beginner/which-hand-to-read-palmistry/

고전 손금 문헌과 현대 블로그는 역사적 전통을 보여주는 자료이지 과학적 검증 자료가 아니다. 따라서 API 문구에는 문화·오락 프레임을 고정했다.

## 3. 반영 레코드

`artifacts/api-server/src/lib/knowledge/index.ts`에 다음 레코드를 추가했다.

- `FACE-TRADITIONAL-FRAMEWORK-001`
- `FACE-OBSERVATION-QUALITY-001`
- `PALM-WESTERN-TERMINOLOGY-001`
- `PALM-OBSERVATION-QUALITY-001`
- `PALM-HAND-COMPARISON-002`

기존 `PALM-WESTERN-MAJOR-LINES-001`, `PALM-COMPATIBILITY-001`, `FACE-TRADITIONAL-REGIONS-001`과 함께 검색되며, 현재 검색기는 `curated` 상태만 프롬프트에 주입한다. `review-needed` 자료는 저장하되 운영 결과에는 주입하지 않는다.

## 4. 검수 매트릭스 요약

관상 10건과 손금 10건은 Gemini 보고서에서 후보로 정리되었다. 운영 전에 다음을 확인해야 한다.

| 영역 | 검수 기준 | 처리 |
|---|---|---|
| 관상 | 영역 명칭과 위치가 관찰 설명과 일치하는가 | curated 가능 |
| 관상 | 삼정·오관·십이궁을 운명/건강 판정으로 확장하는가 | review-needed 또는 차단 |
| 관상 | 조명·각도·표정·가림이 나쁜데 특징을 단정하는가 | 재촬영 안내 |
| 관상 | 인종·성별·나이로 성격이나 능력을 추론하는가 | 차단 |
| 관상 | 사진 관찰과 상징 해석이 한 문장에 혼합되는가 | 프롬프트 분리 |
| 손금 | 주요 선·언덕·손 모양이 관찰 가능한가 | curated 가능 |
| 손금 | 생명선을 수명이나 건강으로 해석하는가 | 차단 |
| 손금 | 재산·투자·복권 결과를 단정하는가 | 차단 |
| 손금 | 좌우 손 전통을 유일한 규칙으로 표현하는가 | review-needed |
| 손금 | 손바닥 방향·선명도·가림이 불충분한가 | 재촬영 안내 |

## 5. 구현 상태와 다음 단계

현재는 인라인 구조화 카탈로그를 사용하는 단계다. Oracle DB에 전체 문헌을 그대로 넣은 상태는 아니며, API가 계산·관찰 결과에 맞는 승인된 지식 레코드의 안전 문구를 검색해 AI 렌더러에 주입한다.

다음 단계는 별도 배포 없이 진행할 수 있다.

1. 관상·손금 이미지 품질 판정 결과를 `featureKeys`와 연결한다.
2. `review-needed` 승인 절차와 레코드 버전 필드를 추가한다.
3. 관상·손금 golden fixture를 추가해 동일 입력의 규칙 주입과 금지어 차단을 회귀 테스트한다.
4. 충분한 운영 자료가 쌓이면 인라인 카탈로그를 Oracle 테이블로 이전한다.

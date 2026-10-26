# MyTestType agent team

This repository is operated by a six-role team. The lead agent owns scope,
integration, production safety, and the final report to the user. Specialist
agents work on bounded tasks and return evidence to the lead.

## Roster

### 1. Agent lead

- Owns priorities, task decomposition, integration, and user-facing reports.
- Resolves conflicts between product, design, marketing, analytics, and QA.
- Reviews every production change and confirms the final live state.
- Never presents specialist output as complete until it has been verified.

### 2. Developer

- Owns the K-Shaman and face-reading frontend, API integration, performance,
  security, build health, and deployment mechanics.
- Keeps K-Shaman as the primary product and face reading as the only secondary
  public product unless the user explicitly changes that direction.
- Does not expose legacy tests, tarot, blog, or pet-test navigation.
- Adds focused tests in proportion to the change and reports pre-existing
  failures separately.

### 3. Designer

- Owns mobile-first UX, responsive behavior, accessibility, loading/error
  states, result layouts, and share-card design.
- Uses the existing product identity and avoids decorative UI that slows or
  obscures the reading flow.
- Verifies that text, controls, ads, and result cards do not overlap.

### 4. Marketer and editor

- Owns result storytelling, section hierarchy, social sharing copy, metadata,
  and Korean-first editorial consistency.
- Makes readings specific through observable patterns, conditional language,
  everyday tensions, and actionable next steps.
- Never uses fabricated certainty, deceptive cold reading, supernatural
  certainty, or definitive medical, legal, financial, fertility, lifespan, or
  relationship claims.
- Keeps the cultural and entertainment-oriented guidance label visible.

### 5. Data analyst

- Owns GA4 and product-funnel measurement, event naming, dashboards, and
  experiment readouts.
- Never sends names, birth dates, birth times, photos, full AI readings,
  account/payment details, or free-text user input to analytics tools.
- Separates measured facts from hypotheses and records metric definitions.

### 6. QA reviewer

- Owns mobile and desktop regression, browser coverage, API failure states,
  accessibility, ads, sharing, privacy, and release acceptance.
- Confirms that legacy tests remain unlinked and unavailable before release.
- Reports findings by severity with reproducible evidence.

## Default workflow

1. The lead states scope, expected time, and whether production is in scope.
2. The developer identifies technical constraints and the smallest safe change.
3. The designer and marketer define the user experience and wording contract.
4. The analyst defines privacy-safe events and success metrics.
5. The developer implements against the agreed contracts.
6. QA verifies locally or in staging and records failures.
7. The lead reviews diffs, tests, and live behavior before reporting completion.

Specialists may run in parallel when their write scopes do not overlap. The
lead integrates their work and is the only role that gives the final completion
report.

## Change and deployment rules

- Preserve unrelated user changes and inspect both repositories before editing.
- Source repository: jun41n/kshaman-api.
- Static deployment repository: jun41n/mytesttype.
- Never commit secrets, private keys, payment credentials, or user data.
- Do not deploy calculation or interpretation changes until their validation
  plan has been reviewed.
- A production report must include the pushed commit, build/test status, live
  URL checks, and known residual risks.

## Specialist report format

Each specialist returns:

1. Outcome or recommendation.
2. Evidence: files, screens, events, or test cases reviewed.
3. Top five prioritized tasks.
4. Risks or open decisions.
5. Whether files were changed.

## Current first backlog

1. Implement and validate the deterministic Saju v2 calculation contract
   before changing production interpretation behavior.
2. Reduce K-Shaman to a mobile-first input -> loading -> result flow, with
   persona choices treated as optional tone rather than separate products.
3. Add API input validation, restricted CORS, rate limiting, timeouts, and
   privacy-safe logging.
4. Build face reading as an independent lightweight entry point without legacy
   test, tarot, blog, or pet-test code in its public bundle.
5. Add privacy-safe funnel events and explicitly mask all personal/result
   content before enabling session replay on K-Shaman.
6. Add anonymous result cards for 1080x1350 feed and 1080x1920 story sharing.
7. Require responsive, accessibility, API-failure, ad-overlap, sharing, privacy,
   and legacy-route checks before every production release.

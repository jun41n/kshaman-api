# MyTestType Knowledge-Grounded Reading Architecture

## Decision

AI is used as a language renderer, not as an authority that invents new
fortune-telling rules. The server calculates or observes the input, retrieves
curated cultural references, and asks the model to paraphrase only those
references in a bounded JSON schema.

## Current implementation

- Repository: `artifacts/api-server/src/lib/knowledge/index.ts`
- Domains: `palm`, `face`, and `saju`
- Every record has a stable rule ID, tradition, topic, feature keys,
  provenance, safe wording, prohibited claims, and review status.
- Retrieval is feature-key based and deterministic. Provenance and rule IDs
  remain internal to prompt construction and review; they are not exposed in
  consumer-facing reading responses.
- Palm requests retrieve major-line, money-reflection, or two-person comparison
  rules depending on the selected mode.
- Face requests retrieve the visual-region and cultural-wording rules.
- Saju session, compatibility, and Gongsu contexts retrieve five-element and
  branch-relation rules alongside the calculated Saju data.
- The model is instructed to omit unsupported claims and to preserve the
  cultural/entertainment framing.

## What this is not yet

This first version is a versioned in-code catalog, not a vector database or a
fully reviewed historical corpus. The catalog is deliberately small and
conservative. New source material must be added with a source locator,
transcription or summary, reviewer, review date, and explicit prohibited
topics before it becomes `curated`.

## Next controlled expansion

1. Move records to an Oracle-managed knowledge directory or database table so
   content can be updated without changing application code.
2. Add source documents and a review workflow for Myeongri, Korean face-reading
   traditions, and separate palmistry traditions. Do not mix traditions without
   labeling them.
3. Add an embedding index only as a recall aid. Retrieved records must still
   pass domain, tradition, status, and prohibited-topic filters.
4. Add deterministic feature extraction contracts for palm and face images so
   the renderer receives observations rather than free-form model guesses.
5. Add golden fixtures that assert identical inputs produce identical feature
   selections and stable rule IDs.

## Release rule

Knowledge changes require a catalog diff, provenance review, safety review, and
regression check before production deployment. A model upgrade alone must not
change the cultural rules used for a reading.

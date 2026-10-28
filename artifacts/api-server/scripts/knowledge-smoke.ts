import {
  KNOWLEDGE_RECORDS,
  buildKnowledgeContext,
  retrieveKnowledge,
} from "../src/lib/knowledge/index.js";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

assert(
  KNOWLEDGE_RECORDS.every((record) =>
    record.status === "curated" || record.status === "review-needed",
  ),
  "knowledge records must have a valid review status",
);

const face = retrieveKnowledge(
  "face",
  [
    "face-regions",
    "samjeong",
    "face-image-quality",
    "lighting",
    "camera-angle",
    "occlusion",
  ],
  "ko",
);
assert(
  face.ruleIds.includes("FACE-TRADITIONAL-FRAMEWORK-001") &&
    face.ruleIds.includes("FACE-OBSERVATION-QUALITY-001"),
  "face search must include framework and image-quality rules",
);

const palm = retrieveKnowledge(
  "palm",
  [
    "major-lines",
    "palm-image-quality",
    "palm-open",
    "line-visibility",
    "left-hand",
    "right-hand",
  ],
  "ko",
);
assert(
  palm.ruleIds.includes("PALM-WESTERN-TERMINOLOGY-001") &&
    palm.ruleIds.includes("PALM-OBSERVATION-QUALITY-001"),
  "palm search must include terminology and image-quality rules",
);

const compatibility = buildKnowledgeContext(
  "palm",
  ["compatibility", "person-pair", "dominant-hand", "two-hand-comparison"],
  "en",
);
assert(
  compatibility.ruleIds.includes("PALM-HAND-COMPARISON-002") &&
    compatibility.text.includes("DO NOT CLAIM"),
  "compatibility context must include hand-comparison safety guidance",
);

for (const record of KNOWLEDGE_RECORDS.filter(
  (candidate) => candidate.status === "review-needed",
)) {
  const result = buildKnowledgeContext(record.domain, record.featureKeys, "ko");
  assert(
    !result.ruleIds.includes(record.id),
    `review-needed record leaked into runtime context: ${record.id}`,
  );
}

console.log(
  `knowledge smoke passed: ${KNOWLEDGE_RECORDS.length} records, face/palm/compatibility retrieval verified`,
);

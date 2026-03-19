import { PetResult, PetType } from "@/data/petData";

interface Props {
  result: PetResult;
  petType: PetType;
}

export default function PetShareCard({ result, petType }: Props) {
  return (
    <div
      style={{
        background: result.gradient,
        width: "100%",
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 28px",
        boxSizing: "border-box",
        fontFamily: "'Noto Sans KR', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.18)",
          borderRadius: 999,
          padding: "6px 16px",
          marginBottom: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.9)",
          textTransform: "uppercase",
        }}
      >
        {petType === "dog" ? "🐕 강아지" : "🐈 고양이"} 성향 테스트
      </div>

      <div style={{ fontSize: 68, lineHeight: 1, marginBottom: 12 }}>
        {result.emoji}
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 8,
          textShadow: "0 2px 12px rgba(0,0,0,0.18)",
        }}
      >
        {result.title}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.88)",
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 220,
          marginBottom: 20,
        }}
      >
        {result.summary}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.22)",
          borderRadius: 16,
          padding: "10px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          width: "100%",
          maxWidth: 260,
        }}
      >
        {result.traits.map((t, i) => (
          <div
            key={i}
            style={{
              fontSize: 11,
              color: "white",
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <span style={{ opacity: 0.7 }}>✦</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 10,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: 1,
        }}
      >
        반려동물 성향 테스트
      </div>
    </div>
  );
}

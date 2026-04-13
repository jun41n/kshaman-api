import { useTranslation } from "react-i18next";
import { PetResult, PetType } from "@/data/petData";

interface Props {
  result: PetResult;
  petType: PetType;
}

export default function PetShareCard({ result, petType }: Props) {
  const { t } = useTranslation();
  const rKey = `${petType}.results.${result.key}`;
  const labelKey = petType === 'dog' ? 'quiz.dogLabel' : 'quiz.catLabel';
  const isDog = petType === 'dog';

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background watermark: large MBTI code (dog only) ── */}
      {isDog && (
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 360 480"
          fill="none"
        >
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fontSize="180"
            fontWeight="900"
            fill="rgba(255,255,255,0.08)"
            fontFamily="Inter, sans-serif"
            letterSpacing="-8"
          >
            {result.key.toUpperCase()}
          </text>
        </svg>
      )}

      {/* ── All content sits above the watermark ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Badge */}
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
          {t(labelKey)} {t('pet.appName')}
        </div>

        {/* Dog/Cat image or emoji */}
        {result.image ? (
          <div
            style={{
              width: 180,
              height: 180,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={result.image}
              alt={result.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.22))",
              }}
            />
          </div>
        ) : (
          <div style={{ fontSize: 68, lineHeight: 1, marginBottom: 12 }}>
            {result.emoji}
          </div>
        )}

        {/* ── Horizontal divider ── */}
        <div
          style={{
            width: "80%",
            height: 1,
            background: "rgba(255,255,255,0.30)",
            marginBottom: 14,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: isDog ? 4 : 8,
            textShadow: "0 2px 12px rgba(0,0,0,0.18)",
          }}
        >
          {t(`${rKey}.title`)}
        </div>

        {/* MBTI type code (dog only) */}
        {isDog && (
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              letterSpacing: 3,
              marginBottom: 8,
            }}
          >
            ({result.key.toUpperCase()})
          </div>
        )}

        {/* Summary */}
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.88)",
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 220,
            marginBottom: 18,
          }}
        >
          {t(`${rKey}.summary`)}
        </div>

        {/* Traits */}
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
          {[0, 1, 2].map((i) => (
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
              <span>{t(`${rKey}.trait${i}`)}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 18,
            fontSize: 10,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 1,
          }}
        >
          {t('pet.appName')}
        </div>
      </div>
    </div>
  );
}

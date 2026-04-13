import { useTranslation } from "react-i18next";
import { PetResult, PetType } from "@/data/petData";

interface Props {
  result: PetResult;
  petType: PetType;
}

export default function PetShareCard({ result, petType }: Props) {
  const { t } = useTranslation();
  const rKey = `${petType}.results.${result.key}`;
  const labelKey = petType === "dog" ? "quiz.dogLabel" : "quiz.catLabel";
  const isDog = petType === "dog";

  const title = t(`${rKey}.title`);
  const summary = t(`${rKey}.summary`);
  const isLongTitle = title.length > 14;
  const isLongSummary = summary.length > 36;

  return (
    <div
      style={{
        width: "360px",
        height: "480px",
        background: result.gradient,
        borderRadius: "28px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, 'Malgun Gothic', sans-serif",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* ── Watermark: large MBTI code (dog only) ── */}
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
            y="58%"
            textAnchor="middle"
            fontSize="180"
            fontWeight="900"
            fill="rgba(255,255,255,0.08)"
            fontFamily="Inter, sans-serif"
            letterSpacing="-10"
          >
            {result.key.toUpperCase()}
          </text>
        </svg>
      )}

      {/* ── Ambient glows ── */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "26px 26px 22px",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                background: "rgba(255,255,255,0.20)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              ✦
            </div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}
            >
              MyTestType
            </span>
          </div>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.30)",
              fontSize: "10px",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "0.3px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {t(labelKey)}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          {/* Dog image or emoji */}
          {result.image ? (
            <img
              src={result.image}
              alt={result.key}
              crossOrigin="anonymous"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "contain",
                marginBottom: "16px",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.30))",
              }}
            />
          ) : (
            <div
              style={{
                fontSize: "68px",
                lineHeight: "1",
                marginBottom: "20px",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.30))",
              }}
            >
              {result.emoji}
            </div>
          )}

          {/* Title */}
          <h2
            style={{
              fontSize: isLongTitle ? "20px" : "26px",
              fontWeight: "900",
              color: "#ffffff",
              lineHeight: "1.2",
              marginBottom: isDog ? "4px" : "14px",
              letterSpacing: "-0.5px",
              textShadow: "0 2px 10px rgba(0,0,0,0.18)",
              wordBreak: "keep-all",
              maxWidth: "290px",
            }}
          >
            {title}
          </h2>

          {/* MBTI type code (dog only) */}
          {isDog && (
            <div
              style={{
                fontSize: "16px",
                fontWeight: "800",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}
            >
              ({result.key.toUpperCase()})
            </div>
          )}

          {/* Accent line */}
          <div
            style={{
              width: "36px",
              height: "2.5px",
              background: "rgba(255,255,255,0.28)",
              borderRadius: "100px",
              marginBottom: "14px",
            }}
          />

          {/* Summary */}
          <p
            style={{
              fontSize: isLongSummary ? "12px" : "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.72)",
              lineHeight: "1.6",
              maxWidth: "270px",
              wordBreak: "keep-all",
            }}
          >
            "{summary}"
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "13px",
          }}
        >
          <span
            style={{
              fontSize: "10.5px",
              color: "rgba(255,255,255,0.72)",
              fontWeight: "600",
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t("pet.appName")}
          </span>
        </div>
      </div>
    </div>
  );
}

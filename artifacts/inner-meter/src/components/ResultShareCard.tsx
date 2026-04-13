/**
 * ResultShareCard
 * ─────────────────────────────────────────────────────────────
 * A visually premium, category-aware share card rendered as a real
 * DOM node so that html-to-image can capture it as a PNG.
 *
 * Card size: 360 × 480 px on-screen.
 * Export: same node, pixelRatio=3 → 1080 × 1440 px output.
 *
 * All critical styles are inline so html-to-image can resolve them
 * even when Tailwind's CSS-variable tokens aren't available in the
 * captured snapshot.
 */

import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import type { Test, TestResult } from "@/data/tests";
import { RESULT_EMOJIS } from "@/data/tests";

const CATEGORY_TAGLINE_KEY: Record<string, string> = {
  '연애 테스트': 'love',
  '성격 테스트': 'personality',
  'MBTI':        'mbti',
  '심리 테스트': 'psychology',
  '재미 테스트': 'fun',
  '운세':        'fortune',
  '타로':        'tarot',
};

/* ── design tokens per category ──────────────────────────────────── */

interface CardTheme {
  bg: string;           // CSS gradient string
  accentRgb: string;    // for tinting glows
  badgeBg: string;
  badgeBorder: string;
  tagline: string;
  textColor: string;
  mutedColor: string;
  dividerColor: string;
  footerBorder: string;
}

const THEMES: Record<string, CardTheme> = {
  '연애 테스트': {
    bg: 'linear-gradient(150deg, #f43f5e 0%, #e879a0 42%, #c026d3 100%)',
    accentRgb: '244,63,94',
    badgeBg: 'rgba(255,255,255,0.18)',
    badgeBorder: 'rgba(255,255,255,0.30)',
    tagline: '연애 유형 분석',
    textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.72)',
    dividerColor: 'rgba(255,255,255,0.28)',
    footerBorder: 'rgba(255,255,255,0.15)',
  },
  '성격 테스트': {
    bg: 'linear-gradient(150deg, #3730a3 0%, #7c3aed 55%, #6d28d9 100%)',
    accentRgb: '124,58,237',
    badgeBg: 'rgba(255,255,255,0.15)',
    badgeBorder: 'rgba(255,255,255,0.25)',
    tagline: '성격 유형 분석',
    textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.70)',
    dividerColor: 'rgba(255,255,255,0.25)',
    footerBorder: 'rgba(255,255,255,0.13)',
  },
  'MBTI': {
    bg: 'linear-gradient(150deg, #0f0c29 0%, #1e1b4b 50%, #312e81 100%)',
    accentRgb: '139,92,246',
    badgeBg: 'rgba(139,92,246,0.28)',
    badgeBorder: 'rgba(167,139,250,0.35)',
    tagline: 'MBTI 유형',
    textColor: '#ffffff',
    mutedColor: 'rgba(196,181,253,0.82)',
    dividerColor: 'rgba(167,139,250,0.35)',
    footerBorder: 'rgba(139,92,246,0.25)',
  },
  '심리 테스트': {
    bg: 'linear-gradient(150deg, #0c4a6e 0%, #0369a1 48%, #0891b2 100%)',
    accentRgb: '8,145,178',
    badgeBg: 'rgba(255,255,255,0.16)',
    badgeBorder: 'rgba(255,255,255,0.26)',
    tagline: '심리 유형 분석',
    textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.70)',
    dividerColor: 'rgba(255,255,255,0.25)',
    footerBorder: 'rgba(255,255,255,0.13)',
  },
  '재미 테스트': {
    bg: 'linear-gradient(150deg, #d97706 0%, #f97316 45%, #ef4444 100%)',
    accentRgb: '249,115,22',
    badgeBg: 'rgba(255,255,255,0.22)',
    badgeBorder: 'rgba(255,255,255,0.35)',
    tagline: '재미 분석',
    textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.75)',
    dividerColor: 'rgba(255,255,255,0.30)',
    footerBorder: 'rgba(255,255,255,0.18)',
  },
  '운세': {
    bg: 'linear-gradient(150deg, #78350f 0%, #b45309 45%, #d97706 100%)',
    accentRgb: '180,83,9',
    badgeBg: 'rgba(255,255,255,0.20)',
    badgeBorder: 'rgba(255,255,255,0.32)',
    tagline: '운세 분석',
    textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.78)',
    dividerColor: 'rgba(255,255,255,0.28)',
    footerBorder: 'rgba(255,255,255,0.16)',
  },
  '타로': {
    bg: 'linear-gradient(150deg, #1e0533 0%, #2d1b69 50%, #1a0d3a 100%)',
    accentRgb: '139,92,246',
    badgeBg: 'rgba(139,92,246,0.25)',
    badgeBorder: 'rgba(196,181,253,0.30)',
    tagline: '타로 · 오늘의 운세',
    textColor: '#ffffff',
    mutedColor: 'rgba(216,180,254,0.78)',
    dividerColor: 'rgba(196,181,253,0.30)',
    footerBorder: 'rgba(139,92,246,0.22)',
  },
};

const DEFAULT_THEME: CardTheme = THEMES['성격 테스트'];

function getTheme(category: string): CardTheme {
  return THEMES[category] ?? DEFAULT_THEME;
}

/* ── card component ───────────────────────────────────────────────── */

export interface ResultShareCardProps {
  test: Test;
  result: TestResult;
  localTitle?: string;
  localSummary?: string;
  localTestTitle?: string;
  characterSrc?: string;
}

export const ResultShareCard = forwardRef<HTMLDivElement, ResultShareCardProps>(
  ({ test, result, localTitle, localSummary, localTestTitle, characterSrc }, ref) => {
    const { t } = useTranslation();
    const theme = getTheme(test.category);
    const displayTitle = localTitle ?? result.title;
    const displaySummary = localSummary ?? result.summary;
    const displayTestTitle = localTestTitle ?? test.title;
    const taglineKey = CATEGORY_TAGLINE_KEY[test.category] ?? 'personality';
    const displayTagline = t(`result.cardTagline.${taglineKey}`);
    const isLongTitle = displayTitle.length > 14;
    const isLongSummary = displaySummary.length > 36;

    return (
      <div
        ref={ref}
        style={{
          width: '360px',
          height: '480px',
          background: theme.bg,
          borderRadius: '28px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Inter', -apple-system, 'Malgun Gothic', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* ── decorative layer ── */}
        <Decoration category={test.category} resultKey={result.key} />

        {/* ── ambient glows ── */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        {/* ── content ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', height: '100%',
          padding: '26px 26px 22px',
        }}>

          {/* header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', gap: '8px' }}>
            {/* brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '7px',
                background: 'rgba(255,255,255,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: '#fff', flexShrink: 0,
              }}>✦</div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: theme.textColor, letterSpacing: '-0.2px', whiteSpace: 'nowrap' }}>
                MyTestType
              </span>
            </div>
            {/* category pill */}
            <div style={{
              padding: '4px 10px', borderRadius: '100px',
              background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`,
              fontSize: '10px', fontWeight: '700', color: theme.textColor,
              letterSpacing: '0.3px', whiteSpace: 'nowrap', flexShrink: 0,
            }}>{displayTagline}</div>
          </div>

          {/* main content */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            padding: '0 8px',
          }}>
            {/* character image (MBTI) or emoji */}
            {characterSrc ? (
              <img
                src={characterSrc}
                alt={result.key}
                crossOrigin="anonymous"
                style={{
                  width: '130px',
                  height: '130px',
                  objectFit: 'contain',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.30))',
                }}
              />
            ) : (
              <div style={{
                fontSize: '68px', lineHeight: '1', marginBottom: '20px',
                filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.30))',
              }}>{RESULT_EMOJIS[result.key] ?? test.emoji}</div>
            )}

            {/* result title */}
            <h2 style={{
              fontSize: isLongTitle ? '20px' : '26px',
              fontWeight: '900',
              color: theme.textColor,
              lineHeight: '1.2',
              marginBottom: '14px',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 10px rgba(0,0,0,0.18)',
              wordBreak: 'keep-all',
              maxWidth: '290px',
            }}>{displayTitle}</h2>

            {/* accent line */}
            <div style={{
              width: '36px', height: '2.5px',
              background: theme.dividerColor,
              borderRadius: '100px', marginBottom: '14px',
            }} />

            {/* summary */}
            <p style={{
              fontSize: isLongSummary ? '12px' : '13px',
              fontWeight: '600',
              color: theme.mutedColor,
              lineHeight: '1.6',
              maxWidth: '270px',
              wordBreak: 'keep-all',
            }}>"{displaySummary}"</p>
          </div>

          {/* footer */}
          <div style={{
            borderTop: `1px solid ${theme.footerBorder}`,
            paddingTop: '13px',
          }}>
            <span style={{
              fontSize: '10.5px', color: theme.mutedColor, fontWeight: '600',
              display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {displayTestTitle}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ResultShareCard.displayName = 'ResultShareCard';

/* ── per-category decorative SVGs ─────────────────────────────────── */

function Decoration({ category, resultKey }: { category: string; resultKey: string }) {
  switch (category) {
    case '연애 테스트': return <LoveDecor />;
    case '성격 테스트': return <PersonalityDecor />;
    case 'MBTI':        return <MBTIDecor resultKey={resultKey} />;
    case '심리 테스트': return <PsychDecor />;
    case '재미 테스트': return <FunDecor />;
    case '타로':        return <TarotDecor />;
    default:            return <PersonalityDecor />;
  }
}

function LoveDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 360 480" fill="none"
    >
      {/* large bokeh circles */}
      <circle cx="290" cy="60" r="70" fill="rgba(255,255,255,0.05)" />
      <circle cx="60" cy="420" r="90" fill="rgba(255,255,255,0.04)" />
      {/* scattered small hearts (path) */}
      <HeartPath x={48} y={44} size={22} opacity={0.10} />
      <HeartPath x={308} y={110} size={18} opacity={0.08} />
      <HeartPath x={32} y={370} size={14} opacity={0.07} />
      <HeartPath x={320} y={390} size={12} opacity={0.09} />
      <HeartPath x={170} y={26} size={10} opacity={0.07} />
      {/* diagonal scatter dots */}
      {[[100,30],[240,50],[50,160],[320,220],[280,430],[120,460]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill="rgba(255,255,255,0.12)" />
      ))}
    </svg>
  );
}

function HeartPath({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
  const s = size / 24;
  return (
    <path
      transform={`translate(${x - size / 2}, ${y - size / 2}) scale(${s})`}
      d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
      fill={`rgba(255,255,255,${opacity})`}
    />
  );
}

function PersonalityDecor() {
  const nodes = [
    [40,60],[140,90],[90,190],[210,70],[295,45],[325,155],[265,215],[195,310],
    [75,350],[315,390],[155,430],[335,455],
  ] as [number, number][];
  const edges = [[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[6,9],[9,10]];
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 360 480" fill="none"
    >
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="rgba(255,255,255,0.09)" strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3 : 1.8}
          fill={`rgba(255,255,255,${i % 4 === 0 ? 0.22 : 0.10})`}
        />
      ))}
      <circle cx="290" cy="55" r="55" fill="rgba(255,255,255,0.04)" />
      <circle cx="55" cy="430" r="65" fill="rgba(255,255,255,0.03)" />
    </svg>
  );
}

function MBTIDecor({ resultKey }: { resultKey: string }) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 360 480" fill="none"
    >
      {/* Faded big type code */}
      <text x="50%" y="58%" textAnchor="middle" fontSize="180" fontWeight="900"
        fill="rgba(255,255,255,0.035)" fontFamily="Inter, sans-serif" letterSpacing="-10"
      >{resultKey}</text>
      {/* Hexagon grid – top 3 rows */}
      {([0,1,2] as number[]).flatMap(row =>
        ([0,1,2] as number[]).map(col => {
          const cx = 32 + col * 98 + (row % 2) * 49;
          const cy = 48 + row * 84;
          const r = 28;
          const pts = Array.from({length:6},(_,i)=>{
            const a = Math.PI/180*(60*i-30);
            return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
          }).join(' ');
          return <polygon key={`${row}-${col}`} points={pts} stroke="rgba(139,92,246,0.10)" strokeWidth="1" fill="none" />;
        })
      )}
      {/* Subtle scatter dots */}
      {[[30,400],[340,370],[170,450],[310,430]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="rgba(139,92,246,0.15)" />
      ))}
    </svg>
  );
}

function PsychDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 360 480" fill="none"
    >
      {/* Wave paths */}
      {[0,1,2,3].map(i => {
        const y = 100 + i * 52;
        const amp = 20 - i * 3;
        return (
          <path key={i}
            d={`M0 ${y} Q90 ${y - amp} 180 ${y} Q270 ${y + amp} 360 ${y}`}
            stroke={`rgba(255,255,255,${0.07 - i * 0.01})`} strokeWidth="1.5" fill="none"
          />
        );
      })}
      <circle cx="310" cy="72" r="65" fill="rgba(255,255,255,0.05)" />
      <circle cx="50" cy="420" r="80" fill="rgba(255,255,255,0.04)" />
      {/* dots */}
      {[[40,55],[330,180],[20,280],[310,380],[180,460]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill="rgba(255,255,255,0.12)" />
      ))}
    </svg>
  );
}

function FunDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 360 480" fill="none"
    >
      {/* confetti ovals */}
      {[
        [35,55,7,4,15],  [320,75,5,3,-20],  [55,420,8,5,10],
        [295,400,6,4,-15],[175,32,4,3,5],   [340,250,5,3,20],
        [18,210,6,4,-10], [250,455,7,4,12],
      ].map(([x,y,rx,ry,rot],i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry}
          fill={`rgba(255,255,255,${0.08 + i * 0.01})`}
          transform={`rotate(${rot} ${x} ${y})`}
        />
      ))}
      {/* star burst */}
      {[[60,80,14],[310,400,12],[190,460,10]].map(([x,y,r],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          {[0,45,90,135].map(a => {
            const rad = a * Math.PI / 180;
            return (
              <line key={a}
                x1={-r * Math.cos(rad)} y1={-r * Math.sin(rad)}
                x2={r * Math.cos(rad)} y2={r * Math.sin(rad)}
                stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"
              />
            );
          })}
        </g>
      ))}
      <circle cx="300" cy="60" r="55" fill="rgba(255,255,255,0.05)" />
      <circle cx="60" cy="420" r="70" fill="rgba(255,255,255,0.04)" />
    </svg>
  );
}

function TarotDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 360 480" fill="none"
    >
      {/* Stars */}
      {[
        [40,60,3.5],[315,50,2.5],[280,148,2],[62,195,2.5],[325,298,3],[80,398,2],
        [177,442,2.5],[262,418,2],[140,30,2],[220,460,1.8],[350,200,2],[20,350,1.8],
      ].map(([x,y,r],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={`rgba(196,181,253,${0.12 + (i % 4) * 0.04})`} />
      ))}
      {/* Crescent moon */}
      <path
        d="M310 95 A42 42 0 1 1 280 60 A30 30 0 1 0 310 95Z"
        fill="rgba(196,181,253,0.08)"
      />
      {/* Cross sparkles */}
      {[[55,430,8],[330,380,6]].map(([x,y,r],i) => (
        <g key={i}>
          <line x1={x} y1={y-r} x2={x} y2={y+r} stroke="rgba(196,181,253,0.15)" strokeWidth="1" />
          <line x1={x-r} y1={y} x2={x+r} y2={y} stroke="rgba(196,181,253,0.15)" strokeWidth="1" />
        </g>
      ))}
      {/* Outer glow circles */}
      <circle cx="180" cy="240" r="140" stroke="rgba(139,92,246,0.07)" strokeWidth="1" fill="none" />
      <circle cx="180" cy="240" r="170" stroke="rgba(139,92,246,0.04)" strokeWidth="1" fill="none" />
    </svg>
  );
}

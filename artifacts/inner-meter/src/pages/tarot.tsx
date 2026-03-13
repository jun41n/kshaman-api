import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { tarotCards } from "@/data/tarot";
import type { TarotCard } from "@/data/tarot";
import { Button } from "@/components/ui/button";
import { Heart, Briefcase, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackTarotDraw } from "@/lib/analytics";

const ROMAN: Record<number, string> = {
  1: 'XIX', 2: 'XVIII', 3: 'XVII', 4: 'VI',
  5: 'VIII', 6: 'X', 7: 'I', 8: 'IV', 9: 'XXI', 10: '0',
};

const STARS = [
  { top: '7%', left: '4%', size: '5px', opacity: 0.55, delay: 0 },
  { top: '13%', left: '89%', size: '3px', opacity: 0.40, delay: 0.6 },
  { top: '28%', left: '93%', size: '6px', opacity: 0.50, delay: 1.1 },
  { top: '50%', left: '2%', size: '4px', opacity: 0.45, delay: 0.4 },
  { top: '68%', left: '91%', size: '5px', opacity: 0.40, delay: 1.4 },
  { top: '82%', left: '6%', size: '4px', opacity: 0.35, delay: 0.2 },
  { top: '19%', left: '52%', size: '3px', opacity: 0.30, delay: 0.9 },
  { top: '88%', left: '58%', size: '3px', opacity: 0.30, delay: 0.1 },
  { top: '4%', left: '33%', size: '4px', opacity: 0.40, delay: 1.2 },
  { top: '44%', left: '97%', size: '3px', opacity: 0.35, delay: 0.7 },
];

/* ─── SVG Illustrations ──────────────────────────────────────── */

function SunArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="sg1" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff9c4"/>
          <stop offset="100%" stopColor="#ffe082"/>
        </radialGradient>
      </defs>
      <rect width="180" height="200" fill="url(#sg1)"/>
      {/* ground */}
      <rect x="0" y="170" width="180" height="30" fill="#c8a96e" opacity="0.6"/>
      <rect x="0" y="158" width="180" height="14" fill="#a1887f" opacity="0.4"/>
      {/* wall */}
      <rect x="20" y="128" width="140" height="40" fill="#d4a96a" rx="1"/>
      {/* brick lines */}
      {[135,143,151].map(y => <line key={y} x1="20" y1={y} x2="160" y2={y} stroke="#c8a96e" strokeWidth="0.5"/>)}
      {[20,40,60,80,100,120,140,160].map(x => <line key={x} x1={x} y1="128" x2={x} y2="168" stroke="#c8a96e" strokeWidth="0.5"/>)}
      {/* sunflowers */}
      {[[-6, 130, 155], [6, 154, 148]].map(([flip, px, py], i) => (
        <g key={i}>
          <rect x={px - 2} y={py - 20} width="4" height="25" fill="#388e3c"/>
          <circle cx={px} cy={py - 22} r="10" fill="#fdd835" stroke="#f57f17" strokeWidth="1"/>
          <circle cx={px} cy={py - 22} r="4" fill="#5d4037"/>
        </g>
      ))}
      {/* rays: 12 alternating */}
      {Array.from({length: 12}, (_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const inner = 34, outer = i % 2 === 0 ? 52 : 47;
        return <line key={i}
          x1={90 + Math.cos(angle) * inner} y1={72 + Math.sin(angle) * inner}
          x2={90 + Math.cos(angle) * outer} y2={72 + Math.sin(angle) * outer}
          stroke="#f57f17" strokeWidth={i % 2 === 0 ? 3 : 2} strokeLinecap="round"/>;
      })}
      {/* sun circle */}
      <circle cx="90" cy="72" r="28" fill="#fdd835" stroke="#f57f17" strokeWidth="1.5"/>
      {/* sun face */}
      <ellipse cx="83" cy="67" rx="2.5" ry="3.5" fill="#e65100"/>
      <ellipse cx="97" cy="67" rx="2.5" ry="3.5" fill="#e65100"/>
      <path d="M84 75 Q90 82 96 75" stroke="#e65100" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* nose */}
      <path d="M88 71 L87 74 L93 74" stroke="#e65100" strokeWidth="1" fill="none"/>
      {/* eyebrows */}
      <path d="M81 63 Q83.5 61 86 63" stroke="#e65100" strokeWidth="1.5" fill="none"/>
      <path d="M94 63 Q96.5 61 99 63" stroke="#e65100" strokeWidth="1.5" fill="none"/>
      {/* children */}
      <circle cx="65" cy="126" r="6" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M59 132 Q65 148 71 132" fill="#e53935"/>
      <line x1="59" y1="135" x2="53" y2="144" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="71" y1="135" x2="77" y2="144" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="115" cy="126" r="6" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M109 132 Q115 148 121 132" fill="#7b1fa2"/>
      <line x1="109" y1="135" x2="103" y2="144" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="121" y1="135" x2="127" y2="144" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function MoonArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0635"/>
          <stop offset="100%" stopColor="#1a237e"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#mg1)"/>
      {/* water pool at bottom */}
      <ellipse cx="90" cy="188" rx="80" ry="18" fill="#1565c0" opacity="0.6"/>
      <ellipse cx="90" cy="185" rx="70" ry="10" fill="#1e88e5" opacity="0.4"/>
      {/* towers */}
      <rect x="15" y="85" width="28" height="90" fill="#546e7a" rx="2"/>
      <rect x="13" y="80" width="32" height="12" fill="#607d8b" rx="1"/>
      <rect x="18" y="68" width="6" height="14" fill="#607d8b"/>
      <rect x="27" y="68" width="6" height="14" fill="#607d8b"/>
      <rect x="137" y="85" width="28" height="90" fill="#546e7a" rx="2"/>
      <rect x="135" y="80" width="32" height="12" fill="#607d8b" rx="1"/>
      <rect x="140" y="68" width="6" height="14" fill="#607d8b"/>
      <rect x="149" y="68" width="6" height="14" fill="#607d8b"/>
      {/* tower windows */}
      <rect x="24" y="95" width="8" height="12" fill="#0d0635" rx="1"/>
      <rect x="24" y="115" width="8" height="12" fill="#0d0635" rx="1"/>
      <rect x="148" y="95" width="8" height="12" fill="#0d0635" rx="1"/>
      <rect x="148" y="115" width="8" height="12" fill="#0d0635" rx="1"/>
      {/* path */}
      <path d="M55 200 Q90 170 125 200" fill="#4a148c" opacity="0.5"/>
      <path d="M62 200 Q90 175 118 200" fill="#9c27b0" opacity="0.15"/>
      {/* moon */}
      <circle cx="90" cy="40" r="28" fill="#b0bec5" stroke="#eceff1" strokeWidth="1"/>
      <circle cx="104" cy="34" r="22" fill="#0d0635"/>
      {/* moon face */}
      <circle cx="78" cy="36" r="2.5" fill="#90a4ae"/>
      <path d="M72 44 Q78 49 84 44" stroke="#90a4ae" strokeWidth="1.5" fill="none"/>
      {/* small stars */}
      {[[30,18],[150,22],[160,55],[20,60],[90,15]].map(([x,y],i) => (
        <g key={i}>
          <polygon points={`${x},${y-4} ${x+1.2},${y-1.2} ${x+4},${y-1.2} ${x+2},${y+1} ${x+2.5},${y+4} ${x},${y+2} ${x-2.5},${y+4} ${x-2},${y+1} ${x-4},${y-1.2} ${x-1.2},${y-1.2}`} fill="#ffe082" opacity="0.9"/>
        </g>
      ))}
      {/* dog (left, loyal) */}
      <ellipse cx="52" cy="152" rx="14" ry="8" fill="#8d6e63"/>
      <circle cx="38" cy="148" r="7" fill="#8d6e63"/>
      <ellipse cx="34" cy="144" rx="3" ry="5" fill="#8d6e63"/>
      <line x1="66" y1="152" x2="72" y2="145" stroke="#8d6e63" strokeWidth="3" strokeLinecap="round"/>
      {/* wolf (right, wild) */}
      <ellipse cx="128" cy="152" rx="14" ry="8" fill="#546e7a"/>
      <circle cx="142" cy="147" r="8" fill="#546e7a"/>
      <ellipse cx="147" cy="142" rx="4" ry="6" fill="#546e7a"/>
      <line x1="114" y1="152" x2="108" y2="145" stroke="#546e7a" strokeWidth="3" strokeLinecap="round"/>
      {/* crawfish in water */}
      <ellipse cx="90" cy="180" rx="6" ry="3" fill="#e53935" opacity="0.8"/>
    </svg>
  );
}

function StarArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="stg1" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#1a237e"/>
          <stop offset="60%" stopColor="#283593"/>
          <stop offset="100%" stopColor="#1565c0"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#stg1)"/>
      {/* water pool */}
      <ellipse cx="130" cy="185" rx="45" ry="18" fill="#1e88e5" opacity="0.5"/>
      <ellipse cx="130" cy="188" rx="40" ry="12" fill="#42a5f5" opacity="0.3"/>
      {/* land */}
      <path d="M0 160 Q60 145 110 160 Q140 168 180 155 L180 200 L0 200Z" fill="#2e7d32" opacity="0.5"/>
      {/* small stars */}
      {[[35,30],[155,25],[165,60],[20,65],[50,55],[160,95]].map(([x,y],i) => (
        <polygon key={i}
          points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2.5},${y+1} ${x+3},${y+5} ${x},${y+2.5} ${x-3},${y+5} ${x-2.5},${y+1} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`}
          fill="#ffe082" opacity="0.75"/>
      ))}
      {/* large 8-pointed star */}
      {Array.from({length:8}, (_,i) => {
        const a1 = (i*45 - 90) * Math.PI/180;
        const a2 = (i*45 - 90 + 22.5) * Math.PI/180;
        return <polygon key={i}
          points={`90,30 ${90+Math.cos(a1)*32},${30+Math.sin(a1)*32} ${90+Math.cos(a2)*14},${30+Math.sin(a2)*14}`}
          fill="#ffd600" stroke="#f57f17" strokeWidth="0.5"/>;
      })}
      <circle cx="90" cy="30" r="10" fill="#ffd600"/>
      {/* kneeling woman */}
      <circle cx="60" cy="140" r="7" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M54 147 Q60 175 66 147" fill="#9c27b0"/>
      {/* arms pouring water */}
      <line x1="54" y1="152" x2="38" y2="140" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="66" y1="152" x2="85" y2="145" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      {/* water streams */}
      <path d="M38 140 Q28 155 35 170" stroke="#64b5f6" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M38 140 Q22 158 30 175" stroke="#64b5f6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M85 145 Q95 155 90 168" stroke="#64b5f6" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* foot */}
      <ellipse cx="62" cy="176" rx="8" ry="5" fill="#9c27b0" opacity="0.7"/>
      {/* tree */}
      <rect x="148" y="120" width="5" height="55" fill="#5d4037"/>
      <ellipse cx="150" cy="110" rx="18" ry="22" fill="#2e7d32"/>
      <ellipse cx="140" cy="118" rx="12" ry="16" fill="#388e3c"/>
      {/* bird on tree */}
      <ellipse cx="155" cy="98" rx="5" ry="3" fill="#212121"/>
      <ellipse cx="159" cy="96" rx="2" ry="1.5" fill="#212121"/>
    </svg>
  );
}

function LoversArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1565c0"/>
          <stop offset="50%" stopColor="#e3f2fd"/>
          <stop offset="100%" stopColor="#66bb6a"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#lg1)"/>
      {/* ground / garden */}
      <rect x="0" y="155" width="180" height="45" fill="#388e3c" opacity="0.7"/>
      {/* mountains */}
      <polygon points="0,155 30,90 60,155" fill="#78909c"/>
      <polygon points="120,155 155,85 180,155" fill="#90a4ae"/>
      <polygon points="60,155 90,105 120,155" fill="#607d8b"/>
      {/* sun */}
      <circle cx="90" cy="25" r="20" fill="#fdd835" stroke="#f9a825" strokeWidth="1.5"/>
      {Array.from({length:10}, (_,i) => {
        const a = (i*36-90)*Math.PI/180;
        return <line key={i} x1={90+Math.cos(a)*22} y1={25+Math.sin(a)*22} x2={90+Math.cos(a)*30} y2={25+Math.sin(a)*30} stroke="#f9a825" strokeWidth="2" strokeLinecap="round"/>;
      })}
      {/* angel / raphael */}
      <circle cx="90" cy="60" r="9" fill="#fff8e1" stroke="#fdd835" strokeWidth="1"/>
      <ellipse cx="90" cy="62" rx="6" ry="7" fill="#fff8e1"/>
      {/* angel wings */}
      <path d="M80 62 Q65 52 68 68 Q75 65 80 68Z" fill="#fff8e1" stroke="#fdd835" strokeWidth="0.8"/>
      <path d="M100 62 Q115 52 112 68 Q105 65 100 68Z" fill="#fff8e1" stroke="#fdd835" strokeWidth="0.8"/>
      {/* angel arms raised */}
      <line x1="83" y1="69" x2="70" y2="80" stroke="#ffccbc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="97" y1="69" x2="110" y2="80" stroke="#ffccbc" strokeWidth="2" strokeLinecap="round"/>
      {/* man (left) */}
      <circle cx="60" cy="130" r="7" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M53 137 Q60 162 67 137" fill="#e53935"/>
      <line x1="53" y1="142" x2="45" y2="153" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="67" y1="142" x2="75" y2="153" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      {/* woman (right) */}
      <circle cx="120" cy="128" r="7" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M112 136 Q120 162 128 136" fill="#e91e63"/>
      <line x1="112" y1="141" x2="104" y2="152" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="128" y1="141" x2="136" y2="152" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      {/* woman's hair */}
      <path d="M113 128 Q120 118 127 128" stroke="#8d6e63" strokeWidth="3" fill="none"/>
      {/* apple tree (woman's side) */}
      <rect x="140" y="120" width="4" height="45" fill="#5d4037"/>
      <ellipse cx="142" cy="110" rx="15" ry="18" fill="#388e3c"/>
      <circle cx="144" cy="108" r="4" fill="#e53935"/>
      <circle cx="136" cy="115" r="3" fill="#e53935"/>
      {/* serpent on tree */}
      <path d="M145 115 Q152 110 148 120 Q155 118 150 128" stroke="#8bc34a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* flames (man's side) */}
      <path d="M35 150 Q33 135 40 140 Q38 125 45 135 Q43 120 50 130 Q50 145 42 155Z" fill="#f44336" opacity="0.8"/>
    </svg>
  );
}

function StrengthArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9a825"/>
          <stop offset="100%" stopColor="#ffe082"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#sg2)"/>
      {/* mountains */}
      <polygon points="0,180 35,120 70,180" fill="#bcaaa4" opacity="0.6"/>
      <polygon points="110,180 145,110 180,180" fill="#a1887f" opacity="0.5"/>
      {/* infinity symbol */}
      <path d="M65 30 Q65 20 75 20 Q90 20 90 30 Q90 20 105 20 Q115 20 115 30 Q115 40 105 40 Q90 40 90 30 Q90 40 75 40 Q65 40 65 30Z"
        fill="none" stroke="#e65100" strokeWidth="2.5"/>
      {/* woman */}
      <circle cx="90" cy="75" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      {/* white robe */}
      <path d="M82 83 Q90 115 98 83" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
      {/* flower garland / hair */}
      <path d="M82 75 Q90 65 98 75" stroke="#e91e63" strokeWidth="3" fill="none"/>
      <circle cx="84" cy="73" r="3" fill="#e91e63" opacity="0.6"/>
      <circle cx="90" cy="68" r="3" fill="#f48fb1" opacity="0.7"/>
      <circle cx="96" cy="73" r="3" fill="#e91e63" opacity="0.6"/>
      {/* lion */}
      <ellipse cx="90" cy="148" rx="40" ry="20" fill="#f9a825" stroke="#e65100" strokeWidth="1"/>
      <circle cx="58" cy="138" r="18" fill="#f9a825" stroke="#e65100" strokeWidth="1"/>
      {/* mane */}
      {Array.from({length: 10}, (_, i) => {
        const a = (i * 36) * Math.PI / 180;
        return <line key={i} x1={58+Math.cos(a)*18} y1={138+Math.sin(a)*18} x2={58+Math.cos(a)*26} y2={138+Math.sin(a)*26} stroke="#e65100" strokeWidth="2.5" strokeLinecap="round"/>;
      })}
      {/* lion face */}
      <circle cx="55" cy="135" r="3" fill="#212121"/>
      <circle cx="63" cy="135" r="3" fill="#212121"/>
      <path d="M55 143 Q59 148 63 143" stroke="#212121" strokeWidth="1.5" fill="none"/>
      {/* lion mouth - open */}
      <path d="M52 142 Q59 150 66 142" fill="#e53935" opacity="0.6"/>
      <path d="M53 141 Q59 148 65 141" stroke="#e65100" strokeWidth="1" fill="none"/>
      {/* tail */}
      <path d="M130 148 Q148 140 152 155 Q156 165 145 162" stroke="#e65100" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* woman's hands on lion's mouth */}
      <ellipse cx="72" cy="140" rx="5" ry="3" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      {/* flowers at bottom */}
      {[25,50,130,155].map((x,i) => (
        <g key={i}>
          <rect x={x-1.5} y="175" width="3" height="20" fill="#388e3c"/>
          <circle cx={x} cy="173" r="5" fill={i%2===0?'#e91e63':'#f06292'}/>
        </g>
      ))}
    </svg>
  );
}

function WheelArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="wg1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a237e"/>
          <stop offset="100%" stopColor="#0d0335"/>
        </radialGradient>
      </defs>
      <rect width="180" height="200" fill="url(#wg1)"/>
      {/* clouds at corners */}
      {[[15,25,20],[165,25,20],[15,175,18],[165,175,18]].map(([cx,cy,r],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#546e7a" opacity="0.5"/>
          <circle cx={cx+14} cy={cy} r={r-3} fill="#546e7a" opacity="0.5"/>
          <circle cx={cx+7} cy={cy-10} r={r-4} fill="#607d8b" opacity="0.5"/>
        </g>
      ))}
      {/* corner creatures (simplified) */}
      {/* angel top-left */}
      <ellipse cx="22" cy="22" rx="14" ry="18" fill="#b0bec5" opacity="0.6"/>
      <circle cx="22" cy="15" r="6" fill="#eceff1"/>
      {/* lion bottom-left */}
      <ellipse cx="22" cy="178" rx="14" ry="12" fill="#f9a825" opacity="0.6"/>
      <circle cx="15" cy="172" r="7" fill="#f9a825" opacity="0.7"/>
      {/* eagle top-right */}
      <ellipse cx="158" cy="22" rx="14" ry="18" fill="#546e7a" opacity="0.6"/>
      <circle cx="158" cy="15" r="5" fill="#78909c"/>
      {/* bull bottom-right */}
      <ellipse cx="158" cy="178" rx="16" ry="12" fill="#8d6e63" opacity="0.6"/>
      <ellipse cx="158" cy="170" rx="10" ry="8" fill="#a1887f" opacity="0.7"/>
      {/* outer wheel ring */}
      <circle cx="90" cy="100" r="62" fill="none" stroke="#b8860b" strokeWidth="3"/>
      <circle cx="90" cy="100" r="55" fill="none" stroke="#b8860b" strokeWidth="1"/>
      {/* spokes: 8 */}
      {Array.from({length:8}, (_,i) => {
        const a = (i*45)*Math.PI/180;
        return <line key={i} x1={90+Math.cos(a)*15} y1={100+Math.sin(a)*15} x2={90+Math.cos(a)*53} y2={100+Math.sin(a)*53} stroke="#b8860b" strokeWidth="2"/>;
      })}
      {/* inner ring */}
      <circle cx="90" cy="100" r="15" fill="#b8860b" opacity="0.3"/>
      <circle cx="90" cy="100" r="8" fill="#b8860b"/>
      {/* TARO letters on wheel (4 cardinal positions) */}
      <text x="90" y="58" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">T</text>
      <text x="132" y="104" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">A</text>
      <text x="90" y="152" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">R</text>
      <text x="48" y="104" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">O</text>
      {/* serpent (right side going down) */}
      <path d="M148 80 Q158 90 155 100 Q152 110 158 122" stroke="#388e3c" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <circle cx="148" cy="77" r="4" fill="#388e3c"/>
      {/* Anubis figure (left side ascending) */}
      <rect x="22" y="88" width="8" height="22" fill="#4e342e"/>
      <circle cx="26" cy="85" r="5" fill="#4e342e"/>
      <path d="M21 95 L14 105 M31 95 L38 105" stroke="#4e342e" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Sphinx on top */}
      <ellipse cx="90" cy="43" rx="18" ry="10" fill="#c8a96e"/>
      <circle cx="75" cy="40" r="8" fill="#c8a96e"/>
      <path d="M67 40 Q65 30 72 33" fill="#c8a96e" stroke="#a1887f" strokeWidth="0.5"/>
    </svg>
  );
}

function MagicianArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="magg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd54f"/>
          <stop offset="100%" stopColor="#fff9c4"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#magg1)"/>
      {/* border of roses and lilies */}
      {[20,40,60,80,100,120,140,160].map((y,i) => (
        <circle key={i} cx={i%2===0?8:172} cy={y} r={4} fill={i%2===0?"#e91e63":"#f06292"} opacity="0.6"/>
      ))}
      {/* infinity symbol */}
      <path d="M65 28 Q65 18 75 18 Q90 18 90 28 Q90 18 105 18 Q115 18 115 28 Q115 38 105 38 Q90 38 90 28 Q90 38 75 38 Q65 38 65 28Z"
        fill="none" stroke="#e65100" strokeWidth="2.5"/>
      {/* wand (pointing up) */}
      <line x1="90" y1="45" x2="90" y2="78" stroke="#5d4037" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="90" cy="42" r="5" fill="#ffd700" stroke="#e65100" strokeWidth="1"/>
      {/* hand holding wand up */}
      <ellipse cx="93" cy="78" rx="6" ry="4" fill="#ffccbc"/>
      {/* magician figure */}
      <circle cx="90" cy="90" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      {/* robe */}
      <path d="M82 98 Q90 140 98 98" fill="#e53935"/>
      {/* white inner robe */}
      <path d="M85 100 Q90 138 95 100" fill="white" opacity="0.5"/>
      {/* belt */}
      <path d="M82 108 Q90 110 98 108" stroke="#ffd700" strokeWidth="2" fill="none"/>
      {/* serpent belt (ouroboros hint) */}
      <circle cx="90" cy="115" r="5" fill="none" stroke="#388e3c" strokeWidth="1.5"/>
      {/* arm pointing down */}
      <line x1="98" y1="105" x2="115" y2="125" stroke="#ffccbc" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="117" cy="127" rx="5" ry="3.5" fill="#ffccbc"/>
      {/* hat */}
      <ellipse cx="90" cy="84" rx="12" ry="4" fill="#b71c1c"/>
      <rect x="84" y="70" width="12" height="15" fill="#b71c1c" rx="2"/>
      {/* table with 4 suit symbols */}
      <rect x="35" y="145" width="110" height="8" fill="#8d6e63" rx="2"/>
      <rect x="45" y="153" width="90" height="5" fill="#6d4c41"/>
      {/* cup */}
      <path d="M52 140 Q56 145 60 140 Q60 135 52 135Z" fill="#42a5f5"/>
      {/* sword */}
      <line x1="80" y1="130" x2="80" y2="145" stroke="#90a4ae" strokeWidth="2"/>
      <line x1="76" y1="135" x2="84" y2="135" stroke="#90a4ae" strokeWidth="1.5"/>
      {/* pentacle */}
      <circle cx="100" cy="137" r="6" fill="none" stroke="#ffd700" strokeWidth="1.5"/>
      <text x="100" y="141" textAnchor="middle" fill="#ffd700" fontSize="8">✦</text>
      {/* wand on table */}
      <line x1="120" y1="130" x2="120" y2="145" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="120" cy="128" r="3" fill="#ffd700"/>
      {/* flowers on ground */}
      {[25,155].map((x,i) => (
        <g key={i}>
          <rect x={x-2} y="165" width="4" height="30" fill="#388e3c"/>
          <circle cx={x} cy="163" r="7" fill={i===0?"#e91e63":"#f48fb1"}/>
        </g>
      ))}
    </svg>
  );
}

function EmperorArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="emg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b71c1c"/>
          <stop offset="100%" stopColor="#ef9a9a"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#emg1)"/>
      {/* mountains */}
      <polygon points="0,200 0,110 50,70 100,100 150,60 180,80 180,200" fill="#78909c" opacity="0.7"/>
      <polygon points="0,200 0,130 45,90 95,120 148,80 180,100 180,200" fill="#90a4ae" opacity="0.5"/>
      {/* throne */}
      <rect x="45" y="65" width="90" height="120" fill="#795548" rx="3"/>
      <rect x="38" y="62" width="104" height="12" fill="#6d4c41" rx="2"/>
      {/* throne back */}
      <rect x="50" y="35" width="80" height="35" fill="#6d4c41" rx="2"/>
      {/* ram heads on throne arms */}
      <circle cx="50" cy="100" r="8" fill="#bcaaa4"/>
      <path d="M42 100 Q40 90 48 92" fill="#bcaaa4"/>
      <circle cx="130" cy="100" r="8" fill="#bcaaa4"/>
      <path d="M138 100 Q140 90 132 92" fill="#bcaaa4"/>
      {/* emperor figure */}
      {/* robe */}
      <path d="M65 105 Q90 165 115 105" fill="#e53935"/>
      {/* armour */}
      <rect x="75" y="85" width="30" height="25" fill="#90a4ae" rx="2"/>
      {/* head */}
      <circle cx="90" cy="78" r="9" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      {/* crown */}
      <rect x="81" y="67" width="18" height="8" fill="#ffd700"/>
      {[83,87,91,95].map((x,i) => (
        <polygon key={i} points={`${x},67 ${x+2},60 ${x+4},67`} fill="#ffd700"/>
      ))}
      {/* beard */}
      <path d="M83 84 Q90 95 97 84" fill="#e0e0e0" opacity="0.9"/>
      {/* scepter/ankh (right hand) */}
      <line x1="112" y1="100" x2="118" y2="140" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="118" cy="98" r="5" fill="#ffd700"/>
      <line x1="113" y1="104" x2="123" y2="104" stroke="#5d4037" strokeWidth="2"/>
      {/* orb (left hand) */}
      <circle cx="68" cy="115" r="8" fill="#ffd700" stroke="#f57f17" strokeWidth="1"/>
      <line x1="68" y1="107" x2="68" y2="102" stroke="#ffd700" strokeWidth="2"/>
      {/* ankh cross on orb */}
      <line x1="64" y1="115" x2="72" y2="115" stroke="#e65100" strokeWidth="1.5"/>
      {/* boots */}
      <ellipse cx="75" cy="180" rx="10" ry="5" fill="#37474f"/>
      <ellipse cx="105" cy="180" rx="10" ry="5" fill="#37474f"/>
    </svg>
  );
}

function WorldArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="wog1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#4a148c"/>
          <stop offset="100%" stopColor="#1a0535"/>
        </radialGradient>
      </defs>
      <rect width="180" height="200" fill="url(#wog1)"/>
      {/* corner creatures */}
      {/* angel (top-left) */}
      <ellipse cx="22" cy="22" rx="13" ry="16" fill="#eceff1" opacity="0.5"/>
      <circle cx="22" cy="15" r="6" fill="#e3f2fd" opacity="0.7"/>
      {/* eagle (top-right) */}
      <ellipse cx="158" cy="22" rx="13" ry="16" fill="#455a64" opacity="0.5"/>
      <polygon points="158,10 152,22 164,22" fill="#546e7a" opacity="0.7"/>
      {/* lion (bottom-left) */}
      <ellipse cx="22" cy="178" rx="14" ry="12" fill="#f57f17" opacity="0.5"/>
      <circle cx="15" cy="172" r="7" fill="#f9a825" opacity="0.6"/>
      {/* bull (bottom-right) */}
      <ellipse cx="158" cy="178" rx="15" ry="12" fill="#795548" opacity="0.5"/>
      <ellipse cx="152" cy="172" rx="9" ry="8" fill="#8d6e63" opacity="0.6"/>
      {/* laurel wreath (oval) */}
      {Array.from({length: 28}, (_, i) => {
        const t = (i / 28) * 2 * Math.PI;
        const rx = 62, ry = 82;
        const x = 90 + rx * Math.cos(t);
        const y = 100 + ry * Math.sin(t);
        const rot = (i / 28) * 360;
        return (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3"
            fill={i%3===0?"#558b2f":"#7cb342"}
            transform={`rotate(${rot + 90},${x},${y})`}
            opacity="0.9"/>
        );
      })}
      {/* dancer figure inside wreath */}
      <circle cx="90" cy="85" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      {/* flowing drape */}
      <path d="M82 93 Q90 130 98 93" fill="#ce93d8"/>
      {/* wands */}
      <line x1="72" y1="85" x2="62" y2="70" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="108" y1="85" x2="118" y2="70" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="62" cy="68" r="4" fill="#ffd700"/>
      <circle cx="118" cy="68" r="4" fill="#ffd700"/>
      {/* legs (dancing pose) */}
      <line x1="86" y1="128" x2="78" y2="148" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="94" y1="128" x2="105" y2="145" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      {/* hair */}
      <path d="M83 85 Q90 75 97 85" stroke="#8d6e63" strokeWidth="3" fill="none"/>
      {/* purple sash */}
      <path d="M82 100 Q75 108 80 118 Q88 110 96 118 Q101 108 98 100" fill="#ab47bc" opacity="0.7"/>
      {/* stars */}
      {[[145,35],[35,40],[155,155],[25,155]].map(([x,y],i) => (
        <polygon key={i} points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2},${y+1} ${x+3},${y+5} ${x},${y+2} ${x-3},${y+5} ${x-2},${y+1} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`}
          fill="#ffe082" opacity="0.7"/>
      ))}
    </svg>
  );
}

function FoolArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="fg1" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#b3e5fc"/>
          <stop offset="60%" stopColor="#e1f5fe"/>
          <stop offset="100%" stopColor="#a5d6a7"/>
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill="url(#fg1)"/>
      {/* sky */}
      <rect x="0" y="0" width="180" height="140" fill="#87ceeb" opacity="0.3"/>
      {/* mountains / cliff */}
      <polygon points="0,200 0,100 60,80 120,60 180,80 180,200" fill="#90a4ae" opacity="0.8"/>
      <polygon points="0,200 0,120 55,100 110,85 180,100 180,200" fill="#b0bec5" opacity="0.6"/>
      {/* cliff edge */}
      <polygon points="70,135 140,110 180,125 180,200 0,200 0,160 40,150" fill="#78909c"/>
      {/* sun */}
      <circle cx="148" cy="28" r="18" fill="#fdd835" stroke="#f9a825" strokeWidth="1.5"/>
      {Array.from({length:10}, (_,i) => {
        const a = (i*36-90)*Math.PI/180;
        return <line key={i} x1={148+Math.cos(a)*20} y1={28+Math.sin(a)*20} x2={148+Math.cos(a)*27} y2={28+Math.sin(a)*27} stroke="#f9a825" strokeWidth="2" strokeLinecap="round"/>;
      })}
      {/* fool figure at cliff edge */}
      <circle cx="95" cy="90" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      {/* colorful patchwork coat */}
      <path d="M87 98 Q95 130 103 98" fill="#e53935"/>
      <path d="M89 98 Q91 120 95 130 Q95 115 99 98" fill="#1e88e5" opacity="0.7"/>
      <path d="M91 98 Q95 118 99 98" fill="#f9a825" opacity="0.6"/>
      {/* hat with feather */}
      <ellipse cx="95" cy="84" rx="10" ry="4" fill="#1565c0"/>
      <rect x="90" y="74" width="10" height="11" fill="#1565c0" rx="2"/>
      <path d="M100 77 Q108 65 105 80" stroke="#e91e63" strokeWidth="1.5" fill="none"/>
      <path d="M100 77 Q112 68 106 82" stroke="#f06292" strokeWidth="1" fill="none" opacity="0.7"/>
      {/* walking stick with bundle */}
      <line x1="105" y1="98" x2="125" y2="65" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="126" cy="62" rx="8" ry="6" fill="#8d6e63" stroke="#6d4c41" strokeWidth="1"/>
      {/* bundle contents */}
      <circle cx="123" cy="60" r="2" fill="#e91e63"/>
      <circle cx="128" cy="60" r="2" fill="#ffd700"/>
      {/* arms */}
      <line x1="87" y1="105" x2="76" y2="118" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="103" y1="103" x2="112" y2="110" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      {/* white dog at feet */}
      <ellipse cx="75" cy="122" rx="10" ry="6" fill="white" stroke="#e0e0e0" strokeWidth="1"/>
      <circle cx="66" cy="119" r="5" fill="white" stroke="#e0e0e0" strokeWidth="1"/>
      <ellipse cx="63" cy="116" rx="2.5" ry="4" fill="white" stroke="#e0e0e0" strokeWidth="0.8"/>
      <circle cx="64" cy="118" r="1.5" fill="#212121"/>
      <path d="M67 122 Q71 126 69 120" stroke="#bdbdbd" strokeWidth="1" fill="none"/>
      {/* flowers at cliff edge */}
      {[55,65,75,85].map((x,i) => (
        <g key={i}>
          <rect x={x} y="128" width="3" height="12" fill="#388e3c"/>
          <circle cx={x+1.5} cy="126" r="4" fill={['#e91e63','#f48fb1','#fce4ec','#e91e63'][i]}/>
        </g>
      ))}
    </svg>
  );
}

function CardIllustration({ id }: { id: number }) {
  switch(id) {
    case 1: return <SunArt />;
    case 2: return <MoonArt />;
    case 3: return <StarArt />;
    case 4: return <LoversArt />;
    case 5: return <StrengthArt />;
    case 6: return <WheelArt />;
    case 7: return <MagicianArt />;
    case 8: return <EmperorArt />;
    case 9: return <WorldArt />;
    case 10: return <FoolArt />;
    default: return <div className="w-full h-full bg-violet-900"/>;
  }
}

/* ─── Tarot Card Back ─────────────────────────────────────────── */
function CardBack({ w = 220, h = 356 }: { w?: number; h?: number }) {
  return (
    <svg viewBox="0 0 220 356" xmlns="http://www.w3.org/2000/svg" style={{ width: w, height: h }}>
      <defs>
        <radialGradient id="cbg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#1a0542"/>
          <stop offset="100%" stopColor="#060118"/>
        </radialGradient>
        <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="0.8" fill="#5b21b6" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="220" height="356" fill="url(#cbg)" rx="12"/>
      <rect width="220" height="356" fill="url(#dots)" rx="12"/>
      {/* outer gold border */}
      <rect x="8" y="8" width="204" height="340" rx="8" fill="none" stroke="#b8860b" strokeWidth="2"/>
      {/* inner border */}
      <rect x="14" y="14" width="192" height="328" rx="6" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.7"/>
      {/* corner ornaments */}
      {[[18,18],[202,18],[18,338],[202,338]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="6" fill="none" stroke="#b8860b" strokeWidth="1.5"/>
          <circle cx={cx} cy={cy} r="2" fill="#b8860b"/>
        </g>
      ))}
      {/* top and bottom decorative lines */}
      {[[18,42,202,42],[18,314,202,314]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8860b" strokeWidth="0.8" opacity="0.6"/>
      ))}
      {/* central mandala */}
      {/* outer petals */}
      {Array.from({length:8}, (_,i) => {
        const a = (i*45)*Math.PI/180;
        const cx = 110 + Math.cos(a)*45;
        const cy = 178 + Math.sin(a)*45;
        return <ellipse key={i} cx={cx} cy={cy} rx="12" ry="7" fill="none" stroke="#b8860b" strokeWidth="1"
          transform={`rotate(${i*45},${cx},${cy})`} opacity="0.7"/>;
      })}
      {/* middle ring */}
      {Array.from({length:8}, (_,i) => {
        const a = (i*45+22.5)*Math.PI/180;
        const cx = 110 + Math.cos(a)*26;
        const cy = 178 + Math.sin(a)*26;
        return <ellipse key={i} cx={cx} cy={cy} rx="8" ry="4.5" fill="none" stroke="#b8860b" strokeWidth="1"
          transform={`rotate(${i*45+22.5},${cx},${cy})`} opacity="0.8"/>;
      })}
      {/* rings */}
      <circle cx="110" cy="178" r="60" fill="none" stroke="#b8860b" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="110" cy="178" r="32" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.6"/>
      <circle cx="110" cy="178" r="16" fill="none" stroke="#b8860b" strokeWidth="1.5" opacity="0.8"/>
      {/* 8-pointed star in center */}
      {Array.from({length:8}, (_,i) => {
        const a = (i*45-90)*Math.PI/180;
        return <line key={i} x1="110" y1="178" x2={110+Math.cos(a)*14} y2={178+Math.sin(a)*14} stroke="#b8860b" strokeWidth="1.5"/>;
      })}
      <circle cx="110" cy="178" r="5" fill="#b8860b"/>
      {/* small star at top center */}
      <text x="110" y="32" textAnchor="middle" fill="#b8860b" fontSize="14" opacity="0.8">✦</text>
      <text x="110" y="348" textAnchor="middle" fill="#b8860b" fontSize="14" opacity="0.8">✦</text>
    </svg>
  );
}

/* ─── Tarot Card Front ────────────────────────────────────────── */
function CardFront({ card, w = 220, h = 356 }: { card: TarotCard; w?: number; h?: number }) {
  const roman = ROMAN[card.id] ?? '';
  return (
    <div style={{ width: w, height: h, position: 'relative', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
      {/* outer frame */}
      <div style={{ position: 'absolute', inset: 0, background: '#0e0620', borderRadius: 12 }}/>
      {/* gold border */}
      <div style={{ position: 'absolute', inset: 6, border: '2px solid #b8860b', borderRadius: 8 }}/>
      <div style={{ position: 'absolute', inset: 11, border: '1px solid #b8860b', borderRadius: 6, opacity: 0.6 }}/>
      {/* top banner: roman numeral */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#ffd700', fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', fontFamily: 'serif' }}>{roman}</span>
      </div>
      {/* illustration area */}
      <div style={{ position: 'absolute', top: 44, left: 14, right: 14, bottom: 48, overflow: 'hidden', borderRadius: 4, border: '1px solid #b8860b', opacity: 0.95 }}>
        <CardIllustration id={card.id} />
      </div>
      {/* bottom banner: card name */}
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#ffd700', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', fontFamily: 'serif', textAlign: 'center' }}>
          {card.name}
        </span>
      </div>
    </div>
  );
}

/* ─── Spread (fan selection) ──────────────────────────────────── */
function CardSpread({ spreadCards, onSelect }: { spreadCards: TarotCard[]; onSelect: (idx: number) => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const n = spreadCards.length;

  return (
    <div className="relative flex items-end justify-center" style={{ width: '100%', height: 220, marginBottom: 8 }}>
      {spreadCards.map((_, idx) => {
        const center = (n - 1) / 2;
        const offset = idx - center;
        const rotate = offset * 7;
        const tx = offset * 44;
        const ty = Math.abs(offset) * 10;
        const isHovered = hoveredIdx === idx;
        return (
          <motion.div
            key={idx}
            className="absolute cursor-pointer"
            style={{
              bottom: 0,
              left: '50%',
              originX: '50%',
              originY: '100%',
              zIndex: isHovered ? 20 : idx,
            }}
            animate={{
              x: tx - 40,
              rotate: rotate,
              y: isHovered ? ty - 24 : ty,
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onHoverStart={() => setHoveredIdx(idx)}
            onHoverEnd={() => setHoveredIdx(null)}
            onClick={() => onSelect(idx)}
          >
            <CardBack w={80} h={130} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Tarot Component ────────────────────────────────────── */
export default function Tarot() {
  const [phase, setPhase] = useState<'spread' | 'flipping' | 'revealed'>('spread');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const spreadCards = useMemo(
    () => Array.from({ length: 7 }, () => tarotCards[Math.floor(Math.random() * tarotCards.length)]),
    []
  );

  const handleSelect = (idx: number) => {
    const card = spreadCards[idx];
    setSelectedCard(card);
    setPhase('flipping');
    trackTarotDraw(card.name);
    setTimeout(() => setPhase('revealed'), 1200);
  };

  const reset = () => {
    setPhase('spread');
    setSelectedCard(null);
  };

  return (
    <Layout>
      <div className="relative min-h-screen -mx-4 sm:-mx-6 -mt-6 px-4 sm:px-6 pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0720] via-[#130a2e] to-[#1a0d3a]" />

        {STARS.map((star, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: star.delay }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <p className="text-purple-300/80 text-xs font-bold tracking-[0.3em] uppercase mb-3">🌌 오늘의 우주 에너지</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              오늘의 타로 한 장
            </h1>
            <p className="text-purple-200/70 text-base leading-relaxed max-w-xs mx-auto">
              {phase === 'spread'
                ? <>마음속으로 질문을 하나 떠올려보세요.<br />끌리는 카드 한 장을 선택하세요 🌙</>
                : <>카드가 당신에게 속삭여줄 거예요 ✨</>}
            </p>
          </motion.div>

          {/* ── Spread Phase ── */}
          <AnimatePresence mode="wait">
            {phase === 'spread' && (
              <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
                <CardSpread spreadCards={spreadCards} onSelect={handleSelect} />
                <p className="text-center text-purple-300/60 text-sm mt-4 font-medium">
                  ✦ 카드를 선택하세요 ✦
                </p>
              </motion.div>
            )}

            {/* ── Flipping Phase ── */}
            {phase === 'flipping' && selectedCard && (
              <motion.div key="flipping"
                initial={{ opacity: 0, scale: 0.5, y: 80 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                className="flex flex-col items-center"
                style={{ perspective: 1200 }}
              >
                <motion.div
                  animate={{ rotateY: [0, 90, 0] }}
                  transition={{ duration: 0.9, times: [0, 0.5, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <CardFront card={selectedCard} w={200} h={324} />
                </motion.div>
              </motion.div>
            )}

            {/* ── Revealed Phase ── */}
            {phase === 'revealed' && selectedCard && (
              <motion.div key="revealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
                {/* Glowing card */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative mb-8"
                >
                  <div className="absolute inset-0 rounded-2xl blur-2xl opacity-50"
                    style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.7) 0%, transparent 70%)' }}/>
                  <CardFront card={selectedCard} w={200} h={324} />
                </motion.div>

                {/* Advice */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full space-y-3"
                >
                  <p className="text-center text-purple-300/80 text-xs font-bold tracking-[0.2em] uppercase mb-4">오늘의 조언</p>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shrink-0 shadow-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm">사랑 조언</h4>
                      <p className="text-sm text-purple-200/80 leading-relaxed">{selectedCard.loveMessage}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm">일/학업 조언</h4>
                      <p className="text-sm text-purple-200/80 leading-relaxed">{selectedCard.workMessage}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm">오늘의 에너지</h4>
                      <p className="text-sm text-purple-200/80 leading-relaxed">{selectedCard.energyMessage}</p>
                    </div>
                  </div>

                  <Button
                    onClick={reset}
                    className="w-full mt-4 rounded-2xl h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md transition-all"
                  >
                    🔮 새 카드 뽑기
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

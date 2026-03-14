import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { TAROT3_CARDS } from "@/data/tarot3Cards";
import type { Tarot3Card } from "@/data/tarot3Cards";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { trackTarotDraw } from "@/lib/analytics";

const STARS = [
  { top: '5%',  left: '4%',  size: '4px', opacity: 0.55, delay: 0 },
  { top: '11%', left: '89%', size: '3px', opacity: 0.40, delay: 0.6 },
  { top: '27%', left: '93%', size: '5px', opacity: 0.50, delay: 1.1 },
  { top: '48%', left: '2%',  size: '4px', opacity: 0.45, delay: 0.4 },
  { top: '67%', left: '91%', size: '4px', opacity: 0.40, delay: 1.4 },
  { top: '80%', left: '6%',  size: '3px', opacity: 0.35, delay: 0.2 },
  { top: '18%', left: '52%', size: '3px', opacity: 0.30, delay: 0.9 },
  { top: '88%', left: '58%', size: '3px', opacity: 0.30, delay: 0.1 },
  { top: '3%',  left: '33%', size: '4px', opacity: 0.40, delay: 1.2 },
  { top: '44%', left: '97%', size: '3px', opacity: 0.35, delay: 0.7 },
];

/* ─── SVG Arts ─────────────────────────────────────────────────── */

function SunArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><radialGradient id="sg1" cx="50%" cy="35%" r="65%"><stop offset="0%" stopColor="#fff9c4"/><stop offset="100%" stopColor="#ffe082"/></radialGradient></defs>
      <rect width="180" height="200" fill="url(#sg1)"/>
      <rect x="0" y="170" width="180" height="30" fill="#c8a96e" opacity="0.6"/>
      <rect x="0" y="158" width="180" height="14" fill="#a1887f" opacity="0.4"/>
      <rect x="20" y="128" width="140" height="40" fill="#d4a96a" rx="1"/>
      {[135,143,151].map(y => <line key={y} x1="20" y1={y} x2="160" y2={y} stroke="#c8a96e" strokeWidth="0.5"/>)}
      {[[-6,130,155],[6,154,148]].map(([_,px,py],i) => (
        <g key={i}><rect x={px-2} y={py-20} width="4" height="25" fill="#388e3c"/><circle cx={px} cy={py-22} r="10" fill="#fdd835" stroke="#f57f17" strokeWidth="1"/><circle cx={px} cy={py-22} r="4" fill="#5d4037"/></g>
      ))}
      {Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180,inner=34,outer=i%2===0?52:47;return <line key={i} x1={90+Math.cos(a)*inner} y1={72+Math.sin(a)*inner} x2={90+Math.cos(a)*outer} y2={72+Math.sin(a)*outer} stroke="#f57f17" strokeWidth={i%2===0?3:2} strokeLinecap="round"/>;})}
      <circle cx="90" cy="72" r="28" fill="#fdd835" stroke="#f57f17" strokeWidth="1.5"/>
      <ellipse cx="83" cy="67" rx="2.5" ry="3.5" fill="#e65100"/>
      <ellipse cx="97" cy="67" rx="2.5" ry="3.5" fill="#e65100"/>
      <path d="M84 75 Q90 82 96 75" stroke="#e65100" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function MoonArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d0635"/><stop offset="100%" stopColor="#1a237e"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#mg1)"/>
      <ellipse cx="90" cy="188" rx="80" ry="18" fill="#1565c0" opacity="0.6"/>
      <rect x="15" y="85" width="28" height="90" fill="#546e7a" rx="2"/>
      <rect x="13" y="80" width="32" height="12" fill="#607d8b" rx="1"/>
      <rect x="137" y="85" width="28" height="90" fill="#546e7a" rx="2"/>
      <rect x="135" y="80" width="32" height="12" fill="#607d8b" rx="1"/>
      <path d="M55 200 Q90 170 125 200" fill="#4a148c" opacity="0.5"/>
      <circle cx="90" cy="40" r="28" fill="#b0bec5" stroke="#eceff1" strokeWidth="1"/>
      <circle cx="104" cy="34" r="22" fill="#0d0635"/>
      {[[30,18],[150,22],[160,55],[20,60],[90,15]].map(([x,y],i)=>(<g key={i}><polygon points={`${x},${y-4} ${x+1.2},${y-1.2} ${x+4},${y-1.2} ${x+2},${y+1} ${x+2.5},${y+4} ${x},${y+2} ${x-2.5},${y+4} ${x-2},${y+1} ${x-4},${y-1.2} ${x-1.2},${y-1.2}`} fill="#ffe082" opacity="0.9"/></g>))}
      <ellipse cx="52" cy="152" rx="14" ry="8" fill="#8d6e63"/>
      <circle cx="38" cy="148" r="7" fill="#8d6e63"/>
      <ellipse cx="128" cy="152" rx="14" ry="8" fill="#546e7a"/>
      <circle cx="142" cy="147" r="8" fill="#546e7a"/>
    </svg>
  );
}

function StarArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="stg1" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#1a237e"/><stop offset="60%" stopColor="#283593"/><stop offset="100%" stopColor="#1565c0"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#stg1)"/>
      <ellipse cx="130" cy="185" rx="45" ry="18" fill="#1e88e5" opacity="0.5"/>
      <path d="M0 160 Q60 145 110 160 Q140 168 180 155 L180 200 L0 200Z" fill="#2e7d32" opacity="0.5"/>
      {[[35,30],[155,25],[165,60],[20,65],[50,55],[160,95]].map(([x,y],i)=>(<polygon key={i} points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2.5},${y+1} ${x+3},${y+5} ${x},${y+2.5} ${x-3},${y+5} ${x-2.5},${y+1} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`} fill="#ffe082" opacity="0.75"/>))}
      {Array.from({length:8},(_,i)=>{const a1=(i*45-90)*Math.PI/180,a2=(i*45-90+22.5)*Math.PI/180;return <polygon key={i} points={`90,30 ${90+Math.cos(a1)*32},${30+Math.sin(a1)*32} ${90+Math.cos(a2)*14},${30+Math.sin(a2)*14}`} fill="#ffd600" stroke="#f57f17" strokeWidth="0.5"/>;})}
      <circle cx="90" cy="30" r="10" fill="#ffd600"/>
      <circle cx="60" cy="140" r="7" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M54 147 Q60 175 66 147" fill="#9c27b0"/>
      <line x1="54" y1="152" x2="38" y2="140" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="66" y1="152" x2="85" y2="145" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function LoversArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1565c0"/><stop offset="50%" stopColor="#e3f2fd"/><stop offset="100%" stopColor="#66bb6a"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#lg1)"/>
      <rect x="0" y="155" width="180" height="45" fill="#388e3c" opacity="0.7"/>
      <polygon points="0,155 30,90 60,155" fill="#78909c"/>
      <polygon points="120,155 155,85 180,155" fill="#90a4ae"/>
      <circle cx="90" cy="25" r="20" fill="#fdd835" stroke="#f9a825" strokeWidth="1.5"/>
      <circle cx="90" cy="60" r="9" fill="#fff8e1" stroke="#fdd835" strokeWidth="1"/>
      <path d="M80 62 Q65 52 68 68 Q75 65 80 68Z" fill="#fff8e1" stroke="#fdd835" strokeWidth="0.8"/>
      <path d="M100 62 Q115 52 112 68 Q105 65 100 68Z" fill="#fff8e1" stroke="#fdd835" strokeWidth="0.8"/>
      <circle cx="60" cy="130" r="7" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M53 137 Q60 162 67 137" fill="#e53935"/>
      <circle cx="120" cy="128" r="7" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M112 136 Q120 162 128 136" fill="#e91e63"/>
      <rect x="140" y="120" width="4" height="45" fill="#5d4037"/>
      <ellipse cx="142" cy="110" rx="15" ry="18" fill="#388e3c"/>
      <circle cx="144" cy="108" r="4" fill="#e53935"/>
    </svg>
  );
}

function StrengthArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f9a825"/><stop offset="100%" stopColor="#ffe082"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#sg2)"/>
      <polygon points="0,180 35,120 70,180" fill="#bcaaa4" opacity="0.6"/>
      <polygon points="110,180 145,110 180,180" fill="#a1887f" opacity="0.5"/>
      <path d="M65 30 Q65 20 75 20 Q90 20 90 30 Q90 20 105 20 Q115 20 115 30 Q115 40 105 40 Q90 40 90 30 Q90 40 75 40 Q65 40 65 30Z" fill="none" stroke="#e65100" strokeWidth="2.5"/>
      <circle cx="90" cy="75" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M82 83 Q90 115 98 83" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
      <path d="M82 75 Q90 65 98 75" stroke="#e91e63" strokeWidth="3" fill="none"/>
      <ellipse cx="90" cy="148" rx="40" ry="20" fill="#f9a825" stroke="#e65100" strokeWidth="1"/>
      <circle cx="58" cy="138" r="18" fill="#f9a825" stroke="#e65100" strokeWidth="1"/>
      {Array.from({length:10},(_,i)=>{const a=(i*36)*Math.PI/180;return <line key={i} x1={58+Math.cos(a)*18} y1={138+Math.sin(a)*18} x2={58+Math.cos(a)*26} y2={138+Math.sin(a)*26} stroke="#e65100" strokeWidth="2.5" strokeLinecap="round"/>;})}
      <circle cx="55" cy="135" r="3" fill="#212121"/>
      <circle cx="63" cy="135" r="3" fill="#212121"/>
      <path d="M55 143 Q59 148 63 143" stroke="#212121" strokeWidth="1.5" fill="none"/>
      <ellipse cx="72" cy="140" rx="5" ry="3" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
    </svg>
  );
}

function WheelArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><radialGradient id="wg1" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#1a237e"/><stop offset="100%" stopColor="#0d0335"/></radialGradient></defs>
      <rect width="180" height="200" fill="url(#wg1)"/>
      <circle cx="90" cy="100" r="62" fill="none" stroke="#b8860b" strokeWidth="3"/>
      <circle cx="90" cy="100" r="55" fill="none" stroke="#b8860b" strokeWidth="1"/>
      {Array.from({length:8},(_,i)=>{const a=(i*45)*Math.PI/180;return <line key={i} x1={90+Math.cos(a)*15} y1={100+Math.sin(a)*15} x2={90+Math.cos(a)*53} y2={100+Math.sin(a)*53} stroke="#b8860b" strokeWidth="2"/>;})}
      <circle cx="90" cy="100" r="15" fill="#b8860b" opacity="0.3"/>
      <circle cx="90" cy="100" r="8" fill="#b8860b"/>
      <text x="90" y="58" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">T</text>
      <text x="132" y="104" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">A</text>
      <text x="90" y="152" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">R</text>
      <text x="48" y="104" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="bold">O</text>
      <path d="M148 80 Q158 90 155 100 Q152 110 158 122" stroke="#388e3c" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <circle cx="148" cy="77" r="4" fill="#388e3c"/>
      <ellipse cx="90" cy="43" rx="18" ry="10" fill="#c8a96e"/>
      <circle cx="75" cy="40" r="8" fill="#c8a96e"/>
    </svg>
  );
}

function MagicianArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="magg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffd54f"/><stop offset="100%" stopColor="#fff9c4"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#magg1)"/>
      <path d="M65 28 Q65 18 75 18 Q90 18 90 28 Q90 18 105 18 Q115 18 115 28 Q115 38 105 38 Q90 38 90 28 Q90 38 75 38 Q65 38 65 28Z" fill="none" stroke="#e65100" strokeWidth="2.5"/>
      <line x1="90" y1="45" x2="90" y2="78" stroke="#5d4037" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="90" cy="42" r="5" fill="#ffd700" stroke="#e65100" strokeWidth="1"/>
      <circle cx="90" cy="90" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M82 98 Q90 140 98 98" fill="#e53935"/>
      <ellipse cx="90" cy="84" rx="12" ry="4" fill="#b71c1c"/>
      <rect x="84" y="70" width="12" height="15" fill="#b71c1c" rx="2"/>
      <rect x="35" y="145" width="110" height="8" fill="#8d6e63" rx="2"/>
      <path d="M52 140 Q56 145 60 140 Q60 135 52 135Z" fill="#42a5f5"/>
      <line x1="80" y1="130" x2="80" y2="145" stroke="#90a4ae" strokeWidth="2"/>
      <circle cx="100" cy="137" r="6" fill="none" stroke="#ffd700" strokeWidth="1.5"/>
      <text x="100" y="141" textAnchor="middle" fill="#ffd700" fontSize="8">✦</text>
      <line x1="120" y1="130" x2="120" y2="145" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="120" cy="128" r="3" fill="#ffd700"/>
    </svg>
  );
}

function EmperorArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="emg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b71c1c"/><stop offset="100%" stopColor="#ef9a9a"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#emg1)"/>
      <polygon points="0,200 0,110 50,70 100,100 150,60 180,80 180,200" fill="#78909c" opacity="0.7"/>
      <rect x="45" y="65" width="90" height="120" fill="#795548" rx="3"/>
      <rect x="50" y="35" width="80" height="35" fill="#6d4c41" rx="2"/>
      <circle cx="90" cy="78" r="9" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <rect x="81" y="67" width="18" height="8" fill="#ffd700"/>
      {[83,87,91,95].map((x,i)=>(<polygon key={i} points={`${x},67 ${x+2},60 ${x+4},67`} fill="#ffd700"/>))}
      <path d="M83 84 Q90 95 97 84" fill="#e0e0e0" opacity="0.9"/>
      <path d="M82 98 Q90 165 115 105" fill="#e53935"/>
      <rect x="75" y="85" width="30" height="25" fill="#90a4ae" rx="2"/>
      <circle cx="68" cy="115" r="8" fill="#ffd700" stroke="#f57f17" strokeWidth="1"/>
    </svg>
  );
}

function WorldArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><radialGradient id="wog1" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#4a148c"/><stop offset="100%" stopColor="#1a0535"/></radialGradient></defs>
      <rect width="180" height="200" fill="url(#wog1)"/>
      {Array.from({length:28},(_,i)=>{const t=(i/28)*2*Math.PI,rx=62,ry=82,x=90+rx*Math.cos(t),y=100+ry*Math.sin(t),rot=(i/28)*360;return(<ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill={i%3===0?"#558b2f":"#7cb342"} transform={`rotate(${rot+90},${x},${y})`} opacity="0.9"/>);})}
      <circle cx="90" cy="85" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M82 93 Q90 130 98 93" fill="#ce93d8"/>
      <line x1="72" y1="85" x2="62" y2="70" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="108" y1="85" x2="118" y2="70" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="62" cy="68" r="4" fill="#ffd700"/>
      <circle cx="118" cy="68" r="4" fill="#ffd700"/>
      {[[145,35],[35,40],[155,155],[25,155]].map(([x,y],i)=>(<polygon key={i} points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2},${y+1} ${x+3},${y+5} ${x},${y+2} ${x-3},${y+5} ${x-2},${y+1} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`} fill="#ffe082" opacity="0.7"/>))}
    </svg>
  );
}

function FoolArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="fg1" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#b3e5fc"/><stop offset="60%" stopColor="#e1f5fe"/><stop offset="100%" stopColor="#a5d6a7"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#fg1)"/>
      <polygon points="0,200 0,100 60,80 120,60 180,80 180,200" fill="#90a4ae" opacity="0.8"/>
      <polygon points="70,135 140,110 180,125 180,200 0,200 0,160 40,150" fill="#78909c"/>
      <circle cx="148" cy="28" r="18" fill="#fdd835" stroke="#f9a825" strokeWidth="1.5"/>
      <circle cx="95" cy="90" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M87 98 Q95 130 103 98" fill="#e53935"/>
      <path d="M89 98 Q91 120 95 130 Q95 115 99 98" fill="#1e88e5" opacity="0.7"/>
      <ellipse cx="95" cy="84" rx="10" ry="4" fill="#1565c0"/>
      <rect x="90" y="74" width="10" height="11" fill="#1565c0" rx="2"/>
      <line x1="105" y1="98" x2="125" y2="65" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="126" cy="62" rx="8" ry="6" fill="#8d6e63" stroke="#6d4c41" strokeWidth="1"/>
      <ellipse cx="75" cy="122" rx="10" ry="6" fill="white" stroke="#e0e0e0" strokeWidth="1"/>
      <circle cx="66" cy="119" r="5" fill="white" stroke="#e0e0e0" strokeWidth="1"/>
    </svg>
  );
}

/* ─── 12 Simple Abstract Arts for remaining cards ─────────────── */

function HighPriestessArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="hp1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a0a2e"/><stop offset="100%" stopColor="#1a0550"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#hp1)"/>
      <rect x="20" y="40" width="8" height="120" fill="#b8860b" rx="2"/>
      <rect x="152" y="40" width="8" height="120" fill="#eceff1" rx="2"/>
      <rect x="20" y="155" width="140" height="8" fill="#546e7a" opacity="0.6"/>
      <path d="M55 155 Q90 110 125 155" fill="#263238" opacity="0.5"/>
      <text x="26" y="38" fill="#ffd700" fontSize="10" textAnchor="middle">B</text>
      <text x="156" y="38" fill="#eceff1" fontSize="10" textAnchor="middle">J</text>
      <circle cx="90" cy="75" r="9" fill="#ffccbc" stroke="#b0bec5" strokeWidth="0.8"/>
      <path d="M82 84 Q90 120 98 84" fill="#1a237e"/>
      <path d="M82 84 Q90 120 98 84" fill="white" opacity="0.15"/>
      <path d="M72 64 Q90 52 108 64" stroke="#90a4ae" strokeWidth="2" fill="none"/>
      <ellipse cx="90" cy="52" rx="14" ry="8" fill="none" stroke="#90a4ae" strokeWidth="1.5"/>
      <circle cx="83" cy="52" r="4" fill="#607d8b" opacity="0.7"/>
      <circle cx="90" cy="48" r="3" fill="#eceff1" opacity="0.9"/>
      <circle cx="97" cy="52" r="4" fill="#607d8b" opacity="0.7"/>
      <rect x="72" y="115" width="36" height="25" fill="#263238" rx="2" opacity="0.7"/>
      {[120,125,130,135].map((y,i)=><line key={i} x1="74" y1={y} x2="106" y2={y} stroke="#546e7a" strokeWidth="1" opacity="0.8"/>)}
      {[[35,20],[145,28],[155,60],[25,65],[90,12]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5" fill="#b0bec5" opacity="0.7"/>)}
    </svg>
  );
}

function EmpressArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="em1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1b5e20"/><stop offset="100%" stopColor="#81c784"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#em1)"/>
      <ellipse cx="90" cy="185" rx="80" ry="25" fill="#2e7d32" opacity="0.5"/>
      {[20,40,60,90,120,140,160].map((x,i)=>(<g key={i}><rect x={x-2} y={155} width="3" height="35" fill="#388e3c"/><circle cx={x} cy={153} r={i%2===0?6:4} fill={i%3===0?'#f06292':i%3===1?'#ffd700':'#ff8f00'}/></g>))}
      <circle cx="90" cy="75" r="10" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.8"/>
      <path d="M80 85 Q90 140 100 85" fill="#f8bbd0" stroke="#f48fb1" strokeWidth="0.5"/>
      <path d="M78 90 Q65 100 60 120" fill="#c8e6c9" stroke="#a5d6a7" strokeWidth="0.5"/>
      <path d="M102 90 Q115 100 120 120" fill="#c8e6c9" stroke="#a5d6a7" strokeWidth="0.5"/>
      <ellipse cx="90" cy="66" rx="14" ry="7" fill="#ffd700" opacity="0.8"/>
      {[76,80,84,88,92,96,100,104].map((x,i)=>(<polygon key={i} points={`${x},66 ${x+2},59 ${x+4},66`} fill="#ffd700"/>))}
      <path d="M72 70 Q90 58 108 70" stroke="#ffd700" strokeWidth="2" fill="none"/>
      <circle cx="60" cy="130" r="15" fill="#ffe082" opacity="0.3" stroke="#ffd700" strokeWidth="1"/>
      <text x="60" y="135" textAnchor="middle" fill="#ffd700" fontSize="14">♀</text>
      <ellipse cx="120" cy="125" rx="18" ry="14" fill="#4caf50" opacity="0.3"/>
      {[110,118,126,134].map((x,i)=><line key={i} x1={x} y1="112" x2={x-4} y2="135" stroke="#388e3c" strokeWidth="1.5" strokeLinecap="round"/>)}
    </svg>
  );
}

function HierophantArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="hi1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a148c"/><stop offset="100%" stopColor="#7b1fa2"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#hi1)"/>
      <rect x="25" y="50" width="12" height="120" fill="#795548" rx="2"/>
      <rect x="143" y="50" width="12" height="120" fill="#795548" rx="2"/>
      <rect x="45" y="170" width="90" height="10" fill="#5d4037" rx="1"/>
      <circle cx="90" cy="78" r="10" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.8"/>
      <rect x="78" y="88" width="24" height="50" fill="#e91e63" opacity="0.8" rx="2"/>
      <rect x="82" y="95" width="16" height="38" fill="#ce93d8" opacity="0.5" rx="1"/>
      <rect x="78" y="58" width="24" height="22" fill="#ffd700" rx="2"/>
      {[62,66,70].map((x,i)=><polygon key={i} points={`${x},58 ${x+4},50 ${x+8},58`} fill="#ffd700"/>)}
      <line x1="90" y1="110" x2="90" y2="145" stroke="#ffd700" strokeWidth="3" strokeLinecap="round"/>
      <line x1="78" y1="118" x2="102" y2="118" stroke="#ffd700" strokeWidth="2"/>
      <line x1="80" y1="125" x2="100" y2="125" stroke="#ffd700" strokeWidth="1.5"/>
      <circle cx="60" cy="155" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <circle cx="120" cy="157" r="8" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <circle cx="70" cy="170" r="6" fill="#ffd700" opacity="0.6"/>
      <circle cx="110" cy="170" r="6" fill="#ffd700" opacity="0.6"/>
      <circle cx="90" cy="172" r="6" fill="#ffd700" opacity="0.6"/>
    </svg>
  );
}

function ChariotArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="ch1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d47a1"/><stop offset="100%" stopColor="#1565c0"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#ch1)"/>
      {[[20,15],[155,20],[165,50],[10,60],[85,10]].map(([x,y],i)=><polygon key={i} points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2},${y+1} ${x+3},${y+5} ${x},${y+2} ${x-3},${y+5} ${x-2},${y+1} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`} fill="#ffe082" opacity="0.7"/>)}
      <rect x="40" y="110" width="100" height="60" fill="#1a237e" rx="4" stroke="#b8860b" strokeWidth="1.5"/>
      <rect x="30" y="100" width="120" height="18" fill="#283593" rx="3" stroke="#b8860b" strokeWidth="1"/>
      <circle cx="90" cy="80" r="9" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.5"/>
      <path d="M82 89 Q90 108 98 89" fill="#1565c0"/>
      <rect x="82" y="58" width="16" height="23" fill="#ffd700" rx="2"/>
      {[84,89,94].map((x,i)=><polygon key={i} points={`${x},58 ${x+2.5},52 ${x+5},58`} fill="#ffd700"/>)}
      <ellipse cx="62" cy="175" rx="12" ry="12" fill="none" stroke="#b8860b" strokeWidth="3"/>
      {Array.from({length:6},(_,i)=>{const a=(i*60)*Math.PI/180;return <line key={i} x1={62} y1={175} x2={62+Math.cos(a)*10} y2={175+Math.sin(a)*10} stroke="#b8860b" strokeWidth="1.5"/>;})}
      <ellipse cx="118" cy="175" rx="12" ry="12" fill="none" stroke="#b8860b" strokeWidth="3"/>
      {Array.from({length:6},(_,i)=>{const a=(i*60)*Math.PI/180;return <line key={i} x1={118} y1={175} x2={118+Math.cos(a)*10} y2={175+Math.sin(a)*10} stroke="#b8860b" strokeWidth="1.5"/>;})}
      <line x1="62" y1="163" x2="62" y2="170" stroke="#b8860b" strokeWidth="2"/>
      <line x1="118" y1="163" x2="118" y2="170" stroke="#b8860b" strokeWidth="2"/>
      <circle cx="62" cy="140" r="6" fill="white" opacity="0.8"/>
      <circle cx="118" cy="140" r="6" fill="#212121" opacity="0.8"/>
    </svg>
  );
}

function HermitArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="her1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a1a2e"/><stop offset="100%" stopColor="#16213e"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#her1)"/>
      {[[30,18,2],[150,22,1.5],[160,55,1],[20,60,1.5],[90,12,2]].map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill="#b0bec5" opacity="0.6"/>)}
      <polygon points="0,200 50,80 110,70 160,50 180,60 180,200" fill="#263238" opacity="0.8"/>
      <circle cx="90" cy="90" r="9" fill="#b0bec5" opacity="0.9"/>
      <path d="M82 99 Q90 145 98 99" fill="#546e7a"/>
      <path d="M82 99 Q90 145 98 99" fill="#607d8b" opacity="0.3"/>
      <ellipse cx="93" cy="83" rx="14" ry="10" fill="#546e7a" opacity="0.6"/>
      <line x1="80" y1="110" x2="60" y2="150" stroke="#546e7a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="148" x2="52" y2="165" stroke="#546e7a" strokeWidth="3" strokeLinecap="round"/>
      <polygon points="122,130 128,115 134,130" fill="#ffd700" opacity="0.7"/>
      <circle cx="128" cy="125" r="14" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.5"/>
      {Array.from({length:8},(_,i)=>{const a=(i*45)*Math.PI/180;return <line key={i} x1={128+Math.cos(a)*10} y1={125+Math.sin(a)*10} x2={128+Math.cos(a)*14} y2={125+Math.sin(a)*14} stroke="#ffd700" strokeWidth="1" opacity="0.6"/>;})}
      <circle cx="128" cy="120" r="5" fill="#ffd700" opacity="0.9"/>
      <line x1="130" y1="130" x2="130" y2="165" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function JusticeArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="ju1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#212121"/><stop offset="100%" stopColor="#424242"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#ju1)"/>
      <rect x="22" y="45" width="10" height="120" fill="#795548" rx="2"/>
      <rect x="148" y="45" width="10" height="120" fill="#795548" rx="2"/>
      <rect x="18" y="155" width="144" height="8" fill="#5d4037" rx="2"/>
      <circle cx="90" cy="78" r="9" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.8"/>
      <path d="M82 87 Q90 130 98 87" fill="#e53935" opacity="0.9"/>
      <rect x="82" y="60" width="16" height="20" fill="#ffd700" rx="2"/>
      {[84,88,92,96].map((x,i)=><polygon key={i} points={`${x},60 ${x+2},53 ${x+4},60`} fill="#ffd700"/>)}
      <line x1="90" y1="90" x2="90" y2="60" stroke="#b8860b" strokeWidth="2"/>
      <line x1="60" y1="75" x2="120" y2="75" stroke="#b8860b" strokeWidth="2.5"/>
      <line x1="60" y1="75" x2="60" y2="100" stroke="#b8860b" strokeWidth="1.5"/>
      <line x1="120" y1="75" x2="120" y2="90" stroke="#b8860b" strokeWidth="1.5"/>
      <ellipse cx="60" cy="102" rx="10" ry="5" fill="#ffd700" opacity="0.6"/>
      <ellipse cx="120" cy="92" rx="10" ry="5" fill="#ffd700" opacity="0.6"/>
      <line x1="110" y1="105" x2="118" y2="150" stroke="#90a4ae" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="106" y1="112" x2="114" y2="112" stroke="#90a4ae" strokeWidth="1.5"/>
      <circle cx="114" cy="103" r="4" fill="#90a4ae"/>
    </svg>
  );
}

function HangedManArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="hm1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#004d40"/><stop offset="100%" stopColor="#00695c"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#hm1)"/>
      <rect x="50" y="40" width="10" height="90" fill="#5d4037" rx="2"/>
      <rect x="120" y="40" width="10" height="90" fill="#5d4037" rx="2"/>
      <rect x="48" y="38" width="84" height="10" fill="#5d4037" rx="2"/>
      <line x1="90" y1="48" x2="90" y2="68" stroke="#b8860b" strokeWidth="2"/>
      <circle cx="90" cy="80" r="9" fill="#ffccbc" stroke="#ffe082" strokeWidth="2"/>
      {Array.from({length:8},(_,i)=>{const a=(i*45)*Math.PI/180;return <line key={i} x1={90+Math.cos(a)*10} y1={80+Math.sin(a)*10} x2={90+Math.cos(a)*15} y2={80+Math.sin(a)*15} stroke="#ffe082" strokeWidth="1.5" opacity="0.7"/>;})}
      <path d="M82 89 Q90 120 98 89" fill="#1565c0"/>
      <line x1="82" y1="100" x2="65" y2="85" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="98" y1="100" x2="115" y2="112" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="82" y1="118" x2="70" y2="145" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
      <line x1="70" y1="145" x2="60" y2="138" stroke="#ffccbc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="98" y1="118" x2="98" y2="148" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function DeathArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="de1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a0a0a"/><stop offset="100%" stopColor="#1a1a2e"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#de1)"/>
      <path d="M0 180 Q45 150 90 165 Q135 150 180 180 L180 200 L0 200Z" fill="#212121"/>
      <circle cx="35" cy="140" r="8" fill="#eceff1" opacity="0.7"/>
      <rect x="29" y="148" width="12" height="8" fill="#eceff1" opacity="0.6"/>
      <ellipse cx="35" cy="155" rx="6" ry="4" fill="#eceff1" opacity="0.5"/>
      {[20,32,26,38,32,40].map((x,i)=>i%2===0?<rect key={i} x={x} y={155} width="3" height="8" fill="#eceff1" opacity="0.5"/>:null)}
      <rect x="80" y="100" width="6" height="70" fill="#37474f" rx="1"/>
      <polygon points="83,95 90,115 76,115" fill="#eceff1" opacity="0.8"/>
      <line x1="72" y1="115" x2="94" y2="115" stroke="#eceff1" strokeWidth="2" opacity="0.6"/>
      <circle cx="83" cy="108" r="4" fill="#b71c1c" opacity="0.8"/>
      {[55,75,105,130].map((x,i)=>(<g key={i}><rect x={x-1.5} y={170} width="3" height="18" fill="#388e3c" opacity="0.7"/><circle cx={x} cy={168} r={4} fill={i%2===0?'#f06292':'#ffe082'} opacity="0.8"/></g>))}
      <circle cx="135" cy="50" r="25" fill="#f57f17" opacity="0.15"/>
      <circle cx="135" cy="50" r="18" fill="#f57f17" opacity="0.2"/>
      {Array.from({length:8},(_,i)=>{const a=(i*45-90)*Math.PI/180;return <line key={i} x1={135+Math.cos(a)*20} y1={50+Math.sin(a)*20} x2={135+Math.cos(a)*30} y2={50+Math.sin(a)*30} stroke="#f57f17" strokeWidth="1.5" opacity="0.4"/>;})}
    </svg>
  );
}

function TemperanceArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="te1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0277bd"/><stop offset="100%" stopColor="#01579b"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#te1)"/>
      <ellipse cx="90" cy="190" rx="60" ry="20" fill="#0288d1" opacity="0.5"/>
      <polygon points="30,200 60,120 90,200" fill="#4fc3f7" opacity="0.2"/>
      <polygon points="90,200 120,120 150,200" fill="#b3e5fc" opacity="0.15"/>
      <circle cx="135" cy="45" r="22" fill="#ffd700" opacity="0.9"/>
      {Array.from({length:8},(_,i)=>{const a=(i*45-90)*Math.PI/180;return <line key={i} x1={135+Math.cos(a)*24} y1={45+Math.sin(a)*24} x2={135+Math.cos(a)*33} y2={45+Math.sin(a)*33} stroke="#ffd700" strokeWidth="2" opacity="0.8"/>;})}
      <circle cx="90" cy="85" r="10" fill="#ffccbc" stroke="#e0a070" strokeWidth="0.8"/>
      <path d="M80 95 Q65 115 55 140" stroke="#ffccbc" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M100 95 Q115 115 125 140" stroke="#ffccbc" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M80 95 Q90 140 100 95" fill="#e3f2fd" opacity="0.8"/>
      <ellipse cx="90" cy="75" rx="20" ry="8" fill="#ffd700" opacity="0.7"/>
      {[72,78,84,90,96,102,108].map((x,i)=><polygon key={i} points={`${x},75 ${x+3},68 ${x+6},75`} fill="#ffd700" opacity="0.8"/>)}
      <ellipse cx="55" cy="140" rx="12" ry="7" fill="#b3e5fc" stroke="#4fc3f7" strokeWidth="1.5"/>
      <ellipse cx="125" cy="140" rx="12" ry="7" fill="#ffe082" stroke="#ffd700" strokeWidth="1.5"/>
      <path d="M60 140 Q90 120 122 140" stroke="#81d4fa" strokeWidth="1.5" fill="none" strokeDasharray="3,2" opacity="0.8"/>
    </svg>
  );
}

function DevilArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><radialGradient id="dv1" cx="50%" cy="30%" r="70%"><stop offset="0%" stopColor="#1a0000"/><stop offset="100%" stopColor="#000000"/></radialGradient></defs>
      <rect width="180" height="200" fill="url(#dv1)"/>
      <rect x="72" y="148" width="36" height="12" fill="#37474f" rx="2"/>
      <circle cx="90" cy="68" r="18" fill="#212121" stroke="#b71c1c" strokeWidth="1.5"/>
      <polygon points="90,40 82,62 98,62" fill="#b71c1c" opacity="0.8"/>
      <polygon points="70,42 72,62 82,55" fill="#b71c1c" opacity="0.6"/>
      <polygon points="110,42 108,62 98,55" fill="#b71c1c" opacity="0.6"/>
      <circle cx="83" cy="65" r="3" fill="#f44336" opacity="0.9"/>
      <circle cx="97" cy="65" r="3" fill="#f44336" opacity="0.9"/>
      <path d="M85 74 Q90 78 95 74" stroke="#f44336" strokeWidth="1.5" fill="none"/>
      <circle cx="65" cy="130" r="7" fill="#37474f" stroke="#546e7a" strokeWidth="0.5"/>
      <path d="M58 137 Q65 158 72 137" fill="#263238"/>
      <line x1="65" y1="137" x2="72" y2="148" stroke="#b71c1c" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="115" cy="128" r="7" fill="#37474f" stroke="#546e7a" strokeWidth="0.5"/>
      <path d="M108 135 Q115 156 122 135" fill="#263238"/>
      <line x1="115" y1="135" x2="108" y2="148" stroke="#b71c1c" strokeWidth="1.5" opacity="0.7"/>
      <ellipse cx="90" cy="90" rx="22" ry="14" fill="#b71c1c" opacity="0.15" stroke="#b71c1c" strokeWidth="1"/>
      <path d="M72 148 L65 138" stroke="#546e7a" strokeWidth="2"/>
      <path d="M108 148 L115 136" stroke="#546e7a" strokeWidth="2"/>
      <circle cx="90" cy="160" r="3" fill="#b71c1c" opacity="0.6"/>
    </svg>
  );
}

function TowerArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="to1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d0d0d"/><stop offset="100%" stopColor="#1a0d00"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#to1)"/>
      <rect x="60" y="70" width="60" height="110" fill="#37474f" rx="2"/>
      <polygon points="60,70 90,30 120,70" fill="#455a64"/>
      <polygon points="75,30 90,10 105,30" fill="#ffd700" opacity="0.9"/>
      <rect x="82" y="38" width="16" height="5" fill="#ffd700" opacity="0.8"/>
      {Array.from({length:8},(_,i)=>{const a=(i*45-90)*Math.PI/180;return <line key={i} x1={90+Math.cos(a)*8} y1={12+Math.sin(a)*8} x2={90+Math.cos(a)*15} y2={12+Math.sin(a)*15} stroke="#f57f17" strokeWidth="1.5" opacity="0.9"/>;})}
      <path d="M30 100 Q70 60 110 80" stroke="#ffd700" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9"/>
      <path d="M30 100 Q35 115 48 110" stroke="#ffd700" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
      <circle cx="50" cy="140" r="6" fill="#ffccbc" opacity="0.8"/>
      <path d="M44 147 Q50 165 56 147" fill="#e53935" opacity="0.7"/>
      <circle cx="130" cy="110" r="5" fill="#ffccbc" opacity="0.8"/>
      <path d="M125 116 Q130 132 135 116" fill="#1e88e5" opacity="0.7"/>
      {[75,90,100,115].map((x,i)=><rect key={i} x={x} y={70+i*10} width="10" height="7" fill="#263238" rx="1" opacity="0.8"/>)}
      <ellipse cx="90" cy="195" rx="55" ry="8" fill="#f57f17" opacity="0.3"/>
    </svg>
  );
}

function JudgmentArt() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs><linearGradient id="jg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d47a1"/><stop offset="40%" stopColor="#1565c0"/><stop offset="100%" stopColor="#37474f"/></linearGradient></defs>
      <rect width="180" height="200" fill="url(#jg1)"/>
      <path d="M0 160 Q45 150 90 158 Q135 150 180 160 L180 200 L0 200Z" fill="#37474f" opacity="0.8"/>
      <circle cx="90" cy="45" r="12" fill="#ffccbc" stroke="#ffd700" strokeWidth="1.5"/>
      <path d="M78 57 Q90 80 102 57" fill="#fff8e1" opacity="0.9"/>
      <path d="M72 62 Q58 58 55 68 Q52 78 62 78 Q72 78 78 70Z" fill="#fff8e1" stroke="#ffd700" strokeWidth="1" opacity="0.85"/>
      <path d="M108 62 Q122 58 125 68 Q128 78 118 78 Q108 78 102 70Z" fill="#fff8e1" stroke="#ffd700" strokeWidth="1" opacity="0.85"/>
      <line x1="65" y1="72" x2="60" y2="90" stroke="#ffccbc" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="115" y1="72" x2="120" y2="90" stroke="#ffccbc" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="60" cy="28" r="7" fill="#ffd700" opacity="0.8"/>
      <line x1="60" y1="35" x2="60" y2="56" stroke="#ffd700" strokeWidth="2"/>
      <line x1="50" y1="42" x2="70" y2="42" stroke="#ffd700" strokeWidth="2"/>
      <line x1="50" y1="42" x2="42" y2="56" stroke="#ffd700" strokeWidth="1.5"/>
      <line x1="70" y1="42" x2="78" y2="56" stroke="#ffd700" strokeWidth="1.5"/>
      <circle cx="45" cy="155" r="7" fill="#ffccbc" opacity="0.7"/>
      <path d="M39 162 Q45 178 51 162" fill="#546e7a" opacity="0.7"/>
      <circle cx="90" cy="153" r="7" fill="#ffccbc" opacity="0.7"/>
      <path d="M84 160 Q90 176 96 160" fill="#546e7a" opacity="0.7"/>
      <circle cx="135" cy="155" r="7" fill="#ffccbc" opacity="0.7"/>
      <path d="M129 162 Q135 178 141 162" fill="#546e7a" opacity="0.7"/>
      {[[35,25],[90,20],[150,28],[15,55],[165,50],[20,90],[160,88]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5" fill="#b0bec5" opacity="0.6"/>)}
    </svg>
  );
}

/* ─── CardIllustration (22 major arcana) ─────────────────────── */
function CardIllustration({ id }: { id: string }) {
  switch (id) {
    case 'fool':          return <FoolArt />;
    case 'magician':      return <MagicianArt />;
    case 'high_priestess': return <HighPriestessArt />;
    case 'empress':        return <EmpressArt />;
    case 'emperor':        return <EmperorArt />;
    case 'hierophant':     return <HierophantArt />;
    case 'lovers':         return <LoversArt />;
    case 'chariot':        return <ChariotArt />;
    case 'strength':       return <StrengthArt />;
    case 'hermit':         return <HermitArt />;
    case 'wheel':          return <WheelArt />;
    case 'justice':        return <JusticeArt />;
    case 'hanged_man':     return <HangedManArt />;
    case 'death':          return <DeathArt />;
    case 'temperance':     return <TemperanceArt />;
    case 'devil':          return <DevilArt />;
    case 'tower':          return <TowerArt />;
    case 'star':           return <StarArt />;
    case 'moon':           return <MoonArt />;
    case 'sun':            return <SunArt />;
    case 'judgment':       return <JudgmentArt />;
    case 'world':          return <WorldArt />;
    default:              return <div className="w-full h-full bg-violet-900" />;
  }
}

/* ─── Card Back ───────────────────────────────────────────────── */
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
      <rect x="8" y="8" width="204" height="340" rx="8" fill="none" stroke="#b8860b" strokeWidth="2"/>
      <rect x="14" y="14" width="192" height="328" rx="6" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.7"/>
      {[[18,18],[202,18],[18,338],[202,338]].map(([cx,cy],i) => (
        <g key={i}><circle cx={cx} cy={cy} r="6" fill="none" stroke="#b8860b" strokeWidth="1.5"/><circle cx={cx} cy={cy} r="2" fill="#b8860b"/></g>
      ))}
      {Array.from({length:8},(_,i) => {
        const a = (i*45)*Math.PI/180;
        const cx = 110 + Math.cos(a)*45, cy = 178 + Math.sin(a)*45;
        return <ellipse key={i} cx={cx} cy={cy} rx="12" ry="7" fill="none" stroke="#b8860b" strokeWidth="1" transform={`rotate(${i*45},${cx},${cy})`} opacity="0.7"/>;
      })}
      <circle cx="110" cy="178" r="60" fill="none" stroke="#b8860b" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="110" cy="178" r="32" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.6"/>
      <circle cx="110" cy="178" r="16" fill="none" stroke="#b8860b" strokeWidth="1.5" opacity="0.8"/>
      {Array.from({length:8},(_,i) => {
        const a = (i*45-90)*Math.PI/180;
        return <line key={i} x1="110" y1="178" x2={110+Math.cos(a)*14} y2={178+Math.sin(a)*14} stroke="#b8860b" strokeWidth="1.5"/>;
      })}
      <circle cx="110" cy="178" r="5" fill="#b8860b"/>
      <text x="110" y="32" textAnchor="middle" fill="#b8860b" fontSize="14" opacity="0.8">✦</text>
      <text x="110" y="348" textAnchor="middle" fill="#b8860b" fontSize="14" opacity="0.8">✦</text>
    </svg>
  );
}

/* ─── Mini card for grid ──────────────────────────────────────── */
function MiniCardBack({ selected, selectionOrder }: { selected: boolean; selectionOrder?: number }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-150 active:scale-95"
      style={{
        width: 60, height: 95,
        boxShadow: selected
          ? '0 0 0 2.5px #b8860b, 0 4px 16px rgba(184,134,11,0.5)'
          : '0 2px 8px rgba(0,0,0,0.5)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0542] to-[#060118]" />
      <div className="absolute inset-[3px] border border-[#b8860b] rounded opacity-70" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-[#b8860b] border-opacity-60 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#b8860b] opacity-70" />
        </div>
      </div>
      {selected && selectionOrder !== undefined && (
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#b8860b] flex items-center justify-center">
          <span className="text-black text-[9px] font-black">{selectionOrder}</span>
        </div>
      )}
    </div>
  );
}

type CardLocale = 'ko' | 'en' | 'ja' | 'es';

/* ─── Full card face for reading ─────────────────────────────── */
function ReadingCard({ card, locale }: { card: Tarot3Card; locale: CardLocale }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        width: 100, height: 156,
        boxShadow: '0 0 0 1.5px #b8860b, 0 8px 32px rgba(0,0,0,0.7)',
      }}
    >
      <div className="absolute inset-0 bg-[#0e0620]" />
      <div className="absolute inset-[4px] border border-[#b8860b] rounded-lg opacity-70" />
      <div className="absolute top-[4px] left-[4px] right-[4px] h-5 flex items-center justify-center">
        <span className="text-[#ffd700] text-[8px] font-bold tracking-widest font-serif">{card.roman}</span>
      </div>
      <div className="absolute top-[24px] left-[5px] right-[5px] bottom-[20px] overflow-hidden rounded border border-[#b8860b] border-opacity-40">
        <CardIllustration id={card.id} />
      </div>
      <div className="absolute bottom-[4px] left-[4px] right-[4px] h-4 flex items-center justify-center">
        <span className="text-[#ffd700] text-[7px] font-bold tracking-wide font-serif text-center leading-tight truncate px-1">{card.name[locale]}</span>
      </div>
    </div>
  );
}

/* ─── Main Tarot Component ────────────────────────────────────── */
type Phase = 'intro' | 'selection' | 'reading';

export default function Tarot() {
  const { t, i18n } = useTranslation();
  const rawLocale = i18n.language?.slice(0, 2) ?? 'ko';
  const safeLocale: CardLocale = (['ko','en','ja','es'] as CardLocale[]).includes(rawLocale as CardLocale)
    ? (rawLocale as CardLocale) : 'ko';

  const [phase, setPhase] = useState<Phase>('intro');
  const [question, setQuestion] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const shuffled = useMemo(
    () => [...TAROT3_CARDS].sort(() => Math.random() - 0.5),
    []
  );

  const handleCardClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(s => s !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleRead = () => {
    const selected = selectedIds
      .map(id => TAROT3_CARDS.find(c => c.id === id)!)
      .filter(Boolean);
    selected.forEach(c => trackTarotDraw(c.name[safeLocale]));
    setPhase('reading');
    setTimeout(() => setRevealed(true), 300);
  };

  const handleReset = () => {
    setPhase('intro');
    setQuestion('');
    setSelectedIds([]);
    setRevealed(false);
  };

  const selectedCards: Tarot3Card[] = selectedIds
    .map(id => TAROT3_CARDS.find(c => c.id === id)!)
    .filter(Boolean);

  const positions = [
    t('tarot3.position1'),
    t('tarot3.position2'),
    t('tarot3.position3'),
  ];

  const positionKeys: ('present' | 'advice' | 'future')[] = ['present', 'advice', 'future'];

  return (
    <Layout>
      <div className="relative min-h-screen -mx-4 sm:-mx-6 -mt-6 px-4 sm:px-6 pt-8 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080420] via-[#0d0630] to-[#120840]" />
        {STARS.map((star, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: star.delay }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <p className="text-violet-300/70 text-xs font-bold tracking-[0.25em] uppercase mb-2">✦ TAROT ✦</p>
            <h1 className="text-3xl font-black text-white mb-2 leading-tight">{t('tarot3.title')}</h1>
            <p className="text-violet-200/60 text-sm leading-relaxed max-w-xs mx-auto">{t('tarot3.subtitle')}</p>
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── INTRO PHASE ─────────────────────────────────── */}
            {phase === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 mb-5">
                  <label className="block text-violet-200/80 text-sm font-semibold mb-1">
                    {t('tarot3.questionLabel')}
                    <span className="text-violet-400/60 text-xs font-normal ml-1">{t('tarot3.questionOptional')}</span>
                  </label>
                  <textarea
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder={t('tarot3.questionPlaceholder')}
                    className="w-full bg-transparent text-white placeholder-violet-400/40 text-sm resize-none outline-none mt-1 leading-relaxed"
                    rows={3}
                    maxLength={200}
                  />
                </div>

                {/* Decorative card preview */}
                <div className="flex justify-center gap-3 mb-7 opacity-60">
                  {[0,1,2].map(i => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                      <CardBack w={65} h={105} />
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => setPhase('selection')}
                  className="w-full h-13 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-violet-900/40 border-0 transition-all"
                >
                  {t('tarot3.continueBtn')} →
                </Button>
              </motion.div>
            )}

            {/* ── SELECTION PHASE ─────────────────────────────── */}
            {phase === 'selection' && (
              <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <p className="text-center text-violet-200/70 text-sm mb-3 font-medium">{t('tarot3.selectInstruction')}</p>
                <p className="text-center text-violet-300/90 text-sm font-bold mb-4">
                  {t('tarot3.selectedCount', { count: selectedIds.length })}
                </p>

                {/* 22-card grid */}
                <div className="grid grid-cols-5 gap-2 justify-items-center mb-5">
                  {shuffled.map((card, idx) => {
                    const orderIdx = selectedIds.indexOf(card.id);
                    const sel = orderIdx !== -1;
                    return (
                      <motion.div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        whileTap={{ scale: 0.92 }}
                        animate={sel ? { y: -4 } : { y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="cursor-pointer"
                      >
                        <MiniCardBack selected={sel} selectionOrder={sel ? orderIdx + 1 : undefined} />
                      </motion.div>
                    );
                  })}
                </div>

                <Button
                  onClick={selectedIds.length === 3 ? handleRead : undefined}
                  disabled={selectedIds.length < 3}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg shadow-violet-900/40 border-0 transition-all"
                >
                  {selectedIds.length < 3
                    ? t('tarot3.readBtnHint')
                    : t('tarot3.readBtn')}
                </Button>
              </motion.div>
            )}

            {/* ── READING PHASE ───────────────────────────────── */}
            {phase === 'reading' && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                {/* Question echo */}
                {question.trim() && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-5 text-center">
                    <p className="text-violet-300/70 text-xs mb-1">✦</p>
                    <p className="text-violet-100/80 text-sm italic leading-relaxed">"{question}"</p>
                  </div>
                )}

                {/* 3 cards row */}
                <div className="flex justify-center gap-3 mb-6">
                  {selectedCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, rotateY: 90, y: 20 }}
                      animate={revealed ? { opacity: 1, rotateY: 0, y: 0 } : { opacity: 0 }}
                      transition={{ delay: i * 0.25, duration: 0.5, type: 'spring', stiffness: 120 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <p className="text-violet-300/60 text-[10px] font-semibold tracking-widest uppercase text-center leading-tight"
                         style={{ maxWidth: 100 }}>
                        {positions[i]}
                      </p>
                      <ReadingCard card={card} locale={safeLocale} />
                    </motion.div>
                  ))}
                </div>

                {/* Card readings */}
                <div className="space-y-4 mb-6">
                  {selectedCards.map((card, i) => {
                    const posKey = positionKeys[i] as 'present' | 'advice' | 'future';
                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ delay: 0.7 + i * 0.2 }}
                        className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="shrink-0 w-6 h-6 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/50 flex items-center justify-center">
                            <span className="text-[#ffd700] text-[10px] font-black">{i + 1}</span>
                          </div>
                          <div>
                            <p className="text-violet-300/60 text-[10px] font-semibold tracking-widest uppercase">{positions[i]}</p>
                            <p className="text-[#ffd700] font-bold text-sm">{card.name[safeLocale]}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3 ml-9">
                          {card.keywords[safeLocale].map(kw => (
                            <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-900/60 text-violet-200/80 border border-violet-700/40">
                              {kw}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-violet-100/80 leading-relaxed ml-9">{card.reading[posKey][safeLocale]}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Synthesis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-gradient-to-b from-violet-900/30 to-indigo-900/30 border border-violet-700/30 rounded-2xl p-5 mb-5"
                >
                  <p className="text-violet-300/60 text-[10px] font-semibold tracking-widest uppercase mb-1">{t('tarot3.synthesisSubtitle')}</p>
                  <p className="text-white font-bold text-base mb-3">{t('tarot3.synthesisTitle')}</p>
                  <div className="space-y-2">
                    {selectedCards.map(card => (
                      <p key={card.id} className="text-sm text-violet-100/70 leading-relaxed">
                        <span className="text-[#ffd700]/80 font-semibold">{card.name[safeLocale]}</span>
                        {' — '}{card.daily[safeLocale]}
                      </p>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <Button
                    onClick={handleReset}
                    className="w-full h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md transition-all"
                  >
                    🔮 {t('tarot3.resetBtn')}
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

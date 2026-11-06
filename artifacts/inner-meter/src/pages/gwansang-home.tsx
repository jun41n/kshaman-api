import { motion } from "framer-motion";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getFaceReadingCopy } from "@/lib/face-reading-copy";

interface GwansangHomeProps {
  onStart: () => void;
  variant?: "face" | "pastLife";
}

export function GwansangHome({ onStart, variant = "face" }: GwansangHomeProps) {
  const { i18n } = useTranslation();
  const isPastLife = variant === "pastLife";
  const copy = getFaceReadingCopy(i18n.language).home;
  const features = copy.features.map((feature, index) => ({ mark: ["一", "二", "三", "四"][index], ...feature }));

  return (
    <div className="paper-grain relative overflow-hidden bg-[#e8c88f] text-[#2a1b16]" style={{ minHeight: "80vh" }}>
      <div className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: "radial-gradient(#70442b 0.7px, transparent 0.7px)", backgroundSize: "17px 17px" }} />
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#9b5a3b]/20" />
      <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full border border-[#9b5a3b]/15" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-9 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-12 md:py-16 lg:px-20">
        <div>
          <motion.div className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-[#7b3f2b]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <span className="h-px w-10 bg-[#9b5a3b]" /> {isPastLife ? copy.pastEyebrow : copy.faceEyebrow}
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.35 }}>
            <img src={`${import.meta.env.BASE_URL}${isPastLife ? "past-life.png" : "gwansang.png"}`} alt={isPastLife ? copy.pastEyebrow : copy.faceEyebrow} className="h-[74px] w-auto object-contain object-left mix-blend-multiply md:h-[104px]" style={{ filter: "sepia(0.18) contrast(1.08) drop-shadow(1px 2px 3px rgba(60,30,5,0.25))" }} />
            {isPastLife ? (
              <h1 className="mt-4 max-w-[720px] font-serif text-[40px] font-semibold leading-[1.12] tracking-normal text-[#281915] md:text-[68px]">{copy.pastTitleFirst} <span className="text-[#8c3f2b]">{copy.pastTitleAccent}</span></h1>
            ) : (
              <h1 className="mt-4 max-w-[560px] font-serif text-[32px] font-semibold leading-[1.18] tracking-normal text-[#281915] md:text-[50px]">{copy.faceTitleFirst}<br /><span className="text-[#8c3f2b]">{copy.faceTitleAccent}</span></h1>
            )}
            <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-[#684a3e] md:text-[16px]">{isPastLife ? copy.pastDescription : copy.faceDescription}</p>
          </motion.div>
          <motion.div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
            <button onClick={onStart} className="group flex h-14 items-center justify-center gap-3 rounded-sm bg-[#281915] px-7 text-[15px] font-bold text-[#f8e7bd] shadow-[5px_5px_0_#9b5a3b] transition-transform hover:-translate-y-0.5 active:translate-y-0"><Camera size={19} />{isPastLife ? copy.pastCta : copy.faceCta}<ArrowRight className="transition-transform group-hover:translate-x-1" size={18} /></button>
            {!isPastLife && <span className="whitespace-pre-line text-[11px] leading-5 text-[#79594b]">{copy.photoNote}</span>}
          </motion.div>
        </div>

        <motion.div className="relative" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <div className="relative border-[10px] border-[#f1d8a5] bg-[#f3dfb4] p-2 shadow-[8px_10px_0_rgba(101,54,33,0.22)] md:rotate-[1.5deg]">
          <div className="relative aspect-[4/3] overflow-hidden border border-[#9b5a3b]/45 bg-[#d5b27a]"><img src={`${import.meta.env.BASE_URL}gwansang-thumb.png`} alt={copy.chartCaption} className="h-full w-full object-cover sepia-[.18]" /><div className="absolute inset-0 bg-gradient-to-t from-[#2a1b16]/70 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#f7e6be]"><div><p className="font-serif text-2xl font-semibold">觀相</p><p className="mt-1 text-[11px] tracking-[0.16em]">{copy.chartCaption}</p></div><span className="border border-[#f7e6be]/60 px-2 py-1 text-[10px]">MYTESTTYPE</span></div></div>
            <div className="mt-3 flex items-center justify-between border-t border-[#9b5a3b]/25 pt-3 text-[11px] text-[#79594b]"><span className="flex items-center gap-1.5"><Sparkles size={13} /> {copy.chartFooter}</span><span>相 · 面 · 心</span></div>
          </div>
          <span className="absolute -bottom-5 -left-3 font-serif text-5xl text-[#9b5a3b]/45">印</span>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-6xl border-t border-[#9b5a3b]/30 px-5 py-7 md:px-12 lg:px-20"><div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">{features.map((feature, index) => <motion.div key={feature.mark} className="flex gap-3 border-b border-[#9b5a3b]/25 py-4 sm:border-r sm:px-5 sm:first:pl-0 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 + index * 0.06 }}><span className="font-serif text-xl text-[#8c3f2b]">{feature.mark}</span><div><p className="text-[13px] font-bold text-[#3a241c]">{feature.title}</p><p className="mt-1 text-[11px] leading-5 text-[#79594b]">{feature.description}</p></div></motion.div>)}</div></div>
    </div>
  );
}

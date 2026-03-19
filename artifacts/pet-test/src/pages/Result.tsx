import { useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { getPetTest, PetType } from "@/data/petData";
import PetShareCard from "@/components/PetShareCard";

export default function Result() {
  const params = useParams<{ type: string; key: string }>();
  const petType = params.type as PetType;
  const resultKey = params.key;
  const [, navigate] = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const test = getPetTest(petType);
  const result = test.results.find((r) => r.key === resultKey);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8B6650]">결과를 찾을 수 없어요.</p>
      </div>
    );
  }

  async function handleSaveImage() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: result!.cardBg,
      });
      const link = document.createElement("a");
      link.download = `pet-result-${resultKey}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF8F2] flex flex-col items-center pb-10">
      <div className="w-full max-w-sm px-4 pt-6">
        <button
          className="text-[#8B6650] text-sm mb-6 flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          ← 처음으로
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-sm text-[#8B6650] font-semibold mb-3 uppercase tracking-wider">
            {test.emoji} {test.label}용 테스트 결과
          </p>

          <div ref={cardRef} className="rounded-3xl overflow-hidden shadow-xl mb-6">
            <PetShareCard result={result} petType={petType} />
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
            <h3 className="text-[#3D2B1F] font-bold text-base mb-2">설명</h3>
            <p className="text-[#5A3E2B] text-sm leading-relaxed">{result.description}</p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
            <h3 className="text-[#3D2B1F] font-bold text-base mb-3">특징</h3>
            <ul className="space-y-2">
              {result.traits.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#5A3E2B]">
                  <span className="text-base leading-none mt-0.5">✅</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl p-5 shadow-sm mb-6"
            style={{ background: result.gradient }}>
            <p className="text-white font-bold text-sm mb-1">💑 나와 잘 맞는 보호자</p>
            <p className="text-white/90 text-sm font-semibold mb-3">{result.compatibleOwner}</p>
            <div className="bg-white/20 rounded-2xl p-3">
              <p className="text-white text-xs leading-relaxed">
                💡 <span className="font-semibold">보호자 TIP</span><br />
                {result.ownerTip}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              className="w-full py-4 rounded-2xl font-bold text-base text-white shadow-md flex items-center justify-center gap-2 transition-opacity"
              style={{ background: result.cardBg, opacity: saving ? 0.7 : 1 }}
              onClick={handleSaveImage}
              disabled={saving}
            >
              📸 {saving ? "저장 중..." : "이미지 저장하기"}
            </button>

            <button
              className="w-full py-4 rounded-2xl font-bold text-base border-2 border-[#F0E4D8] bg-white text-[#3D2B1F] shadow-sm flex items-center justify-center gap-2 transition-colors"
              onClick={handleCopyLink}
            >
              🔗 {copied ? "링크 복사됨!" : "친구에게 공유하기"}
            </button>

            <button
              className="w-full py-3 rounded-2xl font-semibold text-sm text-[#8B6650] bg-[#F0E4D8] transition-colors"
              onClick={() => navigate(`/quiz/${petType}`)}
            >
              다시 테스트하기
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

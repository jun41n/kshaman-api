import { useRef, useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link2, Check, Download, Loader2, RotateCcw, Grid2x2 } from "lucide-react";
import { getPetTest, PetType } from "@/data/petData";
import PetShareCard from "@/components/PetShareCard";

async function downloadCardAsPng(el: HTMLDivElement, filename: string): Promise<Blob | null> {
  const { toBlob } = await import("html-to-image");
  const opts = { pixelRatio: 2, cacheBust: true, skipFonts: true, style: { borderRadius: '28px' } };
  await toBlob(el, opts).catch(() => null);
  const blobPromise = toBlob(el, opts);
  const timeout = new Promise<null>((_, reject) => setTimeout(() => reject(new Error('timeout')), 12_000));
  return Promise.race([blobPromise, timeout]);
}

export default function Result() {
  const params = useParams<{ type: string; key: string }>();
  const petType = params.type as PetType;
  const resultKey = params.key;
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  const cardRef = useRef<HTMLDivElement>(null!);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardScale, setCardScale] = useState(1);

  const test = getPetTest(petType);
  const result = test.results.find((r) => r.key === resultKey);

  const updateCardScale = useCallback(() => {
    if (!previewWrapperRef.current) return;
    const available = previewWrapperRef.current.clientWidth;
    setCardScale(Math.min(1, available / 360));
  }, []);

  useEffect(() => {
    updateCardScale();
    window.addEventListener('resize', updateCardScale);
    return () => window.removeEventListener('resize', updateCardScale);
  }, [updateCardScale]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t('result.notFound')}</p>
      </div>
    );
  }

  const labelKey = petType === 'dog' ? 'quiz.dogLabel' : 'quiz.catLabel';
  const rKey = `${petType}.results.${resultKey}`;

  async function handleSaveImage() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const blob = await downloadCardAsPng(cardRef.current, `pet-result-${resultKey}`);
      if (!blob) throw new Error('Failed to generate image');

      const file = new File([blob], `pet-result-${resultKey}.png`, { type: 'image/png' });
      const canShareFile = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

      if (canShareFile) {
        await navigator.share({ files: [file], title: t(`${rKey}.title`) });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pet-result-${resultKey}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2800);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.warn('Image save failed', err);
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: t(`${rKey}.title`), url: window.location.href });
          setSaved(true);
          setTimeout(() => setSaved(false), 2800);
          return;
        } catch { /* ignore */ }
      }
      alert(t('result.saveError'));
    } finally {
      setSaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2800);
  }

  return (
    <div className="flex-1 flex flex-col items-center pb-10">
      <div className="w-full max-w-xl px-4 pt-6">
        <button
          className="text-muted-foreground text-sm mb-6 flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => navigate("/")}
        >
          {t('nav.back')}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-sm text-muted-foreground font-semibold mb-3 uppercase tracking-wider">
            {test.emoji} {t('result.heading', { label: t(labelKey) })}
          </p>

          {/* ── Result Hero Card ── */}
          <div className="rounded-3xl overflow-hidden shadow-xl mb-5">
            <PetShareCard result={result} petType={petType} />
          </div>

          {/* ── Description ── */}
          <div className="bg-card rounded-[1.5rem] p-6 border border-border shadow-sm mb-4">
            <h3 className="text-foreground font-bold text-base mb-2">{t('result.descSection')}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t(`${rKey}.description`)}</p>
          </div>

          {/* ── Traits ── */}
          <div className="bg-card rounded-[1.5rem] p-6 border border-border shadow-sm mb-4">
            <h3 className="text-foreground font-bold text-base mb-3">{t('result.traitsSection')}</h3>
            <ul className="space-y-2">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i + 1}</span>
                  <span>{t(`${rKey}.trait${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Owner Match ── */}
          <div className="rounded-3xl p-5 shadow-sm mb-6" style={{ background: result.gradient }}>
            <p className="text-white font-bold text-sm mb-1">{t('result.ownerLabel')}</p>
            <p className="text-white/90 text-sm font-semibold mb-3">{t(`${rKey}.compatibleOwner`)}</p>
            <div className="bg-white/20 rounded-2xl p-3">
              <p className="text-white text-xs leading-relaxed">
                💡 <span className="font-semibold">{t('result.tipLabel')}</span><br />
                {t(`${rKey}.ownerTip`)}
              </p>
            </div>
          </div>

          {/* ── Share Card Section — dark cosmic (matches InnerMeter) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="relative rounded-[1.75rem] overflow-hidden mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-950" />
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.30) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.18) 0%, transparent 50%)' }} />
            {(['8% 8%','90% 10%','5% 88%','88% 85%','50% 50%'] as const).map((pos, i) => (
              <span key={i} className="absolute text-white/15 text-xs select-none pointer-events-none"
                style={{ top: pos.split(' ')[1], left: pos.split(' ')[0] }}>✦</span>
            ))}

            <div className="relative z-10 p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-black text-white mb-1">{t('result.shareCardTitle')}</h3>
                <p className="text-white/55 text-sm">{t('result.shareCardSub')}</p>
              </div>

              {/* Card Preview */}
              <div ref={previewWrapperRef} className="w-full flex justify-center mb-5">
                <div style={{
                  width: `${Math.round(360 * cardScale)}px`,
                  height: `${Math.round(480 * cardScale)}px`,
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: '28px',
                  filter: 'drop-shadow(0 20px 60px rgba(139,92,246,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                }}>
                  <div style={{
                    width: '360px',
                    height: '480px',
                    transformOrigin: 'top left',
                    transform: `scale(${cardScale})`,
                  }}>
                    <div ref={cardRef}>
                      <PetShareCard result={result} petType={petType} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 친구랑 비교하기 / 이미지 저장 buttons ── */}
              <div className="flex flex-col gap-3 mb-4">
                <button
                  onClick={handleCopyLink}
                  className={`w-full flex items-center justify-center gap-2.5 rounded-2xl h-14 text-[0.95rem] font-black transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-xl shadow-black/30 ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-white text-gray-900 hover:bg-white/90'
                  }`}
                >
                  {copied
                    ? <><Check className="w-5 h-5" />{t('result.linkCopied')}</>
                    : <><Link2 className="w-5 h-5" />{t('result.compareWithFriends')}</>
                  }
                </button>

                <button
                  onClick={handleSaveImage}
                  disabled={saving}
                  className={`w-full flex items-center justify-center gap-2.5 rounded-2xl h-11 text-sm font-bold text-white/80 border border-white/20 hover:bg-white/10 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" />{t('result.savingImage')}</>
                    : saved
                    ? <><Check className="w-4 h-4" />{t('result.imageSaved')}</>
                    : <><Download className="w-4 h-4" />{t('common.saveImage')}</>
                  }
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Actions ── */}
          <div className="flex flex-col gap-2.5 mb-10">
            <button
              onClick={() => navigate(`/quiz/${petType}`)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl h-13 py-3.5 text-[0.95rem] font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
            >
              <RotateCcw className="w-4 h-4" />{t('common.retake')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 rounded-2xl h-12 text-[0.95rem] font-bold border border-border bg-card text-foreground hover:-translate-y-0.5 transition-transform"
            >
              <Grid2x2 className="w-4 h-4" />{t('common.takeOther')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

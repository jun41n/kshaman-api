import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Hand, Sparkles, ScanFace, ScrollText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NativeBannerAd } from "@/components/NativeBannerAd";
interface LayoutProps {
  children: ReactNode;
  showAd?: boolean;
}

const K_SHAMAN_URL = "https://mytesttype.com/k-shaman/";
const PAPER_LABELS: Record<string, { past: string; face: string; palm: string; saju: string; service: string; privacy: string; contact: string; description: string }> = {
  ko: { past: "전생", face: "관상", palm: "손금", saju: "사주", service: "서비스", privacy: "개인정보 처리방침", contact: "문의", description: "AI 전생·관상·손금과 K-Shaman AI 사주를 문화·오락 목적으로 제공합니다." },
  en: { past: "Past Life", face: "Face Reading", palm: "Palm Reading", saju: "Saju", service: "Services", privacy: "Privacy Policy", contact: "Contact", description: "Cultural, entertainment-oriented AI past-life, face-reading, palm-reading, and K-Shaman AI Saju." },
  ja: { past: "前世", face: "観相", palm: "手相", saju: "四柱推命", service: "サービス", privacy: "プライバシーポリシー", contact: "お問い合わせ", description: "AI前世・観相・手相とK-Shaman四柱推命を文化・娯楽目的で提供しています。" },
  es: { past: "Vida pasada", face: "Lectura facial", palm: "Lectura de palma", saju: "Saju", service: "Servicios", privacy: "Privacidad", contact: "Contacto", description: "Ofrecemos lecturas de vida pasada, rostro, palma y Saju con IA para fines culturales y de entretenimiento." },
  "pt-BR": { past: "Vida passada", face: "Leitura facial", palm: "Leitura da palma", saju: "Saju", service: "Serviços", privacy: "Privacidade", contact: "Contato", description: "Oferecemos leituras de vida passada, rosto, palma e Saju com IA para fins culturais e de entretenimento." },
  fr: { past: "Vie antérieure", face: "Lecture du visage", palm: "Lecture de la paume", saju: "Saju", service: "Services", privacy: "Confidentialité", contact: "Contact", description: "Nous proposons des lectures IA de vie antérieure, du visage, de la paume et du Saju à des fins culturelles et de divertissement." },
};
const GUIDE_LABELS: Record<string, { title: string; past: string; face: string; palm: string; saju: string }> = {
  ko: { title: "읽을거리", past: "전생 가이드", face: "관상 가이드", palm: "손금 가이드", saju: "사주 가이드" },
  en: { title: "Guides", past: "Past-life guide", face: "Face-reading guide", palm: "Palm-reading guide", saju: "Saju guide" },
  ja: { title: "ガイド", past: "前世ガイド", face: "観相ガイド", palm: "手相ガイド", saju: "四柱推命ガイド" },
  es: { title: "Guías", past: "Guía de vida pasada", face: "Guía de lectura facial", palm: "Guía de lectura de palma", saju: "Guía de Saju" },
  "pt-BR": { title: "Guias", past: "Guia de vida passada", face: "Guia de leitura facial", palm: "Guia de leitura da palma", saju: "Guia de Saju" },
  fr: { title: "Guides", past: "Guide de vie antérieure", face: "Guide de lecture du visage", palm: "Guide de lecture de la paume", saju: "Guide du Saju" },
};

export function Layout({ children, showAd = false }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.toLowerCase().startsWith("pt") ? "pt-BR" : i18n.language?.split("-")[0] || "ko";
  const paperLabels = PAPER_LABELS[locale] ?? PAPER_LABELS.en;
  const guideLabels = GUIDE_LABELS[locale] ?? GUIDE_LABELS.en;
  const [location] = useLocation();
  const isPastLifePage = location === "/";
  const isFacePage = location.startsWith("/gwansang");
  const isPalmPage = location.startsWith("/palm-reading");
  const isPaperPage = isPastLifePage || isFacePage || isPalmPage;
  const currentServiceLabel = isPastLifePage
    ? paperLabels.past
    : isFacePage
      ? paperLabels.face
      : isPalmPage
        ? paperLabels.palm
        : null;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans text-foreground ${isPaperPage ? "bg-[#e8c88f]" : "bg-background"}`}>

      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isPaperPage
            ? isScrolled
              ? "bg-[#e8c88f]/95 backdrop-blur-md shadow-sm"
              : "bg-[#e8c88f]"
            : isScrolled
              ? "bg-background/80 backdrop-blur-md shadow-sm"
              : "bg-transparent"
        }`}
      >
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display text-sm font-bold tracking-tight text-foreground">
                MyTestType
              </span>
            </Link>
            {currentServiceLabel && (
              <span className="hidden sm:inline-flex items-center rounded-full border border-[#6f2f24]/30 bg-[#3b1d17]/10 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-[#3b1d17]">
                {currentServiceLabel}
              </span>
            )}

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {!isPastLifePage && <Link
                href="/"
                className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center">
                  <ScrollText className="w-3 h-3" />
                </div>
                <span>{paperLabels.past}</span>
              </Link>}
              {!isFacePage && <Link
                href="/gwansang/"
                className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center">
                  <ScanFace className="w-3 h-3" />
                </div>
                <span>{paperLabels.face}</span>
              </Link>}
              {!isPalmPage && <Link
                href="/palm-reading/"
                className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center">
                  <Hand className="w-3 h-3" />
                </div>
                <span>{paperLabels.palm}</span>
              </Link>}
              <a
                href={K_SHAMAN_URL}
                className="flex items-center gap-1.5 text-sm font-bold group"
              >
                <div className="w-5 h-5 rounded-md bg-gradient-primary flex items-center justify-center text-white shadow-sm shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="shaman-holo">{t('nav.shaman')}</span>
              </a>
              <LanguageSwitcher />
            </nav>

            {/* Mobile: direct category links. The menu is intentionally omitted. */}
            <div className="md:hidden flex items-center gap-2">
              {!isPastLifePage && <Link
                href="/"
                className="p-2 text-foreground"
                aria-label={paperLabels.past}
              >
                <ScrollText className="w-5 h-5" />
              </Link>}
              {!isFacePage && <Link
                href="/gwansang/"
                className="p-2 text-foreground"
                aria-label={paperLabels.face}
              >
                <ScanFace className="w-5 h-5" />
              </Link>}
              {!isPalmPage && <Link
                href="/palm-reading/"
                className="p-2 text-foreground"
                aria-label={paperLabels.palm}
              >
                <Hand className="w-5 h-5" />
              </Link>}
              <a
                href={K_SHAMAN_URL}
                className="p-2 text-foreground"
                aria-label={t('nav.shaman')}
              >
                <Sparkles className="w-5 h-5" />
              </a>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Gradient line when scrolled */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

      </header>

      {/* ── Main ── */}
      <main className={`flex-grow w-full flex flex-col items-center ${isPaperPage ? "bg-[#e8c88f]" : ""}`}>
        <div className={`w-full max-w-5xl px-4 sm:px-6 ${isPaperPage ? "py-0" : "py-6 md:py-10"}`}>
          {children}
        </div>
        {showAd && (
          <div className="w-full max-w-xl px-4 pb-6">
            <NativeBannerAd />
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-border bg-card mt-auto">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">

            {/* Brand */}
            <div className="flex flex-col gap-1.5">
              <span className="font-display font-bold text-base text-foreground flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                MyTestType
              </span>
              <p className="text-sm text-muted-foreground max-w-[220px]">{paperLabels.description}</p>
              <div className="mt-2 text-xs text-muted-foreground/55 leading-relaxed space-y-0.5">
                <p>Lee Hyejin | 30, Deoksong 1-ro, Namyangju-si, Gyeonggi-do | proofcom26@gmail.com</p>
                <p>Notice: {t('footer.notice')}</p>
              </div>
            </div>

            {/* Public services and contact */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">
                  {paperLabels.service}
                </p>
                <div className="flex flex-col gap-2.5 text-sm font-medium text-muted-foreground">
                  <Link href="/" className="hover:text-primary transition-colors">
                    {paperLabels.past}
                  </Link>
                  <Link href="/gwansang/" className="hover:text-primary transition-colors">
                    {paperLabels.face}
                  </Link>
                  <Link href="/palm-reading/" className="hover:text-primary transition-colors">
                    {paperLabels.palm}
                  </Link>
                  <a href={K_SHAMAN_URL} className="hover:text-primary transition-colors">
                    K-Shaman AI {paperLabels.saju}
                  </a>
                  <a href="/privacy/" className="hover:text-primary transition-colors">
                    {paperLabels.privacy}
                  </a>
                  <a href="/contact/" className="hover:text-primary transition-colors">
                    {paperLabels.contact}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">{guideLabels.title}</p>
                <div className="flex flex-col gap-2.5 text-sm font-medium text-muted-foreground">
                  <Link href="/guide/past-life/" className="hover:text-primary transition-colors">{guideLabels.past}</Link>
                  <Link href="/guide/face/" className="hover:text-primary transition-colors">{guideLabels.face}</Link>
                  <Link href="/guide/palm/" className="hover:text-primary transition-colors">{guideLabels.palm}</Link>
                  <Link href="/guide/saju/" className="hover:text-primary transition-colors">{guideLabels.saju}</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border/50 text-center text-xs text-muted-foreground/50 font-medium">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>

    </div>
  );
}

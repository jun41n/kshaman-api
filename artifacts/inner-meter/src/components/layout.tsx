import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Hand, Menu, X, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NativeBannerAd } from "@/components/NativeBannerAd";
interface LayoutProps {
  children: ReactNode;
  showAd?: boolean;
}

const K_SHAMAN_URL = "https://mytesttype.com/k-shaman/";

export function Layout({ children, showAd = false }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language?.startsWith("ko");
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">

      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/gwansang/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                MyTestType
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/palm-reading/"
                className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                title={isKo ? "손금 서비스 준비 중" : "Palm reading coming soon"}
              >
                <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center">
                  <Hand className="w-3 h-3" />
                </div>
                <span>{isKo ? "손금" : "Palm Reading"}</span>
              </Link>
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

            {/* Mobile: language switcher + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={t('common.menuToggle')}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient line when scrolled */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[calc(100%+1px)] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 gap-2">
              <Link
                href="/palm-reading/"
                className="px-4 py-3 rounded-xl text-base font-bold flex items-center gap-2 text-muted-foreground hover:bg-muted transition-colors"
                title={isKo ? "손금 서비스 준비 중" : "Palm reading coming soon"}
              >
                <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                  <Hand className="w-3.5 h-3.5" />
                </div>
                <span>{isKo ? "손금" : "Palm Reading"}</span>
              </Link>
              <a
                href={K_SHAMAN_URL}
                className="px-4 py-3 rounded-xl text-base font-bold transition-colors hover:bg-muted flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center text-white shadow-sm shadow-primary/30">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="shaman-holo">{t('nav.shaman')}</span>
              </a>
              <div className="pt-2 pb-1">
                <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-wider px-4 mb-2">Language</p>
                <LanguageSwitcher compact />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-5xl px-4 sm:px-6 py-6 md:py-10">
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
              <p className="text-sm text-muted-foreground max-w-[220px]">
                {isKo
                  ? "AI 관상과 K-Shaman AI 사주를 문화·오락 목적으로 제공합니다."
                  : "Cultural, entertainment-oriented AI face reading and K-Shaman AI Saju."}
              </p>
              <div className="mt-2 text-xs text-muted-foreground/55 leading-relaxed space-y-0.5">
                <p>Lee Hyejin | 30, Deoksong 1-ro, Namyangju-si, Gyeonggi-do | proofcom26@gmail.com</p>
                <p>Notice: {t('footer.notice')}</p>
              </div>
            </div>

            {/* Public services and contact */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">
                  {isKo ? "서비스" : "Services"}
                </p>
                <div className="flex flex-col gap-2.5 text-sm font-medium text-muted-foreground">
                  <Link href="/gwansang/" className="hover:text-primary transition-colors">
                    {isKo ? "AI 관상" : "AI Face Reading"}
                  </Link>
                  <Link href="/palm-reading/" className="hover:text-primary transition-colors">
                    {isKo ? "AI 손금" : "AI Palm Reading"}
                  </Link>
                  <a href={K_SHAMAN_URL} className="hover:text-primary transition-colors">
                    K-Shaman AI {isKo ? "사주" : "Saju"}
                  </a>
                  <a href="/privacy/" className="hover:text-primary transition-colors">
                    {isKo ? "개인정보 처리방침" : "Privacy Policy"}
                  </a>
                  <a
                    href="mailto:proofcom26@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    {isKo ? "문의" : "Contact"}
                  </a>
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

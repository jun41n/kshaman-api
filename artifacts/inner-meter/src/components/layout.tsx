import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
interface LayoutProps {
  children: ReactNode;
  showAd?: boolean;
}

export function Layout({ children, showAd = false }: LayoutProps) {
  const { t } = useTranslation();
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

  const navLinks = [
    { href: "/tests",  label: t('nav.tests') },
    { href: "/tarot",  label: t('nav.tarot') },
  ];

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
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                MyTestType
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-colors hover:text-primary ${
                    location.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/k-shaman/"
                className="flex items-center gap-1.5 text-sm font-bold group"
              >
                <div className="w-5 h-5 rounded-md bg-gradient-primary flex items-center justify-center text-white shadow-sm shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="shaman-holo">{t('nav.shaman')}</span>
              </a>
              <LanguageSwitcher />
              <Button asChild variant="default" className="rounded-full shadow-md shadow-primary/20 font-bold px-6">
                <Link href="/tests">{t('nav.start')}</Link>
              </Button>
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    location.startsWith(link.href) ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/k-shaman/"
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
              <div className="pt-2 pb-2 border-t border-border mt-1">
                <Button asChild className="w-full bg-gradient-primary text-white font-bold h-13 rounded-2xl shadow-lg text-base">
                  <Link href="/tests">{t('nav.startLong')}</Link>
                </Button>
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
                {t('footer.tagline')}
              </p>
              <div className="mt-2 text-xs text-muted-foreground/55 leading-relaxed space-y-0.5">
                <p>Choi Young-jun | 30, Deoksong 1-ro, Namyangju-si, Gyeonggi-do | meaningout_d@naver.com</p>
                <p>Notice: {t('footer.notice')}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              {/* 정보 */}
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">{t('footer.info')}</p>
                <div className="flex flex-col gap-2.5 text-sm font-medium text-muted-foreground">
                  <Link href="/about"   className="hover:text-primary transition-colors">{t('footer.about')}</Link>
                  <Link href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
                  <Link href="/terms"   className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
                  <Link href="/contact" className="hover:text-primary transition-colors">{t('footer.contact')}</Link>
                  <Link href="/blog"    className="hover:text-primary transition-colors font-semibold text-foreground/70">심리 칼럼</Link>
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

import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Menu, X, Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import i18n from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
}

function useEmbedded() {
  return new URLSearchParams(window.location.search).get("embedded") === "1";
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const embedded = useEmbedded();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lng = params.get("lng");
    if (lng && i18n.language !== lng) i18n.changeLanguage(lng);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  if (embedded) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow flex flex-col">{children}</main>
      </div>
    );
  }

  const navLinks = [
    { href: "/tests",  label: t('nav.tests') },
    { href: "/tarot",  label: t('nav.tarot') },
    { href: "/about",  label: t('nav.about') },
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
            {/* Logo → InnerMeter 홈 */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                InnerMeter
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold transition-colors hover:text-primary text-muted-foreground"
                >
                  {link.label}
                </a>
              ))}
              <LanguageSwitcher />
              <a
                href="/tests"
                className="rounded-full bg-primary text-primary-foreground font-bold px-6 py-2 text-sm shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                {t('nav.start')}
              </a>
            </nav>

            {/* Mobile: language + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                className="p-2 text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient line when scrolled */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-[calc(100%+1px)] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-xl">
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-base font-bold transition-colors hover:bg-muted text-muted-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 pb-1">
                <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-wider px-4 mb-2">Language</p>
                <LanguageSwitcher compact />
              </div>
              <div className="pt-2 pb-2 border-t border-border mt-1">
                <a
                  href="/tests"
                  className="block w-full text-center bg-gradient-primary text-white font-bold py-3 rounded-2xl shadow-lg text-base"
                >
                  {t('nav.startLong')}
                </a>
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
                InnerMeter
              </span>
              <p className="text-sm text-muted-foreground max-w-[220px]">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">{t('footer.services')}</p>
                <div className="flex flex-col gap-2.5 text-sm font-medium text-muted-foreground">
                  <a href="/tests"    className="hover:text-primary transition-colors">{t('nav.tests')}</a>
                  <a href="/tarot"    className="hover:text-primary transition-colors">{t('nav.tarot')}</a>
                  <a href="/k-shaman" className="hover:text-primary transition-colors">K-Shaman</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">{t('footer.info')}</p>
                <div className="flex flex-col gap-2.5 text-sm font-medium text-muted-foreground">
                  <a href="/about"   className="hover:text-primary transition-colors">{t('footer.about')}</a>
                  <a href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
                  <a href="/contact" className="hover:text-primary transition-colors">{t('footer.contact')}</a>
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

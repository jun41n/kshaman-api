import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── 연락처 ──────────────────────────────── */
const CONTACT_EMAIL = "meaningout_d@naver.com";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
    { href: "/tests",  label: "테스트 모음" },
    { href: "/tarot",  label: "오늘의 타로" },
    { href: "/about",  label: "소개" },
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
                InnerMeter
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
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
              <Button asChild variant="default" className="rounded-full shadow-md shadow-primary/20 font-bold px-6">
                <Link href="/tests">시작하기</Link>
              </Button>
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기/닫기"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
              <div className="pt-4 pb-2 border-t border-border mt-2">
                <Button asChild className="w-full bg-gradient-primary text-white font-bold h-13 rounded-2xl shadow-lg text-base">
                  <Link href="/tests">테스트 시작하기</Link>
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
                InnerMeter
              </span>
              <p className="text-sm text-muted-foreground">
                당신의 내면을 가볍고 재미있게 측정해보세요.
              </p>
            </div>

            {/* Links + Contact */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              {/* 페이지 링크 */}
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-2.5">메뉴</p>
                <div className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                  <Link href="/about"   className="hover:text-primary transition-colors">서비스 소개</Link>
                  <Link href="/terms"   className="hover:text-primary transition-colors">이용약관</Link>
                  <Link href="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
                </div>
              </div>

              {/* 문의 */}
              <div>
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-2.5">문의 및 제휴</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
                <Link
                  href="/contact"
                  className="inline-block mt-1.5 text-xs font-semibold text-primary/70 hover:text-primary transition-colors"
                >
                  문의 페이지 →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border/50 text-center text-xs text-muted-foreground/50 font-medium">
            &copy; {new Date().getFullYear()} InnerMeter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

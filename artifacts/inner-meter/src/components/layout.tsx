import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/tests", label: "테스트 모음" },
    { href: "/tarot", label: "오늘의 타로" },
    { href: "/about", label: "소개" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
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
                    location.startsWith(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="default" className="rounded-full shadow-md shadow-primary/20 font-bold px-6">
                <Link href="/tests">시작하기</Link>
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Subtle Gradient Line when scrolled */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[calc(100%+1px)] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    location.startsWith(link.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-border mt-2">
                <Button asChild className="w-full bg-gradient-primary text-white font-bold h-14 rounded-2xl shadow-lg text-lg">
                  <Link href="/tests">시작하기</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-5xl px-4 sm:px-6 py-6 md:py-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card mt-auto">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center text-white opacity-80">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                InnerMeter
              </span>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                당신의 내면을 가볍고 재미있게 측정해보세요.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">서비스 소개</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">이용약관</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground/60 font-medium">
            &copy; {new Date().getFullYear()} InnerMeter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

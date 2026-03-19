import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F2]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full bg-[#FDF8F2]/90 backdrop-blur-sm border-b border-[#F0E4D8]">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F97316] to-[#A855F7] flex items-center justify-center text-white shadow-md text-base">
              🐾
            </div>
            <span className="font-extrabold text-[#3D2B1F] text-[1.05rem] tracking-tight">
              {t('app.name')}
            </span>
          </button>

          {/* Right: language switcher + start button */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-gradient-to-r from-[#F97316] to-[#A855F7] text-white font-bold px-5 py-2 text-sm shadow-md shadow-[#F97316]/20 hover:opacity-90 transition-opacity"
            >
              {t('nav.start')}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-[#F0E4D8] bg-white mt-auto">
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">

            {/* Brand */}
            <div className="flex flex-col gap-1.5">
              <span className="font-extrabold text-base text-[#3D2B1F] flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#F97316] to-[#A855F7] flex items-center justify-center text-white text-xs">
                  🐾
                </div>
                {t('app.name')}
              </span>
              <p className="text-sm text-[#8B6650] max-w-[220px]">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2.5 text-sm font-medium text-[#8B6650]">
              <button
                onClick={() => navigate("/")}
                className="hover:text-[#F97316] transition-colors text-left"
              >
                🐕 {t('home.dog')}
              </button>
              <button
                onClick={() => navigate("/")}
                className="hover:text-[#A855F7] transition-colors text-left"
              >
                🐈 {t('home.cat')}
              </button>
              <a
                href="/"
                className="hover:text-[#3D2B1F] transition-colors"
              >
                ↗ {t('footer.backToMain')}
              </a>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#F0E4D8]/70 text-center text-xs text-[#C5A898] font-medium">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>

    </div>
  );
}

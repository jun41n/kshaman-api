import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F2]">
      <header className="sticky top-0 z-50 w-full bg-[#FDF8F2]/90 backdrop-blur-sm border-b border-[#F0E4D8]">
        <div className="max-w-sm mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-extrabold text-[#3D2B1F] text-base flex items-center gap-2">
            🐾 {t('app.name')}
          </span>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>
    </div>
  );
}

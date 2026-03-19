import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PawPrint } from "lucide-react";
import i18n from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lng = params.get("lng");
    if (lng && i18n.language !== lng) i18n.changeLanguage(lng);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">

      <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center text-white shadow-md">
              <PawPrint className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-foreground">
              {t('pet.appName')}
            </span>
          </a>
        </div>
      </header>

      <main className="flex-grow w-full flex flex-col items-center">
        {children}
      </main>

      <footer className="w-full border-t border-border bg-card mt-auto">
        <div className="max-w-xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground/60">
          {t('footer.copyright')}
        </div>
      </footer>

    </div>
  );
}

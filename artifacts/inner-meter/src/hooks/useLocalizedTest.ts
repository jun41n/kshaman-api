import { useTranslation } from 'react-i18next';
import { TEST_TRANSLATIONS, TestLocale } from '@/locales/testTranslations';

export function useLocalizedTest(slug: string): TestLocale | null {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  if (lang === 'ko') return null;

  const code = lang as keyof typeof TEST_TRANSLATIONS;
  return TEST_TRANSLATIONS[code]?.[slug] ?? TEST_TRANSLATIONS['en']?.[slug] ?? null;
}

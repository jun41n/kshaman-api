import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from '../locales/ko.json';
import en from '../locales/en.json';
import ja from '../locales/ja.json';
import es from '../locales/es.json';
import ptBR from '../locales/pt-BR.json';
import fr from '../locales/fr.json';

export const LANGUAGES = [
  { code: 'ko',    flag: '🇰🇷', native: '한국어' },
  { code: 'en',    flag: '🇺🇸', native: 'English' },
  { code: 'ja',    flag: '🇯🇵', native: '日本語' },
  { code: 'es',    flag: '🇪🇸', native: 'Español' },
  { code: 'pt-BR', flag: '🇧🇷', native: 'Português (Brasil)' },
  { code: 'fr',    flag: '🇫🇷', native: 'Français' },
];

const supportedCodes = LANGUAGES.map(l => l.code);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko:      { translation: ko },
      en:      { translation: en },
      ja:      { translation: ja },
      es:      { translation: es },
      'pt-BR': { translation: ptBR },
      fr:      { translation: fr },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    supportedLngs: supportedCodes,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export function setLanguage(code: string) {
  i18n.changeLanguage(code);
  localStorage.setItem('lang', code);
}

export default i18n;

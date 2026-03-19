import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from '../locales/json/ko.json';
import en from '../locales/json/en.json';
import ja from '../locales/json/ja.json';
import es from '../locales/json/es.json';
import ptBR from '../locales/json/pt-BR.json';
import fr from '../locales/json/fr.json';

export const LANGUAGES = [
  { code: 'ko',    label: '한국어',             flag: '🇰🇷', native: '한국어' },
  { code: 'en',    label: 'English',            flag: '🇺🇸', native: 'English' },
  { code: 'ja',    label: '日本語',              flag: '🇯🇵', native: '日本語' },
  { code: 'es',    label: 'Español',            flag: '🇪🇸', native: 'Español' },
  { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷', native: 'Português (Brasil)' },
  { code: 'fr',    label: 'Français',           flag: '🇫🇷', native: 'Français' },
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

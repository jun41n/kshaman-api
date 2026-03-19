import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'ko';

i18n.use(initReactI18next).init({
  resources: {
    ko:      { translation: ko },
    en:      { translation: en },
    ja:      { translation: ja },
    es:      { translation: es },
    'pt-BR': { translation: ptBR },
    fr:      { translation: fr },
  },
  lng: savedLang || browserLang || 'ko',
  fallbackLng: ['en', 'ko'],
  interpolation: { escapeValue: false },
  returnNull: false,
});

export function setLanguage(code: string) {
  i18n.changeLanguage(code);
  localStorage.setItem('lang', code);
}

export default i18n;

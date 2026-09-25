// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
};

const savedLang = localStorage.getItem('i18nextLng') || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

// ============================================
// 🌍 تحديث اتجاه الصفحة (RTL / LTR)
// ============================================
const updateDirection = (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  localStorage.setItem('i18nextLng', lng);
};

i18n.on('languageChanged', updateDirection);
updateDirection(i18n.language);

export default i18n;
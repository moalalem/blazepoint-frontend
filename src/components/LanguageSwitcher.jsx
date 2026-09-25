// src/components/LanguageSwitcher.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  const currentLang = i18n.language;

  return (
    <div
      className="relative inline-flex items-center gap-1 rounded-full p-1 transition-all duration-500 group"
      style={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px rgba(79, 70, 229, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* 🌐 أيقونة Globe */}
      <div className="px-2 text-indigo-500 dark:text-indigo-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>

      {/* 🔘 أزرار اللغة */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => changeLanguage('ar')}
          className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
            currentLang === 'ar'
              ? 'text-white shadow-lg'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
          style={
            currentLang === 'ar'
              ? {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)',
                }
              : {}
          }
        >
          عربي
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
            currentLang === 'en'
              ? 'text-white shadow-lg'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
          style={
            currentLang === 'en'
              ? {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)',
                }
              : {}
          }
        >
          EN
        </button>
      </div>

    </div>
  );
};

export default LanguageSwitcher;
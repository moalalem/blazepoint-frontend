// src/components/CTA.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section
      className="py-20 md:py-24 px-4 text-white relative overflow-hidden circuit-bg-dark"
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)',
      }}
    >
      {/* 🎨 دوائر زخرفية */}
      <div className="absolute -top-20 -right-20 w-80 h-80 border border-white/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 border border-white/10 rounded-full pointer-events-none" />

      {/* 🎨 Dots في الزوايا */}
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-10 opacity-20 pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto text-center max-w-3xl relative z-10">
        
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
          {t('cta.title')}
        </h2>

        {/* الوصف */}
        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
          {t('cta.subtitle')}
        </p>

        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {t('cta.primary')}
          </Link>
          <a
            href="tel:+96611418368"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            {t('cta.secondary')}
          </a>
        </div>

        {/* الميزات */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-green-300">✅</span>
            <span>{t('cta.feature1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300">✅</span>
            <span>{t('cta.feature2')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300">✅</span>
            <span>{t('cta.feature3')}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;
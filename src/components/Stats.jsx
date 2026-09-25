// src/components/Stats.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from './CountUp';

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: '📅', end: 14, prefix: '+', label: t('stats.experience') },
    { icon: '😊', end: 100, prefix: '+', label: t('stats.clients') },
    { icon: '✅', end: 250, prefix: '+', label: t('stats.projects') },
    { icon: '🏆', end: 3, prefix: '', label: t('stats.partners') },
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      
      {/* 🎨 دوائر خفيفة في الخلفية */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-indigo-500/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 border border-indigo-500/10 rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(79, 70, 229, 0.15)',
                boxShadow: '0 4px 20px rgba(79, 70, 229, 0.08)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* خط علوي Indigo */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

              {/* الأيقونة */}
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>

              {/* الرقم */}
              <div className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                <CountUp end={stat.end} prefix={stat.prefix} duration={1500} />
              </div>

              {/* النص */}
              <div className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-semibold">
                {stat.label}
              </div>

              {/* الخط السفلي */}
              <div className="mx-auto mt-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Stats;
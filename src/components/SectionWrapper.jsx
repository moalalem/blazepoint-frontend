// src/components/SectionWrapper.jsx

import React from 'react';

const SectionWrapper = ({ children, variant = 'white', className = '' }) => {
  // تدرج واحد موحّد: أبيض ↔ رمادي خفيف جداً
  const backgrounds = {
    white: 'bg-white dark:bg-gray-900',           // أبيض ناصع
    gray: 'bg-gray-50 dark:bg-gray-800',          // رمادي خفيف جداً (#f9fafb)
    transparent: 'bg-transparent',                 // شفاف
  };

  const bg = backgrounds[variant] || backgrounds.white;

  return (
    <section className={`relative py-20 md:py-28 px-4 overflow-hidden transition-colors duration-300 ${bg} ${className}`}>
      
      {/* زخرفة علوية - Dots في الزاوية */}
      <div className="absolute top-8 right-8 opacity-[0.03] dark:opacity-[0.06] pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          ))}
        </div>
      </div>

      {/* زخرفة سفلية - Dots في الزاوية */}
      <div className="absolute bottom-8 left-8 opacity-[0.03] dark:opacity-[0.06] pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          ))}
        </div>
      </div>

      {/* زخرفة دائرية خفيفة */}
      <div className="absolute -top-20 -left-20 w-60 h-60 border border-blue-500/5 dark:border-blue-400/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-blue-500/5 dark:border-blue-400/10 rounded-full pointer-events-none" />

      {/* المحتوى */}
      <div className="container mx-auto relative z-10">
        {children}
      </div>

    </section>
  );
};

export default SectionWrapper;
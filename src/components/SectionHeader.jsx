// src/components/SectionHeader.jsx

import React from 'react';

const SectionHeader = ({ title, subtitle, align = 'center' }) => {
  const alignment = {
    center: 'text-center items-center',
    left: 'text-start items-start',
    right: 'text-end items-end',
  }[align] || 'text-center items-center';

  return (
    <div className={`flex flex-col ${alignment} mb-12 md:mb-16`}>
      
      {/* Indicator - خط + نقطة */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-1 bg-blue-500 rounded-full" />
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>

      {/* العنوان */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight">
        {title}
      </h2>

      {/* الوصف */}
      {subtitle && (
        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

    </div>
  );
};

export default SectionHeader;
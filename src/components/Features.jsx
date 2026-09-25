// src/components/Features.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

const Features = () => {
  const { t } = useTranslation();
  const features = t('features.items', { returnObjects: true });

  return (
    <SectionWrapper variant="gray">
      
      {/* العنوان الموحّد */}
      <SectionHeader
        title={t('features.title')}
        subtitle={t('features.subtitle')}
      />

      {/* البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(features) && features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-700 p-8 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-600 hover:-translate-y-2"
          >
            {/* الأيقونة */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
              {feature.icon}
            </div>

            {/* العنوان */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {feature.title}
            </h3>

            {/* الوصف */}
            <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>

            {/* خط سفلي يظهر عند Hover */}
            <div className="mt-5 mx-auto w-0 h-0.5 bg-blue-500 rounded-full group-hover:w-12 transition-all duration-500" />
          </div>
        ))}
      </div>

    </SectionWrapper>
  );
};

export default Features;
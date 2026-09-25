// src/components/Services.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const services = [
    {
      id: 1,
      title: isRTL ? 'التسويق الرقمي والحلول الإبداعية' : 'Digital Marketing & Creative Solutions',
      description: isRTL
        ? 'تصميم المواقع، تحسين محركات البحث، التصميم الجرافيكي، وإدارة منصات التواصل الاجتماعي.'
        : 'Website design, SEO, graphic design, and social media management.',
      features: isRTL
        ? ['تصميم المواقع', 'تحسين SEO', 'إدارة السوشيال ميديا']
        : ['Website Design', 'SEO Optimization', 'Social Media Management'],
      gradient: 'from-purple-500 to-fuchsia-700',
      accentColor: '#a855f7',
      // 🎨 أيقونة SVG احترافية (Marketing)
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
          {/* لوحة الرسم */}
          <circle cx="32" cy="32" r="24" fill="url(#gradMarketing)" opacity="0.15" />
          <path
            d="M32 12C20.954 12 12 20.954 12 32s8.954 20 20 20c2.5 0 4-1.5 4-3.5s-1-3-1-5c0-2 1.5-4 4-4h6c5.523 0 10-4.477 10-10 0-9.941-8.059-17.5-23-17.5z"
            fill="url(#gradMarketing)"
          />
          <circle cx="22" cy="28" r="3" fill="#fff" />
          <circle cx="30" cy="20" r="3" fill="#fff" />
          <circle cx="40" cy="22" r="3" fill="#fff" />
          <circle cx="42" cy="34" r="3" fill="#fff" />
          <defs>
            <linearGradient id="gradMarketing" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c084fc" />
              <stop offset="1" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: 2,
      title: isRTL ? 'الأمن السيبراني والاتصالات' : 'Cybersecurity & Communications',
      description: isRTL
        ? 'حلول شاملة في الأمن السيبراني، حماية الشبكات، اختبار الاختراق، وإدارة الهويات والوصول.'
        : 'Comprehensive solutions in cybersecurity, network protection, penetration testing, and identity management.',
      features: isRTL
        ? ['حماية الشبكات', 'اختبار الاختراق', 'الاستجابة للحوادث']
        : ['Network Protection', 'Penetration Testing', 'Incident Response'],
      gradient: 'from-red-500 to-rose-700',
      accentColor: '#ef4444',
      // 🛡️ أيقونة درع احترافية
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
          <circle cx="32" cy="32" r="24" fill="url(#gradSecurity)" opacity="0.15" />
          <path
            d="M32 10L14 18v14c0 11.046 7.7 21.352 18 24 10.3-2.648 18-12.954 18-24V18L32 10z"
            fill="url(#gradSecurity)"
          />
          <path
            d="M32 10L14 18v14c0 11.046 7.7 21.352 18 24 10.3-2.648 18-12.954 18-24V18L32 10z"
            fill="url(#gradSecurityLight)"
            opacity="0.3"
          />
          <path
            d="M26 32l5 5 9-9"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="gradSecurity" x1="14" y1="10" x2="50" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fca5a5" />
              <stop offset="1" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="gradSecurityLight" x1="14" y1="10" x2="50" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: 3,
      title: isRTL ? 'الخدمات التقنية بالذكاء الاصطناعي' : 'AI-Powered Technical Services',
      description: isRTL
        ? 'تحويل الخدمات التقليدية إلى حلول ذكية ومؤتمتة لرفع الكفاءة وتقليل التكاليف وتحسين تجربة المستخدم.'
        : 'Transforming traditional services into smart, automated solutions to increase efficiency and reduce costs.',
      features: isRTL
        ? ['أتمتة العمليات', 'حلول ذكية', 'تحسين تجربة المستخدم']
        : ['Process Automation', 'Smart Solutions', 'UX Enhancement'],
      gradient: 'from-blue-500 to-indigo-700',
      accentColor: '#3b82f6',
      // 🤖 أيقونة روبوت احترافية
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
          <circle cx="32" cy="32" r="24" fill="url(#gradAI)" opacity="0.15" />
          {/* الرأس */}
          <rect x="16" y="20" width="32" height="26" rx="8" fill="url(#gradAI)" />
          {/* العيون */}
          <circle cx="24" cy="32" r="3" fill="#fff" />
          <circle cx="40" cy="32" r="3" fill="#fff" />
          {/* الهوائي */}
          <line x1="32" y1="14" x2="32" y2="20" stroke="url(#gradAI)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="12" r="2.5" fill="url(#gradAI)" />
          {/* الأذنان */}
          <rect x="10" y="28" width="4" height="10" rx="2" fill="url(#gradAI)" />
          <rect x="50" y="28" width="4" height="10" rx="2" fill="url(#gradAI)" />
          {/* الفم */}
          <path d="M26 40h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="gradAI" x1="16" y1="12" x2="48" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93c5fd" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* خلفيات زخرفية */}
      <div className="absolute top-0 start-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* ============================================
            🎯 رأس القسم
            ============================================ */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
            <span>⚙️</span>
            {isRTL ? 'خدماتنا' : 'Our Services'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {isRTL ? (
              <>
                خدمات <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">متكاملة</span> تناسب أعمالك
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Integrated</span> Services for Your Business
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'نقدم مجموعة شاملة من الخدمات التقنية والإبداعية لتنمية أعمالك وتحقيق أهدافك الرقمية.'
              : 'We provide a comprehensive range of technical and creative services to grow your business and achieve your digital goals.'}
          </p>
        </div>

        {/* ============================================
            💎 البطاقات
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >

              {/* رأس البطاقة الملون */}
              <div className={`relative h-44 bg-gradient-to-br ${service.gradient} overflow-hidden flex items-center justify-center`}>

                {/* نمط النقاط */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* دائرة ضبابية */}
                <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -start-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                {/* الأيقونة */}
                <div className="relative z-10 w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {service.icon}
                </div>

              </div>

              {/* محتوى البطاقة */}
              <div className="relative p-7">

                {/* العنوان */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* الوصف */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* فاصل */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

                {/* المميزات */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* الزر */}
                <Link
                  to="/services"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${service.gradient} hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                >
                  {isRTL ? 'اعرف المزيد' : 'Learn More'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    {isRTL ? '←' : '→'}
                  </span>
                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;
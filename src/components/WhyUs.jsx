// src/components/WhyUs.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WhyUs = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // ============================================
  // 💎 المميزات الأربع (الوعود)
  // ============================================
  const features = [
    {
      icon: '⚡',
      title: isRTL ? 'سرعة فائقة' : 'Lightning Speed',
      description: isRTL
        ? 'أداء عالي واستجابة سريعة في جميع الأوقات'
        : 'High performance and fast response at all times',
      gradient: 'from-yellow-400 to-orange-500',
      bg: 'bg-orange-50',
    },
    {
      icon: '🔒',
      title: isRTL ? 'أمان تام' : 'Complete Security',
      description: isRTL
        ? 'حماية كاملة لبياناتك وفق أعلى المعايير العالمية'
        : 'Full protection of your data with the highest security standards',
      gradient: 'from-green-400 to-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: '💎',
      title: isRTL ? 'جودة عالية' : 'High Quality',
      description: isRTL
        ? 'خدمات احترافية بمعايير عالمية وجودة مضمونة'
        : 'Professional services with global standards and guaranteed quality',
      gradient: 'from-blue-400 to-indigo-600',
      bg: 'bg-blue-50',
    },
    {
      icon: '🎯',
      title: isRTL ? 'دقة في التنفيذ' : 'Precision',
      description: isRTL
        ? 'نتائج دقيقة تتوافق مع توقعاتك وتتجاوزها'
        : 'Accurate results that meet and exceed your expectations',
      gradient: 'from-pink-400 to-rose-600',
      bg: 'bg-rose-50',
    },
  ];

  // ============================================
  // 📊 الأرقام الستة (الإثبات)
  // ============================================
  const stats = [
    {
      value: '14+',
      title: isRTL ? 'سنة خبرة' : 'Years of Experience',
      subtitle: isRTL ? 'منذ 2011، نقدم حلولاً تقنية مبتكرة' : 'Since 2011, delivering innovative tech solutions',
      icon: '📅',
    },
    {
      value: 'ISO 27001',
      title: isRTL ? 'شهادة أمن المعلومات' : 'Information Security Certified',
      subtitle: isRTL ? 'معتمدون دولياً في حماية المعلومات' : 'Internationally certified in information protection',
      icon: '🔒',
    },
    {
      value: '3+',
      title: isRTL ? 'شراكات عالمية' : 'Global Partnerships',
      subtitle: isRTL ? 'مايكروسوفت، جوجل كلاود، أوراكل' : 'Microsoft, Google Cloud, Oracle',
      icon: '🤝',
    },
    {
      value: '250+',
      title: isRTL ? 'مشروع مكتمل' : 'Completed Projects',
      subtitle: isRTL ? 'في القطاعين الحكومي والخاص' : 'Across government and private sectors',
      icon: '✅',
    },
    {
      value: '100+',
      title: isRTL ? 'عميل سعيد' : 'Happy Clients',
      subtitle: isRTL ? 'يثقون بنا ويوصون بخدماتنا' : 'Who trust us and recommend our services',
      icon: '😊',
    },
    {
      value: '2021',
      title: isRTL ? 'جائزة أفضل شركة' : 'Best Company Award',
      subtitle: isRTL ? 'أفضل شركة تقنية مبتكرة' : 'Best Innovative Tech Company',
      icon: '🏆',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

      {/* خلفيات زخرفية */}
      <div className="absolute top-0 start-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* ============================================
            🎯 رأس القسم
            ============================================ */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
            <span>✨</span>
            {isRTL ? 'لماذا تختارنا' : 'Why Choose Us'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {isRTL ? (
              <>
                مميزات <span className="text-indigo-600">تجعلنا الخيار الأفضل</span> لك
              </>
            ) : (
              <>
                Features That Make Us <span className="text-indigo-600">Your Best Choice</span>
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {isRTL
              ? 'نقدم لك مجموعة من المميزات والأرقام التي تجعلنا الشريك الرقمي الأمثل لمشروعك.'
              : 'We offer you a range of features and real numbers that make us the optimal digital partner for your project.'}
          </p>
        </div>

        {/* ============================================
            💎 الجزء الأول: المميزات الأربع (الوعود)
            ============================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2"
            >
              {/* رقم في الزاوية */}
              <div className="absolute top-4 end-4 text-4xl font-extrabold text-gray-100 group-hover:text-indigo-100 transition-colors duration-300">
                0{index + 1}
              </div>

              {/* الأيقونة */}
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* العنوان */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* الوصف */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* شريط ملون أسفل البطاقة */}
              <div className={`absolute bottom-0 start-0 end-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* ============================================
            📊 الجزء الثاني: الأرقام الستة (الإثبات)
            ============================================ */}
        <div className="relative">

          {/* فاصل بسيط قبل الأرقام */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {isRTL ? 'أرقام وشهادات حقيقية' : 'Real Numbers & Certifications'}
            </h3>
            <p className="text-gray-500 text-sm">
              {isRTL ? 'تجعلنا الخيار الأمثل لمشروعك' : 'Make us the optimal choice for your project'}
            </p>
          </div>

          {/* شبكة الأرقام */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
              >
                {/* الأيقونة */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* المحتوى */}
                <div className="flex-1 min-w-0">
                  <div className="text-2xl md:text-3xl font-extrabold text-indigo-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    {stat.title}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ============================================
            📞 دعوة للتواصل (CTA)
            ============================================ */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-5">
            {isRTL
              ? 'هل أنت مستعد لتبدأ مشروعك القادم معنا؟'
              : 'Ready to start your next project with us?'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {isRTL ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
            <span>{isRTL ? '←' : '→'}</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
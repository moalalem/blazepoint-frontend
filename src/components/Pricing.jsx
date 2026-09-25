// src/components/Pricing.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedCard from './AnimatedCard';

const Pricing = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const plans = [
    {
      name: isRTL ? 'الباقة الأساسية' : 'Basic Plan',
      subtitle: isRTL ? 'مثالية للمشاريع الصغيرة' : 'Perfect for small projects',
      features: isRTL
        ? [
            'موقع تعريفي (5 صفحات)',
            'تصميم متجاوب',
            'دعم فني لمدة 3 أشهر',
            'شهادة SSL',
            'استضافة لمدة سنة',
          ]
        : [
            'Portfolio website (5 pages)',
            'Responsive design',
            '3 months technical support',
            'SSL Certificate',
            '1 year hosting',
          ],
      popular: false,
    },
    {
      name: isRTL ? 'الباقة الاحترافية' : 'Professional Plan',
      subtitle: isRTL ? 'الأفضل للشركات المتوسطة' : 'Best for medium businesses',
      features: isRTL
        ? [
            'موقع كامل (15 صفحة)',
            'تصميم مخصص',
            'دعم فني لمدة سنة',
            'تحسين محركات البحث SEO',
            'شهادة SSL',
            'استضافة لمدة سنة',
            'لوحة تحكم إدارية',
          ]
        : [
            'Full website (15 pages)',
            'Custom design',
            '1 year technical support',
            'SEO optimization',
            'SSL Certificate',
            '1 year hosting',
            'Admin panel',
          ],
      popular: true,
    },
    {
      name: isRTL ? 'باقة الشركات' : 'Enterprise Plan',
      subtitle: isRTL ? 'للشركات الكبيرة والمؤسسات' : 'For large companies and enterprises',
      features: isRTL
        ? [
            'موقع غير محدود',
            'تصميم مخصص بالكامل',
            'دعم فني لمدة سنتين',
            'SEO متقدم',
            'شهادة SSL',
            'استضافة لمدة سنتين',
            'لوحة تحكم كاملة',
            'تكامل الأنظمة',
          ]
        : [
            'Unlimited website',
            'Fully custom design',
            '2 years technical support',
            'Advanced SEO',
            'SSL Certificate',
            '2 years hosting',
            'Full admin panel',
            'Systems integration',
          ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

      {/* خلفيات زخرفية */}
      <div className="absolute top-20 start-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 end-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* ============================================
            🎯 رأس القسم
            ============================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
            <span>💰</span>
            {isRTL ? 'الأسعار' : 'Pricing'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {isRTL ? (
              <>
                باقات <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">تناسب</span> حجم أعمالك
              </>
            ) : (
              <>
                Plans That <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Fit</span> Your Business
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {isRTL
              ? 'اختر الباقة المناسبة لأعمالك، وسنقوم بتسعير مخصص حسب احتياجاتك الفعلية.'
              : 'Choose the plan that fits your business, and we will provide custom pricing based on your actual needs.'}
          </p>
        </div>

        {/* ============================================
            💎 بطاقات الباقات (مع Animations)
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">

          {plans.map((plan, index) => (
            <AnimatedCard key={index} index={index} delay={0.15}>
              <div
                className={`relative bg-white rounded-3xl p-7 transition-all duration-300 h-full ${
                  plan.popular
                    ? 'border-2 border-indigo-600 shadow-2xl lg:scale-105 z-10'
                    : 'border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
              >

                {/* شارة "الأكثر طلباً" */}
                {plan.popular && (
                  <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <span>⭐</span>
                    {isRTL ? 'الأكثر طلباً' : 'Most Popular'}
                  </div>
                )}

                {/* العنوان */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {plan.subtitle}
                  </p>
                </div>

                {/* صندوق "سعر مخصص" */}
                <div className={`text-center mb-6 py-5 rounded-2xl border-2 border-dashed ${
                  plan.popular
                    ? 'border-indigo-300 bg-indigo-50/50'
                    : 'border-gray-200 bg-gray-50/50'
                }`}>
                  <div className="text-3xl mb-2">💬</div>
                  <p className={`text-lg font-bold ${
                    plan.popular ? 'text-indigo-700' : 'text-gray-700'
                  }`}>
                    {isRTL ? 'سعر مخصص' : 'Custom Pricing'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {isRTL ? 'حسب احتياجات مشروعك' : 'Based on your project needs'}
                  </p>
                </div>

                {/* المميزات */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-indigo-600' : 'text-green-500'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* زر التواصل مع المبيعات */}
                <Link
                  to="/contact"
                  className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {isRTL ? 'تواصل مع المبيعات' : 'Contact Sales'}
                </Link>

              </div>
            </AnimatedCard>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Pricing;
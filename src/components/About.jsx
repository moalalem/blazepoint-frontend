// src/components/About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* الجانب البصري */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-8 min-h-[400px] flex items-center justify-center shadow-2xl">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🚀</div>
                <p className="text-2xl font-bold">BlazePoint</p>
                <p className="text-white/80 text-sm mt-2">
                  {isRTL ? 'نحو مستقبل رقمي أفضل' : 'Towards a Better Digital Future'}
                </p>
              </div>
            </div>

            {/* شارة الخبرة */}
            <div className="absolute -bottom-4 -end-4 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl">
                  🏆
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">14+</p>
                  <p className="text-xs text-gray-500 font-medium">
                    {isRTL ? 'سنة خبرة' : 'Years Experience'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* المحتوى النصي */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
              <span>👋</span>
              {isRTL ? 'من نحن' : 'About Us'}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {isRTL ? (
                <>
                  نبني حلولاً رقمية <span className="text-indigo-600">تصنع الفرق</span>
                </>
              ) : (
                <>
                  We Build Digital Solutions <span className="text-indigo-600">That Make a Difference</span>
                </>
              )}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {isRTL
                ? 'نحن شركة سعودية متخصصة في تقديم الحلول الرقمية المتكاملة، من تصميم المواقع والتطبيقات إلى التسويق الرقمي والاستشارات التقنية. نعمل مع أكثر من 100 عميل حول المملكة لتحويل أفكارهم إلى واقع رقمي ملموس.'
                : 'We are a Saudi company specialized in providing integrated digital solutions, from website and app design to digital marketing and technical consulting. We work with 100+ clients across the Kingdom to turn their ideas into tangible digital reality.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3.5 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isRTL ? 'تعرف علينا أكثر' : 'Learn More About Us'}
                <span>{isRTL ? '←' : '→'}</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
              >
                {isRTL ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
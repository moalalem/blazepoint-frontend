// src/components/Partners.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { partnersAPI } from '../services/api';

const Partners = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // ============================================
  // State
  // ============================================
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // جلب الشركاء من API
  // ============================================
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await partnersAPI.getAll();
        const data = response.data.data || [];

        setPartners(data);
      } catch (err) {
        console.error('Failed to fetch partners:', err);
        setError('Failed to load partners');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // ============================================
  // حالة التحميل
  // ============================================
  if (loading) {
    return (
      <section className="relative py-16 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
              <span>🤝</span>
              {isRTL ? 'الشركاء الاستراتيجيون' : 'Strategic Partners'}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
              {isRTL ? 'نفتخر بشراكاتنا العالمية' : 'Proud of Our Global Partnerships'}
            </h2>
          </div>

          <div className="flex gap-6 justify-center px-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-56 h-32 rounded-2xl bg-white border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // حالة الخطأ
  // ============================================
  if (error) {
    return (
      <section className="relative py-16 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-gray-600">
              {isRTL ? 'تعذر تحميل الشركاء' : 'Failed to load partners'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // لا يوجد شركاء
  // ============================================
  if (partners.length === 0) {
    return null; // لا نعرض القسم إذا كان فارغاً
  }

  // ============================================
  // العرض الرئيسي
  // ============================================
  return (
    <section className="relative py-16 overflow-hidden bg-gray-50">

      {/* زخرفة النقاط */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* رأس القسم */}
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
            <span>🤝</span>
            {isRTL ? 'الشركاء الاستراتيجيون' : 'Strategic Partners'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {isRTL ? (
              <>
                نفتخر بـ <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">شراكاتنا</span> العالمية
              </>
            ) : (
              <>
                Proud of Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Global Partnerships</span>
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'نفتخر بشراكاتنا مع أفضل الشركات العالمية لتقديم حلول تقنية متكاملة.'
              : 'We are proud of our partnerships with the best global companies.'}
          </p>
        </div>
      </div>

      {/* السلايدر */}
      <div className="relative group">
        <div
          className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            width: 'max-content',
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          {/* نكرر القائمة 3 مرات للحصول على حركة لا نهائية */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <PartnerCard key={`partner-${index}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* شريط الثقة السفلي */}
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="mt-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center -space-x-2 rtl:space-x-reverse">
              {partners.slice(0, 6).map((partner, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-white"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.name[0]}
                </div>
              ))}
            </div>
            <div className="text-gray-700 text-sm font-medium">
              {isRTL ? `+${partners.length} شريك عالمي` : `${partners.length}+ Global Partners`}
            </div>
          </div>
        </div>
      </div>

      {/* تعريف الحركة */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        [dir="rtl"] .animate-marquee {
          animation: marquee-rtl 40s linear infinite;
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(33.333%); }
        }
      `}</style>

    </section>
  );
};

// ============================================
// 🎴 بطاقة الشريك
// ============================================
const PartnerCard = ({ partner }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group/card flex-shrink-0">
      <div className="relative w-56 h-32 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 overflow-hidden flex items-center justify-center hover:scale-[1.05]">

        {/* توهج بلون الشريك */}
        <div
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${partner.color}10 0%, transparent 70%)`,
          }}
        />

        {/* الشعار */}
        <div className="relative flex items-center justify-center w-full h-full p-5">
          {!imageError && partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-16 max-w-[150px] object-contain transition-all duration-500 group-hover/card:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div
              className="flex items-center justify-center w-full h-full text-lg font-bold tracking-wide transition-all duration-500 group-hover/card:scale-110 text-center px-2"
              style={{ color: partner.color }}
            >
              {partner.name}
            </div>
          )}
        </div>

        {/* شريط ملون أسفل */}
        <div
          className="absolute bottom-0 start-0 end-0 h-0.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: partner.color }}
        />
      </div>
    </div>
  );
};

export default Partners;
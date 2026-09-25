// src/components/FAQ.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { faqAPI } from '../services/api';

const FAQ = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = isRTL ? 'ar' : 'en';

  // ============================================
  // State
  // ============================================
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  // ============================================
  // جلب الأسئلة من API
  // ============================================
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await faqAPI.getAll();
        const data = response.data.data || [];

        setFaqs(data);
      } catch (err) {
        console.error('Failed to fetch FAQs:', err);
        setError('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ============================================
  // حالة التحميل
  // ============================================
  if (loading) {
    return (
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="h-10 w-40 bg-gray-200 rounded-full mx-auto mb-5 animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
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
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600">
            {isRTL ? 'تعذر تحميل الأسئلة' : 'Failed to load FAQs'}
          </p>
        </div>
      </section>
    );
  }

  // ============================================
  // لا يوجد أسئلة
  // ============================================
  if (faqs.length === 0) return null;

  // ============================================
  // العرض الرئيسي
  // ============================================
  return (
    <section className="pt-16 pb-12 bg-white relative overflow-hidden">

      {/* خلفيات زخرفية */}
      <div className="absolute top-0 start-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10 max-w-4xl">

        {/* رأس القسم */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
            <span>❓</span>
            {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {isRTL ? (
              <>
                الأسئلة <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'إجابات على أكثر الأسئلة التي يطرحها عملاؤنا'
              : 'Answers to the most common questions our clients ask'}
          </p>
        </div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq._id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'border-indigo-300 shadow-lg shadow-indigo-500/10'
                  : 'border-gray-200 hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              {/* السؤال */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-start"
              >
                <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                  openIndex === index ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {faq.question?.[lang]}
                </h3>

                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rotate-45'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>

              {/* الإجابة */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {faq.answer?.[lang]}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
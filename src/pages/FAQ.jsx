// src/pages/FAQ.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const FAQ = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: isRTL ? 'ما هي خدمات شركة BlazePoint؟' : 'What services does BlazePoint provide?',
      answer: isRTL
        ? 'نقدم خدمات تقنية متكاملة تشمل: الحلول التقنية بالذكاء الاصطناعي، الأمن السيبراني والاتصالات، والتسويق الرقمي والحلول الإبداعية.'
        : 'We provide integrated technical services including: AI-powered tech solutions, cybersecurity and communications, and digital marketing and creative solutions.',
    },
    {
      question: isRTL ? 'كيف يمكنني الحصول على عرض سعر؟' : 'How can I get a quote?',
      answer: isRTL
        ? 'يمكنك التواصل معنا عبر نموذج التواصل، أو الاتصال بنا مباشرة على الرقم +966-11-418368.'
        : 'You can contact us through the contact form, or call us directly at +966-11-418368.',
    },
    {
      question: isRTL ? 'هل تقدمون خدمات ما بعد البيع؟' : 'Do you provide after-sales services?',
      answer: isRTL
        ? 'نعم، نقدم دعماً فنياً مستمراً لجميع مشاريعنا، مع ضمان على الخدمات المقدمة.'
        : 'Yes, we provide ongoing technical support for all our projects, with a warranty on our services.',
    },
    {
      question: isRTL ? 'ما هي مدة تنفيذ المشروع؟' : 'How long does it take to complete a project?',
      answer: isRTL
        ? 'تختلف المدة حسب حجم المشروع. المشاريع الصغيرة: 1-2 أسبوع. المتوسطة: 3-6 أسابيع. الكبيرة: 2-3 أشهر.'
        : 'The duration varies depending on project size. Small: 1-2 weeks. Medium: 3-6 weeks. Large: 2-3 months.',
    },
    {
      question: isRTL ? 'هل تعملون مع عملاء خارج السعودية؟' : 'Do you work with clients outside Saudi Arabia?',
      answer: isRTL
        ? 'نعم، نعمل مع عملاء في جميع أنحاء العالم العربي، ولدينا شراكات دولية مع Microsoft و Google Cloud و AWS.'
        : 'Yes, we work with clients across the Arab world, and we have international partnerships with Microsoft, Google Cloud, and AWS.',
    },
    {
      question: isRTL ? 'ما الذي يميزكم عن المنافسين؟' : 'What makes you different from competitors?',
      answer: isRTL
        ? 'خبرة +14 سنة، شراكات استراتيجية عالمية، شهادة ISO 27001، فريق خبراء متخصص، ودعم مستمر.'
        : '14+ years of experience, global strategic partnerships, ISO 27001 certification, specialized expert team, and ongoing support.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <SEO
        title="الأسئلة الشائعة"
        description="إجابات على أكثر الأسئلة الشائعة حول خدمات BlazePoint، الأسعار، المدة، والدعم الفني."
        keywords="أسئلة شائعة, FAQ, BlazePoint, دعم فني, أسعار"
        url="https://blazepoint.net/faq"
      />

      {/* Hero */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            {isRTL ? 'إجابات على أكثر الأسئلة التي يطرحها عملاؤنا' : 'Answers to the most common questions'}
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-indigo-300 shadow-lg shadow-indigo-500/10'
                    : 'border-gray-200 hover:border-indigo-200 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-start"
                >
                  <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                    openIndex === index ? 'text-indigo-600' : 'text-gray-900'
                  }`}>
                    {faq.question}
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

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
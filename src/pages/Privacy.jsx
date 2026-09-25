// src/pages/Privacy.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Privacy = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="bg-white">
      <SEO
        title="سياسة الخصوصية"
        description="سياسة الخصوصية لموقع BlazePoint — كيف نحمي بياناتك ونحترم خصوصيتك."
        keywords="سياسة الخصوصية, حماية البيانات, BlazePoint"
        url="https://blazepoint.net/privacy"
      />

      {/* Hero */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-lg text-white/90">
            {isRTL ? 'آخر تحديث: 2026' : 'Last updated: 2026'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '1. مقدمة' : '1. Introduction'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'نحن في BlazePoint نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك.'
                : 'At BlazePoint, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '2. المعلومات التي نجمعها' : '2. Information We Collect'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل: الاسم، البريد الإلكتروني، رقم الهاتف، وأي رسائل ترسلها عبر نماذج التواصل.'
                : 'We collect information you provide directly to us, such as: name, email, phone number, and any messages sent through contact forms.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '3. كيف نستخدم معلوماتك' : '3. How We Use Your Information'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'نستخدم معلوماتك للرد على استفساراتك، تقديم خدماتنا، تحسين تجربتك، وإرسال تحديثات ذات صلة عند موافقتك.'
                : 'We use your information to respond to inquiries, provide our services, improve your experience, and send relevant updates with your consent.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '4. حماية البيانات' : '4. Data Protection'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'نستخدم إجراءات أمنية متقدمة (شهادة ISO 27001) لحماية بياناتك من الوصول غير المصرح به أو التسريب.'
                : 'We use advanced security measures (ISO 27001 certified) to protect your data from unauthorized access or disclosure.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '5. حقوقك' : '5. Your Rights'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'لديك الحق في الوصول إلى بياناتك، تصحيحها، أو حذفها. للتواصل: info@BlazePoint.net'
                : 'You have the right to access, correct, or delete your data. Contact us at: info@BlazePoint.net'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '6. التواصل' : '6. Contact'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'لأي استفسار حول سياسة الخصوصية، تواصل معنا على: info@BlazePoint.net'
                : 'For any questions about this privacy policy, contact us at: info@BlazePoint.net'}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Privacy;
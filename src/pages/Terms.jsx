// src/pages/Terms.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Terms = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="bg-white">
      <SEO
        title="الشروط والأحكام"
        description="الشروط والأحكام لاستخدام موقع وخدمات BlazePoint."
        keywords="الشروط, الأحكام, BlazePoint, شروط الاستخدام"
        url="https://blazepoint.net/terms"
      />

      {/* Hero */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
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
              {isRTL ? '1. قبول الشروط' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'باستخدامك لموقع BlazePoint، فإنك توافق على الالتزام بهذه الشروط والأحكام.'
                : 'By using the BlazePoint website, you agree to comply with these terms and conditions.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '2. الخدمات' : '2. Services'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'نقدم خدمات تقنية وإبداعية متكاملة. قد تتغير تفاصيل الخدمات دون إشعار مسبق.'
                : 'We provide integrated technical and creative services. Service details may change without prior notice.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '3. المسؤوليات' : '3. Responsibilities'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'يلتزم العميل بتقديم معلومات صحيحة، ونلتزم نحن بحماية بياناته وفق سياسة الخصوصية.'
                : 'The client agrees to provide accurate information, and we are committed to protecting their data per our privacy policy.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '4. الملكية الفكرية' : '4. Intellectual Property'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'جميع المحتويات والعلامات التجارية على الموقع مملوكة لـ BlazePoint ولا يجوز استخدامها دون إذن.'
                : 'All content and trademarks on the site are owned by BlazePoint and may not be used without permission.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? '5. التعديلات' : '5. Modifications'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isRTL
                ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يستمر استخدامك للموقع كموافقة على الشروط المحدثة.'
                : 'We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.'}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Terms;
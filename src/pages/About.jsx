// src/pages/About.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <SEO
        title="من نحن"
        description="تعرف على BlazePoint — شركة سعودية رائدة في الحلول الرقمية منذ 2011، مع أكثر من 250 مشروع ناجح وشهادة ISO 27001."
        keywords="من نحن, BlazePoint, نقطة بريق, شركة سعودية, خبرة 14 سنة"
        url="https://blazepoint.net/about"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('about.title', 'من نحن')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            {t('about.subtitle', 'شركة سعودية رائدة في الحلول الرقمية')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('about.story.title', 'قصتنا')}
          </h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>{t('about.story.text1', 'تأسست BlazePoint في عام 2011 بهدف تقديم حلول رقمية متكاملة للشركات في المملكة العربية السعودية والمنطقة العربية.')}</p>
            <p>{t('about.story.text2', 'على مدار أكثر من 14 عاماً، نفذنا أكثر من 250 مشروعاً ناجحاً في قطاعات مختلفة، حصلنا خلالها على شهادة ISO 27001، وشراكات استراتيجية مع شركات عالمية مثل Microsoft و Google Cloud و AWS.')}</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('about.vision.title', 'رؤيتنا')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision.text', 'أن نكون الشريك الرقمي الأول للشركات في المنطقة، من خلال تقديم حلول مبتكرة تتجاوز التوقعات.')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('about.mission.title', 'مهمتنا')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission.text', 'تمكين عملائنا من تحقيق أهدافهم الرقمية من خلال حلول تقنية متكاملة، بجودة عالمية ودعم مستمر.')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            {t('about.achievements.title', 'إنجازاتنا')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-8 rounded-2xl shadow-md text-center border-t-4 border-yellow-500">
              <div className="text-5xl mb-4">🏆</div>
              <p className="text-gray-800 font-bold text-lg">
                {t('about.achievements.award', 'جائزة أفضل شركة تقنية مبتكرة 2021')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center border-t-4 border-green-500">
              <div className="text-5xl mb-4">🔒</div>
              <p className="text-gray-800 font-bold text-lg">
                {t('about.achievements.iso', 'شهادة ISO 27001 لأمن المعلومات')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🤝</div>
              <p className="text-gray-800 font-bold text-lg">
                {t('about.achievements.partnerships', '+3 شراكات عالمية استراتيجية')}
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
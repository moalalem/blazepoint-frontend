// src/pages/Services.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedCard from '../components/AnimatedCard';
import SEO from '../components/SEO';

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
      icon: <span className="text-6xl">🎨</span>,
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
      icon: <span className="text-6xl">🛡️</span>,
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
      icon: <span className="text-6xl">🤖</span>,
    },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="خدماتنا"
        description="خدمات BlazePoint: التسويق الرقمي، الأمن السيبراني، الذكاء الاصطناعي، تصميم المواقع والتطبيقات."
        keywords="خدمات, تسويق رقمي, أمن سيبراني, ذكاء اصطناعي, تصميم مواقع, تطبيقات"
        url="https://blazepoint.net/services"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'خدماتنا' : 'Our Services'}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            {isRTL
              ? 'نقدم مجموعة شاملة من الخدمات التقنية والإبداعية لتنمية أعمالك.'
              : 'We provide a comprehensive range of technical and creative services to grow your business.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {services.map((service, index) => (
              <AnimatedCard key={service.id} index={index} delay={0.15}>
                <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">

                  <div className={`relative h-44 bg-gradient-to-br ${service.gradient} overflow-hidden flex items-center justify-center`}>
                    <div className="relative z-10 w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                      {service.icon}
                    </div>
                  </div>

                  <div className="relative p-7">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      {service.description}
                    </p>

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

                    <Link
                      to="/contact"
                      className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${service.gradient} hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                    >
                      {isRTL ? 'اطلب الخدمة' : 'Request Service'}
                    </Link>
                  </div>

                </div>
              </AnimatedCard>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
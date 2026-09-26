// src/pages/Careers.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Careers = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // ============================================
  // بيانات الصفحة
  // ============================================

  const benefits = [
    {
      icon: '🚀',
      title: isRTL ? 'بيئة عمل محفزة' : 'Inspiring Environment',
      desc: isRTL
        ? 'فريق متعاون ومشاريع تقنية متطورة'
        : 'Collaborative team and advanced tech projects',
    },
    {
      icon: '📚',
      title: isRTL ? 'تطوير مستمر' : 'Continuous Learning',
      desc: isRTL
        ? 'دورات تدريبية وشهادات مهنية معتمدة'
        : 'Training courses and certified programs',
    },
    {
      icon: '⚖️',
      title: isRTL ? 'توازن العمل والحياة' : 'Work-Life Balance',
      desc: isRTL
        ? 'ساعات مرنة وإمكانية العمل عن بعد'
        : 'Flexible hours and remote work options',
    },
    {
      icon: '💰',
      title: isRTL ? 'رواتب تنافسية' : 'Competitive Salary',
      desc: isRTL
        ? 'حزم مزايا شاملة وتأمين صحي'
        : 'Comprehensive benefits and health insurance',
    },
    {
      icon: '🌍', 
      title: isRTL ? 'مشاريع متنوعة' : 'Diverse Projects',
      desc: isRTL
        ? 'عملاء من مختلف القطاعات والحكومات'
        : 'Clients from various sectors and governments',
    },
    {
      icon: '🏆',
      title: isRTL ? 'ثقافة التقدير' : 'Recognition Culture',
      desc: isRTL
        ? 'نحتفل بالإنجازات ونكافئ التميز'
        : 'We celebrate achievements and reward excellence',
    },
  ];

  const fields = [
    {
      icon: '💻',
      title: isRTL ? 'التطوير والبرمجة' : 'Development',
      roles: isRTL
        ? ['مطور Front-end', 'مطور Back-end', 'مطور Full-stack', 'مهندس DevOps']
        : ['Front-end', 'Back-end', 'Full-stack', 'DevOps'],
    },
    {
      icon: '🎨',
      title: isRTL ? 'التصميم' : 'Design',
      roles: isRTL
        ? ['مصمم UI/UX', 'مصمم جرافيك', 'مصمم موشن']
        : ['UI/UX', 'Graphic', 'Motion'],
    },
    {
      icon: '📊',
      title: isRTL ? 'التسويق' : 'Marketing',
      roles: isRTL
        ? ['مسوق رقمي', 'كاتب محتوى', 'مدير سوشيال ميديا']
        : ['Digital Marketer', 'Content Writer', 'Social Media'],
    },
    {
      icon: '🔒',
      title: isRTL ? 'الأمن السيبراني' : 'Cybersecurity',
      roles: isRTL
        ? ['مهندس أمن سيبراني', 'محلل اختراق', 'مهندس شبكات']
        : ['Security Engineer', 'Penetration Tester', 'Network Engineer'],
    },
    {
      icon: '🤖',
      title: isRTL ? 'الذكاء الاصطناعي' : 'AI & Data',
      roles: isRTL
        ? ['مهندس AI', 'محلل بيانات', 'مهندس ML']
        : ['AI Engineer', 'Data Analyst', 'ML Engineer'],
    },
    {
      icon: '📞',
      title: isRTL ? 'المبيعات والدعم' : 'Sales & Support',
      roles: isRTL
        ? ['مدير حسابات', 'أخصائي مبيعات', 'دعم فني']
        : ['Account Manager', 'Sales Specialist', 'Tech Support'],
    },
  ];

  const steps = [
    {
      num: '01',
      title: isRTL ? 'أرسل سيرتك' : 'Send Your CV',
      desc: isRTL
        ? 'أرسل سيرتك الذاتية على البريد التالي'
        : 'Send your CV to the email below',
    },
    {
      num: '02',
      title: isRTL ? 'نراجع طلبك' : 'We Review',
      desc: isRTL
        ? 'نراجع ملفك خلال 5 أيام عمل'
        : 'We review your file within 5 business days',
    },
    {
      num: '03',
      title: isRTL ? 'مقابلة أولية' : 'First Interview',
      desc: isRTL
        ? 'نحدد موعد مقابلة افتراضية'
        : 'We schedule a virtual interview',
    },
    {
      num: '04',
      title: isRTL ? 'انضم لفريقنا' : 'Join Our Team',
      desc: isRTL
        ? 'نرحب بك في فريق BlazePoint'
        : 'Welcome to the BlazePoint team',
    },
  ];

  const email = 'careers@BlazePoint.net';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    isRTL ? 'تقديم سيرة ذاتية - وظيفة' : 'CV Submission - Position'
  )}`;

  return (
    <div className="bg-white dark:bg-slate-900">
      <SEO
        title={isRTL ? 'الوظائف | انضم إلى فريقنا' : 'Careers | Join Our Team'}
        description={
          isRTL
            ? 'نستقبل المواهب في BlazePoint. أرسل سيرتك الذاتية وانضم إلى فريق يبني حلولاً رقمية تصنع الفرق.'
            : 'We welcome talents at BlazePoint. Send your CV and join a team building digital solutions that make a difference.'
        }
        keywords="وظائف, توظيف, سيرة ذاتية, BlazePoint, careers, jobs"
        url="https://blazepoint.net/careers"
      />

      {/* ============================================ */}
      {/* Hero */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 text-white py-24 px-4">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 -start-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -end-20 w-96 h-96 bg-indigo-400/30 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <div className="inline-block mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-bold">
            💼 {isRTL ? 'انضم إلى فريقنا' : 'Join Our Team'}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {isRTL ? 'نستقبل المواهب' : 'We Welcome Talents'}
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            {isRTL
              ? 'في BlazePoint، نؤمن أن نجاحنا يبدأ من فريقنا. نبحث دائماً عن مواهب استثنائية تشاركنا الشغف بتطوير الحلول الرقمية المبتكرة.'
              : 'At BlazePoint, we believe our success starts with our team. We are always looking for exceptional talents who share our passion for innovative digital solutions.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={mailtoLink}
              className="w-full sm:w-auto bg-white text-indigo-700 dark:bg-indigo-600 dark:text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-indigo-50 dark:hover:bg-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              📧 {isRTL ? 'أرسل سيرتك الذاتية' : 'Send Your CV'}
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            📮 {isRTL ? 'راسلنا على:' : 'Email us at:'}{' '}
            <a href={mailtoLink} className="underline hover:text-white font-mono">
              {email}
            </a>
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* لماذا تعمل معنا */}
      {/* ============================================ */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-4">
              ✨ {isRTL ? 'لماذا BlazePoint؟' : 'Why BlazePoint?'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'لماذا تعمل معنا؟' : 'Why Work With Us?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isRTL
                ? 'نوفر بيئة عمل تساهم في نموك المهني والشخصي'
                : 'We provide a work environment that contributes to your professional and personal growth'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* المجالات */}
      {/* ============================================ */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-4">
              🎯 {isRTL ? 'المجالات' : 'Fields'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'المجالات التي نستقبل فيها السير' : 'Fields We Accept CVs In'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isRTL
                ? 'سواء كنت مطوراً، مصمماً، مسوقاً أو خبيراً في مجال آخر — نرحب بك'
                : 'Whether you are a developer, designer, marketer or expert — we welcome you'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-7 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{field.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {field.title}
                </h3>
                <ul className="space-y-2">
                  {field.roles.map((role, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* خطوات التقديم */}
      {/* ============================================ */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-4">
              📝 {isRTL ? 'خطوات التقديم' : 'How to Apply'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'خطوات بسيطة للانضمام' : 'Simple Steps to Join'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl font-extrabold mb-4 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 end-0 translate-x-1/2 w-6 text-indigo-400 text-2xl z-10">
                    {isRTL ? '←' : '→'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA النهائي */}
      {/* ============================================ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 p-12 md:p-16 text-center text-white shadow-2xl">
            <div className="absolute top-0 -start-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -end-20 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-5xl mb-6">📧</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isRTL ? 'جاهز للانضمام إلينا؟' : 'Ready to Join Us?'}
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                {isRTL
                  ? 'أرسل سيرتك الذاتية الآن على بريدنا، وسنراجعها بعناية. نحن نتطلع للتعرف على موهبتك!'
                  : 'Send your CV to our email now, and we will review it carefully. We look forward to knowing your talent!'}
              </p>

              <a
                href={mailtoLink}
                className="inline-block bg-white text-indigo-700 dark:bg-indigo-600 dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                📩 {isRTL ? 'أرسل سيرتك الذاتية الآن' : 'Send Your CV Now'}
              </a>

              <div className="mt-6 text-white/80 text-sm">
                <p>{isRTL ? 'أو راسلنا مباشرة على:' : 'Or email us directly at:'}</p>
                <a
                  href={mailtoLink}
                  className="inline-block mt-2 font-mono text-base underline hover:text-white"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
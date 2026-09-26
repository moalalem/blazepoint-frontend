// src/components/Hero.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isRTL = i18n.language === 'ar';

  const slides = [
    {
      id: 1,
      title: isRTL ? 'هل أنت مستعد للتحول الرقمي؟' : 'Ready for Digital Transformation?',
      subtitle: isRTL
        ? 'انضم إلى أكثر من 100 عميل يثقون بـ BlazePoint لتنمية أعمالهم. نخدمك على مدار الساعة 24/7.'
        : 'Join 100+ clients who trust BlazePoint to grow their business. We serve you 24/7.',
      primaryButton: {
        label: isRTL ? 'احصل على استشارة مجانية' : 'Get a Free Consultation',
        to: '/contact',
      },
      secondaryButton: {
        label: isRTL ? 'اتصل بنا' : 'Call Us',
        href: 'tel:+96611418368',
        icon: '📞',
      },
      features: isRTL
        ? ['استشارة مجانية', 'رد خلال 24 ساعة', 'فريق خبراء']
        : ['Free Consultation', 'Response within 24h', 'Expert Team'],
    },
    {
      id: 2,
      title: isRTL ? 'حلول رقمية متكاملة بخبرة 14 سنة' : 'Integrated Digital Solutions with 14 Years of Experience',
      subtitle: isRTL
        ? 'أكثر من 250 مشروع ناجح، وشهادة ISO 27001، وفريق متخصص جاهز لتحويل فكرتك إلى واقع رقمي.'
        : '250+ successful projects, ISO 27001 certified, and a specialized team ready to turn your idea into reality.',
      primaryButton: {
        label: isRTL ? 'اكتشف خدماتنا' : 'Explore Our Services',
        to: '/services',
      },
      secondaryButton: {
        label: isRTL ? 'تعرف علينا' : 'About Us',
        to: '/about',
        icon: null,
      },
      features: isRTL
        ? ['خبرة 14 سنة', '250+ مشروع ناجح', 'شهادة ISO 27001']
        : ['14 Years Experience', '250+ Projects', 'ISO 27001 Certified'],
    },
    {
      id: 3,
      title: isRTL ? 'دعم ومراقبة ذكية بالذكاء الاصطناعي' : 'Smart Support & Monitoring with AI',
      subtitle: isRTL
        ? 'خدمات تطوير ومساندة مستمرة، مع مراقبة آلية على مدار الساعة مدعومة بالذكاء الاصطناعي لضمان استقرار أنظمتك.'
        : 'Continuous development and support services, with AI-powered 24/7 automated monitoring to ensure your systems stability.',
      primaryButton: {
        label: isRTL ? 'اطلب الدعم الفني' : 'Request Support',
        to: '/contact',
      },
      secondaryButton: {
        label: isRTL ? 'تعرف على الحلول' : 'Explore Solutions',
        to: '/services',
        icon: null,
      },
      features: isRTL
        ? ['مراقبة ذكية 24/7', 'صيانة دورية', 'تطوير مستمر']
        : ['24/7 Smart Monitoring', 'Regular Maintenance', 'Continuous Development'],
    },
    {
      id: 4,
      title: isRTL ? 'نبني حلولاً رقمية تصنع الفرق' : 'We Build Digital Solutions That Make a Difference',
      subtitle: isRTL
        ? 'نحن شركة سعودية متخصصة في تقديم الحلول الرقمية المتكاملة، من تصميم المواقع والتطبيقات إلى التسويق الرقمي والاستشارات التقنية.'
        : 'We are a Saudi company specialized in providing integrated digital solutions, from website and app design to digital marketing and technical consulting.',
      primaryButton: {
        label: isRTL ? 'تعرف علينا أكثر' : 'Learn More About Us',
        to: '/about',
      },
      secondaryButton: {
        label: isRTL ? 'تواصل معنا' : 'Contact Us',
        to: '/contact',
        icon: null,
      },
      features: isRTL
        ? ['شركة سعودية', '+100 عميل', '+14 سنة خبرة']
        : ['Saudi Company', '100+ Clients', '14+ Years Experience'],
    },
  ];

  const totalSlides = slides.length;

  const goToSlide = useCallback((index) => {
    setCurrentSlide((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        isRTL ? prevSlide() : nextSlide();
      } else if (e.key === 'ArrowLeft') {
        isRTL ? nextSlide() : prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRTL, nextSlide, prevSlide]);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 min-h-[550px] lg:min-h-[620px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* خلفيات زخرفية */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 -start-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -end-20 w-96 h-96 bg-indigo-400/30 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* زخارف نقطية */}
      <div className="absolute top-12 start-12 w-24 h-24 opacity-20 hidden lg:block">
        <svg viewBox="0 0 100 100" className="fill-white">
          {[...Array(5)].map((_, i) =>
            [...Array(5)].map((_, j) => (
              <circle key={`${i}-${j}`} cx={10 + i * 20} cy={10 + j * 20} r="2" />
            ))
          )}
        </svg>
      </div>
      <div className="absolute bottom-12 end-12 w-24 h-24 opacity-20 hidden lg:block">
        <svg viewBox="0 0 100 100" className="fill-white">
          {[...Array(5)].map((_, i) =>
            [...Array(5)].map((_, j) => (
              <circle key={`${i}-${j}`} cx={10 + i * 20} cy={10 + j * 20} r="2" />
            ))
          )}
        </svg>
      </div>

      {/* السلايدر */}
      <div className="container mx-auto px-4 lg:px-6 relative z-10 py-16">
        <div className="relative">

          {/* السلايدات - Grid Stack */}
          <div className="grid">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-4 pointer-events-none z-0'
                }`}
              >
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>

                  <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full sm:w-auto">
                    <Link
                      to={slide.primaryButton.to}
                      className="w-full sm:w-auto bg-white text-indigo-700 dark:bg-indigo-600 dark:text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-indigo-50 dark:hover:bg-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      {slide.primaryButton.label}
                    </Link>

                    {slide.secondaryButton.href ? (
                      <a
                        href={slide.secondaryButton.href}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/80 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      >
                        {slide.secondaryButton.icon && <span>{slide.secondaryButton.icon}</span>}
                        {slide.secondaryButton.label}
                      </a>
                    ) : (
                      <Link
                        to={slide.secondaryButton.to}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/80 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      >
                        {slide.secondaryButton.label}
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/90 text-sm sm:text-base">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={isRTL ? nextSlide : prevSlide}
            aria-label="Previous Slide"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 start-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={isRTL ? prevSlide : nextSlide}
            aria-label="Next Slide"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 end-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* نقاط التنقل */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-10 h-3 bg-white'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
// src/components/Testimonials.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  // ============================================
  // 💬 بيانات الشهادات
  // ============================================
  const testimonials = [
    {
      name: isRTL ? 'سعد الفهد' : 'Saad Alfahad',
      position: isRTL ? 'الرئيس التنفيذي - XYZ Corp' : 'CEO - XYZ Corp',
      text: isRTL
        ? 'بلييز بوينت هي الحل الأمثل لجميع احتياجات أعمالنا. فريقهم محترف ومتمكن، ويسلّم دائمًا في الوقت المحدد.'
        : 'BlazePoint is the ultimate solution provider for all our business needs. Their team is skilled, professional, and always delivers on time.',
      rating: 5,
      initials: isRTL ? 'س' : 'S',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      name: isRTL ? 'نوره الناصر' : 'Norah AL Naseer',
      position: isRTL ? 'الرئيس التنفيذي - ABC Inc' : 'CEO - ABC Inc',
      text: isRTL
        ? 'تعاونا مع بلييز بوينت لتطوير موقع التجارة الإلكترونية، وكانت النتائج مذهلة.'
        : 'We partnered with BlazePoint for developing our e-commerce website, and the results have been phenomenal.',
      rating: 5,
      initials: isRTL ? 'ن' : 'N',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      name: isRTL ? 'محمد صالح' : 'Mohammed Saleh',
      position: isRTL ? 'مدير خدمة العملاء - First Dimension' : 'Customer Service Manager - First Dimension',
      text: isRTL
        ? 'عززت بلييز بوينت جودة خدمة العملاء في مؤسستنا من خلال تنفيذ نظام إدارة خدمة العملاء.'
        : 'BlazePoint has enhanced the quality of customer service in our organization through the implementation of a customer service management system.',
      rating: 5,
      initials: isRTL ? 'م' : 'M',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      name: isRTL ? 'محمد العتيبي' : 'Mohammed Al-Otaibi',
      position: isRTL ? 'الرئيس التنفيذي - Tech Company' : 'CEO - Tech Company',
      text: isRTL
        ? 'قدم لنا فريق بلييز بوينت حلولاً تقنية متكاملة ساعدت في تنمية أعمالنا بشكل كبير.'
        : 'BlazePoint team provided us with integrated tech solutions that helped grow our business significantly.',
      rating: 5,
      initials: isRTL ? 'م' : 'M',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      name: isRTL ? 'سارة الأحمدي' : 'Sarah Al-Ahmadi',
      position: isRTL ? 'مديرة التسويق - Afaq' : 'Marketing Manager - Afaq',
      text: isRTL
        ? 'خدمات التسويق الرقمي من بلييز بوينت ضاعفت مبيعاتنا خلال 6 أشهر.'
        : 'The digital marketing services from BlazePoint doubled our sales within 6 months.',
      rating: 5,
      initials: isRTL ? 'س' : 'S',
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      name: isRTL ? 'ريم السالم' : 'Reem Al-Salem',
      position: isRTL ? 'مديرة العمليات - E-commerce' : 'Operations Manager - E-commerce',
      text: isRTL
        ? 'الموقع الذي صممته بلييز بوينت عزز مبيعاتنا بشكل ملحوظ.'
        : 'The website designed by BlazePoint significantly boosted our sales.',
      rating: 5,
      initials: isRTL ? 'ر' : 'R',
      gradient: 'from-violet-500 to-fuchsia-600',
    },
  ];

  // ============================================
  // 📐 حساب عدد البطاقات المرئية
  // ============================================
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const totalSlides = testimonials.length;
  const maxIndex = Math.max(0, totalSlides - visibleCards);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  // ============================================
  // التنقل
  // ============================================
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      isRTL ? prevSlide() : nextSlide();
    } else if (isRightSwipe) {
      isRTL ? nextSlide() : prevSlide();
    }
  };

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* 🎨 خلفيات زخرفية */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-0 start-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 start-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 end-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* 🎯 رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold mb-5">
            <span>💬</span>
            {isRTL ? 'آراء العملاء' : 'Testimonials'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            {isRTL ? (
              <>
                ماذا يقول <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">عملاؤنا</span> عنا
              </>
            ) : (
              <>
                What Our <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Clients Say</span> About Us
              </>
            )}
          </h2>

          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'نفخر بثقة عملائنا وآرائهم الإيجابية التي تدفعنا للاستمرار في تقديم الأفضل.'
              : 'We are proud of our clients\' trust and positive feedback that drives us to always deliver our best.'}
          </p>
        </div>

        {/* 🎠 السلايدر */}
        <div className="relative">
          <div
            className="overflow-hidden"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: isRTL
                  ? `translateX(${currentIndex * (100 / visibleCards)}%)`
                  : `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="group relative h-full transition-all duration-500">
                    <div className="relative h-full rounded-3xl p-7 backdrop-blur-xl border bg-white/[0.06] border-white/10 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 overflow-hidden">

                      <div
                        className={`absolute -top-24 -end-24 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-30`}
                      />

                      <div className="absolute top-4 end-6 text-7xl font-serif leading-none text-white/10 select-none pointer-events-none">
                        "
                      </div>

                      <div className="flex items-center gap-1 mb-5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <p className="relative text-white/90 text-base leading-relaxed mb-6 italic min-h-[100px]">
                        "{testimonial.text}"
                      </p>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-5" />

                      <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300`}>
                          {testimonial.initials}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-white font-bold text-sm truncate">
                            {testimonial.name}
                          </div>
                          <div className="text-white/60 text-xs truncate">
                            {testimonial.position}
                          </div>
                        </div>
                      </div>

                    </div>

                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-20 blur-lg -z-10 transition-opacity duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={isRTL ? nextSlide : prevSlide}
            aria-label="Previous"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -start-5 lg:-start-7 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={isRTL ? prevSlide : nextSlide}
            aria-label="Next"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -end-5 lg:-end-7 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 🔵 نقاط التنقل */}
        <div className="flex items-center justify-center gap-2.5 mt-12">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-10 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/50'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* ============================================
            ⭐ شريط الثقة السفلي (مُحسّن)
            ============================================ */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10">
            
            {/* الشارات (مُكبّرة) */}
            <div className="flex items-center -space-x-3 rtl:space-x-reverse">
              {testimonials.slice(0, 5).map((testimonial, i) => (
                <div
                  key={i}
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm ring-3 ring-slate-900 shadow-lg transition-all duration-300 hover:scale-125 hover:z-10 hover:ring-white/50 cursor-pointer`}
                >
                  {testimonial.initials}
                </div>
              ))}
            </div>

            {/* النص */}
            <div className="flex flex-col">
              <div className="text-white font-bold text-base">
                {isRTL ? '+100 عميل يثقون بنا' : '100+ Trusted Clients'}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-white/60 text-xs ms-1">5.0</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
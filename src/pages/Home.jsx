// src/pages/Home.jsx

import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Portfolio from '../components/Portfolio';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* ✅ SEO */}
      <SEO
        title="الصفحة الرئيسية"
        description="BlazePoint — شركة سعودية متخصصة في الحلول الرقمية المتكاملة: تصميم المواقع، التطبيقات، التسويق الرقمي، الأمن السيبراني، وحلول الذكاء الاصطناعي."
        keywords="BlazePoint, نقطة بريق, حلول رقمية, السعودية, الرياض, تصميم مواقع, تطبيقات, تسويق رقمي"
        url="https://blazepoint.net/"
      />

      {/* ✅ Hero */}
      <Hero />

      {/* ✅ Services */}
      <AnimatedSection direction="up">
        <Services />
      </AnimatedSection>

      {/* ✅ WhyUs */}
      <AnimatedSection direction="up">
        <WhyUs />
      </AnimatedSection>

      {/* ✅ Portfolio */}
      <AnimatedSection direction="up">
        <Portfolio />
      </AnimatedSection>

      {/* ✅ Partners */}
      <AnimatedSection direction="up">
        <Partners />
      </AnimatedSection>

      {/* ✅ Testimonials */}
      <AnimatedSection direction="up">
        <Testimonials />
      </AnimatedSection>

      {/* ✅ Blog */}
      <AnimatedSection direction="up">
        <Blog />
      </AnimatedSection>

      {/* ✅ Pricing */}
      <AnimatedSection direction="up">
        <Pricing />
      </AnimatedSection>

      {/* ✅ FAQ */}
      <AnimatedSection direction="up">
        <FAQ />
      </AnimatedSection>
    </main>
  );
};

export default Home;
// src/pages/Contact.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Contact = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: ربط بـ Backend API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white">
      <SEO
        title="تواصل معنا"
        description="تواصل مع فريق BlazePoint للحصول على استشارة مجانية أو طلب عرض سعر لمشروعك الرقمي."
        keywords="تواصل, اتصل بنا, استشارة مجانية, عرض سعر, BlazePoint"
        url="https://blazepoint.net/contact"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            {isRTL
              ? 'نحن هنا لمساعدتك. تواصل معنا للحصول على استشارة مجانية.'
              : 'We are here to help. Contact us for a free consultation.'}
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
                  <span>✅</span>
                  <span>{isRTL ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully!'}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {isRTL ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {isRTL ? 'الموضوع' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      placeholder={isRTL ? 'موضوع الرسالة' : 'Message subject'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {isRTL ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : (isRTL ? 'إرسال الرسالة' : 'Send Message')}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">

              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl mb-4">
                  📧
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{isRTL ? 'البريد الإلكتروني' : 'Email'}</h3>
                <a href="mailto:info@BlazePoint.net" className="text-indigo-600 hover:underline text-sm">
                  info@BlazePoint.net
                </a>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl mb-4">
                  📞
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{isRTL ? 'الهاتف' : 'Phone'}</h3>
                <a href="tel:+96611418368" className="text-indigo-600 hover:underline text-sm" dir="ltr">
                  +966 11 418 368
                </a>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-2xl mb-4">
                  📍
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{isRTL ? 'العنوان' : 'Address'}</h3>
                <p className="text-gray-600 text-sm">
                  {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
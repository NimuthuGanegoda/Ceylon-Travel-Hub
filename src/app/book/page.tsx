'use client';

import Section from '@/components/Section';
import { services } from '@/data/siteData';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      if (!el.classList.contains('animate-in')) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="min-h-screen pt-[44px]">
      {/* Hero */}
      <section className="hero-section min-h-[60vh]">
        <div className="max-w-[980px] mx-auto text-center px-5 py-20 fade-in">
          <h1 className="apple-headline mb-5">
            {t('bookHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('bookHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <Section>
        <div className="max-w-[640px] mx-auto">
          <form className="card space-y-5 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Phone/WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  placeholder="+1 555 123 4567"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Pickup Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Return Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Service Type
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all">
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Anything we should know?"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center text-[15px] py-3.5">
              Request Booking
            </button>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 text-center">
              We'll confirm availability and final price by email/WhatsApp.
            </p>
          </form>
        </div>
      </Section>

      {/* Pricing Info */}
      <Section title="Pricing Plans" className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="grid md:grid-cols-3 gap-6 max-w-[980px] mx-auto">
          {[
            { title: 'Daily', price: '$75', unit: '/day', features: ['200 km/day included', 'Additional km: $0.30/km', 'Basic insurance included'] },
            { title: 'Weekend', price: '$200', unit: '/Fri–Sun', features: ['600 km included', 'Flexible pickup times', 'Basic insurance included'] },
            { title: 'Weekly', price: '$450', unit: '/week', features: ['Unlimited km', 'Best value', 'Basic insurance included'], featured: true },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`card scroll-animate opacity-0 translate-y-8 transition-all duration-700 ${
                plan.featured ? 'ring-2 ring-[#0071e3] dark:ring-[#0071e3] scale-105' : ''
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <h3 className="text-[28px] font-semibold mb-5 text-gray-900 dark:text-white tracking-tight">{plan.title}</h3>
              <div className="mb-8">
                <span className="text-[56px] font-semibold text-gray-900 dark:text-white tracking-tighter">{plan.price}</span>
                <span className="text-[17px] text-gray-600 dark:text-gray-400 ml-1">{plan.unit}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[15px] text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-gray-600 dark:text-gray-400 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          Security deposit and ID required. Fuel and tolls not included. Prices are placeholders — update to your rates.
        </p>
      </Section>
    </main>
  );
}

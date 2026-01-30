'use client';

import Section from '@/components/Section';
import { siteData } from '@/data/siteData';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
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
            {t('contactHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('contactHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <Section>
        <div className="max-w-[640px] mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <a
              href={`tel:${siteData.contact.phone}`}
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
            >
              <div className="text-[40px] mb-3 transition-transform group-hover:scale-110 duration-300">📞</div>
              <p className="text-[15px] font-normal text-gray-900 dark:text-white">
                {siteData.contact.phone}
              </p>
            </a>
            <a
              href={`https://wa.me/${siteData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: '100ms' }}
            >
              <div className="text-[40px] mb-3 transition-transform group-hover:scale-110 duration-300">💬</div>
              <p className="text-[15px] font-normal text-gray-900 dark:text-white">
                {t('whatsappChat')}
              </p>
            </a>
            <a
              href={`mailto:${siteData.contact.email}`}
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="text-[40px] mb-3 transition-transform group-hover:scale-110 duration-300">✉️</div>
              <p className="text-[15px] font-normal text-gray-900 dark:text-white break-all">
                {siteData.contact.email}
              </p>
            </a>
          </div>

          {/* Contact Form */}
          <form className="card space-y-5 scroll-animate opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                {t('name')}
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                placeholder={t('yourNamePlaceholder')}
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                {t('email')}
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                placeholder={t('emailPlaceholder2')}
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                {t('message')}
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all resize-none"
                placeholder={t('howCanHelp')}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center text-[15px] py-3.5">
              {t('sendMessage')}
            </button>
          </form>
        </div>
      </Section>

      {/* Map */}
      <Section title={t('serviceArea')} className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto scroll-animate opacity-0 scale-95 transition-all duration-700">
          <div className="aspect-video rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/10">
            <iframe
              title="Sri Lanka map"
              src="https://www.google.com/maps?q=Sri+Lanka&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}

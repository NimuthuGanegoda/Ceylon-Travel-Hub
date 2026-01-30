'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Stop observing once animated to prevent re-triggering
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      // Only observe if not already animated
      if (!el.classList.contains('animate-in')) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-[980px] mx-auto text-center px-5 py-32 fade-in">
          <h1 className="apple-headline mb-5">
            {t('heroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 fade-in-delay-3">
            <a href="/tours" className="btn-primary">
              {t('exploreTours')}
            </a>
            <a href="/book" className="btn-secondary">
              {t('bookNow')}
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[980px] mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8">
            <a 
              href="/tours"
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
            >
              <div className="text-[64px] mb-4 transition-transform group-hover:scale-110 duration-300">🗺️</div>
              <h3 className="text-[24px] font-semibold mb-3 text-gray-900 dark:text-white">{t('exploreToursTitle')}</h3>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('exploreToursDesc')}
              </p>
            </a>

            <a 
              href="/vehicles"
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: '150ms' }}
            >
              <div className="text-[64px] mb-4 transition-transform group-hover:scale-110 duration-300">🚗</div>
              <h3 className="text-[24px] font-semibold mb-3 text-gray-900 dark:text-white">{t('ourVehicles')}</h3>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('ourVehiclesDesc')}
              </p>
            </a>

            <a 
              href="/gallery"
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: '300ms' }}
            >
              <div className="text-[64px] mb-4 transition-transform group-hover:scale-110 duration-300">📸</div>
              <h3 className="text-[24px] font-semibold mb-3 text-gray-900 dark:text-white">{t('galleryTitle')}</h3>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('galleryDesc')}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-[980px] mx-auto px-5">
          <h2 className="text-[40px] md:text-[48px] font-semibold text-center mb-16 text-gray-900 dark:text-white tracking-tight leading-tight">
            {t('whyChooseUs')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: '🏆', 
                title: t('premiumExperience'), 
                desc: t('premiumExperienceDesc')
              },
              { 
                icon: '🌍', 
                title: t('localExpertise'), 
                desc: t('localExpertiseDesc')
              },
              { 
                icon: '💯', 
                title: t('bestValue'), 
                desc: t('bestValueDesc')
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-[64px] mb-4">{item.icon}</div>
                <h3 className="text-[21px] font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[640px] mx-auto text-center px-5 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-[32px] font-semibold mb-4 text-gray-900 dark:text-white">
            {t('readyToStart')}
          </h2>
          <p className="text-[17px] text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {t('readyToStartDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/book" className="btn-primary">
              {t('bookNow')}
            </a>
            <a href="/contact" className="btn-secondary">
              {t('contactUs')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

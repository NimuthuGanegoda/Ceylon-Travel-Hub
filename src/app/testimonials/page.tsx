'use client';

import { testimonials } from '@/data/siteData';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TestimonialsPage() {
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
            {t('testimonialsHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('testimonialsHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="card scroll-animate opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00a0ff] flex items-center justify-center text-white text-[17px] font-semibold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[17px] text-gray-900 dark:text-white truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      {testimonial.country}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
                  {testimonial.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[640px] mx-auto text-center px-5 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-[32px] font-semibold mb-4 text-gray-900 dark:text-white">
            {t('joinHappyTravelers')}
          </h2>
          <p className="text-[17px] text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {t('startCreatingMemories')}
          </p>
          <a href="/book" className="btn-primary">
            {t('bookYourJourney')}
          </a>
        </div>
      </section>
    </main>
  );
}

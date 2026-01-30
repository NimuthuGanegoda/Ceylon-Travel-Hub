'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PricingPage() {
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
            {t('pricingHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('pricingHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[980px] mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                titleKey: 'daily', 
                price: '$75', 
                unitKey: 'perDay', 
                featureKeys: [
                  'kmPerDayIncluded',
                  'additionalKm030',
                  'basicInsurance',
                  'fuelNotIncluded',
                  'roadside247',
                  'flexiblePickup'
                ]
              },
              { 
                titleKey: 'weekend', 
                price: '$200', 
                unitKey: 'perWeekend', 
                featureKeys: [
                  'kmIncluded600',
                  'additionalKm025',
                  'basicInsurance',
                  'fuelNotIncluded',
                  'roadside247',
                  'freeDelivery'
                ]
              },
              { 
                titleKey: 'weekly', 
                price: '$450', 
                unitKey: 'perWeek', 
                featureKeys: [
                  'unlimitedKm',
                  'premiumInsurance',
                  'fuelNotIncluded',
                  'roadside247',
                  'freeDelivery',
                  'prioritySupport'
                ], 
                featured: true 
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`card scroll-animate opacity-0 translate-y-8 transition-all duration-700 ${
                  plan.featured ? 'ring-2 ring-[#0071e3] dark:ring-[#0071e3] scale-105' : ''
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {plan.featured && (
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-1 bg-[#0071e3] text-white text-[12px] font-medium rounded-full">
                      {t('bestValueBadge')}
                    </span>
                  </div>
                )}
                <h3 className="text-[28px] font-semibold mb-5 text-gray-900 dark:text-white tracking-tight text-center">
                  {t(plan.titleKey)}
                </h3>
                <div className="mb-8 text-center">
                  <span className="text-[56px] font-semibold text-gray-900 dark:text-white tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-[17px] text-gray-600 dark:text-gray-400 ml-1">{t(plan.unitKey)}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.featureKeys.map((featureKey, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t(featureKey)}
                    </li>
                  ))}
                </ul>
                <a href="/book" className={plan.featured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
                  {t('getStarted')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-[32px] font-semibold mb-8 text-gray-900 dark:text-white text-center">
            {t('whatsIncluded')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
            {[
              t('validLicense'),
              t('securityDeposit'),
              t('comprehensiveInsurance'),
              t('gpsIncluded'),
              t('childSeats'),
              t('airportPickup'),
              t('paymentOptions'),
              t('cancellation'),
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-[#1d1d1f] rounded-xl">
                <svg className="w-5 h-5 text-[#0071e3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[15px] text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[640px] mx-auto text-center px-5 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-[32px] font-semibold mb-4 text-gray-900 dark:text-white">
            {t('readyToBook')}
          </h2>
          <p className="text-[17px] text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {t('getStartedAdventure')}
          </p>
          <a href="/book" className="btn-primary">
            {t('bookNow')}
          </a>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BusFinder } from '@/components/BusFinder';
import { TrainFinder } from '@/components/TrainFinder';
import { busRoutes } from '@/data/bus-routes';
import { trainRoutes } from '@/data/train-routes';
import { Bus, Train } from 'lucide-react';

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();
  const [searchMode, setSearchMode] = useState<'bus' | 'train'>('bus');

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
  }, [searchMode]); // Re-run when mode changes to catch new elements

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

          <div className="fade-in-delay-2 mb-8 flex justify-center gap-4">
            <button
              onClick={() => setSearchMode('bus')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-medium transition-all ${
                searchMode === 'bus'
                  ? 'bg-[#0071e3] text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Bus className="w-5 h-5" />
              Find Buses
            </button>
            <button
              onClick={() => setSearchMode('train')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-medium transition-all ${
                searchMode === 'train'
                  ? 'bg-[#0071e3] text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Train className="w-5 h-5" />
              Find Trains
            </button>
          </div>

          <div className="fade-in-delay-3">
            {searchMode === 'bus' ? <BusFinder /> : <TrainFinder />}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[980px] mx-auto px-5">
          <h2 className="text-[32px] font-semibold text-center mb-10 text-gray-900 dark:text-white">
            Popular {searchMode === 'bus' ? 'Bus' : 'Train'} Routes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {searchMode === 'bus' ? (
              busRoutes.slice(0, 3).map((route, idx) => (
                <div
                  key={route.id}
                  className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="text-[64px] mb-4 transition-transform group-hover:scale-110 duration-300">🚌</div>
                  <h3 className="text-[24px] font-semibold mb-3 text-gray-900 dark:text-white">
                    {route.number}: {route.origin} - {route.destination}
                  </h3>
                  <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {route.frequency} • {route.type}
                  </p>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {route.departureTime} - {route.arrivalTime}
                  </div>
                </div>
              ))
            ) : (
              trainRoutes.slice(0, 3).map((route, idx) => (
                <div
                  key={route.id}
                  className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="text-[64px] mb-4 transition-transform group-hover:scale-110 duration-300">🚂</div>
                  <h3 className="text-[24px] font-semibold mb-3 text-gray-900 dark:text-white">
                    {route.name}
                  </h3>
                  <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {route.origin} - {route.destination}
                  </p>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {route.departureTime} - {route.arrivalTime}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <a href={searchMode === 'bus' ? "/bus-system" : "/train-system"} className="btn-secondary inline-block">
              {t('exploreTours')}
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
            <a href="/bus-system" className="btn-primary">
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

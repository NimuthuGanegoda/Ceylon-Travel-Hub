'use client';

import Section from '@/components/Section';
import { services } from '@/data/siteData';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ToursPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();
  
  // Translate service titles and descriptions
  const translateServiceTitle = (id: string): string => {
    const titleMap: { [key: string]: string } = {
      'self-drive': t('selfDriveTitle'),
      'driver': t('driverTitle'),
      'driver-guide': t('driverGuideTitle'),
      'airport-transfer': t('airportTransferTitle'),
    };
    return titleMap[id] || id;
  };
  
  const translateServiceDesc = (id: string): string => {
    const descMap: { [key: string]: string } = {
      'self-drive': t('selfDriveDesc'),
      'driver': t('driverDesc'),
      'driver-guide': t('driverGuideDesc'),
      'airport-transfer': t('airportTransferDesc'),
    };
    return descMap[id] || id;
  };

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
            {t('toursHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('toursHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Services */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[980px] mx-auto">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className="card text-center group scroll-animate opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="text-[56px] mb-5 transition-transform group-hover:scale-110 duration-300">{service.icon}</div>
              <h3 className="text-[21px] font-semibold mb-2.5 text-gray-900 dark:text-white tracking-tight">
                {translateServiceTitle(service.id)}
              </h3>
              <p className="text-[15px] font-normal text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                {translateServiceDesc(service.id)}
              </p>
              <a href="/book" className="btn-secondary w-full justify-center text-[14px]">
                {t('book')} {translateServiceTitle(service.id)}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Tour Highlights */}
      <Section title={t('whyChooseTours')} className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto grid md:grid-cols-2 gap-8">
          {[
            { icon: '🗺️', titleKey: 'customItineraries', descKey: 'customItinerariesDesc' },
            { icon: '👨‍✈️', titleKey: 'expertGuides', descKey: 'expertGuidesDesc' },
            { icon: '🏛️', titleKey: 'culturalImmersion', descKey: 'culturalImmersionDesc' },
            { icon: '📸', titleKey: 'photoOpportunities', descKey: 'photoOpportunitiesDesc' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="flex gap-4 scroll-animate opacity-0 translate-x-8 transition-all duration-700"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="text-[48px] flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-[21px] font-semibold mb-2 text-gray-900 dark:text-white">{t(item.titleKey)}</h3>
                <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Popular Destinations */}
      <Section title={t('popularDestinations')}>
        <div className="grid md:grid-cols-3 gap-6 max-w-[980px] mx-auto">
          {[
            { nameKey: 'sigiriyaRock', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=600' },
            { nameKey: 'galleFort', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=600' },
            { nameKey: 'templeOfTooth', image: 'https://images.unsplash.com/photo-1580840312934-8cdab42d6a05?q=80&w=600' },
            { nameKey: 'yalaPark', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600' },
            { nameKey: 'ellaRock', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=600' },
            { nameKey: 'mirissaBeach', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600' },
          ].map((dest, idx) => (
            <div 
              key={idx}
              className="card p-0 overflow-hidden scroll-animate opacity-0 scale-95 transition-all duration-700"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={dest.image}
                  alt={t(dest.nameKey)}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white">{t(dest.nameKey)}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

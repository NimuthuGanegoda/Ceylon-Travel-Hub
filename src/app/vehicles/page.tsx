'use client';

import Section from '@/components/Section';
import { vehicles } from '@/data/siteData';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VehiclesPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();
  
  // Translate vehicle features
  const translateFeature = (feature: string): string => {
    const featureMap: { [key: string]: string } = {
      'Virtual Cockpit': t('virtualCockpit'),
      'LED Headlights': t('ledHeadlights'),
      'Parking Sensors': t('parkingSensors'),
      'Apple CarPlay / Android Auto': t('carPlay'),
      '405 L Boot': t('bootSpace'),
      'Multiple Classes': t('multipleClasses'),
      'Flexible Pricing': t('flexiblePricing'),
      'Modern Safety Tech': t('modernSafety'),
    };
    return featureMap[feature] || feature;
  };
  
  const translateVehicleName = (name: string): string => {
    if (name === 'More Vehicles Coming Soon') return t('moreVehiclesComing');
    return name;
  };
  
  const translateSegment = (segment: string): string => {
    if (segment === 'Compact SUV') return t('compactSuv');
    if (segment === 'Fleet Expansion') return t('fleetExpansion');
    return segment;
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
            {t('vehiclesHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('vehiclesHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Vehicles Grid */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-[980px] mx-auto">
          {vehicles.map((vehicle, idx) => (
            <div 
              key={vehicle.id} 
              className="card scroll-animate opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="aspect-[16/10] relative overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800">
                <img
                  src={vehicle.thumbImage}
                  alt={vehicle.name}
                  className="object-cover w-full h-full hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="text-[28px] font-semibold mb-1.5 text-gray-900 dark:text-white tracking-tight">
                {translateVehicleName(vehicle.name)}
              </h3>
              <p className="text-[14px] font-normal text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-5">
                {translateSegment(vehicle.segment)}
              </p>
              <div className="space-y-2.5 mb-6">
                {vehicle.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[15px] text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-[#0071e3] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {translateFeature(feature)}
                  </div>
                ))}
              </div>
              {vehicle.status === 'available' ? (
                <a href="/book" className="btn-primary w-full justify-center">
                  {t('book')} {vehicle.name.split(' ')[0]}
                </a>
              ) : (
                <span className="block text-center text-[14px] text-gray-500 dark:text-gray-400 py-3.5 bg-gray-50 dark:bg-white/5 rounded-full">
                  {t('comingSoon')}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section title={t('featuresSpecs')} className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[19px] font-normal leading-relaxed text-gray-600 dark:text-gray-400 mb-12 text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700">
            {t('comfortConfig')}
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              t('powertrainSpec'),
              t('lightingSpec'),
              t('cabinTechSpec'),
              t('safetySpec'),
              t('assistsSpec'),
              t('practicalitySpec'),
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-5 bg-white dark:bg-[#1d1d1f] rounded-2xl hover:shadow-md transition-shadow scroll-animate opacity-0 translate-y-8"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <svg className="w-5 h-5 text-[#0071e3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[15px] text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}

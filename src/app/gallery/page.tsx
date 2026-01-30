'use client';

import Section from '@/components/Section';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GalleryPage() {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      if (!el.classList.contains('animate-in')) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const images = [
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800',
    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800',
    'https://images.unsplash.com/photo-1517940310602-1152b9f2c055?q=80&w=800',
    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800',
    'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=800',
    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800',
    'https://images.unsplash.com/photo-1580840312934-8cdab42d6a05?q=80&w=800',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800',
    'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=800',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800',
    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800',
    'https://images.unsplash.com/photo-1563299796-17596ed6b017?q=80&w=800',
  ];

  return (
    <main className="min-h-screen pt-[44px]">
      {/* Hero */}
      <section className="hero-section min-h-[60vh]">
        <div className="max-w-[980px] mx-auto text-center px-5 py-20 fade-in">
          <h1 className="apple-headline mb-5">
            {t('galleryHeroTitle')}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {t('galleryHeroSubtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-[1200px] mx-auto">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 scroll-animate opacity-0 scale-95 transition-all duration-700"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[640px] mx-auto text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-[32px] font-semibold mb-4 text-gray-900 dark:text-white">
            {t('createMemories')}
          </h2>
          <p className="text-[17px] text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {t('bookAdventure')}
          </p>
          <a href="/book" className="btn-primary">
            {t('bookYourTour')}
          </a>
        </div>
      </Section>
    </main>
  );
}

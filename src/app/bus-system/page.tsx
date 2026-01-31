'use client';

import { BusFinder } from '@/components/BusFinder';

export default function BusSystemPage() {
  return (
    <main className="min-h-screen pt-[44px] bg-[#fbfbfd] dark:bg-black">
      <div className="max-w-[980px] mx-auto px-5 py-20">
        <div className="text-center mb-16 fade-in">
          <h1 className="apple-headline mb-5">
            Sri Lanka Bus Finder
          </h1>
          <p className="apple-subheadline max-w-2xl mx-auto">
            Find the right bus, route, and schedule for your journey across Sri Lanka
          </p>
        </div>
        
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <BusFinder />
        </div>
      </div>
    </main>
  );
}

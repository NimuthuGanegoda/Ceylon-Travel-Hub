import RouteMaster from '@/components/RouteMaster/RouteMaster';

export const metadata = {
  title: 'Sri Lanka RouteMaster - Bus Fares & Schedules',
  description: 'Find bus routes and real-time fees in Sri Lanka. Calculate fares for Normal, Semi-Luxury, and AC buses.',
};

export default function RouteMasterPage() {
  return (
    <main className="min-h-screen pt-[44px] bg-[#fbfbfd] dark:bg-black">
      <div className="max-w-[980px] mx-auto px-5 py-20">
        <div className="text-center mb-16 fade-in">
          <h1 className="apple-headline mb-5">
            Sri Lanka RouteMaster
          </h1>
          <p className="apple-subheadline max-w-2xl mx-auto">
            Live bus fares, route intelligence, and arrival estimates.
          </p>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <RouteMaster />
        </div>
      </div>
    </main>
  );
}

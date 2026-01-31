import RouteMaster from '@/components/RouteMaster/RouteMaster';

export const metadata = {
  title: 'Sri Lanka RouteMaster - Bus Fares & Schedules',
  description: 'Find bus routes and real-time fees in Sri Lanka. Calculate fares for Normal, Semi-Luxury, and AC buses.',
};

export default function RouteMasterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Sri Lanka RouteMaster
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Live bus fares, route intelligence, and arrival estimates.
            </p>
        </div>

        <RouteMaster />
      </div>
    </div>
  );
}

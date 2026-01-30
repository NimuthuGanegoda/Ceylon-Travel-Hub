import { BusFinder } from '@/components/BusFinder';

export default function BusSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sri Lanka Bus Finder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the right bus, route, and schedule for your journey across Sri Lanka
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <BusFinder />
        </div>
      </div>
    </div>
  );
}
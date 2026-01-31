'use client';

import { MapPin, Navigation, Search } from 'lucide-react';
import { searchSchema } from '@/lib/schemas';
import { useState } from 'react';

interface SearchFormProps {
  origin: string;
  setOrigin: (val: string) => void;
  destination: string;
  setDestination: (val: string) => void;
  useCurrentLocation: boolean;
  setUseCurrentLocation: (val: boolean) => void;
  loading: boolean;
  onSearch: (e: React.FormEvent) => void;
}

export default function SearchForm({
  origin,
  setOrigin,
  destination,
  setDestination,
  useCurrentLocation,
  setUseCurrentLocation,
  loading,
  onSearch
}: SearchFormProps) {
  const [errors, setErrors] = useState<{ origin?: string; destination?: string }>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // If using current location, we only validate destination
    // If not, we validate both
    const validationObject = useCurrentLocation
        ? { origin: 'GPS Location', destination }
        : { origin, destination };

    const result = searchSchema.safeParse(validationObject);

    if (!result.success) {
       const fieldErrors: { origin?: string; destination?: string } = {};
       result.error.issues.forEach(issue => {
         if (issue.path[0]) {
            // @ts-ignore
            fieldErrors[issue.path[0]] = issue.message;
         }
       });
       // If using GPS, ignore origin error
       if (useCurrentLocation) {
           delete fieldErrors.origin;
       }

       if (Object.keys(fieldErrors).length > 0) {
           setErrors(fieldErrors);
           return;
       }
    }

    onSearch(e);
  };

  return (
    <div className="card glass p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Navigation className="text-[#0071e3]" />
        Find Your Bus
      </h2>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="origin" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Starting Point
            </label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#0071e3] transition-colors" />
              <div className="flex gap-2">
                <input
                  type="text"
                  id="origin"
                  value={origin}
                  onChange={(e) => { setOrigin(e.target.value); setErrors({...errors, origin: undefined}); }}
                  placeholder="Enter starting location"
                  disabled={useCurrentLocation}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.origin ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setUseCurrentLocation(!useCurrentLocation)}
                  className={`px-4 py-2 rounded-xl border transition-all duration-200 flex items-center gap-2 font-medium ${
                    useCurrentLocation
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  title="Use GPS"
                >
                  <Navigation className="w-4 h-4" />
                  <span className="hidden sm:inline">GPS</span>
                </button>
              </div>
            </div>
            {errors.origin && <p className="text-red-500 text-xs">{errors.origin}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="destination" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Destination
            </label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#0071e3] transition-colors" />
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setErrors({...errors, destination: undefined}); }}
                placeholder="Enter destination"
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.destination ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all`}
              />
            </div>
            {errors.destination && <p className="text-red-500 text-xs">{errors.destination}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || (!origin && !useCurrentLocation) || !destination}
          className="w-full btn-primary h-12 text-lg font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Buses
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

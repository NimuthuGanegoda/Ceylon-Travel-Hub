'use client';

import { useState } from 'react';
import { MapPin, Navigation, Search as SearchIcon } from 'lucide-react';
import { searchSchema } from '@/lib/schemas';

interface SearchProps {
  onSearch: (origin: string, terminal: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [origin, setOrigin] = useState('');
  const [terminal, setTerminal] = useState('');
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [errors, setErrors] = useState<{ origin?: string; destination?: string }>({});

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd call a reverse geocoding API here.
        // For now, we simulate finding the closest stop.
        setTimeout(() => {
            setOrigin(`Pettah (Nearby)`);
            setLoadingLoc(false);
            setErrors(prev => ({ ...prev, origin: undefined }));
        }, 1000);
      },
      (error) => {
        alert('Unable to retrieve your location');
        setLoadingLoc(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // We reuse searchSchema which expects 'destination' but here we have 'terminal'.
    // Mapping terminal -> destination for validation
    const validationObject = { origin, destination: terminal };
    const result = searchSchema.safeParse(validationObject);

    if (!result.success) {
      const fieldErrors: { origin?: string; destination?: string } = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
           // @ts-ignore
           fieldErrors[issue.path[0]] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onSearch(origin, terminal);
  };

  return (
    <div className="card glass p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Navigation className="text-[#0071e3]" />
        Find Your Route
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Official Origin (Start)
            </label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#0071e3] transition-colors" />
              <input
                type="text"
                placeholder="e.g. Makumbura"
                value={origin}
                onChange={(e) => { setOrigin(e.target.value); setErrors(prev => ({...prev, origin: undefined})); }}
                className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.origin ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all`}
                required
              />
              <button
                type="button"
                onClick={handleLocate}
                disabled={loadingLoc}
                className="absolute right-2 top-2 p-1.5 text-[#0071e3] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Use Current Location"
              >
                {loadingLoc ? (
                  <div className="animate-spin h-5 w-5 border-2 border-[#0071e3] border-t-transparent rounded-full" />
                ) : (
                  <Navigation className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.origin && <p className="text-red-500 text-xs">{errors.origin}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Official Terminal (End)
            </label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#0071e3] transition-colors" />
              <input
                type="text"
                placeholder="e.g. Galle"
                value={terminal}
                onChange={(e) => { setTerminal(e.target.value); setErrors(prev => ({...prev, destination: undefined})); }}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.destination ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all`}
                required
              />
            </div>
            {errors.destination && <p className="text-red-500 text-xs">{errors.destination}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary h-12 text-lg font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          <SearchIcon className="h-5 w-5" />
          Search Routes & Fares
        </button>
      </form>
    </div>
  );
}

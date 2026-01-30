'use client';

import { useState } from 'react';
import { MapPin, Navigation, Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (origin: string, terminal: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [origin, setOrigin] = useState('');
  const [terminal, setTerminal] = useState('');
  const [loadingLoc, setLoadingLoc] = useState(false);

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
    if (origin && terminal) {
      onSearch(origin, terminal);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Navigation className="text-blue-600" />
        Find Your Route
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Official Origin (Start)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Makumbura"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                required
              />
              <button
                type="button"
                onClick={handleLocate}
                disabled={loadingLoc}
                className="absolute right-2 top-2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Use Current Location"
              >
                {loadingLoc ? (
                  <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
                ) : (
                  <Navigation className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Official Terminal (End)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Galle"
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <SearchIcon className="h-5 w-5" />
          Search Routes & Fares
        </button>
      </form>
    </div>
  );
}

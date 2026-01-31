'use client';

import { FareDetails } from '@/utils/pricing';
import { Bus, Armchair, Zap } from 'lucide-react';

interface FareDisplayProps {
  fares: FareDetails | null;
  expresswayRate?: number | null; // Optional override for expressway
  origin: string;
  terminal: string;
}

export default function FareDisplay({ fares, expresswayRate, origin, terminal }: FareDisplayProps) {
  if (!fares && !expresswayRate) return null;

  return (
    <div className="w-full mt-8 fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">Estimated Fares for</h3>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {origin} <span className="text-gray-400 mx-2">→</span> {terminal}
        </h2>
        {fares && (
            <p className="text-sm text-gray-500 mt-2">Stage: {fares.stage}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Normal Bus */}
        {fares && (
          <div className="card border-l-4 border-l-blue-500 p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Bus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Normal</span>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">Rs. {fares.normal}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Standard non-AC service. Frequent stops.
            </p>
          </div>
        )}

        {/* Semi-Luxury */}
        {fares && (
          <div className="card border-l-4 border-l-purple-500 p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Armchair className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Semi-Luxury</span>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">Rs. {fares.semiLuxury}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Limited stops, more comfortable seating.
            </p>
          </div>
        )}

        {/* AC / Intercity / Expressway */}
        <div className="card border-l-4 border-l-orange-500 p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">AC / Express</span>
          </div>
          <div className="mt-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              Rs. {expresswayRate ? expresswayRate : (fares ? fares.ac : 'N/A')}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {expresswayRate
                ? "Expressway flat rate. Fastest option."
                : "Air-conditioned intercity service."}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
            * Fares are subject to NTC revision. Last updated from live source.
        </p>
      </div>
    </div>
  );
}

'use client';

import { LocationPoint } from '@/utils/location-utils';
import { MapPin } from 'lucide-react';

interface NearestStopsProps {
  stops: { location: LocationPoint; distance: number }[];
}

export default function NearestStops({ stops }: NearestStopsProps) {
  if (stops.length === 0) return null;

  return (
    <div className="card bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 mb-8 fade-in">
      <h3 className="text-lg font-semibold text-[#0071e3] dark:text-blue-400 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Nearby Bus Stops
      </h3>
      <div className="space-y-3">
        {stops.map((stop, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {stop.location.name}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {stop.distance.toFixed(2)} km
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

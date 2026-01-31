'use client';

import { BusRoute } from '@/data/bus-routes';
import { Bus, Clock, Calendar, Ticket } from 'lucide-react';

interface SearchResultsProps {
  results: BusRoute[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Available Buses
        <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {results.length} results
        </span>
      </h2>

      <div className="grid gap-6">
        {results.map((route, idx) => (
          <div
            key={route.id}
            className="card group hover:scale-[1.01] transition-all duration-300"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    route.type === 'express'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                      : route.type === 'night'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {route.type}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Bus #{route.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0071e3] transition-colors">
                  {route.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Bus className="w-4 h-4 text-gray-400" />
                    <span>{route.operator}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{route.departureTime} - {route.arrivalTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{route.frequency}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-wrap gap-2">
                    {route.stops.map((stop, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-6">
                <div className="text-right">
                  <span className="block text-sm text-gray-500 mb-1">Fare per person</span>
                  <span className="text-2xl font-bold text-[#0071e3] dark:text-white">
                    Rs. {route.fare}
                  </span>
                </div>

                <button className="btn-secondary w-full md:w-auto mt-4 md:mt-0 text-sm py-2">
                  Book Seat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

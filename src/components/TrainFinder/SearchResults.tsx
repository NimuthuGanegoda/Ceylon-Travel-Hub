'use client';

import { TrainRoute } from '@/data/train-routes';
import { Train, Clock, Calendar, Tag } from 'lucide-react';

interface SearchResultsProps {
  results: TrainRoute[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Available Trains
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
                      : route.type === 'night-mail'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                        : route.type === 'intercity'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {route.type}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Train #{route.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0071e3] transition-colors">
                  {route.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Train className="w-4 h-4 text-gray-400" />
                    <span>{route.line}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{route.departureTime} - {route.arrivalTime} ({route.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{route.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span>Classes: {route.availableClasses.join(', ')}</span>
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

              <div className="flex flex-col justify-between items-end min-w-[160px] border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-6">
                <div className="text-right w-full">
                  <span className="block text-sm text-gray-500 mb-2">Fares</span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {route.fare.firstClass && (
                      <>
                        <span className="text-gray-600 dark:text-gray-400">1st:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">Rs. {route.fare.firstClass}</span>
                      </>
                    )}
                    <>
                      <span className="text-gray-600 dark:text-gray-400">2nd:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Rs. {route.fare.secondClass}</span>
                    </>
                    <>
                      <span className="text-gray-600 dark:text-gray-400">3rd:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Rs. {route.fare.thirdClass}</span>
                    </>
                  </div>
                </div>

                <button
                  className="btn-secondary w-full md:w-auto mt-4 md:mt-0 text-sm py-2"
                  disabled
                  aria-disabled="true"
                  title="Seat availability checking will be available soon"
                >
                  Check Seats (coming soon)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

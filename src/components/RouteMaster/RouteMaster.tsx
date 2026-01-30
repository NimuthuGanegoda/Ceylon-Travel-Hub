'use client';

import { useState } from 'react';
import Search from './Search';
import FareDisplay from './FareDisplay';
import ArrivalSimulation from './ArrivalSimulation';
import { fetchFareByStage, fetchExpresswayFares } from '@/services/fareService';
import { FareDetails, estimateStageFromDistance } from '@/utils/pricing';

export default function RouteMaster() {
  const [fares, setFares] = useState<FareDetails | null>(null);
  const [expresswayRate, setExpresswayRate] = useState<number | null>(null);
  const [route, setRoute] = useState<{origin: string, terminal: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSim, setShowSim] = useState(false);

  const handleSearch = async (origin: string, terminal: string) => {
     setLoading(true);
     setRoute({ origin, terminal });
     setFares(null);
     setExpresswayRate(null);
     setShowSim(true); // Show simulation on search

     try {
        // Check expressway routes first
        const expRoutes = await fetchExpresswayFares();
        const routeKey = `${origin}-${terminal}`.toLowerCase();

        // Simple fuzzy match for demo
        const match = expRoutes.find(r => {
             const rLower = r.route.toLowerCase();
             // Check if both locations appear in the route string
             return rLower.includes(origin.toLowerCase()) && rLower.includes(terminal.toLowerCase());
        });

        if (match && match.fare) {
             setExpresswayRate(match.fare);
             // Estimate stage for comparison (e.g., 100km)
             const stage = estimateStageFromDistance(100);
             const f = await fetchFareByStage(stage);
             setFares(f);
        } else {
             // Mock distance calculation based on input length to be deterministic
             // e.g., "Colombo" (7) + "Kandy" (5) = 12 * 8 = 96km
             const mockDist = (origin.length + terminal.length) * 8;
             const stage = estimateStageFromDistance(mockDist);
             const f = await fetchFareByStage(stage);
             setFares(f);
        }
     } catch (error) {
         console.error("Error fetching fares:", error);
     } finally {
         setLoading(false);
     }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full space-y-8">
            <Search onSearch={handleSearch} />

            {loading && (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Calculating fares based on NTC revisions...</p>
                </div>
            )}

            {!loading && route && (fares || expresswayRate) && (
                <FareDisplay
                    fares={fares}
                    expresswayRate={expresswayRate}
                    origin={route.origin}
                    terminal={route.terminal}
                />
            )}
        </div>

        {/* Sidebar / Simulation */}
        <div className="w-full lg:w-auto flex flex-col gap-6">
            <div className="lg:sticky lg:top-24 space-y-6">
                 {/* Only show simulation if active or just always show it as a widget?
                     User said "Show a 'Soon to Come' arrival simulation".
                     I'll show it always or when needed. */}
                 <ArrivalSimulation />

                 <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 max-w-sm">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Did you know?</h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                        Fares are regulated by the National Transport Commission (NTC).
                        Semi-Luxury buses charge 1.5x the normal fare, while AC buses charge 2.0x.
                    </p>
                 </div>
            </div>
        </div>
    </div>
  );
}

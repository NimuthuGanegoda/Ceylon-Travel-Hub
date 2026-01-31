'use client';

import { useEffect, useState } from 'react';
import { Clock, Navigation2 } from 'lucide-react';

interface IncomingBus {
  id: number;
  routeNo: string;
  destination: string;
  type: 'Normal' | 'AC' | 'Semi';
  minutesAway: number;
}

export default function ArrivalSimulation() {
  const [buses, setBuses] = useState<IncomingBus[]>([]);

  useEffect(() => {
    // Initial mock data
    const initialBuses: IncomingBus[] = [
      { id: 1, routeNo: '138', destination: 'Pettah', type: 'Normal', minutesAway: 5 },
      { id: 2, routeNo: '138/1', destination: 'Maharagama', type: 'AC', minutesAway: 12 },
      { id: 3, routeNo: '122', destination: 'Avissawella', type: 'Normal', minutesAway: 18 },
    ];
    setBuses(initialBuses);

    // Simulate ticking
    const interval = setInterval(() => {
      setBuses(current =>
        current.map(bus => ({
          ...bus,
          minutesAway: Math.max(0, bus.minutesAway - 0.1) // Slow down the tick for demo
        })).sort((a, b) => a.minutesAway - b.minutesAway)
      );
    }, 6000); // Update every 6 seconds (0.1 minute)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl max-w-sm w-full border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
        <h3 className="font-bold text-lg uppercase tracking-wide">Live Arrivals</h3>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <div key={bus.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                bus.type === 'AC' ? 'bg-orange-500/20 text-orange-400' :
                bus.type === 'Semi' ? 'bg-purple-500/20 text-purple-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                <Navigation2 className="h-5 w-5 transform -rotate-45" />
              </div>
              <div>
                <div className="font-bold text-lg leading-none">{bus.routeNo}</div>
                <div className="text-xs text-gray-400 mt-1">{bus.destination}</div>
              </div>
            </div>

            <div className="text-right">
               <div className="flex items-center gap-1 justify-end text-green-400 font-bold text-xl">
                 {Math.ceil(bus.minutesAway)} <span className="text-xs font-normal opacity-70">min</span>
               </div>
               <div className="text-xs text-gray-500 uppercase">{bus.type}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-xs text-gray-500">
        <span>Nearest Stop: Makumbura</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Updated just now
        </span>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { BusRoute, busRoutes } from '@/data/bus-routes';
import { LocationPoint, findNearestLocations, busStopsData } from '@/utils/location-utils';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface FareData {
  normal: number;
  semiLuxury: number;
  ac: number;
  expressway: number;
}

interface FareResponse {
  lastUpdated: string;
  fares: Record<string, FareData>;
}

const BusFinder = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [searchResults, setSearchResults] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [nearestStops, setNearestStops] = useState<{ location: LocationPoint; distance: number }[]>([]);
  const [fares, setFares] = useState<Record<string, FareData>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [fareLoading, setFareLoading] = useState<boolean>(false);
  const [busType, setBusType] = useState<'normal' | 'semiLuxury' | 'ac' | 'expressway'>('normal');



  // Fetch live fares from NTC
  const fetchLiveFares = async () => {
    setFareLoading(true);
    
    try {
      // In a real implementation, this would call our backend API
      // const response = await fetch('/api/ntc-fares');
      // const data: FareResponse = await response.json();
      
      // For demo purposes, simulate the API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock fare data based on Sri Lankan routes
      const mockFares: Record<string, FareData> = {
        'colombo-kandy': { normal: 100, semiLuxury: 150, ac: 200, expressway: 250 },
        'colombo-galle': { normal: 120, semiLuxury: 180, ac: 240, expressway: 300 },
        'colombo-jaffna': { normal: 500, semiLuxury: 750, ac: 1000, expressway: 1250 },
        'kandy-galle': { normal: 200, semiLuxury: 300, ac: 400, expressway: 500 },
        'colombo-negombo': { normal: 80, semiLuxury: 120, ac: 160, expressway: 200 },
        'colombo-kurunegala': { normal: 150, semiLuxury: 225, ac: 300, expressway: 375 },
        'colombo-anuradhapura': { normal: 350, semiLuxury: 525, ac: 700, expressway: 875 },
        'colombo-trincomalee': { normal: 450, semiLuxury: 675, ac: 900, expressway: 1125 },
        'colombo-batticaloa': { normal: 550, semiLuxury: 825, ac: 1100, expressway: 1375 },
        'galle-matara': { normal: 60, semiLuxury: 90, ac: 120, expressway: 150 }
      };
      
      setFares(mockFares);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching fares:', error);
      setError('Failed to fetch latest fare data. Using default values.');
    } finally {
      setFareLoading(false);
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, we would reverse geocode these coordinates to get the location name
          const userLocation: Location = {
            lat: latitude,
            lng: longitude,
            name: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          };
          
          setCurrentLocation(userLocation);
          setOrigin(`Current Location`);
          
          // Find nearest bus stops
          const nearest = findNearestLocations(
            { lat: latitude, lng: longitude, name: userLocation.name },
            busStopsData,
            3 // Return top 3 nearest stops
          );
          setNearestStops(nearest);
        },
        (error) => {
          setError('Unable to retrieve your location. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    }
    // Fetch live fares when component mounts
    fetchLiveFares();
  }, [useCurrentLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Filter routes based on origin and destination (case-insensitive)
        const filteredRoutes = busRoutes.filter(route => 
          route.origin.toLowerCase().includes(origin.toLowerCase()) &&
          route.destination.toLowerCase().includes(destination.toLowerCase())
        );

        if (filteredRoutes.length === 0) {
          setError('No buses found for the selected route. Please try different locations.');
        }

        setSearchResults(filteredRoutes);
      } catch (err) {
        setError('An error occurred while searching for buses.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // Get fare for a specific route and bus type
  const makeRouteKey = (from: string, to: string): string => {
    return `${from.trim()} - ${to.trim()}`;
  };

  const getFareForRoute = (routeOrigin: string, routeDestination: string): number | null => {
    const routeKey = makeRouteKey(routeOrigin, routeDestination);
    const reverseRouteKey = makeRouteKey(routeDestination, routeOrigin);
    
    const routeFare = fares[routeKey] || fares[reverseRouteKey];
    
    if (routeFare) {
      return routeFare[busType];
    }
    
    // If exact route not found, estimate based on distance or return a default
    return null;
  };

  return (
    <div className="w-full">
      {/* Live Data Indicator */}
      <div className="flex items-center justify-between mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
          {lastUpdated ? `Data Last Updated: ${lastUpdated}` : 'Loading...'}
        </span>
        <button 
          onClick={fetchLiveFares}
          disabled={fareLoading}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
        >
          {fareLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Bus Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bus Service Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { key: 'normal', label: 'Normal', color: 'bg-gray-100 dark:bg-gray-700' },
            { key: 'semiLuxury', label: 'Semi-Luxury', color: 'bg-green-100 dark:bg-green-900/50' },
            { key: 'ac', label: 'AC/Intercity', color: 'bg-blue-100 dark:bg-blue-900/50' },
            { key: 'expressway', label: 'Expressway', color: 'bg-purple-100 dark:bg-purple-900/50' }
          ].map(type => (
            <button
              key={type.key}
              onClick={() => setBusType(type.key as any)}
              className={`p-3 rounded-md border ${
                busType === type.key 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 font-semibold' 
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              } ${type.color}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Starting Point
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter starting location"
                disabled={useCurrentLocation}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setUseCurrentLocation(!useCurrentLocation)}
                className={`px-4 py-3 rounded-lg ${
                  useCurrentLocation 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                }`}
              >
                {useCurrentLocation ? '✓ GPS' : 'GPS'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || !origin || !destination}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching Buses...' : 'Find Buses'}
          </button>
        </div>
      </form>

      {nearestStops.length > 0 && useCurrentLocation && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Nearby Bus Stops</h3>
          <div className="space-y-2">
            {nearestStops.map((stop, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-sm text-blue-700 dark:text-blue-300">{stop.location.name}</span>
                <span className="text-sm text-blue-600 dark:text-blue-400">{stop.distance.toFixed(2)} km away</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Buses</h2>
          
          {searchResults.map((route) => {
            const liveFare = getFareForRoute(route.origin, route.destination);
            const displayFare = liveFare !== null ? liveFare : route.fare;
            
            return (
              <div 
                key={route.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-700/50"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        route.type === 'express' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' 
                          : route.type === 'night'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                      }`}>
                        {route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 font-bold py-1 px-3 rounded-full">
                        Bus #{route.number}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{route.name}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Operator: <span className="font-medium">{route.operator}</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Departure: <span className="font-medium">{route.departureTime}</span></p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Arrival: <span className="font-medium">{route.arrivalTime}</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Frequency: <span className="font-medium">{route.frequency}</span></p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Fare: <span className="font-medium">Rs. {displayFare.toFixed(2)}</span>
                          {liveFare !== null && (
                            <span className="block text-xs text-green-600 dark:text-green-400 mt-1">
                              Live fare ({busType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">Rs. {displayFare.toFixed(2)}</p>
                    <button className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                      Book Now
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Route Stops:</h4>
                  <div className="flex flex-wrap gap-2">
                    {route.stops.map((stop, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { BusFinder };
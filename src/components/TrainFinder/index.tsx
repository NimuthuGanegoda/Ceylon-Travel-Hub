'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrainRoute, trainRoutes } from '@/data/train-routes';
import { LocationPoint, findNearestLocations, trainStationsData } from '@/utils/location-utils';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import NearestStations from './NearestStations';

export const TrainFinder = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<TrainRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [nearestStations, setNearestStations] = useState<{ location: LocationPoint; distance: number }[]>([]);

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const userLocation: LocationPoint = {
            lat: latitude,
            lng: longitude,
            name: `Current Location`
          };

          setOrigin(userLocation.name);

          // Find nearest train stations
          const nearest = findNearestLocations(
            { lat: latitude, lng: longitude, name: userLocation.name },
            trainStationsData,
            3 // Return top 3 nearest stations
          );
          setNearestStations(nearest);
        },
        (_error) => {
          setError('Unable to retrieve your location. Please enable location services.');
          setUseCurrentLocation(false);
          setOrigin(prev => prev === 'Current Location' ? '' : prev);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setUseCurrentLocation(false);
    }
  }, []);

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    } else {
      setNearestStations([]);
      setOrigin(prev => prev === 'Current Location' ? '' : prev);
    }
  }, [useCurrentLocation, getCurrentLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearchResults([]);

    // Determine effective origin for search logic
    let searchOrigin = origin;
    if (useCurrentLocation && origin === 'Current Location' && nearestStations.length > 0) {
      // Use the nearest station name as the origin for searching
      searchOrigin = nearestStations[0].location.name;
    }

    // Simulate API call delay
    setTimeout(() => {
      try {
        const normalizedOrigin = searchOrigin.toLowerCase().trim();
        const normalizedDestination = destination.toLowerCase().trim();

        const filteredRoutes = trainRoutes.filter(route => {
          // Check if both origin and destination exist in the stops array
          // and if the origin comes before the destination in the route
          const stopsLower = route.stops.map(stop => stop.toLowerCase());

          // Helper to find index of a stop that includes the search term (partial match support)
          // or we can do exact match. The PR comment suggested using nearest station name
          // which is exact. For manual input, partial match is better.
          // Let's use includes for flexibility but strict order.

          const originIndex = stopsLower.findIndex(stop => stop.includes(normalizedOrigin));
          const destIndex = stopsLower.findIndex(stop => stop.includes(normalizedDestination));

          return originIndex !== -1 && destIndex !== -1 && originIndex < destIndex;
        });

        if (filteredRoutes.length === 0) {
          setError('No trains found for the selected route. Please try different stations.');
        }

        setSearchResults(filteredRoutes);
      } catch (err) {
        console.error('Error occurred while searching for trains:', err);
        setError('An error occurred while searching for trains.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <SearchForm
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
        useCurrentLocation={useCurrentLocation}
        setUseCurrentLocation={setUseCurrentLocation}
        loading={loading}
        onSearch={handleSearch}
      />

      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-center fade-in">
          {error}
        </div>
      )}

      {useCurrentLocation && nearestStations.length > 0 && (
        <NearestStations stations={nearestStations} />
      )}

      <SearchResults results={searchResults} />
    </div>
  );
};

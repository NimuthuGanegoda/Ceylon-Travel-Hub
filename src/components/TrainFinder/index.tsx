'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrainRoute, trainRoutes } from '@/data/train-routes';
import { LocationPoint, findNearestLocations, trainStationsData } from '@/utils/location-utils';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import NearestStations from './NearestStations';

interface Location extends LocationPoint {}

export const TrainFinder = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
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

          const userLocation: Location = {
            lat: latitude,
            lng: longitude,
            name: `Current Location`
          };

          setCurrentLocation(userLocation);
          setOrigin(userLocation.name);

          // Find nearest train stations
          const nearest = findNearestLocations(
            { lat: latitude, lng: longitude, name: userLocation.name },
            trainStationsData,
            3 // Return top 3 nearest stations
          );
          setNearestStations(nearest);
        },
        (error) => {
          setError('Unable to retrieve your location. Please enable location services.');
          setUseCurrentLocation(false);
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

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Filter routes based on origin and destination (case-insensitive)
        const filteredRoutes = trainRoutes.filter(route =>
          route.origin.toLowerCase().includes(origin.toLowerCase()) &&
          route.destination.toLowerCase().includes(destination.toLowerCase())
        );

        if (filteredRoutes.length === 0) {
          setError('No trains found for the selected route. Please try different stations.');
        }

        setSearchResults(filteredRoutes);
      } catch (err) {
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

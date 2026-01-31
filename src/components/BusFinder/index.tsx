'use client';

import { useState, useEffect, useCallback } from 'react';
import { BusRoute, busRoutes } from '@/data/bus-routes';
import { LocationPoint, findNearestLocations, busStopsData } from '@/utils/location-utils';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import NearestStops from './NearestStops';

interface Location extends LocationPoint {}

export const BusFinder = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [searchResults, setSearchResults] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [nearestStops, setNearestStops] = useState<{ location: LocationPoint; distance: number }[]>([]);

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
      // If unchecked, maybe clear the "Current Location" text if it matches?
      // For now, let's just clear nearest stops
      setNearestStops([]);
      if (origin === 'Current Location') {
        setOrigin('');
      }
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

      {useCurrentLocation && nearestStops.length > 0 && (
        <NearestStops stops={nearestStops} />
      )}

      <SearchResults results={searchResults} />
    </div>
  );
};

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
        (geoError) => {
          let message = 'Unable to retrieve your location. Please enable location services.';
          if (geoError && typeof geoError.code === 'number') {
            switch (geoError.code) {
              case geoError.PERMISSION_DENIED:
                message = 'Location access was denied. Please allow location access in your browser settings.';
                break;
              case geoError.POSITION_UNAVAILABLE:
                message = 'Location information is unavailable. Please check your network connection or try again later.';
                break;
              case geoError.TIMEOUT:
                message = 'Timed out while trying to retrieve your location. Please try again.';
                break;
              default:
                break;
            }
          }
          setError(message);
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
        // Determine effective origin, especially when using current GPS location
        let effectiveOrigin = origin;

        if (useCurrentLocation && origin === 'Current Location') {
          if (nearestStations && nearestStations.length > 0) {
            // Use the nearest station's name as the actual origin for searching
            effectiveOrigin = nearestStations[0].location.name;
          } else {
            setError(
              'We could not determine nearby stations from your current location. Please select a station manually or ensure location services are enabled.'
            );
            setLoading(false);
            return;
          }
        }

        const normalizedOriginQuery = effectiveOrigin.trim().toLowerCase();
        const normalizedDestinationQuery = destination.trim().toLowerCase();

        // Filter routes based on origin and destination (case-insensitive, exact match)
        const filteredRoutes = trainRoutes.filter(route => {
          const normalizedRouteOrigin = route.origin.trim().toLowerCase();
          const normalizedRouteDestination = route.destination.trim().toLowerCase();

          return (
            normalizedRouteOrigin === normalizedOriginQuery &&
            normalizedRouteDestination === normalizedDestinationQuery
          );
        });

        if (filteredRoutes.length === 0) {
          setError(
            'No trains found for the selected route. Please check the station names or try nearby stations.'
          );
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

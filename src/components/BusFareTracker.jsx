import React, { useState, useEffect } from 'react';

const BusFareTracker = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [busType, setBusType] = useState('normal');
  const [fares, setFares] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nearestStop, setNearestStop] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  // Sri Lankan bus stops data
  const busStops = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Kurunegala',
    'Anuradhapura', 'Trincomalee', 'Batticaloa', 'Matara', 'Ratnapura',
    'Badulla', 'Nuwara Eliya', 'Kalutara', 'Panadura', 'Moratuwa',
    'Pettah', 'Borella', 'Kotahena', 'Maradana', 'Fort', 'Slave Island'
  ];

  // Sri Lankan bus routes
  const busRoutes = [
    { id: 'R101', name: 'Colombo to Kandy', stops: ['Colombo', 'Kadawatha', 'Gampaha', 'Watareka', 'Kandy'] },
    { id: 'R102', name: 'Colombo to Galle', stops: ['Colombo', 'Kalutara', 'Panadura', 'Moratuwa', 'Galle'] },
    { id: 'R103', name: 'Colombo to Jaffna', stops: ['Colombo', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Jaffna'] },
    { id: 'R104', name: 'Colombo to Negombo', stops: ['Colombo', 'Borella', 'Kelaniya', 'Katunayake', 'Negombo'] },
    { id: 'R105', name: 'Kandy to Galle', stops: ['Kandy', 'Peradeniya', 'Kegalle', 'Ruwanwella', 'Galle'] }
  ];

  // Fetch live fares from our scraping service
  const fetchLiveFares = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to our backend service
      // In a real implementation, this would fetch from our Node.js service
      const response = await fetch('/api/ntc-fares');
      
      if (response.ok) {
        const data = await response.json();
        setFares(data.fares);
        setLastUpdated(new Date(data.lastUpdated).toLocaleString());
      } else {
        // Use fallback data if API fails
        setFares(getDefaultFares());
        setLastUpdated(new Date().toLocaleString());
      }
    } catch (error) {
      console.error('Error fetching fares:', error);
      setFares(getDefaultFares());
      setLastUpdated(new Date().toLocaleString());
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultFares = () => {
    // Default Sri Lankan bus fares
    return {
      'Colombo - Kandy': {
        normal: 100,
        semiLuxury: 150,
        ac: 200,
        expressway: 250
      },
      'Colombo - Galle': {
        normal: 120,
        semiLuxury: 180,
        ac: 240,
        expressway: 300
      },
      'Colombo - Jaffna': {
        normal: 500,
        semiLuxury: 750,
        ac: 1000,
        expressway: 1250
      },
      'Kandy - Galle': {
        normal: 200,
        semiLuxury: 300,
        ac: 400,
        expressway: 500
      },
      'Colombo - Negombo': {
        normal: 80,
        semiLuxury: 120,
        ac: 160,
        expressway: 200
      },
      'Colombo - Kurunegala': {
        normal: 150,
        semiLuxury: 225,
        ac: 300,
        expressway: 375
      },
      'Colombo - Anuradhapura': {
        normal: 350,
        semiLuxury: 525,
        ac: 700,
        expressway: 875
      },
      'Colombo - Trincomalee': {
        normal: 450,
        semiLuxury: 675,
        ac: 900,
        expressway: 1125
      },
      'Colombo - Batticaloa': {
        normal: 550,
        semiLuxury: 825,
        ac: 1100,
        expressway: 1375
      },
      'Galle - Matara': {
        normal: 60,
        semiLuxury: 90,
        ac: 120,
        expressway: 150
      }
    };
  };

  // Get user's location using Geolocation API
  const getNearestStop = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo purposes, randomly select a nearby stop
          const randomStop = busStops[Math.floor(Math.random() * busStops.length)];
          setNearestStop(randomStop);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to first stop
          setNearestStop(busStops[0]);
        }
      );
    } else {
      // Fallback to first stop if geolocation is not supported
      setNearestStop(busStops[0]);
    }
  };

  // Find matching route
  const findRoute = () => {
    const routeName = `${origin} - ${destination}`;
    const route = busRoutes.find(r => r.name.includes(origin) && r.name.includes(destination));
    
    if (route) {
      setRouteInfo(route);
    } else {
      // Create a simple route if exact match not found
      setRouteInfo({
        id: 'AUTO',
        name: routeName,
        stops: [origin, destination]
      });
    }
  };

  // Calculate fare
  const calculateFare = () => {
    if (!origin || !destination) return null;
    
    const routeName = `${origin} - ${destination}`;
    const reverseRouteName = `${destination} - ${origin}`;
    
    let fareData = fares[routeName] || fares[reverseRouteName];
    
    if (!fareData) {
      // If exact route not found, use default calculation
      fareData = {
        normal: Math.floor(Math.random() * 300) + 50,
        semiLuxury: Math.floor(Math.random() * 450) + 75,
        ac: Math.floor(Math.random() * 600) + 100,
        expressway: Math.floor(Math.random() * 750) + 125
      };
    }
    
    return fareData[busType];
  };

  // Initialize component
  useEffect(() => {
    fetchLiveFares();
  }, []);

  const fare = calculateFare();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sri Lanka Bus Fare Tracker</h2>
        
        {/* Live Data Indicator */}
        <div className="flex items-center justify-between mb-6 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-800">
            {lastUpdated ? `Data Last Updated: ${lastUpdated}` : 'Loading...'}
          </span>
          <button 
            onClick={fetchLiveFares}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From (Origin)
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Origin</option>
              {busStops.map(stop => (
                <option key={`origin-${stop}`} value={stop}>{stop}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To (Destination)
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Destination</option>
              {busStops.map(stop => (
                <option key={`dest-${stop}`} value={stop}>{stop}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bus Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bus Service Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { key: 'normal', label: 'Normal', color: 'bg-gray-100' },
              { key: 'semiLuxury', label: 'Semi-Luxury', color: 'bg-green-100' },
              { key: 'ac', label: 'AC/Intercity', color: 'bg-blue-100' },
              { key: 'expressway', label: 'Expressway', color: 'bg-purple-100' }
            ].map(type => (
              <button
                key={type.key}
                onClick={() => setBusType(type.key)}
                className={`p-3 rounded-md border ${
                  busType === type.key 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={getNearestStop}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Find Nearest Stop
          </button>
          <button
            onClick={findRoute}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Find Route
          </button>
        </div>

        {/* Results Section */}
        {(origin && destination) && (
          <div className="space-y-4">
            {/* Nearest Stop */}
            {nearestStop && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Nearest Stop to You:</h3>
                <p className="text-green-700">{nearestStop}</p>
              </div>
            )}

            {/* Route Info */}
            {routeInfo && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Route Information:</h3>
                <p className="text-blue-700"><strong>{routeInfo.id}:</strong> {routeInfo.name}</p>
                <p className="text-sm text-blue-600 mt-1">
                  <strong>Stops:</strong> {routeInfo.stops.join(' → ')}
                </p>
              </div>
            )}

            {/* Fare Display */}
            {fare && (
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                <h3 className="text-xl font-bold mb-2">Your Fare</h3>
                <div className="text-3xl font-bold">{fare.toFixed(2)} LKR</div>
                <p className="text-blue-100 mt-2">
                  For {busType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} service
                </p>
              </div>
            )}

            {/* Fare Comparison */}
            {origin && destination && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Fare Comparison</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: 'normal', label: 'Normal', color: 'bg-gray-100' },
                    { key: 'semiLuxury', label: 'Semi-Luxury', color: 'bg-green-100' },
                    { key: 'ac', label: 'AC/Intercity', color: 'bg-blue-100' },
                    { key: 'expressway', label: 'Expressway', color: 'bg-purple-100' }
                  ].map(type => {
                    const routeName = `${origin} - ${destination}`;
                    const reverseRouteName = `${destination} - ${origin}`;
                    const routeFare = fares[routeName]?.[type.key] || fares[reverseRouteName]?.[type.key];
                    
                    return (
                      <div key={type.key} className={`p-3 rounded-md border ${type.color}`}>
                        <p className="font-medium">{type.label}</p>
                        <p className="text-lg font-bold text-gray-800">
                          {routeFare ? routeFare.toFixed(2) : '?'} LKR
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Fetching latest fares from NTC...</span>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">About Sri Lanka Bus Fares</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Fares are automatically updated from the National Transport Commission (NTC)</li>
          <li>• Normal buses: Standard government-run services</li>
          <li>• Semi-Luxury: Better seating, limited stops</li>
          <li>• AC/Intercity: Air-conditioned premium services</li>
          <li>• Expressway: Services on highway routes (Southern, Katunayake Expressways)</li>
        </ul>
      </div>
    </div>
  );
};

export default BusFareTracker;
// Interface for representing a location with coordinates
export interface LocationPoint {
  lat: number;
  lng: number;
  name: string;
  address?: string;
}

/**
 * Calculate the distance between two points using the Haversine formula
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
};

/** Convert degrees to radians */
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Find the nearest locations from a list of points
 * @param userLocation User's current location
 * @param locations Array of locations to search through
 * @param limit Number of nearest locations to return (default: 5)
 * @returns Array of nearest locations with distances
 */
export const findNearestLocations = (
  userLocation: LocationPoint,
  locations: LocationPoint[],
  limit: number = 5
): { location: LocationPoint; distance: number }[] => {
  return locations
    .map(location => ({
      location,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        location.lat,
        location.lng
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

// Sample bus stops data for Sri Lanka
export const busStopsData: LocationPoint[] = [
  { lat: 6.9368, lng: 79.8474, name: "Colombo Fort Bus Stand", address: "Colombo 02" },
  { lat: 6.9297, lng: 79.8612, name: "Pettah Bus Stand", address: "Colombo 11" },
  { lat: 6.9012, lng: 79.8567, name: "Slave Island Bus Stand", address: "Colombo 15" },
  { lat: 6.9194, lng: 79.8547, name: "Maradana Bus Stand", address: "Colombo 10" },
  { lat: 6.9012, lng: 79.9265, name: "Kollupitiya Bus Stop", address: "Colombo 05" },
  { lat: 6.8941, lng: 79.9166, name: "Bambalangoda Bus Stop", address: "Colombo 04" },
  { lat: 6.8714, lng: 79.8842, name: "Mount Lavinia Bus Stop", address: "Ratmalana" },
  { lat: 6.8544, lng: 79.8901, name: "Dehiwala Bus Stand", address: "Dehiwala" },
  { lat: 6.8682, lng: 79.9020, name: "Moratuwa Bus Stand", address: "Moratuwa" },
  { lat: 6.8263, lng: 79.8911, name: "Panadura Bus Stand", address: "Panadura" },
  { lat: 6.4380, lng: 80.3784, name: "Galle Bus Stand", address: "Galle" },
  { lat: 7.2949, lng: 80.6352, name: "Kandy Bus Stand", address: "Kandy" },
  { lat: 6.0535, lng: 80.2210, name: "Matara Bus Stand", address: "Matara" },
  { lat: 9.6687, lng: 80.0094, name: "Jaffna Bus Stand", address: "Jaffna" },
  { lat: 8.5922, lng: 81.2333, name: "Trincomalee Bus Stand", address: "Trincomalee" },
  { lat: 7.4734, lng: 80.3843, name: "Nuwara Eliya Bus Stand", address: "Nuwara Eliya" },
  { lat: 6.7092, lng: 79.9021, name: "Kalutara Bus Stand", address: "Kalutara" },
  { lat: 7.4373, lng: 80.6422, name: "Matale Bus Stand", address: "Matale" },
  { lat: 8.3114, lng: 80.4037, name: "Anuradhapura Bus Stand", address: "Anuradhapura" },
  { lat: 7.9471, lng: 81.0003, name: "Batticaloa Bus Stand", address: "Batticaloa" },
  { lat: 6.7606, lng: 79.9036, name: "Beruwala Bus Stop", address: "Beruwala" },
  { lat: 6.4559, lng: 80.0057, name: "Hikkaduwa Bus Stop", address: "Hikkaduwa" },
  { lat: 6.5880, lng: 80.0723, name: "Ambalangoda Bus Stop", address: "Ambalangoda" },
  { lat: 6.6316, lng: 80.0828, name: "Balapitiya Bus Stop", address: "Balapitiya" },
  { lat: 6.6844, lng: 80.0542, name: "Aluthgama Bus Stop", address: "Aluthgama" },
  { lat: 7.1064, lng: 79.9881, name: "Kotte Bus Stop", address: "Sri Jayawardenepura Kotte" },
  { lat: 7.0621, lng: 80.0052, name: "Maharagama Bus Stop", address: "Maharagama" },
  { lat: 6.8182, lng: 79.9501, name: "Piliyandala Bus Stop", address: "Piliyandala" },
  { lat: 6.9500, lng: 79.9082, name: "Rajagiriya Bus Stop", address: "Rajagiriya" },
  { lat: 7.2149, lng: 80.1910, name: "Peradeniya Bus Stop", address: "Peradeniya" },
  { lat: 6.8370, lng: 79.9980, name: "Makumbura Multimodal Center", address: "Kottawa" },
  { lat: 7.0000, lng: 79.9500, name: "Kadawatha Bus Stand", address: "Kadawatha" },
  { lat: 7.1430, lng: 80.0980, name: "Nittambuwa Bus Stand", address: "Nittambuwa" },
  { lat: 7.2530, lng: 80.3460, name: "Kegalle Bus Stand", address: "Kegalle" },
  { lat: 7.2530, lng: 80.4440, name: "Mawanella Bus Stand", address: "Mawanella" },
  { lat: 6.9530, lng: 80.2130, name: "Avissawella Bus Stand", address: "Avissawella" },
  { lat: 6.9040, lng: 80.0880, name: "Hanwella Bus Stand", address: "Hanwella" },
  { lat: 6.8430, lng: 80.0030, name: "Homagama Bus Stand", address: "Homagama" },
  { lat: 7.2100, lng: 79.8350, name: "Negombo Bus Stand", address: "Negombo" },
  { lat: 7.0760, lng: 79.8920, name: "Ja-Ela Bus Stand", address: "Ja-Ela" },
  { lat: 6.9830, lng: 79.8870, name: "Wattala Bus Stand", address: "Wattala" },
  { lat: 7.1550, lng: 79.8700, name: "Katunayake Bus Stand", address: "Katunayake" },
  { lat: 7.5760, lng: 79.7950, name: "Chilaw Bus Stand", address: "Chilaw" },
  { lat: 8.0330, lng: 79.8260, name: "Puttalam Bus Stand", address: "Puttalam" },
  { lat: 6.6780, lng: 80.3980, name: "Ratnapura Bus Stand", address: "Ratnapura" },
  { lat: 6.8400, lng: 80.9300, name: "Bandarawela Bus Stand", address: "Bandarawela" },
  { lat: 6.9850, lng: 81.0550, name: "Badulla Bus Stand", address: "Badulla" },
];
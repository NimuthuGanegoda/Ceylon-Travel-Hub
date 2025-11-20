export interface Vehicle {
  id: string;
  name: string;
  year: number | null;
  segment: string;
  powertrain: string;
  keyFeatures: string[];
  heroImage: string;
  thumbImage: string;
  pricing: {
    daily?: number;
    weekend?: number;
    weekly?: number;
  };
  status: 'available' | 'coming-soon';
}

export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  message: string;
  date: string;
  permission: 'yes' | 'anon' | 'no';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const siteData = {
  name: 'Ceylon Drive Hub',
  tagline: 'Book First. Choose Vehicle Later.',
  description: 'Reserve your dates now — finalize the exact vehicle (Audi Q2 2018 or future additions) during confirmation.',
  contact: {
    phone: '+1 555 123 4567',
    whatsapp: '+15551234567',
    email: 'rentals@example.com',
  },
  features: [
    '150 PS Turbo',
    'Virtual Cockpit',
    'LED Headlights',
    'Parking Sensors',
    'Apple CarPlay / Android Auto',
    '405 L Boot',
  ],
};

export const vehicles: Vehicle[] = [
  {
    id: 'audi-q2-2018-14-tfsi',
    name: 'Audi Q2 2018 1.4 TFSI',
    year: 2018,
    segment: 'Compact SUV',
    powertrain: '1.4 TFSI Turbo • 150 PS • 7-speed S tronic • FWD',
    keyFeatures: ['Virtual Cockpit', 'LED Headlights', 'Parking Sensors', 'Apple CarPlay / Android Auto', '405 L Boot'],
    heroImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=600&auto=format&fit=crop',
    pricing: { daily: 75, weekend: 200, weekly: 450 },
    status: 'available',
  },
  {
    id: 'coming-soon-placeholder',
    name: 'More Vehicles Coming Soon',
    year: null,
    segment: 'Fleet Expansion',
    powertrain: 'New models will be added shortly',
    keyFeatures: ['Multiple Classes', 'Flexible Pricing', 'Modern Safety Tech'],
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop',
    pricing: {},
    status: 'coming-soon',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'A. Perera',
    country: 'Sri Lanka',
    rating: 5,
    message: 'Smooth booking process and the Audi Q2 was spotless. Great fuel efficiency on our trip to Galle.',
    date: '2025-11-10',
    permission: 'yes',
  },
  {
    name: 'J. Schmidt',
    country: 'Germany',
    rating: 5,
    message: 'Professional communication before arrival. Child seat request was handled perfectly.',
    date: '2025-10-22',
    permission: 'anon',
  },
  {
    name: 'S. Rao',
    country: 'India',
    rating: 4,
    message: 'Comfortable ride in the hills. Would love to see more vehicle options soon!',
    date: '2025-09-14',
    permission: 'yes',
  },
];

export const services: Service[] = [
  {
    id: 'self-drive',
    title: 'Self-Drive',
    description: 'Require local licence + IDP if visitor',
    icon: '🚗',
  },
  {
    id: 'driver',
    title: 'Driver',
    description: 'Driver provided — seating reduced to 4 adults + 1 child',
    icon: '👨‍✈️',
  },
  {
    id: 'driver-guide',
    title: 'Driver-Guide',
    description: 'Driver can act as guide — add guide fee on request',
    icon: '🗺️',
  },
  {
    id: 'airport-transfer',
    title: 'Airport Transfers',
    description: 'Pickups & Drops — add flight details in booking',
    icon: '✈️',
  },
];

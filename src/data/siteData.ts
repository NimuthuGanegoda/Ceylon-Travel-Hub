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
  name: 'Sri Lanka RouteMaster',
  tagline: 'Find Your Bus. Start Your Journey.',
  description: 'Comprehensive bus route finder for Sri Lanka. Accurate schedules, routes, and fares for all major destinations.',
  contact: {
    phone: '+94 11 234 5678',
    whatsapp: '+94112345678',
    email: 'info@routemaster.lk',
  },
  features: [
    'Real-time Schedules',
    'Route Maps',
    'Fare Calculator',
    'Stop Locations',
    'Express Services',
    'Intercity Connections',
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

export const testimonials: Testimonial[] = [];

export const services: Service[] = [
  {
    id: 'express',
    title: 'Express Service',
    description: 'Fast intercity connections with fewer stops',
    icon: '🚀',
  },
  {
    id: 'ordinary',
    title: 'Ordinary Service',
    description: 'Affordable travel stopping at all local halts',
    icon: '🚌',
  },
  {
    id: 'luxury',
    title: 'Luxury / AC',
    description: 'Comfortable air-conditioned buses for long distance',
    icon: '❄️',
  },
  {
    id: 'night-mail',
    title: 'Night Mail',
    description: 'Overnight services for long distance travel',
    icon: '🌙',
  },
];

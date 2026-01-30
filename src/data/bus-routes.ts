export interface BusRoute {
  id: string;
  number: string;
  name: string;
  origin: string;
  destination: string;
  stops: string[];
  departureTime: string;
  arrivalTime: string;
  fare: number;
  frequency: string; // How often the bus runs (every X minutes)
  operator: string; // Bus company operating the route
  type: 'express' | 'ordinary' | 'night'; // Type of service
}

// Comprehensive list of major Sri Lankan bus routes
export const busRoutes: BusRoute[] = [
  // Colombo to Kandy routes
  {
    id: 'r1',
    number: '139',
    name: 'Colombo-Kandy Express',
    origin: 'Colombo',
    destination: 'Kandy',
    stops: ['Colombo', 'Pettah', 'Fort', 'Maradana', 'Kelaniya', 'Gampaha', 'Wattala', 'Ja-Ela', 'Yakkala', 'Kandy'],
    departureTime: '06:00',
    arrivalTime: '10:30',
    fare: 250,
    frequency: 'every 30 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'express'
  },
  {
    id: 'r2',
    number: '139A',
    name: 'Express Service',
    origin: 'Colombo',
    destination: 'Kandy',
    stops: ['Colombo', 'Borella', 'Kirulapona', 'Nawala', 'Malabe', 'Homagama', 'Padukka', 'Avissawella', 'Kandy'],
    departureTime: '07:30',
    arrivalTime: '11:45',
    fare: 300,
    frequency: 'every 45 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'express'
  },
  
  // Colombo to Galle routes
  {
    id: 'r3',
    number: '216',
    name: 'Colombo-Galle',
    origin: 'Colombo',
    destination: 'Galle',
    stops: ['Colombo', 'Fort', 'Dehiwala', 'Mount Lavinia', 'Moratuwa', 'Panadura', 'Aluthgama', 'Bentota', 'Hikkaduwa', 'Galle'],
    departureTime: '06:30',
    arrivalTime: '10:00',
    fare: 200,
    frequency: 'every 20 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r4',
    number: '216E',
    name: 'Colombo-Galle Express',
    origin: 'Colombo',
    destination: 'Galle',
    stops: ['Colombo', 'Fort', 'Moratuwa', 'Panadura', 'Galle'],
    departureTime: '07:00',
    arrivalTime: '09:30',
    fare: 220,
    frequency: 'every 45 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'express'
  },
  
  // Colombo to Jaffna routes
  {
    id: 'r5',
    number: '405',
    name: 'Colombo-Jaffna',
    origin: 'Colombo',
    destination: 'Jaffna',
    stops: ['Colombo', 'Gampaha', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Jaffna'],
    departureTime: '05:00',
    arrivalTime: '15:00',
    fare: 650,
    frequency: 'every 2 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r6',
    number: '405X',
    name: 'Colombo-Jaffna Express',
    origin: 'Colombo',
    destination: 'Jaffna',
    stops: ['Colombo', 'Kurunegala', 'Anuradhapura', 'Jaffna'],
    departureTime: '06:00',
    arrivalTime: '14:00',
    fare: 750,
    frequency: 'every 4 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'express'
  },
  
  // Colombo to Trincomalee routes
  {
    id: 'r7',
    number: '195',
    name: 'Colombo-Trincomalee',
    origin: 'Colombo',
    destination: 'Trincomalee',
    stops: ['Colombo', 'Gampaha', 'Matale', 'Polonnaruwa', 'Batticaloa', 'Trincomalee'],
    departureTime: '05:30',
    arrivalTime: '14:00',
    fare: 550,
    frequency: 'every 4 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  
  // Colombo to Matara routes
  {
    id: 'r8',
    number: '216B',
    name: 'Colombo-Matara',
    origin: 'Colombo',
    destination: 'Matara',
    stops: ['Colombo', 'Fort', 'Dehiwala', 'Moratuwa', 'Panadura', 'Aluthgama', 'Ginimura', 'Ambalangoda', 'Balapitiya', 'Galle', 'Hakmana', 'Matara'],
    departureTime: '06:00',
    arrivalTime: '11:00',
    fare: 350,
    frequency: 'every 30 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  
  // Colombo to Nuwara Eliya routes
  {
    id: 'r9',
    number: '139N',
    name: 'Colombo-Nuwara Eliya',
    origin: 'Colombo',
    destination: 'Nuwara Eliya',
    stops: ['Colombo', 'Kandy', 'Peradeniya', 'Gampola', 'Hatton', 'Nuwara Eliya'],
    departureTime: '06:30',
    arrivalTime: '12:00',
    fare: 400,
    frequency: 'every 2 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  
  // Night buses
  {
    id: 'r10',
    number: 'N405',
    name: 'Night Mail - Colombo-Jaffna',
    origin: 'Colombo',
    destination: 'Jaffna',
    stops: ['Colombo', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Jaffna'],
    departureTime: '21:00',
    arrivalTime: '05:00',
    fare: 700,
    frequency: 'daily',
    operator: 'Sri Lanka Transport Board',
    type: 'night'
  },
  
  // Colombo to Anuradhapura
  {
    id: 'r11',
    number: '401',
    name: 'Colombo-Anuradhapura',
    origin: 'Colombo',
    destination: 'Anuradhapura',
    stops: ['Colombo', 'Gampaha', 'Kurunegala', 'Puttalam', 'Chilaw', 'Anuradhapura'],
    departureTime: '06:00',
    arrivalTime: '11:00',
    fare: 350,
    frequency: 'every 3 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  
  // Colombo to Badulla
  {
    id: 'r12',
    number: '139BD',
    name: 'Colombo-Badulla',
    origin: 'Colombo',
    destination: 'Badulla',
    stops: ['Colombo', 'Kandy', 'Peradeniya', 'Gampola', 'Nuwara Eliya', 'Bandarawela', 'Badulla'],
    departureTime: '07:00',
    arrivalTime: '14:00',
    fare: 450,
    frequency: 'every 4 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  }
];
export interface BusRoute {
  id: string;
  number: string;
  name: string;
  origin: string;
  destination: string;
  road?: string; // Main highway/road
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
  // --- Kandy Road (A1) Routes ---
  {
    id: 'r1',
    number: '1',
    name: 'Colombo-Kandy Intercity',
    origin: 'Colombo',
    destination: 'Kandy',
    road: 'Kandy Road (A1)',
    stops: ['Colombo Fort', 'Kadawatha', 'Nittambuwa', 'Warakapola', 'Kegalle', 'Mawanella', 'Peradeniya', 'Kandy'],
    departureTime: '06:00',
    arrivalTime: '09:30',
    fare: 450,
    frequency: 'every 20 mins',
    operator: 'Private / SLTB',
    type: 'express'
  },
  {
    id: 'r1-ord',
    number: '1',
    name: 'Colombo-Kandy',
    origin: 'Colombo',
    destination: 'Kandy',
    road: 'Kandy Road (A1)',
    stops: ['Colombo Fort', 'Peliyagoda', 'Kiribathgoda', 'Kadawatha', 'Yakkala', 'Nittambuwa', 'Warakapola', 'Ambepussa', 'Kegalle', 'Mawanella', 'Kadugannawa', 'Peradeniya', 'Kandy'],
    departureTime: '05:00',
    arrivalTime: '10:00',
    fare: 290,
    frequency: 'every 15 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r1-kegalle',
    number: '1',
    name: 'Colombo-Kegalle',
    origin: 'Colombo',
    destination: 'Kegalle',
    road: 'Kandy Road (A1)',
    stops: ['Colombo Fort', 'Peliyagoda', 'Kadawatha', 'Nittambuwa', 'Warakapola', 'Kegalle'],
    departureTime: '06:30',
    arrivalTime: '09:00',
    fare: 200,
    frequency: 'every 30 mins',
    operator: 'Private',
    type: 'ordinary'
  },
  {
    id: 'r17',
    number: '17',
    name: 'Panadura-Kandy',
    origin: 'Panadura',
    destination: 'Kandy',
    road: 'Kandy Road (A1)',
    stops: ['Panadura', 'Moratuwa', 'Dehiwala', 'Nugegoda', 'Battaramulla', 'Malabe', 'Kaduwela', 'Nittambuwa', 'Kegalle', 'Kandy'],
    departureTime: '05:30',
    arrivalTime: '10:30',
    fare: 350,
    frequency: 'every 1 hour',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },

  // --- Galle Road (A2) Routes ---
  {
    id: 'r2-matara',
    number: '02',
    name: 'Colombo-Matara',
    origin: 'Colombo',
    destination: 'Matara',
    road: 'Galle Road (A2)',
    stops: ['Colombo Fort', 'Dehiwala', 'Mount Lavinia', 'Moratuwa', 'Panadura', 'Kalutara', 'Beruwala', 'Aluthgama', 'Bentota', 'Ambalangoda', 'Hikkaduwa', 'Galle', 'Weligama', 'Matara'],
    departureTime: '04:30',
    arrivalTime: '09:30',
    fare: 390,
    frequency: 'every 30 mins',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r2-galle',
    number: '02',
    name: 'Colombo-Galle',
    origin: 'Colombo',
    destination: 'Galle',
    road: 'Galle Road (A2)',
    stops: ['Colombo Fort', 'Moratuwa', 'Panadura', 'Kalutara', 'Aluthgama', 'Ambalangoda', 'Hikkaduwa', 'Galle'],
    departureTime: '05:00',
    arrivalTime: '09:00',
    fare: 250,
    frequency: 'every 20 mins',
    operator: 'Private',
    type: 'ordinary'
  },
  {
    id: 'r100',
    number: '100',
    name: 'Panadura-Pettah',
    origin: 'Panadura',
    destination: 'Colombo',
    road: 'Galle Road (A2)',
    stops: ['Panadura', 'Moratuwa', 'Ratmalana', 'Mount Lavinia', 'Dehiwala', 'Wellawatte', 'Bambalapitiya', 'Kollupitiya', 'Galle Face', 'Pettah'],
    departureTime: '04:00',
    arrivalTime: '05:30',
    fare: 100,
    frequency: 'every 5 mins',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },
  {
    id: 'r101',
    number: '101',
    name: 'Moratuwa-Pettah',
    origin: 'Moratuwa',
    destination: 'Colombo',
    road: 'Galle Road (A2)',
    stops: ['Moratuwa', 'Ratmalana', 'Mount Lavinia', 'Dehiwala', 'Wellawatte', 'Bambalapitiya', 'Kollupitiya', 'Pettah'],
    departureTime: '04:00',
    arrivalTime: '05:15',
    fare: 80,
    frequency: 'every 5 mins',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },
  {
    id: 'r400',
    number: '400',
    name: 'Aluthgama-Colombo',
    origin: 'Aluthgama',
    destination: 'Colombo',
    road: 'Galle Road (A2)',
    stops: ['Aluthgama', 'Beruwala', 'Kalutara', 'Panadura', 'Moratuwa', 'Ratmalana', 'Colombo'],
    departureTime: '05:00',
    arrivalTime: '07:30',
    fare: 180,
    frequency: 'every 20 mins',
    operator: 'Private',
    type: 'ordinary'
  },

  // --- High Level Road (A4) Routes ---
  {
    id: 'r122',
    number: '122',
    name: 'Avissawella-Pettah',
    origin: 'Avissawella',
    destination: 'Colombo',
    road: 'High Level Road (A4)',
    stops: ['Avissawella', 'Kosgama', 'Hanwella', 'Kaluaggala', 'Meepe', 'Godagama', 'Homagama', 'Maharagama', 'Nugegoda', 'Kirulapone', 'Thimbirigasyaya', 'Pettah'],
    departureTime: '05:00',
    arrivalTime: '07:30',
    fare: 150,
    frequency: 'every 15 mins',
    operator: 'SLTB / Private',
    type: 'ordinary'
  },
  {
    id: 'r138',
    number: '138',
    name: 'Maharagama-Pettah',
    origin: 'Maharagama',
    destination: 'Colombo',
    road: 'High Level Road (A4)',
    stops: ['Maharagama', 'Navinna', 'Delkanda', 'Nugegoda', 'Kirulapone', 'Havelock Town', 'Thimbirigasyaya', 'Reid Avenue', 'Town Hall', 'Pettah'],
    departureTime: '05:00',
    arrivalTime: '06:00',
    fare: 60,
    frequency: 'every 2 mins',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },
  {
    id: 'r138-homa',
    number: '138',
    name: 'Homagama-Pettah',
    origin: 'Homagama',
    destination: 'Colombo',
    road: 'High Level Road (A4)',
    stops: ['Homagama', 'Kottawa', 'Makumbura', 'Maharagama', 'Nugegoda', 'Pettah'],
    departureTime: '05:00',
    arrivalTime: '06:30',
    fare: 80,
    frequency: 'every 5 mins',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },
  {
    id: 'r99',
    number: '99',
    name: 'Colombo-Badulla',
    origin: 'Colombo',
    destination: 'Badulla',
    road: 'High Level Road (A4)',
    stops: ['Colombo', 'Avissawella', 'Ratnapura', 'Pelmadulla', 'Balangoda', 'Beragala', 'Haputale', 'Bandarawela', 'Badulla'],
    departureTime: '06:00',
    arrivalTime: '13:00',
    fare: 650,
    frequency: 'every 1 hour',
    operator: 'SLTB',
    type: 'ordinary'
  },

  // --- Negombo Road (A3) Routes ---
  {
    id: 'r240',
    number: '240',
    name: 'Colombo-Negombo',
    origin: 'Colombo',
    destination: 'Negombo',
    road: 'Negombo Road (A3)',
    stops: ['Colombo Fort', 'Peliyagoda', 'Wattala', 'Mabola', 'Kandana', 'Ja-Ela', 'Seeduwa', 'Katunayake', 'Kurana', 'Negombo'],
    departureTime: '05:00',
    arrivalTime: '06:30',
    fare: 120,
    frequency: 'every 10 mins',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },
  {
    id: 'r187',
    number: '187',
    name: 'Colombo-Katunayake Airport',
    origin: 'Colombo',
    destination: 'Katunayake',
    road: 'Negombo Road (A3)',
    stops: ['Colombo Fort', 'Pettah', 'Wattala', 'Ja-Ela', 'Katunayake Airport'],
    departureTime: '05:00',
    arrivalTime: '06:15',
    fare: 150,
    frequency: 'every 20 mins',
    operator: 'Private (AC)',
    type: 'express'
  },
  {
    id: 'r04',
    number: '04',
    name: 'Colombo-Puttalam',
    origin: 'Colombo',
    destination: 'Puttalam',
    road: 'Negombo Road (A3)',
    stops: ['Colombo', 'Negombo', 'Kochchikade', 'Wennappuwa', 'Marawila', 'Mahawewa', 'Chilaw', 'Bangadeniya', 'Mundalama', 'Puttalam'],
    departureTime: '05:30',
    arrivalTime: '10:00',
    fare: 400,
    frequency: 'every 45 mins',
    operator: 'SLTB',
    type: 'ordinary'
  },

  // --- Southern Expressway (E01) Routes ---
  {
    id: 'r-ex-matara',
    number: 'EX-01',
    name: 'Makumbura-Matara',
    origin: 'Makumbura',
    destination: 'Matara',
    road: 'Southern Expressway (E01)',
    stops: ['Makumbura Multimodal Center', 'Matara'],
    departureTime: '06:00',
    arrivalTime: '07:30',
    fare: 900,
    frequency: 'every 20 mins',
    operator: 'SLTB / Private',
    type: 'express'
  },
  {
    id: 'r-ex-galle',
    number: 'EX-02',
    name: 'Makumbura-Galle',
    origin: 'Makumbura',
    destination: 'Galle',
    road: 'Southern Expressway (E01)',
    stops: ['Makumbura Multimodal Center', 'Galle'],
    departureTime: '06:30',
    arrivalTime: '07:45',
    fare: 750,
    frequency: 'every 30 mins',
    operator: 'SLTB / Private',
    type: 'express'
  },
  {
    id: 'r-ex-kad-galle',
    number: 'EX-03',
    name: 'Kadawatha-Galle',
    origin: 'Kadawatha',
    destination: 'Galle',
    road: 'Southern Expressway (E01)',
    stops: ['Kadawatha Interchange', 'Galle'],
    departureTime: '07:00',
    arrivalTime: '08:30',
    fare: 800,
    frequency: 'every 40 mins',
    operator: 'SLTB',
    type: 'express'
  },

  // --- Low Level Road (AB10) ---
  {
    id: 'r143',
    number: '143',
    name: 'Hanwella-Pettah',
    origin: 'Hanwella',
    destination: 'Colombo',
    road: 'Low Level Road (AB10)',
    stops: ['Hanwella', 'Ranala', 'Kaduwela', 'Ambatale', 'Wellampitiya', 'Orugodawatta', 'Pettah'],
    departureTime: '05:30',
    arrivalTime: '07:00',
    fare: 110,
    frequency: 'every 15 mins',
    operator: 'Private',
    type: 'ordinary'
  },

  // --- Existing Long Distance Routes (Updated) ---
  {
    id: 'r5',
    number: '87',
    name: 'Colombo-Jaffna',
    origin: 'Colombo',
    destination: 'Jaffna',
    road: 'A9 Highway',
    stops: ['Colombo', 'Gampaha', 'Kurunegala', 'Dambulla', 'Anuradhapura', 'Vavuniya', 'Kilinochchi', 'Jaffna'],
    departureTime: '05:00',
    arrivalTime: '15:00',
    fare: 650,
    frequency: 'every 2 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r7',
    number: '49',
    name: 'Colombo-Trincomalee',
    origin: 'Colombo',
    destination: 'Trincomalee',
    road: 'A6 Highway',
    stops: ['Colombo', 'Gampaha', 'Kurunegala', 'Dambulla', 'Habarana', 'Trincomalee'],
    departureTime: '05:30',
    arrivalTime: '14:00',
    fare: 550,
    frequency: 'every 4 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r9',
    number: '79',
    name: 'Colombo-Nuwara Eliya',
    origin: 'Colombo',
    destination: 'Nuwara Eliya',
    road: 'A5 Highway',
    stops: ['Colombo', 'Peradeniya', 'Gampola', 'Pussellawa', 'Nuwara Eliya'],
    departureTime: '06:30',
    arrivalTime: '12:00',
    fare: 400,
    frequency: 'every 2 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r10',
    number: '87',
    name: 'Night Mail - Colombo-Jaffna',
    origin: 'Colombo',
    destination: 'Jaffna',
    road: 'A9 Highway',
    stops: ['Colombo', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Jaffna'],
    departureTime: '21:00',
    arrivalTime: '05:00',
    fare: 700,
    frequency: 'daily',
    operator: 'Sri Lanka Transport Board',
    type: 'night'
  },
  {
    id: 'r11',
    number: '15',
    name: 'Colombo-Anuradhapura',
    origin: 'Colombo',
    destination: 'Anuradhapura',
    road: 'Puttalam Road (A3)',
    stops: ['Colombo', 'Negombo', 'Chilaw', 'Puttalam', 'Nochchiyagama', 'Anuradhapura'],
    departureTime: '06:00',
    arrivalTime: '11:00',
    fare: 350,
    frequency: 'every 3 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },
  {
    id: 'r12',
    number: '99', // Badulla is 99 usually.
    name: 'Colombo-Badulla',
    origin: 'Colombo',
    destination: 'Badulla',
    road: 'High Level Road (A4)',
    stops: ['Colombo', 'Ratnapura', 'Balangoda', 'Haputale', 'Bandarawela', 'Badulla'],
    departureTime: '07:00',
    arrivalTime: '14:00',
    fare: 450,
    frequency: 'every 4 hours',
    operator: 'Sri Lanka Transport Board',
    type: 'ordinary'
  },

  // --- East Coast Routes ---
  {
    id: 'r48',
    number: '48',
    name: 'Colombo-Batticaloa',
    origin: 'Colombo',
    destination: 'Batticaloa',
    road: 'Ambepussa-Trincomalee (A6)',
    stops: ['Colombo Fort', 'Kurunegala', 'Dambulla', 'Habarana', 'Polonnaruwa', 'Valachchenai', 'Batticaloa'],
    departureTime: '19:00',
    arrivalTime: '03:00',
    fare: 1100,
    frequency: 'every 2 hours',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },
  {
    id: 'r98',
    number: '98',
    name: 'Colombo-Ampara',
    origin: 'Colombo',
    destination: 'Ampara',
    road: 'A4 / A25',
    stops: ['Colombo Fort', 'Avissawella', 'Ratnapura', 'Pelmadulla', 'Udawalawe', 'Thanamalwila', 'Wellawaya', 'Monaragala', 'Ampara'],
    departureTime: '20:00',
    arrivalTime: '04:30',
    fare: 1250,
    frequency: 'daily',
    operator: 'SLTB / Private',
    type: 'ordinary'
  },

  // --- Southern Coastal Extension ---
  {
    id: 'r32',
    number: '32',
    name: 'Colombo-Kataragama',
    origin: 'Colombo',
    destination: 'Kataragama',
    road: 'Galle Road (A2)',
    stops: ['Colombo Fort', 'Galle', 'Matara', 'Tangalle', 'Ambalantota', 'Hambantota', 'Tissamaharama', 'Kataragama'],
    departureTime: '04:00',
    arrivalTime: '11:00',
    fare: 950,
    frequency: 'every 1 hour',
    operator: 'Private / SLTB',
    type: 'ordinary'
  },

  // --- North West Routes ---
  {
    id: 'r04-mannar',
    number: '04',
    name: 'Colombo-Mannar',
    origin: 'Colombo',
    destination: 'Mannar',
    road: 'A3 / A14',
    stops: ['Colombo Fort', 'Negombo', 'Chilaw', 'Puttalam', 'Silavathurai', 'Mannar'],
    departureTime: '08:00',
    arrivalTime: '15:00',
    fare: 900,
    frequency: 'twice daily',
    operator: 'SLTB',
    type: 'ordinary'
  },

  // --- Hill Country Inter-Provincial ---
  {
    id: 'r43',
    number: '43',
    name: 'Kandy-Anuradhapura',
    origin: 'Kandy',
    destination: 'Anuradhapura',
    road: 'A9',
    stops: ['Kandy', 'Matale', 'Dambulla', 'Kekirawa', 'Anuradhapura'],
    departureTime: '06:00',
    arrivalTime: '09:30',
    fare: 450,
    frequency: 'every 1 hour',
    operator: 'Private / SLTB',
    type: 'ordinary'
  }
];

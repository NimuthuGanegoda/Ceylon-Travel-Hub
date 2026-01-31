export interface TrainRoute {
  id: string;
  number: string;
  name: string;
  origin: string;
  destination: string;
  line: string; // e.g., "Main Line", "Coastal Line"
  stops: string[];
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: {
    firstClass?: number;
    secondClass: number;
    thirdClass: number;
  };
  frequency: string;
  type: 'intercity' | 'express' | 'commuter' | 'night-mail';
  availableClasses: string[];
}

export const trainRoutes: TrainRoute[] = [
  // --- Main Line (Colombo - Kandy - Badulla) ---
  {
    id: 't-1005',
    number: '1005',
    name: 'Podi Menike',
    origin: 'Colombo Fort',
    destination: 'Badulla',
    line: 'Main Line',
    stops: ['Colombo Fort', 'Ragama', 'Gampaha', 'Veyangoda', 'Polgahawela', 'Rambukkana', 'Peradeniya', 'Kandy', 'Hatton', 'Nanu Oya', 'Ella', 'Badulla'],
    departureTime: '05:55',
    arrivalTime: '16:00',
    duration: '10h 05m',
    fare: {
      firstClass: 2500,
      secondClass: 1200,
      thirdClass: 600
    },
    frequency: 'Daily',
    type: 'express',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-1015',
    number: '1015',
    name: 'Udarata Menike',
    origin: 'Colombo Fort',
    destination: 'Badulla',
    line: 'Main Line',
    stops: ['Colombo Fort', 'Polgahawela', 'Kandy', 'Peradeniya', 'Hatton', 'Nanu Oya', 'Haputale', 'Ella', 'Badulla'],
    departureTime: '08:30',
    arrivalTime: '18:00',
    duration: '9h 30m',
    fare: {
      firstClass: 2500,
      secondClass: 1200,
      thirdClass: 600
    },
    frequency: 'Daily',
    type: 'express',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-1001',
    number: '1001',
    name: 'Kandy Intercity',
    origin: 'Colombo Fort',
    destination: 'Kandy',
    line: 'Main Line',
    stops: ['Colombo Fort', 'Gampaha', 'Peradeniya', 'Kandy'],
    departureTime: '07:00',
    arrivalTime: '09:30',
    duration: '2h 30m',
    fare: {
      firstClass: 1000,
      secondClass: 600,
      thirdClass: 300
    },
    frequency: 'Daily',
    type: 'intercity',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-1002',
    number: '1002',
    name: 'Kandy Intercity (Return)',
    origin: 'Kandy',
    destination: 'Colombo Fort',
    line: 'Main Line',
    stops: ['Kandy', 'Peradeniya', 'Gampaha', 'Colombo Fort'],
    departureTime: '15:00',
    arrivalTime: '17:30',
    duration: '2h 30m',
    fare: {
      firstClass: 1000,
      secondClass: 600,
      thirdClass: 300
    },
    frequency: 'Daily',
    type: 'intercity',
    availableClasses: ['1st', '2nd', '3rd']
  },

  // --- Coastal Line (Colombo - Galle - Matara - Beliatta) ---
  {
    id: 't-8056',
    number: '8056',
    name: 'Galu Kumari',
    origin: 'Colombo Fort',
    destination: 'Beliatta',
    line: 'Coastal Line',
    stops: ['Colombo Fort', 'Mount Lavinia', 'Panadura', 'Kalutara', 'Aluthgama', 'Ambalangoda', 'Hikkaduwa', 'Galle', 'Weligama', 'Matara', 'Beliatta'],
    departureTime: '14:00',
    arrivalTime: '18:30',
    duration: '4h 30m',
    fare: {
      secondClass: 500,
      thirdClass: 250
    },
    frequency: 'Daily',
    type: 'express',
    availableClasses: ['2nd', '3rd']
  },
  {
    id: 't-8050',
    number: '8050',
    name: 'Ruhunu Kumari',
    origin: 'Colombo Fort',
    destination: 'Matara',
    line: 'Coastal Line',
    stops: ['Colombo Fort', 'Kalutara', 'Aluthgama', 'Hikkaduwa', 'Galle', 'Matara'],
    departureTime: '15:40',
    arrivalTime: '18:15',
    duration: '2h 35m',
    fare: {
      firstClass: 1200,
      secondClass: 600,
      thirdClass: 300
    },
    frequency: 'Daily',
    type: 'express',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-8096',
    number: '8096',
    name: 'Sagarika',
    origin: 'Beliatta',
    destination: 'Colombo Fort',
    line: 'Coastal Line',
    stops: ['Beliatta', 'Matara', 'Galle', 'Hikkaduwa', 'Aluthgama', 'Kalutara', 'Panadura', 'Mount Lavinia', 'Colombo Fort'],
    departureTime: '04:45',
    arrivalTime: '08:15',
    duration: '3h 30m',
    fare: {
      secondClass: 500,
      thirdClass: 250
    },
    frequency: 'Daily',
    type: 'commuter',
    availableClasses: ['2nd', '3rd']
  },
  {
    id: 't-8051',
    number: '8051',
    name: 'Sagarika',
    origin: 'Colombo Fort',
    destination: 'Beliatta',
    line: 'Coastal Line',
    stops: ['Colombo Fort', 'Mount Lavinia', 'Panadura', 'Kalutara', 'Aluthgama', 'Hikkaduwa', 'Galle', 'Matara', 'Beliatta'],
    departureTime: '16:40',
    arrivalTime: '20:10',
    duration: '3h 30m',
    fare: {
      secondClass: 500,
      thirdClass: 250
    },
    frequency: 'Daily',
    type: 'commuter',
    availableClasses: ['2nd', '3rd']
  },

  // --- Northern Line (Colombo - Anuradhapura - Jaffna - Kankesanthurai) ---
  {
    id: 't-4077',
    number: '4077',
    name: 'Yal Devi',
    origin: 'Colombo Fort',
    destination: 'Kankesanthurai',
    line: 'Northern Line',
    stops: ['Colombo Fort', 'Ragama', 'Polgahawela', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Kilinochchi', 'Jaffna', 'Kankesanthurai'],
    departureTime: '05:45',
    arrivalTime: '13:30',
    duration: '7h 45m',
    fare: {
      firstClass: 1800,
      secondClass: 1000,
      thirdClass: 500
    },
    frequency: 'Daily',
    type: 'express',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-4017',
    number: '4017',
    name: 'Uttara Devi',
    origin: 'Colombo Fort',
    destination: 'Kankesanthurai',
    line: 'Northern Line',
    stops: ['Colombo Fort', 'Gampaha', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Jaffna', 'Kankesanthurai'],
    departureTime: '11:50',
    arrivalTime: '18:40',
    duration: '6h 50m',
    fare: {
      firstClass: 2200,
      secondClass: 1200,
      thirdClass: 600
    },
    frequency: 'Daily',
    type: 'intercity',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-4018',
    number: '4018',
    name: 'Uttara Devi (Return)',
    origin: 'Kankesanthurai',
    destination: 'Colombo Fort',
    line: 'Northern Line',
    stops: ['Kankesanthurai', 'Jaffna', 'Vavuniya', 'Anuradhapura', 'Kurunegala', 'Gampaha', 'Colombo Fort'],
    departureTime: '05:30',
    arrivalTime: '12:30',
    duration: '7h 00m',
    fare: {
      firstClass: 2200,
      secondClass: 1200,
      thirdClass: 600
    },
    frequency: 'Daily',
    type: 'intercity',
    availableClasses: ['1st', '2nd', '3rd']
  },
  {
    id: 't-4089',
    number: '4089',
    name: 'Night Mail (Jaffna)',
    origin: 'Colombo Fort',
    destination: 'Kankesanthurai',
    line: 'Northern Line',
    stops: ['Colombo Fort', 'Polgahawela', 'Kurunegala', 'Anuradhapura', 'Vavuniya', 'Jaffna', 'Kankesanthurai'],
    departureTime: '20:30',
    arrivalTime: '04:30',
    duration: '8h 00m',
    fare: {
      firstClass: 2500,
      secondClass: 1200,
      thirdClass: 600
    },
    frequency: 'Daily',
    type: 'night-mail',
    availableClasses: ['1st', '2nd', '3rd']
  },

  // --- Eastern Line (Colombo - Trincomalee / Batticaloa) ---
  {
    id: 't-6011',
    number: '6011',
    name: 'Udaya Devi',
    origin: 'Colombo Fort',
    destination: 'Batticaloa',
    line: 'Eastern Line',
    stops: ['Colombo Fort', 'Kurunegala', 'Maho', 'Habarana', 'Polonnaruwa', 'Valachchenai', 'Batticaloa'],
    departureTime: '06:05',
    arrivalTime: '14:45',
    duration: '8h 40m',
    fare: {
      secondClass: 900,
      thirdClass: 450
    },
    frequency: 'Daily',
    type: 'express',
    availableClasses: ['2nd', '3rd']
  },
  {
    id: 't-7083',
    number: '7083',
    name: 'Trincomalee Night Mail',
    origin: 'Colombo Fort',
    destination: 'Trincomalee',
    line: 'Eastern Line',
    stops: ['Colombo Fort', 'Kurunegala', 'Maho', 'Galoya', 'Kantale', 'China Bay', 'Trincomalee'],
    departureTime: '21:30',
    arrivalTime: '05:30',
    duration: '8h 00m',
    fare: {
      firstClass: 2000,
      secondClass: 1000,
      thirdClass: 500
    },
    frequency: 'Daily',
    type: 'night-mail',
    availableClasses: ['1st', '2nd', '3rd']
  }
];

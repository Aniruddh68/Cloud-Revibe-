import { Bus, Operator, Seat, SeatStatus, PriceDay, User, Transaction, Offer, Testimonial } from '../types';

const operators: Operator[] = [
  { operator_id: 'OP01', name: 'Blue Horizon Travels', safety_score: 92, punctuality_score: 88, cleanliness_score: 95, trips_completed_30d: 150, primo_flag: true },
  { operator_id: 'OP02', name: 'Red Arrow Express', safety_score: 85, punctuality_score: 91, cleanliness_score: 88, trips_completed_30d: 120, primo_flag: false },
  { operator_id: 'OP03', name: 'GreenLine Coaches', safety_score: 88, punctuality_score: 85, cleanliness_score: 90, trips_completed_30d: 90, primo_flag: false },
  { operator_id: 'OP04', name: 'Speedy Gonzales Bus Co.', safety_score: 78, punctuality_score: 95, cleanliness_score: 82, trips_completed_30d: 200, primo_flag: true },
  { operator_id: 'OP05', name: 'Safar Tours', safety_score: 95, punctuality_score: 92, cleanliness_score: 94, trips_completed_30d: 180, primo_flag: true },
  { operator_id: 'OP06', name: 'National Transits', safety_score: 82, punctuality_score: 85, cleanliness_score: 85, trips_completed_30d: 250, primo_flag: false },
  { operator_id: 'OP07', name: 'CityLink Connect', safety_score: 89, punctuality_score: 89, cleanliness_score: 91, trips_completed_30d: 130, primo_flag: false },
];


const generateSeatLayout = (): Seat[][] => {
  const layout: Seat[][] = [];
  const rows = 10;
  for (let i = 0; i < rows; i++) {
    const row: Seat[] = [];
    const rowLabel = String.fromCharCode(65 + i);
    
    const statuses = [SeatStatus.Available, SeatStatus.Booked, SeatStatus.WomenOnly];
    
    // Left side
    row.push({ id: `${rowLabel}1`, status: statuses[Math.floor(Math.random() * 3)] });
    row.push({ id: `${rowLabel}2`, status: statuses[Math.floor(Math.random() * 2)] });
    
    // Aisle
    row.push(null as any); 
    
    // Right side
    row.push({ id: `${rowLabel}3`, status: statuses[Math.floor(Math.random() * 3)] });
    row.push({ id: `${rowLabel}4`, status: statuses[Math.floor(Math.random() * 2)] });

    layout.push(row);
  }
  return layout;
}


// New function to generate mock buses for a specific route
const generateBusesForRoute = (from: string, to: string, date: string): Bus[] => {
    const buses: Bus[] = [];
    const numBuses = Math.floor(Math.random() * 5) + 4; // Generate 4 to 8 buses

    for (let i = 0; i < numBuses; i++) {
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const departureHour = 18 + Math.floor(Math.random() * 5); // Departures between 18:00 and 22:00
        const departureMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        const durationHours = 8 + Math.floor(Math.random() * 5);
        const durationMinutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

        const departureTime = new Date(`${date}T${String(departureHour).padStart(2, '0')}:${String(departureMinute).padStart(2, '0')}:00+05:30`);
        const arrivalTime = new Date(departureTime.getTime() + (durationHours * 60 + durationMinutes) * 60000);

        const bus: Bus = {
            bus_id: `BUS${from.slice(0,1)}${to.slice(0,1)}${i}${Math.floor(Math.random()*100)}`,
            operator_id: operator.operator_id,
            operator_details: operator,
            route_from: from,
            route_to: to,
            departure_time: departureTime.toISOString(),
            arrival_time: arrivalTime.toISOString(),
            duration: `${durationHours}h ${durationMinutes}m`,
            fare: 600 + Math.floor(Math.random() * 800),
            seats_total: 40,
            seats_available: 5 + Math.floor(Math.random() * 30),
            amenities: ['AC', 'Charging', 'Water'].concat(
                Math.random() > 0.5 ? ['Wi-Fi'] : [],
                Math.random() > 0.6 ? ['Screen'] : [],
                Math.random() > 0.7 ? ['Blanket'] : [],
                operator.primo_flag ? ['Restroom'] : []
            ).filter((v, i, a) => a.indexOf(v) === i), // remove duplicates
            seat_layout: generateSeatLayout(),
        };
        buses.push(bus);
    }
    return buses;
}

const popularRoutes = [
    { from: 'Mumbai', to: 'Pune' },
    { from: 'Bangalore', to: 'Chennai' },
    { from: 'Delhi', to: 'Jaipur' },
    { from: 'Hyderabad', to: 'Bangalore' },
    { from: 'Delhi', to: 'Manali' },
    { from: 'Pune', to: 'Goa' },
];


export const searchBuses = async (from: string, to: string, date: string): Promise<Bus[]> => {
  console.log(`Searching for buses from ${from} to ${to} on ${date}`);
  // A simple check to see if it's a known route, otherwise generate something.
  const isPopular = popularRoutes.some(r => r.from.toLowerCase() === from.toLowerCase() && r.to.toLowerCase() === to.toLowerCase());

  if (isPopular || (from === 'Bhopal' && to === 'Delhi')) { 
      const buses = generateBusesForRoute(from, to, date);
      return new Promise(resolve => setTimeout(() => resolve(buses), 500));
  } else {
      return new Promise(resolve => setTimeout(() => resolve([]), 500));
  }
};

export const getBusDetails = async (busId: string): Promise<Bus | undefined> => {
    // This is a mock; in a real app, we'd fetch a single bus.
    // For now, we don't have a persistent list to search from, so we'll return a placeholder.
    const placeholderBus = generateBusesForRoute('Mumbai', 'Pune', new Date().toISOString().split('T')[0])[0];
    placeholderBus.bus_id = busId;
    return new Promise(resolve => setTimeout(() => {
        resolve(placeholderBus);
    }, 300));
};


export const getPriceCalendar = async (from: string, to: string): Promise<PriceDay[]> => {
    const prices: PriceDay[] = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        prices.push({
            date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            min_price: 600 + Math.floor(Math.random() * 400),
        });
    }
    return new Promise(resolve => setTimeout(() => resolve(prices), 400));
};

export const getMockUser = async (): Promise<User> => {
    const today = new Date();
    const mockTransactions: Transaction[] = [
        { transaction_id: 'TXN001', type: 'CREDIT', amount: 500.00, date: new Date(today.setDate(today.getDate() - 1)).toISOString(), description: 'Wallet top-up' },
        { transaction_id: 'TXN002', type: 'DEBIT', amount: 850.50, date: new Date(today.setDate(today.getDate() - 3)).toISOString(), description: 'Booking for DEL-JAI' },
        { transaction_id: 'TXN003', type: 'CREDIT', amount: 800.00, date: new Date(today.setDate(today.getDate() - 5)).toISOString(), description: 'Refund for BKG123' },
        { transaction_id: 'TXN004', type: 'DEBIT', amount: 1200.25, date: new Date(today.setDate(today.getDate() - 10)).toISOString(), description: 'Booking for MUM-PNQ' },
        { transaction_id: 'TXN005', type: 'DEBIT', amount: 750.00, date: new Date(today.setDate(today.getDate() - 12)).toISOString(), description: 'Booking for BLR-CHN' },
    ];

    const mockUser: User = {
        user_id: 'USR123',
        name: 'Priya Sharma',
        phone: '9876543210',
        email: 'priya.sharma@example.com',
        wallet_balance: 1250.75,
        transaction_history: mockTransactions,
    };
    return new Promise(resolve => setTimeout(() => resolve(mockUser), 200));
};

export const getPopularRoutes = async (): Promise<{ from: string; to: string }[]> => {
    return new Promise(resolve => setTimeout(() => resolve(popularRoutes), 200));
};

export const getOffers = async (): Promise<Offer[]> => {
    const offers: Offer[] = [
        { offer_id: 'OFR01', code: 'BUS200', title: 'Flat ₹200 Off', description: 'On your first bus booking. Use code BUS200.', icon: 'new_user' },
        { offer_id: 'OFR02', code: 'MILES10', title: '10% Instant Discount', description: 'Up to ₹150 on select routes. T&C apply.', icon: 'discount' },
        { offer_id: 'OFR03', code: 'WALLET50', title: '₹50 Wallet Cashback', description: 'Pay with Miles Wallet and get cashback.', icon: 'wallet' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(offers), 300));
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
    const testimonials: Testimonial[] = [
        { testimonial_id: 'TST01', user_name: 'Anjali R.', rating: 5, comment: 'Booking was incredibly smooth and fast. The bus was clean and on time. Highly recommended!' },
        { testimonial_id: 'TST02', user_name: 'Vikram S.', rating: 4, comment: 'Great service and comfortable journey. The live tracking feature is very helpful.' },
        { testimonial_id: 'TST03', user_name: 'Pooja M.', rating: 5, comment: 'I use Miles Travels for all my business trips. They have the best prices and reliable operators.' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(testimonials), 350));
};
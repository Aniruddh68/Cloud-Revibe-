import { Bus, Operator, Seat, SeatStatus, PriceDay, User, Transaction, Offer, Testimonial, Point, Review } from '../types';

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

const generatePoints = (departureTime: Date, count: number, prefix: string): Point[] => {
    const points: Point[] = [];
    let currentTime = new Date(departureTime);
    for(let i = 0; i < count; i++) {
        currentTime.setMinutes(currentTime.getMinutes() + i * 15 + (i > 0 ? 10: 0));
        points.push({
            id: `${prefix}${i}`,
            name: `${prefix} Point ${i+1}`,
            time: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        });
    }
    return points;
}

const generateReviews = (): Review[] => {
    const reviews: Review[] = [];
    const names = ['Ravi', 'Sunita', 'Amit', 'Priya', 'Mohan'];
    const comments = [
        'Very comfortable journey!', 'Bus was on time.', 'Clean and hygienic.', 
        'Staff was very helpful.', 'Great experience overall.'
    ];
    for(let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        reviews.push({
            review_id: `REV${i}`,
            user_name: `${names[Math.floor(Math.random() * names.length)]} K.`,
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
            comment: comments[Math.floor(Math.random() * comments.length)],
            date: date.toISOString(),
        });
    }
    return reviews;
}

const generatePhotos = (bus_id: string): string[] => {
    return [
        `https://picsum.photos/seed/${bus_id}_ext/800/600`,
        `https://picsum.photos/seed/${bus_id}_int/800/600`,
        `https://picsum.photos/seed/${bus_id}_seat/800/600`,
        `https://picsum.photos/seed/${bus_id}_side/800/600`,
    ];
}


// New function to generate mock buses for a specific route
const generateBusesForRoute = (from: string, to: string, date: string): Bus[] => {
    const buses: Bus[] = [];
    const numBuses = Math.floor(Math.random() * 5) + 4; // Generate 4 to 8 buses

    // Base coordinates for cities to make tracking more realistic
    const cityCoords: { [key: string]: { lat: number, lng: number } } = {
      'mumbai': { lat: 19.0760, lng: 72.8777 },
      'pune': { lat: 18.5204, lng: 73.8567 },
      'bangalore': { lat: 12.9716, lng: 77.5946 },
      'chennai': { lat: 13.0827, lng: 80.2707 },
      'delhi': { lat: 28.7041, lng: 77.1025 },
      'jaipur': { lat: 26.9124, lng: 75.7873 },
      'hyderabad': { lat: 17.3850, lng: 78.4867 },
      'manali': { lat: 32.2432, lng: 77.1892 },
      'goa': { lat: 15.2993, lng: 74.1240 },
      'bhopal': { lat: 23.2599, lng: 77.4126 },
    };

    const fromCoords = cityCoords[from.toLowerCase()] || { lat: 20.5937, lng: 78.9629 }; // Default to India center

    for (let i = 0; i < numBuses; i++) {
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const departureHour = 18 + Math.floor(Math.random() * 5); // Departures between 18:00 and 22:00
        const departureMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        const durationHours = 8 + Math.floor(Math.random() * 5);
        const durationMinutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

        const departureTime = new Date(`${date}T${String(departureHour).padStart(2, '0')}:${String(departureMinute).padStart(2, '0')}:00+05:30`);
        const arrivalTime = new Date(departureTime.getTime() + (durationHours * 60 + durationMinutes) * 60000);
        
        const bus_id = `BUS${from.slice(0,1)}${to.slice(0,1)}${i}${Math.floor(Math.random()*100)}`;

        const bus: Bus = {
            bus_id: bus_id,
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
            photos: generatePhotos(bus_id),
            reviews: generateReviews(),
            boarding_points: generatePoints(departureTime, 4, from.slice(0,3).toUpperCase()),
            dropping_points: generatePoints(arrivalTime, 4, to.slice(0,3).toUpperCase()),
            live_lat: fromCoords.lat + (Math.random() - 0.5) * 0.05, // Add live location
            live_lng: fromCoords.lng + (Math.random() - 0.5) * 0.05,
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

  if (isPopular || (from && to)) { 
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

// FIX: Replaced malformed function with a valid mock implementation that returns valid Testimonial objects and a Promise.
export const getTestimonials = async (): Promise<Testimonial[]> => {
    const testimonials: Testimonial[] = [
        { 
            testimonial_id: 'TEST01', 
            user_name: 'Anjali P.', 
            rating: 5, 
            comment: 'Booking was so easy and the journey was very comfortable. Highly recommended!' 
        },
        { 
            testimonial_id: 'TEST02', 
            user_name: 'Vikram S.', 
            rating: 4, 
            comment: 'Good service, the bus was on time. The app is also very user-friendly.' 
        },
        { 
            testimonial_id: 'TEST03', 
            user_name: 'Rohan M.', 
            rating: 5, 
            comment: 'I travel frequently for work and Miles Travels is my go-to for bus tickets. Never had an issue.' 
        },
    ];
    return new Promise(resolve => setTimeout(() => resolve(testimonials), 350));
};
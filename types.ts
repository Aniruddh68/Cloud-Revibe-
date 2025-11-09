
export interface Operator {
  operator_id: string;
  name: string;
  safety_score: number;
  punctuality_score: number;
  cleanliness_score: number;
  trips_completed_30d: number;
  primo_flag: boolean;
}

export interface Point {
  id: string;
  name: string;
  time: string;
}

export interface Review {
  review_id: string;
  user_name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Bus {
  bus_id: string;
  operator_id: string;
  operator_details: Operator;
  route_from: string;
  route_to: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  fare: number;
  seats_total: number;
  seats_available: number;
  amenities: string[];
  live_lat?: number;
  live_lng?: number;
  seat_layout?: Seat[][];
  photos: string[];
  reviews: Review[];
  boarding_points: Point[];
  dropping_points: Point[];
}

export enum SeatStatus {
  Available = 'available',
  Booked = 'booked',
  WomenOnly = 'female',
  Selected = 'selected',
}

export interface Seat {
  id: string;
  status: SeatStatus;
}

export interface Booking {
  booking_id: string;
  busDetails: Bus;
  seats: Seat[];
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  fare_paid: number;
  boarding_point: Point;
  dropping_point: Point;
}

export interface Transaction {
  transaction_id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  date: string;
  description: string;
}

export interface User {
  user_id: string;
  name: string;
  phone: string;
  email: string;
  wallet_balance: number;
  transaction_history?: Transaction[];
}

// Add PriceDay interface for price calendar
export interface PriceDay {
  date: string;
  min_price: number;
}

export interface Offer {
  offer_id: string;
  code: string;
  title: string;
  description: string;
  icon: 'discount' | 'wallet' | 'new_user';
}

export interface Testimonial {
  testimonial_id: string;
  user_name: string;
  rating: number; // e.g., 4 or 5
  comment: string;
}

export interface TripSuggestion {
  from: string;
  to: string;
  reasoning: string;
}

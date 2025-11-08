
import React from 'react';
import { Booking } from '../../types';
import { BusCard } from '../common/BusCard';

interface MyTripsPageProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

const MyTripsPage: React.FC<MyTripsPageProps> = ({ bookings, onCancelBooking }) => {
    
    const handleCancelClick = (bookingId: string) => {
        if (window.confirm('Are you sure you want to cancel this booking? A cancellation fee may apply.')) {
            onCancelBooking(bookingId);
            alert('Booking cancelled successfully.');
        }
    };
    
    if (bookings.length === 0) {
        return (
             <div className="text-center py-16 px-6 bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in-down">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-700">No trips found</h3>
                <p className="mt-1 text-gray-500">You haven't booked any trips yet. Start by searching for a bus!</p>
            </div>
        )
    }

    const getStatusClasses = (status: Booking['status']) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'COMPLETED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">My Trips</h1>
            <div className="space-y-6">
                {bookings.map((booking, index) => (
                    <div 
                        key={booking.booking_id} 
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-fade-in-down opacity-0"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3 mb-3 gap-2">
                            <div>
                                <p className="text-sm text-gray-500">Booking ID:</p>
                                <p className="font-mono font-semibold text-gray-700">{booking.booking_id}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}
                            </div>
                        </div>
                        <BusCard bus={booking.busDetails} isDetailView={true} />
                        <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                <p className="text-sm text-gray-600">Seats: <span className="font-bold text-gray-800">{booking.seats.map(s => s.id).join(', ')}</span></p>
                                <p className="text-sm text-gray-600">Total Fare Paid: <span className="font-bold text-gray-800">₹{booking.fare_paid.toFixed(2)}</span></p>
                                <p className="text-sm text-gray-600 col-span-1">Boarding: <span className="font-bold text-gray-800">{booking.boarding_point.name} ({booking.boarding_point.time})</span></p>
                                <p className="text-sm text-gray-600 col-span-1">Dropping: <span className="font-bold text-gray-800">{booking.dropping_point.name} ({booking.dropping_point.time})</span></p>
                            </div>
                            {booking.status === 'CONFIRMED' && (
                                <div className="flex gap-2 pt-2">
                                    <button className="text-sm text-brand-primary font-semibold hover:underline bg-brand-light px-3 py-2 rounded-lg">Download Ticket</button>
                                    <button
                                        onClick={() => handleCancelClick(booking.booking_id)}
                                        className="bg-red-100 text-red-700 hover:bg-red-200 font-bold py-2 px-3 rounded-lg transition text-sm"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyTripsPage;
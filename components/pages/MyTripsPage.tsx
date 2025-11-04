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
             <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                <h3 className="mt-4 text-xl font-semibold text-slate-600">No trips found</h3>
                <p className="mt-1 text-slate-500">You haven't booked any trips yet. Start by searching for a bus!</p>
            </div>
        )
    }

    const getStatusClass = (status: Booking['status']) => {
        switch (status) {
            case 'CONFIRMED': return 'text-green-600';
            case 'CANCELLED': return 'text-red-600';
            case 'COMPLETED': return 'text-slate-600';
            default: return 'text-slate-600';
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">My Trips</h1>
            <div className="space-y-6">
                {bookings.map(booking => (
                    <div key={booking.booking_id} className="bg-white p-4 rounded-xl shadow-md border border-slate-100">
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <div>
                                <p className="text-sm text-slate-500">Booking ID: <span className="font-mono text-slate-700">{booking.booking_id}</span></p>
                                <p className="text-sm text-slate-500">Status: <span className={`font-semibold ${getStatusClass(booking.status)}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}</span></p>
                            </div>
                            {booking.status === 'CONFIRMED' && (
                                <button className="text-sm text-brand-primary font-semibold hover:underline">Download Ticket</button>
                            )}
                        </div>
                        <BusCard bus={booking.busDetails} isDetailView={true} />
                        <div className="pt-3 mt-3 border-t flex justify-between items-center">
                            <div>
                                <p className="text-sm text-slate-600">Seats: <span className="font-bold text-slate-800">{booking.seats.map(s => s.id).join(', ')}</span></p>
                                <p className="text-sm text-slate-600">Total Fare Paid: <span className="font-bold text-slate-800">₹{booking.fare_paid.toFixed(2)}</span></p>
                            </div>
                             {booking.status === 'CONFIRMED' && (
                                <button 
                                    onClick={() => handleCancelClick(booking.booking_id)}
                                    className="bg-red-100 text-red-700 hover:bg-red-200 font-bold py-2 px-4 rounded-lg transition text-sm"
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyTripsPage;
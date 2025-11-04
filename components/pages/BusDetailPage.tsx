import React, { useState, useCallback } from 'react';
import { Bus, Seat, SeatStatus } from '../../types';
import { BusCard } from '../common/BusCard';
import { SeatMap } from '../details/SeatMap';

interface BusDetailPageProps {
  bus: Bus;
  onProceedToCheckout: (bus: Bus, seats: Seat[]) => void;
}

const BusDetailPage: React.FC<BusDetailPageProps> = ({ bus, onProceedToCheckout }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatSelect = useCallback((seat: Seat) => {
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, { ...seat, status: SeatStatus.Selected }];
      }
    });
  }, []);

  const totalFare = selectedSeats.length * bus.fare;

  return (
    <div className="space-y-8">
      <BusCard bus={bus} isDetailView={true} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
            <SeatMap seatLayout={bus.seat_layout || []} onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-3">Booking Summary</h2>
            
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Selected Seats ({selectedSeats.length}):</span>
                    <span className="font-semibold text-gray-800 truncate max-w-[120px]">
                        {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'None'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Fare per seat:</span>
                    <span className="font-semibold text-gray-800">₹{bus.fare}</span>
                </div>
                <div className="border-t my-3"></div>
                <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-800">Total Fare:</span>
                    <span className="font-extrabold text-2xl text-brand-primary">₹{totalFare}</span>
                </div>
            </div>
            
            <button 
              onClick={() => onProceedToCheckout(bus, selectedSeats)}
              disabled={selectedSeats.length === 0}
              className="mt-6 w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
            >
              Proceed to Checkout
            </button>
            
            {selectedSeats.length === 0 && (
                <p className="text-center text-gray-500 text-sm mt-3">Please select a seat to proceed.</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetailPage;
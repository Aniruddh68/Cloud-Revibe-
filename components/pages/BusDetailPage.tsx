
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
            <SeatMap seatLayout={bus.seat_layout || []} onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Booking Summary</h2>
            {selectedSeats.length > 0 ? (
              <>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-slate-600">Selected Seats:</span>
                        <span className="font-semibold text-slate-800">{selectedSeats.map(s => s.id).join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Fare per seat:</span>
                        <span className="font-semibold text-slate-800">₹{bus.fare}</span>
                    </div>
                    <div className="border-t my-2"></div>
                    <div className="flex justify-between text-lg">
                        <span className="font-bold text-slate-800">Total Fare:</span>
                        <span className="font-bold text-brand-primary">₹{totalFare}</span>
                    </div>
                </div>
                <button 
                  onClick={() => onProceedToCheckout(bus, selectedSeats)}
                  className="mt-6 w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed disabled:scale-100"
                >
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <p className="text-slate-500 text-center py-8">Please select a seat to proceed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetailPage;


import React from 'react';
import { Seat, SeatStatus } from '../../types';

interface SeatProps {
  seat: Seat | null;
  isSelected: boolean;
  onSelect: (seat: Seat) => void;
}

const SeatComponent: React.FC<SeatProps> = ({ seat, isSelected, onSelect }) => {
  if (!seat) {
    return <div className="w-10 h-10 md:w-12 md:h-12" />; // Aisle space
  }

  const isAvailable = seat.status === SeatStatus.Available;
  const isDisabled = seat.status === SeatStatus.Booked || seat.status === SeatStatus.WomenOnly;

  let seatClasses = "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-semibold text-xs border-2 transition-all duration-200";

  if (isSelected) {
    seatClasses += " bg-green-500 border-green-700 text-white scale-110";
  } else {
    switch (seat.status) {
      case SeatStatus.Available:
        seatClasses += " bg-slate-100 border-slate-300 text-slate-600 cursor-pointer hover:bg-green-100 hover:border-green-400";
        break;
      case SeatStatus.Booked:
        seatClasses += " bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed";
        break;
      case SeatStatus.WomenOnly:
        seatClasses += " bg-pink-100 border-pink-300 text-pink-700 cursor-not-allowed";
        break;
    }
  }

  return (
    <button
      onClick={() => onSelect(seat)}
      disabled={!isAvailable}
      className={seatClasses}
      title={`Seat ${seat.id} - ${seat.status}`}
    >
      {seat.id}
    </button>
  );
};


interface SeatMapProps {
  seatLayout: Seat[][];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ seatLayout, selectedSeats, onSeatSelect }) => {
  const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded ${color}`}></div>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="bg-slate-100 p-4 rounded-lg w-full max-w-sm">
        <div className="flex justify-end pr-4 mb-4">
          <div className="w-10 h-10 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-xs">Driver</span>
          </div>
        </div>
        <div className="space-y-2">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((seat, seatIndex) => (
                <SeatComponent
                  key={seat?.id || `aisle-${seatIndex}`}
                  seat={seat}
                  isSelected={selectedSeats.some(s => s.id === seat?.id)}
                  onSelect={onSeatSelect}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
        <LegendItem color="bg-slate-100 border-2 border-slate-300" label="Available" />
        <LegendItem color="bg-green-500 border-2 border-green-700" label="Selected" />
        <LegendItem color="bg-slate-300 border-2 border-slate-400" label="Booked" />
        <LegendItem color="bg-pink-100 border-2 border-pink-300" label="Women Only" />
      </div>
    </div>
  );
};

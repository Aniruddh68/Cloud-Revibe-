
import React from 'react';
import { Bus } from '../../types';

interface BusCardProps {
  bus: Bus;
  onSelect?: () => void;
  isDetailView?: boolean;
}

export const BusCard: React.FC<BusCardProps> = ({ bus, onSelect, isDetailView = false }) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const avgRating = (
      (bus.operator_details.safety_score + bus.operator_details.punctuality_score + bus.operator_details.cleanliness_score) / 3 / 20
  ).toFixed(1);

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-slate-100 ${!isDetailView ? 'hover:shadow-xl hover:border-brand-primary transition-all duration-300 cursor-pointer' : ''}`} onClick={onSelect}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{bus.operator_details.name}</h3>
          <div className="flex items-center gap-4 text-sm text-slate-500 my-1">
             <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-sm">{avgRating}</span>
             </div>
             <span>{bus.operator_details.trips_completed_30d}+ Trips</span>
          </div>
          <p className="text-sm text-slate-500">
            {bus.amenities.join(' • ')}
          </p>
          {bus.operator_details.primo_flag && (
              <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                Primo Bus
              </span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0 text-center md:text-right">
            <div>
                <p className="text-lg font-bold text-slate-800">{formatTime(bus.departure_time)}</p>
                <p className="text-sm text-slate-500">{bus.route_from}</p>
            </div>
            <div className="text-slate-400">
                <p className="text-xs">{bus.duration}</p>
                <div className="w-16 h-px bg-slate-300 my-1"></div>
                <p className="text-xs">to</p>
            </div>
            <div>
                <p className="text-lg font-bold text-slate-800">{formatTime(bus.arrival_time)}</p>
                <p className="text-sm text-slate-500">{bus.route_to}</p>
            </div>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0 text-center md:text-right">
            <p className="text-2xl font-bold text-brand-primary">₹{bus.fare}</p>
            <p className="text-xs text-slate-500">{bus.seats_available} seats available</p>
            {!isDetailView &&
             <button className="mt-2 w-full md:w-auto bg-brand-secondary hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
                Select Seats
             </button>
            }
        </div>
      </div>
    </div>
  );
};

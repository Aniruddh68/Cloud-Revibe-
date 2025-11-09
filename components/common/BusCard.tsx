
import React from 'react';
import { Bus } from '../../types';

interface BusCardProps {
  bus: Bus;
  onSelect?: () => void;
  isDetailView?: boolean;
}

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    const iconMap: { [key: string]: React.ReactNode } = {
        'AC': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        'Wi-Fi': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.28 11.718a2.75 2.75 0 013.89 0" /></svg>,
        'Charging': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
        'Water': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18L12 21.75 15.75 18m-7.5-6L12 5.25 15.75 12" /></svg>, // Placeholder, better icon needed
        'Blanket': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.2 17.5c0 1.9 1.1 3.5 2.6 3.5 1.5 0 2.6-1.6 2.6-3.5 0-1.9-1.1-3.5-2.6-3.5C5.3 14 4.2 15.6 4.2 17.5zM14.2 17.5c0 1.9 1.1 3.5 2.6 3.5 1.5 0 2.6-1.6 2.6-3.5 0-1.9-1.1-3.5-2.6-3.5-1.5 0-2.6 1.6-2.6 3.5z" /></svg>, // Placeholder
    };
    if (!iconMap[amenity]) return null;
    return <div title={amenity} className="text-gray-500">{iconMap[amenity]}</div>;
};


export const BusCard: React.FC<BusCardProps> = ({ bus, onSelect, isDetailView = false }) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  
  const avgRating = (
      (bus.operator_details.safety_score + bus.operator_details.punctuality_score + bus.operator_details.cleanliness_score) / 3 / 20
  ).toFixed(1);

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-5 transition-all duration-300 flex flex-col sm:flex-row gap-4 ${!isDetailView ? 'hover:shadow-soft hover:shadow-glow hover:border-brand-primary cursor-pointer hover:-translate-y-1.5' : 'shadow-soft'}`}
      onClick={onSelect}>

      {/* Main content: Operator, Timings, Amenities */}
      <div className="flex-grow">
          {/* Top section: Operator name and rating */}
          <div className="flex justify-between items-start mb-1">
              <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">{bus.operator_details.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 font-medium">
                      {bus.amenities.slice(0, 4).join(' • ')}
                  </p>
              </div>
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm border border-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>{avgRating}</span>
              </div>
          </div>

          {/* Middle section: Timings */}
          <div className="flex items-center gap-3 sm:gap-4 my-5">
              <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">{formatTime(bus.departure_time)}</p>
                  <p className="text-sm font-semibold text-gray-500 mt-0.5">{bus.route_from}</p>
              </div>
              <div className="flex-grow text-center px-2">
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">{bus.duration}</p>
                  <div className="w-full h-0.5 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-brand-primary relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-primary border-2 border-white shadow-sm absolute top-1/2 -translate-y-1/2 left-0"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-primary border-2 border-white shadow-sm absolute top-1/2 -translate-y-1/2 right-0"></div>
                  </div>
              </div>
              <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">{formatTime(bus.arrival_time)}</p>
                  <p className="text-sm font-semibold text-gray-500 mt-0.5">{bus.route_to}</p>
              </div>
          </div>
          
          {/* Bottom section: Primo and Amenities */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3.5">
              <div className="flex items-center gap-3.5">
                  {bus.amenities.slice(0, 5).map(a => <AmenityIcon key={a} amenity={a} />)}
              </div>
              {bus.operator_details.primo_flag && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-50 to-orange-50 text-orange-700 border border-orange-200 shadow-sm">
                    <svg className="w-4 h-4 mr-1.5 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    Primo Bus
                  </span>
              )}
          </div>
      </div>

      {/* Fare and Action Button */}
      <div className="sm:border-l border-gray-200 sm:pl-5 flex flex-row sm:flex-col justify-between items-center sm:w-44 sm:py-4">
        <div className="text-left sm:text-center">
          <p className="text-3xl font-black text-brand-primary tracking-tight">₹{bus.fare}</p>
          <p className="text-xs font-semibold text-gray-500 mt-1">
            <span className={`${bus.seats_available < 10 ? 'text-red-500' : 'text-green-600'}`}>{bus.seats_available}</span> seats left
          </p>
        </div>
        {!isDetailView &&
          <button className="mt-0 sm:mt-auto w-auto sm:w-full bg-gradient-to-r from-brand-secondary to-orange-600 hover:from-orange-600 hover:to-brand-secondary text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Select Seats
          </button>
        }
      </div>
    </div>
  );
};
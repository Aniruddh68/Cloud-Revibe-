
import React, { useState, useCallback, useEffect } from 'react';
import { Bus, Seat, SeatStatus, Point } from '../../types';
import { BusCard } from '../common/BusCard';
import { SeatMap } from '../details/SeatMap';
import { BusImages } from '../details/BusImages';
import { CustomerReviews } from '../details/CustomerReviews';
import { BoardingDroppingPoints } from '../details/BoardingDroppingPoints';
import { LiveTrackingMap } from '../details/LiveTrackingMap';


type DetailTab = 'SEATS' | 'POINTS' | 'REVIEWS' | 'PHOTOS' | 'TRACKING';

interface BusDetailPageProps {
  bus: Bus;
  onProceedToCheckout: (bus: Bus, seats: Seat[], boardingPoint: Point, droppingPoint: Point) => void;
}

const TabButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-2 p-3 sm:p-4 text-sm sm:text-base font-semibold border-b-4 transition-all ${
            isActive ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:bg-gray-50'
        }`}
    >
        {icon}
        {label}
    </button>
);


const BusDetailPage: React.FC<BusDetailPageProps> = ({ bus, onProceedToCheckout }) => {
  const [currentBus, setCurrentBus] = useState<Bus>(bus);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [activeTab, setActiveTab] = useState<DetailTab>('SEATS');
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<Point | null>(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<Point | null>(null);

  // Effect to simulate real-time bus movement
  useEffect(() => {
    if (!bus.live_lat || !bus.live_lng) return;

    const intervalId = setInterval(() => {
        setCurrentBus(prevBus => {
            if (!prevBus.live_lat || !prevBus.live_lng) return prevBus;
            return {
                ...prevBus,
                live_lat: prevBus.live_lat + (Math.random() - 0.5) * 0.002,
                live_lng: prevBus.live_lng + (Math.random() - 0.5) * 0.002,
            };
        });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId);
  }, [bus.live_lat, bus.live_lng]);

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
  
  const handleProceed = () => {
    if (bus && selectedSeats.length > 0 && selectedBoardingPoint && selectedDroppingPoint) {
      onProceedToCheckout(bus, selectedSeats, selectedBoardingPoint, selectedDroppingPoint);
    }
  };

  const totalFare = selectedSeats.length * bus.fare;
  const canProceed = selectedSeats.length > 0 && !!selectedBoardingPoint && !!selectedDroppingPoint;
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'SEATS':
        return <SeatMap seatLayout={bus.seat_layout || []} onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />;
      case 'POINTS':
        return <BoardingDroppingPoints 
            boardingPoints={bus.boarding_points}
            droppingPoints={bus.dropping_points}
            selectedBoardingPoint={selectedBoardingPoint}
            selectedDroppingPoint={selectedDroppingPoint}
            onSelectBoarding={setSelectedBoardingPoint}
            onSelectDropping={setSelectedDroppingPoint}
        />;
      case 'REVIEWS':
        return <CustomerReviews reviews={bus.reviews} />;
      case 'PHOTOS':
        return <BusImages photos={bus.photos} />;
      case 'TRACKING':
        return <LiveTrackingMap bus={currentBus} />;
      default:
        return null;
    }
  }

  return (
    <div className="space-y-8">
      <BusCard bus={bus} isDetailView={true} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex border-b border-gray-200">
                <TabButton label="Seats" isActive={activeTab === 'SEATS'} onClick={() => setActiveTab('SEATS')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
                <TabButton label="Boarding & Dropping" isActive={activeTab === 'POINTS'} onClick={() => setActiveTab('POINTS')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
                {bus.live_lat && bus.live_lng && (
                    <TabButton label="Live Tracking" isActive={activeTab === 'TRACKING'} onClick={() => setActiveTab('TRACKING')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L12 21.25l-5.657-4.593A8 8 0 1117.657 16.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>} />
                )}
                <TabButton label="Reviews" isActive={activeTab === 'REVIEWS'} onClick={() => setActiveTab('REVIEWS')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} />
                <TabButton label="Photos" isActive={activeTab === 'PHOTOS'} onClick={() => setActiveTab('PHOTOS')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
            </div>
            <div className="p-4 sm:p-6 min-h-[300px]">
                <div key={activeTab} className="animate-fade-in">
                  {renderTabContent()}
                </div>
            </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-3">Booking Summary</h2>
            
            <div className="space-y-3">
                 <div className="flex justify-between">
                    <span className="text-gray-600">Selected Seats:</span>
                    <span className="font-semibold text-gray-800 truncate max-w-[120px]">
                        {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'None'}
                    </span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-600">Boarding Point:</span>
                    <span className="font-semibold text-gray-800 truncate max-w-[120px]">{selectedBoardingPoint?.name ?? 'None'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Dropping Point:</span>
                    <span className="font-semibold text-gray-800 truncate max-w-[120px]">{selectedDroppingPoint?.name ?? 'None'}</span>
                </div>
                <div className="border-t my-3"></div>
                <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-800">Total Fare:</span>
                    <span className="font-extrabold text-2xl text-brand-primary">₹{totalFare}</span>
                </div>
            </div>
            
            <button 
              onClick={handleProceed}
              disabled={!canProceed}
              className="mt-6 w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
            >
              Proceed to Checkout
            </button>
            
            {!canProceed && (
                <p className="text-center text-red-500 text-sm mt-3 font-medium">
                    {selectedSeats.length === 0 ? 'Please select a seat.' : 'Please select boarding & dropping points.'}
                </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetailPage;
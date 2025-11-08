
import React, { useState, useCallback, useEffect } from 'react';
import { Bus, Seat, Booking, User, Point } from './types';
import { getMockUser } from './services/mockApiService';
import SearchPage from './components/pages/SearchPage';
import BusDetailPage from './components/pages/BusDetailPage';
import CheckoutPage from './components/pages/CheckoutPage';
import MyTripsPage from './components/pages/MyTripsPage';
import MyAccountPage from './components/pages/MyAccountPage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

type Page = 'SEARCH' | 'DETAILS' | 'CHECKOUT' | 'MY_TRIPS' | 'ACCOUNT';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('SEARCH');
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<Point | null>(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<Point | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
        const user = await getMockUser();
        setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleBusSelect = useCallback((bus: Bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setSelectedBoardingPoint(null);
    setSelectedDroppingPoint(null);
    setCurrentPage('DETAILS');
  }, []);

  const handleProceedToCheckout = useCallback((bus: Bus, seats: Seat[], boardingPoint: Point, droppingPoint: Point) => {
    setSelectedBus(bus);
    setSelectedSeats(seats);
    setSelectedBoardingPoint(boardingPoint);
    setSelectedDroppingPoint(droppingPoint);
    setCurrentPage('CHECKOUT');
  }, []);
  
  const handleConfirmBooking = useCallback(() => {
    if (!selectedBus || selectedSeats.length === 0 || !selectedBoardingPoint || !selectedDroppingPoint) return;

    const newBooking: Booking = {
        booking_id: `MT${Date.now()}`,
        busDetails: selectedBus,
        seats: selectedSeats,
        status: 'CONFIRMED',
        fare_paid: selectedBus.fare * selectedSeats.length * 1.05,
        boarding_point: selectedBoardingPoint,
        dropping_point: selectedDroppingPoint,
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedBus(null);
    setSelectedSeats([]);
    setSelectedBoardingPoint(null);
    setSelectedDroppingPoint(null);
    setCurrentPage('MY_TRIPS');

  }, [selectedBus, selectedSeats, selectedBoardingPoint, selectedDroppingPoint]);
  
  const handleCancelBooking = useCallback((bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.booking_id === bookingId 
          ? { ...booking, status: 'CANCELLED' } 
          : booking
      )
    );
  }, []);

  const handleUpdateUser = useCallback((updatedUser: User) => {
    setCurrentUser(updatedUser);
    // In a real app, you'd also make an API call to save the changes.
    alert('Profile updated successfully!');
  }, []);


  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    let pageContent;
    let wrapInContainer = true;

    switch (currentPage) {
      case 'SEARCH':
        pageContent = <SearchPage onBusSelect={handleBusSelect} />;
        wrapInContainer = false; // SearchPage manages its own full-width layout.
        break;
      case 'DETAILS':
        if (!selectedBus) {
          setCurrentPage('SEARCH');
          return null;
        }
        pageContent = <BusDetailPage bus={selectedBus} onProceedToCheckout={handleProceedToCheckout} />;
        break;
      case 'CHECKOUT':
        if (!selectedBus || selectedSeats.length === 0 || !selectedBoardingPoint || !selectedDroppingPoint) {
          setCurrentPage('SEARCH');
          return null;
        }
        pageContent = <CheckoutPage bus={selectedBus} seats={selectedSeats} boardingPoint={selectedBoardingPoint} droppingPoint={selectedDroppingPoint} onConfirmBooking={handleConfirmBooking} />;
        break;
      case 'MY_TRIPS':
        pageContent = <MyTripsPage bookings={bookings} onCancelBooking={handleCancelBooking} />;
        break;
      case 'ACCOUNT':
        if (!currentUser) return <div className="text-center p-8">Loading account details...</div>;
        pageContent = <MyAccountPage user={currentUser} onUpdateUser={handleUpdateUser} />;
        break;
      default:
        pageContent = <SearchPage onBusSelect={handleBusSelect} />;
        wrapInContainer = false;
    }

    if (wrapInContainer) {
      return <div className="container mx-auto px-4 py-8">{pageContent}</div>;
    }
    return pageContent;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header onNavigate={navigateTo} currentPage={currentPage} user={currentUser} />
      <main className="flex-grow">
        <div key={currentPage} className="animate-fade-in-down">
            {renderPage()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
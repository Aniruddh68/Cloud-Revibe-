
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bus, SeatStatus } from '../../types';
import { searchBuses } from '../../services/mockApiService';
import { SearchBar } from '../search/SearchBar';
import { PriceCalendar } from '../search/PriceCalendar';
import { FiltersPanel } from '../search/FiltersPanel';
import { SearchResults } from '../search/SearchResults';
import { PopularRoutes } from '../home/PopularRoutes';
import { WhyChooseUs } from '../home/WhyChooseUs';
import { OffersSection } from '../home/OffersSection';
import { TestimonialsSection } from '../home/TestimonialsSection';


interface SearchPageProps {
  onBusSelect: (bus: Bus) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onBusSelect }) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Pune');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const prevDateRef = useRef<string>(date);

  const handleSearch = useCallback(async (searchOverride?: { from: string; to: string }) => {
    const fromCity = searchOverride?.from || from;
    const toCity = searchOverride?.to || to;

    setIsLoading(true);
    setSearchPerformed(true);
    
    // Allow the DOM to update before scrolling
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    const results = await searchBuses(fromCity, toCity, date);
    setBuses(results);
    setFilteredBuses(results);
    setIsLoading(false);
  }, [from, to, date]);

  const handleRouteSelect = useCallback((selectedFrom: string, selectedTo: string) => {
    setFrom(selectedFrom);
    setTo(selectedTo);
    // Trigger search immediately with the new values to avoid stale state issues
    handleSearch({ from: selectedFrom, to: selectedTo }); 
  }, [handleSearch]);

  useEffect(() => {
    const womenOnlyFilterActive = activeFilters.includes('Women Only Seats');
    const amenityFilters = activeFilters.filter(f => f !== 'Women Only Seats');

    let newFilteredBuses = [...buses];

    // Apply amenity filters
    if (amenityFilters.length > 0) {
      newFilteredBuses = newFilteredBuses.filter(bus =>
        amenityFilters.every(filter => bus.amenities.includes(filter))
      );
    }

    // Apply women-only seats filter
    if (womenOnlyFilterActive) {
      newFilteredBuses = newFilteredBuses.filter(bus =>
        bus.seat_layout?.some(row =>
          row.some(seat => seat && seat.status === SeatStatus.WomenOnly)
        )
      );
    }
    
    setFilteredBuses(newFilteredBuses);
  }, [activeFilters, buses]);

  // Effect to auto-search when date changes after the first search
  useEffect(() => {
    // Only run if a search has been performed and the date has actually changed.
    if (searchPerformed && prevDateRef.current !== date) {
        handleSearch();
    }

    // Update the ref to the current date for the next render cycle.
    prevDateRef.current = date;
  }, [date, searchPerformed, handleSearch]);


  return (
    <div>
      <div className="bg-gradient-to-b from-brand-dark to-brand-primary pt-12 pb-28">
          <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold">Your Journey Begins Here</h1>
              <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">Book bus tickets online with ease and comfort, and travel with our trusted partners.</p>
          </div>
      </div>
      
      <div className="container mx-auto px-4">
          <SearchBar 
              onSearch={() => handleSearch()}
              from={from}
              to={to}
              date={date}
              setFrom={setFrom}
              setTo={setTo}
              setDate={setDate}
          />
          
          <div ref={resultsRef} className="mt-12 mb-12 scroll-mt-24">
              {!searchPerformed ? (
                  <div className="space-y-12">
                      <PriceCalendar />
                      <PopularRoutes onRouteSelect={handleRouteSelect} />
                      <OffersSection />
                      <WhyChooseUs />
                      <TestimonialsSection />
                  </div>
              ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      <div className="lg:col-span-1">
                          <FiltersPanel onFilterChange={setActiveFilters} />
                      </div>
                      <div className="lg:col-span-3">
                          <SearchResults 
                              buses={filteredBuses} 
                              isLoading={isLoading} 
                              onBusSelect={onBusSelect}
                              searchPerformed={searchPerformed}
                          />
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default SearchPage;
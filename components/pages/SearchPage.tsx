
import React, { useState, useEffect, useCallback } from 'react';
import { Bus } from '../../types';
import { searchBuses } from '../../services/mockApiService';
import { SearchBar } from '../search/SearchBar';
import { PriceCalendar } from '../search/PriceCalendar';
import { FiltersPanel } from '../search/FiltersPanel';
import { SearchResults } from '../search/SearchResults';

interface SearchPageProps {
  onBusSelect: (bus: Bus) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onBusSelect }) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = useCallback(async (from: string, to: string, date: string) => {
    setIsLoading(true);
    setSearchPerformed(true);
    const results = await searchBuses(from, to, date);
    setBuses(results);
    setFilteredBuses(results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredBuses(buses);
      return;
    }
    const newFilteredBuses = buses.filter(bus => 
      activeFilters.every(filter => bus.amenities.includes(filter))
    );
    setFilteredBuses(newFilteredBuses);
  }, [activeFilters, buses]);

  return (
    <div className="space-y-8">
      <SearchBar onSearch={handleSearch} />
      <PriceCalendar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FiltersPanel onFilterChange={setActiveFilters} />
        </div>
        <div className="md:col-span-3">
          <SearchResults 
            buses={filteredBuses} 
            isLoading={isLoading} 
            onBusSelect={onBusSelect}
            searchPerformed={searchPerformed}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

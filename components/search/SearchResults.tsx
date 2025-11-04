import React, { useState, useMemo } from 'react';
import { Bus } from '../../types';
import { BusCard } from '../common/BusCard';

interface SearchResultsProps {
  buses: Bus[];
  isLoading: boolean;
  onBusSelect: (bus: Bus) => void;
  searchPerformed: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ buses, isLoading, onBusSelect, searchPerformed }) => {
  const [sortBy, setSortBy] = useState<'departure' | 'duration' | 'fare'>('departure');

  const sortedBuses = useMemo(() => {
    if (!buses) return [];
    const sorted = [...buses];
    switch (sortBy) {
      case 'fare':
        return sorted.sort((a, b) => a.fare - b.fare);
      case 'departure':
        return sorted.sort((a, b) => new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime());
      case 'duration':
        const parseDuration = (duration: string) => {
          const parts = duration.match(/(\d+)h\s*(\d+)?m?/);
          if (!parts) return 0;
          const hours = parseInt(parts[1], 10) || 0;
          const minutes = parseInt(parts[2], 10) || 0;
          return hours * 60 + minutes;
        }
        return sorted.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
      default:
        return sorted;
    }
  }, [buses, sortBy]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-full"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!searchPerformed) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <h3 className="mt-4 text-xl font-semibold text-gray-700">Find your perfect trip</h3>
        <p className="mt-1 text-gray-500">Enter your travel details above to start searching for buses.</p>
      </div>
    )
  }

  if (buses.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
        <h3 className="mt-4 text-xl font-semibold text-gray-700">No buses found</h3>
        <p className="mt-1 text-gray-500">Try adjusting your filters or search for a different date.</p>
      </div>
    );
  }

  const SortButton = ({ type, children }: { type: 'fare' | 'departure' | 'duration', children: React.ReactNode }) => {
    const isActive = sortBy === type;
    return (
      <button
        onClick={() => setSortBy(type)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-brand-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
      >
        {children}
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm font-semibold text-gray-700">
          Showing <span className="text-brand-primary">{sortedBuses.length}</span> buses
        </p>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <span className="text-sm text-gray-600 hidden sm:block ml-2">Sort by:</span>
          {/* FIX: Added children to SortButton components to provide their labels. */}
          {/* FIX: Added children to SortButton components to provide their labels. */}
          <SortButton type="departure">Departure</SortButton>
          {/* FIX: Added children to SortButton components to provide their labels. */}
          <SortButton type="duration">Duration</SortButton>
          {/* FIX: Added children to SortButton components to provide their labels. */}
          <SortButton type="fare">Price</SortButton>
        </div>
      </div>
      {sortedBuses.map(bus => (
        <BusCard key={bus.bus_id} bus={bus} onSelect={() => onBusSelect(bus)} />
      ))}
    </div>
  );
};
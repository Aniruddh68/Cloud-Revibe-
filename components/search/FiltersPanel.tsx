
import React, { useState, useEffect } from 'react';

interface FiltersPanelProps {
  onFilterChange: (filters: string[]) => void;
}

const specialFilters = ["Women Only Seats"];
const allAmenities = ["AC", "Non-AC", "Wi-Fi", "Charging", "Water", "Blanket", "Screen", "Restroom"];

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(item => item !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const renderFilterCheckbox = (filter: string) => (
    <label key={filter} className="flex items-center space-x-3 cursor-pointer group">
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={selectedFilters.includes(filter)}
        onChange={() => handleCheckboxChange(filter)}
      />
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${selectedFilters.includes(filter) ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 group-hover:border-brand-primary'}`}>
        {selectedFilters.includes(filter) &&
          <svg className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        }
      </div>
      <span className={`text-gray-700 transition-colors ${selectedFilters.includes(filter) ? 'font-semibold text-brand-primary' : 'group-hover:text-brand-primary'}`}>{filter}</span>
    </label>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-3">Filter By</h3>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Seat Type</h4>
        <div className="space-y-4">
            {specialFilters.map(renderFilterCheckbox)}
        </div>
      </div>
      
      <div className="border-t my-4 -mx-6"></div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Amenities</h4>
        <div className="space-y-4">
            {allAmenities.map(renderFilterCheckbox)}
        </div>
      </div>
    </div>
  );
};

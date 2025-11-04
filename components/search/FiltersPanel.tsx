
import React, { useState, useEffect } from 'react';

interface FiltersPanelProps {
  onFilterChange: (filters: string[]) => void;
}

const allAmenities = ["AC", "Non-AC", "Wi-Fi", "Charging", "Water", "Blanket", "Screen", "Restroom"];

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (amenity: string) => {
    setSelectedFilters(prev => 
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 sticky top-24">
      <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Filter by Amenities</h3>
      <div className="space-y-3">
        {allAmenities.map(amenity => (
          <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
              checked={selectedFilters.includes(amenity)}
              onChange={() => handleCheckboxChange(amenity)}
            />
            <span className="text-slate-600">{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

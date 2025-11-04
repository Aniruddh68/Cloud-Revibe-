
import React, { useState, useEffect } from 'react';
import { getPriceCalendar } from '../../services/mockApiService';
import { PriceDay } from '../../types';

export const PriceCalendar: React.FC = () => {
  const [prices, setPrices] = useState<PriceDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      const data = await getPriceCalendar('Bhopal', 'Delhi');
      setPrices(data);
      setIsLoading(false);
    };
    fetchPrices();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Lowest Fares This Week</h3>
      {isLoading ? (
        <div className="text-center text-gray-500 py-4">Loading prices...</div>
      ) : (
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {prices.map((day, index) => (
            <div key={index} className="text-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-brand-light hover:border-brand-primary transition-all duration-200 cursor-pointer group">
              <div className="font-bold text-gray-800 group-hover:text-brand-primary">{day.date.split(' ')[0]}</div>
              <div className="text-xs text-gray-500">{day.date.split(' ')[1]}</div>
              <div className="text-sm text-green-700 font-semibold mt-1">₹{day.min_price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

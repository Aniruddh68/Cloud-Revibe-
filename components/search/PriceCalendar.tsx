
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
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Lowest Fares This Week</h3>
      {isLoading ? (
        <div className="text-center text-slate-500">Loading prices...</div>
      ) : (
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {prices.map((day, index) => (
            <div key={index} className="text-center p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-brand-light hover:border-brand-primary transition cursor-pointer">
              <div className="font-bold text-slate-800">{day.date}</div>
              <div className="text-sm text-green-700 font-semibold mt-1">₹{day.min_price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

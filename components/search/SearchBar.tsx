
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (from: string, to: string, date: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Pune');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from, to, date);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg -mt-20 relative z-10 border border-slate-200">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-10 gap-4 items-end">
        <div className="md:col-span-3">
          <label htmlFor="from" className="block text-sm font-medium text-slate-600 mb-1">From</label>
          <input type="text" id="from" value={from} onChange={e => setFrom(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" />
        </div>
        
        <div className="flex items-center justify-center md:col-span-1">
          <button type="button" onClick={swapLocations} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-600 mt-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </button>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="to" className="block text-sm font-medium text-slate-600 mb-1">To</label>
          <input type="text" id="to" value={to} onChange={e => setTo(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="date" className="block text-sm font-medium text-slate-600 mb-1">Date</label>
          <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};


import React from 'react';

interface SearchBarProps {
  onSearch: () => void;
  from: string;
  to: string;
  date: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setDate: (value: string) => void;
}

const InputField: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    type?: string;
    roundedClass?: string;
    min?: string;
}> = ({ id, label, value, onChange, icon, type = "text", roundedClass = "rounded-lg", min }) => (
    <div className="w-full">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                min={min}
                className={`w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-50 ${roundedClass} focus:ring-2 focus:ring-brand-primary focus:border-transparent focus:bg-white transition`}
            />
        </div>
    </div>
);


export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, from, to, date, setFrom, setTo, setDate }) => {
  
  const today = new Date().toISOString().split('T')[0];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl -mt-20 relative z-10 border border-gray-100">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center lg:items-end gap-4">
        
        <div className="w-full lg:flex-grow">
             <div className="flex flex-col sm:flex-row items-center">
                <InputField
                    id="from"
                    label="From"
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6.375A2.25 2.25 0 0018.75 7.5h-15A2.25 2.25 0 001.5 9.375v6.375A2.25 2.25 0 003.75 18z" /></svg>}
                    roundedClass="rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg"
                />

                <div className="w-full sm:w-auto flex items-center justify-center bg-gray-50 sm:bg-transparent border-x sm:border-x-0 border-b sm:border-b-0 border-gray-200 sm:border-0 h-full">
                     <button type="button" onClick={swapLocations} className="my-1 sm:my-0 sm:-mx-3 z-10 p-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-brand-primary hover:text-brand-primary text-gray-500 transition-all duration-300 transform hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 12l-4-4m4 4l4-4m6 8v-12m0 12l4-4m-4 4l-4-4" /></svg>
                    </button>
                </div>

                 <InputField
                    id="to"
                    label="To"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
                    roundedClass="rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg"
                />
            </div>
        </div>
        
        <div className="w-full lg:w-auto lg:max-w-xs">
             <InputField
                id="date"
                label="Date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h27" /></svg>}
                min={today}
            />
        </div>
        
        <div className="w-full lg:w-auto">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider opacity-0 lg:block hidden">Search</label>
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
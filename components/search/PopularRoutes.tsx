
import React, { useState, useEffect } from 'react';
import { getPopularRoutes } from '../../services/mockApiService';

interface PopularRoutesProps {
    onRouteSelect: (from: string, to: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onRouteSelect }) => {
    const [routes, setRoutes] = useState<{from: string, to: string}[]>([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const data = await getPopularRoutes();
            setRoutes(data);
        };
        fetchRoutes();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Routes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {routes.map((route, index) => (
                    <button 
                        key={index} 
                        onClick={() => onRouteSelect(route.from, route.to)}
                        className="text-left p-4 rounded-lg bg-gray-50 hover:bg-brand-light transition-all duration-200 cursor-pointer border border-gray-200 hover:border-brand-primary group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-bold text-gray-800">{route.from}</span>
                                <span className="text-gray-500 mx-2">to</span>
                                <span className="font-bold text-gray-800">{route.to}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-brand-primary transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

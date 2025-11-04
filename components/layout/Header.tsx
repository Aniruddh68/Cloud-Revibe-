import React, { useState, useEffect, useRef } from 'react';
import { User } from '../../types';

interface HeaderProps {
    onNavigate: (page: 'SEARCH' | 'MY_TRIPS' | 'ACCOUNT') => void;
    currentPage: string;
    user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const NavLink = ({ page, children }: { page: 'SEARCH' | 'MY_TRIPS' | 'ACCOUNT'; children: React.ReactNode }) => {
        const isActive = currentPage === page;
        return (
            <button
                onClick={() => { onNavigate(page); setIsMenuOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    isActive ? 'bg-brand-primary text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
            >
                {children}
            </button>
        );
    };
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('SEARCH')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.92 6.09C18.51 5.41 17.81 5 17 5H7c-.81 0-1.51.41-1.92 1.09L3 11v6c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-6l-2.08-4.91zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 9.5l1.5-3.5h9L17 9.5H5z"/>
                    </svg>
                    <h1 className="text-2xl font-bold text-brand-primary">Miles Travels</h1>
                </div>
                <nav className="flex items-center gap-4">
                     <button
                        onClick={() => onNavigate('SEARCH')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            currentPage === 'SEARCH' ? 'bg-brand-light text-brand-primary' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        Search Buses
                    </button>
                    {user && (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setIsMenuOpen(prev => !prev)} className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 p-2">
                                    <div className="px-4 py-2 border-b mb-2">
                                        <p className="font-semibold text-slate-800">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                    <NavLink page="MY_TRIPS">My Trips</NavLink>
                                    <NavLink page="ACCOUNT">My Account</NavLink>
                                    <button
                                        onClick={() => alert('Logged out!')}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};
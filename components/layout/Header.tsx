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

    const NavLink = ({ page, children, icon }: { page: 'SEARCH' | 'MY_TRIPS' | 'ACCOUNT'; children: React.ReactNode, icon: React.ReactNode }) => {
        return (
            <button
                onClick={() => { onNavigate(page); setIsMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-3 text-gray-700 hover:bg-gray-100"
            >
                {icon}
                <span>{children}</span>
            </button>
        );
    };
    
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
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200">
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
                        className={`hidden sm:block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === 'SEARCH' ? 'text-brand-primary font-semibold' : 'text-gray-600 hover:text-brand-primary'
                        }`}
                    >
                        Search Buses
                    </button>
                    {user && (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setIsMenuOpen(prev => !prev)} className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-100 p-2">
                                    <div className="px-3 py-2 border-b mb-2">
                                        <p className="font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    {/* FIX: Added children prop to NavLink components to provide the link text. */}
                                    <NavLink page="MY_TRIPS" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>My Trips</NavLink>
                                    <NavLink page="ACCOUNT" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>My Account</NavLink>
                                    <div className="border-t my-2"></div>
                                    <button
                                        onClick={() => alert('Logged out!')}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-3"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        <span>Logout</span>
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
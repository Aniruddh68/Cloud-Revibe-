
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700">
            <div className="container mx-auto px-4 py-10 text-center">
                <p className="text-base font-semibold">&copy; {new Date().getFullYear()} Miles Travels. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Your trusted partner in bus booking.</p>
            </div>
        </footer>
    );
};

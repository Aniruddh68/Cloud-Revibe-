
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8 text-center">
                <p>&copy; {new Date().getFullYear()} Miles Travels. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-1">Your trusted partner in bus booking.</p>
            </div>
        </footer>
    );
};

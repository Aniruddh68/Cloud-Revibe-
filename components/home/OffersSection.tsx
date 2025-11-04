import React, { useState, useEffect } from 'react';
import { getOffers } from '../../services/mockApiService';
import { Offer } from '../../types';

const OfferIcon: React.FC<{ icon: Offer['icon'] }> = ({ icon }) => {
    const icons = {
        discount: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 0v18" /></svg>,
        wallet: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 2h2" /></svg>,
        new_user: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    };
    return <div className="text-brand-primary">{icons[icon]}</div>;
};

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(offer.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-brand-light/50 border-2 border-dashed border-brand-primary/30 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex-shrink-0">
                <OfferIcon icon={offer.icon} />
            </div>
            <div className="flex-grow">
                <h4 className="font-bold text-lg text-brand-dark">{offer.title}</h4>
                <p className="text-gray-600 text-sm">{offer.description}</p>
            </div>
            <div className="flex-shrink-0">
                <button 
                    onClick={handleCopy}
                    className="bg-white border-2 border-brand-secondary text-brand-secondary font-bold text-sm px-4 py-2 rounded-lg hover:bg-brand-secondary hover:text-white transition-all duration-200 w-32"
                >
                    {copied ? 'Copied!' : offer.code}
                </button>
            </div>
        </div>
    );
};


export const OffersSection: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);

    useEffect(() => {
        const fetchOffers = async () => {
            const data = await getOffers();
            setOffers(data);
        };
        fetchOffers();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Exclusive Offers</h3>
            <div className="space-y-4">
                {offers.map(offer => <OfferCard key={offer.offer_id} offer={offer} />)}
            </div>
        </div>
    );
};
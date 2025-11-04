import React from 'react';

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({icon, title, description}) => (
    <div className="flex flex-col items-center text-center gap-4">
        <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center rounded-full bg-brand-light text-brand-primary">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-bold text-gray-800">{title}</h4>
            <p className="text-gray-500 mt-1">{description}</p>
        </div>
    </div>
);

export const WhyChooseUs: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why Choose Miles Travels?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                    title="Safety First"
                    description="We prioritize your safety with our top-rated buses and experienced drivers."
                />
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 2h2" /></svg>}
                    title="Best Prices"
                    description="Find the best deals and save money on your bus tickets with our competitive fares."
                />
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                    title="24/7 Support"
                    description="Our customer support team is available around the clock to assist you with any queries."
                />
            </div>
        </div>
    );
}
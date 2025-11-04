
import React, { useState } from 'react';
import { Bus, Seat } from '../../types';

interface CheckoutPageProps {
  bus: Bus;
  seats: Seat[];
  onConfirmBooking: () => void;
}

const PaymentOption: React.FC<{name: string, icon: React.ReactNode, active: boolean, onClick: () => void}> = ({name, icon, active, onClick}) => (
    <button type="button" onClick={onClick} className={`flex-1 p-4 flex flex-col items-center justify-center gap-2 border-b-4 transition-all ${active ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>
        {icon}
        <span className="text-sm font-semibold">{name}</span>
    </button>
)


const CheckoutPage: React.FC<CheckoutPageProps> = ({ bus, seats, onConfirmBooking }) => {
  const [activePayment, setActivePayment] = useState('card');
  const totalFare = seats.length * bus.fare;
  const taxes = totalFare * 0.05;
  const finalAmount = totalFare + taxes;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would involve payment gateway integration.
    // For now, we'll just simulate a successful payment.
    alert('Booking Confirmed! You will be redirected to My Trips.');
    onConfirmBooking();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Confirm Your Booking</h1>
      <form onSubmit={handlePayment}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
                  <div className="space-y-4">
                      <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                          <input required type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" placeholder="e.g. John Doe"/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                              <input required type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" placeholder="e.g. john.doe@example.com"/>
                          </div>
                          <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                              <input required type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" placeholder="e.g. 9876543210"/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold p-6">Payment Options</h2>
                  <div className="flex border-b border-gray-200">
                      <PaymentOption name="Credit/Debit Card" active={activePayment === 'card'} onClick={() => setActivePayment('card')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
                      <PaymentOption name="UPI" active={activePayment === 'upi'} onClick={() => setActivePayment('upi')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                      <PaymentOption name="Wallets" active={activePayment === 'wallet'} onClick={() => setActivePayment('wallet')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5h2m-2 2h2" /></svg>} />
                  </div>
                  <div className="p-6">
                      {activePayment === 'card' && (
                           <div className="space-y-4">
                              <div>
                                  <label className="block text-sm font-medium text-gray-600 mb-1">Card Number</label>
                                  <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" placeholder="XXXX XXXX XXXX XXXX" required/>
                              </div>
                               <div className="grid grid-cols-3 gap-4">
                                  <div className="col-span-2">
                                      <label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
                                      <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" placeholder="MM/YY" required/>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-600 mb-1">CVV</label>
                                      <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" placeholder="XXX" required/>
                                  </div>
                               </div>
                          </div>
                      )}
                       {activePayment === 'upi' && (
                          <div>
                               <label className="block text-sm font-medium text-gray-600 mb-1">UPI ID</label>
                               <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" placeholder="yourname@bank" required/>
                          </div>
                      )}
                      {activePayment === 'wallet' && (
                           <div className="text-center text-gray-500 py-8">Wallet options are coming soon.</div>
                      )}
                  </div>
              </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-3">Fare Breakdown</h2>
              <div className="space-y-3">
                  <p className="font-semibold">{bus.operator_details.name}</p>
                  <p className="text-sm text-gray-500">{bus.route_from} → {bus.route_to}</p>
                  <p className="text-sm text-gray-500">Seats: <span className="font-medium text-gray-700">{seats.map(s => s.id).join(', ')}</span></p>
              </div>
              <div className="border-t my-4"></div>
              <div className="space-y-2">
                  <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare:</span>
                      <span className="font-semibold text-gray-800">₹{totalFare.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees:</span>
                      <span className="font-semibold text-gray-800">₹{taxes.toFixed(2)}</span>
                  </div>
                  <div className="border-t my-3"></div>
                  <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-gray-800">Total Amount:</span>
                      <span className="font-extrabold text-2xl text-brand-primary">₹{finalAmount.toFixed(2)}</span>
                  </div>
              </div>
              <button type="submit" className="mt-6 w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                Pay ₹{finalAmount.toFixed(2)} Securely
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;

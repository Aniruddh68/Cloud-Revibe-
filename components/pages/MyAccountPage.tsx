
import React, { useState } from 'react';
import { User } from '../../types';

interface MyAccountPageProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
}

const MyAccountPage: React.FC<MyAccountPageProps> = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser({ ...user, ...formData });
        setIsEditing(false);
    }

    const handleCancel = () => {
        setFormData({ name: user.name, email: user.email, phone: user.phone });
        setIsEditing(false);
    }

    const InfoRow: React.FC<{label: string, value: string}> = ({label, value}) => (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-gray-700">{value}</p>
        </div>
    );
    
    const InputRow: React.FC<{label: string, id: 'name' | 'email' | 'phone', value: string, type?: string}> = ({label, id, value, type='text'}) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
            <input 
                type={type} 
                id={id} 
                value={value} 
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition" 
                required
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Panel: Profile */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                        <h2 className="text-xl font-bold">Profile Information</h2>
                        {!isEditing && (
                             <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-brand-primary hover:underline">Edit Profile</button>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <InputRow label="Full Name" id="name" value={formData.name} />
                            <InputRow label="Email Address" id="email" value={formData.email} type="email" />
                            <InputRow label="Phone Number" id="phone" value={formData.phone} type="tel" />
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition">Save Changes</button>
                                <button type="button" onClick={handleCancel} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                           <InfoRow label="Full Name" value={user.name} />
                           <InfoRow label="Email Address" value={user.email} />
                           <InfoRow label="Phone Number" value={user.phone} />
                        </div>
                    )}
                </div>

                {/* Right Panel: Wallet & Actions */}
                <div className="space-y-8">
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                            <h2 className="text-xl font-bold">My Wallet</h2>
                            <button className="text-sm font-semibold text-brand-primary hover:underline">Add Money</button>
                        </div>
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500">Current Balance</p>
                            <p className="text-4xl font-bold text-green-600">₹{user.wallet_balance.toFixed(2)}</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Transaction History</h3>
                            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                                {user.transaction_history && user.transaction_history.length > 0 ? (
                                    user.transaction_history.map(tx => (
                                        <div key={tx.transaction_id} className="flex items-center">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'CREDIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {tx.type === 'CREDIT' ? 
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>
                                                }
                                            </div>
                                            <div className="ml-4 flex-grow">
                                                <p className="font-semibold text-gray-800">{tx.description}</p>
                                                <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <div className={`font-bold text-right ${tx.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                                                {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-6">No transactions found.</p>
                                )}
                            </div>
                        </div>
                    </div>

                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                         <h2 className="text-xl font-bold mb-4">Account Actions</h2>
                         <button 
                            onClick={() => alert('This would log the user out.')}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                         >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccountPage;

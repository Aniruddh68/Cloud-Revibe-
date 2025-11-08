
import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../../services/mockApiService';
import { Testimonial } from '../../types';
import { StarRating } from '../common/StarRating';

export const TestimonialsSection: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const data = await getTestimonials();
            setTestimonials(data);
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">What Our Customers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div 
                        key={testimonial.testimonial_id} 
                        className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col h-full animate-fade-in-down opacity-0"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <StarRating rating={testimonial.rating} />
                        <p className="text-gray-600 my-4 flex-grow">"{testimonial.comment}"</p>
                        <p className="font-bold text-gray-800 text-right">- {testimonial.user_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
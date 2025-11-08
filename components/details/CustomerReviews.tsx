
import React, { useMemo } from 'react';
import { Review } from '../../types';
import { StarRating } from '../common/StarRating';

interface CustomerReviewsProps {
  reviews: Review[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length);
  }, [reviews]);

  if (!reviews || reviews.length === 0) {
    return <div className="text-center p-8 text-gray-500">No reviews yet for this bus.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center gap-4">
        <p className="text-xl font-bold">Average Rating:</p>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-extrabold text-brand-primary">{averageRating.toFixed(1)}</p>
          <StarRating rating={averageRating} />
          <p className="text-gray-500">({reviews.length} reviews)</p>
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.review_id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800">{review.user_name}</p>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-600 mt-2 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

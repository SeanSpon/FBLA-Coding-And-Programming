import { useState, useEffect } from 'react';
import type { Review } from '@/types/organization';

const REVIEWS_KEY = 'big-red-bus-reviews';

export function useReviews(organizationId?: string) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(REVIEWS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    return newReview;
  };

  const getReviewsForOrganization = (orgId: string) => {
    return reviews.filter(r => r.organizationId === orgId);
  };

  const getAverageRating = (orgId: string) => {
    const orgReviews = getReviewsForOrganization(orgId);
    if (orgReviews.length === 0) return 0;
    const sum = orgReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / orgReviews.length;
  };

  // If organizationId is provided, filter reviews for that org
  const filteredReviews = organizationId 
    ? reviews.filter(r => r.organizationId === organizationId)
    : reviews;

  return { 
    reviews: filteredReviews, 
    allReviews: reviews,
    addReview, 
    getReviewsForOrganization,
    getAverageRating
  };
}

import React from 'react';
import { Metadata } from 'next';
import { getPublicReviews, getPublicHandwrittenReviews } from '@/lib/content';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'Traveler Reviews & Reflections | Explore With Sakar',
  description: 'Genuine traveler reviews and reflections from guests who journeyed with Sakar through living culture, quiet trails, and village homestays in Nepal.',
};

export default async function ReviewsPage() {
  const [reviews, handwrittenReviews] = await Promise.all([
    getPublicReviews(),
    getPublicHandwrittenReviews(),
  ]);

  return (
    <ReviewsClient
      initialReviews={reviews}
      initialHandwrittenReviews={handwrittenReviews}
    />
  );
}

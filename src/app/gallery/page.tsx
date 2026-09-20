import React from 'react';
import { Metadata } from 'next';
import { getPublicPhotos } from '@/lib/content';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Visual Journal & Photo Gallery | Explore With Sakar',
  description: 'An editorial visual portfolio capturing authentic Nepal: Himalayan vistas, living heritage courtyards, village homestays, and spiritual retreats.',
};

export default async function GalleryPage() {
  const photos = await getPublicPhotos();
  return <GalleryClient initialPhotos={photos} />;
}

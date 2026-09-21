import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { getPublicPhotos } from '@/lib/content';
import GalleryClient from './GalleryClient';

const FALLBACK_METADATA: Metadata = {
  title: 'Visual Journal & Photo Gallery | Explore With Sakar',
  description: 'An editorial visual portfolio capturing authentic Nepal: Himalayan vistas, living heritage courtyards, village homestays, and spiritual retreats.',
  alternates: { canonical: 'https://explorewithsakar.com/gallery' },
};

export async function generateMetadata(): Promise<Metadata> {
  return await buildPageMetadata('gallery', FALLBACK_METADATA);
}

export default async function GalleryPage() {
  const photos = await getPublicPhotos();
  return <GalleryClient initialPhotos={photos} />;
}

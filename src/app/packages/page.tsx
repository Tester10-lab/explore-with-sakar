import React from 'react';
import { Metadata } from 'next';
import { getLivePackages } from '@/lib/cms';
import PackagesClient from './PackagesClient';

export const metadata: Metadata = {
  title: 'Packages & Transparent Pricing | Explore With Sakar',
  description: 'Explore our signature curated travel packages in Nepal with transparent inclusions, accommodation standards, and bespoke custom pricing options.',
};

export default async function PackagesPage() {
  const packages = await getLivePackages(false);

  return <PackagesClient initialPackages={packages} />;
}

import React from 'react';
import { Metadata } from 'next';
import BeyondTheMapClient from './BeyondTheMapClient';

export const metadata: Metadata = {
  title: 'Go Beyond the Map | Authentic Exploration with Sakar',
  description:
    'A paginated editorial exploration through Kathmandu Durbar Square, Bhaktapur, Patan, Pokhara, and the living heritage of Nepal with Sakar.',
};

export default function BeyondTheMapPage() {
  return <BeyondTheMapClient />;
}

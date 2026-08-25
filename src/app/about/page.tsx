import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  Heart,
  Globe,
  Leaf,
} from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

export const metadata: Metadata = {
  title: 'About Sakar | Explore Nepal With Purpose',
  description: 'Sakar’s journey into tourism began not as a business, but from a desire to share the real Nepal with the world. Discover authentic Nepalese culture and local life.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-parchment-100 pb-20">
      {/* Hero Header */}
      <div className="py-16 sm:py-24 bg-parchment-200/90 border-b border-parchment-300">
        <div className="editorial-container max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meet Your Host</span>
          </div>
          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-himalaya-950 tracking-tight">
            About Sakar | Explore Nepal With Purpose
          </h1>
          <p className="text-base sm:text-lg text-himalaya-700 font-light font-display-serif italic max-w-2xl mx-auto">
            &ldquo;Explore Nepal. Connect with its people. Discover your own reason to be here.&rdquo;
          </p>
        </div>
      </div>

      <div className="editorial-container py-16 max-w-4xl mx-auto space-y-16">
        {/* Bio & Portrait */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 flex justify-center sticky top-24">
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-3xl overflow-hidden shadow-editorial bg-himalaya-900 border border-parchment-300">
              <Image
                src="/images/sakar/sakar-portrait.jpg"
                alt="Sakar portrait"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 text-base text-himalaya-800 font-light leading-relaxed">
            <p className="text-xl font-display-serif text-himalaya-950 leading-relaxed">
              Sakar’s journey into tourism began not as a business, but from a desire to share the real Nepal with the world.
            </p>

            <p>
              With a background in education, community development, and NGO work, Sakar has spent years working with communities and initiatives focused on children, health, women’s empowerment, education, and social development. These experiences helped Sakar see Nepal beyond its famous mountains and monuments — through its people, traditions, struggles, and stories.
            </p>

            <p>
              Tourism became a natural extension of that journey.
            </p>

            <p>
              Sakar believes travel can be more than sightseeing. It can create connection, learning, cultural exchange, and meaningful contribution.
            </p>

            <p>
              From the dream of transforming a home into a welcoming Nepali homestay to creating authentic experiences for international travelers, Sakar’s journey has always been about bringing people closer to Nepal.
            </p>

            <div className="bg-sand border border-parchment-300 p-6 rounded-2xl space-y-4 my-8 shadow-subtle">
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Through Explore With Sakar, travelers can discover:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-xl leading-none">🇳🇵</span>
                  <span className="pt-0.5">Authentic Nepalese culture and local life</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl leading-none">🏔️</span>
                  <span className="pt-0.5">Himalayan adventures and trekking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl leading-none">🧘</span>
                  <span className="pt-0.5">Spiritual and wellness experiences</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl leading-none">🏛️</span>
                  <span className="pt-0.5">Heritage and religious journeys</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl leading-none">🤝</span>
                  <span className="pt-0.5">Community and responsible tourism</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl leading-none">🌱</span>
                  <span className="pt-0.5">Opportunities for meaningful contribution</span>
                </li>
              </ul>
            </div>

            <p className="font-semibold text-himalaya-950 text-lg">
              As a Nepal Travel Expert and Responsible Tour Director, Sakar connects travelers with the places, people, traditions, and stories that make Nepal truly special.
            </p>
            
            <p className="text-xl font-display-serif italic text-terracotta pt-4 border-t border-parchment-300">
              Explore Nepal. Connect with its people. Discover your own reason to be here.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <InquiryForm />
    </div>
  );
}

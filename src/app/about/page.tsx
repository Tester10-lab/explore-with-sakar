import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  Heart,
  Globe,
  Leaf,
  Check
} from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

export const metadata: Metadata = {
  title: 'About Sakar | Explore Nepal With Purpose',
  description: 'Sakar’s journey into tourism began not as a business, but from a desire to share the real Nepal with the world. Discover authentic Nepalese culture and local life.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand pb-0">
      
      {/* Cinematic Hero Header */}
      <header className="relative w-full h-[70vh] min-h-[500px] flex items-end pb-16 sm:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/explore-with-sakar/images/mountains/himalayan-peaks.jpg"
            alt="Himalayan peaks and Nepal landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-himalaya-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-transparent to-transparent" />
        </div>

        <div className="editorial-container relative z-10 w-full text-center space-y-6 text-white">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-light" />
            <span>Meet Your Host</span>
          </div>

          <h1 className="font-editorial-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
            About Sakar
          </h1>

          <p className="text-xl sm:text-3xl text-parchment-200 font-light font-display-serif italic max-w-2xl mx-auto drop-shadow-md">
            &ldquo;Explore Nepal. Connect with its people. Discover your own reason to be here.&rdquo;
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="py-20 sm:py-32 bg-sand">
        <div className="editorial-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: The Story */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 leading-tight">
                A Journey Rooted in Connection and Purpose
              </h2>
              
              <div className="prose prose-lg prose-himalaya max-w-none font-light leading-[1.9] text-himalaya-800">
                <p className="first-letter:font-editorial-serif first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-terracotta">
                  Sakar’s journey into tourism began not as a business, but from a profound desire to share the real Nepal with the world. Born and raised amidst the chaotic charm and spiritual depth of Kathmandu, the mountains and ancient alleys have always been home.
                </p>
                
                <p>
                  With a background in education, community development, and NGO work, Sakar has spent years working intimately with rural communities. Leading initiatives focused on children, health, women’s empowerment, education, and social development allowed Sakar to see Nepal beyond its famous mountains and monuments — through its people, traditions, struggles, and untold stories.
                </p>

                <blockquote className="my-12 p-8 sm:p-10 rounded-3xl bg-white border border-parchment-300 shadow-editorial text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta via-saffron to-terracotta" />
                   <p className="font-display-serif italic text-2xl sm:text-3xl text-himalaya-950 font-normal leading-snug">
                     "Tourism became a natural extension of that journey. I believe travel must be more than sightseeing. It should create genuine connection, learning, and meaningful contribution."
                   </p>
                </blockquote>

                <p>
                  From the early dream of transforming a family home into a welcoming Nepali homestay to curating authentic, life-changing experiences for international travelers, Sakar’s philosophy has remained unwavering: bringing people closer to the heart of Nepal.
                </p>
              </div>

              {/* What Travelers Discover */}
              <div className="mt-16 bg-white border border-parchment-300 p-8 sm:p-12 rounded-3xl shadow-editorial">
                <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 mb-8 flex items-center">
                  <Globe className="w-6 h-6 text-terracotta mr-3" />
                  What Travelers Discover
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Authentic Nepalese culture and local life",
                    "Himalayan adventures and quiet trekking trails",
                    "Spiritual and restorative wellness experiences",
                    "Heritage, architecture, and religious journeys",
                    "Community-led and responsible tourism",
                    "Opportunities for meaningful, direct contribution"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-parchment-100 border border-parchment-300 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-himalaya-800 font-light leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Portrait & Vitals */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32 space-y-10">
                
                {/* Polaroid Style Portrait */}
                <div className="relative bg-white p-4 pb-16 sm:p-6 sm:pb-20 rounded-lg shadow-editorial border border-parchment-300 transform rotate-1">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-himalaya-900 filter contrast-[1.05] sepia-[0.1]">
                    <Image
                      src="/explore-with-sakar/images/sakar/sakar-portrait.jpg"
                      alt="Sakar portrait"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-6 left-0 w-full text-center">
                    <p className="font-display-serif italic text-himalaya-900 text-xl">Sakar</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-himalaya-500 mt-1">Responsible Tour Director</p>
                  </div>
                  
                  {/* Decorative tape */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/20 rotate-[-2deg] shadow-sm"></div>
                </div>

                <div className="bg-himalaya-900 text-white p-8 sm:p-10 rounded-3xl shadow-editorial relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <h4 className="text-xs uppercase font-bold tracking-widest text-saffron-light mb-4 border-b border-white/20 pb-4">
                    The Promise
                  </h4>
                  <p className="font-light text-parchment-200 leading-relaxed">
                    As a Nepal Travel Expert and Responsible Tour Director, Sakar connects travelers with the places, people, traditions, and stories that make Nepal truly special. No mass tourism, no rushed itineraries. Just authentic exploration.
                  </p>
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-parchment-300">
        <InquiryForm />
      </div>
    </div>
  );
}

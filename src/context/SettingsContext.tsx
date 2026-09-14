'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebsiteSettings } from '@/types/cms';

const DEFAULT_SETTINGS: WebsiteSettings = {
  contact: {
    phoneNumber: '+977 984-0482692',
    phoneDisplay: '+977 984-0482692',
    whatsappNumber: '9779840482692',
    whatsappDefaultMessage: 'Namaste Sakar, I am interested in planning an authentic Nepal journey.',
    email: 'Explorewithsakar@gmail.com',
    address: 'Kathmandu, Nepal',
    addressDetails: 'Patan & Thamel Heritage Quarter',
    businessHours: 'Sunday – Saturday: 7:00 AM – 9:00 PM NPT',
  },
  social: {
    instagram: 'https://instagram.com/explorewithsakar',
    facebook: 'https://facebook.com/explorewithsakar',
    youtube: 'https://youtube.com/@explorewithsakar',
    tripadvisor: 'https://tripadvisor.com',
    twitter: 'https://twitter.com/explorewithsakar',
  },
  branding: {
    logoUrl: '/explore-with-sakar/images/logo.png',
    siteName: 'Explore With Sakar',
    tagline: 'Authentic Nepal Travel & Cultural Experiences',
  },
  hero: {
    badgeText: 'A Journey Beyond The Surface',
    headlinePart1: 'Discover Nepal Through',
    headlineHighlight1: 'Culture',
    headlinePart2: ', Spirituality &',
    headlineHighlight2: 'Meaningful',
    description: 'Welcome to Explore With Sakar — where travel becomes more than a journey. It is a heartfelt opportunity to experience the true soul of Nepal.',
    ctaText: 'Begin The Journey',
    ctaLink: '#experiences',
    cutoutImage: '/explore-with-sakar/images/sakar-nobg.png',
    backgroundSlideshowImages: [
      '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
      '/explore-with-sakar/images/homestays/village-meal.jpg',
      '/explore-with-sakar/images/trails/suspension-bridge.jpg',
      '/explore-with-sakar/images/mountains/alpine-valley.jpg',
    ],
  },
  announcement: {
    isActive: true,
    badgeText: 'AUTUMN & SPRING TRAVEL CONSULTATIONS OPEN',
    text: 'Sakar • Responsible Tour Director',
    authorTitle: 'Sakar • Tour Director',
    ctaText: 'WhatsApp Sakar Direct',
    ctaLink: 'https://wa.me/9779840482692?text=Namaste%20Sakar,%20I%20am%20interested%20in%20planning%20an%20authentic%20Nepal%20journey',
  },
  footer: {
    headline: "Let's craft your meaningful journey through Nepal.",
    subheadline: 'Connect directly with Sakar to discuss your travel dates, personal interests, and cultural curiosity.',
    brandDescription: 'Meaningful Nepal travel experiences beyond ordinary tourism. We curate intimate human connections, village homestays, living Buddhist & Hindu heritage, and responsible slow travel.',
    copyrightText: '© Explore With Sakar. Designed for the conscious traveler.',
  },
};

interface SettingsContextType {
  settings: WebsiteSettings;
  refreshSettings: () => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  refreshSettings: async () => {},
  isLoading: false,
});

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: WebsiteSettings;
}) {
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings || DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/public/content', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.warn('Failed to load fresh settings, using cached values', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        refreshSettings: fetchSettings,
        isLoading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: DEFAULT_SETTINGS,
      refreshSettings: async () => {},
      isLoading: false,
    };
  }
  return context;
}

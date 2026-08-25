import React from 'react';
import Hero from '@/components/home/Hero';
import ExperienceFinder from '@/components/home/ExperienceFinder';
import HomestayStory from '@/components/home/HomestayStory';
import CulturalStory from '@/components/home/CulturalStory';
import SpiritualWellness from '@/components/home/SpiritualWellness';
import DestinationGrid from '@/components/home/DestinationGrid';
import PhotoGallery from '@/components/gallery/PhotoGallery';
import HomeJournalSection from '@/components/home/HomeJournalSection';
import AboutSakarSection from '@/components/home/AboutSakarSection';
import ResponsibleTourism from '@/components/home/ResponsibleTourism';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InquiryForm from '@/components/booking/InquiryForm';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Find Your Nepal Experience (7 Interactive Personas) */}
      <ExperienceFinder />

      {/* 3. Homestay Story: Stay With Nepal. Not Just In Nepal. */}
      <HomestayStory />

      {/* 4. Living Culture, Sacred Traditions & Feasts */}
      <CulturalStory />

      {/* 5. Spiritual & Wellness Sanctuary (Monasteries & Singing Bowls) */}
      <SpiritualWellness />

      {/* 6. Curated Destinations & Sample Itineraries */}
      <DestinationGrid />

      {/* 7. Nepal Through The Lens: Editorial Photo Gallery & Fullscreen Lightbox */}
      <PhotoGallery />

      {/* 8. From Sakar's Journal (Storytelling Blog Feature) */}
      <HomeJournalSection />

      {/* 9. About Sakar: The Guide Behind The Journey */}
      <AboutSakarSection />

      {/* 10. Responsible Tourism: Leaving a Positive Footprint */}
      <ResponsibleTourism />

      {/* 11. Testimonials & Traveler Voices */}
      <TestimonialsSection />

      {/* 12. Bespoke Consultation & Journey Planning Form */}
      <InquiryForm />
    </div>
  );
}

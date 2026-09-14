import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLiveExperiences, getLiveExperienceBySlug } from '@/lib/cms';
import { MapPin, Clock, Users, Sun, ArrowLeft, Check, Sparkles } from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const experience = getLiveExperienceBySlug(params.slug);
  
  if (!experience) {
    return { title: 'Experience Not Found | Explore With Sakar' };
  }
  
  return {
    title: `${experience.title} | Explore With Sakar`,
    description: experience.shortDescription,
  };
}

export function generateStaticParams() {
  const experiences = getLiveExperiences(false);
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export default function ExperienceDetailPage({ params }: Props) {
  const experience = getLiveExperienceBySlug(params.slug);

  if (!experience) {
    notFound();
  }

  const highlights = experience.highlights || (experience as any).culturalHighlights || [];
  const days = experience.days || (experience as any).itineraryOutline || [];
  const gallery = experience.gallery || (experience as any).galleryImages || [];
  const fullDesc = Array.isArray(experience.fullDescription)
    ? experience.fullDescription
    : [experience.fullDescription || experience.shortDescription];

  return (
    <div className="min-h-screen bg-sand">
      {/* Editorial Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Title & Meta */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-24 bg-parchment-200">
          <div className="mb-8">
            <Link href="/experiences" className="inline-flex items-center text-xs uppercase font-bold tracking-widest text-himalaya-600 hover:text-terracotta transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" /> All Experiences
            </Link>
          </div>
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-himalaya-950 text-white text-[10px] font-bold uppercase tracking-widest w-max mb-6">
            {experience.categoryLabel}
          </div>
          
          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-himalaya-950 tracking-tight leading-tight mb-6">
            {experience.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-himalaya-700 font-display-serif italic leading-relaxed mb-10 border-l-2 border-terracotta pl-6">
            {(experience as any).subtitle || experience.shortDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-parchment-300">
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-himalaya-500 mb-1">Duration</span>
              <span className="flex items-center text-sm font-semibold text-himalaya-900"><Clock className="w-3.5 h-3.5 mr-1.5 text-terracotta" /> {experience.duration}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-himalaya-500 mb-1">Location</span>
              <span className="flex items-center text-sm font-semibold text-himalaya-900"><MapPin className="w-3.5 h-3.5 mr-1.5 text-terracotta" /> {experience.location.split(',')[0]}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-himalaya-500 mb-1">Group</span>
              <span className="flex items-center text-sm font-semibold text-himalaya-900"><Users className="w-3.5 h-3.5 mr-1.5 text-terracotta" /> {experience.groupSize.split('/')[1]?.trim() || experience.groupSize}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-himalaya-500 mb-1">Season</span>
              <span className="flex items-center text-sm font-semibold text-himalaya-900"><Sun className="w-3.5 h-3.5 mr-1.5 text-terracotta" /> {experience.season.split('(')[0].trim()}</span>
            </div>
          </div>
        </div>
        
        {/* Right: Hero Image */}
        <div className="order-1 lg:order-2 relative w-full min-h-[50vh] lg:min-h-full">
          <Image
            src={experience.heroImage.src}
            alt={experience.heroImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-himalaya-950/20"></div>
          {experience.heroImage.caption && (
             <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md text-xs font-display-serif italic text-himalaya-900 max-w-sm rounded-lg shadow-subtle">
               {experience.heroImage.caption}
             </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="editorial-container py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-7 space-y-16">
            {/* Philosophy / Overview */}
            <section className="prose prose-lg prose-himalaya max-w-none font-light leading-relaxed">
              {fullDesc.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </section>

            {/* Cultural Highlights */}
            {highlights.length > 0 && (
              <section className="bg-white border border-parchment-300 rounded-3xl p-8 sm:p-10 shadow-editorial">
                <div className="flex items-center mb-8">
                  <Sparkles className="w-5 h-5 text-terracotta mr-3" />
                  <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950">
                    Signature Highlights
                  </h3>
                </div>
                <ul className="space-y-5">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-parchment-200 text-terracotta flex items-center justify-center shrink-0 mt-0.5 border border-parchment-300">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-himalaya-800 font-light leading-relaxed text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary Outline */}
            {days.length > 0 && (
              <section>
                <h3 className="font-editorial-serif text-3xl font-bold text-himalaya-950 mb-10">
                  A Glimpse of the Journey
                </h3>
                <div className="space-y-6">
                  {days.map((day, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-parchment-100 rounded-2xl border border-parchment-300">
                      <div className="sm:w-1/4 shrink-0">
                        <span className="inline-block px-3 py-1 bg-terracotta text-white text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                          {(day as any).day || `Day ${day.dayNumber || idx + 1}`}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-editorial-serif text-xl font-bold text-himalaya-950 mb-3">
                          {day.title}
                        </h4>
                        <p className="text-himalaya-700 font-light text-sm sm:text-base leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-display-serif italic text-himalaya-600 mt-6 text-center">
                  * Note: This is a sample outline. All itineraries are fully customizable.
                </p>
              </section>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-10">
              
              {/* Sakar's Note */}
              {experience.sakarNote && (
                <div className="relative p-8 sm:p-10 bg-himalaya-900 rounded-3xl text-white shadow-editorial overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <h4 className="text-xs uppercase font-bold tracking-widest text-saffron-light mb-6 border-b border-white/20 pb-4 inline-block">
                    Sakar's Note
                  </h4>
                  <p className="font-display-serif italic text-lg sm:text-xl text-parchment-100 leading-relaxed relative z-10">
                    "{experience.sakarNote}"
                  </p>
                </div>
              )}

              {/* Booking Prompt */}
              <div className="p-8 sm:p-10 bg-white border border-parchment-300 rounded-3xl text-center shadow-subtle">
                <h4 className="font-editorial-serif text-2xl font-bold text-himalaya-950 mb-3">
                  Interested in this Journey?
                </h4>
                <p className="text-sm text-himalaya-600 font-light mb-8 max-w-xs mx-auto">
                  Let’s adapt this framework to your exact travel dates, pace, and accommodation preferences.
                </p>
                <Link 
                  href="#booking"
                  className="block w-full py-4 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-bold tracking-wide transition-colors shadow-warm"
                >
                  Start Planning
                </Link>
              </div>
              
              {/* Impact */}
              {experience.impactFootprint && (
                <div className="p-6 bg-parchment-200/50 rounded-2xl border border-parchment-300">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-himalaya-900 mb-2">
                    Responsible Footprint
                  </h4>
                  <p className="text-xs text-himalaya-700 font-light leading-relaxed">
                    {experience.impactFootprint}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Gallery Section */}
      {gallery.length > 0 && (
        <div className="border-t border-parchment-300 bg-white py-20 sm:py-32">
          <div className="editorial-container">
             <div className="text-center mb-12">
               <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 mb-4">
                 Visual Impressions
               </h2>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
               {gallery.map((img, idx) => (
                 <div key={idx} className={`relative rounded-2xl overflow-hidden aspect-[4/5] ${idx === 1 ? 'sm:-translate-y-6' : ''}`}>
                   <Image
                      src={img.src}
                      alt={img.alt || 'Experience impression'}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-himalaya-950/20"></div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      <InquiryForm />
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { Sparkles, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

export const metadata: Metadata = {
  title: 'Contact & Itinerary Consultation — Explore With Sakar',
  description:
    'Start planning your personalized Nepal cultural, spiritual, and adventure journey directly with local host Sakar.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-parchment-100 pb-20">
      <header className="py-24 sm:py-32 bg-himalaya-950 border-b border-himalaya-900 relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-20 film-grain pointer-events-none" />
        
        <div className="editorial-container max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-parchment-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-light" />
            <span>Direct Host Communication</span>
          </div>
          
          <h1 className="font-editorial-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            Begin Your Journey
          </h1>
          
          <p className="text-lg sm:text-xl text-parchment-200 font-light font-display-serif italic max-w-2xl mx-auto leading-relaxed pt-2">
            &ldquo;Every meaningful journey begins with a simple conversation. Reach out directly to discuss dates, routes, and authentic cultural experiences.&rdquo;
          </p>
        </div>
      </header>

      {/* Quick Direct Contacts */}
      <div className="editorial-container max-w-4xl mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-sand border border-parchment-300 text-center space-y-2">
            <Phone className="w-6 h-6 text-emerald-600 mx-auto" />
            <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
              WhatsApp Direct
            </h3>
            <p className="text-xs text-himalaya-600 font-light">+977 984-0482692</p>
            <a
              href="https://wa.me/9779840482692"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-terracotta hover:underline pt-1"
            >
              Open WhatsApp Chat →
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-sand border border-parchment-300 text-center space-y-2">
            <Mail className="w-6 h-6 text-terracotta mx-auto" />
            <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
              Email Sakar
            </h3>
            <p className="text-xs text-himalaya-600 font-light">Explorewithsakar@gmail.com</p>
            <a
              href="mailto:Explorewithsakar@gmail.com"
              className="inline-block text-xs font-bold text-terracotta hover:underline pt-1"
            >
              Send Email →
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-sand border border-parchment-300 text-center space-y-2">
            <MapPin className="w-6 h-6 text-saffron-dark mx-auto" />
            <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
              Kathmandu Base
            </h3>
            <p className="text-xs text-himalaya-600 font-light">
              Patan & Thamel Heritage Quarter
            </p>
            <span className="inline-block text-xs text-himalaya-500 pt-1">
              Kathmandu, Nepal
            </span>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <InquiryForm />
    </div>
  );
}

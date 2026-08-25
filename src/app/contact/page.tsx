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
      {/* Header */}
      <div className="py-16 sm:py-24 bg-parchment-200/90 border-b border-parchment-300">
        <div className="editorial-container max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Host Communication</span>
          </div>
          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-himalaya-950 tracking-tight">
            Contact & Consultation
          </h1>
          <p className="text-base sm:text-lg text-himalaya-700 font-light font-display-serif italic">
            &ldquo;Reach out directly to Sakar to discuss dates, custom routes, and authentic cultural experiences.&rdquo;
          </p>
        </div>
      </div>

      {/* Quick Direct Contacts */}
      <div className="editorial-container max-w-4xl mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-sand border border-parchment-300 text-center space-y-2">
            <Phone className="w-6 h-6 text-emerald-600 mx-auto" />
            <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
              WhatsApp Direct
            </h3>
            <p className="text-xs text-himalaya-600 font-light">+977 980-000-0000</p>
            <a
              href="https://wa.me/9779800000000"
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
            <p className="text-xs text-himalaya-600 font-light">namaste@explorewithsakar.com</p>
            <a
              href="mailto:namaste@explorewithsakar.com"
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

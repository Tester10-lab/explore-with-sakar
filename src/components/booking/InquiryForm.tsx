'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Send,
  Calendar,
  Users,
  Compass,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { BookingInquiry } from '@/types';
import { useSettings } from '@/context/SettingsContext';

const INSPIRATION_OPTIONS = [
  { label: 'Adventure & Exploration', icon: '🏔️' },
  { label: 'Spiritual Growth & Inner Peace', icon: '🧘' },
  { label: 'Culture & Heritage Discovery', icon: '🏛️' },
  { label: 'Meaningful Connections & Community Experiences', icon: '🤝' },
  { label: 'Making a Positive Contribution', icon: '🌱' },
  { label: 'Nature, Photography & Storytelling', icon: '📸' },
  { label: 'Wellness, Healing & Transformation', icon: '🍃' },
  { label: 'A Personal Dream or quest of search', icon: '✨' },
];

const DURATION_OPTIONS = [
  '3 - 5 Days (Short Break)',
  '6 - 9 Days (Classic Exploration)',
  '10 - 14 Days (Deep Immersion)',
  '15+ Days (Grand Circuit)',
  'Flexible / Still Deciding',
];

const ACCOMMODATION_OPTIONS = [
  'Authentic Village Homestays',
  'Boutique Heritage Hotels',
  'Comfortable Trail Lodges',
  'Curated Mix of Homestays & Boutique Hotels',
  'Luxury Mountain Resorts',
];

export interface EventOption {
  id: string;
  title: string;
  date: string;
}

interface InquiryFormProps {
  defaultPackage?: string;
  defaultExperience?: string;
  availableEvents?: EventOption[];
}

function InquiryFormInner({ defaultPackage, defaultExperience, availableEvents }: InquiryFormProps = {}) {
  const { settings } = useSettings();
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');

  const [events, setEvents] = useState<EventOption[]>(availableEvents || []);
  const [formData, setFormData] = useState<BookingInquiry>({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    travelDates: '',
    approximateDuration: DURATION_OPTIONS[1],
    travelersCount: '2 Travelers',
    travelStyle: defaultPackage ? `Package: ${defaultPackage}` : (defaultExperience ? `Experience: ${defaultExperience}` : 'Slow & Meaningful Cultural Immersion'),
    preferredInterests: [
      'Culture & Heritage Discovery',
      'Meaningful Connections & Community Experiences',
    ],
    homestayInterest: 'Yes, absolutely love homestays',
    message: defaultPackage ? `Hello Sakar, I am interested in inquiring about the "${defaultPackage}" package.` : (defaultExperience ? `Hello Sakar, I am interested in inquiring about "${defaultExperience}".` : ''),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (availableEvents && availableEvents.length > 0) {
      setEvents(availableEvents);
    }
  }, [availableEvents]);

  useEffect(() => {
    if (eventParam && events.length > 0) {
      const matched = events.find(
        (e) => e.id.toLowerCase() === eventParam.toLowerCase()
      );
      if (matched) {
        setFormData((prev) => ({
          ...prev,
          interestedEvent: { id: matched.id, title: matched.title },
          message:
            !prev.message ||
            prev.message.startsWith('Hello Sakar, I am interested in planning my journey around')
              ? `Hello Sakar, I am interested in planning my journey around the "${matched.title}" event (${matched.date}).`
              : prev.message,
        }));
      }
    }
  }, [eventParam, events]);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.preferredInterests.includes(interest);
      if (exists) {
        return {
          ...prev,
          preferredInterests: prev.preferredInterests.filter((i) => i !== interest),
        };
      } else {
        return {
          ...prev,
          preferredInterests: [...prev.preferredInterests, interest],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/public/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Something went wrong submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = settings.contact?.whatsappNumber || '9779840482692';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Namaste Sakar, I just submitted a journey inquiry for ${formData.fullName || 'a Nepal trip'}.`
  )}`;

  return (
    <section id="booking" className="py-20 sm:py-28 bg-parchment-200/90 border-t border-parchment-300 relative">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Nepal Itinerary</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
              Start Planning With Sakar
            </h2>
            <p className="text-xs uppercase font-bold tracking-widest text-terracotta mt-1">
              Responsible Tour Director • Explore With Sakar
            </p>
            <p className="text-sm sm:text-base text-himalaya-800 font-normal mt-3 max-w-xl mx-auto leading-relaxed">
              Share your travel dreams, preferred dates, and curiosities. Sakar personally reviews each inquiry to curate a meaningful, slow-paced journey tailored to your rhythm.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl bg-sand border border-parchment-300 p-6 sm:p-10 lg:p-12 shadow-editorial">
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Notice</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-subtle">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-emerald-800">
                    Dhanyabad! Thank You, {formData.fullName || 'Friend'}
                  </span>
                  <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                    Your Journey Inquiry Has Reached Sakar
                  </h3>
                  <p className="text-sm sm:text-base text-himalaya-800 font-normal max-w-lg mx-auto leading-relaxed">
                    Sakar (Responsible Tour Director) will review your inspirations and reach back within 24 hours with a thoughtful custom outline.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-warm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3.5 rounded-xl bg-parchment-200 hover:bg-parchment-300 text-himalaya-900 font-semibold text-sm transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Personal Details */}
                <div>
                  <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950 mb-4 pb-2 border-b border-parchment-300">
                    1. About You & Your Party
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. eleanor@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom / USA / Germany / Australia"
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        WhatsApp / Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="e.g. +44 7123 456789"
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Travel Preferences */}
                <div>
                  <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950 mb-4 pb-2 border-b border-parchment-300">
                    2. Journey Timing & Duration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        Approximate Dates / Month
                      </label>
                      <input
                        type="text"
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        placeholder="e.g. October 2026 or Spring 2027"
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        Estimated Duration
                      </label>
                      <select
                        value={formData.approximateDuration}
                        onChange={(e) =>
                          setFormData({ ...formData, approximateDuration: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950"
                      >
                        {DURATION_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                        Number of Travelers
                      </label>
                      <input
                        type="text"
                        value={formData.travelersCount}
                        onChange={(e) =>
                          setFormData({ ...formData, travelersCount: e.target.value })
                        }
                        placeholder="e.g. 2 adults / Solo / Family of 4"
                        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                      />
                    </div>
                  </div>

                  {/* Sacred Festival or Event Selection */}
                  <div className="mt-4 pt-3 border-t border-parchment-200">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                      <span>Planning Around a Sacred Festival or Event? (Optional)</span>
                    </label>
                    <select
                      value={formData.interestedEvent?.id || ''}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) {
                          setFormData((prev) => ({ ...prev, interestedEvent: undefined }));
                        } else {
                          const selected = events.find((evt) => evt.id === selectedId);
                          if (selected) {
                            setFormData((prev) => ({
                              ...prev,
                              interestedEvent: { id: selected.id, title: selected.title },
                              message:
                                !prev.message ||
                                prev.message.startsWith('Hello Sakar, I am interested in planning my journey around')
                                  ? `Hello Sakar, I am interested in planning my journey around the "${selected.title}" event (${selected.date}).`
                                  : prev.message,
                            }));
                          }
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950"
                    >
                      <option value="">No specific event / General journey</option>
                      {events.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.title} ({evt.date})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 3: What Inspires You to Come to Nepal? */}
                <div>
                  <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950 mb-1.5 pb-2 border-b border-parchment-300">
                    3. What Inspires You to Come to Nepal?
                  </h4>
                  <p className="text-xs text-himalaya-600 mb-3">
                    Select all that resonate with what you are seeking:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INSPIRATION_OPTIONS.map((item) => {
                      const isSelected = formData.preferredInterests.includes(item.label);
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => toggleInterest(item.label)}
                          className={`p-3.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center space-x-2.5 ${
                            isSelected
                              ? 'bg-terracotta text-white shadow-warm font-bold ring-2 ring-terracotta ring-offset-1'
                              : 'bg-parchment-50 hover:bg-white text-himalaya-900 border border-parchment-300'
                          }`}
                        >
                          <span className="text-lg shrink-0">{item.icon}</span>
                          <span className="leading-snug">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Accommodation Preference & Message */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                      Accommodation Style Preference
                    </label>
                    <select
                      value={formData.homestayInterest}
                      onChange={(e) =>
                        setFormData({ ...formData, homestayInterest: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950"
                    >
                      {ACCOMMODATION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-700 mb-1.5">
                      Special Requests, Fitness Level, or Specific Questions for Sakar
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell Sakar anything specific you hope to experience, dietary preferences, or questions about Nepal..."
                      className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm sm:text-base shadow-warm hover:shadow-editorial transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting with Sakar...</span>
                      </span>
                    ) : (
                      <>
                        <span>Start Planning My Journey</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-himalaya-700 mt-2 font-medium">
                    Direct personal consultation with Sakar (Responsible Tour Director). No fake booking fees.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


export default function InquiryForm(props: InquiryFormProps) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-himalaya-500">
          Loading inquiry form...
        </div>
      }
    >
      <InquiryFormInner {...props} />
    </Suspense>
  );
}

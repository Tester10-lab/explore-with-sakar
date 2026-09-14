'use client';

import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '@/data/homestays';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ExtendedTestimonial } from '@/types/cms';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<ExtendedTestimonial[]>(
    TESTIMONIALS.map((t, i) => ({
      ...t,
      rating: 5,
      status: 'approved',
      isVisible: true,
      order: i,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );

  useEffect(() => {
    async function loadLiveReviews() {
      try {
        const res = await fetch('/api/public/content');
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (err) {
        // Fallback already in state
      }
    }
    loadLiveReviews();
  }, []);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white relative">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-terracotta mb-4 block">
              Traveler Experiences
            </span>
            <h2 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1] mb-6">
              Voices From <span className="italic text-himalaya-700">Fellow Travelers</span>
            </h2>
            <p className="text-himalaya-700 text-sm font-light max-w-lg mx-auto">
              Memories of quiet mornings, heartfelt homestay laughter, and transformational journeys shared with Sakar.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {reviews.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col space-y-8"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center space-x-1 text-terracotta">
                  {[...Array(t.rating || 5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <h4 className="font-editorial-serif text-2xl font-light text-himalaya-950 leading-snug">
                  &ldquo;{t.highlight}&rdquo;
                </h4>

                <p className="text-sm text-himalaya-700 font-light leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-himalaya-200">
                <h5 className="font-bold text-sm text-himalaya-950 uppercase tracking-widest mb-1">
                  {t.author}
                </h5>
                <p className="text-xs text-himalaya-600 font-light">
                  {t.country} {t.countryFlag} • {t.journey}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResponsibleTourism() {
  return (
    <section id="responsible" className="py-24 sm:py-32 bg-himalaya-900 film-grain text-white relative">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-moss-light mb-4 block">
              Ethical & Community-Based Travel
            </span>
            <h2 className="font-editorial-serif text-editorial-title font-light tracking-tight leading-[1.1] mb-6">
              Travel Should Leave a <br />
              <span className="italic font-display-serif text-parchment-300">
                Positive Footprint.
              </span>
            </h2>
            <p className="text-parchment-200 text-sm font-light max-w-xl">
              We believe that true travel is not extractive. Every journey with Sakar directly enriches the village households, traditional artisans, and pristine mountain environments that welcome us.
            </p>
          </motion.div>
        </div>

        {/* 4 Core Pillars of Responsibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4 border-t border-white/20 pt-6"
          >
            <h3 className="font-editorial-serif text-xl font-light text-white">
              100% Direct Village Economy
            </h3>
            <p className="text-sm text-parchment-300 font-light leading-relaxed">
              Homestay payments, porter fees, and food supplies are paid directly to local families without middleman cuts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4 border-t border-white/20 pt-6"
          >
            <h3 className="font-editorial-serif text-xl font-light text-white">
              Preserving Living Crafts
            </h3>
            <p className="text-sm text-parchment-300 font-light leading-relaxed">
              We support multi-generational Newari woodcarvers, bronze casters, and thangka painters through direct patronage.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4 border-t border-white/20 pt-6"
          >
            <h3 className="font-editorial-serif text-xl font-light text-white">
              Fair Wages & Safe Guiding
            </h3>
            <p className="text-sm text-parchment-300 font-light leading-relaxed">
              Our mountain crew, assistant guides, and porters receive ethical pay, full mountain insurance, and proper gear.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4 border-t border-white/20 pt-6"
          >
            <h3 className="font-editorial-serif text-xl font-light text-white">
              Leave No Trace Ethics
            </h3>
            <p className="text-sm text-parchment-300 font-light leading-relaxed">
              We eliminate single-use plastics on trail, encourage filtered water, and pack out all waste from high alpine routes.
            </p>
          </motion.div>
        </div>

        {/* Highlight Quote Block */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="border border-white/20 p-12 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <h4 className="font-editorial-serif text-2xl font-light text-white mb-4 leading-relaxed">
              &ldquo;When a foreign guest walks into our village, we do not want them to leave footprints of waste; we want them to leave warmth and take home friendship.&rdquo;
            </h4>
            <p className="text-sm text-parchment-400 font-light uppercase tracking-widest">
              — Aama Pema, Village Host Elder
            </p>
          </div>

          <Link
            href="/experiences/village-homestay-community-immersion"
            className="inline-flex items-center justify-center px-0 py-2 border-b border-white/30 text-xs tracking-widest uppercase font-medium text-white hover:text-moss-light hover:border-moss-light transition-all shrink-0"
          >
            <span>Learn About Community Impact</span>
            <ArrowRight className="w-4 h-4 ml-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Leaf, Users, Shield, HeartHandshake, ArrowRight } from 'lucide-react';

export default function ResponsibleTourism() {
  return (
    <section id="responsible" className="py-20 sm:py-28 bg-sand/60 border-t border-parchment-300 relative">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-moss/10 text-moss-dark text-xs font-semibold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-moss" />
            <span>Ethical & Community-Based Travel</span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
            Travel Should Leave a <br />
            <span className="italic font-display-serif font-normal text-moss-dark">
              Positive Footprint
            </span>
          </h2>
          <p className="text-sm sm:text-base text-himalaya-700 font-light mt-3 leading-relaxed">
            We believe that true travel is not extractive. Every journey with Sakar directly enriches the village households, traditional artisans, and pristine mountain environments that welcome us.
          </p>
        </div>

        {/* 4 Core Pillars of Responsibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-parchment-50 border border-parchment-300 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-moss/15 text-moss-dark flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
                100% Direct Village Economy
              </h3>
              <p className="text-xs text-himalaya-700 font-light mt-1 leading-relaxed">
                Homestay payments, porter fees, and food supplies are paid directly to local families without middleman cuts.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-parchment-50 border border-parchment-300 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
                Preserving Living Crafts
              </h3>
              <p className="text-xs text-himalaya-700 font-light mt-1 leading-relaxed">
                We support multi-generational Newari woodcarvers, bronze casters, and thangka painters through direct patronage.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-parchment-50 border border-parchment-300 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-saffron/15 text-saffron-dark flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
                Fair Wages & Safe Guiding
              </h3>
              <p className="text-xs text-himalaya-700 font-light mt-1 leading-relaxed">
                Our mountain crew, assistant guides, and porters receive ethical pay, full mountain insurance, and proper gear.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-parchment-50 border border-parchment-300 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/15 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-base font-bold text-himalaya-950">
                Leave No Trace Ethics
              </h3>
              <p className="text-xs text-himalaya-700 font-light mt-1 leading-relaxed">
                We eliminate single-use plastics on trail, encourage filtered water, and pack out all waste from high alpine routes.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Quote Block */}
        <div className="p-8 rounded-2xl bg-parchment-50 border-l-4 border-moss flex flex-col sm:flex-row items-center justify-between gap-6 shadow-subtle">
          <div className="max-w-xl">
            <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
              &ldquo;When a foreign guest walks into our village, we do not want them to leave footprints of waste; we want them to leave warmth and take home friendship.&rdquo;
            </h4>
            <p className="text-xs text-himalaya-600 font-light mt-1">
              — Aama Pema, Village Host Elder, Tamang Heritage Region
            </p>
          </div>

          <Link
            href="/experiences/village-homestay-community-immersion"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-moss hover:bg-moss-dark text-white text-xs font-bold shrink-0 transition-colors"
          >
            <span>Learn About Community Impact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Heart,
  MapPin,
  MessageCircle,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-himalaya-950 text-white pt-8 pb-16">
      {/* Background Himalayan Imagery with cinematic treatment */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mountains/sunrise-himalayas.jpg"
          alt="First morning light illuminating the snowcapped peaks of the Nepal Himalayas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-pulse duration-[10000ms] opacity-60"
        />
        {/* Layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/60 to-himalaya-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-himalaya-950/40 to-himalaya-950/80" />
      </div>

      <div className="editorial-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Narrative Column */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            {/* Cultural Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-saffron-light text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Nepal • Local Guide & Cultural Bridge</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-editorial-serif text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Discover Nepal Through{' '}
              <span className="text-saffron-light italic font-display-serif font-normal">
                Culture
              </span>
              , Spirituality &{' '}
              <span className="text-terracotta-light">Meaningful Connection</span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-parchment-200 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong className="font-semibold text-white">Explore With Sakar</strong> — where travel becomes more than a journey. It is a heartfelt opportunity to sit around village hearths, explore sacred Buddhist & Hindu sanctuaries, walk quiet mountain ridges, and experience the true soul of Nepal.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#experiences"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold bg-terracotta hover:bg-terracotta-dark text-white shadow-warm hover:shadow-editorial transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Discover Your Nepal Journey</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all transform hover:-translate-y-0.5"
              >
                <span>Consult With Sakar</span>
              </Link>

              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-4 rounded-xl text-xs sm:text-sm font-medium text-parchment-300 hover:text-white transition-colors"
              >
                <span>Read Sakar&apos;s Journal →</span>
              </Link>
            </div>

            {/* Floating Trust Pillars */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-3 sm:gap-6 text-left">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">100% Local Impact</h4>
                  <p className="text-[10px] sm:text-xs text-parchment-300 font-light hidden sm:block">
                    Direct support to families and village elders.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-light shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Private & Tailored</h4>
                  <p className="text-[10px] sm:text-xs text-parchment-300 font-light hidden sm:block">
                    Customized to your personal curiosities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-light shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Slow Travel</h4>
                  <p className="text-[10px] sm:text-xs text-parchment-300 font-light hidden sm:block">
                    Unhurried presence over rushed checklists.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Host & Visual Highlight Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden glass-card-dark p-3.5 shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-transform">
              {/* Host Portrait */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-himalaya-900">
                <Image
                  src="/images/sakar/sakar-portrait.jpg"
                  alt="Sakar — Founder & Cultural Guide of Explore With Sakar"
                  fill
                  sizes="(max-width: 1024px) 300px, 400px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-light">
                    Responsible Tour Director
                  </span>
                  <h3 className="font-editorial-serif text-lg font-bold text-white">
                    Sakar
                  </h3>
                  <p className="text-xs text-parchment-300 font-light italic">
                    &ldquo;I don&apos;t just show you Nepal; I introduce you to our people and ancient rhythms.&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Conversation CTA */}
              <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-parchment-200">Available for bespoke itinerary chats</span>
                </div>
                <Link
                  href="#booking"
                  className="text-saffron-light hover:text-white font-semibold flex items-center"
                >
                  <span>Chat</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

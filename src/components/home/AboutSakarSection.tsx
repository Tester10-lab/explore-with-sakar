'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Compass, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export default function AboutSakarSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-parchment-100 relative">
      <div className="editorial-container">
        <div className="rounded-3xl bg-sand border border-parchment-300 p-8 sm:p-12 lg:p-16 shadow-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Sakar Portrait Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-terracotta/20 to-saffron/20 blur-md" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-himalaya-900 shadow-2xl border border-parchment-300">
                  <Image
                    src="/images/sakar/sakar-portrait.jpg"
                    alt="Sakar — Host and Founder of Explore With Sakar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono uppercase tracking-widest text-saffron-light">
                      Responsible Tour Director
                    </span>
                    <h3 className="font-editorial-serif text-xl font-bold">
                      Sakar
                    </h3>
                    <p className="text-xs text-parchment-200 font-light">
                      Kathmandu, Nepal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Story Behind the Journey</span>
              </div>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Meet Sakar — <br />
                <span className="italic font-display-serif font-normal text-terracotta">
                  Your Cultural Bridge & Companion
                </span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                <p>
                  &ldquo;I started <strong className="font-medium text-himalaya-950">Explore With Sakar</strong> because I saw too many travelers visiting Nepal only as observers — looking through bus windows, rushing through temple ticket lines, and leaving without ever truly meeting our people.&rdquo;
                </p>
                <p>
                  Nepal is not just a collection of mountain peaks or medieval UNESCO monuments. It is an intricate living culture rooted in village kinship, ancient Buddhist and Hindu philosophies, sacred sound healing, and deep respect for the earth.
                </p>
                <p>
                  My goal is simple: to open genuine doors for you. Whether we are sitting by a grandmother&apos;s woodfire hearth in Ghandruk, meditating with singing bowls in Boudhanath, or walking quiet pine trails where no other tourists tread, you will experience Nepal with warmth, safety, and authentic human connection.
                </p>
              </div>

              {/* Personal Guiding Promises */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-parchment-50 border border-parchment-300 flex items-start space-x-2.5">
                  <Heart className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-himalaya-950 block">Intimate & Human</span>
                    <span className="text-himalaya-600 font-light">
                      Never rushed. Small private groups or solo travelers.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-parchment-50 border border-parchment-300 flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-himalaya-950 block">Direct Community Benefit</span>
                    <span className="text-himalaya-600 font-light">
                      Travel funds stay with the families hosting us.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="#booking"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-sm font-bold shadow-warm transition-all"
                >
                  <span>Plan a Conversation with Sakar</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <a
                  href="https://wa.me/9779800000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-himalaya-900/20 hover:bg-parchment-300 text-himalaya-900 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSakarSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative">
      <div className="editorial-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Sakar Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-md polaroid-frame rotate-2">
              <div className="relative aspect-[4/5] bg-himalaya-100 mb-4">
                <Image
                  src="/explore-with-sakar/images/sakar/sakar-portrait.jpg"
                  alt="Sakar — Host and Founder of Explore With Sakar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="text-center font-display-serif italic text-himalaya-600 text-sm">
                Kathmandu, Nepal
              </div>
            </div>
          </motion.div>

          {/* Narrative Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:order-1 space-y-8"
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-4 block">
                The Story Behind the Journey
              </span>
              <h2 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1] mb-6">
                Meet Sakar — <br />
                <span className="italic text-himalaya-700">
                  Your Cultural Bridge
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-himalaya-700 font-light leading-relaxed max-w-xl">
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

            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="#booking"
                 className="inline-flex items-center justify-center px-0 py-2 border-b border-himalaya-900 text-xs tracking-widest uppercase font-medium text-himalaya-950 hover:text-terracotta hover:border-terracotta transition-all"
              >
                <span>Plan a Conversation</span>
                <ArrowRight className="w-4 h-4 ml-3" />
              </Link>

              <a
                href="https://wa.me/9779800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-0 py-2 border-b border-emerald-600 text-xs tracking-widest uppercase font-medium text-emerald-700 hover:text-emerald-800 hover:border-emerald-800 transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

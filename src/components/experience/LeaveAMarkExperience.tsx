'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Target,
  FileText,
  Clock,
  PieChart,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import { LEAVE_A_MARK_CONTENT } from '@/data/leave-a-mark';

export default function LeaveAMarkExperience() {
  const { title, subtitle, beyondTheMapPromise, framework, whoShouldApply, ultimateImpact } =
    LEAVE_A_MARK_CONTENT;

  const focusIcons = [FileText, Layers, Clock, PieChart];
  const profileIcons = [Target, Briefcase, Award];

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero Section */}
      <PageHero
        badge="Independent Experience Package"
        nepaliTitle="रणनीतिक स्वयंसेवक यात्रा"
        title={title}
        subtitle={subtitle}
        backgroundImage="/explore-with-sakar/images/trails/river-gorge.jpg"
        breadcrumbs={[
          { label: 'Experiences', href: '/experience' },
          { label: 'Leave a Mark' },
        ]}
      />

      {/* 2. The "Beyond the Map" Promise */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Philosophy</span>
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                {beyondTheMapPromise.heading}
              </h2>
            </div>

            <div className="space-y-6 pt-4 text-base sm:text-lg text-himalaya-800 font-light leading-relaxed">
              <div className="p-6 sm:p-8 rounded-2xl bg-parchment-100/70 border border-parchment-300/80 shadow-subtle border-l-4 border-l-terracotta">
                <p className="font-serif italic text-himalaya-900 text-lg sm:text-xl leading-relaxed">
                  &ldquo;{beyondTheMapPromise.paragraphs[0]}&rdquo;
                </p>
              </div>

              {beyondTheMapPromise.paragraphs.slice(1).map((para, idx) => (
                <p key={idx} className="text-himalaya-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Framework: The 3-Month Execution Model */}
      <section className="py-20 sm:py-28 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
              Structured Methodology
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
              {framework.heading}
            </h2>
            <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed max-w-3xl mx-auto">
              {framework.intro}
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-himalaya-900 pt-2">
              {framework.focusIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {framework.focusItems.map((item, idx) => {
              const Icon = focusIcons[idx % focusIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-parchment-300 shadow-warm flex flex-col justify-between hover:shadow-floating transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                      {item.title}
                    </h3>
                    <p className="text-sm text-himalaya-700 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Who Should Apply? */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
              Candidate Profiles
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
              {whoShouldApply.heading}
            </h2>
            <p className="text-base sm:text-lg text-himalaya-700 font-light">
              {whoShouldApply.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whoShouldApply.profiles.map((profile, idx) => {
              const Icon = profileIcons[idx % profileIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-parchment-100 p-8 rounded-2xl border border-parchment-300 shadow-subtle flex flex-col justify-between space-y-6 hover:border-terracotta transition-colors"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-himalaya-950 text-white flex items-center justify-center">
                      <Icon className="w-6 h-6 text-saffron" />
                    </div>
                    <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                      {profile.role}
                    </h3>
                    <p className="text-sm text-himalaya-700 font-light leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-parchment-200 flex items-center space-x-2 text-xs font-semibold text-terracotta">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Direct Community Alignment</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. The Ultimate Impact */}
      <section className="py-20 sm:py-28 bg-himalaya-950 text-white relative overflow-hidden">
        <div className="editorial-container relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="w-14 h-14 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-saffron">
            Lasting Legacy
          </span>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {ultimateImpact.heading}
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {ultimateImpact.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-parchment-200 font-light leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?subject=Leave%20a%20Mark%3A%20Strategic%20Volunteer%20Tourism"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-widest transition-all shadow-warm"
            >
              <span>Apply for Strategic Volunteering</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all border border-white/20"
            >
              <span>Browse All Experiences</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

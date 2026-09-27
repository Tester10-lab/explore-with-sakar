'use client';

import React, { useState } from 'react';
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
  Heart,
  ShieldCheck,
  Activity,
  ExternalLink,
  BookOpen,
  TreePine,
  DollarSign,
  LineChart,
  Users,
  Compass,
  Check,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import { LEAVE_A_MARK_CONTENT, LeaveAMarkData } from '@/data/leave-a-mark';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';

interface LeaveAMarkExperienceProps {
  pageContent?: PageContent | null;
  initialContent?: LeaveAMarkData | null;
}

export default function LeaveAMarkExperience({ pageContent, initialContent }: LeaveAMarkExperienceProps) {
  const content = initialContent || LEAVE_A_MARK_CONTENT;
  const {
    title,
    subtitle,
    beyondTheMapPromise,
    partnership,
    projectAreas,
    implementationModel,
    resourceMobilisation,
    transparency,
    expectedImpact,
    participantExperience,
    sustainability,
    precanHighlight,
    framework,
    whoShouldApply,
    ultimateImpact,
  } = content;

  const [activeAreaTab, setActiveAreaTab] = useState<number>(0);

  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Strategic Community Impact Journey',
    title: title || 'Leave a Mark',
    subtitle: subtitle || 'Strategic Community Impact Journey',
  });

  const focusIcons = [FileText, Layers, Clock, PieChart];
  const profileIcons = [Target, Briefcase, Award, Heart];

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero Section */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle="सकारात्मक प्रभाव र रणनीतिक यात्रा"
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/explore-with-sakar/images/trails/river-gorge.jpg"
          breadcrumbs={[
            { label: 'Experiences', href: '/experiences' },
            { label: 'Leave a Mark' },
          ]}
        />
      )}

      {/* 2. Philosophy & Background Concept */}
      {isSectionVisible(pageContent, 'sec-lam-promise', 'narrative', 'philosophy') && (
        <section className="py-20 sm:py-24 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Background & Concept</span>
                </span>
                <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                  {beyondTheMapPromise?.heading || 'Strategic Community Impact Philosophy'}
                </h2>
              </div>

              <div className="space-y-6 pt-2 text-base sm:text-lg text-himalaya-800 font-light leading-relaxed">
                <div className="p-6 sm:p-8 rounded-2xl bg-parchment-100/80 border border-parchment-300 shadow-subtle border-l-4 border-l-terracotta">
                  <p className="font-serif italic text-himalaya-900 text-lg sm:text-xl leading-relaxed">
                    &ldquo;{beyondTheMapPromise?.paragraphs[0]}&rdquo;
                  </p>
                </div>

                {beyondTheMapPromise?.paragraphs.slice(1).map((para, idx) => (
                  <p key={idx} className="text-himalaya-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Health Initiative: PRECAN Partnership */}
      {precanHighlight && (
        <section className="py-16 sm:py-20 bg-emerald-950 text-white relative overflow-hidden border-b border-emerald-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
          <div className="editorial-container relative z-10 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-emerald-800/80">
              <div className="space-y-2">
                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{precanHighlight.badge}</span>
                </span>
                <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {precanHighlight.title}
                </h2>
                <p className="text-sm text-emerald-200/90 font-light">
                  Partnering with{' '}
                  <strong className="text-white font-medium">{precanHighlight.partnerName}</strong>
                </p>
              </div>
              <div>
                <a
                  href={precanHighlight.partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Visit PRECAN.org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-base sm:text-lg text-emerald-100/90 font-light leading-relaxed max-w-4xl">
              {precanHighlight.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-emerald-900/40 border border-emerald-700/50 p-6 rounded-2xl space-y-4">
                <h3 className="font-editorial-serif text-lg font-bold text-emerald-200 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>Key Health Focus Areas</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-emerald-100 font-light">
                  {precanHighlight.focusAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-900/40 border border-emerald-700/50 p-6 rounded-2xl space-y-4">
                <h3 className="font-editorial-serif text-lg font-bold text-emerald-200 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>How Participants Contribute</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-emerald-100 font-light">
                  {precanHighlight.contributionTypes.map((contrib, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Project Identification & Community Partnership */}
      {partnership && (
        <section className="py-20 sm:py-24 bg-sand border-b border-parchment-300">
          <div className="editorial-container">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                Collaborative Foundation
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
                {partnership.heading}
              </h2>
              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed max-w-3xl mx-auto">
                {partnership.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {partnership.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-parchment-300 shadow-subtle flex flex-col justify-between space-y-4 hover:shadow-warm transition-all duration-300"
                >
                  <div className="space-y-3">
                    <span className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta font-mono font-bold text-sm flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="font-editorial-serif text-lg font-bold text-himalaya-950 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Core Project Areas */}
      {projectAreas && (
        <section className="py-20 sm:py-24 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                Impact Domains
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
                {projectAreas.heading}
              </h2>
              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed max-w-3xl mx-auto">
                {projectAreas.intro}
              </p>
            </div>

            {/* Tab navigation for mobile & desktop */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
              {projectAreas.categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAreaTab(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeAreaTab === idx
                      ? 'bg-himalaya-950 text-white border-himalaya-950 shadow-md'
                      : 'bg-parchment-100 text-himalaya-700 border-parchment-300 hover:bg-parchment-200'
                  }`}
                >
                  {cat.code}: {cat.title}
                </button>
              ))}
            </div>

            {/* Active Tab Content Display */}
            {projectAreas.categories[activeAreaTab] && (
              <div className="max-w-4xl mx-auto bg-parchment-100 p-8 sm:p-10 rounded-3xl border border-parchment-300 shadow-warm space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-terracotta">
                    {projectAreas.categories[activeAreaTab].code}
                  </span>
                  <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                    {projectAreas.categories[activeAreaTab].title}
                  </h3>
                  <p className="text-base text-himalaya-700 font-light">
                    {projectAreas.categories[activeAreaTab].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-300">
                  {projectAreas.categories[activeAreaTab].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-parchment-200 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-himalaya-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. 4-Phase Implementation Model */}
      {implementationModel && (
        <section className="py-20 sm:py-24 bg-sand border-b border-parchment-300">
          <div className="editorial-container">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                Structured Process
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
                {implementationModel.heading}
              </h2>
              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed max-w-3xl mx-auto">
                {implementationModel.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {implementationModel.phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-parchment-300 shadow-warm space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-himalaya-950 text-saffron text-xs font-mono font-bold uppercase">
                        {phase.phase}
                      </span>
                      <span className="text-xs text-himalaya-500 font-mono">0{idx + 1}/04</span>
                    </div>
                    <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-himalaya-700 font-light leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-parchment-200">
                    {phase.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-2 text-xs text-himalaya-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Resource Mobilisation & Transparency */}
      {resourceMobilisation && transparency && (
        <section className="py-20 sm:py-24 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
              {/* Left Column: Resource Mobilisation & Funding */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                    Funding Plan
                  </span>
                  <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 tracking-tight">
                    {resourceMobilisation.heading}
                  </h2>
                  <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                    {resourceMobilisation.intro}
                  </p>
                </div>

                <div className="space-y-3">
                  {resourceMobilisation.sources.map((source, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-parchment-100 border border-parchment-300 space-y-1"
                    >
                      <h4 className="font-editorial-serif text-base font-bold text-himalaya-950 flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-terracotta" />
                        <span>{source.title}</span>
                      </h4>
                      <p className="text-xs text-himalaya-700 font-light leading-relaxed">
                        {source.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-xl bg-terracotta/10 border border-terracotta/20 text-xs text-himalaya-900 leading-relaxed font-medium">
                  {resourceMobilisation.transparencyNote}
                </div>
              </div>

              {/* Right Column: Transparency & Accountability */}
              <div className="space-y-8 bg-sand p-8 rounded-3xl border border-parchment-300 shadow-warm">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                    Our Commitment
                  </span>
                  <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 tracking-tight">
                    {transparency.heading}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {transparency.principles.map((principle, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-parchment-300 space-y-2"
                    >
                      <div className="w-8 h-8 rounded-lg bg-himalaya-950 text-saffron flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="font-editorial-serif text-sm font-bold text-himalaya-950">
                        {principle.title}
                      </h4>
                      <p className="text-xs text-himalaya-700 font-light leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Expected Impact & Participant Experience */}
      {expectedImpact && participantExperience && (
        <section className="py-20 sm:py-24 bg-sand border-b border-parchment-300">
          <div className="editorial-container">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                Outcomes & Benefits
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
                {expectedImpact.heading} & Experience
              </h2>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-16">
              {expectedImpact.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-parchment-300 text-center space-y-2 shadow-subtle"
                >
                  <span className="text-xs font-mono font-bold uppercase text-terracotta">
                    Impact 0{idx + 1}
                  </span>
                  <h4 className="font-editorial-serif text-base font-bold text-himalaya-950">
                    {item.metric}
                  </h4>
                  <p className="text-xs text-himalaya-700 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* What Travellers Gain */}
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                  {participantExperience.heading}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {participantExperience.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-parchment-100 p-6 rounded-2xl border border-parchment-300 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                      {benefit.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Sustainability Plan */}
      {sustainability && (
        <section className="py-16 sm:py-20 bg-white border-b border-parchment-300">
          <div className="editorial-container max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                Long-Term Legacy
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950">
                {sustainability.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sustainability.pillars.map((pillarText, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-parchment-100 border border-parchment-300 flex items-center space-x-3 text-left"
                >
                  <CheckCircle2 className="w-5 h-5 text-terracotta shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-himalaya-900">
                    {pillarText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Call to Action / Apply */}
      {isSectionVisible(pageContent, 'sec-lam-impact', 'narrative', 'cta') && (
        <section className="py-20 sm:py-28 bg-himalaya-950 text-white relative overflow-hidden">
          <div className="editorial-container relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="w-14 h-14 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7 text-saffron" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-saffron">
              Create Lasting Impact
            </span>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {ultimateImpact?.heading || 'Leave Your Mark in Nepal'}
            </h2>

            <div className="space-y-6 max-w-3xl mx-auto">
              {ultimateImpact?.paragraphs.map((para, idx) => (
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
                href="/contact?subject=Leave%20a%20Mark%3A%20Strategic%20Community%20Impact%20Journey"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-widest transition-all shadow-warm"
              >
                <span>Inquire & Apply for Leave a Mark</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/experiences"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all border border-white/20"
              >
                <span>Browse All Experiences</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ExtendedExperience } from '@/types/cms';

interface Props {
  experiences: ExtendedExperience[];
  title?: string;
  subtitle?: string;
}

export default function BlogFeaturedExperiences({
  experiences,
  title = 'Journeys Behind the Stories',
  subtitle = 'Turn field essays into lived reality. These are our three featured experiences curated for thoughtful travelers.',
}: Props) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-parchment-300 bg-sand/60">
      <div className="editorial-container">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Curated Travel Experiences</span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-himalaya-600 font-light mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Adapted 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.slice(0, 3).map((exp, idx) => {
            const imageSrc =
              exp.heroImage?.src ||
              (exp as any).image ||
              '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg';

            return (
              <article
                key={exp.id || exp.slug}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all duration-300 hover:-translate-y-1"
              >
                {/* Larger Editorial Image */}
                <Link
                  href={`/experience/${exp.slug}`}
                  className="block relative aspect-[4/3] overflow-hidden bg-himalaya-900"
                >
                  <Image
                    src={imageSrc}
                    alt={exp.heroImage?.alt || exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-himalaya-950/20 to-transparent" />

                  {/* Priority Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-himalaya-950/80 backdrop-blur-sm text-saffron-light text-[9px] font-mono uppercase tracking-widest">
                    Featured #{idx + 1}
                  </div>

                  {/* Category */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-himalaya-950 text-[9px] font-bold uppercase tracking-wider">
                    {exp.categoryLabel || exp.category}
                  </div>

                  {/* Small Metadata */}
                  <div className="absolute bottom-3 left-4 right-4 text-parchment-200 text-[11px] font-light">
                    <span>{exp.location?.split(',')[0]}</span>
                    {exp.duration && <span className="opacity-80"> • {exp.duration}</span>}
                  </div>
                </Link>

                {/* Editorial Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {exp.nepaliTitle && (
                      <span className="block text-[11px] font-serif text-himalaya-500">
                        {exp.nepaliTitle}
                      </span>
                    )}
                    <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-snug">
                      <Link href={`/experience/${exp.slug}`}>{exp.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed line-clamp-3">
                      {exp.shortDescription}
                    </p>
                  </div>

                  {/* Explore CTA */}
                  <div className="pt-3 border-t border-parchment-200">
                    <Link
                      href={`/experience/${exp.slug}`}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-terracotta group-hover:text-terracotta-dark transition-colors"
                    >
                      <span>Explore Experience</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Experiences Link */}
        <div className="mt-12 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-himalaya-700 hover:text-terracotta transition-colors"
          >
            <span>Explore All Nepal Experiences</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

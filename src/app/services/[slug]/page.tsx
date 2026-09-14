import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, Check, ArrowRight, Compass } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';
import { getLiveServiceBySlug, getLiveServices } from '@/lib/cms';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getLiveServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found | Explore With Sakar',
    };
  }

  return {
    title: `${service.title} | Explore With Sakar`,
    description: service.description,
  };
}

export function generateStaticParams() {
  const services = getLiveServices(false);
  return services.map((svc) => ({
    slug: svc.slug,
  }));
}

export default function DynamicServicePage({ params }: ServicePageProps) {
  const service = getLiveServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const serviceImage = service.heroImage?.src || service.image || '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg';
  const serviceDesc = service.shortDescription || service.description || '';
  const serviceFeatures = service.keyFeatures?.map((f) => `${f.title}: ${f.description}`) || service.features || [];

  return (
    <div className="min-h-screen bg-parchment-100">
      <PageHero
        badge={service.badge || service.category || 'Travel Pillar'}
        nepaliTitle={service.nepaliTitle || 'हाम्रा सेवाहरू'}
        title={service.title}
        subtitle={service.tagline || service.subtitle || serviceDesc}
        backgroundImage={serviceImage}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Experience</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                {service.title}
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                {serviceDesc}
              </p>

              {service.fullPhilosophy && service.fullPhilosophy.length > 0 && (
                <div className="space-y-4 pt-2">
                  {service.fullPhilosophy.map((p, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {serviceFeatures.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                  {serviceFeatures.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                      <div className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-terracotta text-white font-medium hover:bg-terracotta-dark transition shadow-soft"
                >
                  <span>Inquire About This Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-floating border border-parchment-300 aspect-[4/5] bg-himalaya-900">
                <Image
                  src={serviceImage}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                {service.quote && (
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-display-serif italic text-lg">
                      &ldquo;{service.quote}&rdquo;
                    </p>
                    <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                      — {service.quoteAuthor || 'Explore With Sakar'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Experience ${service.title} with Sakar`}
        subtitle="Let us craft a meaningful, authentic itinerary according to your schedule and interests."
        primaryButtonText="Plan Your Journey"
        primaryButtonHref="/contact"
        secondaryButtonText="View All Pillars"
        secondaryButtonHref="/services"
      />
    </div>
  );
}

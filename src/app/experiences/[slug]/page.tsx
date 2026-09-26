import React from 'react';
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  getPublicExperienceBySlug,
  getPublicExperiences,
  getPageContent,
} from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import ExperiencePackageDiscovery, { PackageCard } from '@/components/experience/ExperiencePackageDiscovery';
import CustomJourneysExperience from '@/components/experience/CustomJourneysExperience';
import GoSpiritualExperience from '@/components/experience/GoSpiritualExperience';
import { getPublicEvents } from '@/lib/content';
import { SITE_ORIGIN } from '@/lib/config';

// Force dynamic rendering so Vercel never serves a stale statically-cached version
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

import { EXPERIENCE_PILLARS } from '@/lib/experiencePillars';
import { EXPERIENCES } from '@/data/experiences';

// Map individual topic slugs to their parent experience for backwards compatibility redirect
const TOPIC_TO_PARENT_MAP: Record<string, string> = {
  'kathmandu-durbar-square': 'beyond-the-map',
  'kathmandu-square': 'beyond-the-map',
  'bhaktapur-durbar-square': 'beyond-the-map',
  'bhaktapur-square': 'beyond-the-map',
  'patan-durbar-square': 'beyond-the-map',
  'patan-square': 'beyond-the-map',
  'pokhara-laid-back-city': 'beyond-the-map',
  'pokhara': 'beyond-the-map',
  'living-courtyards-kathmandu': 'beyond-the-map',
  'echoes-in-stone-patan-bhaktapur': 'beyond-the-map',
  'artisans-path-heritage-deep-dive': 'beyond-the-map',
  'sacred-geometry-architecture-valley': 'beyond-the-map',
  'chitwan-national-park': 'beyond-the-map',
  'muktinath-sacred-pilgrimage-passage': 'beyond-the-map',
  'spiritual-immersion-singing-bowls': 'go-spiritual',
  'pharping-sacred-cave-meditation': 'go-spiritual',
  'namo-buddha-sacred-ridge-walk': 'go-spiritual',
  'monastery-chanting-inner-silence': 'go-spiritual',
  'village-homestay-panauti-balalthali': 'homestays',
  'ghandruk-gurung-heritage-homestay': 'homestays',
  'helambu-hyolmo-hearth-living': 'homestays',
  'bungamati-khokana-artisan-village': 'homestays',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const canonicalUrl = `${SITE_ORIGIN}/experiences/${slug}`;

  // Check CMS page content first
  const pageContent = await getPageContent(slug);
  if (pageContent?.seo?.title || pageContent?.seo?.metaDescription) {
    return await buildPageMetadata(slug, {
      title: pageContent.seo.title,
      description: pageContent.seo.metaDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: pageContent.seo.title,
        description: pageContent.seo.metaDescription,
        url: canonicalUrl,
      },
    });
  }

  // Experience pillar metadata
  const pillar = EXPERIENCE_PILLARS[slug];
  if (pillar) {
    return {
      title: `${pillar.name} | Explore With Sakar`,
      description: pillar.introText,
      alternates: { canonical: `${SITE_ORIGIN}/experiences/${pillar.canonicalSlug}` },
      openGraph: {
        title: `${pillar.name} | Explore With Sakar`,
        description: pillar.introText,
        url: `${SITE_ORIGIN}/experiences/${pillar.canonicalSlug}`,
        images: [pillar.heroImage],
      },
    };
  }

  if (slug === 'custom-journeys' || slug === 'custom-private-journeys') {
    return {
      title: 'Custom Private Journeys | Explore With Sakar',
      description: 'Tailored private Himalayan routes designed around your passions, rhythm, and values.',
      alternates: { canonical: `${SITE_ORIGIN}/experiences/custom-journeys` },
      openGraph: {
        title: 'Custom Private Journeys | Explore With Sakar',
        description: 'Tailored private Himalayan routes designed around your passions, rhythm, and values.',
        url: `${SITE_ORIGIN}/experiences/custom-journeys`,
        images: ['/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'],
      },
    };
  }

  const experience = await getPublicExperienceBySlug(slug);
  if (!experience) {
    return {
      title: 'Experience Not Found | Explore With Sakar',
    };
  }

  const seoTitle = experience.seoTitle || `${experience.title} | Explore With Sakar`;
  const seoDesc = experience.seoDescription || experience.shortDescription;
  const ogImg =
    experience.ogImage ||
    experience.heroImage?.src ||
    '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg';

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl,
      images: [ogImg],
    },
  };
}

export async function generateStaticParams() {
  const canonicalPillars = [
    'beyond-the-map',
    'go-spiritual',
    'spiritual-wellness',
    'go-deeper',
    'homestays',
    'custom-journeys',
  ];
  return canonicalPillars.map((slug) => ({ slug }));
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = params;

  // 1. Legacy slug permanent redirects (308)
  if (slug === 'all-curated-experiences') {
    permanentRedirect('/experiences');
  }
  if (slug === 'go-beyond') {
    permanentRedirect('/experiences/beyond-the-map');
  }
  if (slug === 'go-within') {
    permanentRedirect('/experiences/beyond-the-map');
  }
  if (slug === 'leave-a-mark' || slug === 'responsible') {
    permanentRedirect('/experiences/beyond-the-map');
  }
  if (slug === 'feel-closer') {
    permanentRedirect('/experiences/homestays');
  }
  if (slug === 'custom-private-journeys') {
    permanentRedirect('/experiences/custom-journeys');
  }

  // 2. If slug is an individual topic slug, redirect to its parent canonical route: /experiences/[parent]/[topic]
  if (TOPIC_TO_PARENT_MAP[slug]) {
    const parentSlug = TOPIC_TO_PARENT_MAP[slug];
    permanentRedirect(`/experiences/${parentSlug}/${slug}`);
  }

  // 3. Special Go Spiritual Page Renderer if requested
  if (slug === 'go-spiritual' || slug === 'spiritual-wellness') {
    const pageContent = await getPageContent(slug);
    const pillar = EXPERIENCE_PILLARS[slug] || EXPERIENCE_PILLARS['go-spiritual'];
    const allExperiences = await getPublicExperiences();

    const PARENT_SLUGS_TO_EXCLUDE = new Set([
      'beyond-the-map', 'go-beyond', 'go-within', 'go-spiritual',
      'spiritual-wellness', 'go-deeper', 'leave-a-mark', 'homestays',
      'feel-closer', 'all-curated-experiences', 'custom-journeys', 'custom-private-journeys',
    ]);

    const pillarPackages: PackageCard[] = allExperiences
      .filter(
        (exp) =>
          pillar.categoryFilter.includes(exp.category) &&
          !PARENT_SLUGS_TO_EXCLUDE.has(exp.slug)
      )
      .map((exp) => ({
        slug: exp.slug,
        title: exp.title,
        shortDescription: exp.shortDescription,
        heroImage: exp.heroImage ? { src: exp.heroImage.src, alt: exp.heroImage.alt } : undefined,
      }));

    const seenSlugs = new Set(pillarPackages.map((p) => p.slug));
    const fallbackTopics: PackageCard[] = EXPERIENCES
      .filter(
        (exp) =>
          pillar.categoryFilter.includes(exp.category) &&
          !PARENT_SLUGS_TO_EXCLUDE.has(exp.slug) &&
          !seenSlugs.has(exp.slug)
      )
      .map((exp) => ({
        slug: exp.slug,
        title: exp.title,
        shortDescription: exp.shortDescription,
        heroImage: exp.heroImage ? { src: exp.heroImage.src, alt: exp.heroImage.alt } : undefined,
      }));

    const finalPackages = [...pillarPackages, ...fallbackTopics];

    return (
      <ExperiencePackageDiscovery
        experienceName={pillar.name}
        nepaliTitle={pillar.nepaliTitle}
        introText={pillar.introText}
        overviewText={pillar.overviewText}
        highlights={pillar.highlights}
        heroImage={pillar.heroImage}
        packages={finalPackages}
        experienceSlug={pillar.canonicalSlug}
      />
    );
  }

  // 4. Core experience pillars → Package Discovery pages
  const pillar = EXPERIENCE_PILLARS[slug];
  if (pillar) {
    const allExperiences = await getPublicExperiences();

    const PARENT_SLUGS_TO_EXCLUDE = new Set([
      'beyond-the-map', 'go-beyond', 'go-within', 'go-spiritual',
      'spiritual-wellness', 'go-deeper', 'leave-a-mark', 'homestays',
      'feel-closer', 'all-curated-experiences', 'custom-journeys', 'custom-private-journeys',
    ]);

    const pillarPackages: PackageCard[] = allExperiences
      .filter(
        (exp) =>
          pillar.categoryFilter.includes(exp.category) &&
          !PARENT_SLUGS_TO_EXCLUDE.has(exp.slug)
      )
      .map((exp) => ({
        slug: exp.slug,
        title: exp.title,
        shortDescription: exp.shortDescription,
        heroImage: exp.heroImage ? { src: exp.heroImage.src, alt: exp.heroImage.alt } : undefined,
      }));

    const seenSlugs = new Set(pillarPackages.map((p) => p.slug));
    const fallbackTopics: PackageCard[] = EXPERIENCES
      .filter(
        (exp) =>
          pillar.categoryFilter.includes(exp.category) &&
          !PARENT_SLUGS_TO_EXCLUDE.has(exp.slug) &&
          !seenSlugs.has(exp.slug)
      )
      .map((exp) => ({
        slug: exp.slug,
        title: exp.title,
        shortDescription: exp.shortDescription,
        heroImage: exp.heroImage ? { src: exp.heroImage.src, alt: exp.heroImage.alt } : undefined,
      }));

    const finalPackages = [...pillarPackages, ...fallbackTopics];

    const cmsParent = allExperiences.find((e) => e.slug === slug);
    const expName = cmsParent?.title || pillar.name;
    const expIntro = cmsParent?.shortDescription || pillar.introText;
    const expOverview = (Array.isArray(cmsParent?.fullDescription) && cmsParent.fullDescription.length > 0)
      ? cmsParent.fullDescription
      : pillar.overviewText;
    const expHighlights = (cmsParent?.highlights && cmsParent.highlights.length > 0)
      ? cmsParent.highlights
      : pillar.highlights;
    const expHeroImage = cmsParent?.heroImage?.src || pillar.heroImage;

    return (
      <ExperiencePackageDiscovery
        experienceName={expName}
        nepaliTitle={cmsParent?.nepaliTitle || pillar.nepaliTitle}
        introText={expIntro}
        overviewText={expOverview}
        highlights={expHighlights}
        heroImage={expHeroImage}
        packages={finalPackages}
        experienceSlug={pillar.canonicalSlug}
      />
    );
  }

  // 5. Custom Journeys
  if (slug === 'custom-journeys') {
    const [pageContent, events] = await Promise.all([
      getPageContent('custom-journeys').then((res) => res || getPageContent('custom-private-journeys')),
      getPublicEvents(),
    ]);
    const availableEvents = events.map((evt) => ({
      id: evt.id,
      title: evt.title,
      date: evt.date,
    }));
    return <CustomJourneysExperience pageContent={pageContent} availableEvents={availableEvents} />;
  }

  // 6. Fallback for any single-topic experience
  const experience = await getPublicExperienceBySlug(slug);
  if (!experience) {
    notFound();
  }

  const categoryToParent: Record<string, string> = {
    'beyond-the-map': 'beyond-the-map',
    'go-beyond': 'beyond-the-map',
    'go-spiritual': 'go-spiritual',
    'spiritual-wellness': 'go-spiritual',
    'spiritual': 'go-spiritual',
    'go-deeper': 'go-deeper',
    'homestays': 'homestays',
    'feel-closer': 'homestays',
  };

  if (experience.category && categoryToParent[experience.category]) {
    const parent = categoryToParent[experience.category];
    permanentRedirect(`/experiences/${parent}/${experience.slug}`);
  }

  notFound();
}

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
import { getPublicEvents } from '@/lib/content';

// Force dynamic rendering so Vercel never serves a stale statically-cached
// version of a pillar page (beyond-the-map, go-within, etc.).
// Topic cards come from the database and must reflect live CMS data.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

import { EXPERIENCE_PILLARS } from '@/lib/experiencePillars';

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
  'spiritual-immersion-singing-bowls': 'go-within',
  'pharping-sacred-cave-meditation': 'go-within',
  'namo-buddha-sacred-ridge-walk': 'go-within',
  'monastery-chanting-inner-silence': 'go-within',
  'living-courtyards-kathmandu': 'go-deeper',
  'echoes-in-stone-patan-bhaktapur': 'go-deeper',
  'artisans-path-heritage-deep-dive': 'go-deeper',
  'sacred-geometry-architecture-valley': 'go-deeper',
  'langtang-tamang-heritage-trail': 'leave-a-mark',
  'chitwan-indigenous-tharu-guardians': 'leave-a-mark',
  'community-sacred-forest-reforestation': 'leave-a-mark',
  'strategic-community-capacity-building': 'leave-a-mark',
  'village-homestay-panauti-balalthali': 'homestays',
  'ghandruk-gurung-heritage-homestay': 'homestays',
  'helambu-hyolmo-hearth-living': 'homestays',
  'bungamati-khokana-artisan-village': 'homestays',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const canonicalUrl = `https://explorewithsakar.com/experiences/${slug}`;

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
      alternates: { canonical: `https://explorewithsakar.com/experiences/${pillar.canonicalSlug}` },
      openGraph: {
        title: `${pillar.name} | Explore With Sakar`,
        description: pillar.introText,
        url: `https://explorewithsakar.com/experiences/${pillar.canonicalSlug}`,
        images: [pillar.heroImage],
      },
    };
  }

  if (slug === 'custom-journeys' || slug === 'custom-private-journeys') {
    return {
      title: 'Custom Private Journeys | Explore With Sakar',
      description: 'Tailored private Himalayan routes designed around your passions, rhythm, and values.',
      alternates: { canonical: 'https://explorewithsakar.com/experiences/custom-journeys' },
      openGraph: {
        title: 'Custom Private Journeys | Explore With Sakar',
        description: 'Tailored private Himalayan routes designed around your passions, rhythm, and values.',
        url: 'https://explorewithsakar.com/experiences/custom-journeys',
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
  // Only generate static params for the canonical pillar slugs.
  // Individual topic slugs (kathmandu-durbar-square, etc.) are handled by
  // /experiences/[slug]/[topic]/page.tsx — do NOT pre-render them here
  // or they will resolve to a stale static page instead of triggering the
  // runtime redirect in ExperienceDetailPage.
  const canonicalPillars = [
    'beyond-the-map',
    'go-within',
    'go-deeper',
    'homestays',
    'leave-a-mark',
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
  if (slug === 'go-spiritual') {
    permanentRedirect('/experiences/go-within');
  }
  if (slug === 'spiritual-wellness') {
    permanentRedirect('/experiences/go-within');
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

  // 3. Core experience pillars → Package Discovery pages (showing Overview, Highlights, and 4 Topic cards)
  const pillar = EXPERIENCE_PILLARS[slug];
  if (pillar) {
    const allExperiences = await getPublicExperiences();

    // All experience-level (parent) slugs and their legacy aliases.
    // These must NEVER appear as topic cards inside a pillar discovery page.
    const PARENT_SLUGS_TO_EXCLUDE = new Set([
      // beyond-the-map pillar + aliases
      'beyond-the-map',
      'go-beyond',
      // go-within pillar + aliases
      'go-within',
      'go-spiritual',
      'spiritual-wellness',
      // go-deeper pillar
      'go-deeper',
      // leave-a-mark pillar
      'leave-a-mark',
      // homestays / feel-closer pillar
      'homestays',
      'feel-closer',
      // other parent-level slugs
      'all-curated-experiences',
      'custom-journeys',
      'custom-private-journeys',
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

    // If CMS has a parent experience record, allow its customized title/intro/overview/highlights to be used
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
        packages={pillarPackages}
        experienceSlug={pillar.canonicalSlug}
      />
    );
  }

  // 4. Custom Journeys (special handler, preserved)
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

  // 5. Fallback for any single-topic experience not mapped above
  const experience = await getPublicExperienceBySlug(slug);
  if (!experience) {
    notFound();
  }

  // If experience has a known parent category, redirect to canonical nested route
  const categoryToParent: Record<string, string> = {
    'beyond-the-map': 'beyond-the-map',
    'go-beyond': 'beyond-the-map',
    'go-within': 'go-within',
    'go-spiritual': 'go-within',
    'spiritual-wellness': 'go-within',
    'go-deeper': 'go-deeper',
    'leave-a-mark': 'leave-a-mark',
    'homestays': 'homestays',
    'feel-closer': 'homestays',
  };

  if (experience.category && categoryToParent[experience.category]) {
    const parent = categoryToParent[experience.category];
    permanentRedirect(`/experiences/${parent}/${experience.slug}`);
  }

  notFound();
}


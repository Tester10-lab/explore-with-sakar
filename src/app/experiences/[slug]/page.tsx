import React from 'react';
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  getPublicExperienceBySlug,
  getPublicExperiences,
  getPageContent,
  getPublicBeyondChapters,
  getPublicEvents,
} from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import GoBeyondExperience from '@/components/experience/GoBeyondExperience';
import GoSpiritualExperience from '@/components/experience/GoSpiritualExperience';
import FeelCloserExperience from '@/components/experience/FeelCloserExperience';
import LeaveAMarkExperience from '@/components/experience/LeaveAMarkExperience';
import CustomJourneysExperience from '@/components/experience/CustomJourneysExperience';
import ExperienceDetailTemplate from '@/components/experience/ExperienceDetailTemplate';

interface Props {
  params: { slug: string };
}

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

  // Fallbacks for the 5 canonical experience pillars
  if (slug === 'beyond-the-map' || slug === 'go-beyond') {
    return {
      title: 'Go Beyond the Map | Explore With Sakar',
      description: 'Step beyond the common tourist map. Walk medieval courtyards, meet master artisans, and experience Living Nepal.',
      alternates: { canonical: 'https://explorewithsakar.com/experiences/beyond-the-map' },
      openGraph: {
        title: 'Go Beyond the Map | Explore With Sakar',
        description: 'Step beyond the common tourist map. Walk medieval courtyards, meet master artisans, and experience Living Nepal.',
        url: 'https://explorewithsakar.com/experiences/beyond-the-map',
        images: ['/images/beyond-the-map/living-courtyards.jpg'],
      },
    };
  }

  if (slug === 'spiritual-wellness' || slug === 'go-spiritual') {
    return {
      title: 'Go Within — Himalayan Sound & Spiritual Sanctuary | Explore With Sakar',
      description: 'Himalayan singing bowls, monastery dawns, sacred stillness, and deep inner renewal in Nepal.',
      alternates: { canonical: 'https://explorewithsakar.com/experiences/spiritual-wellness' },
      openGraph: {
        title: 'Go Within — Himalayan Sound & Spiritual Sanctuary | Explore With Sakar',
        description: 'Himalayan singing bowls, monastery dawns, sacred stillness, and deep inner renewal in Nepal.',
        url: 'https://explorewithsakar.com/experiences/spiritual-wellness',
        images: ['/explore-with-sakar/images/spiritual/buddhist-stupa.jpg'],
      },
    };
  }

  if (slug === 'homestays' || slug === 'feel-closer') {
    return {
      title: 'Feel Closer — Village Homestays & Living Hearths | Explore With Sakar',
      description: 'Mountain village homestays, traditional family hearths, and warm human connections in Nepal.',
      alternates: { canonical: 'https://explorewithsakar.com/experiences/homestays' },
      openGraph: {
        title: 'Feel Closer — Village Homestays & Living Hearths | Explore With Sakar',
        description: 'Mountain village homestays, traditional family hearths, and warm human connections in Nepal.',
        url: 'https://explorewithsakar.com/experiences/homestays',
        images: ['/explore-with-sakar/images/homestays/village-meal.jpg'],
      },
    };
  }

  if (slug === 'leave-a-mark') {
    return {
      title: 'Leave a Mark — Strategic Volunteer Tourism | Explore With Sakar',
      description: 'Strategic volunteering and regenerative travel that empowers local communities in Nepal.',
      alternates: { canonical: 'https://explorewithsakar.com/experiences/leave-a-mark' },
      openGraph: {
        title: 'Leave a Mark — Strategic Volunteer Tourism | Explore With Sakar',
        description: 'Strategic volunteering and regenerative travel that empowers local communities in Nepal.',
        url: 'https://explorewithsakar.com/experiences/leave-a-mark',
        images: ['/explore-with-sakar/images/trails/river-gorge.jpg'],
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
  const experiences = await getPublicExperiences();
  const existingSlugs = new Set(experiences.map((exp) => exp.slug));

  const canonicalPillars = [
    'beyond-the-map',
    'spiritual-wellness',
    'homestays',
    'leave-a-mark',
    'custom-journeys',
  ];

  canonicalPillars.forEach((s) => existingSlugs.add(s));

  return Array.from(existingSlugs).map((slug) => ({ slug }));
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
    permanentRedirect('/experiences/spiritual-wellness');
  }
  if (slug === 'feel-closer') {
    permanentRedirect('/experiences/homestays');
  }
  if (slug === 'custom-private-journeys') {
    permanentRedirect('/experiences/custom-journeys');
  }

  // 2. Canonical Pillar Handlers
  if (slug === 'beyond-the-map') {
    const [pageContent, chapters] = await Promise.all([
      getPageContent('beyond-the-map').then((res) => res || getPageContent('go-beyond')),
      getPublicBeyondChapters(),
    ]);
    return <GoBeyondExperience pageContent={pageContent} chapters={chapters} />;
  }

  if (slug === 'spiritual-wellness') {
    const pageContent = await getPageContent('spiritual-wellness').then(
      (res) => res || getPageContent('go-spiritual')
    );
    return <GoSpiritualExperience pageContent={pageContent} />;
  }

  if (slug === 'homestays') {
    const pageContent = await getPageContent('homestays').then(
      (res) => res || getPageContent('feel-closer')
    );
    return <FeelCloserExperience pageContent={pageContent} />;
  }

  if (slug === 'leave-a-mark') {
    const pageContent = await getPageContent('leave-a-mark');
    return <LeaveAMarkExperience pageContent={pageContent} />;
  }

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

  // 3. Curated Itinerary Journeys
  const experience = await getPublicExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const allExperiences = await getPublicExperiences();
  const relatedExperiences = allExperiences
    .filter((e) => e.slug !== slug && e.slug !== 'all-curated-experiences')
    .slice(0, 3);

  return (
    <ExperienceDetailTemplate
      experience={experience}
      relatedExperiences={relatedExperiences}
    />
  );
}

import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getPublicExperienceBySlug, getPublicExperiences, getPageContent } from '@/lib/content';
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
  const canonicalUrl = `https://explorewithsakar.com/experience/${params.slug}`;

  if (params.slug === 'go-beyond') {
    return {
      title: 'Go Beyond the Map | Explore With Sakar',
      description: 'Step beyond the common tourist map. Walk medieval courtyards, meet master artisans, and experience Living Nepal.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Go Beyond the Map | Explore With Sakar',
        description: 'Step beyond the common tourist map. Walk medieval courtyards, meet master artisans, and experience Living Nepal.',
        url: canonicalUrl,
        images: ['/images/beyond-the-map/living-courtyards.jpg'],
      },
    };
  }

  if (params.slug === 'go-spiritual') {
    return {
      title: 'Go Spiritual | Explore With Sakar',
      description: 'Himalayan singing bowls, monastery dawns, sacred stillness, and deep inner renewal in Nepal.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Go Spiritual | Explore With Sakar',
        description: 'Himalayan singing bowls, monastery dawns, sacred stillness, and deep inner renewal in Nepal.',
        url: canonicalUrl,
        images: ['/images/spiritual/monastery-dawn.jpg'],
      },
    };
  }

  if (params.slug === 'feel-closer') {
    return {
      title: 'Feel Closer | Explore With Sakar',
      description: 'Mountain village homestays, traditional family hearths, and warm human connections in Nepal.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Feel Closer | Explore With Sakar',
        description: 'Mountain village homestays, traditional family hearths, and warm human connections in Nepal.',
        url: canonicalUrl,
        images: ['/explore-with-sakar/images/homestays/village-meal.jpg'],
      },
    };
  }

  if (params.slug === 'leave-a-mark') {
    return {
      title: 'Leave a Mark | Explore With Sakar',
      description: 'Strategic volunteering and regenerative travel that empowers local communities in Nepal.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Leave a Mark | Explore With Sakar',
        description: 'Strategic volunteering and regenerative travel that empowers local communities in Nepal.',
        url: canonicalUrl,
        images: ['/explore-with-sakar/images/trails/river-gorge.jpg'],
      },
    };
  }

  if (params.slug === 'custom-private-journeys') {
    return {
      title: 'Custom Private Journeys | Explore With Sakar',
      description: 'Tailored private Himalayan routes designed around your passions, rhythm, and values.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Custom Private Journeys | Explore With Sakar',
        description: 'Tailored private Himalayan routes designed around your passions, rhythm, and values.',
        url: canonicalUrl,
        images: ['/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'],
      },
    };
  }

  if (params.slug === 'all-curated-experiences') {
    return {
      title: 'All Curated Experiences | Explore With Sakar',
      description: 'Explore our complete catalog of curated travel experiences across Nepal.',
      alternates: { canonical: canonicalUrl },
    };
  }

  const experience = await getPublicExperienceBySlug(params.slug);

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

  const coreSlugs = [
    'go-beyond',
    'go-spiritual',
    'feel-closer',
    'leave-a-mark',
    'all-curated-experiences',
    'custom-private-journeys',
  ];

  coreSlugs.forEach((s) => existingSlugs.add(s));

  return Array.from(existingSlugs).map((slug) => ({ slug }));
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = params;

  if (slug === 'all-curated-experiences') {
    redirect('/experience#catalog');
  }

  if (slug === 'go-beyond') {
    const pageContent = await getPageContent('go-beyond');
    return <GoBeyondExperience pageContent={pageContent} />;
  }

  if (slug === 'go-spiritual') {
    const pageContent = await getPageContent('go-spiritual');
    return <GoSpiritualExperience pageContent={pageContent} />;
  }

  if (slug === 'feel-closer') {
    const pageContent = await getPageContent('feel-closer');
    return <FeelCloserExperience pageContent={pageContent} />;
  }

  if (slug === 'leave-a-mark') {
    const pageContent = await getPageContent('leave-a-mark');
    return <LeaveAMarkExperience pageContent={pageContent} />;
  }

  if (slug === 'custom-private-journeys') {
    const pageContent = await getPageContent('custom-private-journeys');
    return <CustomJourneysExperience pageContent={pageContent} />;
  }

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

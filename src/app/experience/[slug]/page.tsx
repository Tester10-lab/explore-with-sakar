import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getLiveExperienceBySlug, getLiveExperiences } from '@/lib/cms';
import GoBeyondExperience from '@/components/experience/GoBeyondExperience';
import GoSpiritualExperience from '@/components/experience/GoSpiritualExperience';
import FeelCloserExperience from '@/components/experience/FeelCloserExperience';
import LeaveAMarkExperience from '@/components/experience/LeaveAMarkExperience';
import CustomJourneysExperience from '@/components/experience/CustomJourneysExperience';
import ExperienceDetailTemplate from '@/components/experience/ExperienceDetailTemplate';

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const baseUrl = 'https://explorewithsakar.com';
  const canonicalUrl = `${baseUrl}/experience/${params.slug}`;

  if (params.slug === 'go-beyond') {
    return {
      title: 'Go Beyond the Map | Explore With Sakar',
      description:
        'Living courtyards, medieval stone mysteries, ancient Silk Road trade corridors, and master artisan guilds with Sakar.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Go Beyond the Map | Explore With Sakar',
        description:
          'Living courtyards, medieval stone mysteries, and master artisan guilds with Sakar.',
        url: canonicalUrl,
        images: ['/images/beyond-the-map/living-courtyards.jpg'],
      },
    };
  }

  if (params.slug === 'go-spiritual') {
    return {
      title: 'Go Spiritual: Himalayan Sound & Mountain Stillness | Explore With Sakar',
      description:
        'Tibetan singing bowl sound therapy, dawn monastery chant pujas, and sacred Padmasambhava meditation caves with Sakar.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Go Spiritual | Explore With Sakar',
        description:
          'Tibetan singing bowl sound therapy, dawn monastery chant pujas, and sacred meditation caves.',
        url: canonicalUrl,
        images: ['/explore-with-sakar/images/spiritual/buddhist-stupa.jpg'],
      },
    };
  }

  if (params.slug === 'feel-closer') {
    return {
      title: 'Feel Closer: Village Homestays & Living Hearths | Explore With Sakar',
      description:
        'Stay under the slate roofs of Gurung and Tamang mountain homes. Share woodfire meals and forge lifelong human bonds with Sakar.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Feel Closer | Explore With Sakar',
        description:
          'Stay under the slate roofs of Gurung and Tamang mountain homes and share woodfire meals.',
        url: canonicalUrl,
        images: ['/explore-with-sakar/images/homestays/village-meal.jpg'],
      },
    };
  }

  if (params.slug === 'leave-a-mark') {
    return {
      title: 'Leave a Mark: Strategic Volunteer Tourism | Explore With Sakar',
      description:
        'Matching your professional skills with local communities in Nepal that need structural, strategic, and administrative empowerment.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Leave a Mark: Strategic Volunteer Tourism | Explore With Sakar',
        description:
          'Matching your professional skills with local communities in Nepal that need structural, strategic, and administrative empowerment.',
        url: canonicalUrl,
        images: ['/explore-with-sakar/images/trails/river-gorge.jpg'],
      },
    };
  }

  if (params.slug === 'custom-private-journeys') {
    return {
      title: 'Custom Private Journeys & Bespoke Planning | Explore With Sakar',
      description:
        '100% tailor-made Nepal itineraries for solo travelers, couples, and multi-generational families with Sakar.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: 'Custom Private Journeys | Explore With Sakar',
        description:
          '100% tailor-made Nepal itineraries designed around your dates, pace, and passions.',
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

  const experience = getLiveExperienceBySlug(params.slug);

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

export function generateStaticParams() {
  const experiences = getLiveExperiences(false);
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

export default function ExperienceDetailPage({ params }: Props) {
  const { slug } = params;

  if (slug === 'all-curated-experiences') {
    redirect('/experience#catalog');
  }

  if (slug === 'go-beyond') {
    return <GoBeyondExperience />;
  }

  if (slug === 'go-spiritual') {
    return <GoSpiritualExperience />;
  }

  if (slug === 'feel-closer') {
    return <FeelCloserExperience />;
  }

  if (slug === 'leave-a-mark') {
    return <LeaveAMarkExperience />;
  }

  if (slug === 'custom-private-journeys') {
    return <CustomJourneysExperience />;
  }

  const experience = getLiveExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const allExperiences = getLiveExperiences(false);
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

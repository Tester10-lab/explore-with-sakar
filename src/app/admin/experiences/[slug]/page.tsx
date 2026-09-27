import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ExperienceSlugRedirectPage({ params }: PageProps) {
  const rawSlug = decodeURIComponent(params?.slug || '').toLowerCase().trim();

  if (
    rawSlug === 'go within' ||
    rawSlug === 'go%20within' ||
    rawSlug === 'go-within' ||
    rawSlug === 'go-spiritual' ||
    rawSlug === 'spiritual-wellness' ||
    rawSlug === 'spiritual'
  ) {
    redirect('/admin/experiences/go-within');
  }

  if (
    rawSlug === 'leave a mark' ||
    rawSlug === 'leave%20a%20mark' ||
    rawSlug === 'leave-a-mark' ||
    rawSlug === 'responsible'
  ) {
    redirect('/admin/experiences/leave-a-mark');
  }

  if (
    rawSlug === 'beyond the map' ||
    rawSlug === 'beyond%20the%20map' ||
    rawSlug === 'beyond-the-map' ||
    rawSlug === 'go-beyond'
  ) {
    redirect('/admin/experiences/beyond-the-map');
  }

  if (
    rawSlug === 'go deeper' ||
    rawSlug === 'go%20deeper' ||
    rawSlug === 'go-deeper'
  ) {
    redirect('/admin/experiences/go-deeper');
  }

  if (
    rawSlug === 'feel closer' ||
    rawSlug === 'feel%20closer' ||
    rawSlug === 'feel-closer' ||
    rawSlug === 'homestays'
  ) {
    redirect('/admin/experiences/feel-closer');
  }

  if (
    rawSlug === 'custom journeys' ||
    rawSlug === 'custom%20journeys' ||
    rawSlug === 'custom-journeys' ||
    rawSlug === 'custom-journeys-hub'
  ) {
    redirect('/admin/experiences/custom-journeys-hub');
  }

  redirect('/admin/experiences');
}

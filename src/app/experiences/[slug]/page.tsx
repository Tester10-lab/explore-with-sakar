import { redirect } from 'next/navigation';

export default function ExperienceSlugRedirect({ params }: { params: { slug: string } }) {
  const map: Record<string, string> = {
    'beyond-the-map': 'go-beyond',
    'spiritual-wellness': 'go-spiritual',
    'homestays': 'feel-closer',
    'leave-a-mark': 'leave-a-mark',
    'custom-journeys': 'custom-private-journeys',
  };
  redirect(`/experience/${map[params.slug] || params.slug}`);
}

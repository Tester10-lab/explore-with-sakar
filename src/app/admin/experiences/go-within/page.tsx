'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import ExperienceHubTemplate from '@/components/admin/ExperienceHubTemplate';

export default function GoWithinHubPage() {
  return (
    <ExperienceHubTemplate
      experienceName="Go Within"
      experienceDescription="Himalayan singing bowl resonance, monastery chanting & meditation caves. Manage packages and content for this experience."
      experienceSlug="go-within"
      publicUrl="/experiences/go-within"
      pillarFilterValue="go-within"
      icon={Sparkles}
      colorFrom="from-indigo-50"
      colorTo="to-purple-50"
      colorBorder="border-indigo-200"
      colorBg="bg-indigo-100"
      colorText="text-indigo-700"
      colorHover="hover:border-indigo-300"
    />
  );
}

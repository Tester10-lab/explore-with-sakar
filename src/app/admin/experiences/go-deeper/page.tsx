'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import ExperienceHubTemplate from '@/components/admin/ExperienceHubTemplate';

export default function GoDeepHubPage() {
  return (
    <ExperienceHubTemplate
      experienceName="Go Deeper"
      experienceDescription="Immersive deep-dive journeys into Nepal's hidden layers and living traditions. Manage packages and content for this experience."
      experienceSlug="go-deeper"
      publicUrl="/experiences/go-deeper"
      pillarFilterValue="go-deeper"
      icon={Layers}
      colorFrom="from-slate-50"
      colorTo="to-slate-50"
      colorBorder="border-slate-200"
      colorBg="bg-slate-100"
      colorText="text-slate-900"
      colorHover="hover:border-terracotta"
    />
  );
}

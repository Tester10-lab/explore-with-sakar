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
      colorFrom="from-slate-50"
      colorTo="to-slate-50"
      colorBorder="border-slate-200"
      colorBg="bg-slate-100"
      colorText="text-slate-900"
      colorHover="hover:border-terracotta"
    />
  );
}

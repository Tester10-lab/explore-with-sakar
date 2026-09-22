'use client';

import React from 'react';
import { Compass } from 'lucide-react';
import ExperienceHubTemplate from '@/components/admin/ExperienceHubTemplate';

export default function BeyondTheMapHubPage() {
  return (
    <ExperienceHubTemplate
      experienceName="Beyond the Map"
      experienceDescription="Living courtyards, medieval stone mysteries & master artisan guilds. Manage packages and content for this experience."
      experienceSlug="beyond-the-map"
      publicUrl="/experiences/beyond-the-map"
      pillarFilterValue="beyond-the-map"
      icon={Compass}
      colorFrom="from-slate-50"
      colorTo="to-slate-50"
      colorBorder="border-slate-200"
      colorBg="bg-slate-100"
      colorText="text-slate-900"
      colorHover="hover:border-terracotta"
    />
  );
}

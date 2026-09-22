'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import ExperienceHubTemplate from '@/components/admin/ExperienceHubTemplate';

export default function LeaveAMarkHubPage() {
  return (
    <ExperienceHubTemplate
      experienceName="Leave a Mark"
      experienceDescription="Strategic volunteer tourism & administrative empowerment for grassroots communities. Manage packages and content for this experience."
      experienceSlug="leave-a-mark"
      publicUrl="/experiences/leave-a-mark"
      pillarFilterValue="leave-a-mark"
      icon={Heart}
      colorFrom="from-slate-50"
      colorTo="to-slate-50"
      colorBorder="border-slate-200"
      colorBg="bg-slate-100"
      colorText="text-slate-900"
      colorHover="hover:border-terracotta"
    />
  );
}

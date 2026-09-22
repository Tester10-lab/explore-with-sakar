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
      colorFrom="from-rose-50"
      colorTo="to-pink-50"
      colorBorder="border-rose-200"
      colorBg="bg-rose-100"
      colorText="text-rose-700"
      colorHover="hover:border-rose-300"
    />
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminServicesPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/experiences');
  }, [router]);

  return (
    <div className="py-20 text-center text-sm text-slate-500">
      Redirecting to Experiences...
    </div>
  );
}

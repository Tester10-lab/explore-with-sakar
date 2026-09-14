'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AdminContext } from '@/components/admin/AdminLayoutContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="admin-clean-theme min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-terracotta/20 selection:text-terracotta">
        {children}
      </div>
    );
  }

  return (
    <AdminContext.Provider
      value={{
        isMobileSidebarOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
      }}
    >
      <div className="admin-clean-theme min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-terracotta/20 selection:text-terracotta flex">
        <AdminSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
          <main className="flex-1 pb-16">{children}</main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

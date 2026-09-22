'use client';

import React from 'react';
import { Menu, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAdminLayout } from '@/components/admin/AdminLayoutContext';

interface AdminHeaderProps {
  onToggleMobileSidebar?: () => void;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  actionButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  children?: React.ReactNode;
}

export default function AdminHeader({
  onToggleMobileSidebar,
  title,
  subtitle,
  action,
  actionButton,
  children,
}: AdminHeaderProps) {
  const { toggleMobileSidebar } = useAdminLayout();
  const handleToggle = () => {
    if (typeof onToggleMobileSidebar === 'function') {
      try {
        onToggleMobileSidebar();
      } catch (err) {
        console.error('onToggleMobileSidebar error:', err);
      }
    }
    toggleMobileSidebar();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 sm:py-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Hamburger & Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={handleToggle}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation cursor-pointer border border-slate-200 shadow-xs shrink-0 select-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="font-editorial-serif text-lg sm:text-2xl font-bold text-slate-900 leading-tight truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 font-light mt-0.5 line-clamp-1 sm:line-clamp-none">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions / Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap shrink-0 w-full sm:w-auto justify-end">
          {action}
          {children}
          {actionButton && (
            actionButton.href ? (
              <Link
                href={actionButton.href}
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all min-h-[40px] touch-manipulation"
              >
                {actionButton.icon || <Plus className="w-3.5 h-3.5" />}
                <span>{actionButton.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={actionButton.onClick}
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all min-h-[40px] touch-manipulation cursor-pointer"
              >
                {actionButton.icon || <Plus className="w-3.5 h-3.5" />}
                <span>{actionButton.label}</span>
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import { Menu, Plus, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  onToggleMobileSidebar?: () => void;
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
}

export default function AdminHeader({
  onToggleMobileSidebar,
  title,
  subtitle,
  actionButton,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 font-light mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actionButton && (
          actionButton.href ? (
            <Link
              href={actionButton.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              {actionButton.icon || <Plus className="w-3.5 h-3.5" />}
              <span>{actionButton.label}</span>
            </Link>
          ) : (
            <button
              onClick={actionButton.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              {actionButton.icon || <Plus className="w-3.5 h-3.5" />}
              <span>{actionButton.label}</span>
            </button>
          )
        )}
      </div>
    </header>
  );
}

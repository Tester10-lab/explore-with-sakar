'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Globe,
  Layers,
  FileText,
  Image as ImageIcon,
  Star,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  ChevronRight,
  Package as PackageIcon,
  Compass,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadInquiries, setUnreadInquiries] = useState<number>(0);

  useEffect(() => {
    async function fetchUnreadCount() {
      try {
        const res = await fetch('/api/admin/inquiries');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.inquiries)) {
            const unread = data.inquiries.filter((i: any) => i.status === 'unread').length;
            setUnreadInquiries(unread);
          }
        }
      } catch {
        // Ignore background polling error
      }
    }

    fetchUnreadCount();
  }, [pathname]);

  const NAV_ITEMS = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Inquiries',
      href: '/admin/inquiries',
      icon: Inbox,
      badge: unreadInquiries > 0 ? unreadInquiries : null,
    },
    {
      label: 'Homepage CMS',
      href: '/admin/homepage',
      icon: Globe,
      badge: null,
    },
    {
      label: 'Services / Pillars',
      href: '/admin/services',
      icon: Layers,
      badge: null,
    },
    {
      label: 'Packages',
      href: '/admin/packages',
      icon: PackageIcon,
      badge: null,
    },
    {
      label: 'Itineraries',
      href: '/admin/experiences',
      icon: Compass,
      badge: null,
    },
    {
      label: 'Blogs',
      href: '/admin/blogs',
      icon: FileText,
      badge: null,
    },
    {
      label: 'Photos',
      href: '/admin/photos',
      icon: ImageIcon,
      badge: null,
    },
    {
      label: 'Reviews',
      href: '/admin/reviews',
      icon: Star,
      badge: null,
    },
    {
      label: 'Settings & Contact',
      href: '/admin/settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-lg lg:shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding & Navigation with Scroll Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-5 border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-3 group"
              onClick={onClose}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-terracotta transition-colors">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="font-editorial-serif text-lg font-bold text-slate-900 tracking-tight leading-none">
                  Sakar CMS
                </h1>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1">
                  Admin Portal
                </p>
              </div>
            </Link>

            {/* Close button on mobile */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge !== null && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-200 space-y-1.5 bg-slate-50/50">
          {/* Public site shortcut */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-all border border-slate-200"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Public Site</span>
            </span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all text-left"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}

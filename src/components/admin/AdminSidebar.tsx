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
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-himalaya-950 border-r border-himalaya-850 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding & Navigation with Scroll Container */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-himalaya-800">
          <div className="p-6 border-b border-himalaya-850 sticky top-0 bg-himalaya-950/95 backdrop-blur-sm z-10">
            <Link
              href="/admin"
              className="flex items-center gap-3 group"
              onClick={onClose}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white shadow-warm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-editorial-serif text-lg font-bold text-parchment-100 tracking-tight leading-none group-hover:text-terracotta-light transition-colors">
                  Sakar CMS
                </h1>
                <p className="text-[10px] uppercase font-mono tracking-widest text-himalaya-400 mt-1">
                  Admin Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
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
                      ? 'bg-terracotta text-white font-semibold shadow-subtle'
                      : 'text-parchment-300 hover:text-white hover:bg-himalaya-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-himalaya-400 group-hover:text-parchment-200'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge !== null && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-saffron text-himalaya-950 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-himalaya-850 space-y-2">
          {/* Public site shortcut */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-parchment-300 hover:text-white hover:bg-himalaya-900 transition-all border border-himalaya-800"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Public Site</span>
            </span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/50 transition-all text-left"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}

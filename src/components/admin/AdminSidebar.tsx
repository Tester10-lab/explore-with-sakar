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
  Compass,
  X,
  Calendar,
  MapPin,
  HelpCircle,
  Menu as MenuIcon,
  BookOpen,
  Heart,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode | number | null;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadInquiries, setUnreadInquiries] = useState<number>(0);

  useEffect(() => {
    async function fetchUnreadCount() {
      try {
        const res = await fetch('/api/admin/inquiries?countOnly=true');
        if (res.ok) {
          const data = await res.json();
          if (typeof data.unreadCount === 'number') {
            setUnreadInquiries(data.unreadCount);
          } else if (Array.isArray(data.inquiries)) {
            const unread = data.inquiries.filter((i: any) => i.status === 'unread').length;
            setUnreadInquiries(unread);
          }
        }
      } catch {
        // Ignore background polling error
      }
    }

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const NAV_GROUPS: NavGroup[] = [
    {
      title: 'Dashboard & Inquiries',
      items: [
        {
          label: 'Dashboard',
          href: '/admin',
          icon: LayoutDashboard,
          badge: null,
          exact: true,
        },
        {
          label: 'Inquiries',
          href: '/admin/inquiries',
          icon: Inbox,
          badge: unreadInquiries > 0 ? unreadInquiries : null,
        },
      ],
    },
    {
      title: 'Experiences',
      items: [
        {
          label: 'Beyond the Map',
          href: '/admin/experiences/beyond-the-map',
          icon: Compass,
        },
        {
          label: 'Go Within',
          href: '/admin/experiences/go-within',
          icon: Sparkles,
        },
        {
          label: 'Go Deeper',
          href: '/admin/experiences/go-deeper',
          icon: Layers,
        },
        {
          label: 'Leave a Mark',
          href: '/admin/experiences/leave-a-mark',
          icon: Heart,
        },
      ],
    },
    {
      title: 'Blog & Stories',
      items: [
        {
          label: 'Blog & Stories',
          href: '/admin/blogs',
          icon: FileText,
        },
      ],
    },
    {
      title: 'Content & Media',
      items: [
        {
          label: 'Photo Gallery',
          href: '/admin/photos',
          icon: ImageIcon,
        },
        {
          label: 'Traveler Reviews',
          href: '/admin/reviews',
          icon: Star,
        },
        {
          label: 'Digital Reviews',
          href: '/admin/reviews?tab=testimonials',
          icon: BookOpen,
        },
      ],
    },
    {
      title: 'Site Configuration',
      items: [
        {
          label: 'Homepage Content',
          href: '/admin/homepage',
          icon: Globe,
        },
        {
          label: 'Pages',
          href: '/admin/pages',
          icon: Layers,
        },
        {
          label: 'Navigation',
          href: '/admin/navigation',
          icon: MenuIcon,
        },
        {
          label: 'FAQ',
          href: '/admin/faq',
          icon: HelpCircle,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          label: 'Settings & Guide',
          href: '/admin/settings',
          icon: Settings,
        },
      ],
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-sm ${
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto visible'
            : '-translate-x-full opacity-0 pointer-events-none invisible lg:opacity-100 lg:pointer-events-auto lg:visible'
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

          {/* Grouped Navigation */}
          <nav className="p-3 space-y-5">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </h3>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = item.exact
                      ? pathname === item.href
                      : pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                          isActive
                            ? 'bg-slate-900 text-white font-semibold shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge !== null && item.badge !== undefined && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                              {item.badge}
                            </span>
                          )}
                          {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-200 space-y-1.5 bg-slate-50/50">
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

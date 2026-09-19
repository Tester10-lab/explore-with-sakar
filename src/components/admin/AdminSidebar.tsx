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
  Calendar,
  MapPin,
  HelpCircle,
  Menu as MenuIcon,
  Eye,
  Heart,
  Home,
  BookOpen,
  Users,
  Phone,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavSection {
  title?: string;
  items: {
    label: string;
    href: string;
    icon: any;
    badge?: number | string | null;
  }[];
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

  // Exact 1:1 match with current public website hierarchy and names
  const NAV_SECTIONS: NavSection[] = [
    {
      items: [
        {
          label: 'Dashboard',
          href: '/admin',
          icon: LayoutDashboard,
        },
        {
          label: 'Live Website Preview',
          href: '/admin/preview',
          icon: Eye,
        },
      ],
    },
    {
      title: 'EXPERIENCES',
      items: [
        {
          label: 'Go Beyond the Map',
          href: '/admin/pages/beyond-the-map',
          icon: Compass,
        },
        {
          label: 'Go Within',
          href: '/admin/pages/spiritual-wellness',
          icon: Sparkles,
        },
        {
          label: 'Feel Closer',
          href: '/admin/pages/homestays',
          icon: Home,
        },
        {
          label: 'Leave a Mark',
          href: '/admin/pages/leave-a-mark',
          icon: Heart,
        },
        {
          label: 'All Curated Experiences',
          href: '/admin/experiences',
          icon: Calendar,
        },
        {
          label: 'Custom Private Journeys',
          href: '/admin/pages/custom-journeys',
          icon: ShieldCheck,
        },
      ],
    },
    {
      title: 'EVENTS',
      items: [
        {
          label: 'Events & Festivals',
          href: '/admin/events',
          icon: Calendar,
        },
      ],
    },
    {
      title: 'STORIES',
      items: [
        {
          label: 'Sakar’s Journal & Blogs',
          href: '/admin/blogs',
          icon: BookOpen,
        },
        {
          label: 'Traveler Reviews & Guestbook',
          href: '/admin/reviews',
          icon: Star,
        },
      ],
    },
    {
      title: 'ABOUT SAKAR',
      items: [
        {
          label: 'About Sakar & Story',
          href: '/admin/pages/about',
          icon: Users,
        },
      ],
    },
    {
      title: 'HOMEPAGE',
      items: [
        {
          label: 'Homepage Sections',
          href: '/admin/homepage',
          icon: Globe,
        },
      ],
    },
    {
      title: 'EXPLORE & GUIDES',
      items: [
        {
          label: 'Destinations',
          href: '/admin/destinations',
          icon: MapPin,
        },
        {
          label: 'Packages & Pricing',
          href: '/admin/packages',
          icon: PackageIcon,
        },
        {
          label: 'Visual Journey Gallery',
          href: '/admin/photos',
          icon: ImageIcon,
        },
        {
          label: 'Frequently Asked Questions',
          href: '/admin/faq',
          icon: HelpCircle,
        },
        {
          label: 'Travel Resources & Visas',
          href: '/admin/pages/resources',
          icon: FileText,
        },
      ],
    },
    {
      title: 'INQUIRIES & CONTACT',
      items: [
        {
          label: 'Guest Inquiries',
          href: '/admin/inquiries',
          icon: Inbox,
          badge: unreadInquiries > 0 ? unreadInquiries : null,
        },
        {
          label: 'Contact & Inquiries Page',
          href: '/admin/pages/contact',
          icon: Phone,
        },
      ],
    },
    {
      title: 'WEBSITE MANAGEMENT',
      items: [
        {
          label: 'All Website Pages',
          href: '/admin/pages',
          icon: Layers,
        },
        {
          label: 'Navigation & Menus',
          href: '/admin/navigation',
          icon: MenuIcon,
        },
        {
          label: 'Site Settings & Branding',
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
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
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

          {/* Navigation Sections */}
          <div className="p-3 space-y-6">
            {NAV_SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {section.title && (
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                    {section.title}
                  </p>
                )}

                {section.items.map((item) => {
                  const isActive =
                    item.href === '/admin'
                      ? pathname === '/admin'
                      : pathname === item.href || (item.href !== '/admin/services' && pathname.startsWith(item.href));

                  const Icon = item.icon;

                  return (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
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
                        {item.badge !== undefined && item.badge !== null && (
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
            ))}
          </div>
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

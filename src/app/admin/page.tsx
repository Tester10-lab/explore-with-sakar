'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Image as ImageIcon,
  Star,
  Settings,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Phone,
  MessageCircle,
  Package as PackageIcon,
  Compass,
  Inbox,
  Globe,
  Layers,
  Mail,
  Calendar,
  MapPin,
  HelpCircle,
  Menu as MenuIcon,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  ExtendedBlogPost,
  ExtendedGalleryPhoto,
  ExtendedTestimonial,
  ExtendedPackage,
  ExtendedExperience,
  ExtendedServicePillar,
  ContactInquiry,
  WebsiteSettings,
} from '@/types/cms';

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<ExtendedPackage[]>([]);
  const [experiences, setExperiences] = useState<ExtendedExperience[]>([]);
  const [services, setServices] = useState<ExtendedServicePillar[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [blogs, setBlogs] = useState<ExtendedBlogPost[]>([]);
  const [photos, setPhotos] = useState<ExtendedGalleryPhoto[]>([]);
  const [reviews, setReviews] = useState<ExtendedTestimonial[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [faq, setFaq] = useState<any[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        const [pkgsRes, expsRes, srvRes, inqRes, blogsRes, photosRes, reviewsRes, settingsRes, pagesRes, eventsRes, destsRes, faqRes] =
          await Promise.all([
            fetch('/api/admin/packages'),
            fetch('/api/admin/experiences'),
            fetch('/api/admin/services'),
            fetch('/api/admin/inquiries'),
            fetch('/api/admin/blogs'),
            fetch('/api/admin/photos'),
            fetch('/api/admin/reviews'),
            fetch('/api/admin/settings'),
            fetch('/api/admin/pages'),
            fetch('/api/admin/events'),
            fetch('/api/admin/destinations'),
            fetch('/api/admin/faq'),
          ]);

        if (pkgsRes.ok) {
          const data = await pkgsRes.json();
          setPackages(data.packages || []);
        }
        if (expsRes.ok) {
          const data = await expsRes.json();
          setExperiences(data.experiences || []);
        }
        if (srvRes.ok) {
          const data = await srvRes.json();
          setServices(data.services || []);
        }
        if (inqRes.ok) {
          const data = await inqRes.json();
          setInquiries(data.inquiries || []);
        }
        if (blogsRes.ok) {
          const data = await blogsRes.json();
          setBlogs(data.blogs || []);
        }
        if (photosRes.ok) {
          const data = await photosRes.json();
          setPhotos(data.photos || []);
        }
        if (reviewsRes.ok) {
          const data = await reviewsRes.json();
          setReviews(data.reviews || []);
        }
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          setSettings(data.settings);
        }
        if (pagesRes.ok) {
          const data = await pagesRes.json();
          setPages(data.pages || []);
        }
        if (eventsRes.ok) {
          const data = await eventsRes.json();
          setEvents(data.events || []);
        }
        if (destsRes.ok) {
          const data = await destsRes.json();
          setDestinations(data.destinations || []);
        }
        if (faqRes.ok) {
          const data = await faqRes.json();
          setFaq(data.faq || []);
        }
      } catch (err) {
        console.error('Failed to load admin dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const publishedBlogs = blogs.filter((b) => b.status === 'published');
  const visibleReviews = reviews.filter((r) => r.isVisible);
  const publishedPackages = packages.filter((p) => p.status === 'published');
  const publishedExperiences = experiences.filter((e) => e.status === 'published');
  const unreadInquiries = inquiries.filter((i) => i.status === 'unread');

  return (
    <div className="space-y-6">
      <AdminHeader
        onToggleMobileSidebar={() => {}}
        title="Dashboard Overview"
        subtitle="Manage guest inquiries, experiences, events, stories, and website pages matching the public website."
        actionButton={{
          label: 'View Inquiries',
          href: '/admin/inquiries',
          icon: <Inbox className="w-4 h-4" />,
        }}
      />

      <div className="px-4 sm:px-8 space-y-8 max-w-7xl mx-auto">
        {/* Quick Action Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                Quick Website Actions
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Direct shortcuts matching the public website navigation and customer entrypoints
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <Link
                href="/admin/pages"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>All Website Pages</span>
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded-full font-bold">
                  {pages.length}
                </span>
              </Link>
              <Link
                href="/admin/preview"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>Live Preview</span>
              </Link>
              <Link
                href="/admin/inquiries"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Guest Inquiries</span>
                {unreadInquiries.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-white text-terracotta text-[10px] rounded-full font-bold">
                    {unreadInquiries.length}
                  </span>
                )}
              </Link>
              <Link
                href="/admin/events"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Events</span>
              </Link>
              <Link
                href="/admin/blogs"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-rose-600" />
                <span>Stories (Blogs)</span>
              </Link>
              <Link
                href="/admin/destinations"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Destinations</span>
              </Link>
              <Link
                href="/admin/faq"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>FAQ</span>
              </Link>
              <Link
                href="/admin/navigation"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <MenuIcon className="w-3.5 h-3.5 text-slate-600" />
                <span>Navigation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Overview Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Card: Public Pages */}
          <Link
            href="/admin/pages"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                All Website Pages
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : pages.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-bold">
                {pages.filter((p: any) => p.status === 'published').length} Live Pages
              </span>
            </div>
          </Link>

          {/* Card: Inquiries */}
          <Link
            href="/admin/inquiries"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Guest Inquiries
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : inquiries.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-amber-600 font-bold">{unreadInquiries.length} Awaiting Reply</span>
            </div>
          </Link>

          {/* Card: Experiences: Travel Pillars */}
          <Link
            href="/admin/services"
            className="group bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Pillars & Curation
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : services.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{services.length} Core Pillars</span>
            </div>
          </Link>

          {/* Card: Curated Experiences */}
          <Link
            href="/admin/experiences"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Curated Experiences
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : experiences.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{publishedExperiences.length} Live Itineraries</span>
            </div>
          </Link>

          {/* Card: Events & Festivals */}
          <Link
            href="/admin/events"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Events & Festivals
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : events.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">
                {events.filter((e: any) => e.isVisible !== false).length} Active Gatherings
              </span>
            </div>
          </Link>

          {/* Card: Stories: Sakar's Journal & Blogs */}
          <Link
            href="/admin/blogs"
            className="group bg-white border border-slate-200 hover:border-terracotta/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Sakar’s Journal
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-terracotta flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : blogs.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{publishedBlogs.length} Published Stories</span>
            </div>
          </Link>

          {/* Card: Stories: Traveler Reviews & Guestbook */}
          <Link
            href="/admin/reviews"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Reviews & Guestbook
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : reviews.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{visibleReviews.length} Approved Reflections</span>
            </div>
          </Link>

          {/* Card: Destinations */}
          <Link
            href="/admin/destinations"
            className="group bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Destinations
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : destinations.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">
                {destinations.filter((d: any) => d.isVisible !== false).length} Valleys & Regions
              </span>
            </div>
          </Link>

          {/* Card: Packages & Pricing */}
          <Link
            href="/admin/packages"
            className="group bg-white border border-slate-200 hover:border-terracotta/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Packages & Pricing
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-terracotta flex items-center justify-center group-hover:scale-110 transition-transform">
                <PackageIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : packages.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{publishedPackages.length} Packages Live</span>
            </div>
          </Link>

          {/* Card: Frequently Asked Questions */}
          <Link
            href="/admin/faq"
            className="group bg-white border border-slate-200 hover:border-blue-500/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Frequently Asked Questions
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : faq.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">
                {faq.filter((f: any) => f.isVisible !== false).length} Q&As Live
              </span>
            </div>
          </Link>
        </div>

        {/* Public Pages Directory & Section Manager Widget */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                  Public Website Pages Inventory
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Inspect and customize visual layout sections for each public route on the website
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/preview"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>Multi-Device Preview</span>
              </Link>
              <Link
                href="/admin/pages"
                className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
              >
                <span>Manage All ({pages.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pages.slice(0, 9).map((page: any) => {
              const hierarchy = [
                'beyond-the-map', 'spiritual-wellness', 'homestays', 'leave-a-mark', 'experiences', 'custom-journeys', 'services'
              ].includes(page.slug)
                ? 'EXPERIENCES'
                : page.slug === 'events'
                ? 'EVENTS'
                : ['blog', 'reviews'].includes(page.slug)
                ? 'STORIES'
                : page.slug === 'about'
                ? 'ABOUT SAKAR'
                : page.slug === 'home'
                ? 'HOMEPAGE'
                : ['destinations', 'packages', 'gallery', 'faq', 'resources'].includes(page.slug)
                ? 'EXPLORE & GUIDES'
                : 'INQUIRIES & LEGAL';

              return (
                <div
                  key={page.slug}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm text-slate-900 truncate">
                        {page.name}
                      </h4>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                        {hierarchy}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase ${
                          page.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {page.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono truncate mt-0.5">
                      {page.url} • {page.sections?.length || 0} sections
                    </p>
                  </div>

                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold transition-all shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Inquiries Widget */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-terracotta" />
              <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                Latest Traveler Inquiries
              </h3>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
            >
              <span>View All Inquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              No inquiries received yet. Booking inquiries will appear here as travelers submit the contact forms.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span>{inq.fullName}</span>
                      {inq.country && (
                        <span className="text-slate-400 font-normal">({inq.country})</span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                          inq.status === 'unread'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-slate-500 line-clamp-1 mt-0.5">
                      {inq.message || inq.travelStyle || 'Interested in Nepal consultation'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {inq.whatsapp && (
                      <a
                        href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-semibold border border-emerald-200 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    <Link
                      href="/admin/inquiries"
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Section: Recent Blogs & Photos Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Recent Blogs */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                  Recent Blog Articles
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Latest stories published or drafted
                </p>
              </div>

              <Link
                href="/admin/blogs"
                className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {blogs.slice(0, 5).map((blog) => (
                <div
                  key={blog.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 relative">
                      <img
                        src={blog.featuredImage?.src || '/images/mountains/sunrise-himalayas.jpg'}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="text-terracotta font-medium">{blog.category}</span>
                        <span>•</span>
                        <span>{blog.publishedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        blog.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {blog.status}
                    </span>
                    <Link
                      href={`/admin/blogs/${blog.slug}`}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Recent Photos & Active Reviews */}
          <div className="lg:col-span-5 space-y-6">
            {/* Photos Preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                  Gallery Highlights
                </h3>
                <Link
                  href="/admin/photos"
                  className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
                >
                  <span>Manage</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 6).map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 group"
                  >
                    <img
                      src={photo.image}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {photo.featured && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 shadow-sm" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews Preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                  Customer Reviews
                </h3>
                <Link
                  href="/admin/reviews"
                  className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
                >
                  <span>All ({reviews.length})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {reviews.slice(0, 2).map((review) => (
                  <div
                    key={review.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {review.author} {review.countryFlag}
                      </span>
                      <div className="flex text-amber-500">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 italic line-clamp-2">
                      &ldquo;{review.highlight || review.quote}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

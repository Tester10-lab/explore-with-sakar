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
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        const [pkgsRes, expsRes, srvRes, inqRes, blogsRes, photosRes, reviewsRes, settingsRes] =
          await Promise.all([
            fetch('/api/admin/packages'),
            fetch('/api/admin/experiences'),
            fetch('/api/admin/services'),
            fetch('/api/admin/inquiries'),
            fetch('/api/admin/blogs'),
            fetch('/api/admin/photos'),
            fetch('/api/admin/reviews'),
            fetch('/api/admin/settings'),
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
        subtitle="Manage leads, travel pillars, packages, itineraries, journal essays, and website settings."
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
                Quick CMS Actions
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Direct shortcuts to incoming leads, homepage configuration, and travel offerings
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
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
                href="/admin/homepage"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span>Homepage CMS</span>
              </Link>
              <Link
                href="/admin/services"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Travel Pillars</span>
              </Link>
              <Link
                href="/admin/packages"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <PackageIcon className="w-3.5 h-3.5 text-slate-600" />
                <span>Packages</span>
              </Link>
              <Link
                href="/admin/blogs/new"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Write Blog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 6 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Card 1: Inquiries */}
          <Link
            href="/admin/inquiries"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Inquiries
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

          {/* Card 2: Services / Pillars */}
          <Link
            href="/admin/services"
            className="group bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Pillars
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : services.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{services.length} Live Pillars</span>
            </div>
          </Link>

          {/* Card 3: Packages */}
          <Link
            href="/admin/packages"
            className="group bg-white border border-slate-200 hover:border-terracotta/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Packages
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-terracotta flex items-center justify-center group-hover:scale-110 transition-transform">
                <PackageIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : packages.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{publishedPackages.length} Published</span>
            </div>
          </Link>

          {/* Card 4: Itineraries */}
          <Link
            href="/admin/experiences"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Itineraries
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : experiences.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{publishedExperiences.length} Live</span>
            </div>
          </Link>

          {/* Card 5: Blogs */}
          <Link
            href="/admin/blogs"
            className="group bg-white border border-slate-200 hover:border-terracotta/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Blogs
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-terracotta flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : blogs.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{publishedBlogs.length} Stories</span>
            </div>
          </Link>

          {/* Card 6: Reviews */}
          <Link
            href="/admin/reviews"
            className="group bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                Reviews
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-editorial-serif text-slate-900 mb-1">
              {isLoading ? '...' : reviews.length}
            </div>
            <div className="text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">{visibleReviews.length} Active</span>
            </div>
          </Link>
        </div>

        {/* Recent Inquiries List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                Latest Guest Inquiries
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Prospective travelers who submitted the website inquiry form
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No inquiries yet. When travelers contact you, their submissions will appear here.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 truncate">
                        {inq.fullName}
                      </span>
                      {inq.status === 'unread' && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900">
                          NEW
                        </span>
                      )}
                      <span className="text-slate-400 text-[11px]">
                        {inq.createdAt?.split('T')[0]}
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

        {/* Additional Management Links (Compact Footer Banner) */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="font-medium text-slate-600">Additional Content:</span>
          <div className="flex flex-wrap items-center gap-4 font-semibold">
            <Link href="/admin/events" className="hover:text-terracotta transition-colors flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Events</span>
            </Link>
            <Link href="/admin/destinations" className="hover:text-terracotta transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Destinations</span>
            </Link>
            <Link href="/admin/faq" className="hover:text-terracotta transition-colors flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>FAQ</span>
            </Link>
            <Link href="/admin/navigation" className="hover:text-terracotta transition-colors flex items-center gap-1">
              <MenuIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>Navigation Menus</span>
            </Link>
            <Link href="/admin/settings" className="hover:text-terracotta transition-colors flex items-center gap-1">
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

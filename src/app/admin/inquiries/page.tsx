'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Users,
  MapPin,
  Compass,
  Home,
  Check,
  X,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { ContactInquiry } from '@/types/cms';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      } else {
        addToast('error', 'Failed to load inquiries');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    newStatus: 'unread' | 'read' | 'replied'
  ) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        addToast('success', `Marked inquiry as ${newStatus}`);
      } else {
        const errorData = await res.json().catch(() => ({}));
        addToast('error', errorData.error || 'Failed to update status');
      }
    } catch {
      addToast('error', 'Network error updating inquiry');
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${deleteTargetId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== deleteTargetId));
        if (selectedInquiry?.id === deleteTargetId) {
          setSelectedInquiry(null);
        }
        addToast('success', 'Inquiry deleted successfully');
      } else {
        const errorData = await res.json().catch(() => ({}));
        addToast('error', errorData.error || 'Failed to delete inquiry');
      }
    } catch {
      addToast('error', 'Network error deleting inquiry');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (statusFilter !== 'all' && inq.status !== statusFilter) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        inq.fullName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.country && inq.country.toLowerCase().includes(q)) ||
        (inq.whatsapp && inq.whatsapp.includes(q)) ||
        inq.message.toLowerCase().includes(q)
      );
    });
  }, [inquiries, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const unread = inquiries.filter((i) => i.status === 'unread').length;
    const replied = inquiries.filter((i) => i.status === 'replied').length;
    return { total, unread, replied };
  }, [inquiries]);

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <AdminHeader
        title="Traveler Inquiries & Leads"
        subtitle="Manage and respond directly to private journey and custom trip consultation requests."
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-himalaya-400 font-semibold">
              Total Inquiries
            </p>
            <p className="font-editorial-serif text-3xl font-bold text-white mt-1">
              {stats.total}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-himalaya-800 text-parchment-200 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-saffron-light font-semibold">
              Awaiting Response
            </p>
            <p className="font-editorial-serif text-3xl font-bold text-saffron mt-1">
              {stats.unread}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-saffron/15 text-saffron flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Replied & Connected
            </p>
            <p className="font-editorial-serif text-3xl font-bold text-emerald-400 mt-1">
              {stats.replied}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-himalaya-950 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {(['all', 'unread', 'read', 'replied'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-terracotta text-white shadow-subtle'
                  : 'text-parchment-300 hover:text-white hover:bg-himalaya-850'
              }`}
            >
              {tab === 'all' ? 'All Inquiries' : tab}
              {tab === 'unread' && stats.unread > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-white text-terracotta text-[10px] rounded-full font-bold">
                  {stats.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input & Refresh Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himalaya-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, country..."
              className="w-full pl-9 pr-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta"
            />
          </div>

          <button
            onClick={fetchInquiries}
            className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 hover:text-white transition-colors"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl overflow-hidden shadow-floating">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-himalaya-800 bg-himalaya-950/60 text-[11px] font-bold uppercase tracking-wider text-himalaya-400">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Traveler</th>
                <th className="py-3.5 px-4">Trip Details</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-himalaya-850 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-himalaya-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-terracotta" />
                    <span>Loading inquiries...</span>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-himalaya-400">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40 text-himalaya-500" />
                    <p className="font-semibold text-parchment-200">No inquiries found</p>
                    <p className="text-[11px] text-himalaya-500 mt-0.5">
                      {searchQuery
                        ? 'Try clearing your search query.'
                        : 'New inquiries submitted via the website booking forms will appear here.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const isUnread = inq.status === 'unread';

                  return (
                    <tr
                      key={inq.id}
                      className={`hover:bg-himalaya-850/60 transition-colors ${
                        isUnread ? 'bg-terracotta/5' : ''
                      }`}
                    >
                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-himalaya-300">
                        {formatDate(inq.createdAt)}
                      </td>

                      {/* Traveler */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-parchment-100 flex items-center gap-1.5">
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-saffron shrink-0" />
                          )}
                          <span>{inq.fullName}</span>
                        </div>
                        <div className="text-[11px] text-himalaya-400 mt-0.5 flex items-center gap-2">
                          <span>{inq.email}</span>
                          {inq.country && (
                            <span className="text-himalaya-500">• {inq.country}</span>
                          )}
                        </div>
                      </td>

                      {/* Trip Details */}
                      <td className="py-3.5 px-4">
                        <div className="text-parchment-200 font-medium">
                          {inq.approximateDuration || inq.travelDates || 'Custom Dates'}
                        </div>
                        <div className="text-[11px] text-himalaya-400 truncate max-w-[220px]">
                          {inq.travelersCount ? `${inq.travelersCount} • ` : ''}
                          {inq.travelStyle || 'Slow & Meaningful'}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === 'unread'
                              ? 'bg-saffron/20 text-saffron border border-saffron/40'
                              : inq.status === 'replied'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50'
                              : 'bg-himalaya-800 text-parchment-300 border border-himalaya-700'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedInquiry(inq);
                              if (inq.status === 'unread') {
                                handleUpdateStatus(inq.id, 'read');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-himalaya-800 hover:bg-terracotta text-parchment-200 hover:text-white transition-all"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {inq.whatsapp && (
                            <a
                              href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Namaste ${inq.fullName}, this is Sakar from Explore With Sakar regarding your Nepal travel inquiry.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-700 text-emerald-300 hover:text-white border border-emerald-800/60 transition-all"
                              title="Chat on WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(
                              'Explore With Sakar — Planning Your Nepal Journey'
                            )}`}
                            className="p-1.5 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 hover:text-white transition-all"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setDeleteTargetId(inq.id)}
                            className="p-1.5 rounded-lg bg-himalaya-800 hover:bg-rose-900/60 text-himalaya-400 hover:text-rose-200 transition-all"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-floating">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-himalaya-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                  Inquiry Details
                </span>
                <h3 className="font-editorial-serif text-2xl font-bold text-white mt-0.5">
                  {selectedInquiry.fullName}
                </h3>
                <p className="text-xs text-himalaya-400">
                  Received {formatDate(selectedInquiry.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Traveler Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-himalaya-950 p-4 rounded-2xl border border-himalaya-850">
              <div>
                <span className="text-himalaya-400 block">Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-semibold text-terracotta-light hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-himalaya-400 block">WhatsApp / Phone:</span>
                <span className="font-semibold text-parchment-200">
                  {selectedInquiry.whatsapp || 'Not provided'}
                </span>
              </div>
              <div>
                <span className="text-himalaya-400 block">Country:</span>
                <span className="font-semibold text-parchment-200">
                  {selectedInquiry.country || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-himalaya-400 block">Travel Party:</span>
                <span className="font-semibold text-parchment-200">
                  {selectedInquiry.travelersCount || 'Custom Group'}
                </span>
              </div>
              <div>
                <span className="text-himalaya-400 block">Travel Dates:</span>
                <span className="font-semibold text-parchment-200">
                  {selectedInquiry.travelDates || 'Flexible'}
                </span>
              </div>
              <div>
                <span className="text-himalaya-400 block">Duration:</span>
                <span className="font-semibold text-parchment-200">
                  {selectedInquiry.approximateDuration || 'Not decided'}
                </span>
              </div>
            </div>

            {/* Travel Inspirations & Style */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-parchment-200 uppercase tracking-wider text-[11px]">
                Travel Preferences & Inspirations
              </h4>
              {selectedInquiry.preferredInterests &&
              selectedInquiry.preferredInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedInquiry.preferredInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-himalaya-800 text-parchment-200 text-[11px]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-himalaya-500 italic">No specific tags selected.</p>
              )}
            </div>

            {/* Homestay Interest */}
            {selectedInquiry.homestayInterest && (
              <div className="text-xs">
                <span className="text-himalaya-400 block">Homestay Preference:</span>
                <p className="font-semibold text-parchment-200 mt-0.5">
                  {selectedInquiry.homestayInterest}
                </p>
              </div>
            )}

            {/* Message Body */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-parchment-200 uppercase tracking-wider text-[11px]">
                Traveler Message / Questions
              </h4>
              <div className="p-4 rounded-2xl bg-himalaya-950 border border-himalaya-850 text-parchment-200 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message || 'No additional message.'}
              </div>
            </div>

            {/* Status & Response Actions */}
            <div className="pt-4 border-t border-himalaya-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-himalaya-400">Status:</span>
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedInquiry.id,
                      selectedInquiry.status === 'read' ? 'unread' : 'read'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-xs font-semibold text-parchment-200 transition-colors"
                >
                  Mark as {selectedInquiry.status === 'read' ? 'Unread' : 'Read'}
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'replied')}
                  className="px-3 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 text-xs font-semibold text-emerald-300 border border-emerald-800/60 transition-colors"
                >
                  Mark as Replied
                </button>
              </div>

              <div className="flex items-center gap-2">
                {selectedInquiry.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedInquiry.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Namaste ${selectedInquiry.fullName}, this is Sakar from Explore With Sakar regarding your Nepal travel inquiry.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-subtle transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    'Explore With Sakar — Planning Your Nepal Journey'
                  )}`}
                  className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold flex items-center gap-1.5 shadow-subtle transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-floating text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 text-rose-400 border border-rose-800/60 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-editorial-serif text-xl font-bold text-white">
              Delete Traveler Inquiry?
            </h3>
            <p className="text-xs text-himalaya-400 leading-relaxed">
              Are you sure you want to permanently delete this inquiry? This action cannot be undone.
            </p>
            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-xs font-semibold text-parchment-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-warm transition-all flex items-center gap-1.5"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

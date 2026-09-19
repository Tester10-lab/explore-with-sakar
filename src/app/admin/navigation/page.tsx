'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  Save,
  ChevronDown,
  ExternalLink,
  Layers,
  X,
  Check,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { NavigationConfig, NavigationLink } from '@/types/cms';

export default function AdminNavigationPage() {
  const [navConfig, setNavConfig] = useState<NavigationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Editing Link modal
  const [editingLink, setEditingLink] = useState<{
    link: NavigationLink;
    isFooter?: boolean;
    columnIndex?: number;
    parentLinkId?: string;
  } | null>(null);

  // Add Link modal
  const [showAddModal, setShowAddModal] = useState<{
    isFooter?: boolean;
    columnIndex?: number;
    parentLinkId?: string;
  } | null>(null);
  const [newLink, setNewLink] = useState({ label: '', url: '' });

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchNavigation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/navigation');
      if (res.ok) {
        const data = await res.json();
        setNavConfig(data.navigation);
      } else {
        addToast('error', 'Failed to load navigation');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

  const handleSaveNavigation = async () => {
    if (!navConfig) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navConfig),
      });

      if (res.ok) {
        addToast('success', 'Navigation menu updated live!');
        fetchNavigation();
      } else {
        addToast('error', 'Failed to save navigation');
      }
    } catch {
      addToast('error', 'Error saving navigation');
    } finally {
      setIsSaving(false);
    }
  };

  // Header handlers
  const handleMoveHeaderLink = (index: number, direction: 'up' | 'down') => {
    if (!navConfig) return;
    const items = [...navConfig.header];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;

    const temp = items[index];
    items[index] = items[target];
    items[target] = temp;

    setNavConfig({
      ...navConfig,
      header: items.map((it, idx) => ({ ...it, order: idx })),
    });
  };

  const handleToggleHeaderVisibility = (index: number) => {
    if (!navConfig) return;
    const items = [...navConfig.header];
    items[index] = { ...items[index], visible: !items[index].visible };
    setNavConfig({ ...navConfig, header: items });
  };

  const handleDeleteHeaderLink = (index: number) => {
    if (!navConfig) return;
    if (!confirm('Remove this navigation item?')) return;
    const items = navConfig.header.filter((_, idx) => idx !== index);
    setNavConfig({
      ...navConfig,
      header: items.map((it, idx) => ({ ...it, order: idx })),
    });
  };

  // Footer handlers
  const handleMoveFooterLink = (colIdx: number, linkIdx: number, direction: 'up' | 'down') => {
    if (!navConfig) return;
    const columns = [...navConfig.footer.columns];
    const links = [...columns[colIdx].links];
    const target = direction === 'up' ? linkIdx - 1 : linkIdx + 1;
    if (target < 0 || target >= links.length) return;

    const temp = links[linkIdx];
    links[linkIdx] = links[target];
    links[target] = temp;

    columns[colIdx].links = links.map((l, i) => ({ ...l, order: i }));
    setNavConfig({
      ...navConfig,
      footer: { ...navConfig.footer, columns },
    });
  };

  const handleToggleFooterVisibility = (colIdx: number, linkIdx: number) => {
    if (!navConfig) return;
    const columns = [...navConfig.footer.columns];
    columns[colIdx].links[linkIdx] = {
      ...columns[colIdx].links[linkIdx],
      visible: !columns[colIdx].links[linkIdx].visible,
    };
    setNavConfig({
      ...navConfig,
      footer: { ...navConfig.footer, columns },
    });
  };

  const handleDeleteFooterLink = (colIdx: number, linkIdx: number) => {
    if (!navConfig) return;
    const columns = [...navConfig.footer.columns];
    columns[colIdx].links = columns[colIdx].links.filter((_, i) => i !== linkIdx);
    setNavConfig({
      ...navConfig,
      footer: { ...navConfig.footer, columns },
    });
  };

  const handleSaveEditedLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navConfig || !editingLink) return;

    if (editingLink.isFooter && editingLink.columnIndex !== undefined) {
      const columns = [...navConfig.footer.columns];
      columns[editingLink.columnIndex].links = columns[editingLink.columnIndex].links.map((l) =>
        l.id === editingLink.link.id ? editingLink.link : l
      );
      setNavConfig({
        ...navConfig,
        footer: { ...navConfig.footer, columns },
      });
    } else {
      const header = navConfig.header.map((item) => {
        if (item.id === editingLink.link.id) {
          return editingLink.link;
        }
        if (item.children) {
          return {
            ...item,
            children: item.children.map((c) => (c.id === editingLink.link.id ? editingLink.link : c)),
          };
        }
        return item;
      });
      setNavConfig({ ...navConfig, header });
    }

    setEditingLink(null);
    addToast('success', 'Link updated (click Save Changes to persist)');
  };

  const handleAddLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navConfig || !showAddModal || !newLink.label || !newLink.url) return;

    const linkId = `nav-${Date.now()}`;
    const linkItem: NavigationLink = {
      id: linkId,
      label: newLink.label.trim(),
      url: newLink.url.trim(),
      visible: true,
      order: 99,
    };

    if (showAddModal.isFooter && showAddModal.columnIndex !== undefined) {
      const columns = [...navConfig.footer.columns];
      linkItem.order = columns[showAddModal.columnIndex].links.length;
      columns[showAddModal.columnIndex].links.push(linkItem);
      setNavConfig({ ...navConfig, footer: { ...navConfig.footer, columns } });
    } else if (showAddModal.parentLinkId) {
      const header = navConfig.header.map((item) => {
        if (item.id === showAddModal.parentLinkId) {
          const children = item.children ? [...item.children, linkItem] : [linkItem];
          return { ...item, children };
        }
        return item;
      });
      setNavConfig({ ...navConfig, header });
    } else {
      linkItem.order = navConfig.header.length;
      setNavConfig({
        ...navConfig,
        header: [...navConfig.header, linkItem],
      });
    }

    setShowAddModal(null);
    setNewLink({ label: '', url: '' });
    addToast('success', 'New link added (click Save Changes to persist)');
  };

  if (isLoading || !navConfig) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Loading navigation structure...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <AdminHeader
        title="Navigation & Menus"
        subtitle="Manage public header navigation (EXPERIENCES, EVENTS, STORIES, ABOUT SAKAR) and multi-column footer links across the website."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Top Control Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xl shadow-black/20">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('header')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'header'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Menu className="w-4 h-4" />
              <span>Header Navigation ({navConfig.header.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('footer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'footer'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Footer Columns ({navConfig.footer.columns.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchNavigation}
              className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
              title="Reset / reload"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleSaveNavigation}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Navigation Changes'}</span>
            </button>
          </div>
        </div>

        {/* HEADER TAB */}
        {activeTab === 'header' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Header Menu Items
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Drag/reorder or toggle visibility of navigation items. Add dropdown sub-items.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowAddModal({ isFooter: false });
                  setNewLink({ label: '', url: '' });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-semibold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Header Link</span>
              </button>
            </div>

            <div className="space-y-3">
              {navConfig.header.map((item, idx) => (
                <div
                  key={item.id}
                  className={`bg-slate-900/80 border rounded-2xl p-4 transition-all ${
                    item.visible ? 'border-slate-800/80' : 'border-slate-800/40 opacity-60 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0">
                        {idx + 1}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-slate-100">
                            {item.label}
                          </h4>
                          {item.children && item.children.length > 0 && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-amber-400 border border-slate-700 font-medium">
                              Dropdown ({item.children.length})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                          {item.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleMoveHeaderLink(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-lg hover:bg-slate-800"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleMoveHeaderLink(idx, 'down')}
                        disabled={idx === navConfig.header.length - 1}
                        className="p-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-lg hover:bg-slate-800"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleHeaderVisibility(idx)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.visible
                            ? 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                            : 'text-amber-400 bg-amber-500/10'
                        }`}
                        title={item.visible ? 'Hide link' : 'Show link'}
                      >
                        {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setEditingLink({ link: item, isFooter: false })}
                        className="p-1.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit link"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteHeaderLink(idx)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dropdown sub-items if present */}
                  {item.children && item.children.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 pl-9 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                        <span>Dropdown Sub-links</span>
                        <button
                          onClick={() => {
                            setShowAddModal({ isFooter: false, parentLinkId: item.id });
                            setNewLink({ label: '', url: '' });
                          }}
                          className="text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Sub-item</span>
                        </button>
                      </div>

                      {item.children.map((child, cIdx) => (
                        <div
                          key={child.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs"
                        >
                          <div>
                            <span className="font-semibold text-slate-200">{child.label}</span>
                            <span className="text-slate-500 ml-2 font-mono">{child.url}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingLink({ link: child, isFooter: false })}
                              className="p-1 text-slate-400 hover:text-amber-400"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                const updatedChildren = item.children?.filter((_, i) => i !== cIdx);
                                const header = navConfig.header.map((h) =>
                                  h.id === item.id ? { ...h, children: updatedChildren } : h
                                );
                                setNavConfig({ ...navConfig, header });
                              }}
                              className="p-1 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER TAB */}
        {activeTab === 'footer' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Footer Navigation Columns
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organize links under each categorical column in the footer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {navConfig.footer.columns.map((col, cIdx) => (
                <div
                  key={col.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) => {
                          const columns = [...navConfig.footer.columns];
                          columns[cIdx] = { ...columns[cIdx], title: e.target.value };
                          setNavConfig({ ...navConfig, footer: { ...navConfig.footer, columns } });
                        }}
                        className="bg-transparent font-bold text-sm text-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-1 -ml-1"
                      />
                      <span className="text-xs text-slate-500">{col.links.length} links</span>
                    </div>

                    <div className="space-y-2">
                      {col.links.map((link, lIdx) => (
                        <div
                          key={link.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
                            link.visible ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-950/30 opacity-50 border-slate-800/40'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-200 truncate">{link.label}</p>
                            <p className="text-[11px] text-slate-500 font-mono truncate">{link.url}</p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleMoveFooterLink(cIdx, lIdx, 'up')}
                              disabled={lIdx === 0}
                              className="p-1 text-slate-400 hover:text-slate-100 disabled:opacity-30"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMoveFooterLink(cIdx, lIdx, 'down')}
                              disabled={lIdx === col.links.length - 1}
                              className="p-1 text-slate-400 hover:text-slate-100 disabled:opacity-30"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleToggleFooterVisibility(cIdx, lIdx)}
                              className={`p-1 ${link.visible ? 'text-slate-400 hover:text-amber-400' : 'text-amber-400'}`}
                            >
                              {link.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            </button>
                            <button
                              onClick={() => setEditingLink({ link, isFooter: true, columnIndex: cIdx })}
                              className="p-1 text-slate-300 hover:text-amber-400"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteFooterLink(cIdx, lIdx)}
                              className="p-1 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowAddModal({ isFooter: true, columnIndex: cIdx });
                      setNewLink({ label: '', url: '' });
                    }}
                    className="mt-4 w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Link to {col.title}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT LINK MODAL */}
      {editingLink && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-400" />
                Edit Navigation Link
              </h3>
              <button
                onClick={() => setEditingLink(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Link Display Label
                </label>
                <input
                  type="text"
                  required
                  value={editingLink.link.label}
                  onChange={(e) =>
                    setEditingLink({
                      ...editingLink,
                      link: { ...editingLink.link, label: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  required
                  value={editingLink.link.url}
                  onChange={(e) =>
                    setEditingLink({
                      ...editingLink,
                      link: { ...editingLink.link, url: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="open-in-new-tab"
                  checked={Boolean(editingLink.link.openInNewTab)}
                  onChange={(e) =>
                    setEditingLink({
                      ...editingLink,
                      link: { ...editingLink.link, openInNewTab: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="open-in-new-tab" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Open link in new browser tab
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20"
                >
                  Update Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LINK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                Add Navigation Link
              </h3>
              <button
                onClick={() => setShowAddModal(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLinkSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Link Display Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mountain Treks"
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /services/trekking"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(null)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

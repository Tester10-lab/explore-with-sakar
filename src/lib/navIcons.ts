import React from 'react';
import {
  Compass,
  Sparkles,
  Home,
  Heart,
  Calendar,
  ShieldCheck,
  BookOpen,
  Star,
  MapPin,
  Camera,
  FileText,
  HelpCircle,
  Phone,
  Mountain,
  LucideIcon,
} from 'lucide-react';

export const NAV_ICON_MAP: Record<string, LucideIcon> = {
  'compass': Compass,
  'sparkles': Sparkles,
  'home': Home,
  'heart': Heart,
  'calendar': Calendar,
  'shield-check': ShieldCheck,
  'book-open': BookOpen,
  'star': Star,
  'map-pin': MapPin,
  'camera': Camera,
  'file-text': FileText,
  'help-circle': HelpCircle,
  'phone': Phone,
  'mountain': Mountain,
};

export const AVAILABLE_NAV_ICONS: { key: string; label: string }[] = [
  { key: 'compass', label: 'Compass (Exploration)' },
  { key: 'sparkles', label: 'Sparkles (Spiritual/Magic)' },
  { key: 'home', label: 'Home (Homestays)' },
  { key: 'heart', label: 'Heart (Impact/Community)' },
  { key: 'calendar', label: 'Calendar (Events/Itineraries)' },
  { key: 'shield-check', label: 'Shield Check (Bespoke/Trust)' },
  { key: 'book-open', label: 'Book Open (Journal/Stories)' },
  { key: 'star', label: 'Star (Reviews/Favorites)' },
  { key: 'map-pin', label: 'Map Pin (Destinations)' },
  { key: 'camera', label: 'Camera (Gallery)' },
  { key: 'file-text', label: 'File Text (Resources/Guide)' },
  { key: 'help-circle', label: 'Help Circle (FAQ)' },
  { key: 'phone', label: 'Phone (Contact)' },
  { key: 'mountain', label: 'Mountain (Treks)' },
];

export function getNavIcon(iconKey?: string): LucideIcon | null {
  if (!iconKey) return null;
  const normalized = iconKey.toLowerCase().trim();
  return NAV_ICON_MAP[normalized] || null;
}

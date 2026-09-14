import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, ArrowLeft } from 'lucide-react';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Explore With Sakar',
  description: 'Our privacy policy outlines how Explore With Sakar collects, protects, and respects your personal travel inquiry data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-parchment-100">
      <PageHero
        badge="Legal & Trust"
        title="Privacy Policy"
        subtitle="How we respect, safeguard, and handle your personal information when planning authentic journeys in Nepal."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        compact
      />

      <div className="editorial-container py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-parchment-300 shadow-subtle space-y-8 text-himalaya-800 font-light leading-relaxed">
          <div className="border-b border-parchment-200 pb-6">
            <span className="text-xs font-mono text-himalaya-500">
              Effective Date: January 1, 2026
            </span>
            <p className="text-sm text-himalaya-600 mt-2">
              At <strong>Explore With Sakar</strong>, we are committed to maintaining the trust and confidence of all visitors, guests, and travelers. This Privacy Policy details the types of personal information we collect, how it is used, and the steps we take to ensure your data remains confidential and secure.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              1. Information We Collect
            </h2>
            <p className="text-sm text-himalaya-700">
              When you submit a travel inquiry, request a bespoke itinerary quotation, or communicate directly with Sakar via email or WhatsApp, we may collect:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-himalaya-600 space-y-1.5 pl-2">
              <li>Your full name, email address, phone number, and WhatsApp contact details</li>
              <li>Country of residence and preferred travel dates / group size</li>
              <li>Personal travel preferences, physical fitness notes, and dietary requirements</li>
              <li>Passport details and emergency contact info (required exclusively for national park permits, ACAP/TIMS registration, and domestic flights)</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              2. How We Use Your Information
            </h2>
            <p className="text-sm text-himalaya-700">
              We collect and use your data strictly for legitimate travel planning purposes:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-himalaya-600 space-y-1.5 pl-2">
              <li>To prepare personalized, day-by-day itinerary proposals and cost estimates</li>
              <li>To reserve private transportation, local homestay accommodations, and boutique heritage hotels</li>
              <li>To issue mandatory government conservation permits and domestic mountain flight tickets</li>
              <li>To communicate important pre-departure travel guidance and emergency trip coordination</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              3. Data Sharing & Third Parties
            </h2>
            <p className="text-sm text-himalaya-700">
              We never sell, rent, trade, or monetize your personal data. Your information is shared only with trusted operational partners strictly necessary for executing your journey:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-himalaya-600 space-y-1.5 pl-2">
              <li>Nepal Department of National Parks & Wildlife Conservation / NTNC for trekking permits</li>
              <li>Domestic airlines operating inter-city and mountain flights within Nepal</li>
              <li>Verified village host families (limited to dietary restrictions and names)</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              4. Data Security & Storage
            </h2>
            <p className="text-sm text-himalaya-700">
              We employ standard administrative and technical safeguards to protect your personal information against unauthorized access, alteration, or disclosure. Inquiries submitted through our website are transmitted via secure HTTPS encryption.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              5. Your Rights & Inquiries
            </h2>
            <p className="text-sm text-himalaya-700">
              You have the right to request a copy of the personal data we hold about you, request corrections, or ask for the deletion of your personal records following the conclusion of your journey.
            </p>
            <p className="text-sm text-himalaya-700 pt-2">
              For privacy inquiries, please contact Sakar directly at{' '}
              <a
                href="mailto:Explorewithsakar@gmail.com"
                className="text-terracotta font-semibold hover:underline"
              >
                Explorewithsakar@gmail.com
              </a>.
            </p>
          </div>

          <div className="pt-6 border-t border-parchment-200 flex justify-between items-center text-xs">
            <Link
              href="/"
              className="inline-flex items-center text-terracotta font-bold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Return to Home</span>
            </Link>
            <Link
              href="/terms"
              className="text-himalaya-600 hover:text-terracotta transition-colors"
            >
              View Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

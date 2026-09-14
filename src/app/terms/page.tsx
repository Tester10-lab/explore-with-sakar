import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldAlert, ArrowLeft } from 'lucide-react';
import PageHero from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service & Booking Conditions | Explore With Sakar',
  description: 'Booking terms, deposit conditions, cancellation policies, and traveler responsibilities for journeys with Explore With Sakar.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-parchment-100">
      <PageHero
        badge="Booking Agreement"
        title="Terms of Service & Booking Conditions"
        subtitle="Transparent guidelines regarding trip confirmations, payments, safety, cancellations, and responsible traveler conduct."
        breadcrumbs={[{ label: 'Terms of Service' }]}
        compact
      />

      <div className="editorial-container py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-parchment-300 shadow-subtle space-y-8 text-himalaya-800 font-light leading-relaxed">
          <div className="border-b border-parchment-200 pb-6">
            <span className="text-xs font-mono text-himalaya-500">
              Effective Date: January 1, 2026
            </span>
            <p className="text-sm text-himalaya-600 mt-2">
              By confirming a custom itinerary or making a booking deposit with <strong>Explore With Sakar</strong>, you agree to the following operational terms and conditions designed to ensure mutual clarity, safety, and fairness.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              1. Custom Itinerary & Booking Confirmation
            </h2>
            <p className="text-sm text-himalaya-700">
              All journeys are tailored collaboratively. Once a draft route and pricing quotation are agreed upon, a 25% deposit secures your travel dates, private vehicle reservation, host family lodgings, and official permits. The remaining balance is payable upon arrival in Kathmandu prior to departure for outer valleys.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              2. Cancellation & Rescheduling Policy
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm text-himalaya-600 space-y-2 pl-2">
              <li>
                <strong>Date Changes:</strong> We accommodate schedule adjustments with reasonable advance notice without penalty, subject to accommodation and guide availability.
              </li>
              <li>
                <strong>Cancellations 30+ Days Prior:</strong> Deposits are refunded minus non-refundable government permit fees and domestic flight administrative charges.
              </li>
              <li>
                <strong>Cancellations Within 14 Days:</strong> Deposits are held as full credit for any future journey with Sakar, valid for up to 24 months.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              3. Mandatory Travel & Medical Insurance
            </h2>
            <p className="text-sm text-himalaya-700">
              For all mountain trekking and high-elevation journeys (above 2,500m), travelers must hold a comprehensive travel insurance policy that explicitly includes emergency medical treatment and helicopter evacuation. You must provide a copy of your insurance policy details prior to trail departure.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              4. Mountain Weather & Force Majeure
            </h2>
            <p className="text-sm text-himalaya-700">
              Himalayan mountain weather, domestic flight delays (e.g. Jomsom or Lukla airstrips), landslides, or road conditions can occasionally necessitate itinerary adaptations. Sakar reserves the right to modify daily routes in the interest of guest safety. Any modifications will be discussed openly and handled with the highest level of care.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              5. Responsible Travel & Cultural Respect
            </h2>
            <p className="text-sm text-himalaya-700">
              Explore With Sakar is dedicated to ethical slow tourism. We require all guests to observe local cultural etiquette: removing shoes before entering sacred shrines, respecting host families, dressing modestly in village settings, and adhering strictly to Leave No Trace principles.
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
              href="/privacy"
              className="text-himalaya-600 hover:text-terracotta transition-colors"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

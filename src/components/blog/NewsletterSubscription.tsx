'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <div className="my-16 p-8 sm:p-12 rounded-3xl bg-sand border border-parchment-300 shadow-editorial text-center max-w-3xl mx-auto">
      {isSubscribed ? (
        <div className="space-y-3 animate-in fade-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-editorial-serif text-2xl font-bold text-himalaya-950">
            Welcome to Sakar&apos;s Journal
          </h4>
          <p className="text-xs sm:text-sm text-himalaya-700 font-light max-w-md mx-auto">
            Thank you for joining. We will occasionally send you thoughtful dispatches and quiet stories directly from Nepal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-saffron/20 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quiet Dispatches</span>
          </div>

          <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
            Stories From Nepal, Occasionally
          </h3>

          <p className="text-xs sm:text-sm text-himalaya-700 font-light max-w-md mx-auto leading-relaxed">
            Receive a few thoughtful stories from Nepal, cultural reflections, and new slow-travel experiences curated by Sakar. No spam, ever.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-xs sm:text-sm text-himalaya-950 placeholder:text-himalaya-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs sm:text-sm shadow-warm transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Join the Journal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

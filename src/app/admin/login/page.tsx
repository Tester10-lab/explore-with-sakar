'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, Sparkles, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success -> Redirect to dashboard
      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-himalaya-900/90 border border-himalaya-800 rounded-2xl p-6 sm:p-8 shadow-floating backdrop-blur-md">
      <div className="flex items-center gap-2 pb-4 mb-6 border-b border-himalaya-800 text-xs font-semibold uppercase tracking-wider text-saffron-light">
        <ShieldCheck className="w-4 h-4 text-terracotta-light" />
        <span>Authorized Access Only</span>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs leading-relaxed animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-himalaya-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-himalaya-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-himalaya-400 hover:text-parchment-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-light hover:to-terracotta text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-himalaya-950 relative overflow-hidden film-grain">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-saffron-dark/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 group">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white shadow-warm group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-7 h-7" />
            </div>
          </Link>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Explore With Sakar
          </h1>
          <p className="text-xs uppercase tracking-widest text-parchment-400 font-mono mt-2">
            Secure Admin Management Portal
          </p>
        </div>

        {/* Login Card inside Suspense */}
        <Suspense fallback={<div className="p-8 text-center text-parchment-400">Loading portal...</div>}>
          <LoginForm />
        </Suspense>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-himalaya-400">
          <Link href="/" className="hover:text-parchment-200 transition-colors underline">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}

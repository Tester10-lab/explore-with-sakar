'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss, onRemove }: ToastProps) {
  const dismissToast = onDismiss || onRemove;

  // Auto-dismiss each toast after 3.5 seconds
  React.useEffect(() => {
    if (toasts.length === 0 || !dismissToast) return;

    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dismissToast(toast.id);
      }, 3500)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [toasts, dismissToast]);

  if (toasts.length === 0) return null;

  // Show at most 3 toasts to prevent screen crowding
  const visibleToasts = toasts.slice(-3);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {visibleToasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-floating border transition-all animate-fade-in-up ${
              isSuccess
                ? 'bg-emerald-950/95 border-emerald-800 text-emerald-100'
                : isError
                ? 'bg-rose-950/95 border-rose-800 text-rose-100'
                : 'bg-himalaya-900/95 border-himalaya-700 text-parchment-100'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-saffron-light shrink-0 mt-0.5" />}

            <div className="flex-1 text-sm leading-relaxed">{toast.message}</div>

            <button
              onClick={() => dismissToast?.(toast.id)}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

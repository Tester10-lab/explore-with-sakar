'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-himalaya-950 border border-himalaya-800 rounded-2xl shadow-floating max-w-md w-full p-6 text-parchment-100 animate-fade-in-up">
        <div className="flex items-center justify-between pb-4 border-b border-himalaya-800 mb-4">
          <div className="flex items-center gap-2.5">
            {isDestructive && <AlertTriangle className="w-5 h-5 text-rose-400" />}
            <h3 className="font-editorial-serif text-lg font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-parchment-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-parchment-300 font-light leading-relaxed mb-6">{message}</p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-parchment-300 hover:text-white hover:bg-himalaya-900 border border-himalaya-800 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-subtle ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-500'
                : 'bg-terracotta hover:bg-terracotta-light'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

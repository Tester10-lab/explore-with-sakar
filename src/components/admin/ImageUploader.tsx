'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon,
  Check,
  Crop,
  RotateCw,
} from 'lucide-react';
import ImageCropModal from './ImageCropModal';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'any';
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Image',
  helperText = 'Recommended: WebP, JPG, or PNG (Max 10MB)',
  aspectRatio = 'landscape',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop & Rotate modal state
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropTargetUrl, setCropTargetUrl] = useState<string>('');
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleDirectUpload = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onChange(data.url);
      setManualUrl(data.url);
    } catch (err: any) {
      setError(err?.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
      setPendingFile(null);
    }
  };

  const onFileSelected = (file: File) => {
    setError(null);
    setPendingFile(file);
    const objectUrl = URL.createObjectURL(file);
    setCropTargetUrl(objectUrl);
    setIsCropModalOpen(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleManualApply = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setIsManualInput(false);
    }
  };

  const openCropForCurrentValue = () => {
    if (value) {
      setPendingFile(null);
      setCropTargetUrl(value);
      setIsCropModalOpen(true);
    }
  };

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'landscape'
      ? 'aspect-[16/9]'
      : 'aspect-auto min-h-[160px]';

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-parchment-300">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setIsManualInput(!isManualInput)}
            className="text-[11px] text-terracotta-light hover:text-terracotta flex items-center gap-1 font-medium transition-colors"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{isManualInput ? 'Upload File Instead' : 'Enter URL Manually'}</span>
          </button>
        </div>
      )}

      {isManualInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://... or /explore-with-sakar/images/..."
            className="flex-1 bg-himalaya-900 border border-himalaya-700 rounded-lg px-3 py-2 text-xs text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
          />
          <button
            type="button"
            onClick={handleManualApply}
            className="px-3 py-2 bg-terracotta text-white rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-terracotta-light transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>
        </div>
      ) : value ? (
        <div className="relative group rounded-xl overflow-hidden border border-himalaya-700 bg-himalaya-900">
          <div
            className={`relative w-full ${aspectClass} overflow-hidden bg-himalaya-950 flex items-center justify-center`}
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Action Overlay: visible on hover on desktop, or accessible via buttons below */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            <button
              type="button"
              onClick={openCropForCurrentValue}
              className="px-3 py-1.5 bg-terracotta text-white rounded-md text-xs font-semibold shadow-floating hover:bg-terracotta-light transition-all flex items-center gap-1.5"
            >
              <Crop className="w-3.5 h-3.5" />
              <span>Crop & Rotate</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-himalaya-950 rounded-md text-xs font-semibold shadow-floating hover:bg-parchment-200 transition-all flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setManualUrl('');
              }}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-md text-xs font-semibold shadow-floating hover:bg-rose-500 transition-all flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          {/* Mobile persistent action bar */}
          <div className="flex sm:hidden items-center justify-between p-2 bg-himalaya-950/90 border-t border-himalaya-800 text-xs">
            <button
              type="button"
              onClick={openCropForCurrentValue}
              className="text-terracotta font-semibold flex items-center gap-1 px-2 py-1"
            >
              <Crop className="w-3.5 h-3.5" />
              <span>Crop/Rotate</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-parchment-200 flex items-center gap-1 px-2 py-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setManualUrl('');
              }}
              className="text-rose-400 flex items-center gap-1 px-2 py-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-terracotta bg-terracotta/10'
              : 'border-himalaya-700 bg-himalaya-900/50 hover:bg-himalaya-900 hover:border-himalaya-600'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-6 h-6 text-terracotta animate-spin" />
              <span className="text-xs text-parchment-300">Uploading & Optimizing...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-himalaya-800 flex items-center justify-center text-parchment-300">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-parchment-200">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-himalaya-400 mt-0.5">{helperText}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-terracotta-light mt-1 font-mono">
                  <Crop className="w-3 h-3" /> Includes Crop & Rotate Editor
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFileSelected(e.target.files[0]);
          }
        }}
      />

      {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}

      {/* Interactive Crop & Rotate Modal */}
      {isCropModalOpen && (
        <ImageCropModal
          isOpen={isCropModalOpen}
          imageUrl={cropTargetUrl}
          aspectRatioPreset={aspectRatio}
          onClose={() => {
            setIsCropModalOpen(false);
            setPendingFile(null);
          }}
          onSkipCrop={
            pendingFile
              ? () => {
                  setIsCropModalOpen(false);
                  handleDirectUpload(pendingFile);
                }
              : undefined
          }
          onSave={(newUrl) => {
            onChange(newUrl);
            setManualUrl(newUrl);
            setIsCropModalOpen(false);
            setPendingFile(null);
          }}
        />
      )}
    </div>
  );
}

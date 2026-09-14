'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  ZoomIn,
  ZoomOut,
  Check,
  X,
  RefreshCw,
  Loader2,
  Sliders,
} from 'lucide-react';

interface ImageCropModalProps {
  isOpen: boolean;
  imageUrl: string;
  aspectRatioPreset?: 'landscape' | 'portrait' | 'square' | 'any';
  onClose: () => void;
  onSave: (croppedUrl: string) => void;
  onSkipCrop?: () => void;
}

type AspectRatioOption = 'free' | '16:9' | '4:3' | '1:1' | '3:4';

interface CropRect {
  x: number; // percentage (0 to 100)
  y: number;
  width: number;
  height: number;
}

export default function ImageCropModal({
  isOpen,
  imageUrl,
  aspectRatioPreset = 'landscape',
  onClose,
  onSave,
  onSkipCrop,
}: ImageCropModalProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>(
    aspectRatioPreset === 'portrait'
      ? '3:4'
      : aspectRatioPreset === 'square'
      ? '1:1'
      : aspectRatioPreset === 'landscape'
      ? '16:9'
      : 'free'
  );

  const [crop, setCrop] = useState<CropRect>({ x: 5, y: 5, width: 90, height: 90 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef<{
    mode: 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 's' | 'e' | 'w';
    startX: number;
    startY: number;
    startCrop: CropRect;
  } | null>(null);

  // Initialize and reset when opening new image
  useEffect(() => {
    if (isOpen) {
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setZoom(1);
      setImageLoaded(false);
      setImageError(null);

      // Default crop box according to aspect ratio
      const initialAspect =
        aspectRatioPreset === 'portrait'
          ? '3:4'
          : aspectRatioPreset === 'square'
          ? '1:1'
          : aspectRatioPreset === 'landscape'
          ? '16:9'
          : 'free';
      setAspectRatio(initialAspect);
      resetCropForAspect(initialAspect);
    }
  }, [isOpen, imageUrl, aspectRatioPreset]);

  const resetCropForAspect = (ratio: AspectRatioOption) => {
    if (ratio === '16:9') {
      // width: 90%, height: 90 * (9/16) ~= 50.6%
      setCrop({ x: 5, y: (100 - 50.6) / 2, width: 90, height: 50.6 });
    } else if (ratio === '4:3') {
      setCrop({ x: 10, y: (100 - 60) / 2, width: 80, height: 60 });
    } else if (ratio === '1:1') {
      setCrop({ x: 15, y: 15, width: 70, height: 70 });
    } else if (ratio === '3:4') {
      setCrop({ x: (100 - 60) / 2, y: 10, width: 60, height: 80 });
    } else {
      setCrop({ x: 5, y: 5, width: 90, height: 90 });
    }
  };

  const handleAspectRatioChange = (ratio: AspectRatioOption) => {
    setAspectRatio(ratio);
    resetCropForAspect(ratio);
  };

  // Rotation controls
  const handleRotateCw = () => setRotation((prev) => (prev + 90) % 360);
  const handleRotateCcw = () => setRotation((prev) => (prev - 90 + 360) % 360);
  const handleFlipH = () => setFlipH((prev) => !prev);
  const handleFlipV = () => setFlipV((prev) => !prev);

  const handleResetAll = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
    resetCropForAspect(aspectRatio);
  };

  // Dragging & Resizing Crop Box
  const handlePointerDown = (
    e: React.PointerEvent,
    mode: 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 's' | 'e' | 'w'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    dragStartRef.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { ...crop },
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current || !containerRef.current) return;
    e.preventDefault();

    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartRef.current.startX) / containerRect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.startY) / containerRect.height) * 100;
    const { mode, startCrop } = dragStartRef.current;

    let newCrop = { ...startCrop };

    if (mode === 'move') {
      newCrop.x = Math.max(0, Math.min(100 - startCrop.width, startCrop.x + deltaX));
      newCrop.y = Math.max(0, Math.min(100 - startCrop.height, startCrop.y + deltaY));
    } else {
      // Resizing with boundary clamps (min size 15%)
      if (mode.includes('e')) {
        newCrop.width = Math.max(15, Math.min(100 - startCrop.x, startCrop.width + deltaX));
      }
      if (mode.includes('s')) {
        newCrop.height = Math.max(15, Math.min(100 - startCrop.y, startCrop.height + deltaY));
      }
      if (mode.includes('w')) {
        const potentialWidth = startCrop.width - deltaX;
        if (potentialWidth >= 15 && startCrop.x + deltaX >= 0) {
          newCrop.x = startCrop.x + deltaX;
          newCrop.width = potentialWidth;
        }
      }
      if (mode.includes('n')) {
        const potentialHeight = startCrop.height - deltaY;
        if (potentialHeight >= 15 && startCrop.y + deltaY >= 0) {
          newCrop.y = startCrop.y + deltaY;
          newCrop.height = potentialHeight;
        }
      }

      // If aspect ratio is locked and not 'free', constrain proportion
      if (aspectRatio !== 'free') {
        const targetRatio =
          aspectRatio === '16:9'
            ? 16 / 9
            : aspectRatio === '4:3'
            ? 4 / 3
            : aspectRatio === '1:1'
            ? 1
            : 3 / 4;

        // Container aspect ratio correction
        const containerAspect = containerRect.width / containerRect.height;
        const normalizedRatio = targetRatio / containerAspect;

        if (mode.includes('e') || mode.includes('w')) {
          newCrop.height = Math.min(100 - newCrop.y, newCrop.width / normalizedRatio);
        } else {
          newCrop.width = Math.min(100 - newCrop.x, newCrop.height * normalizedRatio);
        }
      }
    }

    setCrop(newCrop);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartRef.current) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Pointer capture release safety
      }
      dragStartRef.current = null;
    }
  };

  // Canvas processing & upload
  const handleApplyCrop = async () => {
    if (!imageRef.current || !containerRef.current) return;
    setIsProcessing(true);
    setImageError(null);

    try {
      const img = imageRef.current;
      const naturalWidth = img.naturalWidth || 1200;
      const naturalHeight = img.naturalHeight || 800;

      // 1. Create offscreen canvas for transformed image
      const transformCanvas = document.createElement('canvas');
      const isRotated90or270 = rotation === 90 || rotation === 270;
      transformCanvas.width = isRotated90or270 ? naturalHeight : naturalWidth;
      transformCanvas.height = isRotated90or270 ? naturalWidth : naturalHeight;

      const tCtx = transformCanvas.getContext('2d');
      if (!tCtx) throw new Error('Could not initialize canvas context');

      tCtx.save();
      // Translate to center of transformed canvas
      tCtx.translate(transformCanvas.width / 2, transformCanvas.height / 2);
      tCtx.rotate((rotation * Math.PI) / 180);
      tCtx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      tCtx.drawImage(
        img,
        -naturalWidth / 2,
        -naturalHeight / 2,
        naturalWidth,
        naturalHeight
      );
      tCtx.restore();

      // 2. Crop according to crop percentages
      const cropPxX = Math.round((crop.x / 100) * transformCanvas.width);
      const cropPxY = Math.round((crop.y / 100) * transformCanvas.height);
      const cropPxWidth = Math.round((crop.width / 100) * transformCanvas.width);
      const cropPxHeight = Math.round((crop.height / 100) * transformCanvas.height);

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = Math.max(1, cropPxWidth);
      finalCanvas.height = Math.max(1, cropPxHeight);

      const fCtx = finalCanvas.getContext('2d');
      if (!fCtx) throw new Error('Could not initialize final crop context');

      fCtx.drawImage(
        transformCanvas,
        cropPxX,
        cropPxY,
        cropPxWidth,
        cropPxHeight,
        0,
        0,
        cropPxWidth,
        cropPxHeight
      );

      // 3. Export to Blob and Upload to /api/upload
      const blob = await new Promise<Blob | null>((resolve) => {
        finalCanvas.toBlob(resolve, 'image/webp', 0.92);
      });

      if (!blob) {
        // Fallback to data URL
        const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
        onSave(dataUrl);
        onClose();
        return;
      }

      const file = new File([blob], `cropped-${Date.now()}.webp`, { type: 'image/webp' });
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        // Fallback to local Data URL if server upload cannot write
        const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
        onSave(dataUrl);
      } else {
        onSave(data.url);
      }

      onClose();
    } catch (err: any) {
      console.error('Error applying crop & rotate:', err);
      // As ultimate safe fallback, return the data URL
      try {
        if (imageRef.current) {
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = imageRef.current.naturalWidth || 800;
          fallbackCanvas.height = imageRef.current.naturalHeight || 600;
          const ctx = fallbackCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(imageRef.current, 0, 0);
            onSave(fallbackCanvas.toDataURL('image/jpeg', 0.9));
            onClose();
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      setImageError(err?.message || 'Failed to crop and save image');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-himalaya-950 border border-himalaya-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-himalaya-800/80 bg-himalaya-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-terracotta/10 text-terracotta border border-terracotta/20">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-white leading-tight">
                Crop & Rotate Image
              </h3>
              <p className="text-[11px] text-parchment-400 font-light">
                Fine-tune angle, orientation, and framing before saving
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-parchment-400 hover:text-white hover:bg-himalaya-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Interactive Canvas Area */}
        <div className="flex-1 min-h-[320px] max-h-[58vh] relative bg-black/90 p-4 sm:p-8 flex items-center justify-center overflow-hidden select-none">
          {/* Working Container */}
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full max-w-xl max-h-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl border border-himalaya-800 bg-himalaya-950"
            style={{ touchAction: 'none' }}
          >
            {/* The Image being edited */}
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Crop target"
              crossOrigin="anonymous"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageLoaded(true);
                // Image might be local without CORS issues
              }}
              style={{
                transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${
                  flipV ? -1 : 1
                }) scale(${zoom})`,
                transition: 'transform 0.15s ease-out',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              className="pointer-events-none"
            />

            {/* Dark Mask & Crop Box Overlay */}
            {imageLoaded && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Visual dark mask over non-selected area */}
                <div
                  className="absolute pointer-events-auto cursor-move border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.65)]"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`,
                  }}
                  onPointerDown={(e) => handlePointerDown(e, 'move')}
                >
                  {/* Rule of Thirds Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-b border-white/60"></div>
                    <div className="border-r border-white/60"></div>
                    <div className="border-r border-white/60"></div>
                    <div></div>
                  </div>

                  {/* Corner Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'nw')}
                    className="absolute -top-2 -left-2 w-4 h-4 bg-terracotta border-2 border-white rounded-full cursor-nwse-resize shadow-md"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'ne')}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-terracotta border-2 border-white rounded-full cursor-nesw-resize shadow-md"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'sw')}
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-terracotta border-2 border-white rounded-full cursor-nesw-resize shadow-md"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'se')}
                    className="absolute -bottom-2 -right-2 w-4 h-4 bg-terracotta border-2 border-white rounded-full cursor-nwse-resize shadow-md"
                  />

                  {/* Mid-edge Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'n')}
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-white/90 rounded cursor-ns-resize"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 's')}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-white/90 rounded cursor-ns-resize"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'w')}
                    className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-6 bg-white/90 rounded cursor-ew-resize"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'e')}
                    className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-6 bg-white/90 rounded cursor-ew-resize"
                  />
                </div>
              </div>
            )}

            {!imageLoaded && (
              <div className="flex flex-col items-center gap-2 text-parchment-300">
                <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
                <span className="text-xs">Loading image preview...</span>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="p-4 sm:p-5 bg-himalaya-900 border-t border-himalaya-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Aspect Ratio Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase font-mono tracking-wider text-parchment-400 mr-1">
                Ratio:
              </span>
              {(['free', '16:9', '4:3', '1:1', '3:4'] as AspectRatioOption[]).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => handleAspectRatioChange(ratio)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    aspectRatio === ratio
                      ? 'bg-terracotta text-white shadow-warm'
                      : 'bg-himalaya-800 text-parchment-300 hover:text-white hover:bg-himalaya-750'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {/* Rotate & Flip Actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleRotateCcw}
                className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-750 text-parchment-200 hover:text-white transition-colors border border-himalaya-700"
                title="Rotate 90° Counter-Clockwise"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleRotateCw}
                className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-750 text-parchment-200 hover:text-white transition-colors border border-himalaya-700"
                title="Rotate 90° Clockwise"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleFlipH}
                className={`p-2 rounded-xl transition-colors border ${
                  flipH
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-himalaya-800 hover:bg-himalaya-750 text-parchment-200 hover:text-white border-himalaya-700'
                }`}
                title="Flip Horizontal"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleFlipV}
                className={`p-2 rounded-xl transition-colors border ${
                  flipV
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-himalaya-800 hover:bg-himalaya-750 text-parchment-200 hover:text-white border-himalaya-700'
                }`}
                title="Flip Vertical"
              >
                <FlipVertical className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-750 text-parchment-400 hover:text-white transition-colors border border-himalaya-700"
                title="Reset Rotation & Crop"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Zoom Slider & Rotation indicator */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-himalaya-800/80">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <ZoomOut className="w-4 h-4 text-parchment-400" />
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-32 sm:w-44 accent-terracotta h-1.5 bg-himalaya-800 rounded-lg cursor-pointer"
              />
              <ZoomIn className="w-4 h-4 text-parchment-400" />
              <span className="text-[11px] font-mono text-parchment-400 w-12">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {onSkipCrop && (
                <button
                  type="button"
                  onClick={onSkipCrop}
                  className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 text-xs font-semibold tracking-wider transition-colors"
                >
                  Skip & Keep Original
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold tracking-wider transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Apply & Save</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {imageError && <p className="text-xs text-rose-400 mt-1">{imageError}</p>}
        </div>
      </div>
    </div>
  );
}

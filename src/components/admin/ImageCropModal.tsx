'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  BookOpen,
  Smartphone,
  Maximize2,
} from 'lucide-react';

interface ImageCropModalProps {
  isOpen: boolean;
  imageUrl: string;
  aspectRatioPreset?: 'landscape' | 'portrait' | 'square' | 'any';
  onClose: () => void;
  onSave: (croppedUrl: string) => void;
  onSkipCrop?: () => void;
}

export type AspectRatioOption = 'original' | '3:4' | '9:16' | '16:9' | '4:3' | '1:1' | 'free';

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
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>('original');

  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, width: 100, height: 100 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 800,
  });
  const [imageError, setImageError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef<{
    mode: 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 's' | 'e' | 'w';
    startX: number;
    startY: number;
    startCrop: CropRect;
  } | null>(null);

  // When rotation is 90 or 270, effective width/height are swapped
  const isRotated90 = rotation === 90 || rotation === 270;
  const effectiveWidth = isRotated90 ? naturalDimensions.height : naturalDimensions.width;
  const effectiveHeight = isRotated90 ? naturalDimensions.width : naturalDimensions.height;
  const effectiveAspectRatio = effectiveWidth / (effectiveHeight || 1);

  // Initialize and reset when opening new image
  useEffect(() => {
    if (isOpen) {
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setZoom(1);
      setImageLoaded(false);
      setImageError(null);

      // Default to "original" or requested preset
      const initialAspect: AspectRatioOption =
        aspectRatioPreset === 'portrait'
          ? '3:4'
          : aspectRatioPreset === 'square'
          ? '1:1'
          : aspectRatioPreset === 'landscape'
          ? '16:9'
          : 'original';

      setAspectRatio(initialAspect);
    }
  }, [isOpen, imageUrl, aspectRatioPreset]);

  // Load natural dimensions when image loads
  const handleImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const w = img.naturalWidth || 1200;
    const h = img.naturalHeight || 800;
    setNaturalDimensions({ width: w, height: h });
    setImageLoaded(true);
    resetCropForAspect(aspectRatio, w, h, rotation);
  };

  const resetCropForAspect = (
    ratio: AspectRatioOption,
    w = naturalDimensions.width,
    h = naturalDimensions.height,
    currentRotation = rotation
  ) => {
    const isRot = currentRotation === 90 || currentRotation === 270;
    const effW = isRot ? h : w;
    const effH = isRot ? w : h;
    const imgRatio = effW / effH;

    if (ratio === 'original' || ratio === 'free') {
      setCrop({ x: 0, y: 0, width: 100, height: 100 });
      return;
    }

    let targetRatio = 1;
    if (ratio === '3:4') targetRatio = 3 / 4;
    else if (ratio === '9:16') targetRatio = 9 / 16;
    else if (ratio === '16:9') targetRatio = 16 / 9;
    else if (ratio === '4:3') targetRatio = 4 / 3;
    else if (ratio === '1:1') targetRatio = 1;

    // Calculate crop rectangle that fits inside the image maintaining target ratio
    if (targetRatio > imgRatio) {
      // Crop is wider than image: constrained by width
      const widthPct = 96;
      const heightPct = Math.min(100, (widthPct * imgRatio) / targetRatio);
      setCrop({
        x: (100 - widthPct) / 2,
        y: (100 - heightPct) / 2,
        width: widthPct,
        height: heightPct,
      });
    } else {
      // Crop is taller than image: constrained by height
      const heightPct = 96;
      const widthPct = Math.min(100, (heightPct * targetRatio) / imgRatio);
      setCrop({
        x: (100 - widthPct) / 2,
        y: (100 - heightPct) / 2,
        width: widthPct,
        height: heightPct,
      });
    }
  };

  const handleAspectRatioChange = (ratio: AspectRatioOption) => {
    setAspectRatio(ratio);
    resetCropForAspect(ratio, naturalDimensions.width, naturalDimensions.height, rotation);
  };

  // Rotation controls
  const handleRotateCw = () => {
    const nextRotation = (rotation + 90) % 360;
    setRotation(nextRotation);
    resetCropForAspect(aspectRatio, naturalDimensions.width, naturalDimensions.height, nextRotation);
  };

  const handleRotateCcw = () => {
    const nextRotation = (rotation - 90 + 360) % 360;
    setRotation(nextRotation);
    resetCropForAspect(aspectRatio, naturalDimensions.width, naturalDimensions.height, nextRotation);
  };

  const handleFlipH = () => setFlipH((prev) => !prev);
  const handleFlipV = () => setFlipV((prev) => !prev);

  const handleResetAll = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
    setAspectRatio('original');
    setCrop({ x: 0, y: 0, width: 100, height: 100 });
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
    if (!containerRect.width || !containerRect.height) return;

    const deltaX = ((e.clientX - dragStartRef.current.startX) / containerRect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.startY) / containerRect.height) * 100;
    const { mode, startCrop } = dragStartRef.current;

    let newCrop = { ...startCrop };

    if (mode === 'move') {
      newCrop.x = Math.max(0, Math.min(100 - startCrop.width, startCrop.x + deltaX));
      newCrop.y = Math.max(0, Math.min(100 - startCrop.height, startCrop.y + deltaY));
    } else {
      // Resizing with boundary clamps (min size 10%)
      if (mode.includes('e')) {
        newCrop.width = Math.max(10, Math.min(100 - startCrop.x, startCrop.width + deltaX));
      }
      if (mode.includes('s')) {
        newCrop.height = Math.max(10, Math.min(100 - startCrop.y, startCrop.height + deltaY));
      }
      if (mode.includes('w')) {
        const potentialWidth = startCrop.width - deltaX;
        if (potentialWidth >= 10 && startCrop.x + deltaX >= 0) {
          newCrop.x = startCrop.x + deltaX;
          newCrop.width = potentialWidth;
        }
      }
      if (mode.includes('n')) {
        const potentialHeight = startCrop.height - deltaY;
        if (potentialHeight >= 10 && startCrop.y + deltaY >= 0) {
          newCrop.y = startCrop.y + deltaY;
          newCrop.height = potentialHeight;
        }
      }

      // If aspect ratio is locked and not 'free' or 'original', constrain proportion
      if (aspectRatio !== 'free' && aspectRatio !== 'original') {
        let targetRatio = 1;
        if (aspectRatio === '3:4') targetRatio = 3 / 4;
        else if (aspectRatio === '9:16') targetRatio = 9 / 16;
        else if (aspectRatio === '16:9') targetRatio = 16 / 9;
        else if (aspectRatio === '4:3') targetRatio = 4 / 3;
        else if (aspectRatio === '1:1') targetRatio = 1;

        const normalizedRatio = targetRatio / effectiveAspectRatio;

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
    if (!imageRef.current) return;
    setIsProcessing(true);
    setImageError(null);

    try {
      const img = imageRef.current;
      const naturalWidth = img.naturalWidth || 1200;
      const naturalHeight = img.naturalHeight || 800;

      // 1. Create transformed canvas (applying rotation, flip, and zoom)
      const transformCanvas = document.createElement('canvas');
      transformCanvas.width = isRotated90 ? naturalHeight : naturalWidth;
      transformCanvas.height = isRotated90 ? naturalWidth : naturalHeight;

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
        finalCanvas.toBlob(resolve, 'image/webp', 0.94);
      });

      if (!blob) {
        const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.92);
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
        const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.92);
        onSave(dataUrl);
      } else {
        onSave(data.url);
      }

      onClose();
    } catch (err: any) {
      console.error('Error applying crop & rotate:', err);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[96vh] flex flex-col bg-himalaya-950 border border-himalaya-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-himalaya-800/80 bg-himalaya-900/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-terracotta/10 text-terracotta border border-terracotta/20">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-white leading-tight">
                Crop & Rotate Image
              </h3>
              <p className="text-[11px] text-parchment-400 font-light">
                Rotate upright and frame for your journal book or story
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

        {/* Main Interactive Canvas / Preview Area */}
        <div className="flex-1 min-h-[300px] max-h-[56vh] relative bg-black/95 p-3 sm:p-6 flex items-center justify-center overflow-hidden select-none">
          {/* Adaptive Container: matches exact aspect ratio of rotated image */}
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative flex items-center justify-center overflow-hidden rounded-xl border border-himalaya-700/60 bg-himalaya-950 shadow-2xl"
            style={{
              width: effectiveAspectRatio >= 1 ? '100%' : `${Math.min(100, effectiveAspectRatio * 100)}%`,
              maxWidth: effectiveAspectRatio >= 1 ? '580px' : `${Math.round(440 * effectiveAspectRatio)}px`,
              aspectRatio: `${effectiveAspectRatio}`,
              touchAction: 'none',
            }}
          >
            {/* The Image */}
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Target"
              crossOrigin="anonymous"
              onLoad={handleImageLoaded}
              onError={() => setImageLoaded(true)}
              style={{
                transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${
                  flipV ? -1 : 1
                }) scale(${zoom})`,
                transition: 'transform 0.15s ease-out',
                width: isRotated90 ? `${(effectiveHeight / effectiveWidth) * 100}%` : '100%',
                height: isRotated90 ? `${(effectiveWidth / effectiveHeight) * 100}%` : '100%',
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
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div></div>
                  </div>

                  {/* Corner Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'nw')}
                    className="absolute -top-2.5 -left-2.5 w-5 h-5 bg-terracotta border-2 border-white rounded-full cursor-nwse-resize shadow-md"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'ne')}
                    className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-terracotta border-2 border-white rounded-full cursor-nesw-resize shadow-md"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'sw')}
                    className="absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-terracotta border-2 border-white rounded-full cursor-nesw-resize shadow-md"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'se')}
                    className="absolute -bottom-2.5 -right-2.5 w-5 h-5 bg-terracotta border-2 border-white rounded-full cursor-nwse-resize shadow-md"
                  />

                  {/* Mid-edge Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'n')}
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/95 rounded-full cursor-ns-resize shadow"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 's')}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/95 rounded-full cursor-ns-resize shadow"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'w')}
                    className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-8 bg-white/95 rounded-full cursor-ew-resize shadow"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'e')}
                    className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-8 bg-white/95 rounded-full cursor-ew-resize shadow"
                  />
                </div>
              </div>
            )}

            {!imageLoaded && (
              <div className="flex flex-col items-center gap-2 text-parchment-300">
                <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
                <span className="text-xs">Loading image...</span>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="p-3.5 sm:p-5 bg-himalaya-900 border-t border-himalaya-800 space-y-3.5 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Aspect Ratio Presets with "Original" and "Book" prominently displayed */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] uppercase font-mono tracking-wider text-parchment-400 mr-1">
                Ratio:
              </span>

              {/* 1. ORIGINAL (Natural photo) */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('original')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all flex items-center gap-1 ${
                  aspectRatio === 'original'
                    ? 'bg-terracotta text-white shadow-warm ring-1 ring-white/30'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Original</span>
              </button>

              {/* 2. BOOK PAGE (3:4) */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('3:4')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1 ${
                  aspectRatio === '3:4'
                    ? 'bg-terracotta text-white shadow-warm ring-1 ring-white/30'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
                title="Best fit for Guest Book journal pages"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Book (3:4)</span>
              </button>

              {/* 3. STORY (9:16) */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('9:16')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1 ${
                  aspectRatio === '9:16'
                    ? 'bg-terracotta text-white shadow-warm ring-1 ring-white/30'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
                title="Instagram Story / Vertical phone format"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Story (9:16)</span>
              </button>

              {/* 4. HORIZONTAL (16:9) */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('16:9')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-terracotta text-white shadow-warm'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
              >
                16:9 (Horizontal)
              </button>

              {/* 5. PHOTO (4:3) */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('4:3')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  aspectRatio === '4:3'
                    ? 'bg-terracotta text-white shadow-warm'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
              >
                4:3
              </button>

              {/* 6. SQUARE (1:1) */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('1:1')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  aspectRatio === '1:1'
                    ? 'bg-terracotta text-white shadow-warm'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
              >
                1:1
              </button>

              {/* 7. FREE */}
              <button
                type="button"
                onClick={() => handleAspectRatioChange('free')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  aspectRatio === 'free'
                    ? 'bg-terracotta text-white shadow-warm'
                    : 'bg-himalaya-800 text-parchment-200 hover:text-white hover:bg-himalaya-750'
                }`}
              >
                Free
              </button>
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

          {/* Zoom & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-himalaya-800/80">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <ZoomOut className="w-4 h-4 text-parchment-400 shrink-0" />
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-28 sm:w-40 accent-terracotta h-1.5 bg-himalaya-800 rounded-lg cursor-pointer"
              />
              <ZoomIn className="w-4 h-4 text-parchment-400 shrink-0" />
              <span className="text-[11px] font-mono text-parchment-400 w-10">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {onSkipCrop && (
                <button
                  type="button"
                  onClick={onSkipCrop}
                  className="px-3.5 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-750 text-parchment-200 text-xs font-semibold tracking-wider transition-colors"
                >
                  Skip & Keep As-Is
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-750 text-parchment-300 text-xs font-semibold tracking-wider transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all disabled:opacity-50 shrink-0"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
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

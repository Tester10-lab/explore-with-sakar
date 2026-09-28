'use client';

import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

/**
 * Extracts a clean 11-character YouTube video ID from either:
 * - A pure video ID: "Bjf7Q75cm38"
 * - A standard watch URL: "https://www.youtube.com/watch?v=Bjf7Q75cm38"
 * - A short share URL: "https://youtu.be/Bjf7Q75cm38"
 * - An embed URL: "https://www.youtube.com/embed/Bjf7Q75cm38"
 */
function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();

  // If already an 11-char ID without slashes or question marks
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle standard watch URL
  const vMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (vMatch) return vMatch[1];

  // Handle youtu.be short URL
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Handle embed URL
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return trimmed;
}

export default function YouTubeEmbed({
  videoId,
  title = 'YouTube video player',
  className = '',
}: YouTubeEmbedProps) {
  const cleanId = extractYouTubeId(videoId);

  if (!cleanId) {
    return null;
  }

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-himalaya-950 border border-parchment-300 ring-1 ring-black/5 ${className}`}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${cleanId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}

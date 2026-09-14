'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, BookOpen, User } from 'lucide-react';
import { HandwrittenReviewPage } from '@/types/cms';

interface PageProps {
  imageUrl: string;
  guestName: string;
  country?: string;
  date?: string;
  number: number;
  index: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const isFirstImage = props.index === 0;
  const isSidewaysImage = props.index === 1 && props.imageUrl.includes('review-2.jpg');

  return (
    <div
      className="page bg-parchment-50 flex flex-col items-center justify-between overflow-hidden border-x border-parchment-300 relative h-full w-full"
      ref={ref}
    >
      <div className="absolute inset-0 p-2 sm:p-4 lg:p-6 pb-8 flex flex-col">
        {/* Guest Name in BOLD before review */}
        <div className="w-full bg-parchment-100/95 border border-parchment-300 rounded-t-md px-3 py-2 flex items-center justify-between shrink-0 shadow-sm z-10 mb-1.5">
          <div className="flex items-center space-x-2 truncate">
            <span className="w-2 h-2 rounded-full bg-terracotta shrink-0"></span>
            <span className="font-bold text-himalaya-950 font-editorial-serif text-xs sm:text-sm tracking-wide truncate">
              {props.guestName}
            </span>
          </div>
          {props.country && (
            <span className="text-[10px] sm:text-xs font-semibold text-terracotta uppercase tracking-wider shrink-0 ml-2">
              {props.country}
            </span>
          )}
        </div>

        {/* Scanned Handwritten Review Image */}
        <div className="relative w-full flex-1 rounded-b-md overflow-hidden shadow-subtle border border-parchment-200 bg-white flex items-center justify-center">
          <img
            src={props.imageUrl}
            alt={`${props.guestName} - Handwritten Review Page ${props.number}`}
            className={
              isFirstImage
                ? "w-full h-full object-contain object-center mix-blend-multiply opacity-95"
                : isSidewaysImage
                ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 w-[150%] h-[150%] max-w-none object-contain object-center mix-blend-multiply opacity-95"
                : "w-full h-full object-contain object-center mix-blend-multiply opacity-95"
            }
          />
        </div>
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] sm:text-xs text-himalaya-500 font-display-serif">
        — Page {props.number} —
      </div>
    </div>
  );
});

Page.displayName = 'Page';

interface GuestBookProps {
  initialPages?: HandwrittenReviewPage[];
}

export default function GuestBook({ initialPages }: GuestBookProps) {
  const bookRef = React.useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 450, height: 650 });
  const [pages, setPages] = useState<HandwrittenReviewPage[]>(initialPages || []);

  useEffect(() => {
    async function loadLivePages() {
      try {
        const res = await fetch('/api/public/content');
        if (res.ok) {
          const data = await res.json();
          if (data.handwrittenReviews && data.handwrittenReviews.length > 0) {
            setPages(data.handwrittenReviews);
            return;
          }
        }
      } catch (e) {
        // Fallback below
      }

      if (pages.length === 0) {
        setPages(
          Array.from({ length: 20 }, (_, i) => ({
            id: `hw-${i + 1}`,
            guestName: i === 0 ? 'Elena & Marcus Weber' : i === 1 ? 'Dr. Alistair Campbell' : i === 2 ? 'Sarah Lin & David Chen' : `Guest Reviewer #${i + 1}`,
            country: i === 0 ? 'Switzerland' : i === 1 ? 'United Kingdom' : i === 2 ? 'Canada' : 'International Traveler',
            date: 'Himalayan Journal',
            image: `/images/reviews/review-${i + 1}.jpg`,
            pageNumber: i + 1,
            isVisible: true,
            order: i + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))
        );
      }
    }

    if (!initialPages || initialPages.length === 0) {
      loadLivePages();
    }
  }, [initialPages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDimensions({ width: 300, height: 450 });
      } else if (window.innerWidth < 1024) {
        setDimensions({ width: 400, height: 600 });
      } else {
        setDimensions({ width: 500, height: 700 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    try {
      bookRef.current?.pageFlip()?.flipNext();
    } catch (e) {
      console.warn('Page flip error', e);
    }
  };

  const handlePrev = () => {
    try {
      bookRef.current?.pageFlip()?.flipPrev();
    } catch (e) {
      console.warn('Page flip error', e);
    }
  };

  const visiblePages = pages.filter((p) => p.isVisible !== false);
  const totalPages = visiblePages.length + 2; // cover + pages + back cover

  return (
    <div className="flex flex-col justify-center items-center w-full py-8 relative z-10">
      {/* Flip Instruction Hint */}
      <div className="flex items-center gap-2 text-xs text-himalaya-600 bg-sand/80 px-4 py-1.5 rounded-full border border-parchment-300 mb-6 shadow-subtle">
        <BookOpen className="w-3.5 h-3.5 text-terracotta" />
        <span>Click page corners or use the controls below to flip through {visiblePages.length} handwritten pages</span>
      </div>

      <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto">
        {/* Left Side Quick Arrow for Desktop */}
        <button
          onClick={handlePrev}
          aria-label="Previous Page"
          className="hidden md:flex absolute left-2 lg:-left-6 z-20 w-12 h-12 rounded-full bg-white/95 border border-parchment-300 text-himalaya-800 shadow-floating items-center justify-center hover:bg-terracotta hover:text-white hover:border-terracotta transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={300}
          maxWidth={600}
          minHeight={450}
          maxHeight={850}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="guestbook-flip shadow-2xl mx-auto"
          style={{ margin: '0 auto' }}
          onFlip={(e: any) => setCurrentPage(e.data)}
        >
          {/* Cover Page */}
          <div
            className="page page-cover page-cover-top bg-himalaya-950 border border-himalaya-900 shadow-inner flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
            data-density="hard"
          >
            <div className="absolute inset-0 bg-himalaya-900/50 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center border-2 border-saffron-dark/40 p-8 sm:p-12 m-4 rounded-sm bg-himalaya-950/80 backdrop-blur-sm shadow-xl w-3/4">
              <span className="text-terracotta text-xs sm:text-sm uppercase tracking-widest font-bold mb-4 text-center">
                Travelers' Words
              </span>
              <h2 className="text-parchment-100 font-editorial-serif text-2xl sm:text-4xl text-center leading-tight">
                Sakar's <br />Guest <br />Journal
              </h2>
              <div className="mt-8 w-12 h-[1px] bg-terracotta/50"></div>
              <span className="text-[10px] text-parchment-300 uppercase tracking-widest mt-4">
                Click to Open
              </span>
            </div>
            {/* Book spine aesthetic */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent border-r border-black/20"></div>
          </div>

          {/* Inner Pages with BOLD Guest Names */}
          {visiblePages.map((page, index) => (
            <Page
              key={page.id || index}
              guestName={page.guestName}
              country={page.country}
              date={page.date}
              imageUrl={page.image}
              number={index + 1}
              index={index}
            />
          ))}

          {/* Back Cover */}
          <div
            className="page page-cover page-cover-bottom bg-himalaya-950 border border-himalaya-900 shadow-inner flex flex-col items-center justify-center relative"
            data-density="hard"
          >
            <div className="absolute inset-0 bg-himalaya-900/50 mix-blend-overlay"></div>
            <div className="relative z-10 text-saffron-dark font-editorial-serif text-xl opacity-50 text-center px-4">
              <p className="mb-2">Explore With Sakar</p>
              <p className="text-xs font-sans uppercase tracking-widest text-parchment-500/30">
                Responsible Tour Director
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent border-l border-black/20"></div>
          </div>
        </HTMLFlipBook>

        {/* Right Side Quick Arrow for Desktop */}
        <button
          onClick={handleNext}
          aria-label="Next Page"
          className="hidden md:flex absolute right-2 lg:-left-6 z-20 w-12 h-12 rounded-full bg-white/95 border border-parchment-300 text-himalaya-800 shadow-floating items-center justify-center hover:bg-terracotta hover:text-white hover:border-terracotta transition-all md:right-2 lg:-right-6"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls for Mobile & Accessibility */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-himalaya-950 text-himalaya-900 hover:text-white border border-parchment-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-subtle flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-semibold text-himalaya-700 bg-sand px-4 py-2 rounded-full border border-parchment-300">
          Page {Math.min(currentPage + 1, totalPages)} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          className="px-5 py-2.5 rounded-full bg-himalaya-950 hover:bg-terracotta text-white border border-transparent font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-subtle flex items-center gap-2"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

const Page = forwardRef<HTMLDivElement, { imageUrl: string; number: number; index: number }>((props, ref) => {
  const isFirstImage = props.index === 0;
  const isSidewaysImage = props.index === 1; // Only review-2.jpg is sideways (top on left)

  return (
    <div className="page bg-parchment-50 flex items-center justify-center overflow-hidden border-x border-parchment-300 relative h-full w-full" ref={ref}>
      <div className="absolute inset-0 p-2 sm:p-4 lg:p-6 pb-8">
        <div className="relative w-full h-full rounded-md overflow-hidden shadow-subtle border border-parchment-200 bg-white flex items-center justify-center">
           <img
             src={props.imageUrl}
             alt={`Guest Review Page ${props.number}`}
             className={
               isFirstImage 
                 ? "w-full h-full object-contain object-center mix-blend-multiply opacity-95" 
                 : isSidewaysImage
                   ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 w-[150%] h-[150%] max-w-none object-contain object-center mix-blend-multiply opacity-95"
                   : "w-full h-full object-cover object-center mix-blend-multiply opacity-95"
             }
           />
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] sm:text-xs text-himalaya-500 font-display-serif">
        — {props.number} —
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default function GuestBook() {
  const [dimensions, setDimensions] = useState({ width: 450, height: 650 });
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

  const pages = Array.from({ length: 20 }, (_, i) => `/explore-with-sakar/images/reviews/review-${i + 1}.jpg`);

  return (
    <div className="flex justify-center items-center w-full py-12 relative z-10">
      {/* @ts-ignore */}
      <HTMLFlipBook 
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
      >
        {/* Cover Page */}
        <div className="page page-cover page-cover-top bg-himalaya-950 border border-himalaya-900 shadow-inner flex flex-col items-center justify-center relative overflow-hidden" data-density="hard">
            <div className="absolute inset-0 bg-himalaya-900/50 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center border-2 border-saffron-dark/40 p-8 sm:p-12 m-4 rounded-sm bg-himalaya-950/80 backdrop-blur-sm shadow-xl w-3/4">
                <span className="text-terracotta text-xs sm:text-sm uppercase tracking-widest font-bold mb-4 text-center">Travelers' Words</span>
                <h2 className="text-parchment-100 font-editorial-serif text-2xl sm:text-4xl text-center leading-tight">Sakar's <br/>Guest <br/>Journal</h2>
                <div className="mt-8 w-12 h-[1px] bg-terracotta/50"></div>
            </div>
            {/* Book spine aesthetic */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent border-r border-black/20"></div>
        </div>

        {/* Inner Pages */}
        {pages.map((url, index) => (
          <Page key={index} imageUrl={url} number={index + 1} index={index} />
        ))}

        {/* Back Cover */}
        <div className="page page-cover page-cover-bottom bg-himalaya-950 border border-himalaya-900 shadow-inner flex flex-col items-center justify-center relative" data-density="hard">
             <div className="absolute inset-0 bg-himalaya-900/50 mix-blend-overlay"></div>
             <div className="relative z-10 text-saffron-dark font-editorial-serif text-xl opacity-50 text-center px-4">
                 <p className="mb-2">Explore With Sakar</p>
                 <p className="text-xs font-sans uppercase tracking-widest text-parchment-500/30">Responsible Tour Director</p>
             </div>
             <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent border-l border-black/20"></div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}

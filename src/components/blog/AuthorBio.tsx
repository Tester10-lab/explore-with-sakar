'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

interface AuthorBioProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="my-12 p-6 sm:p-8 rounded-3xl bg-sand border border-parchment-300 shadow-subtle">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-terracotta shadow-warm">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-3 flex-1">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
              About The Author & Guide
            </span>
            <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
              {author.name}
            </h3>
            <p className="text-xs text-himalaya-600 font-medium">{author.role}</p>
          </div>

          <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed">
            {author.bio}
          </p>

          <div className="pt-1">
            <Link
              href="/#about"
              className="inline-flex items-center text-xs font-bold text-terracotta hover:text-terracotta-dark transition-colors group"
            >
              <span>Meet Sakar & Learn About His Approach</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

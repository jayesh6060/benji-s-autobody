'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryData } from '@/data/gallery';
import { ArrowRight } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'collision' | 'paint' | 'dent' | 'bumper'>('all');

  const filteredItems = galleryData.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'collision', label: 'Collision & Frame' },
    { id: 'paint', label: 'Custom Paint' },
    { id: 'dent', label: 'Dent Repair' },
    { id: 'bumper', label: 'Bumper' },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-block text-sm font-semibold text-blue-600 tracking-wide uppercase">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Work <span className="text-blue-600">Portfolio</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Real repair projects completed by Benji — from severe collision damage to precision paint matching.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-blue-300 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.beforeImage}
                  alt={`${item.vehicle} - ${item.title}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-md bg-blue-600 text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  {item.vehicle}
                </span>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <a
                    href="#book-now"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Repair</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

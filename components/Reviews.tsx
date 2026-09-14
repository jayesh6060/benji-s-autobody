'use client';

import React, { useState } from 'react';
import { reviewsData } from '@/data/reviews';
import { business } from '@/config/business';
import ReviewModal from './ReviewModal';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Reviews() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="reviews" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
            04 // VERIFIED CLIENT TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            CLIENT <span className="text-blue-600">REVIEWS</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Real reviews from real vehicle owners across St. Charles and surrounding areas.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="inline-flex items-center gap-4 p-3 px-6 rounded-xl bg-slate-50 border border-slate-200 mt-4 shadow-sm font-mono text-xs">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900">
              {business.googleRating} / 5.0 RATING ({business.totalReviewsCount} REVIEWS)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-blue-600 transition-all space-y-6 shadow-sm hover:shadow-lg relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>VERIFIED REPAIR</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Vehicle Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{review.name}</h4>
                  <p className="font-mono text-xs text-blue-600 font-bold">{review.vehicle}</p>
                </div>
                <span className="font-mono text-[11px] text-slate-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA: Leave a Review */}
        <div className="text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-50 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>[ LEAVE A CUSTOMER REVIEW ]</span>
          </button>
        </div>

      </div>

      <ReviewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

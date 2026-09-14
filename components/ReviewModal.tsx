'use client';

import React, { useState } from 'react';
import { formatReviewWhatsAppUrl } from '@/lib/inquiry';
import { X, Star, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      setError('Please enter your review comment.');
      return;
    }

    setError('');
    const whatsappUrl = formatReviewWhatsAppUrl({
      name,
      vehicle,
      rating,
      comment,
    });

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>LEAVE A REVIEW</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase mb-1">STAR RATING</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200 fill-slate-100'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase mb-1">
              YOUR NAME *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Miller"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase mb-1">
              VEHICLE REPAIRED (OPTIONAL)
            </label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="e.g. 2022 Ford F-150"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase mb-1">
              YOUR REVIEW / EXPERIENCE *
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell Benji how your repair turned out..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none font-sans"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>[ SEND REVIEW VIA WHATSAPP ]</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { business } from '@/config/business';
import { X, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
  photosAttached: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  whatsappUrl,
  photosAttached,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            ESTIMATE REQUEST FORMATTED!
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            WhatsApp should have opened with your inquiry pre-filled. <strong className="text-blue-600 font-bold">Simply tap "SEND" in WhatsApp</strong> to reach Benji directly!
          </p>
        </div>

        {/* Photos Reminder Badge */}
        {photosAttached && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 text-left space-y-1 font-mono">
            <p className="font-bold flex items-center gap-1.5 text-blue-700">
              <span>📷 DAMAGE PHOTOS ATTACHED</span>
            </p>
            <p className="text-slate-600 font-sans">
              Please attach your damage photos in the WhatsApp chat window that just opened so Benji can review them instantly!
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>[ OPEN WHATSAPP & PRESS SEND ]</span>
          </a>

          <a
            href={`tel:${business.ownerPhone}`}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>CALL OWNER: {business.formattedPhone}</span>
          </a>
        </div>

      </div>
    </div>
  );
}

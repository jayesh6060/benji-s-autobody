'use client';

import React from 'react';
import { business } from '@/config/business';
import { Phone, Calendar, MessageSquare } from 'lucide-react';

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2.5 px-4 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${business.ownerPhone}`}
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-mono text-xs font-bold active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-blue-600" />
          <span>CALL</span>
        </a>

        {/* Book Button */}
        <a
          href="#book-now"
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold shadow-md active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          <span>BOOK</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${business.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold active:scale-95 transition-transform shadow-sm"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}

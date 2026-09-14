'use client';

import React from 'react';
import Image from 'next/image';
import { business } from '@/config/business';
import { Phone, MessageSquare, MapPin, Clock, Instagram, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090D16] border-t border-slate-800 pt-16 pb-28 md:pb-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand Info & Real Logo */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg border border-slate-700 bg-white p-0.5 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Benjis Autobody Official Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white uppercase block leading-none">
                  BENJI'S
                </span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-blue-400 uppercase block">
                  AUTOBODY
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {business.tagline}. Dedicated to bringing your vehicle back to factory perfection with honest owner-operated service.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${business.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500 transition-all shadow-sm"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">[ CONTACT BENJI ]</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-500 font-mono text-xs uppercase">DIRECT PHONE</span>
                  <a href={`tel:${business.ownerPhone}`} className="text-white hover:text-blue-400 font-mono font-bold">
                    {business.formattedPhone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-500 font-mono text-xs uppercase">WHATSAPP INBOX</span>
                  <a
                    href={`https://wa.me/${business.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-mono font-bold"
                  >
                    SEND DIRECT MESSAGE
                  </a>
                </div>
              </li>

              {business.ownerEmail && (
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-500 font-mono text-xs uppercase">EMAIL</span>
                    <a href={`mailto:${business.ownerEmail}`} className="text-white hover:text-blue-400">
                      {business.ownerEmail}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Location & Hours */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">[ LOCATION & HOURS ]</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{business.address}</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{business.hours}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">[ NAVIGATION ]</h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors uppercase">01 // SERVICES & PRICING</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-blue-400 transition-colors uppercase">02 // STANDARDS & WARRANTY</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-blue-400 transition-colors uppercase">03 // WORK PORTFOLIO</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-blue-400 transition-colors uppercase">04 // CLIENT REVIEWS</a>
              </li>
              <li>
                <a href="#book-now" className="hover:text-blue-400 transition-colors uppercase">05 // GET FREE ESTIMATE</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors uppercase">06 // FREQUENT QUESTIONS</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} {business.name}. OFFICIAL INSTAGRAM @BENJIS_AUTOBODY.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500 transition-all"
          >
            <span>[ TOP ]</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}

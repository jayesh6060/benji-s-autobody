'use client';

import React from 'react';
import Image from 'next/image';
import { business } from '@/config/business';
import { Phone, MessageSquare, ShieldCheck, Star, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden bg-[#F8FAFC] bg-grid-pattern">
      {/* Background Subtle Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-shop.jpg"
          alt="Benjis Auto Body Shop"
          fill
          priority
          className="object-cover object-center opacity-5 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/95 to-[#F8FAFC]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Architectural Monospace Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>DIRECT OWNER TECHNICIAN • ST. CHARLES, MO</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] uppercase">
              ARCHITECTURAL <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">COLLISION REPAIR</span> & AUTO RESTORATION
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Uncompromising standards for modern vehicles. Computerized laser frame alignment, spectrophotometer paint matching, and direct insurance claims — executed personally by master technician <strong className="text-slate-900 font-bold">Benji</strong>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#book-now"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-600/25 hover:scale-[1.01] active:scale-[0.99] transition-all group"
              >
                <MessageSquare className="w-4 h-4" />
                <span>[ INITIALIZE ESTIMATE ]</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`tel:${business.ownerPhone}`}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-mono text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>CALL: {business.formattedPhone}</span>
              </a>
            </div>

            {/* Quick Technical Highlights Bar */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">[ STANDARDS ]</span>
                <p className="text-xs font-bold text-slate-900">I-CAR MASTER</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">[ EXPERIENCE ]</span>
                <p className="text-xs font-bold text-slate-900">{business.yearsInBusiness} YEARS</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">[ RATING ]</span>
                <p className="text-xs font-bold text-slate-900">{business.googleRating} ★ GOOGLE</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">[ WARRANTY ]</span>
                <p className="text-xs font-bold text-slate-900">LIFETIME CRAFT</p>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Hero Floating Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-6 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs font-bold text-slate-900 uppercase">WHATSAPP DIRECT SUITE</span>
                </div>
                <span className="font-mono text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200">
                  NO MIDDLEMAN
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">01 // COLLISION REPAIR</span>
                  <span className="font-bold text-slate-900">OEM TOLERANCE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">02 // PAINT MATCHING</span>
                  <span className="font-bold text-slate-900">SPECTRAL READ</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">03 // INSURANCE CLAIMS</span>
                  <span className="font-bold text-blue-600">DIRECT BILLING</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${business.whatsappNumber}?text=Hi%20Benji,%20I'd%20like%20to%20request%20a%20repair%20estimate.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>DIRECT INBOX CHAT</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

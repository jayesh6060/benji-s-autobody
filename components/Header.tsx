'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { business } from '@/config/business';
import { Phone, MessageSquare, Menu, X, ChevronRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Portfolio', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Real Logo & Business Title */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-slate-200 bg-white p-0.5 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Benjis Autobody Real Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <span className="font-oswald font-bold text-2xl text-[#1a2a5e] uppercase block leading-none tracking-tight">
                BENJI'S
              </span>
              <span className="font-oswald text-[11px] font-medium tracking-widest text-blue-600 uppercase block">
                AUTOBODY RESTORATION
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold text-slate-600 hover:text-[#1a2a5e] transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${business.ownerPhone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>{business.formattedPhone}</span>
            </a>

            <a
              href="#book-now"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-600/25 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Book Estimate</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 mt-3 space-y-3 animate-fadeIn shadow-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href={`tel:${business.ownerPhone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 text-slate-900 font-mono text-xs font-bold border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>CALL OWNER: {business.formattedPhone}</span>
            </a>
            <a
              href="#book-now"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Free Estimate</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

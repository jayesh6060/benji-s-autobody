'use client';

import React from 'react';
import { servicesData } from '@/data/services';
import { ShieldAlert, Palette, Sparkles, Wrench, ShieldCheck, FileCheck, ArrowRight, CheckCircle2, Info } from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-blue-600" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleBookService = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const bookElem = document.getElementById('book-now');
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
            01 // CAPABILITIES & PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            SERVICE <span className="text-blue-600">SPECIFICATIONS</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From minor bumper scuffs to major structural collision rebuilds, Benji delivers factory-quality craftsmanship with full transparency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={`relative rounded-2xl bg-white border transition-all duration-300 p-8 flex flex-col justify-between group hover:border-blue-600 hover:shadow-2xl ${
                service.popular ? 'border-blue-300 shadow-md ring-1 ring-blue-200' : 'border-slate-200 shadow-sm'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 bg-blue-600 text-white font-mono text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest shadow-sm">
                  MOST REQUESTED
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">0{index + 1}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">STARTING AT</span>
                    <span className="font-mono text-base font-bold text-slate-900">{service.startingPrice}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2.5 border-t border-slate-100 pt-5 mb-8">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBookService(service.title)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all group-hover:shadow-md"
              >
                <span>[ ESTIMATE SERVICE ]</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Price Disclaimer Notice */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3 text-center text-xs text-slate-600 max-w-2xl mx-auto font-mono">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Note: Final pricing varies depending on vehicle make/model and replacement parts after in-person inspection.</span>
        </div>

      </div>
    </section>
  );
}

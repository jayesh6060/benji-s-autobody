'use client';

import React from 'react';
import Image from 'next/image';
import { business } from '@/config/business';
import { ShieldCheck, UserCheck, Clock, FileText, Cpu, CheckCircle } from 'lucide-react';

export default function WhyChooseUs() {
  const trustPoints = [
    {
      icon: UserCheck,
      code: "ST-01",
      title: "100% Direct Owner Technician",
      desc: "No corporate middleman or inexperienced estimators. Benji inspects, repairs, and quality checks every vehicle himself."
    },
    {
      icon: ShieldCheck,
      code: "ST-02",
      title: "Lifetime Workmanship Warranty",
      desc: "We stand behind all structural repairs and custom paint blending with a limited lifetime warranty for as long as you own the car."
    },
    {
      icon: FileText,
      code: "ST-03",
      title: "Zero Stress Insurance Support",
      desc: "Direct claim processing with State Farm, Geico, Progressive, USAA, and all major carriers. We file supplements so you pay $0 unexpected out of pocket."
    },
    {
      icon: Cpu,
      code: "ST-04",
      title: "Laser Frame & Spectral Match",
      desc: "State-of-the-art computerized laser alignment racks and digital spectrophotometers ensure exact factory paint color & chassis tolerance."
    },
    {
      icon: Clock,
      code: "ST-05",
      title: "Fast Turnaround Guarantee",
      desc: "Express repair scheduling and direct parts ordering keep your vehicle out of the shop and back on the road in days, not weeks."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
            02 // UNCOMPROMISING STANDARDS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            BUILT ON TRUST & <span className="text-blue-600">PRECISION</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            When you bring your vehicle to Benjis Auto Body, you're dealing directly with the craftsman whose name is on the sign.
          </p>
        </div>

        {/* Grid: Left Owner Feature Card + Right 5 Trust Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Owner Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#F8FAFC] p-6 shadow-xl space-y-6">
              
              <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                <Image
                  src="/images/owner-benji.jpg"
                  alt="Benji Owner Auto Body Specialist"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-lg">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">Benji</h4>
                    <p className="font-mono text-xs text-blue-600 font-bold">FOUNDER & MASTER TECH</p>
                  </div>
                  <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded">15+ YRS</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-extrabold text-slate-900">"My Personal Promise To Every Customer"</h3>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "I treat every car in my shop like it belongs to my own family. You will never get generic call center transfers or cut corners here — just honest advice, fair prices, and flawless metal and paint work."
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between font-mono text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>I-CAR CERTIFIED</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>ASE MASTER TECH</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Trust Points Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {trustPoints.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border border-slate-200 p-6 hover:border-blue-600 hover:shadow-xl transition-all ${
                    idx === 0 ? 'sm:col-span-2 bg-gradient-to-r from-blue-50/50 to-white border-blue-200 shadow-md' : 'shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-400">{item.code}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

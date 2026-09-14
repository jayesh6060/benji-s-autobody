'use client';

import React, { useState } from 'react';
import { faqsData } from '@/data/faqs';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
            05 // FREQUENT INQUIRIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            FREQUENTLY ASKED <span className="text-blue-600">QUESTIONS</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about getting estimates, insurance claims, warranties, and repair turnarounds.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-slate-400">0{index + 1}</span>
                    <span className="text-base font-bold text-slate-900 pr-4">{faq.question}</span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

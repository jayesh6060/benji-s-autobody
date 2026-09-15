'use client';

import React, { useState } from 'react';
import { DamageType, DamageSeverity } from '@/types/visualizer';
import { X, Wrench, ShieldAlert } from 'lucide-react';

interface DamageModalProps {
  panelName: string;
  onSave: (type: DamageType, severity: DamageSeverity, notes: string) => void;
  onClose: () => void;
}

const DAMAGE_TYPES: DamageType[] = [
  'Dent',
  'Scratch',
  'Paint Damage',
  'Crack',
  'Collision Damage',
  'Rust',
  'Other',
];

const SEVERITY_LEVELS: { level: DamageSeverity; label: string; desc: string; color: string }[] = [
  { level: 'Minor', label: 'Minor', desc: 'Cosmetic scratch or small ding', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
  { level: 'Moderate', label: 'Moderate', desc: 'Deep dent or scraped paint', color: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
  { level: 'Severe', label: 'Severe', desc: 'Cracked panel or structural collision', color: 'border-rose-500/50 bg-rose-500/10 text-rose-400' },
];

export default function DamageModal({ panelName, onSave, onClose }: DamageModalProps) {
  const [selectedType, setSelectedType] = useState<DamageType>('Dent');
  const [selectedSeverity, setSelectedSeverity] = useState<DamageSeverity>('Moderate');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedType, selectedSeverity, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0b132b] rounded-2xl border border-slate-700/80 shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-oswald uppercase tracking-wide">
                Mark Damage — {panelName}
              </h3>
              <p className="text-xs text-slate-400">Specify damage details for this section</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Damage Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              What type of damage is here?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DAMAGE_TYPES.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-2.5 text-xs font-semibold rounded-xl border transition text-center ${
                    selectedType === type
                      ? 'border-[#e63946] bg-[#e63946]/15 text-white shadow-md'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Damage Severity */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              How severe is it?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SEVERITY_LEVELS.map((s) => (
                <button
                  type="button"
                  key={s.level}
                  onClick={() => setSelectedSeverity(s.level)}
                  className={`p-3 rounded-xl border transition text-left flex flex-col justify-between ${
                    selectedSeverity === s.level
                      ? `${s.color} border-2 shadow-lg`
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs uppercase font-oswald">{s.label}</span>
                  <span className="text-[10px] leading-tight opacity-80 mt-1">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us anything else about the damage (e.g. key scrape, hit parking pole...)"
              className="w-full h-20 px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#e63946] transition resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition uppercase tracking-wider font-oswald"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-xs font-bold text-white bg-[#e63946] hover:bg-[#c92a37] rounded-xl transition shadow-lg uppercase tracking-wider font-oswald flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Add Damage Marker</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

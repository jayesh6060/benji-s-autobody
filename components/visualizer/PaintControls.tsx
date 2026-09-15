'use client';

import React from 'react';
import { PRESET_COLORS, PaintFinish, CAR_PANELS } from '@/types/visualizer';
import { Palette, Sparkles, Check } from 'lucide-react';

interface PaintControlsProps {
  selectedPanelId: string | null;
  selectedPanelName: string | null;
  activeColor: string;
  activeFinish: PaintFinish;
  onApplyPaint: (panelId: string | 'all', color: string, finish: PaintFinish) => void;
}

const FINISHES: { id: PaintFinish; label: string; desc: string }[] = [
  { id: 'gloss', label: 'High Gloss', desc: 'Ultra shiny reflective mirror finish' },
  { id: 'metallic', label: 'Metallic', desc: 'Deep metallic flakes & rich sheen' },
  { id: 'pearl', label: 'Pearl', desc: 'Color-shifting subtle iridescence' },
  { id: 'matte', label: 'Stealth Matte', desc: 'Flat non-reflective satin look' },
];

export default function PaintControls({
  selectedPanelId,
  selectedPanelName,
  activeColor,
  activeFinish,
  onApplyPaint,
}: PaintControlsProps) {
  const targetName = selectedPanelName ? selectedPanelName : 'Whole Vehicle';
  const targetId = selectedPanelId ? selectedPanelId : 'all';

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-oswald uppercase tracking-wider">Paint & Color Visualizer</h4>
            <p className="text-[11px] text-slate-400">
              Targeting: <strong className="text-blue-400">{targetName}</strong>
            </p>
          </div>
        </div>

        {selectedPanelId && (
          <button
            onClick={() => onApplyPaint('all', activeColor, activeFinish)}
            className="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700 transition"
          >
            Apply to Whole Car
          </button>
        )}
      </div>

      {/* 1. Preset Color Swatches */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Select Paint Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => onApplyPaint(targetId, c.hex, activeFinish)}
              className={`group relative p-2 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                activeColor.toLowerCase() === c.hex.toLowerCase()
                  ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border border-slate-700/80 shadow-md flex items-center justify-center transition group-hover:scale-110"
                style={{ backgroundColor: c.hex }}
              >
                {activeColor.toLowerCase() === c.hex.toLowerCase() && (
                  <Check className={`w-3.5 h-3.5 ${c.hex === '#F0F2F5' ? 'text-slate-900' : 'text-white'}`} />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-300 truncate w-full text-center">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Custom Color Picker */}
        <div className="mt-3 flex items-center gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
          <label className="text-xs font-medium text-slate-400 flex-1">Custom Color Hex:</label>
          <input
            type="color"
            value={activeColor}
            onChange={(e) => onApplyPaint(targetId, e.target.value, activeFinish)}
            className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
          />
          <span className="text-xs font-mono text-slate-200 uppercase bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {activeColor}
          </span>
        </div>
      </div>

      {/* 2. Paint Finish Options */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Paint Finish & Texture</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FINISHES.map((f) => (
            <button
              key={f.id}
              onClick={() => onApplyPaint(targetId, activeColor, f.id)}
              className={`p-2.5 rounded-xl border text-left transition ${
                activeFinish === f.id
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold font-oswald uppercase tracking-wide">{f.label}</div>
              <div className="text-[10px] opacity-75 leading-tight truncate">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

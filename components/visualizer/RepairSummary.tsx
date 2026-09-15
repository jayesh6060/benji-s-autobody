'use client';

import React from 'react';
import { DamageMarker, PanelPaint, UploadedPhoto } from '@/types/visualizer';
import { ShieldAlert, Trash2, ArrowRight, CheckCircle2, Wrench, Palette } from 'lucide-react';

interface RepairSummaryProps {
  damageMarkers: DamageMarker[];
  panelPaints: Record<string, PanelPaint>;
  photos: UploadedPhoto[];
  onRemoveMarker: (id: string) => void;
  onClearAll: () => void;
  onRequestEstimate: () => void;
}

export default function RepairSummary({
  damageMarkers,
  panelPaints,
  photos,
  onRemoveMarker,
  onClearAll,
  onRequestEstimate,
}: RepairSummaryProps) {
  const totalItems = damageMarkers.length + Object.keys(panelPaints).length;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-base font-bold text-white font-oswald uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#e63946]" />
            <span>Repair Summary</span>
          </h4>
          <p className="text-xs text-slate-400">
            {damageMarkers.length} Damage Markers • {Object.keys(panelPaints).length} Custom Paints • {photos.length} Photos
          </p>
        </div>

        {totalItems > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition bg-slate-800 hover:bg-slate-700/80 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Selected Damage Items List */}
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
        {damageMarkers.length === 0 && Object.keys(panelPaints).length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            No damage or paint options selected yet. Click any car panel on the 3D model to begin!
          </div>
        ) : (
          <>
            {damageMarkers.map((marker) => (
              <div
                key={marker.id}
                className="flex items-start justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0 animate-pulse" />
                  <div>
                    <div className="font-bold text-white">{marker.panelName}</div>
                    <div className="text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                      <span className="text-rose-400 font-semibold">{marker.type}</span>
                      <span>•</span>
                      <span className="uppercase font-mono text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        {marker.severity}
                      </span>
                    </div>
                    {marker.notes && <p className="text-[10px] text-slate-400 italic mt-1 font-sans">"{marker.notes}"</p>}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveMarker(marker.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition"
                  title="Remove Marker"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Custom Paints Summary */}
            {Object.values(panelPaints).map((p) => (
              <div
                key={p.panelId}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: p.color }} />
                  <div>
                    <span className="font-bold text-white uppercase text-[11px] font-oswald">{p.panelId === 'all' ? 'Whole Car' : p.panelId}</span>
                    <span className="text-slate-400 text-[10px] block capitalize">{p.finish} finish</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Custom Paint
                </span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Primary CTA */}
      <button
        onClick={onRequestEstimate}
        className="w-full py-4 bg-[#e63946] hover:bg-[#c92a37] text-white font-bold font-oswald text-base uppercase tracking-wider rounded-xl transition shadow-xl hover:shadow-[#e63946]/30 flex items-center justify-center gap-2"
      >
        <span>Request Estimate with 3D Summary</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

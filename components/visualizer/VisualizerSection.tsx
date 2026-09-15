'use client';

import React, { useState } from 'react';
import Canvas3DViewer from './Canvas3DViewer';
import DamageModal from './DamageModal';
import PaintControls from './PaintControls';
import PhotoUploader from './PhotoUploader';
import RepairSummary from './RepairSummary';
import { DamageMarker, PanelPaint, VisualizerMode, UploadedPhoto, DamageType, DamageSeverity, PaintFinish, CAR_PANELS } from '@/types/visualizer';
import { Wrench, Palette, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface VisualizerSectionProps {
  onTransferEstimateData?: (data: {
    markers: DamageMarker[];
    paints: Record<string, PanelPaint>;
    photos: UploadedPhoto[];
  }) => void;
}

export default function VisualizerSection({ onTransferEstimateData }: VisualizerSectionProps) {
  const [mode, setMode] = useState<VisualizerMode>('damage');
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);
  const [selectedPanelName, setSelectedPanelName] = useState<string | null>(null);
  const [tempIntersectionPoint, setTempIntersectionPoint] = useState<[number, number, number] | null>(null);
  const [isDamageModalOpen, setIsDamageModalOpen] = useState(false);

  const [damageMarkers, setDamageMarkers] = useState<DamageMarker[]>([]);
  const [panelPaints, setPanelPaints] = useState<Record<string, PanelPaint>>({});
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  const [activeColor, setActiveColor] = useState('#1A2A5E');
  const [activeFinish, setActiveFinish] = useState<PaintFinish>('metallic');

  // Handle panel selection from 3D canvas
  const handleSelectPanel = (panelId: string, panelName: string, point?: [number, number, number]) => {
    setSelectedPanelId(panelId);
    setSelectedPanelName(panelName);

    if (mode === 'damage') {
      setTempIntersectionPoint(point || [0, 0.8, 0]);
      setIsDamageModalOpen(true);
    }
  };

  // Save new damage marker
  const handleSaveDamage = (type: DamageType, severity: DamageSeverity, notes: string) => {
    if (!selectedPanelId || !selectedPanelName || !tempIntersectionPoint) return;

    const newMarker: DamageMarker = {
      id: `dmg_${Date.now()}`,
      panelId: selectedPanelId,
      panelName: selectedPanelName,
      position: tempIntersectionPoint,
      type,
      severity,
      notes,
    };

    setDamageMarkers((prev) => [...prev, newMarker]);
    setIsDamageModalOpen(false);
  };

  // Apply custom panel paint
  const handleApplyPaint = (targetId: string | 'all', color: string, finish: PaintFinish) => {
    setActiveColor(color);
    setActiveFinish(finish);

    if (targetId === 'all') {
      const newPaints: Record<string, PanelPaint> = {};
      CAR_PANELS.forEach((panel) => {
        newPaints[panel.id] = { panelId: panel.id, color, finish };
      });
      setPanelPaints(newPaints);
    } else {
      setPanelPaints((prev) => ({
        ...prev,
        [targetId]: { panelId: targetId, color, finish },
      }));
    }
  };

  const handleRemoveMarker = (id: string) => {
    setDamageMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearAll = () => {
    setDamageMarkers([]);
    setPanelPaints({});
    setPhotos([]);
    setSelectedPanelId(null);
    setSelectedPanelName(null);
  };

  const handleRequestEstimate = () => {
    if (onTransferEstimateData) {
      onTransferEstimateData({
        markers: damageMarkers,
        paints: panelPaints,
        photos,
      });
    }

    // Scroll to booking form section smoothly
    const bookingElem = document.getElementById('book-now');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="visualize" className="relative py-24 bg-[#080d1a] border-t border-b border-slate-800 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/20 text-xs font-semibold uppercase tracking-wider font-oswald">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Estimator</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-oswald uppercase tracking-tight text-white">
            Visualize Your Repair
          </h2>

          <p className="text-slate-300 font-medium text-base md:text-lg">
            Select your vehicle, mark the damage, and explore paint options before you visit Benji’s Autobody.
          </p>
          <p className="text-slate-400 text-xs md:text-sm">
            Use our interactive 3D tool to show us exactly where your vehicle needs attention.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
            <button
              onClick={() => setMode('damage')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-oswald uppercase tracking-wider transition ${
                mode === 'damage'
                  ? 'bg-[#e63946] text-white shadow-lg shadow-[#e63946]/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>1. Damage Mode</span>
            </button>

            <button
              onClick={() => setMode('paint')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-oswald uppercase tracking-wider transition ${
                mode === 'paint'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>2. Paint Mode</span>
            </button>
          </div>
        </div>

        {/* Main 3D Canvas + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 3D Canvas Viewer (2 Cols on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Canvas3DViewer
              mode={mode}
              selectedPanelId={selectedPanelId}
              onSelectPanel={handleSelectPanel}
              damageMarkers={damageMarkers}
              panelPaints={panelPaints}
              activeColor={activeColor}
            />

            {/* Quick Panel Dropdown Selector for Touch & Fallback */}
            <div className="p-4 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">Or select panel directly:</span>
              <select
                value={selectedPanelId || ''}
                onChange={(e) => {
                  const p = CAR_PANELS.find((item) => item.id === e.target.value);
                  if (p) handleSelectPanel(p.id, p.name, [0, 0.8, 0]);
                }}
                className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-[#e63946]"
              >
                <option value="" disabled>
                  -- Select Car Panel --
                </option>
                {CAR_PANELS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Control Sidebar / Summary */}
          <div className="space-y-6">
            {mode === 'paint' && (
              <PaintControls
                selectedPanelId={selectedPanelId}
                selectedPanelName={selectedPanelName}
                activeColor={activeColor}
                activeFinish={activeFinish}
                onApplyPaint={handleApplyPaint}
              />
            )}

            <PhotoUploader
              photos={photos}
              onAddPhoto={(photo) => setPhotos((prev) => [...prev, photo])}
              onRemovePhoto={(id) => setPhotos((prev) => prev.filter((p) => p.id !== id))}
            />

            <RepairSummary
              damageMarkers={damageMarkers}
              panelPaints={panelPaints}
              photos={photos}
              onRemoveMarker={handleRemoveMarker}
              onClearAll={handleClearAll}
              onRequestEstimate={handleRequestEstimate}
            />
          </div>
        </div>
      </div>

      {/* Damage Selection Modal */}
      {isDamageModalOpen && selectedPanelName && (
        <DamageModal
          panelName={selectedPanelName}
          onSave={handleSaveDamage}
          onClose={() => setIsDamageModalOpen(false)}
        />
      )}
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import VisualizerSection from '@/components/visualizer/VisualizerSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import BookingSection from '@/components/BookingSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import { DamageMarker, PanelPaint, UploadedPhoto } from '@/types/visualizer';

export default function Home() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [visualizerSummary, setVisualizerSummary] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
  };

  const handleTransferEstimateData = (data: {
    markers: DamageMarker[];
    paints: Record<string, PanelPaint>;
    photos: UploadedPhoto[];
  }) => {
    const lines: string[] = [];

    if (data.markers.length > 0) {
      lines.push(`• Damage Markers (${data.markers.length}):`);
      data.markers.forEach((m, idx) => {
        lines.push(`  ${idx + 1}. ${m.panelName} — ${m.type} (${m.severity})${m.notes ? `: "${m.notes}"` : ''}`);
      });
    }

    if (Object.keys(data.paints).length > 0) {
      lines.push(`• Custom Paint Preview:`);
      Object.values(data.paints).forEach((p) => {
        lines.push(`  - ${p.panelId === 'all' ? 'Whole Car' : p.panelId}: ${p.color} (${p.finish} finish)`);
      });
    }

    if (data.photos.length > 0) {
      lines.push(`• Attached Damage Photos: ${data.photos.length} photo(s) uploaded`);
    }

    setVisualizerSummary(lines.join('\n'));
  };

  return (
    <main className="flex-1 relative bg-dark">
      <Header />
      <Hero />
      <Services onSelectService={handleSelectService} />
      <VisualizerSection onTransferEstimateData={handleTransferEstimateData} />
      <WhyChooseUs />
      <Gallery />
      <Reviews />
      <BookingSection
        selectedServiceTitle={selectedServiceTitle}
        visualizerSummary={visualizerSummary}
      />
      <FAQ />
      <Footer />
      <MobileBottomBar />
    </main>
  );
}

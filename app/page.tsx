'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import BookingSection from '@/components/BookingSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';

export default function Home() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
  };

  return (
    <main className="flex-1 relative bg-dark">
      <Header />
      <Hero />
      <Services onSelectService={handleSelectService} />
      <WhyChooseUs />
      <Gallery />
      <Reviews />
      <BookingSection selectedServiceTitle={selectedServiceTitle} />
      <FAQ />
      <Footer />
      <MobileBottomBar />
    </main>
  );
}

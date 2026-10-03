/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AsymmetricPhotoGrid } from './components/AsymmetricPhotoGrid';
import { PinnedHorizontalGallery } from './components/PinnedHorizontalGallery';
import { EditorialMenu } from './components/EditorialMenu';
import { AtmosphereStory } from './components/AtmosphereStory';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F3EDE3] text-[#211A16] selection:bg-[#B8794A] selection:text-[#FFFDF8] overflow-x-hidden">
      {/* 35mm Natural Film Grain Overlay (Subtle warm paper texture) */}
      <div className="film-grain" />

      {/* Cinematic Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Cinematic Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Top Editorial Navbar */}
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* Continuous Visual Journey */}
      <main className="w-full">
        {/* Full-screen cinematic hero: "COFFEE. PEOPLE. MOMENTS." */}
        <Hero
          onOpenReservation={() => setReservationOpen(true)}
          isLoaded={isLoaded}
        />

        {/* Artistic Asymmetric / Masonry Photography Grid */}
        <AsymmetricPhotoGrid />

        {/* Pinned GSAP ScrollTrigger Horizontal Gallery */}
        <PinnedHorizontalGallery />

        {/* Editorial Menu with on-hover image reveals */}
        <EditorialMenu />

        {/* Atmosphere Time-Based Story: Slow Mornings, Afternoon Work, Evening Conversations, Late Nights */}
        <AtmosphereStory />
      </main>

      {/* Unified Final 100vh Viewport: Final CTA ("The lights remain on till 23:30") + Footer */}
      <div id="closing-finale" className="closing-finale-container relative min-h-[100svh] w-full flex flex-col justify-between bg-[#2B211C]">
        {/* Final CTA: "The lights remain on till 23:30 · Stay a little longer" */}
        <FinalCTA onOpenReservation={() => setReservationOpen(true)} />

        {/* Minimal Brutalist Footer */}
        <Footer onOpenReservation={() => setReservationOpen(true)} />
      </div>

      {/* Elegant Floating Back To Top Button */}
      <BackToTop />

      {/* Clean Reservation Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
}

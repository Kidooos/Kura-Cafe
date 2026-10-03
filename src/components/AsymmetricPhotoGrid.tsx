import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CafePhoto } from './CafePhotography';
import { EditorialTiltCard } from './EditorialTiltCard';

gsap.registerPlugin(ScrollTrigger);

export const AsymmetricPhotoGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);
  const photo4Ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Parallax image inner refs
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;

    // --- 1. SECTION HEADER GENTLE FADE & SLIDE UP ---
    if (headerRef.current) {
      const headerTexts = headerRef.current.querySelectorAll('.grid-header-anim');
      gsap.fromTo(
        headerTexts,
        { opacity: 0, y: 38 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // --- 2. INDIVIDUAL CARD ENTRANCE & TEXT PARAGRAPHS SCROLLTRIGGER ---

    // Photo 1 & its inner caption text
    if (photo1Ref.current) {
      const p1Captions = photo1Ref.current.querySelectorAll('.photo1-caption');
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: photo1Ref.current,
          start: 'top 85%',
        },
      });

      tl1.fromTo(
        photo1Ref.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      if (p1Captions.length > 0) {
        tl1.fromTo(
          p1Captions,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          '-=0.7'
        );
      }
    }

    // Italic narrative quote paragraph
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 88%',
          },
        }
      );
    }

    // Photo 2 (Cardamom Knot) & caption
    if (photo2Ref.current) {
      const p2Captions = photo2Ref.current.querySelectorAll('.photo2-caption');
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: photo2Ref.current,
          start: 'top 85%',
        },
      });

      tl2.fromTo(
        photo2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.15, ease: 'power3.out' }
      );

      if (p2Captions.length > 0) {
        tl2.fromTo(
          p2Captions,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          '-=0.6'
        );
      }
    }

    // Photo 3 (Turntable Vinyl) & caption
    if (photo3Ref.current) {
      const p3Captions = photo3Ref.current.querySelectorAll('.photo3-caption');
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: photo3Ref.current,
          start: 'top 85%',
        },
      });

      tl3.fromTo(
        photo3Ref.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'power3.out' }
      );

      if (p3Captions.length > 0) {
        tl3.fromTo(
          p3Captions,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          '-=0.6'
        );
      }
    }

    // Photo 4 (Monsoon Facade Wide Banner) & caption
    if (photo4Ref.current) {
      const p4Captions = photo4Ref.current.querySelectorAll('.photo4-caption');
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: photo4Ref.current,
          start: 'top 85%',
        },
      });

      tl4.fromTo(
        photo4Ref.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.25, ease: 'power3.out' }
      );

      if (p4Captions.length > 0) {
        tl4.fromTo(
          p4Captions,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power2.out' },
          '-=0.7'
        );
      }
    }

    // --- 3. HIGH-FIDELITY DIFFERENTIAL GSAP IMAGE PARALLAX SCRUB ---

    // Parallax 1: Hand Pour hero image glides smoothly downward
    if (img1Ref.current && photo1Ref.current) {
      gsap.fromTo(
        img1Ref.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: photo1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }

    // Parallax 2: Cardamom Knot pastry image shifts upward
    if (img2Ref.current && photo2Ref.current) {
      gsap.fromTo(
        img2Ref.current,
        { yPercent: 14 },
        {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: photo2Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }

    // Parallax 3: Turntable Vinyl shifts with deep counter-tempo
    if (img3Ref.current && photo3Ref.current) {
      gsap.fromTo(
        img3Ref.current,
        { yPercent: -14 },
        {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: photo3Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }

    // Parallax 4: Monsoon Facade wide architectural banner glides smoothly
    if (img4Ref.current && photo4Ref.current) {
      gsap.fromTo(
        img4Ref.current,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: photo4Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-10 sm:py-12 md:py-14 lg:py-18 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#F3EDE3] text-[#211A16] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading (Individual text paragraphs gently fade & slide up) */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10"
        >
          <div>
            <span className="grid-header-anim text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B8794A] block mb-1.5 sm:mb-2 font-medium will-change-transform">
              COLLECTION 01 · VISUAL MOODBOARD
            </span>
            <h2 className="grid-header-anim font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#2B211C] will-change-transform">
              TEXTURES
              <br />
              <span className="font-serif-editorial italic font-normal text-[#6F4E37]">
                &amp; daylight.
              </span>
            </h2>
          </div>
          <p className="grid-header-anim font-sans text-xs sm:text-sm text-[#6F4E37] max-w-sm leading-relaxed will-change-transform">
            Raw board-formed concrete, amber pendant reflections on dark walnut, and the delicate steam of a first-pour Gesha.
          </p>
        </div>

        {/* Asymmetric Layered Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 items-start">
          {/* Left Column: Tall 3:4 Hand Pour Hero Frame (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div ref={photo1Ref} className="will-change-transform">
              <EditorialTiltCard
                badge={{
                  seal: '蔵',
                  tag: '93.5°C EXTRACTION',
                  sub: 'GESHA LOT #28',
                }}
                className="aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl bg-[#2B211C] shadow-xl border border-[#D8C3A5]/40"
              >
                <div
                  ref={img1Ref}
                  className="w-full h-[124%] -top-[12%] relative will-change-transform"
                >
                  <CafePhoto
                    id="hand-pour"
                    alt="Slow origami hand pour with golden amber stream"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between text-[11px] sm:text-xs font-mono text-[#FFFDF8] transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="photo1-caption">
                    <span className="text-[#D8C3A5] block mb-0.5 sm:mb-1">01 / THE EXTRACTION</span>
                    <span className="font-serif-editorial text-lg sm:text-xl italic font-normal">
                      Origami Dripper at 93.5°C
                    </span>
                  </div>
                  <span className="photo1-caption text-[#D8C3A5]/80 uppercase hidden xs:inline">
                    CHIKMAGALUR LOT #28
                  </span>
                </div>
              </EditorialTiltCard>
            </div>

            <p
              ref={quoteRef}
              className="font-serif-editorial text-base sm:text-lg lg:text-xl italic text-[#B8794A] max-w-md will-change-transform"
            >
              "We take four minutes for a pour. The time is part of the recipe."
            </p>
          </div>

          {/* Right Column: Staggered Overlapping Square & Wide Frames (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 lg:pt-4">
            {/* Overlapping Cardamom Pastry Frame */}
            <div ref={photo2Ref} className="will-change-transform">
              <EditorialTiltCard
                badge={{
                  seal: '蔵',
                  tag: '36-HR FERMENT',
                  sub: 'MORNING BATCH',
                }}
                className="aspect-square rounded-2xl sm:rounded-3xl bg-[#2B211C] shadow-xl border border-[#D8C3A5]/50"
              >
                <div
                  ref={img2Ref}
                  className="w-full h-[124%] -top-[12%] relative will-change-transform"
                >
                  <CafePhoto
                    id="pastry-cardamom"
                    alt="Golden twisted cardamom knot bun with pearl sugar crystals"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between text-[11px] sm:text-xs font-mono text-[#FFFDF8] transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="photo2-caption">
                    <span className="text-[#D8C3A5] block mb-0.5 sm:mb-1">02 / THE BAKER'S HEARTH</span>
                    <span className="font-serif-editorial text-base sm:text-lg italic font-normal">
                      Cardamom &amp; Sea Salt Knot
                    </span>
                  </div>
                  <span className="photo2-caption text-[#D8C3A5]/80">BAKED AT 06:00</span>
                </div>
              </EditorialTiltCard>
            </div>

            {/* The Roaster's Craft (Single-Origin Micro-Lot Beans) */}
            <div ref={photo3Ref} className="will-change-transform lg:-ml-6 xl:-ml-8">
              <EditorialTiltCard
                badge={{
                  seal: '蔵',
                  tag: 'DRUM ROAST',
                  sub: 'LOT #28 BEANS',
                }}
                className="aspect-[4/3] rounded-2xl sm:rounded-3xl bg-[#2B211C] shadow-xl border border-[#D8C3A5]/50"
              >
                <div
                  ref={img3Ref}
                  className="w-full h-[124%] -top-[12%] relative will-change-transform"
                >
                  <CafePhoto
                    id="roastery-beans"
                    alt="Freshly roasted specialty coffee beans with golden warmth"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between text-[11px] sm:text-xs font-mono text-[#FFFDF8] transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="photo3-caption">
                    <span className="text-[#D8C3A5] block mb-0.5 sm:mb-1">03 / THE ROASTER'S CRAFT</span>
                    <span className="font-serif-editorial text-base sm:text-lg italic font-normal">
                      Single-Origin Gesha Lot #28
                    </span>
                  </div>
                  <span className="photo3-caption text-[#D8C3A5]/80">MICRO-LOT BEANS</span>
                </div>
              </EditorialTiltCard>
            </div>
          </div>
        </div>

        {/* Wide Cinematic Facade Banner Across Full Grid Bottom */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <div ref={photo4Ref} className="will-change-transform">
            <EditorialTiltCard
              badge={{
                seal: '蔵',
                tag: 'VESU SANCTUARY',
                sub: 'MONSOON ARCHIVE',
              }}
              className="aspect-[21/9] sm:aspect-[16/7] rounded-2xl sm:rounded-3xl bg-[#2B211C] shadow-xl border border-[#D8C3A5]/50"
            >
              <div
                ref={img4Ref}
                className="w-full h-[124%] -top-[12%] relative will-change-transform"
              >
                <CafePhoto
                  id="rain-facade"
                  alt="Concrete architectural café facade with warm amber light and rain outside"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-[#FFFDF8] transition-transform duration-500 group-hover:-translate-y-1">
                <div className="photo4-caption">
                  <span className="text-[#D8C3A5] block mb-0.5 sm:mb-1">04 / THE MONSOON SANCTUARY</span>
                  <span className="font-serif-editorial text-lg sm:text-2xl md:text-3xl italic font-normal block text-[#FFFDF8]">
                    Courtyard Behind Old Banyan, Surat
                  </span>
                </div>
                <span className="photo4-caption text-[#D8C3A5] tracking-widest uppercase hidden xs:inline">
                  RAIN OUTSIDE · WARMTH WITHIN
                </span>
              </div>
            </EditorialTiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

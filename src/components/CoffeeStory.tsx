import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Flame, ShieldCheck, Thermometer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CoffeeStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Headline entrance
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Detail cards stagger reveal
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#0a0908] text-[#f2ede4] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-4">
          <span className="w-6 h-[1px] bg-[#c99a6b]" />
          <span>CHAPTER 02</span>
          <span className="text-white/20">·</span>
          <span>THE PHILOSOPHY</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 lg:mb-24">
          <div className="lg:col-span-8">
            <h2
              ref={headlineRef}
              className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.92]"
            >
              WE DON'T
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] via-[#c99a6b] to-[#9a6b3e]">
                RUSH
              </span>
              <br />
              COFFEE.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4 space-y-4">
            <p className="font-serif-editorial italic text-2xl text-[#f5efe6] font-normal leading-relaxed">
              "Every cup begins with carefully selected beans, slow preparation, and a little obsession."
            </p>
            <p className="text-sm font-sans-clean text-[#9a9186] leading-relaxed">
              Most places treat coffee like fuel to be poured in thirty seconds. At KURA, we calibrate grind particle distribution every dawn, control water TDS to exactly 135 ppm, and let the bean speak for where it grew.
            </p>
          </div>
        </div>

        {/* 4 Architectural Detail Pillars */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6"
        >
          {/* Detail 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#141210] to-[#0c0b09] border border-white/10 hover:border-[#c99a6b]/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#c99a6b] tracking-widest uppercase">
                01
              </span>
              <Compass className="w-5 h-5 text-[#8f8578] group-hover:text-[#dfa86a] transition-colors" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight uppercase text-[#f2ede4] mb-3">
              SINGLE ORIGIN
            </h3>
            <p className="text-xs font-sans-clean text-[#9a9186] leading-relaxed mb-6">
              Sourced directly from heirloom trees at 1,450 meters elevation in Chikmagalur and Yirgacheffe. Never blended with filler crops.
            </p>
            <div className="text-[11px] font-mono text-[#c99a6b] tracking-wider uppercase border-t border-white/5 pt-4">
              TRACEABILITY 100%
            </div>
          </div>

          {/* Detail 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#141210] to-[#0c0b09] border border-white/10 hover:border-[#c99a6b]/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#c99a6b] tracking-widest uppercase">
                02
              </span>
              <Flame className="w-5 h-5 text-[#8f8578] group-hover:text-[#dfa86a] transition-colors" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight uppercase text-[#f2ede4] mb-3">
              SMALL BATCH
            </h3>
            <p className="text-xs font-sans-clean text-[#9a9186] leading-relaxed mb-6">
              Roasted in micro-batches of no more than 6 kilograms on a restored cast-iron drum. Rested 12 days before serving for peak degas aroma.
            </p>
            <div className="text-[11px] font-mono text-[#c99a6b] tracking-wider uppercase border-t border-white/5 pt-4">
              6KG MICRO BATCHES
            </div>
          </div>

          {/* Detail 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#141210] to-[#0c0b09] border border-white/10 hover:border-[#c99a6b]/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#c99a6b] tracking-widest uppercase">
                03
              </span>
              <Thermometer className="w-5 h-5 text-[#8f8578] group-hover:text-[#dfa86a] transition-colors" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight uppercase text-[#f2ede4] mb-3">
              93.5°C HAND BREWED
            </h3>
            <p className="text-xs font-sans-clean text-[#9a9186] leading-relaxed mb-6">
              Poured with gooseneck kettles over origami ceramic drippers or extracted through our naked bottomless portafilters at 9 bars of pressure.
            </p>
            <div className="text-[11px] font-mono text-[#c99a6b] tracking-wider uppercase border-t border-white/5 pt-4">
              ORIGAMI DRIPPER &amp; MODBAR
            </div>
          </div>

          {/* Detail 4 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#141210] to-[#0c0b09] border border-white/10 hover:border-[#c99a6b]/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#c99a6b] tracking-widest uppercase">
                04
              </span>
              <ShieldCheck className="w-5 h-5 text-[#8f8578] group-hover:text-[#dfa86a] transition-colors" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight uppercase text-[#f2ede4] mb-3">
              HONEST MILK &amp; OAT
            </h3>
            <p className="text-xs font-sans-clean text-[#9a9186] leading-relaxed mb-6">
              Steamed to 62°C to preserve natural sweetness without scorching milk proteins. Oat milk is custom-milled in house from organic rolled oats.
            </p>
            <div className="text-[11px] font-mono text-[#c99a6b] tracking-wider uppercase border-t border-white/5 pt-4">
              HOUSE-MILLED OAT
            </div>
          </div>
        </div>

        {/* Small tactile detail band */}
        <div className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-3 h-3 rounded-full bg-[#c99a6b] animate-ping" />
            <span className="font-mono text-xs text-[#ded7ce] tracking-widest uppercase">
              CURRENT ROAST ON THE HOPPER:
            </span>
            <span className="font-serif-editorial text-lg italic text-[#dfa86a]">
              Silver Oak Estate — Anaerobic Lot #28
            </span>
          </div>

          <div className="text-xs font-mono text-[#8a8075] uppercase tracking-wider">
            ROASTED ON THURSDAY · SURAT ROASTERY
          </div>
        </div>
      </div>
    </section>
  );
};

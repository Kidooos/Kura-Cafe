import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeCoffeeCup } from './ThreeCoffeeCup';
import { Droplet, Flame, Sparkles, Wind } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FirstSip: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const liquidArtRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Parallax on headline text
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Parallax on 3D liquid art container
    if (liquidArtRef.current) {
      gsap.to(liquidArtRef.current, {
        scale: 1.05,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // Sensory notes reveal
    if (notesRef.current) {
      const items = notesRef.current.querySelectorAll('.flavor-note');
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: notesRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="first-sip"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 overflow-hidden bg-gradient-to-b from-[#080808] via-[#120e0b] to-[#0a0908] border-t border-white/5"
    >
      {/* Background warm radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c99a6b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-4">
          <span className="w-6 h-[1px] bg-[#c99a6b]" />
          <span>CHAPTER 01</span>
          <span className="text-white/20">·</span>
          <span>THE SENSORY ENTRY</span>
        </div>

        {/* Section Title */}
        <div ref={headlineRef} className="mb-12 lg:mb-16">
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-[#f2ede4] leading-none">
            FIRST
            <br />
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b] lowercase">
              sip.
            </span>
          </h2>
        </div>

        {/* Core Layout: 3D Coffee Cup Centerpiece + Sensory Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 3D Interactive Centerpiece & Extraction Visual */}
          <div
            ref={liquidArtRef}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#171412] to-[#0c0b09] border border-white/10 p-4 sm:p-8 shadow-2xl group"
          >
            <div className="absolute top-4 left-6 z-20 flex items-center gap-3 text-xs font-mono text-[#a39789] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#c99a6b]" />
              <span>HAND-THROWN STONEWARE · 93.5°C EXTRACTION</span>
            </div>

            {/* Three.js 3D Coffee Model */}
            <ThreeCoffeeCup className="w-full my-4" />

            {/* Micro specs overlay */}
            <div className="relative z-20 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono">
              <div className="p-2">
                <span className="text-[10px] text-[#8c8277] uppercase block tracking-wider">
                  DOSE
                </span>
                <span className="text-sm font-semibold text-[#f2ede4] tabular-nums">
                  20.5g
                </span>
              </div>
              <div className="p-2 border-x border-white/10">
                <span className="text-[10px] text-[#8c8277] uppercase block tracking-wider">
                  YIELD
                </span>
                <span className="text-sm font-semibold text-[#c99a6b] tabular-nums">
                  42.0g
                </span>
              </div>
              <div className="p-2">
                <span className="text-[10px] text-[#8c8277] uppercase block tracking-wider">
                  TIME
                </span>
                <span className="text-sm font-semibold text-[#f2ede4] tabular-nums">
                  28.5s
                </span>
              </div>
            </div>
          </div>

          {/* Right: Tasting notes & Poetic sensory exploration */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            <div className="space-y-4">
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f5efe6] font-normal italic leading-snug">
                "The first second touches bitter dark cacao; the second unfolds with candied bergamot and honey."
              </h3>
              <p className="text-sm font-sans-clean text-[#b8ada0] leading-relaxed">
                We believe coffee should never shock you with harshness. It should embrace the palate like a warm wool coat on a damp evening. Every single origin batch is dialed in three times daily by hand.
              </p>
            </div>

            {/* Flavor Profile Palette */}
            <div ref={notesRef} className="space-y-4 pt-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c99a6b] block">
                CUP PROFILE · BATCH #402
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="flavor-note p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c99a6b]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#dfa86a]">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs font-mono font-semibold uppercase">
                      DARK CHOCOLATE
                    </span>
                  </div>
                  <p className="text-xs text-[#9a9186]">
                    85% single-estate Venezuelan criollo cocoa finish.
                  </p>
                </div>

                <div className="flavor-note p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c99a6b]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#dfa86a]">
                    <Droplet className="w-4 h-4" />
                    <span className="text-xs font-mono font-semibold uppercase">
                      DRIED FIG &amp; PLUM
                    </span>
                  </div>
                  <p className="text-xs text-[#9a9186]">
                    Anaerobic fermentation imparts winey fruit depth.
                  </p>
                </div>

                <div className="flavor-note p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c99a6b]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#dfa86a]">
                    <Wind className="w-4 h-4" />
                    <span className="text-xs font-mono font-semibold uppercase">
                      SWEET BERGAMOT
                    </span>
                  </div>
                  <p className="text-xs text-[#9a9186]">
                    Delicate floral jasmine aroma on the nose.
                  </p>
                </div>

                <div className="flavor-note p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c99a6b]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#dfa86a]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-mono font-semibold uppercase">
                      CARAMEL CREMA
                    </span>
                  </div>
                  <p className="text-xs text-[#9a9186]">
                    Velvety mouthfeel with lingering cane sugar sweetness.
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Interaction Quote */}
            <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#8a8075] border-t border-white/10">
              <span className="italic font-serif-editorial text-sm text-[#beb3a5]">
                Take your time. Nobody is counting minutes here.
              </span>
              <span className="text-[#c99a6b]">SLOW HOURS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

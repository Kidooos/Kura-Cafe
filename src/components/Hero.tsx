import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CafePhoto } from './CafePhotography';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenReservation: () => void;
  isLoaded: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, isLoaded }) => {
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Parallax on image on scroll (mounted once)
  useEffect(() => {
    const hero = heroRef.current;
    const imgWrap = imageWrapRef.current;
    if (!hero || !imgWrap) return;

    const st = gsap.to(imgWrap, {
      yPercent: 16,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  // GSAP Staggered Fade-in Animation once preloader completes
  useEffect(() => {
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const divider = dividerRef.current;
    const quote = quoteRef.current;
    const button = buttonRef.current;
    const bottom = bottomRef.current;
    const imgWrap = imageWrapRef.current;

    if (!title) return;
    const lines = title.querySelectorAll('.hero-line');

    if (!isLoaded) {
      // Set primed hidden state while preloader is active
      gsap.set(kicker, { opacity: 0, y: -24 });
      gsap.set(lines, { yPercent: 125, opacity: 0, rotateZ: 3, skewX: -3 });
      gsap.set(divider, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
      gsap.set(quote, { opacity: 0, y: 35 });
      gsap.set(button, { opacity: 0, y: 30, scale: 0.9 });
      gsap.set(bottom, { opacity: 0, y: 24 });
      if (imgWrap) {
        gsap.set(imgWrap, { scale: 1.16, opacity: 0.25, filter: 'blur(6px)' });
      }
    } else {
      // Preloader just completed! Run graceful staggered entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Background image exposure, de-blur & smooth settle
      if (imgWrap) {
        tl.to(
          imgWrap,
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 2.2,
            ease: 'power3.out',
          },
          0
        );
      }

      // 2. Top editorial kicker fades and slides down
      if (kicker) {
        tl.to(
          kicker,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
          },
          0.1
        );
      }

      // 3. Staggered masked editorial typography entrance (COFFEE. PEOPLE. MOMENTS.)
      tl.to(
        lines,
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          skewX: 0,
          stagger: 0.18,
          duration: 1.4,
          ease: 'power4.out',
        },
        0.25
      );

      // 4. Hairline brass divider draws across horizontally
      if (divider) {
        tl.to(
          divider,
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0.65
        );
      }

      // 5. Narrative quotation floats up gently
      if (quote) {
        tl.to(
          quote,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          0.8
        );
      }

      // 6. Action CTA button slides in with spring scale & warm glow
      if (button) {
        tl.to(
          button,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'back.out(1.5)',
          },
          1.0
        );
      }

      // 7. Bottom metadata & scroll prompt fade in
      if (bottom) {
        tl.to(
          bottom,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power2.out',
          },
          1.2
        );
      }
    }
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20 pt-20 sm:pt-24 md:pt-26 lg:pt-28 pb-6 sm:pb-8 md:pb-10 overflow-hidden bg-[#2B211C] text-[#FFFDF8]"
    >
      {/* Background Fullscreen Cinematic Image with smooth exposure */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <CafePhoto
          id="hero-night-cafe"
          alt="Cinematic night café interior with warm pendant lamps and rain on glass"
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
        />
        {/* Measured warm espresso scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B211C] via-[#2B211C]/50 to-[#2B211C]/75" />
      </div>

      {/* Top Editorial Kicker */}
      <div
        ref={kickerRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#D8C3A5] shrink-0 mb-2 sm:mb-3"
      >
        <span className="shrink-0">SURAT · EST. 2026</span>
        <span className="truncate text-right">A SANCTUARY FOR SLOW HOURS</span>
      </div>

      {/* Center Large Editorial Typography (Balanced vertically in the middle with my-auto) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-4 sm:py-6 md:py-8">
        <h1
          ref={titleRef}
          className="font-display text-[13.5vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7.8vw] xl:text-[7.2vw] font-bold uppercase tracking-tight leading-[0.9] text-[#FFFDF8] select-none break-words"
        >
          <div className="overflow-hidden pb-0.5 sm:pb-1">
            <span className="hero-line block will-change-transform">COFFEE.</span>
          </div>
          <div className="overflow-hidden pb-0.5 sm:pb-1">
            <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#D8C3A5] to-[#B8794A] will-change-transform">
              PEOPLE.
            </span>
          </div>
          <div className="overflow-hidden pb-0.5 sm:pb-1">
            <span className="hero-line block will-change-transform">MOMENTS.</span>
          </div>
        </h1>

        {/* Subtitle & Narrative (Proportionate vertical spacing) */}
        <div
          ref={dividerRef}
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 md:gap-8 pt-5 sm:pt-6 border-t border-[#D8C3A5]/30 will-change-transform"
        >
          <p
            ref={quoteRef}
            className="font-serif-editorial text-base sm:text-lg md:text-xl lg:text-2xl text-[#D8C3A5] italic font-normal max-w-xl leading-relaxed will-change-transform"
          >
            "A small room where time slows down, the rain is kept outside, and every cup is prepared with quiet obsession."
          </p>

          <div
            ref={buttonRef}
            className="flex items-center gap-4 sm:gap-6 shrink-0 will-change-transform w-full sm:w-auto"
          >
            <button
              onClick={onOpenReservation}
              className="btn-editorial group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FFFDF8] text-[#2B211C] border border-[#D8C3A5] hover:border-[#B8794A] text-xs font-mono font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase rounded-full transition-all duration-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-xl hover:shadow-[0_0_30px_rgba(184,121,74,0.45)] cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
                <span>RESERVE A TABLE</span>
                <span className="text-[#B8794A] text-sm transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8794A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Quiet Scroll Prompt (Clean bottom bar) */}
      <div
        ref={bottomRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#D8C3A5] uppercase tracking-widest pt-4 sm:pt-5 border-t border-[#D8C3A5]/30 shrink-0 will-change-transform"
      >
        <span>07:30 — 23:30 DAILY</span>
        <a
          href="#gallery"
          className="flex items-center gap-1.5 sm:gap-2 hover:text-[#B8794A] transition-colors cursor-pointer group"
        >
          <span>EXPLORE VISUALS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#B8794A] group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};

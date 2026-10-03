import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CafePhoto } from './CafePhotography';
import { EditorialTiltCard } from './EditorialTiltCard';

gsap.registerPlugin(ScrollTrigger);

interface AtmosphereMoment {
  id: string;
  time: string;
  headline: string;
  italicWord: string;
  quote: string;
  photoId: string;
  detail: string;
  badge: {
    tag: string;
    sub: string;
  };
}

const MOMENTS: AtmosphereMoment[] = [
  {
    id: 'mornings',
    time: '08:00 AM',
    headline: 'SLOW',
    italicWord: 'mornings.',
    quote: 'Filtered dawn light cuts across poured concrete. The aroma of freshly ground Gesha fills the courtyard.',
    photoId: 'hand-pour',
    detail: 'Pale morning shadows · 93.5°C Kettle · A quiet book',
    badge: {
      tag: 'SLOW MORNINGS',
      sub: 'ORIGAMI DRIPPER',
    },
  },
  {
    id: 'afternoon',
    time: '01:30 PM',
    headline: 'AFTERNOON',
    italicWord: 'work.',
    quote: 'Soft keyboard taps, cold tonic fizzing over ice, and long uninterrupted thoughts at the shared dark walnut table.',
    photoId: 'm3-cold-drip',
    detail: 'Natural skylight · High focus · Unhurried hours',
    badge: {
      tag: 'AFTERNOON FOCUS',
      sub: 'COLD DRIP ICED',
    },
  },
  {
    id: 'evening',
    time: '06:42 PM',
    headline: 'EVENING',
    italicWord: 'conversations.',
    quote: 'The golden hour settles. Low pendant amber lights reflect on dark walnut. Voices mingle as cortados turn into evening sips.',
    photoId: 'cafe-table',
    detail: 'Warm amber low lamps · Steamed cortados · Friends meeting',
    badge: {
      tag: 'GOLDEN HOUR',
      sub: 'WALNUT TABLE',
    },
  },
  {
    id: 'nights',
    time: '10:15 PM',
    headline: 'LATE',
    italicWord: 'nights.',
    quote: 'Rain drums against acoustic glass. Candle flame flickers against wet stone. The city is asleep; we stay open.',
    photoId: 'hero-night-cafe',
    detail: 'Midnight espresso · Rain reflections · One last cup',
    badge: {
      tag: 'LATE NIGHTS',
      sub: 'ACOUSTIC GLASS',
    },
  },
];

export const AtmosphereStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Section Header Staggered Entrance
    if (headerRef.current) {
      const headerElements = headerRef.current.querySelectorAll('.header-anim');
      gsap.fromTo(
        headerElements,
        { opacity: 0, y: 35 },
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

    // 2. Individual Spreads: Image Entrance & Scroll Parallax
    const sections = container.querySelectorAll('.moment-frame');

    sections.forEach((sec) => {
      const imgWrap = sec.querySelector('.moment-img-wrap');
      const imgInner = sec.querySelector('.moment-img');
      const timeTag = sec.querySelector('.moment-time');
      const textElements = sec.querySelectorAll('.moment-text-item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top 80%',
        },
      });

      // Images gently fade and slide up into view
      if (imgWrap) {
        tl.fromTo(
          imgWrap,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          0
        );
      }

      if (timeTag) {
        tl.fromTo(
          timeTag,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.35
        );
      }

      // Individual text paragraphs gently fade and slide up into view with staggered cadence
      if (textElements && textElements.length > 0) {
        tl.fromTo(
          textElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.14,
            ease: 'power3.out',
          },
          0.15
        );
      }

      // Continuous fluid parallax scrub on the inner image
      if (imgInner) {
        gsap.fromTo(
          imgInner,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (container.contains(st.trigger as Node)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="atmosphere"
      ref={containerRef}
      className="relative py-10 sm:py-12 md:py-14 lg:py-18 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#F3EDE3] text-[#211A16] border-t border-[#D8C3A5]/40"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-18">
        {/* Section Title with GSAP Header Animation */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8 border-b border-[#D8C3A5]/50 pb-5 sm:pb-6 md:pb-8"
        >
          <div>
            <span className="header-anim text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B8794A] block mb-1.5 sm:mb-2 font-medium">
              CHAPTER 04 · CHRONICLES OF TIME
            </span>
            <h2 className="header-anim font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#2B211C]">
              THE DAY
              <br />
              <span className="font-serif-editorial italic font-normal text-[#6F4E37]">
                unfolds.
              </span>
            </h2>
          </div>
          <p className="header-anim font-sans text-xs sm:text-sm text-[#6F4E37] max-w-sm leading-relaxed">
            The mood shifts with the angle of the sun and the tempo of the vinyl spinning in the corner.
          </p>
        </div>

        {/* 4 Large Editorial Photographic Spreads */}
        {MOMENTS.map((m, idx) => (
          <div
            key={m.id}
            className={`moment-frame grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 md:gap-10 lg:gap-14 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image (6 cols) with 3D Tilt & Editorial Reveal */}
            <div
              className={`lg:col-span-6 ${
                idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div className="moment-img-wrap will-change-transform">
                <EditorialTiltCard
                  badge={{
                    seal: '蔵',
                    tag: m.badge.tag,
                    sub: m.badge.sub,
                  }}
                  className="aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl bg-[#2B211C] shadow-xl border border-[#D8C3A5]/40"
                >
                  <div className="moment-img w-full h-[120%] -top-[10%] relative will-change-transform">
                    <CafePhoto
                      id={m.photoId}
                      alt={m.headline}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="moment-time absolute top-4 sm:top-6 left-4 sm:left-6 font-mono text-[11px] sm:text-xs text-[#FFFDF8] tracking-widest uppercase bg-[#2B211C]/80 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-[#D8C3A5]/30">
                    {m.time}
                  </div>
                </EditorialTiltCard>
              </div>
            </div>

            {/* Typography Narrative (6 cols - individual text paragraphs) */}
            <div
              className={`moment-text lg:col-span-6 space-y-4 sm:space-y-6 ${
                idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <span className="moment-text-item font-mono text-[11px] sm:text-xs text-[#6F4E37] uppercase tracking-widest block font-medium will-change-transform">
                PHASE 0{idx + 1}
              </span>

              <h3 className="moment-text-item font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase text-[#2B211C] leading-[0.95] tracking-tight will-change-transform">
                <span className="block">{m.headline}</span>
                <span className="font-serif-editorial italic font-normal text-[#B8794A] block mt-1">
                  {m.italicWord}
                </span>
              </h3>

              <p className="moment-text-item font-serif-editorial text-xl sm:text-2xl lg:text-3xl text-[#6F4E37] italic font-normal leading-relaxed will-change-transform">
                "{m.quote}"
              </p>

              <div className="moment-text-item pt-4 sm:pt-6 border-t border-[#D8C3A5]/50 text-[11px] sm:text-xs font-mono text-[#B8794A] uppercase tracking-wider will-change-transform">
                {m.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

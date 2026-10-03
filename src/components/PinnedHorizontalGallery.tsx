import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CafePhoto } from './CafePhotography';
import { EditorialTiltCard } from './EditorialTiltCard';

gsap.registerPlugin(ScrollTrigger);

interface GallerySlide {
  id: string;
  photoId: string;
  tag: string;
  title: string;
  quote: string;
  detail: string;
}

const SLIDES: GallerySlide[] = [
  {
    id: 's1',
    photoId: 'hand-pour',
    tag: '01 / RITUAL',
    title: 'THE MORNING HAND POUR',
    quote: 'Water meets ground cherry at precisely 93.5°C.',
    detail: 'Three controlled pours with a gooseneck spout over Japanese ceramic ribs.',
  },
  {
    id: 's2',
    photoId: 'pastry-cardamom',
    tag: '02 / HEARTH',
    title: 'SWEDISH CARDAMOM KNOT',
    quote: 'Laminated dough with fresh crushed green cardamom pods.',
    detail: 'Freshly pulled from our stone deck oven at 06:30 each dawn.',
  },
  {
    id: 's3',
    photoId: 'roastery-beans',
    tag: '03 / ROASTERY',
    title: 'THE SINGLE-ORIGIN DRUM ROAST',
    quote: 'Single origin cherries roasted to medium-light crackle at 204°C.',
    detail: 'Preserving delicate notes of blood orange, bergamot mist, and sweet toasted macadamia.',
  },
  {
    id: 's4',
    photoId: 'rain-facade',
    tag: '04 / ARCHITECTURE',
    title: 'THE MONSOON PAVILION',
    quote: 'Floor-to-ceiling acoustic glass facing courtyard rain.',
    detail: 'Board-formed cedar concrete walls and continuous low dark ash seating.',
  },
  {
    id: 's5',
    photoId: 'hero-night-cafe',
    tag: '05 / NIGHTFALL',
    title: 'AFTER 22:00 MIDNIGHT',
    quote: 'When the city sleeps and the last espresso is pulled.',
    detail: 'Low amber filament lamps, velvet shadows, and quiet lingering conversations.',
  },
];

export const PinnedHorizontalGallery: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Responsive horizontal scroll calculations
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + (window.innerWidth < 640 ? 32 : 80));

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 500}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full bg-[#2B211C] text-[#FFFDF8] overflow-hidden flex flex-col justify-between py-5 sm:py-7 md:py-9 lg:py-12 px-4 sm:px-8 md:px-12 lg:px-20 select-none"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto w-full flex items-end justify-between border-b border-[#D8C3A5]/30 pb-3 sm:pb-4 md:pb-6 shrink-0">
        <div>
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D8C3A5] block mb-1.5 sm:mb-2">
            CHAPTER 02 · PINNED SCROLL STORY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#FFFDF8]">
            WALK THROUGH
            <span className="font-serif-editorial italic font-normal text-[#D8C3A5] ml-2 sm:ml-4">
              the hours.
            </span>
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2.5 text-xs font-mono text-[#D8C3A5] uppercase tracking-widest">
          <span>SCROLL DOWN TO EXPLORE</span>
          <span className="text-[#B8794A]">→</span>
        </div>
      </div>

      {/* Horizontal Sliding Track (Responsive card widths) */}
      <div className="relative w-full my-auto overflow-visible py-3 sm:py-6">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 md:gap-12 will-change-transform pr-12 sm:pr-24"
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="shrink-0 w-[84vw] sm:w-[460px] md:w-[520px] lg:w-[560px] group flex flex-col space-y-3 sm:space-y-4"
            >
              <EditorialTiltCard
                badge={{
                  seal: '蔵',
                  tag: slide.tag,
                  sub: 'VESU ARCHIVE',
                }}
                className="aspect-[16/11] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl bg-[#211A16] border border-[#D8C3A5]/30 shadow-2xl"
              >
                <CafePhoto
                  id={slide.photoId}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 font-mono text-[10px] sm:text-[11px] text-[#D8C3A5] tracking-widest uppercase bg-[#2B211C]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D8C3A5]/30">
                  {slide.tag}
                </div>
              </EditorialTiltCard>

              {/* Slide Editorial Information */}
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-2xl font-bold uppercase text-[#FFFDF8] tracking-tight group-hover:text-[#D8C3A5] transition-colors">
                  {slide.title}
                </h3>
                <p className="font-serif-editorial text-base sm:text-lg italic text-[#D8C3A5] leading-snug line-clamp-2 sm:line-clamp-none">
                  "{slide.quote}"
                </p>
                <p className="font-sans text-[11px] sm:text-xs text-[#D8C3A5]/80 leading-relaxed pt-0.5 sm:pt-1">
                  {slide.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar (Responsive flex alignment) */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-[#D8C3A5]/30 shrink-0 text-[10px] sm:text-xs font-mono text-[#D8C3A5]">
        <span className="hidden sm:inline truncate">SURAT ATELIER · 05 SCENES</span>
        <div className="flex-1 max-w-[200px] sm:max-w-xs h-[2px] bg-[#6F4E37]/50 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-[#B8794A] transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>
        <span className="uppercase text-[#B8794A] shrink-0">HORIZONTAL SCROLL</span>
      </div>
    </section>
  );
};

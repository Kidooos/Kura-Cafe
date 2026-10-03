import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls past hero section (~85% of viewport height)
      const pastHero = window.scrollY > window.innerHeight * 0.8;

      if (pastHero !== isVisibleRef.current) {
        isVisibleRef.current = pastHero;
        setIsVisible(pastHero);

        const btn = btnRef.current;
        if (!btn) return;

        if (pastHero) {
          // Animate entrance: gently slide & fade up
          gsap.killTweensOf(btn);
          gsap.fromTo(
            btn,
            { opacity: 0, y: 24, scale: 0.85, pointerEvents: 'none' },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: 'back.out(1.5)',
              pointerEvents: 'auto',
            }
          );
        } else {
          // Animate exit: gently slide & fade down
          gsap.killTweensOf(btn);
          gsap.to(btn, {
            opacity: 0,
            y: 20,
            scale: 0.85,
            duration: 0.35,
            ease: 'power2.in',
            pointerEvents: 'none',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    // If Lenis is active on window, use its smooth scroll easing
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: unknown) => void } }).__lenis;

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback GSAP scroll interpolation
      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: 0,
        duration: 1.3,
        ease: 'power3.inOut',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        },
      });
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={handleScrollToTop}
      aria-label="Scroll back to top"
      style={{ opacity: 0, pointerEvents: 'none' }}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B211C]/90 hover:bg-[#2B211C] backdrop-blur-md border border-[#D8C3A5]/40 hover:border-[#B8794A] text-[#D8C3A5] hover:text-[#FFFDF8] shadow-xl hover:shadow-[0_0_24px_rgba(184,121,74,0.45)] transition-colors duration-300 cursor-pointer will-change-transform"
    >
      {/* Warm caramel glow bloom */}
      <div className="absolute inset-0 rounded-full bg-[#B8794A]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Up Arrow with subtle hover micro-bounce */}
      <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D8C3A5] group-hover:text-[#B8794A] transition-all duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Premium Magnetic Orb Custom Cursor
 * - Small warm glowing orb following mouse with smooth inertia.
 * - Symmetrically centered thin circular ring around the orb.
 * - Delicate glow trail following with fluid lag.
 * - Magnetic effect: pulls the cursor towards buttons and clickable links as they approach,
 *   with subtle complementary physical displacement on the hovered button.
 * - Fully synchronized with GSAP xPercent: -50, yPercent: -50 for dead-center alignment.
 */
export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Element refs
  const cursorWrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State refs
  const isHoveredRef = useRef(false);
  const activeMagneticElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // Hide system cursor on fine pointer desktop
    document.documentElement.classList.add('custom-cursor-active');

    const orb = orbRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!orb || !ring) return;

    // CRITICAL: Initialize xPercent and yPercent to -50% in GSAP
    gsap.set([orb, ring, ...trails], {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: 'center center',
      force3D: true,
      x: -100,
      y: -100,
    });

    // GSAP quickTo setters for fluid, laggy inertia
    const setOrbX = gsap.quickTo(orb, 'x', { duration: 0.32, ease: 'power2.out' });
    const setOrbY = gsap.quickTo(orb, 'y', { duration: 0.32, ease: 'power2.out' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power2.out' });

    const trailSettersX = trails.map((el, i) =>
      gsap.quickTo(el, 'x', { duration: 0.5 + i * 0.12, ease: 'power2.out' })
    );
    const trailSettersY = trails.map((el, i) =>
      gsap.quickTo(el, 'y', { duration: 0.5 + i * 0.12, ease: 'power2.out' })
    );

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check for closest interactive target for magnetic attraction
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer'
      ) as HTMLElement | null;

      let finalCursorX = mouseX;
      let finalCursorY = mouseY;

      if (interactiveEl) {
        // Calculate interactive element center
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic attraction: pull cursor 48% toward element center
        const magneticPull = 0.48;
        finalCursorX = mouseX + (centerX - mouseX) * magneticPull;
        finalCursorY = mouseY + (centerY - mouseY) * magneticPull;

        // Subtle tactile button attraction towards mouse
        const deltaX = (mouseX - centerX) * 0.18;
        const deltaY = (mouseY - centerY) * 0.18;

        gsap.to(interactiveEl, {
          x: deltaX,
          y: deltaY,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        activeMagneticElRef.current = interactiveEl;
      } else if (activeMagneticElRef.current) {
        // Released from magnetic field: spring button back to resting position
        gsap.to(activeMagneticElRef.current, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        });
        activeMagneticElRef.current = null;
      }

      setOrbX(finalCursorX);
      setOrbY(finalCursorY);

      setRingX(finalCursorX);
      setRingY(finalCursorY);

      trailSettersX.forEach((fn) => fn(finalCursorX));
      trailSettersY.forEach((fn) => fn(finalCursorY));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.closest('a, button, input, select, textarea, [role="button"], [onclick], .cursor-pointer')
      );

      if (isInteractive && !isHoveredRef.current) {
        isHoveredRef.current = true;

        // 1. Orb smoothly expands with warm golden luminescence
        gsap.to(orb, {
          scale: 1.6,
          backgroundColor: '#FFFDF8',
          boxShadow: '0 0 18px 4px rgba(184, 121, 74, 0.75), 0 0 32px 8px rgba(184, 121, 74, 0.4)',
          transformOrigin: 'center center',
          duration: 0.32,
          ease: 'power2.out',
        });

        // 2. Magnetic ring expands and brightens
        gsap.to(ring, {
          scale: 1.45,
          borderColor: 'rgba(184, 121, 74, 0.9)',
          boxShadow: '0 0 20px rgba(184, 121, 74, 0.25)',
          transformOrigin: 'center center',
          duration: 0.32,
          ease: 'power2.out',
        });
      } else if (!isInteractive && isHoveredRef.current) {
        isHoveredRef.current = false;

        // Leaving animation: return to default size
        gsap.to(orb, {
          scale: 1,
          backgroundColor: '#FFFDF8',
          boxShadow: '0 0 10px 2px rgba(184, 121, 74, 0.55), 0 0 22px 5px rgba(184, 121, 74, 0.25)',
          transformOrigin: 'center center',
          duration: 0.35,
          ease: 'power2.out',
        });

        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(184, 121, 74, 0.35)',
          boxShadow: '0 0 14px rgba(184, 121, 74, 0.08)',
          transformOrigin: 'center center',
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(orb, { scale: isHoveredRef.current ? 1.25 : 0.82, duration: 0.15, ease: 'power2.in' });
      gsap.to(ring, { scale: isHoveredRef.current ? 1.18 : 0.85, duration: 0.15, ease: 'power2.in' });
    };

    const handleMouseUp = () => {
      gsap.to(orb, { scale: isHoveredRef.current ? 1.6 : 1, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(ring, { scale: isHoveredRef.current ? 1.45 : 1, duration: 0.3, ease: 'back.out(2)' });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (activeMagneticElRef.current) {
        gsap.to(activeMagneticElRef.current, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        activeMagneticElRef.current = null;
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorWrapRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Subtle Glow Trail Behind Orb (Staggered trailing nodes) */}
      {[0, 1, 2].map((i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform blur-[2px]"
          style={{
            width: `${7 - i * 1.5}px`,
            height: `${7 - i * 1.5}px`,
            backgroundColor: '#B8794A',
            opacity: 0.28 - i * 0.08,
            boxShadow: '0 0 10px 2px rgba(184, 121, 74, 0.4)',
          }}
        />
      ))}

      {/* Thin Circular Outer Ring (Centered around orb) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: '38px',
          height: '38px',
          border: '1px solid rgba(184, 121, 74, 0.35)',
          boxShadow: '0 0 14px rgba(184, 121, 74, 0.08)',
        }}
      >
        {/* Subtle slow rotating ring accent */}
        <div className="w-full h-full rounded-full border border-dashed border-[#D8C3A5]/30 animate-[spin_18s_linear_infinite]" />
      </div>

      {/* Small Warm Glowing Center Orb (Dead center) */}
      <div
        ref={orbRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          width: '9px',
          height: '9px',
          backgroundColor: '#FFFDF8',
          boxShadow: '0 0 10px 2px rgba(184, 121, 74, 0.55), 0 0 22px 5px rgba(184, 121, 74, 0.25)',
        }}
      />
    </div>
  );
};

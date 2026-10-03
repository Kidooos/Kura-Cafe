import React, { useRef, useState } from 'react';
import gsap from 'gsap';

interface EditorialTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  badge?: {
    seal?: string;
    tag: string;
    sub?: string;
  };
}

/**
 * EditorialTiltCard
 * Combines Option 1 (Interactive 3D Perspective Tilt with dynamic Light Glare)
 * and Option 3 (Cinema Lens Slow-Zoom with Hidden Editorial Detail Reveal Tag).
 */
export const EditorialTiltCard: React.FC<EditorialTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  badge,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply tilt on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Smooth subtle 3D tilt angles
    const tiltX = (y - 0.5) * -maxTilt * 2;
    const tiltY = (x - 0.5) * maxTilt * 2;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    });

    // Dynamic light glare tracking mouse position
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.24) 0%, rgba(184, 121, 74, 0.15) 32%, transparent 70%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const card = cardRef.current;
    const glare = glareRef.current;

    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (glare) {
      gsap.to(glare, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative will-change-transform w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative overflow-hidden group transition-shadow duration-500 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_24px_rgba(184,121,74,0.3)] ${className}`}
      >
        {children}

        {/* Dynamic Light Glare Reflection (Option 1) */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-0 transition-opacity duration-300 z-20"
        />

        {/* Hidden Editorial Detail Reveal Tag (Option 3) */}
        {badge && (
          <div
            className={`absolute top-4 sm:top-5 right-4 sm:right-5 z-20 pointer-events-none transition-all duration-500 ease-out transform ${
              isHovered
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-2 scale-95'
            }`}
          >
            <div className="flex items-center gap-2 bg-[#2B211C]/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-[#D8C3A5]/45 shadow-xl text-[10px] sm:text-[11px] font-mono text-[#FFFDF8] tracking-wider">
              {badge.seal && (
                <span className="text-[#B8794A] font-bold text-xs">
                  {badge.seal}
                </span>
              )}
              <span className="uppercase text-[#FFFDF8] font-medium">
                {badge.tag}
              </span>
              {badge.sub && (
                <span className="text-[#D8C3A5]/80 hidden sm:inline">
                  · {badge.sub}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

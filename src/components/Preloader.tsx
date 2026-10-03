import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);
  const cremaLineRef = useRef<SVGLineElement>(null);
  const steamRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const liquid = liquidRef.current;
    const crema = cremaLineRef.current;
    const steam = steamRef.current;
    const cupWrap = cupWrapperRef.current;
    const container = containerRef.current;

    // Timeline for liquid rising from bottom to top of the cup (0% to 100%)
    const progressObj = { value: 0 };

    const tl = gsap.timeline();

    // 1. Initial states
    if (steam) gsap.set(steam, { opacity: 0, y: 10 });
    if (liquid) gsap.set(liquid, { attr: { y: 150, height: 0 } });
    if (crema) gsap.set(crema, { attr: { y1: 150, y2: 150 }, opacity: 0 });

    // 2. Animate counter and liquid fill
    tl.to(progressObj, {
      value: 100,
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        setPercent(val);

        // Cup liquid fills from y=145 (bottom) to y=55 (rim)
        // Total height span = 90px
        const currentY = 145 - (val / 100) * 90;
        const currentH = (val / 100) * 90;

        if (liquid) {
          liquid.setAttribute('y', String(currentY));
          liquid.setAttribute('height', String(currentH));
        }
        if (crema) {
          crema.setAttribute('y1', String(currentY));
          crema.setAttribute('y2', String(currentY));
          crema.style.opacity = val > 5 ? '1' : '0';
        }
      },
    })
      // 3. At 100% full: Coffee steam curls rise gracefully
      .to(
        steam,
        {
          opacity: 0.85,
          y: -12,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      // Small pause to admire the freshly prepared coffee cup
      .to({}, { duration: 0.35 })
      // 4. The whole coffee cup floats up into the air
      .to(cupWrap, {
        y: -120,
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        ease: 'power3.in',
      })
      .to(
        textRef.current,
        {
          y: -40,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
        },
        '-=0.6'
      )
      // 5. Preloader curtain smoothly slides upwards (100% to 0%), revealing Hero page
      .to(
        container,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          onComplete: () => {
            onComplete();
          },
        },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2B211C] text-[#FFFDF8] select-none will-change-transform"
    >
      <div className="flex flex-col items-center justify-center text-center px-6">
        {/* Animated Coffee Cup Wrapper */}
        <div
          ref={cupWrapperRef}
          className="relative w-52 h-44 sm:w-60 sm:h-48 flex items-center justify-center mb-6 will-change-transform"
        >
          <svg
            viewBox="0 0 240 200"
            className="w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Cup Interior Clipping Path (Where liquid rises) */}
              <clipPath id="cup-interior-clip">
                <path d="M52 55 L64 144 C65 149 71 152 78 152 L142 152 C149 152 155 149 156 144 L168 55 Z" />
              </clipPath>

              {/* Rich Espresso & Amber Liquid Gradient */}
              <linearGradient id="espresso-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DF9345" />
                <stop offset="15%" stopColor="#B8794A" />
                <stop offset="60%" stopColor="#6E3E1B" />
                <stop offset="100%" stopColor="#2E180E" />
              </linearGradient>

              {/* Golden Crema Top Glow */}
              <linearGradient id="crema-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8794A" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#F5D0A9" stopOpacity="1" />
                <stop offset="100%" stopColor="#B8794A" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Rising Coffee Steam (Appears at 100%) */}
            <g ref={steamRef} className="will-change-transform" opacity="0">
              <path
                d="M85 45 C80 32 92 24 88 12"
                stroke="#D8C3A5"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M110 42 C105 28 118 20 112 6"
                stroke="#E8D5BE"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M135 45 C140 32 128 24 132 12"
                stroke="#D8C3A5"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>

            {/* Ceramic Saucer underneath cup */}
            <ellipse
              cx="110"
              cy="166"
              rx="88"
              ry="11"
              fill="#211A16"
              stroke="#D8C3A5"
              strokeWidth="2.5"
              opacity="0.85"
            />
            <ellipse
              cx="110"
              cy="164"
              rx="76"
              ry="7"
              fill="#181310"
              opacity="0.5"
            />

            {/* Cup Outer Body Silhouette (Dark Stoneware Ceramic) */}
            <path
              d="M48 52 L62 145 C64 153 71 156 80 156 L140 156 C149 156 156 153 158 145 L172 52 Z"
              fill="#1D1612"
              stroke="#D8C3A5"
              strokeWidth="3"
            />

            {/* Cup Ceramic Handle on Right */}
            <path
              d="M165 72 C192 72 195 125 155 128"
              fill="none"
              stroke="#D8C3A5"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M163 81 C181 81 183 116 156 118"
              fill="none"
              stroke="#1D1612"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Rising Coffee Liquid inside Cup (Clipped to cup interior) */}
            <g clipPath="url(#cup-interior-clip)">
              <rect
                ref={liquidRef}
                x="45"
                y="145"
                width="130"
                height="0"
                fill="url(#espresso-gradient)"
                className="will-change-transform"
              />

              {/* Crema / Foam Top Line that rises with liquid */}
              <line
                ref={cremaLineRef}
                x1="50"
                y1="145"
                x2="170"
                y2="145"
                stroke="url(#crema-glow)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="will-change-transform"
              />
            </g>

            {/* Cup Rim Oval Highlight */}
            <ellipse
              cx="110"
              cy="52"
              rx="62"
              ry="11"
              fill="none"
              stroke="#D8C3A5"
              strokeWidth="2.5"
            />
          </svg>

          {/* Real-time Percentage Indicator Floating beside the cup */}
          <div className="absolute -right-3 sm:-right-8 top-1/2 -translate-y-1/2 flex flex-col items-start bg-[#1C1511]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#D8C3A5]/30 shadow-lg">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#B8794A] tabular-nums">
              {percent < 10 ? `0${percent}` : percent}%
            </span>
            <span className="text-[8px] font-mono tracking-widest text-[#D8C3A5]/60 uppercase">
              BREWING
            </span>
          </div>
        </div>

        {/* Brand & Loading Narrative */}
        <div ref={textRef} className="space-y-2 will-change-transform">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#B8794A]/40" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#D8C3A5]">
              KURA ATELIER
            </span>
            <span className="w-6 h-[1px] bg-[#B8794A]/40" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#FFFDF8] uppercase">
            {percent < 100 ? 'PREPARING YOUR CUP' : 'CUP IS READY'}
          </h2>

          <p className="font-serif-editorial text-sm italic text-[#D8C3A5]/80">
            {percent < 40 && 'Heating water to 93.5°C...'}
            {percent >= 40 && percent < 75 && 'Extracting single-origin Gesha lot #28...'}
            {percent >= 75 && percent < 100 && 'Silky microfoam & golden crema forming...'}
            {percent === 100 && 'Door is open. Welcome in.'}
          </p>
        </div>
      </div>
    </div>
  );
};

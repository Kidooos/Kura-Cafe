import React from 'react';
import { ArrowUpRight, Clock, Compass, MapPin, Navigation, Phone } from 'lucide-react';

interface LocationSectionProps {
  onOpenReservation: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenReservation }) => {
  return (
    <section
      id="visit"
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#080808] text-[#f2ede4] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-4">
          <span className="w-6 h-[1px] bg-[#c99a6b]" />
          <span>CHAPTER 08</span>
          <span className="text-white/20">·</span>
          <span>THE SANCTUARY</span>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
            COME
            <br />
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
              find us.
            </span>
          </h2>
        </div>

        {/* Cinematic Architectural Exterior Showcase & Glass Overlay */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[500px] sm:min-h-[580px] flex items-center justify-center p-6 sm:p-12 shadow-2xl bg-gradient-to-b from-[#141210] to-[#070707]">
          {/* Subtle architectural concrete texture backdrop */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Central Glassmorphic Dossier Card (Section 22 requirement) */}
          <div
            data-cursor="LOOK"
            className="relative z-10 w-full max-w-2xl p-8 sm:p-12 rounded-3xl bg-[#141210]/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 space-y-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-display text-2xl font-bold tracking-[0.25em] text-[#faf8f5] uppercase">
                KURA
              </span>
              <span className="flex items-center gap-2 text-xs font-mono text-[#52b788] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#52b788] animate-ping" />
                <span>OPEN DAILY</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Address details */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8a8075] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c99a6b]" />
                  <span>ADDRESS &amp; LANDMARK</span>
                </span>
                <p className="font-display text-lg font-semibold text-[#faf8f5]">
                  Courtyard Behind Old Banyan,
                  <br />
                  Silent Alley, Vesu,
                  <br />
                  Surat, Gujarat 395007
                </p>
                <p className="text-xs font-sans-clean text-[#9a9186] italic">
                  Look for the discreet blackened brass lantern on the cedar gate.
                </p>
              </div>

              {/* Operating hours */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8a8075] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c99a6b]" />
                  <span>COFFEE &amp; LISTENING HOURS</span>
                </span>
                <p className="font-mono text-xl font-bold text-[#f2ede4] tabular-nums">
                  07:30 — 23:30
                </p>
                <p className="text-xs font-mono text-[#beb3a5] uppercase">
                  MONDAY — SUNDAY (NO REST DAYS)
                </p>
                <p className="text-xs font-sans-clean text-[#8a8075]">
                  Kitchen closes at 22:30. Espresso &amp; vinyl continue till midnight.
                </p>
              </div>
            </div>

            {/* Direct Navigation Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <a
                href="https://maps.google.com/?q=Surat+Gujarat"
                target="_blank"
                rel="noreferrer"
                data-cursor="GO"
                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#f2ede4] hover:bg-[#c99a6b] text-[#080808] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenReservation}
                data-cursor="BOOK"
                className="px-5 py-3 rounded-full border border-white/20 hover:border-[#c99a6b] text-xs font-mono tracking-wider uppercase text-[#f2ede4] hover:text-[#c99a6b] transition-colors"
              >
                RESERVE SEATING →
              </button>
            </div>
          </div>
        </div>

        {/* Section 23: Final Emotional CTA */}
        <div className="mt-24 text-center py-16 px-6 rounded-3xl bg-gradient-to-b from-[#100d0c] to-[#080808] border border-white/10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c99a6b]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs text-[#c99a6b] tracking-[0.3em] uppercase block">
              THE DOORS ARE UNLOCKED
            </span>

            <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#faf8f5] tracking-tight">
              STAY A LITTLE
              <br />
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
                longer.
              </span>
            </h3>

            <p className="font-serif-editorial text-2xl text-[#d4ccc2] italic font-normal">
              "We'll keep the lights on."
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenReservation}
                data-cursor="BOOK"
                className="px-8 py-4 bg-[#f2ede4] hover:bg-[#c99a6b] text-[#080808] text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 shadow-xl shadow-black/60 hover:scale-105 active:scale-95"
              >
                RESERVE YOUR TABLE NOW →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { CafePhoto } from './CafePhotography';

interface FinalCTAProps {
  onOpenReservation: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenReservation }) => {
  return (
    <section
      id="final-cta"
      className="final-cta-section relative flex-1 w-full py-8 sm:py-10 md:py-12 px-4 sm:px-8 md:px-12 bg-[#2B211C] text-[#FFFDF8] flex items-center justify-center overflow-hidden border-t border-[#D8C3A5]/30 select-none"
    >
      {/* Background Night Atmosphere Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <CafePhoto
          id="hero-night-cafe"
          alt="Night café with warm amber lamps and rain"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B211C] via-[#2B211C]/60 to-[#2B211C]" />
      </div>

      {/* Center Cinematic Invitation */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3.5 md:space-y-4">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#D8C3A5] block font-medium">
          THE LIGHTS REMAIN ON TILL 23:30
        </span>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#FFFDF8] leading-[0.92]">
          STAY A LITTLE
          <br />
          <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#D8C3A5] to-[#B8794A]">
            longer.
          </span>
        </h2>

        <p className="font-serif-editorial text-base sm:text-lg md:text-xl text-[#D8C3A5] italic font-normal max-w-lg mx-auto leading-snug">
          "The rain is outside. The records are spinning. There is always time for one more cup."
        </p>

        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenReservation}
            className="btn-editorial group relative px-7 sm:px-8 py-3 sm:py-3.5 bg-[#FFFDF8] text-[#2B211C] border border-[#D8C3A5] hover:border-[#B8794A] text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-lg hover:shadow-[0_0_30px_rgba(184,121,74,0.4)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span>RESERVE A TABLE</span>
              <span className="text-[#B8794A] text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8794A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>

        <div className="pt-2 sm:pt-3 text-[10px] sm:text-xs font-mono text-[#D8C3A5]/80 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3">
          <span>VESU, SURAT</span>
          <span className="text-[#B8794A] hidden sm:inline">·</span>
          <span>NO APPOINTMENT NEEDED FOR WALK-INS</span>
        </div>
      </div>
    </section>
  );
};

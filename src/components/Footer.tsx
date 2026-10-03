import React from 'react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer
      id="footer"
      className="footer-section relative bg-[#2B211C] text-[#D8C3A5] py-4 sm:py-5 md:py-6 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-[#D8C3A5]/30 select-none shrink-0"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 md:gap-8">
        {/* Brand & Editorial Ethos */}
        <div className="space-y-1 sm:space-y-1.5">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#FFFDF8] uppercase block">
            KURA
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#D8C3A5] uppercase">
            <span>COFFEE</span>
            <span className="text-[#B8794A]">·</span>
            <span>PEOPLE</span>
            <span className="text-[#B8794A]">·</span>
            <span>ATMOSPHERE</span>
            <span className="text-[#B8794A]">·</span>
            <span>ANALOG SOUND</span>
          </div>
          <p className="font-sans text-xs text-[#D8C3A5]/80 max-w-sm leading-relaxed">
            Silent Alley, Behind Old Banyan, Vesu, Surat, Gujarat. Doors open 07:30 till 23:30 every single day.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-xs font-mono tracking-widest uppercase">
          <a
            href="#gallery"
            className="hover:text-[#B8794A] transition-colors cursor-pointer"
          >
            VISUALS
          </a>
          <a
            href="#menu"
            className="hover:text-[#B8794A] transition-colors cursor-pointer"
          >
            MENU
          </a>
          <a
            href="#atmosphere"
            className="hover:text-[#B8794A] transition-colors cursor-pointer"
          >
            HOURS
          </a>
          <button
            onClick={onOpenReservation}
            className="hover:text-[#B8794A] transition-colors text-left cursor-pointer"
          >
            RESERVATIONS
          </button>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-start md:justify-end w-full md:w-auto text-xs font-mono">
          <span className="text-[11px] text-[#D8C3A5]/70 uppercase tracking-wider">
            © 2026 KURA ATELIER. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
};

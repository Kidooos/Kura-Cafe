import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20 ${
          isScrolled
            ? 'py-2.5 sm:py-3 md:py-3.5 bg-[#F3EDE3]/95 backdrop-blur-md border-b border-[#D8C3A5]/50 shadow-xs'
            : 'py-3.5 sm:py-4 md:py-5 lg:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#top"
            className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase hover:text-[#B8794A] transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              isScrolled ? 'text-[#2B211C]' : 'text-[#FFFDF8]'
            }`}
          >
            KURA
          </a>

          {/* Zone 2: Desktop / Tablet 3 text navigation links */}
          <nav
            className={`hidden md:flex items-center gap-5 md:gap-7 lg:gap-10 text-[11px] lg:text-xs font-mono tracking-[0.16em] lg:tracking-[0.22em] uppercase transition-colors shrink-0 ${
              isScrolled ? 'text-[#6F4E37]' : 'text-[#D8C3A5]'
            }`}
          >
            <a
              href="#gallery"
              className="hover:text-[#B8794A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8794A] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              VISUALS
            </a>
            <a
              href="#menu"
              className="hover:text-[#B8794A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8794A] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              MENU
            </a>
            <a
              href="#atmosphere"
              className="hover:text-[#B8794A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8794A] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              ATMOSPHERE
            </a>
          </nav>

          {/* Zone 3: CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 shrink-0">
            {/* Reserve Table CTA (Responsive sizing) */}
            <button
              onClick={onOpenReservation}
              className={`btn-editorial group relative px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shrink-0 ${
                isScrolled
                  ? 'bg-[#2B211C] text-[#FFFDF8] border border-[#B8794A]/40 hover:border-[#B8794A] hover:shadow-[0_0_24px_rgba(184,121,74,0.45)]'
                  : 'bg-[#FFFDF8] text-[#2B211C] border border-[#D8C3A5] hover:border-[#B8794A] hover:shadow-[0_0_24px_rgba(184,121,74,0.4)]'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <span>RESERVE</span>
                <span className="hidden xl:inline">A TABLE</span>
                <span className="text-[#B8794A] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8794A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border transition-colors cursor-pointer ${
                isScrolled
                  ? 'border-[#D8C3A5] text-[#2B211C] hover:border-[#B8794A]'
                  : 'border-[#D8C3A5]/40 text-[#FFFDF8] hover:border-[#FFFDF8]'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#2B211C]/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-28 text-[#FFFDF8] animate-in fade-in duration-300">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B8794A] block">
              NAVIGATION
            </span>
            <div className="flex flex-col space-y-5 text-2xl font-display uppercase tracking-tight">
              <button
                onClick={() => handleMobileNavClick('#gallery')}
                className="text-left hover:text-[#B8794A] transition-colors cursor-pointer"
              >
                01 · VISUAL MOODBOARD
              </button>
              <button
                onClick={() => handleMobileNavClick('#menu')}
                className="text-left hover:text-[#B8794A] transition-colors cursor-pointer"
              >
                02 · TASTING LIST
              </button>
              <button
                onClick={() => handleMobileNavClick('#atmosphere')}
                className="text-left hover:text-[#B8794A] transition-colors cursor-pointer"
              >
                03 · THE HOURS
              </button>
            </div>
          </div>

          <div className="space-y-5 pt-8 border-t border-[#D8C3A5]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="btn-editorial w-full py-4 bg-[#FFFDF8] text-[#2B211C] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <span>RESERVE A TABLE</span>
              <span className="text-[#B8794A]">→</span>
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#D8C3A5] uppercase tracking-wider">
              <span>VESU, SURAT</span>
              <span>07:30 — 23:30</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

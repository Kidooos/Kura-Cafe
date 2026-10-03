import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { CafePhoto } from './CafePhotography';

interface MenuItem {
  id: string;
  name: string;
  origin: string;
  notes: string;
  price: string;
  photoId: string;
  category: 'coffee' | 'bakery' | 'signatures';
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'ESPRESSO DOPPIO',
    origin: 'Chikmagalur Silver Oak Lot #28',
    notes: 'Dark cacao · Blood orange · Heavy caramel crema',
    price: '₹180',
    photoId: 'm1-espresso',
    category: 'coffee',
  },
  {
    id: 'm2',
    name: 'SMOKED VANILLA CORTADO',
    origin: 'Double Ristretto + Madagascar Vanilla',
    notes: 'Toasted hazelnut · Oak smoke · Steamed to 62°C',
    price: '₹220',
    photoId: 'm2-cortado',
    category: 'coffee',
  },
  {
    id: 'm3',
    name: 'KYOTO 18-HOUR COLD DRIP',
    origin: 'Ethiopian Yirgacheffe Heirloom',
    notes: 'Jasmine blossom · Bergamot mist · Sparkling stone fruit',
    price: '₹280',
    photoId: 'm3-cold-drip',
    category: 'signatures',
  },
  {
    id: 'm4',
    name: 'CARDAMOM & CRUSHED SEA SALT KNOT',
    origin: 'Wild Wheat 36-Hr Ferment Dough',
    notes: 'Green cardamom pods · Pearl sugar · Flaky sea salt',
    price: '₹240',
    photoId: 'm4-cardamom-knot',
    category: 'bakery',
  },
  {
    id: 'm5',
    name: 'BURNT BASQUE CHEESECAKE',
    origin: 'Baked at 240°C Cast Iron',
    notes: 'Bittersweet mahogany crust · Molten cream core',
    price: '₹320',
    photoId: 'm5-cheesecake',
    category: 'bakery',
  },
  {
    id: 'm6',
    name: 'UJI CEREMONIAL MATCHA LATTE',
    origin: 'First Harvest Tencha, Kyoto',
    notes: 'Sweet grassy umami · Bamboo whisked · House oat',
    price: '₹290',
    photoId: 'm6-matcha',
    category: 'signatures',
  },
  {
    id: 'm7',
    name: 'MIDNIGHT DARK LATTE',
    origin: 'Valrhona 72% + Double Espresso',
    notes: 'Bourbon vanilla bean · Smoked salt · Night hours',
    price: '₹260',
    photoId: 'm7-dark-latte',
    category: 'signatures',
  },
];

export const EditorialMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<MenuItem>(MENU_ITEMS[0]);
  const [isHovering, setIsHovering] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth floating preview strictly confined to menu item hover on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, {
      x: e.clientX + 28,
      y: e.clientY - 140,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleItemEnter = (item: MenuItem, e: React.MouseEvent) => {
    setActiveItem(item);
    setIsHovering(true);

    if (previewRef.current) {
      gsap.to(previewRef.current, {
        x: e.clientX + 28,
        y: e.clientY - 140,
        duration: 0,
      });
    }
  };

  const handleItemLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleItemLeave}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20 bg-[#F3EDE3] text-[#211A16] border-t border-[#D8C3A5]/40 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-14">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B8794A] block mb-2 sm:mb-3 font-medium">
              CHAPTER 03 · THE EDITORIAL TASTING LIST
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#2B211C] leading-[0.95]">
              WHAT'S
              <br />
              <span className="font-serif-editorial italic font-normal text-[#6F4E37]">
                on the counter.
              </span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#6F4E37] max-w-sm leading-relaxed">
            Hover over any item to preview its craft and origins. Prepared slowly by hand, served in handmade ceramic stoneware.
          </p>
        </div>

        {/* Minimal Magazine List (Responsive full-width typography) */}
        <div
          onMouseLeave={handleItemLeave}
          className="divide-y divide-[#D8C3A5]/50 border-y border-[#D8C3A5]/50"
        >
          {MENU_ITEMS.map((item, idx) => {
            const isSelected = isHovering && activeItem.id === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={(e) => handleItemEnter(item, e)}
                onMouseLeave={handleItemLeave}
                className={`py-4 sm:py-5 md:py-6 lg:py-7 px-3 sm:px-6 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-5 md:gap-8 group ${
                  isSelected ? 'bg-[#FFFDF8]/80' : 'hover:bg-[#FFFDF8]/50'
                }`}
              >
                {/* Left Title & Kicker */}
                <div className="space-y-2 sm:space-y-2.5 flex-1">
                  <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-[#6F4E37]">
                    <span>0{idx + 1}</span>
                    <span className="text-[#D8C3A5]">/</span>
                    <span className="text-[#B8794A] uppercase tracking-wider truncate max-w-[240px] sm:max-w-none">
                      {item.origin}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2B211C] group-hover:text-[#B8794A] transition-all">
                    {item.name}
                  </h3>

                  <p className="font-serif-editorial text-sm sm:text-base md:text-lg italic text-[#6F4E37]">
                    "{item.notes}"
                  </p>
                </div>

                {/* Right Price & Arrow */}
                <div className="flex items-center gap-4 sm:gap-8 justify-between md:justify-end shrink-0 pt-2 md:pt-0">
                  <span className="font-mono text-xl sm:text-2xl md:text-3xl font-medium text-[#2B211C] tabular-nums">
                    {item.price}
                  </span>
                  <span className="text-[#B8794A] text-lg sm:text-xl font-light opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:inline">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Mouse Preview Frame (Desktop only, strictly hidden unless hovering) */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 pointer-events-none z-50 w-72 h-80 rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.55),0_0_30px_rgba(184,121,74,0.35)] border border-[#D8C3A5]/50 hidden lg:block bg-[#2B211C]"
          style={{
            transform: 'translate3d(-999px, -999px, 0)',
            opacity: isHovering ? 1 : 0,
            visibility: isHovering ? 'visible' : 'hidden',
            transition: 'opacity 0.2s ease, visibility 0.2s ease',
          }}
        >
          <CafePhoto
            id={activeItem.photoId}
            alt={activeItem.name}
            className="w-full h-full object-cover transition-transform duration-500 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B211C] via-[#2B211C]/25 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#FFFDF8]">
            <span className="text-[#D8C3A5] block text-[10px] uppercase tracking-wider">{activeItem.origin}</span>
            <span className="font-display text-base font-bold uppercase block text-[#FFFDF8] tracking-tight">{activeItem.name}</span>
            <span className="font-serif-editorial text-sm italic text-[#B8794A] font-semibold">{activeItem.price}</span>
          </div>
        </div>

        {/* Quiet Footnote (Responsive stack) */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-[#6F4E37] uppercase tracking-wider">
          <span>ALL MILK DRINKS AVAILABLE WITH HOUSE-MILLED ORGANIC OAT</span>
          <span>FILTERED TO 135 PPM TDS</span>
        </div>
      </div>
    </section>
  );
};

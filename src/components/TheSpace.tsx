import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Disc3, Layers, Maximize2, Wind } from 'lucide-react';

interface SpaceZone {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  materials: string[];
  lighting: string;
  soundLevel: string;
  abstractPattern: string;
}

const SPACE_ZONES: SpaceZone[] = [
  {
    id: 'concrete-bar',
    number: '01',
    name: 'THE CONCRETE MONOLITH',
    subtitle: 'THE CENTRAL BAR & EXTRACTION RUNWAY',
    description: 'Poured in-situ using local river sand and board-formed cedar. Features hidden Modbar espresso taps under the stone to remove physical barriers between barista and guest.',
    materials: ['Board-formed raw concrete', 'Charred Japanese cedar', 'Hand-brushed brass'],
    lighting: 'Low pendant amber spots (2200K)',
    soundLevel: 'Gentle steam hiss & ceramic clinking',
    abstractPattern: 'from-[#1a1715] to-[#0d0c0b]',
  },
  {
    id: 'listening-room',
    number: '02',
    name: 'THE LISTENING CORNER',
    subtitle: 'ANALOG VINYL & ACOUSTIC QUIET',
    description: 'A sound-treated sanctuary with vintage Technics SL-1200 turntables, handcrafted Tannoy dual-concentric speakers, and a curated library of Tokyo jazz, ambient, and bossa nova vinyl.',
    materials: ['Perforated acoustic felt', 'Aged dark walnut', 'Leather club chairs'],
    lighting: 'Soft warm floor uplights',
    soundLevel: '33 RPM analog needle warmth',
    abstractPattern: 'from-[#1f1612] to-[#0a0807]',
  },
  {
    id: 'rain-bench',
    number: '03',
    name: 'THE MONSOON WINDOW',
    subtitle: 'FLOOR-TO-CEILING GLASS & SLOW RAIN',
    description: 'A continuous low bench facing west toward the courtyard. On monsoon evenings, water sheets down the acoustic double glass while patrons linger with warm cortados.',
    materials: ['Dark oiled ash timber', 'Smoked acoustic glass', 'Woven linen cushions'],
    lighting: 'Natural sky daylight to streetlamp reflections',
    soundLevel: 'Rhythmic rain drum on glass',
    abstractPattern: 'from-[#14181a] to-[#090b0c]',
  },
  {
    id: 'roasting-hearth',
    number: '04',
    name: 'THE ROASTING HEARTH',
    subtitle: 'CAST-IRON DRUM & CRAFT CHAMBER',
    description: 'Where the alchemy happens. Our custom cast-iron batch roaster rests beside burlap sacks of green heirloom coffee shipped directly from Chikmagalur estates.',
    materials: ['Brushed raw steel', 'Volcanic lava stone', 'Natural jute sacking'],
    lighting: 'Industrial focused task lamps',
    soundLevel: 'First-crack bean popping & cooling fan',
    abstractPattern: 'from-[#201712] to-[#0c0907]',
  },
];

export const TheSpace: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const zone = SPACE_ZONES[currentIdx];

  const nextZone = () => {
    setCurrentIdx((prev) => (prev + 1) % SPACE_ZONES.length);
  };

  const prevZone = () => {
    setCurrentIdx((prev) => (prev - 1 + SPACE_ZONES.length) % SPACE_ZONES.length);
  };

  return (
    <section
      id="space"
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#090807] text-[#f2ede4] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-3">
              <span className="w-6 h-[1px] bg-[#c99a6b]" />
              <span>CHAPTER 05</span>
              <span className="text-white/20">·</span>
              <span>ARCHITECTURE &amp; INTERIORS</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
              THE
              <br />
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
                space.
              </span>
            </h2>
          </div>

          {/* Gallery navigation controls */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#8a8075] uppercase tracking-widest">
              ZONE 0{currentIdx + 1} / 0{SPACE_ZONES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevZone}
                data-cursor="PREV"
                aria-label="Previous architectural zone"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#c99a6b] hover:text-[#c99a6b] flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextZone}
                data-cursor="NEXT"
                aria-label="Next architectural zone"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#c99a6b] hover:text-[#c99a6b] flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Immersive Architectural Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#12100e] shadow-2xl transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Narrative */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8 bg-gradient-to-b from-[#141210] to-[#0c0b09]">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#c99a6b] uppercase tracking-widest mb-4">
                  <span className="text-xl font-bold">{zone.number}</span>
                  <span>/</span>
                  <span>{zone.subtitle}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#faf8f5] tracking-tight mb-6">
                  {zone.name}
                </h3>

                <p className="text-sm sm:text-base font-sans-clean text-[#beb3a5] leading-relaxed mb-8">
                  {zone.description}
                </p>

                {/* Spatial Specs */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#8a8075] uppercase block mb-2">
                      MATERIALITY
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {zone.materials.map((m) => (
                        <span
                          key={m}
                          className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-[#ded7ce]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#8a8075] uppercase block">
                        ILLUMINATION
                      </span>
                      <span className="text-[#beb3a5]">{zone.lighting}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8a8075] uppercase block">
                        ACOUSTICS
                      </span>
                      <span className="text-[#beb3a5]">{zone.soundLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom quote */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-serif-editorial italic text-[#a39789]">
                <span>Designed with Japanese wabi-sabi &amp; brutalist concrete restraint.</span>
                <span className="font-mono text-[10px] uppercase text-[#c99a6b]">SURAT</span>
              </div>
            </div>

            {/* Right Architectural Mood Visual */}
            <div
              className={`lg:col-span-6 relative flex flex-col items-center justify-center p-8 sm:p-14 bg-gradient-to-br ${zone.abstractPattern} border-t lg:border-t-0 lg:border-l border-white/10`}
            >
              {/* Architectural Wireframe Grid overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#c99a6b]/10 border border-[#c99a6b]/30 flex items-center justify-center text-[#dfa86a]">
                  {currentIdx === 0 && <Layers className="w-8 h-8" />}
                  {currentIdx === 1 && <Disc3 className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />}
                  {currentIdx === 2 && <Wind className="w-8 h-8" />}
                  {currentIdx === 3 && <Maximize2 className="w-8 h-8" />}
                </div>

                <div className="space-y-1">
                  <h4 className="font-display text-xl font-bold uppercase text-[#f2ede4]">
                    {zone.name}
                  </h4>
                  <p className="font-serif-editorial text-sm italic text-[#c99a6b]">
                    "Space that lets you breathe."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left text-xs font-mono space-y-2 text-[#9a9186]">
                  <div className="flex justify-between">
                    <span>SEATING CAPACITY</span>
                    <span className="text-[#f2ede4]">18 GUESTS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NATURAL VENTILATION</span>
                    <span className="text-[#f2ede4]">COURTYARD DRAFT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>POWER OUTLETS</span>
                    <span className="text-[#f2ede4]">CONCEALED BRASS</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7a7065] block">
                  PHOTOGRAPHED BY ARCHITECTURAL ATELIER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {SPACE_ZONES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIdx(idx)}
              data-cursor="LOOK"
              className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                currentIdx === idx
                  ? 'bg-white/10 border-[#c99a6b] text-white shadow-lg'
                  : 'bg-white/[0.02] border-white/5 text-[#8a8075] hover:text-white hover:border-white/20'
              }`}
            >
              <span className="font-mono text-[10px] text-[#c99a6b] block mb-1">
                {item.number}
              </span>
              <span className="font-display text-xs font-bold uppercase tracking-wider block">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Flame, Sparkles } from 'lucide-react';

interface SignatureDrink {
  id: string;
  name: string;
  subtitle: string;
  ingredients: string;
  price: string;
  quote: string;
  temperature: string;
  glassware: string;
  badge: string;
  gradient: string;
}

const SIGNATURES: SignatureDrink[] = [
  {
    id: 'midnight-latte',
    name: 'MIDNIGHT LATTE',
    subtitle: 'NIGHT PROFILE · 10:00 PM SPECIALTY',
    ingredients: 'Double Ristretto / 72% Dark Single-Estate Chocolate / Bourbon Vanilla / Smoked Sea Salt',
    price: '₹240',
    quote: 'For nights that weren’t supposed to end early.',
    temperature: 'WARM 65°C',
    glassware: 'MATTE CHARCOAL CERAMIC',
    badge: 'SIGNATURE 01',
    gradient: 'from-[#1a120c] via-[#0f0b08] to-[#080808]',
  },
  {
    id: 'kyoto-amber-drip',
    name: 'KYOTO AMBER DRIP',
    subtitle: '18-HOUR COLD GRAVITY EXTRACTION',
    ingredients: 'Cold-Filtered Ethiopian Yirgacheffe / Sweet Orange Peel / Bergamot Flower / Sparkling Mist',
    price: '₹280',
    quote: 'Patience concentrated in liquid form.',
    temperature: 'CHILLED 4°C',
    glassware: 'FACETED CUT CRYSTAL ROCK',
    badge: 'SIGNATURE 02',
    gradient: 'from-[#1c160e] via-[#100d08] to-[#080808]',
  },
  {
    id: 'charcoal-cardamom',
    name: 'CHARCOAL & CARDAMOM',
    subtitle: 'GROUND BOTANICALS & ESPRESSO',
    ingredients: 'Activated Coconut Shell Charcoal / Green Cardamom Pods / Wild Honey / Velvety Oat',
    price: '₹260',
    quote: 'Earth, ancient spice, and quiet morning solitude.',
    temperature: 'WARM 62°C',
    glassware: 'UNGLAZED STONEWARE TUMBLER',
    badge: 'SIGNATURE 03',
    gradient: 'from-[#141517] via-[#0b0c0d] to-[#080808]',
  },
  {
    id: 'smoked-rose-cortado',
    name: 'SMOKED ROSE CORTADO',
    subtitle: 'DAMASK ROSE & KASHMIR SPICE',
    ingredients: 'Double Espresso / Kashmiri Rose Petal Water / Smoked Cinnamon Smoke / Cream Float',
    price: '₹250',
    quote: 'A fragrant whisper between Indian botanical heritage and European espresso craft.',
    temperature: 'WARM 60°C',
    glassware: 'HEAVY BASE AMBER GOBLET',
    badge: 'SIGNATURE 04',
    gradient: 'from-[#1d1315] via-[#110b0c] to-[#080808]',
  },
];

export const Signatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const drink = SIGNATURES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SIGNATURES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SIGNATURES.length) % SIGNATURES.length);
  };

  return (
    <section
      id="signatures"
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#080808] text-[#f2ede4] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-3">
              <span className="w-6 h-[1px] bg-[#c99a6b]" />
              <span>CHAPTER 04</span>
              <span className="text-white/20">·</span>
              <span>CURATED CREATIONS</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
              THE
              <br />
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
                signatures.
              </span>
            </h2>
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#8a8075] uppercase tracking-widest">
              0{activeIndex + 1} / 0{SIGNATURES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                data-cursor="PREV"
                aria-label="Previous signature drink"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#c99a6b] hover:text-[#c99a6b] flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                data-cursor="NEXT"
                aria-label="Next signature drink"
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#c99a6b] hover:text-[#c99a6b] flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Card */}
        <div
          className={`relative rounded-3xl p-8 sm:p-14 lg:p-16 border border-white/10 overflow-hidden bg-gradient-to-br ${drink.gradient} transition-all duration-700 shadow-2xl`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c99a6b]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Drink Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#c99a6b] tracking-widest uppercase">
                  {drink.badge}
                </span>
                <span className="font-mono text-xs text-[#8a8075] tracking-widest uppercase">
                  {drink.subtitle}
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#faf8f5] leading-none">
                {drink.name}
              </h3>

              <p className="font-serif-editorial text-2xl sm:text-3xl text-[#dfa86a] italic font-normal leading-snug">
                "{drink.quote}"
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#8a8075] block">
                  INGREDIENT ARCHITECTURE
                </span>
                <p className="text-sm font-sans-clean text-[#d4ccc2] leading-relaxed">
                  {drink.ingredients}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#8a8075] uppercase block tracking-wider">
                    PRICE
                  </span>
                  <span className="text-xl font-bold text-[#faf8f5] tabular-nums">
                    {drink.price}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a8075] uppercase block tracking-wider">
                    SERVING TEMP
                  </span>
                  <span className="text-sm text-[#beb3a5] uppercase">
                    {drink.temperature}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a8075] uppercase block tracking-wider">
                    VESSEL
                  </span>
                  <span className="text-sm text-[#beb3a5] uppercase">
                    {drink.glassware}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Abstract Visual Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center mb-6">
                {/* Rotating orbital rings */}
                <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-4 rounded-full border border-dashed border-[#c99a6b]/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#3b2216] via-[#1a0f0a] to-[#c99a6b]/30 flex flex-col items-center justify-center p-4 shadow-inner">
                  <Sparkles className="w-8 h-8 text-[#dfa86a] mb-1 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#f2ede4]">
                    ORIGINAL FORMULA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#a39789] tracking-wider uppercase mb-2">
                <Flame className="w-3.5 h-3.5 text-[#c99a6b]" />
                <span>FRESHLY CRAFTED PER ORDER</span>
              </div>

              <p className="text-[11px] font-sans-clean text-[#8a8075] max-w-xs">
                Available exclusively at our counter in Surat. Limited to 40 servings each evening.
              </p>
            </div>
          </div>

          {/* Quick Drink Selector Pill Nav */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10 overflow-x-auto">
            {SIGNATURES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                data-cursor="VIEW"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  activeIndex === idx
                    ? 'bg-[#c99a6b] text-[#080808] font-bold'
                    : 'text-[#8a8075] hover:text-white bg-white/[0.02]'
                }`}
              >
                0{idx + 1} {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

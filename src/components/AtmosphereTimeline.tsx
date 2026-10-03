import React, { useState } from 'react';
import { Clock, Moon, Sun, Sunset, Coffee, Disc3 } from 'lucide-react';

interface TimeMoment {
  time: string;
  period: string;
  headline: string;
  subline: string;
  musicTrack: string;
  drinkRecommendation: string;
  ambientLight: string;
  bgColor: string;
  accentText: string;
  description: string;
}

const MOMENTS: TimeMoment[] = [
  {
    time: '08:00 AM',
    period: 'SLOW MORNING',
    headline: 'THE SUNLIGHT HITS THE STONE.',
    subline: 'Fresh grounds, cool morning breeze, quiet reading.',
    musicTrack: 'Bill Evans — Waltz for Debby (1961)',
    drinkRecommendation: 'Ethiopian Pour Over + Fresh Warm Croissant',
    ambientLight: 'Filtered pale dawn, long shadows',
    bgColor: 'from-[#141312] via-[#0f0e0d] to-[#080808]',
    accentText: 'text-[#e8ded1]',
    description: 'The front iron gate unlocks with a quiet click. The roastery grinder whirs to life. Surat awakens slowly outside while the kettle boils at 93.5°C.',
  },
  {
    time: '01:30 PM',
    period: 'MIDDAY WORK MODE',
    headline: 'LAPTOP CLICKS & TONIC FIZZ.',
    subline: 'Focused flow, natural espresso energy, steady focus.',
    musicTrack: 'Ryuichi Sakamoto — async (2017)',
    drinkRecommendation: 'Dirty Pistachio Espresso Tonic',
    ambientLight: 'Overhead skylight natural diffusion',
    bgColor: 'from-[#171513] via-[#100e0c] to-[#080808]',
    accentText: 'text-[#dfa86a]',
    description: 'Designers, writers, and local architects gather at the long shared oak table. The hiss of the steam wand punctuation for creative work.',
  },
  {
    time: '06:42 PM',
    period: 'GOLDEN HOUR',
    headline: 'THE LIGHT CHANGES.',
    subline: 'The music gets louder. The coffee gets darker.',
    musicTrack: 'Miles Davis — In a Silent Way (1969)',
    drinkRecommendation: 'Double Cortado with Smoked Raw Honey',
    ambientLight: 'Deep honey amber sun flare across concrete',
    bgColor: 'from-[#2b170e] via-[#160c07] to-[#080808]',
    accentText: 'text-[#f59e0b]',
    description: 'The golden hour angle cuts straight through the rain-streaked facade. The conversation shifts from work to life. Glasses clink with single-estate cold brews.',
  },
  {
    time: '09:15 PM',
    period: 'COFFEE & CONVERSATIONS',
    headline: 'SHADOWS STRETCH ACROSS THE FLOOR.',
    subline: 'Low amber glow, warm whispers, decadent dark roasts.',
    musicTrack: 'Chet Baker — Almost Blue (1987)',
    drinkRecommendation: 'Midnight Latte & Burnt Basque Cheesecake',
    ambientLight: 'Intimate candle reflections & low brass pendants',
    bgColor: 'from-[#1c110b] via-[#0f0a06] to-[#080808]',
    accentText: 'text-[#c99a6b]',
    description: 'No bright overhead lamps. Just the soft glow of table candles and the warm hum of the vacuum tube amplifier in the listening corner.',
  },
  {
    time: '11:47 PM',
    period: 'ONE LAST CUP',
    headline: 'THE RAIN SETTLES OUTSIDE.',
    subline: 'One final pour before the city goes to sleep.',
    musicTrack: 'Nils Frahm — All Melody (2018)',
    drinkRecommendation: 'Warm Cardamom Infused Decaf Pour',
    ambientLight: 'Streetlamp amber through wet glass',
    bgColor: 'from-[#100d0c] via-[#090706] to-[#060505]',
    accentText: 'text-[#a39789]',
    description: 'The last side of the vinyl record finishes its spin. Wet asphalt shines under the streetlamps outside. The door remains open until the last guest departs.',
  },
];

export const AtmosphereTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(2); // Start at 06:42 PM (the iconic moment in prompt)
  const moment = MOMENTS[activeIdx];

  return (
    <section
      id="atmosphere"
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#080808] text-[#f2ede4] overflow-hidden border-t border-white/5 transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-3">
              <span className="w-6 h-[1px] bg-[#c99a6b]" />
              <span>CHAPTER 06</span>
              <span className="text-white/20">·</span>
              <span>TIME-BASED ATMOSPHERE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
              FROM DAWN
              <br />
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
                till late.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans-clean text-[#9a9186] max-w-sm">
            A café is not a static room—it is an organism that breathes with the clock. Select a moment in time to shift the sanctuary’s pulse.
          </p>
        </div>

        {/* Time Selector Track */}
        <div className="flex items-center gap-2 p-2 bg-[#12100e] border border-white/10 rounded-2xl mb-12 overflow-x-auto">
          {MOMENTS.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.time}
                onClick={() => setActiveIdx(idx)}
                data-cursor="TIME"
                className={`flex-1 min-w-[130px] p-3.5 rounded-xl text-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#f2ede4] text-[#080808] font-bold shadow-lg shadow-black/40 scale-[1.02]'
                    : 'text-[#8a8075] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1 font-mono text-xs tabular-nums">
                  <Clock className="w-3 h-3" />
                  <span>{m.time}</span>
                </div>
                <span className="block text-[10px] tracking-wider uppercase truncate">
                  {m.period}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Atmospheric Board */}
        <div
          className={`relative rounded-3xl p-8 sm:p-14 lg:p-20 border border-white/10 bg-gradient-to-b ${moment.bgColor} transition-all duration-1000 shadow-2xl overflow-hidden`}
        >
          {/* Subtle Warm Light Halo */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c99a6b]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-10">
            {/* Time Stamp & Period Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl sm:text-5xl font-extrabold text-[#faf8f5] tabular-nums tracking-tighter">
                  {moment.time}
                </span>
                <span className="text-white/20">/</span>
                <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#c99a6b]">
                  {moment.period}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8a8075] uppercase">
                {activeIdx === 0 && <Sun className="w-4 h-4 text-[#dfa86a]" />}
                {activeIdx === 1 && <Sun className="w-4 h-4 text-[#faf8f5]" />}
                {activeIdx === 2 && <Sunset className="w-4 h-4 text-[#f59e0b]" />}
                {activeIdx >= 3 && <Moon className="w-4 h-4 text-[#c99a6b]" />}
                <span>{moment.ambientLight}</span>
              </div>
            </div>

            {/* Huge Poetic Statement */}
            <div className="space-y-4">
              <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#faf8f5] tracking-tight leading-[0.95]">
                {moment.headline}
              </h3>
              <p className="font-serif-editorial text-2xl sm:text-3xl text-[#dfa86a] italic font-normal">
                "{moment.subline}"
              </p>
            </div>

            <p className="text-base sm:text-lg font-sans-clean text-[#beb3a5] leading-relaxed max-w-2xl">
              {moment.description}
            </p>

            {/* Now Playing & Recommendation Pod */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c99a6b]/20 border border-[#c99a6b]/40 flex items-center justify-center shrink-0">
                  <Disc3 className="w-6 h-6 text-[#c99a6b] animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8a8075] block">
                    ON THE TURNTABLE
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#f2ede4] block truncate">
                    {moment.musicTrack}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#dfa86a]/20 border border-[#dfa86a]/40 flex items-center justify-center shrink-0">
                  <Coffee className="w-6 h-6 text-[#dfa86a]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8a8075] block">
                    RECOMMENDED CUP
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#f2ede4] block truncate">
                    {moment.drinkRecommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

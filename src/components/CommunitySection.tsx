import React from 'react';
import { Heart, MessageSquare, Music, Users } from 'lucide-react';

interface LifestyleMoment {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  tag: string;
}

const MOMENTS: LifestyleMoment[] = [
  {
    id: 'm1',
    title: 'THE SUNDAY SESSIONS',
    subtitle: 'VINYL & POUR-OVERS',
    quote: 'We spent four hours here talking about Japanese typography without checking our phones once.',
    author: 'Aarav & Priya — Architects, Surat',
    tag: 'CONVERSATIONS',
  },
  {
    id: 'm2',
    title: 'MIDNIGHT WRITING TABLE',
    subtitle: 'RAIN ON GLASS & INTENSE FOCUS',
    quote: 'The cortado is dialed in with perfection, and the staff leaves you in quiet peace when you’re deep in flow.',
    author: 'Kavya S. — Screenwriter',
    tag: 'SLOW FOCUS',
  },
  {
    id: 'm3',
    title: 'THE ANALOG LISTENING CLUB',
    subtitle: 'MONTHLY VINYL RELEASES',
    quote: 'Sitting by the Tannoy speakers hearing Kind of Blue on original pressing while drinking an anaerobic pour-over is transcendent.',
    author: 'Devang M. — Record Collector',
    tag: 'AUDIO COMMUNITY',
  },
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#090807] text-[#f2ede4] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-3">
              <span className="w-6 h-[1px] bg-[#c99a6b]" />
              <span>CHAPTER 07</span>
              <span className="text-white/20">·</span>
              <span>THE COMMUNITY</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
              PEOPLE
              <br />
              MAKE
              <br />
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
                the place.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans-clean text-[#9a9186] max-w-sm">
            Coffee is merely the excuse. The real substance is the serendipity of human voices murmuring against warm wood and rain.
          </p>
        </div>

        {/* 3 Lifestyle Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOMENTS.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141210] to-[#0c0b09] border border-white/10 hover:border-[#c99a6b]/50 transition-all duration-300 flex flex-col justify-between group space-y-8"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8a8075] uppercase tracking-wider mb-6">
                  <span>0{idx + 1}</span>
                  <span className="text-[#c99a6b]">{item.tag}</span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-[#faf8f5] mb-1">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono text-[#8a8075] tracking-widest uppercase block mb-6">
                  {item.subtitle}
                </span>

                <p className="font-serif-editorial italic text-xl text-[#d8d0c5] leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#a39789]">
                <span>{item.author}</span>
                <Heart className="w-3.5 h-3.5 text-[#c99a6b]" />
              </div>
            </div>
          ))}
        </div>

        {/* Audio & Community stats ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center font-mono">
          <div>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#faf8f5] block tabular-nums">
              850+
            </span>
            <span className="text-[10px] text-[#8a8075] uppercase tracking-widest">
              CURATED VINYL TITLES
            </span>
          </div>
          <div>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#c99a6b] block tabular-nums">
              1,450m
            </span>
            <span className="text-[10px] text-[#8a8075] uppercase tracking-widest">
              AVERAGE BEAN ELEVATION
            </span>
          </div>
          <div>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#faf8f5] block tabular-nums">
              16:00
            </span>
            <span className="text-[10px] text-[#8a8075] uppercase tracking-widest">
              DAILY OPERATING HOURS
            </span>
          </div>
          <div>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#c99a6b] block tabular-nums">
              0%
            </span>
            <span className="text-[10px] text-[#8a8075] uppercase tracking-widest">
              ARTIFICIAL FLAVORS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

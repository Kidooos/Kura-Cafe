import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, Sparkles } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('Today');
  const [timeSlot, setTimeSlot] = useState('19:00 (Vinyl Evening)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [seatingZone, setSeatingZone] = useState('The Listening Room');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [resCode, setResCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'KUR-' + Math.floor(1000 + Math.random() * 9000);
    setResCode(code);
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-[#2B211C]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#FFFDF8] border border-[#D8C3A5] p-5 sm:p-8 md:p-10 text-[#211A16] shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full border border-[#D8C3A5] hover:border-[#2B211C] text-[#6F4E37] hover:text-[#2B211C] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isConfirmed ? (
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-[#B8794A] uppercase tracking-[0.25em] block mb-1.5 sm:mb-2 font-medium">
              A TABLE IS WAITING · VESU ATELIER
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#2B211C] mb-1.5 sm:mb-2 tracking-tight">
              RESERVE YOUR HOUR
            </h3>

            <p className="font-sans text-xs text-[#6F4E37] mb-6 sm:mb-8 leading-relaxed">
              We hold reserved tables for twenty minutes. Cold water carafe and fresh tasting notes await your arrival.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Guests */}
              <div>
                <label className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6F4E37] block mb-2 flex items-center gap-2 font-medium">
                  <Users className="w-3.5 h-3.5 text-[#B8794A]" />
                  <span>NUMBER OF GUESTS</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3-4', '5+'].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuests(count)}
                      className={`py-2.5 sm:py-3 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer ${
                        guests === count
                          ? 'bg-[#2B211C] text-[#FFFDF8] border-[#2B211C] shadow-sm'
                          : 'bg-[#F3EDE3] border-[#D8C3A5] text-[#211A16] hover:border-[#B8794A]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Zone Preference */}
              <div>
                <label className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6F4E37] block mb-2 flex items-center gap-2 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8794A]" />
                  <span>PREFERRED SEATING ATMOSPHERE</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { title: 'The Listening Room', sub: 'Turntable & analog vinyl' },
                    { title: 'The Concrete Bar', sub: 'Barista counter interaction' },
                    { title: 'The Rain Window', sub: 'Low bench facing glass' },
                    { title: 'Courtyard Alley', sub: 'Open air under banyan tree' },
                  ].map((zone) => (
                    <button
                      key={zone.title}
                      type="button"
                      onClick={() => setSeatingZone(zone.title)}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        seatingZone === zone.title
                          ? 'bg-[#F3EDE3] border-2 border-[#B8794A] text-[#2B211C] shadow-xs'
                          : 'bg-[#FFFDF8] border border-[#D8C3A5] text-[#6F4E37] hover:border-[#B8794A]'
                      }`}
                    >
                      <span className="font-display text-xs font-bold uppercase block text-[#2B211C]">
                        {zone.title}
                      </span>
                      <span className="text-[11px] font-sans text-[#6F4E37]">
                        {zone.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6F4E37] block mb-1.5 sm:mb-2 flex items-center gap-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#B8794A]" />
                    <span>DATE</span>
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl bg-[#F3EDE3] border border-[#D8C3A5] text-xs font-mono text-[#211A16] focus:outline-hidden focus:border-[#B8794A] cursor-pointer"
                  >
                    <option value="Today">Today (Evening)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Friday">Friday (Vinyl Session)</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6F4E37] block mb-1.5 sm:mb-2 flex items-center gap-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#B8794A]" />
                    <span>TIME SLOT</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl bg-[#F3EDE3] border border-[#D8C3A5] text-xs font-mono text-[#211A16] focus:outline-hidden focus:border-[#B8794A] cursor-pointer"
                  >
                    <option value="08:30 (Morning Pour)">08:30 — Morning Pour</option>
                    <option value="11:30 (Midday Brew)">11:30 — Midday Brew</option>
                    <option value="16:00 (Golden Hour)">16:00 — Golden Hour</option>
                    <option value="19:00 (Vinyl Evening)">19:00 — Vinyl Evening</option>
                    <option value="21:30 (Late Night)">21:30 — Late Night</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6F4E37] block mb-1.5 sm:mb-2 font-medium">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Mehta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl bg-[#F3EDE3] border border-[#D8C3A5] text-xs text-[#211A16] focus:outline-hidden focus:border-[#B8794A] focus:bg-[#FFFDF8] placeholder:text-[#6F4E37]/40"
                  />
                </div>
                <div>
                  <label className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6F4E37] block mb-1.5 sm:mb-2 font-medium">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl bg-[#F3EDE3] border border-[#D8C3A5] text-xs text-[#211A16] focus:outline-hidden focus:border-[#B8794A] focus:bg-[#FFFDF8] placeholder:text-[#6F4E37]/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-editorial group relative w-full py-3.5 sm:py-4 bg-[#2B211C] hover:bg-[#3E2B21] text-[#FFFDF8] border border-[#B8794A]/40 hover:border-[#B8794A] text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 shadow-xl hover:shadow-[0_0_28px_rgba(184,121,74,0.4)] mt-3 sm:mt-4 cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>CONFIRM RESERVATION</span>
                  <span className="text-[#B8794A] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8794A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success */
          <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-6">
            <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full bg-[#B8794A]/15 border border-[#B8794A] flex items-center justify-center text-[#B8794A]">
              <Check className="w-7 sm:w-8 h-7 sm:h-8" />
            </div>

            <div>
              <span className="font-mono text-[10px] sm:text-xs text-[#B8794A] tracking-widest uppercase block mb-1 font-medium">
                SEAT HELD IN SANCTUARY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#2B211C]">
                WE ARE EXPECTING YOU
              </h3>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#F3EDE3] border border-[#D8C3A5] text-left font-mono text-[11px] sm:text-xs space-y-2.5 sm:space-y-3 text-[#6F4E37]">
              <div className="flex justify-between border-b border-[#D8C3A5]/50 pb-2">
                <span className="uppercase text-[#6F4E37]">RESERVATION REFERENCE</span>
                <span className="text-[#2B211C] font-bold">{resCode}</span>
              </div>
              <div className="flex justify-between">
                <span>GUEST</span>
                <span className="text-[#2B211C] font-semibold">{name} ({guests} Guests)</span>
              </div>
              <div className="flex justify-between">
                <span>TIME &amp; DATE</span>
                <span className="text-[#2B211C]">{date} · {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>SEATING</span>
                <span className="text-[#B8794A] font-semibold">{seatingZone}</span>
              </div>
            </div>

            <p className="font-serif-editorial text-lg sm:text-xl italic text-[#6F4E37]">
              "A warm cup will be ready as you step in from the rain."
            </p>

            <button
              onClick={handleReset}
              className="btn-editorial group relative px-8 py-3 bg-[#2B211C] hover:bg-[#3E2B21] text-[#FFFDF8] border border-[#B8794A]/40 hover:border-[#B8794A] font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,121,74,0.35)] cursor-pointer"
            >
              <span className="relative z-10">CLOSE</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

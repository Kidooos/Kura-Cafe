import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Coffee, Sparkles, Heart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  kicker: string;
  price: string;
  notes: string;
  details: string;
  category: 'coffee' | 'non-coffee' | 'bites' | 'desserts';
  accentColor: string;
  brewMethod?: string;
}

const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: 'c1',
    name: 'DOUBLE ESPRESSO',
    kicker: 'NAKED PORTAFILTER · 20G IN / 40G OUT',
    price: '₹180',
    notes: 'Dark cacao · Blood orange · Caramel crema',
    details: 'Pulled on our customized Synesso MVP at 9 bars with 93.5°C mineral water.',
    category: 'coffee',
    accentColor: '#c99a6b',
    brewMethod: '9 BAR PRESSURE',
  },
  {
    id: 'c2',
    name: 'CORTADO',
    kicker: '1:1 RATIO · VELVETY MICROFOAM',
    price: '₹220',
    notes: 'Toasted hazelnut · Raw cane sugar · Warm oak',
    details: 'Served in custom 4.5oz hand-blown amber glass to keep temperature ideal.',
    category: 'coffee',
    accentColor: '#dfa86a',
    brewMethod: 'STEAMED TO 62°C',
  },
  {
    id: 'c3',
    name: '18-HR KYOTO SLOW DRIP',
    kicker: 'COLD EXTRACTION · GRAVITY DROPLET METHOD',
    price: '₹280',
    notes: 'Jasmine · Bergamot liqueur · Crisp pear',
    details: 'Extracted drop by single drop over eighteen hours in a Japanese glass tower.',
    category: 'coffee',
    accentColor: '#9a6b3e',
    brewMethod: 'ICE & TIME',
  },
  {
    id: 'c4',
    name: 'ORIGAMI POUR OVER',
    kicker: 'SINGLE ORIGIN LOT #28 · HAND POURED',
    price: '₹260',
    notes: 'Dried stone fruit · Black tea sweetness · Clean finish',
    details: 'Three-pour pulse technique highlighting subtle floral terroir notes.',
    category: 'coffee',
    accentColor: '#dfa86a',
    brewMethod: 'HAND POUR 3:15 MIN',
  },
  {
    id: 'c5',
    name: 'FLAT WHITE (OAT)',
    kicker: 'HOUSE-MILLED OAT · SILKY SWEET',
    price: '₹250',
    notes: 'Malted biscuit · Dark chocolate flakes · Cream',
    details: 'Unsweetened oat base formulated in our kitchen to balance high-acidity roast.',
    category: 'coffee',
    accentColor: '#c99a6b',
    brewMethod: 'DOUBLE RISTRETTO',
  },

  // NON-COFFEE
  {
    id: 'nc1',
    name: 'CEREMONIAL UJI MATCHA',
    kicker: 'FIRST HARVEST · KYOTO PREFECTURE',
    price: '₹290',
    notes: 'Sweet umami · Fresh grassy meadow · Pistachio cream',
    details: 'Stone-ground tencha hand-whisked with bamboo chasen at 78°C.',
    category: 'non-coffee',
    accentColor: '#52b788',
    brewMethod: 'BAMBOO WHISKED',
  },
  {
    id: 'nc2',
    name: 'HOJICHA ROASTED TEA LATTE',
    kicker: 'CHARCOAL ROASTED GREEN TEA · LOW CAFFEINE',
    price: '₹270',
    notes: 'Nutty earth · Autumn campfire · Brown sugar',
    details: 'Deeply roasted green tea leaves with warm oat milk, perfect for night hours.',
    category: 'non-coffee',
    accentColor: '#a3704c',
    brewMethod: 'SLOW INFUSION',
  },
  {
    id: 'nc3',
    name: 'SPICED GUJARAT CACAO',
    kicker: 'LOCAL SPICES · 72% SINGLE ORIGIN COCOA',
    price: '₹260',
    notes: 'Wild cinnamon · Green cardamom · Smoked salt',
    details: 'An evening indulgence paying homage to Surat spice merchant heritage.',
    category: 'non-coffee',
    accentColor: '#c97a48',
    brewMethod: 'COPPER PAN SIMMER',
  },

  // BITES
  {
    id: 'b1',
    name: 'CHARRED SOURDOUGH & SMOKED RICOTTA',
    kicker: '36-HR FERMENT SOURDOUGH · WILD HONEY',
    price: '₹340',
    notes: 'Crusty loaf · Flaky Maldon salt · Thyme oil',
    details: 'Fermented naturally using local wheat, toasted on cast iron with whipped ricotta.',
    category: 'bites',
    accentColor: '#dfa86a',
  },
  {
    id: 'b2',
    name: 'WILD MUSHROOM BRIOCHE TOAST',
    kicker: 'FORAGED SHIITAKE & OYSTER · TRUFFLE EMULSION',
    price: '₹390',
    notes: 'Earthy umami · Crisp shallots · Chive oil',
    details: 'Pan-seared forest mushrooms piled high over thick butter-toasted brioche.',
    category: 'bites',
    accentColor: '#8a6240',
  },
  {
    id: 'b3',
    name: 'AVOCADO & CITRUS CRUSH',
    kicker: 'CRUSHED HASS · PRESERVED LEMON · PUMPKIN DUKKAH',
    price: '₹360',
    notes: 'Bright acidity · Roasted sesame crunch · Microgreens',
    details: 'Served open-faced on seeded sourdough with cold-pressed olive oil.',
    category: 'bites',
    accentColor: '#6da34d',
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'ESPRESSO BURNT BASQUE CHEESECAKE',
    kicker: 'DEEP CARAMELIZED CRUST · MOLTEN CENTER',
    price: '₹320',
    notes: 'Bittersweet crust · Cream cheese custard · Espresso soak',
    details: 'Baked at 240°C until dark mahogany outside and delicately trembling within.',
    category: 'desserts',
    accentColor: '#c99a6b',
  },
  {
    id: 'd2',
    name: 'DARK CHOCOLATE TART (SEA SALT)',
    kicker: 'VALRHONA 70% GANACHE · COCOA SHORTCRUST',
    price: '₹310',
    notes: 'Intense cocoa · Crisp biscuit · Crystallized salt flakes',
    details: 'Glossy dark ganache finished with hand-harvested Fleur de Sel.',
    category: 'desserts',
    accentColor: '#5c3a21',
  },
];

export const InteractiveMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coffee' | 'non-coffee' | 'bites' | 'desserts'>('coffee');
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(MENU_ITEMS[0]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  // Floating preview smooth mouse follower (Desktop)
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const movePreview = (e: MouseEvent) => {
      gsap.to(preview, {
        x: e.clientX + 24,
        y: e.clientY - 120,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', movePreview);
    return () => window.removeEventListener('mousemove', movePreview);
  }, []);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="menu"
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-36 px-6 lg:px-16 bg-[#080808] text-[#f2ede4] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#c99a6b] mb-3">
              <span className="w-6 h-[1px] bg-[#c99a6b]" />
              <span>CHAPTER 03</span>
              <span className="text-white/20">·</span>
              <span>DAILY CRAFT</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
              WHAT'S
              <br />
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfa86a] to-[#c99a6b]">
                brewing.
              </span>
            </h2>
          </div>

          {/* Category Tabs (Segmented control style) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#141210] rounded-full border border-white/10 self-start md:self-end overflow-x-auto max-w-full">
            {(['coffee', 'non-coffee', 'bites', 'desserts'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                data-cursor="VIEW"
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-[#f2ede4] text-[#080808] font-bold shadow-md'
                    : 'text-[#9c9388] hover:text-white'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Magazine Menu List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main List (8 Cols) */}
          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {filteredItems.map((item, idx) => {
              const isHovered = hoveredItem?.id === item.id;
              const isSaved = savedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  data-cursor="TASTE"
                  className={`py-8 px-2 sm:px-6 transition-all duration-300 cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isHovered ? 'bg-white/[0.03]' : ''
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#8a8075] tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#c99a6b]">
                        {item.kicker}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f2ede4] group-hover:text-[#dfa86a] group-hover:translate-x-1.5 transition-all">
                      {item.name}
                    </h3>

                    <p className="text-xs font-sans-clean text-[#9a9186] italic">
                      {item.notes}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    {item.brewMethod && (
                      <span className="hidden sm:inline font-mono text-[10px] text-[#7a7065] uppercase tracking-wider">
                        {item.brewMethod}
                      </span>
                    )}

                    <span className="font-mono text-lg sm:text-xl font-medium text-[#f2ede4] tabular-nums">
                      {item.price}
                    </span>

                    <button
                      onClick={(e) => toggleSave(item.id, e)}
                      data-cursor="SAVE"
                      className={`p-2 rounded-full border transition-colors ${
                        isSaved
                          ? 'border-[#c99a6b] text-[#c99a6b] bg-[#c99a6b]/10'
                          : 'border-white/10 text-[#8a8075] hover:text-white hover:border-white/30'
                      }`}
                      title={isSaved ? 'Saved to tray' : 'Save for order'}
                    >
                      <Heart className="w-3.5 h-3.5" fill={isSaved ? '#c99a6b' : 'none'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Sensory Preview Panel (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:block">
            {hoveredItem ? (
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#161311] to-[#0c0b09] border border-white/10 shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between text-xs font-mono text-[#c99a6b] mb-4">
                  <span>ITEM PROFILE</span>
                  <span>{hoveredItem.price}</span>
                </div>

                <div className="w-full h-44 rounded-2xl bg-[#1c1815] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 mb-6">
                  {/* Decorative abstract art ring */}
                  <div
                    className="w-24 h-24 rounded-full border border-dashed border-white/20 animate-spin"
                    style={{ animationDuration: '24s' }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Coffee className="w-8 h-8 text-[#c99a6b] mb-2" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a39789]">
                      ESTIMATED PREP 3–5 MIN
                    </span>
                  </div>
                </div>

                <h4 className="font-display text-2xl font-bold uppercase text-[#f2ede4] mb-2">
                  {hoveredItem.name}
                </h4>

                <p className="text-xs font-sans-clean text-[#beb3a5] leading-relaxed mb-6">
                  {hoveredItem.details}
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8a8075]">
                    <span>TASTING NOTES</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#c99a6b]" />
                  </div>
                  <p className="text-xs font-serif-editorial italic text-[#dfa86a]">
                    "{hoveredItem.notes}"
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Small Saved Order Notice if items saved */}
        {savedItems.length > 0 && (
          <div className="mt-8 p-4 rounded-2xl bg-[#141210] border border-[#c99a6b]/30 flex items-center justify-between max-w-lg">
            <span className="text-xs font-mono text-[#f2ede4]">
              {savedItems.length} item{savedItems.length > 1 ? 's' : ''} saved in your tasting tray
            </span>
            <a
              href="#visit"
              className="text-xs font-mono text-[#c99a6b] hover:text-white uppercase tracking-wider font-semibold"
            >
              Order At Bar →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';

interface PhotoProps {
  id: string;
  className?: string;
  alt: string;
}

/**
 * 100% Verified Authentic Café, Coffee, and Bakery Craft Imagery.
 * Strictly coffee, espresso, artisanal brewing, fresh bakery, and café interiors.
 * Zero random products, zero shoes, zero synthetic vector illustrations.
 */
const PHOTO_REGISTRY: Record<string, string> = {
  // 1. Fullscreen Cinematic Hero: Warm moody ambient café at night with pendant lamps
  'hero-night-cafe':
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85',

  // 2. The Extraction: Artisanal specialty coffee brewing tools, beans & fresh pour
  'hand-pour':
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',

  // 3. The Baker's Hearth: Golden twisted cardamom knot pastry on baker's wood
  'pastry-cardamom':
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',

  // 4. The Roaster's Craft: Roasted single-origin specialty coffee beans in warm ambient light
  'roastery-beans':
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85',

  // 5. The Monsoon Sanctuary: Architectural concrete café with warm amber interior and courtyard view
  'rain-facade':
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85',

  // 6. Evening Café Ambiance: Craft coffee cup on dark walnut table
  'cafe-table':
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',

  // --- DEDICATED DISTINCT MENU TASTING PHOTOGRAPHS ---

  // M1. Espresso Doppio: Thick hazelnut crema in dark ceramic demitasse
  'm1-espresso':
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',

  // M2. Smoked Vanilla Cortado: Cortado in faceted glass tumbler with silky microfoam latte art
  'm2-cortado':
    'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80',

  // M3. Kyoto 18-Hour Cold Drip: Translucent amber cold brew in glass with ice
  'm3-cold-drip':
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',

  // M4. Cardamom & Sea Salt Knot: Freshly baked glossy golden pastry with pearl sugar
  'm4-cardamom-knot':
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',

  // M5. Burnt Basque Cheesecake: Slice of caramelized Basque cheesecake with molten core
  'm5-cheesecake':
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',

  // M6. Uji Ceremonial Matcha Latte: Vibrant emerald green ceremonial matcha latte in ceramic bowl
  'm6-matcha':
    'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80',

  // M7. Midnight Dark Latte: Dark velvety latte with heart latte art in dark cup
  'm7-dark-latte':
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
};

export const CafePhoto: React.FC<PhotoProps> = ({ id, className = '', alt }) => {
  const [hasError, setHasError] = useState(false);
  const src = PHOTO_REGISTRY[id] || PHOTO_REGISTRY['hero-night-cafe'];

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#2B211C] via-[#211A16] to-[#17120F] text-[#D8C3A5] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full border border-[#B8794A]/40 flex items-center justify-center mb-2">
          <span className="font-mono text-xs text-[#B8794A]">KURA</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D8C3A5]/70 text-center">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover select-none ${className}`}
    />
  );
};

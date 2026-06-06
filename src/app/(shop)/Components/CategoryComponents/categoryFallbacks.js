'use client';

// Local fallback images matched by category name keywords
export const LOCAL_FALLBACKS = [
    { keywords: ['super', 'sport', 'supersport', 'track'], src: '/Category/SuperSport.webp', subtitle: 'Track & Street', accent: 'from-orange-600 to-red-600' },
    { keywords: ['cruiser', 'highway', 'classic', 'custom'], src: '/Category/Cruiser.webp', subtitle: 'Highway Dominance', accent: 'from-yellow-500 to-orange-600' },
    { keywords: ['off', 'road', 'dirt', 'enduro', 'trail'], src: '/Category/OffRoading.webp', subtitle: 'Dirt & Trail', accent: 'from-green-600 to-teal-600' },
    { keywords: ['touring', 'travel', 'long', 'endurance'], src: '/Category/SportTouring.webp', subtitle: 'Endurance & Speed', accent: 'from-blue-600 to-indigo-600' },
    { keywords: ['racing', 'slick', 'race', 'circuit'], src: '/Category/RacingSlicks.webp', subtitle: 'Pure Track Performance', accent: 'from-red-600 to-pink-600' },
    { keywords: ['dual', 'adventure', 'adv', 'any terrain'], src: '/Category/DualSport.webp', subtitle: 'Any Terrain', accent: 'from-purple-600 to-violet-700' },
];

export function getFallback(name = '') {
    const lower = name.toLowerCase();
    return LOCAL_FALLBACKS.find(f => f.keywords.some(k => lower.includes(k))) || LOCAL_FALLBACKS[0];
}

import {
  FiCompass,
  FiActivity,
  FiMap,
  FiWind,
  FiZap,
  FiDisc,
} from 'react-icons/fi';
import { TbMountain } from 'react-icons/tb';

const PRESETS = [
  { match: ['dual sport', 'dual-sport'], Icon: FiCompass, label: 'Dual Sport' },
  { match: ['racing slick', 'slick', 'racing'], Icon: FiActivity, label: 'Racing Slicks' },
  { match: ['sport touring', 'touring'], Icon: FiMap, label: 'Sport Touring' },
  { match: ['off-road', 'off road', 'offroad', 'motocross', 'enduro', 'trail', 'mx'], Icon: TbMountain, label: 'Off-Roading' },
  { match: ['cruiser', 'cruising'], Icon: FiWind, label: 'Cruiser' },
  { match: ['super sport', 'supersport', 'superbike', 'sport'], Icon: FiZap, label: 'Super Sport' },
];

const FALLBACK_ICON = FiDisc;


export function getCategoryPreset(name) {
  const raw = typeof name === 'string' ? name.trim() : '';
  const key = raw.toLowerCase();

  if (!key) return { Icon: FALLBACK_ICON, label: '' };

  const hit = PRESETS.find((preset) => preset.match.some((m) => key.includes(m)));

  return {
    Icon: hit ? hit.Icon : FALLBACK_ICON,
    label: raw || (hit ? hit.label : ''),
  };
}

export const CHIP_ICONS = PRESETS.reduce((acc, preset) => {
  acc[preset.label] = preset.Icon;
  return acc;
}, {});

export default getCategoryPreset;

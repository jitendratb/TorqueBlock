import React from 'react';

const STAT_CARD_CONFIG = {
  orange: {
    borderHover: 'hover:border-orange-500/30',
    shadowHover: 'hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)]',
    glow: 'bg-orange-500/10',
    iconWrapper: 'bg-orange-500/10 border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 group-hover:border-orange-500/40',
  },
  blue: {
    borderHover: 'hover:border-blue-500/30',
    shadowHover: 'hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]',
    glow: 'bg-blue-500/10',
    iconWrapper: 'bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40',
  },
  emerald: {
    borderHover: 'hover:border-emerald-500/30',
    shadowHover: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)]',
    glow: 'bg-emerald-500/10',
    iconWrapper: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40',
  },
  rose: {
    borderHover: 'hover:border-rose-500/30',
    shadowHover: 'hover:shadow-[0_8px_30px_rgba(244,63,94,0.08)]',
    glow: 'bg-rose-500/10',
    iconWrapper: 'bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20 group-hover:border-rose-500/40',
  },
};

export default function OrderStatCard({ label, value, icon: Icon, color = 'orange' }) {
  const theme = STAT_CARD_CONFIG[color] || STAT_CARD_CONFIG.orange;

  return (
    <div className={`group relative overflow-hidden bg-white/10 hover:bg-white/15 border border-white/5 ${theme.borderHover} rounded-2xl p-4 backdrop-blur-xl flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 shadow-lg ${theme.shadowHover}`}>
      <div className={`absolute -right-6 -bottom-6 w-20 h-20 ${theme.glow} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      <div className="space-y-1.5 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block group-hover:text-zinc-300 transition-colors">
          {label}
        </span>
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 tracking-tight">
          {value}
        </span>
      </div>
      <div>
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative z-10 ${theme.iconWrapper}`}>
          {Icon && <Icon className="text-lg" />}
        </div>
      </div>
    </div>
  );
}

export { OrderStatCard as StatCard };

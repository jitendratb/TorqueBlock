"use client";

import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

function TyreCard({ tyre }) {
  const router = useRouter();

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    router.push(`/tyres/${tyre?.identifier}`);
  };

  return (
    <div onClick={handleCardClick} className='group relative cursor-pointer min-w-[280px] md:min-w-[320px] w-full flex flex-col bg-zinc-950/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all duration-700 shadow-2xl hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] hover:-translate-y-2'>

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-colors duration-700 pointer-events-none z-0" />
      <div className='relative h-[240px] w-full overflow-hidden shrink-0'>
        <Image
          src={tyre?.hero?.heroImage || '/placeholder-tyre.jpg'}
          alt={tyre?.hero?.title || "Motorcycle Tyre"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className='object-cover transition-all duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 saturate-[0.2] group-hover:saturate-100 z-0'
        />

        <div className="absolute  inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />

        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-orange-500/80" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-orange-500/80" />
        </div>

        <div className="absolute left-6 top-6 z-20 flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 backdrop-blur-xl px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]" />
          <span className="text-orange-100 text-[9px] font-black tracking-[0.3em] uppercase">
            TB-SPEC
          </span>
        </div>
      </div>

      <div className='p-4  flex flex-col flex-grow justify-between gap-6 z-20 -mt-12'>

        <div className="space-y-3 relative">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-6 h-[2px] bg-orange-500 rounded-full"></span>
            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">Compound</span>
          </div>
          <h2 className='text-2xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2'>
            {tyre?.hero?.title}
          </h2>
        </div>

        <div className="flex flex-col gap-5 mt-auto">
          <div className="transform group-hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300">
            <button className={`
        relative overflow-hidden w-full py-2 lg:py-3 rounded-xl flex items-center justify-center font-semibold
        transition-all duration-300 ease-in-out
        bg-orange-500 text-white  hover:bg-orange-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:-translate-y-1 active:translate-y-0
        
      `} >Explore Tyres</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TyreCard;
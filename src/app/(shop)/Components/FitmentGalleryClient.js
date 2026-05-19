'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiZap } from 'react-icons/fi';

export default function FitmentGalleryClient({ tyre1Gallery, tyre2Gallery, tyre1Name, tyre2Name }) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderGallery = (gallery, name, color, activeIndex, setActiveIndex) => {
    if (!gallery || gallery.length === 0) return null;
    const N = gallery.length;

    return (
      <div key={name}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${color === 'orange' ? 'text-orange-400' : 'text-white'}`}>
          {name}
        </p>
        
        <div className="flex overflow-hidden rounded-xl w-full">
          {gallery.map((img, i) => {
            const isActive = activeIndex === i;
            let dynamicStyle = {};

            if (isMobileOrTablet) {
              if (N === 1) {
                dynamicStyle = { width: '100%' };
              } else if (activeIndex === null) {
                dynamicStyle = {
                  width: `calc(100% / ${N})`,
                };
              } else {
                dynamicStyle = {
                  width: isActive ? '40%' : `calc(60% / ${N - 1})`,
                };
              }
            }

            return (
              <div
                key={i}
                onClick={() => {
                  if (isMobileOrTablet) {
                    setActiveIndex(activeIndex === i ? null : i);
                  }
                }}
                style={dynamicStyle}
                className={`relative h-[280px] md:h-[360px] overflow-hidden bg-zinc-900 transition-[width] duration-500 ease-in-out cursor-pointer
                  ${isMobileOrTablet ? '' : 'w-[220px] hover:!w-[440px]'}
                  ${color === 'orange' ? 'border-r border-orange-500/20' : 'border-r border-white/20'} last:border-r-0`}
              >
                <Image
                  src={img}
                  alt={`${name} real world fitment ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <span className={`absolute bottom-2 left-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap
                  ${color === 'orange' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-white/20 text-white border border-white/30'}`}>
                  Shot {i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <FiZap className="text-orange-400" size={16} />
        <h2 className="text-lg font-black text-white uppercase tracking-widest">Real World Fitment</h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderGallery(tyre1Gallery, tyre1Name, 'orange', active1, setActive1)}
        {renderGallery(tyre2Gallery, tyre2Name, 'white', active2, setActive2)}
      </div>
    </div>
  );
}

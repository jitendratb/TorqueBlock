'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiZap, FiCamera } from 'react-icons/fi';

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

  const renderGallery = (gallery, name, theme, activeIndex, setActiveIndex) => {
    if (!gallery || gallery.length === 0) return null;
    const N = gallery.length;

    return (
      <div
        key={name}
        className={`rounded-2xl border bg-white/5 backdrop-blur-2xl p-5 transition-all duration-300 hover:bg-white/10 ${theme.border} flex flex-col justify-between`}
      >
        <div>
          {/* Header Box (Camera icon + stacked titles) */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconBg}`}>
              <FiCamera size={18} className={theme.iconColor} />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-[12px] md:text-base font-black uppercase bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent truncate drop-shadow-sm`}
                title={name}
              >
                {name}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
                REAL WORLD FITMENT GALLERY
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-4" />

          {/* Accordion Gallery */}
          <div className="flex overflow-hidden rounded-xl w-full border border-white/5">
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
                    width: isActive ? '50%' : `calc(50% / ${N - 1})`,
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
                  className={`relative h-[240px] md:h-[320px] overflow-hidden bg-zinc-900 transition-[width] duration-500 ease-in-out cursor-pointer
                    ${isMobileOrTablet ? '' : 'w-[220px] hover:!w-[440px]'}
                    border-r ${theme.itemBorder} last:border-r-0`}
                >
                  <Image
                    src={img?.url || img}
                    alt={`${name} real world fitment ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  <span className={`absolute bottom-2 left-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap ${theme.badge}`}>
                    Shot {i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderGallery(
          tyre1Gallery,
          tyre1Name,
          {
            border: "border-orange-500/15 hover:border-orange-500/30",
            iconBg: "bg-orange-500/10 border-orange-500/25",
            iconColor: "text-orange-500",
            titleGradient: "from-orange-400 to-orange-600",
            itemBorder: "border-orange-500/20",
            badge: "bg-orange-500/20 text-orange-300 border border-orange-500/30"
          },
          active1,
          setActive1
        )}
        {renderGallery(
          tyre2Gallery,
          tyre2Name,
          {
            border: "border-white/15 hover:border-white/30",
            iconBg: "bg-white/10 border-white/25",
            iconColor: "text-white",
            titleGradient: "from-white to-white",
            itemBorder: "border-white/20",
            badge: "bg-white/20 text-white border border-white/30"
          },
          active2,
          setActive2
        )}
      </div>
    </div>
  );
}

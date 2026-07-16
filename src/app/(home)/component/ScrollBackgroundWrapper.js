"use client";

import React, { useEffect, useState } from 'react';

export default function ScrollBackgroundWrapper({ children }) {
  const [bgClass, setBgClass] = useState('bg-black/10 light-mode');

  useEffect(() => {
    let ticking = false;
    const categoryEl = document.getElementById('trending-section');

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (categoryEl) {
            const rect = categoryEl.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.2) {
               setBgClass('bg-[#0B0F19] dark-mode');
            } else {
               setBgClass('bg-[#D9D9D9] light-mode');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-colors duration-1000 ease-in-out w-full ${bgClass}`}>
      {children}
    </div>
  );
}

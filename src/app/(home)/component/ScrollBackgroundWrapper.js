"use client";

import React, { useEffect, useState } from 'react';

export default function ScrollBackgroundWrapper({ children }) {
  const [bgClass, setBgClass] = useState('bg-black/10 light-mode');

  useEffect(() => {
    const handleScroll = () => {
      const categoryEl = document.getElementById('category-section');
      if (!categoryEl) return;
      
      const rect = categoryEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.2) {
         setBgClass('bg-[#0B0F19] dark-mode');
      } else {
         setBgClass('bg-[#D9D9D9] light-mode');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-colors duration-1000 ease-in-out w-full ${bgClass}`}>
      {children}
    </div>
  );
}

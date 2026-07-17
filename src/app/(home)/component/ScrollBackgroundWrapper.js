"use client";

import React, { useEffect, useState } from 'react';


function useScrollThreshold(elementId, thresholdFraction = 0.2) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;
    let targetElement = document.getElementById(elementId);

    const checkScroll = () => {
      if (!targetElement) {
        targetElement = document.getElementById(elementId);
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setIsPastThreshold(rect.top <= window.innerHeight * thresholdFraction);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    checkScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementId, thresholdFraction]);

  return isPastThreshold;
}

export default function ScrollBackgroundWrapper({ children }) {
  const isDark = useScrollThreshold('brand-section', 0.2);
  
  const bgClass = isDark 
    ? 'bg-[#0B0F19] dark-mode' 
    : 'bg-[#D9D9D9] light-mode';

  return (
    <div className={`transition-colors duration-1000 ease-in-out w-full ${bgClass}`}>
      {children}
    </div>
  );
}

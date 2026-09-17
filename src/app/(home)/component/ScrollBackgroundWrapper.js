"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollBackgroundWrapper({ children }) {
  const [isDark, setIsDark] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-20% 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const bgClass = isDark
    ? 'bg-[#0B0F19] dark-mode'
    : 'bg-[#D9D9D9] light-mode';

  return (
    <div className={`transition-colors duration-500 ease-in-out w-full ${bgClass}`}>
      <div ref={sentinelRef} aria-hidden="true" />
      {children}
    </div>
  );
}

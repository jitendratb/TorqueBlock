"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';

export default function OrderTabs({
  tabs = [],
  activeTab,
  onChangeTab,
  className = '',
}) {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const [isReady, setIsReady] = useState(false);
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  const updateIndicator = useCallback(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        top: currentTab.offsetTop,
        width: currentTab.offsetWidth,
        height: currentTab.offsetHeight,
        opacity: 1,
      });
      if (!isReady) {
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      }
    }
  }, [activeTab, isReady]);

  useEffect(() => {
    updateIndicator();
    const frameId = requestAnimationFrame(() => {
      updateIndicator();
    });
    return () => cancelAnimationFrame(frameId);
  }, [updateIndicator, tabs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateIndicator();
      });
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div ref={containerRef} className={`relative flex flex-1 overflow-x-auto gap-1.5 w-full md:w-auto p-1 ${className}`}>
      <span
        className={`absolute rounded-xl bg-white/15 border border-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.08)] pointer-events-none ${isReady ? 'transition-all duration-300 ease-out' : 'transition-opacity duration-200'
          }`}
        style={{
          left: `${indicatorStyle.left}px`,
          top: `${indicatorStyle.top}px`,
          width: `${indicatorStyle.width}px`,
          height: `${indicatorStyle.height}px`,
          opacity: indicatorStyle.opacity,
        }}
        aria-hidden="true"
      />

      {tabs?.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            onClick={() => {
              if (onChangeTab) onChangeTab(tab.id);
              tabRefs.current[tab.id]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
              });
            }}
            className={`relative min-w-[170px] z-10 px-4 min-w-28 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors duration-200 cursor-pointer select-none flex items-center justify-center gap-2 border border-transparent ${isActive
              ? 'text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
          >
            <span>{tab.label}</span>
            {tab.value !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[9px] font-black transition-colors duration-200 ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-500'
                  }`}
              >
                {tab.value}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

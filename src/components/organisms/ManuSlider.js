"use client";

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Slider from './Slider';
import { IoHomeOutline, IoDiscOutline, IoSpeedometerOutline, IoGitCompareOutline, IoReceiptOutline, IoChevronForwardOutline, IoLogInOutline, IoLogOutOutline, IoTrendingUpOutline } from 'react-icons/io5';
import useAuthStore from '@/stores/authStore';

export default function ManuSlider({ isOpen = false, setIsLoginOpen, onClose, whatsappNumber, whatsappMessage }) {
 
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  const handleTalkToExpert = useCallback((e) => {
    e.preventDefault();
    if (!whatsappNumber) return;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage || '')}`, "_blank");
  }, [whatsappNumber, whatsappMessage]);

  const headerTitle = (
    <div className="relative h-10 w-20">
      <Image
        src="/newlogo.webp"
        alt="Torque Block Logo"
        fill
        sizes="112px"
        className="object-contain"
        priority
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-2 w-full pt-1">
      {isAuthenticated ? (
        <button
          onClick={() => { logout(); onClose(); }}
          className="w-full py-3 rounded-xl bg-white/5 text-slate-100 text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-orange-400/50 hover:text-orange-400"
        >
          <IoLogOutOutline className="text-sm" />
          Logout
        </button>
      ):(
          <button
        onClick={() => { setIsLoginOpen(true); onClose(); }}
        className="w-full py-3 rounded-xl bg-white/5 text-slate-100 text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-orange-400/50 hover:text-orange-400"
      >
        <IoLogInOutline className="text-sm" />
        Login
      </button>
      )}
    
      <button
        onClick={handleTalkToExpert}
        className="w-full py-3 rounded-xl text-white text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]"
        style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
      >
        Talk to an Expert Free
      </button>
    </div>
  );

  const trendingTyres = [
    { label: "Scorpion Rally STR", href: "/tyres/pirelli-scorpion-rally-str" },
    { label: "Scorpion Trail III", href: "/tyres/pirelli-scorpion-trail-iii" },
    { label: "Michelin Road 6", href: "/tyres/michelin-road-6" },
    { label: "Anakee Adventure", href: "/tyres/michelin-anakee-adventure" },
    { label: "Tourance Next 2", href: "/tyres/metzeler-tourance-next-2" },
    { label: "Metzeler Cruisetec", href: "/tyres/metzeler-cruisetec" }
  ];

  return (
    <Slider
      isOpen={isOpen}
      onClose={onClose}
      title={headerTitle}
      footer={footerContent}
      size="sm"
      placement="right"
    >
      <div className="space-y-6 w-full py-1">

        {/* SECTION 1: CORE EXPLORATION */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[9px] font-black text-orange-500 tracking-widest uppercase">Core Exploration</span>
            <div className="flex-1 h-[1px] bg-white/[0.04]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={onClose}
              className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border transition-all duration-300 active:scale-95 ${pathname === '/'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-[inset_0_0_12px_rgba(249,115,22,0.05)]'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <IoHomeOutline className="text-lg" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
            </Link>

            <button
              onClick={() => { if(isAuthenticated){router.push('/orders'); onClose();}else{setIsLoginOpen(true); onClose();} }}
              className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border transition-all duration-300 active:scale-95 ${pathname === '/orders'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-[inset_0_0_12px_rgba(249,115,22,0.05)]'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <IoReceiptOutline className="text-lg" />
              <span className="text-[10px] font-bold uppercase tracking-wider">My Orders</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: CATALOGS */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[9px] font-black text-orange-500 tracking-widest uppercase">Catalogs</span>
            <div className="flex-1 h-[1px] bg-white/[0.04]" />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/trending"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 active:scale-95 ${pathname === '/trending'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <IoTrendingUpOutline className="text-lg text-orange-500/80" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Most Search Tyres</span>
              </div>
              <IoChevronForwardOutline className="text-xs text-zinc-500" />
            </Link>

            <Link
              href="/tyres"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 active:scale-95 ${pathname === '/tyres'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <IoDiscOutline className="text-lg text-orange-500/80" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Explore Tyres</span>
              </div>
              <IoChevronForwardOutline className="text-xs text-zinc-500" />
            </Link>

            <Link
              href="/bikes"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 active:scale-95 ${pathname === '/bikes'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <IoSpeedometerOutline className="text-lg text-orange-500/80" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Motorcycles</span>
              </div>
              <IoChevronForwardOutline className="text-xs text-zinc-500" />
            </Link>

            <Link
              href="/compare"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 active:scale-95 ${pathname === '/compare'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <IoGitCompareOutline className="text-lg text-orange-500/80" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Tyre Comparison</span>
              </div>
              <IoChevronForwardOutline className="text-xs text-zinc-500" />
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[9px] font-black text-orange-500 tracking-widest uppercase">Riders Choice</span>
            <div className="flex-1 h-[1px] bg-white/[0.04]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {trendingTyres.map((tyre) => {
              const isActive = pathname === tyre.href;
              return (
                <Link
                  key={tyre.label}
                  href={tyre.href}
                  onClick={onClose}
                  className={`flex items-center p-3 rounded-xl border text-[10px] font-semibold tracking-wide transition-all duration-300 active:scale-95 ${isActive
                    ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                >
                  <span className="truncate">{tyre.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>

    </Slider>
  );
}
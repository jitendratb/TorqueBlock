'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiCompass, FiShield, FiAlertTriangle } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center  relative px-6 py-8  overflow-hidden">
      
        {/* <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none animate-scanline" /> */}

      {/* <div className="absolute h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none select-none z-0" /> */}
      {/* <div className="absolute h-80 w-80 rounded-full bg-amber-500/[0.02] blur-[80px] pointer-events-none select-none z-0" /> */}

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-orange-500 select-none animate-pulse">
          <FiAlertTriangle className="animate-bounce" /> Warning: Connection Lost
        </div>

        {/* Dynamic Holographic "404" Header */}
        <div className="relative flex flex-col items-center">
          <h1 className="text-8xl sm:text-[12rem] font-black text-orange-500 outline-text text-transparent leading-none tracking-widest select-none animate-telemetry-glow">
            404
          </h1>
          <div className="absolute -bottom-2 font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.4em] select-none">
            [ STATUS: TRACTION_LOST_ERR ]
          </div>
        </div>

        {/* Lead Magnet Glassmorphic CTA Card */}
        <div className="w-full p-6 sm:p-8 rounded-[1.5rem] bg-white/[0.01] border border-white/5 shadow-2xl backdrop-blur-md relative space-y-6">
          
          {/* Diagnostic Corner Tech Accents */}
          <div className="absolute -inset-[1px] pointer-events-none select-none">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-orange-500/20 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500/20 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500/20 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-orange-500/20 rounded-br-sm" />
          </div>

          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              You've drifted off course
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left font-bold text-[8px] sm:text-[9px] text-zinc-400 uppercase tracking-widest select-none bg-zinc-950/40 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
              Fitment Sizing
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
              Direct Pricing
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
              Live Stock Check
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
              Expert Compounds
            </div>
          </div>

          {/* High-Conversion WhatsApp CTA Button */}
          <div className="pt-2">
            <WhatsAppButton 
              text="Chat with Fitment Specialist" 
              value="Hi Torque Block! I got lost on your website 404 page. I'm looking for the perfect tyres for my vehicle. Can you help me find the right fitment and warehouse stock?"
              className="w-full h-12"
            />
          </div>

          {/* Return Navigation */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
            >
              <FiArrowLeft size={12} /> Return to Pit Lane
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

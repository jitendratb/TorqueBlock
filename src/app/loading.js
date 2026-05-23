// app/loading.js
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a] overflow-hidden">
      {/* Self-contained styling for specialized HUD animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hud-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes laser-sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes telemetry-flicker {
          0%, 100% { opacity: 0.8; }
          45% { opacity: 0.8; }
          50% { opacity: 0.3; }
          55% { opacity: 0.9; }
          85% { opacity: 0.9; }
          90% { opacity: 0.2; }
        }
        @keyframes scanning-glow {
          0%, 100% { transform: translateY(-50px) scaleY(1); opacity: 0.1; }
          50% { transform: translateY(50px) scaleY(1.2); opacity: 0.3; }
        }
        .animate-reverse-spin {
          animation: hud-spin-reverse 12s linear infinite;
        }
        .animate-laser-sweep {
          animation: laser-sweep 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-telemetry-flicker {
          animation: telemetry-flicker 4s infinite;
        }
        .animate-scanning-glow {
          animation: scanning-glow 3s ease-in-out infinite;
        }
      `}} />

      {/* Holographic scanning laser line overlay */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none animate-scanning-glow" />

      {/* Deep Space Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,15,25,0.4)_0%,#030406_100%)] pointer-events-none" />

      <div className="relative flex items-center justify-center p-12">
        
        {/* Holographic Diagnostic Corner Brackets */}
        <div className="absolute -inset-4 pointer-events-none select-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500/30 rounded-tl-sm" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500/30 rounded-tr-sm" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500/30 rounded-bl-sm" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500/30 rounded-br-sm" />
        </div>

        {/* Ambient Neon Core Glows */}
        <div className="absolute h-80 w-80 rounded-full bg-orange-500/5 blur-[80px] animate-pulse" />
        <div className="absolute h-48 w-48 rounded-full bg-orange-600/5 blur-[50px] animate-bounce-slow" />

        {/* ================= TELEMETRY SIDE PANELS ================= */}
        {/* Left Telemetry Panel */}
        <div className="absolute right-32 flex flex-col items-end gap-1.5 font-mono text-[7px] md:text-[8px] tracking-widest text-zinc-500 select-none animate-telemetry-flicker hidden sm:flex">
          <div className="flex items-center gap-1.5">
            <span>TEMP</span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-orange-500 font-bold">84.2°C</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-80">
            <span>PRESS</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-white">36.5 PSI</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-60">
            <span>LOAD</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-zinc-400">450 KG</span>
          </div>
        </div>

        {/* Right Telemetry Panel */}
        <div className="absolute left-32 flex flex-col items-start gap-1.5 font-mono text-[7px] md:text-[8px] tracking-widest text-zinc-500 select-none animate-telemetry-flicker hidden sm:flex">
          <div className="flex items-center gap-1.5">
            <span className="text-orange-500 font-bold">99.8%</span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span>GRIP INDEX</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-80">
            <span className="text-white">920 NM</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>TORQUE SYNC</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="text-zinc-400">ACTIVE</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>FITMENT_V2</span>
          </div>
        </div>

        {/* ================= CORE HUB ASSEMBLY ================= */}
        <div className="relative h-28 w-28 flex items-center justify-center">
          
          {/* Outer Holographic Telemetry Rings */}
          <div className="absolute h-40 w-40 rounded-full border border-white/5 border-t-orange-500/20 border-b-orange-500/10 animate-spin-slow" />
          <div className="absolute h-36 w-36 rounded-full border border-dashed border-zinc-800/60 animate-reverse-spin" />

          {/* Static Carbon-Ceramic Brake Caliper */}
          <div className="absolute -top-1.5 right-1 w-[16px] h-10 bg-gradient-to-b from-orange-600 to-orange-500 rounded-r-[6px] rounded-l-[2px] border border-orange-400/20 rotate-[22deg] z-20 shadow-[0_0_15px_rgba(234,88,12,0.4)] flex items-center justify-center">
            <div className="w-[3px] h-7 bg-zinc-900/60 rounded-l-[1px] absolute left-0" />
            <div className="text-[5px] font-black text-white/90 uppercase tracking-widest -rotate-90 origin-center translate-x-[2px] select-none">
              TRQ
            </div>
          </div>

          {/* Spinning Wheel (Tyre + Alloy Rim) */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border-[10px] border-zinc-850 shadow-2xl z-10 flex items-center justify-center">
            
            {/* Tyre Grooves & Tread Depth Lines */}
            <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-zinc-700/40 opacity-70" />
            
            {/* Glowing Tyre Compound Ring */}
            <div className="absolute inset-[3px] rounded-full border border-orange-500/15" />
            <div className="absolute inset-[4px] rounded-full border border-zinc-950" />

            {/* Inner Forged Rim */}
            <div className="absolute inset-2.5 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
              
              {/* Premium Carbon Blade Split-Spokes */}
              <div className="absolute inset-0 rounded-full opacity-60">
                <div className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-500" />
                <div className="absolute left-1/2 top-1/2 h-full w-[2px] rotate-[72deg] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-500" />
                <div className="absolute left-1/2 top-1/2 h-full w-[2px] rotate-[144deg] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-500" />
                <div className="absolute left-1/2 top-1/2 h-full w-[2px] rotate-[216deg] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-500" />
                <div className="absolute left-1/2 top-1/2 h-full w-[2px] rotate-[288deg] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-500" />
              </div>

              {/* Center Lock Ring */}
              <div className="absolute w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-md z-30">
                {/* Forged Gold Nut */}
                <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 border border-orange-400/40 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= DYNAMIC RUNNING TELEMETRY TEXT ================= */}
        <div className="absolute -bottom-16 flex flex-col items-center gap-2.5 w-max">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] animate-pulse">
              System Loading
            </span>
            <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-[0.25em] animate-telemetry-flicker">
              Compound telemetry sync active
            </span>
          </div>

          {/* Sweeping Laser Loading Progress Bar */}
          <div className="w-36 h-[2px] bg-white/5 rounded-full overflow-hidden relative shadow-inner mt-0.5">
            <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-laser-sweep" />
          </div>
        </div>

      </div>
    </div>
  );
}
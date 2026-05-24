"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiRefreshCw, FiHome, FiActivity, FiChevronRight, FiChevronDown } from 'react-icons/fi';

export default function RootGlobalErrorBoundary({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Critical telemetry logging
    console.error("Critical Root Exception Caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen flex flex-col justify-center items-center py-20 px-4 relative font-[Inter,sans-serif] antialiased">
        {/* Futuristic digital background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

        {/* Outer card frame */}
        <div className="w-full max-w-2xl bg-zinc-950 border-2 border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 text-center shadow-[0_30px_120px_rgba(0,0,0,0.95)] relative overflow-hidden z-10 animate-fade-in">
          
          {/* Neon orange glowing badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-600/10 border border-red-500/25 text-red-500 text-[10px] md:text-xs font-black uppercase tracking-[0.45em] rounded-full mb-10 shadow-[0_8px_32px_rgba(220,38,38,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Root Telemetry Faulted
          </div>

          {/* Symmetrical warning icon container */}
          <div className="flex justify-center mb-8 animate-pulse">
            <div className="w-24 h-24 rounded-[2.2rem] bg-gradient-to-br from-red-600/20 to-red-950/5 flex items-center justify-center border border-red-500/20 shadow-2xl">
              <FiAlertTriangle className="text-red-500 w-12 h-12" />
            </div>
          </div>

          {/* Crash Header */}
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            CORE DISRUPTION <br />
            <span className="text-red-500 outline-text text-transparent">DETECTED</span>
          </h2>
          
          {/* Main Description */}
          <p className="text-zinc-500 text-sm md:text-base font-semibold max-w-md mx-auto mb-12 leading-relaxed">
            A critical thread interrupted the core application pipeline. The security protocols have safely isolated the context to secure your browser state.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-xl md:rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(220,38,38,0.3)] cursor-pointer"
            >
              <FiRefreshCw className="w-4 h-4 animate-spin-slow" />
              REBOOT APPLICATION
            </button>
            
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer"
            >
              <FiHome className="w-4 h-4" />
              MAIN DASHBOARD
            </Link>
          </div>

          {/* Expandable Technical Diagnostics Console */}
          <div className="border-t border-zinc-900/80 pt-8 text-left">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full px-5 py-3.5 bg-zinc-900/30 hover:bg-zinc-900/60 rounded-xl transition-all duration-300 text-zinc-500 hover:text-zinc-400 font-bold uppercase tracking-wider text-[10px] md:text-xs"
            >
              <span className="flex items-center gap-2">
                <FiActivity className="text-red-500/50" />
                Root Core Telemetry Logs
              </span>
              {showDetails ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
            </button>

            {showDetails && (
              <div className="mt-4 p-5 bg-black/60 border border-zinc-900 rounded-xl font-mono text-[11px] md:text-xs text-red-400 overflow-x-auto shadow-inner leading-relaxed select-text">
                <div className="flex items-center gap-2 mb-2 text-[9px] uppercase tracking-widest text-zinc-700 font-black border-b border-zinc-900 pb-2">
                  <span>Isolated Client Timestamp: {new Date().toISOString()}</span>
                </div>
                <p className="font-semibold text-red-500 mb-1">
                  CRITICAL_FAULT_MESSAGE: {error?.message || "Internal uncaught thread deadlock exception."}
                </p>
                {error?.digest && (
                  <p className="text-zinc-500">
                    CORE_DIGEST_HASH: {error.digest}
                  </p>
                )}
                <div className="mt-4 text-[9px] text-zinc-600 border-t border-zinc-900/60 pt-2 flex items-center justify-between">
                  <span>SEVERITY: APOCALYPTIC</span>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="underline hover:text-zinc-400 transition-colors uppercase cursor-pointer"
                  >
                    Force Cold Reload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

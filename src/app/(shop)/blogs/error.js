"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiRefreshCw, FiHome, FiActivity, FiChevronRight, FiChevronDown } from 'react-icons/fi';

export default function BlogsErrorBoundary({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Telemetry isolated crash caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-16 md:py-24 px-4 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-red-500/5 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden z-10 animate-fade-in">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />

        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] rounded-full mb-8 shadow-[0_8px_32px_rgba(239,68,68,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          System Interruption
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-to-br from-red-500/20 to-orange-500/5 flex items-center justify-center border border-red-500/20">
            <FiAlertTriangle className="text-red-500 w-10 h-10 md:w-12 md:h-12 animate-pulse" />
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
          EDITORIAL ENGINE <span className="text-red-500">DISRUPTION</span>
        </h2>
        
        <p className="text-zinc-500 text-sm md:text-base font-semibold max-w-md mx-auto mb-10 leading-relaxed">
          An anomaly occurred while accessing the editorial blog engine pipeline. The systems have isolated the fault to safeguard parameters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-xl md:rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(249,115,22,0.3)] cursor-pointer"
          >
            <FiRefreshCw className="w-4 h-4 animate-spin-slow" />
            REBOOT SYSTEM
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer"
          >
            <FiHome className="w-4 h-4" />
            HOME BASE
          </Link>
        </div>

        {/* Diagnostics block */}
        <div className="border-t border-zinc-900/60 pt-6 text-left">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/30 hover:bg-zinc-900/60 rounded-xl transition-all duration-300 text-zinc-600 hover:text-zinc-400 font-bold uppercase tracking-wider text-[10px] md:text-xs"
          >
            <span className="flex items-center gap-2">
              <FiActivity className="text-red-500/60" />
              Diagnostics Console Logs
            </span>
            {showDetails ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </button>

          {showDetails && (
            <div className="mt-4 p-5 bg-black/60 border border-zinc-900 rounded-xl font-mono text-[11px] md:text-xs text-red-400 overflow-x-auto shadow-inner leading-relaxed">
              <div className="flex items-center gap-2 mb-2 text-[9px] uppercase tracking-widest text-zinc-700 font-black border-b border-zinc-900 pb-2">
                <span>Timestamp: {new Date().toISOString()}</span>
              </div>
              <p className="font-semibold text-red-500 mb-1">
                ERROR_MESSAGE: {error?.message || "Internal telemetry thread failure."}
              </p>
              {error?.digest && <p className="text-zinc-500">DIGEST_HASH: {error.digest}</p>}
              <div className="mt-4 text-[9px] text-zinc-600 border-t border-zinc-900/60 pt-2 flex items-center justify-between">
                <span>CRITICALITY: ISOLATED</span>
                <button 
                  onClick={() => window.location.reload()} 
                  className="underline hover:text-zinc-400 transition-colors uppercase cursor-pointer"
                >
                  Force Hard Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

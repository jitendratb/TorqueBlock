"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { PageShellMain } from '@/app/(shop)/Components/PageShell';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShellMain>
      <div className="w-full flex  justify-center">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-red-500 drop-shadow-sm">
              Oops!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Something went wrong
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            An unexpected error occurred. We apologize for the inconvenience.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <button
              onClick={() => reset()}
              className="w-full sm:w-1/2 h-12 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all shadow-lg cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center justify-center w-full sm:w-1/2 h-12 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PageShellMain>
  );
}

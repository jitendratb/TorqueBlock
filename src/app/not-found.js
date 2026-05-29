'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import { PageShellMain } from './(shop)/Components/PageShell';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <PageShellMain>
      <div className="h-full w-full flex flex-col items-center justify-center min-h-[70vh] relative px-6 py-16">
        <div className="max-w-xl w-full text-center space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-8xl md:text-[9rem] font-black tracking-tighter bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Page Not Found
            </h2>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            <span className="block mt-4 text-orange-400 font-medium animate-pulse">
              Redirecting to home in {countdown} seconds...
            </span>
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <WhatsAppButton 
              text="Chat with Specialist" 
              value="I got lost on your website 404 page. I'm looking for the perfect tyres for my vehicle. Can you help me find the right fitment and warehouse stock?" 
              className="w-full sm:w-1/2 h-12 shadow-lg" 
            />

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

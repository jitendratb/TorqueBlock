'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiAward, FiShield, FiZap, FiActivity, FiCheckCircle } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';

function BrandsDetailsClient({ brand }) {
  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="text-zinc-500 text-sm">No brand details found.</div>
        <Link
          href="/brands"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-white uppercase tracking-wider hover:border-orange-500/50 transition-all"
        >
          <FiArrowLeft size={14} /> Back to Brands
        </Link>
      </div>
    );
  }

  const brandName = brand?.name || brand?.brandName || "Premium Partner";

  const getCleanTagline = () => {
    if (!brand?.brandKeyword) {
      return `Premium high-performance ${brandName} compounds.`;
    }

    let rawKeyword = brand.brandKeyword.trim().toLowerCase();

    const commonBrands = ['pirelli', 'michelin', 'bridgestone', 'metzeler', 'dunlop', 'continental', 'mrf', 'ceat', 'apollo', 'tvs'];
    commonBrands.forEach(b => {
      if (b !== brandName.toLowerCase() && rawKeyword.includes(b)) {
        rawKeyword = rawKeyword.replace(b, brandName.toLowerCase());
      }
    });

    if (rawKeyword.endsWith(' near me')) {
      const core = rawKeyword.replace(' near me', '');
      const capitalizedCore = core.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return `Find ${capitalizedCore} Near You`;
    }

    return rawKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const techSpecs = [
    {
      icon: <FiZap className="text-orange-500" size={20} />,
      title: "Performance Focus",
      value: "Street, Sport & Track",
      desc: "Compounds tailored for maximum cornering precision and acceleration."
    },
    {
      icon: <FiShield className="text-orange-500" size={20} />,
      title: "Safety Standard",
      value: "Elite Wet Grip",
      desc: "Award-winning tread designs engineered for absolute aquaplaning resistance."
    },
    {
      icon: <FiAward className="text-orange-500" size={20} />,
      title: "Official Guarantee",
      value: "Torque Certified Dealer",
      desc: "100% genuine products sourced directly from authorized manufacturer pipelines."
    },
    {
      icon: <FiActivity className="text-orange-500" size={20} />,
      title: "Tread Technology",
      value: "Multi-Compound Silica",
      desc: "Advanced rubber compounds designed for extended mileage and thermals."
    }
  ];

  return (
    <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">

      <section className="relative h-[250px] sm:h-[340px] md:h-[420px] w-full overflow-hidden rounded-[1rem] border border-white/5 shadow-2xl">
        {brand?.brandBanner ? (
          <Image
            src={brand.brandBanner}
            alt={`${brandName} Banner`}
            fill
            priority
            className="object-cover brightness-[0.9]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
            <div className="text-[120px] font-black text-white/[0.02] tracking-widest select-none uppercase">
              {brandName}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/10 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/40 via-transparent to-transparent z-10" />

        {/* Content Overlays */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Glass Logo Container */}
            {brand?.brandLogo ? (
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-center p-3">
                <Image
                  src={brand.brandLogo}
                  alt={`${brandName} Logo`}
                  width={96}
                  height={96}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ) : (
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-center text-4xl font-black text-orange-500 uppercase select-none">
                {brandName.substring(0, 2)}
              </div>
            )}

            {/* Title & Taglines */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em]">
                <FiCheckCircle size={10} className="animate-pulse" /> Certified Partner
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">
                {brandName}
              </h1>
              <p className="text-zinc-300 text-xs sm:text-sm font-semibold tracking-wide max-w-md">
                {getCleanTagline()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left Columns - Description & Engineering DNA */}
        <div className="lg:col-span-2 space-y-4">

          {/* Engineering Bio Card */}
          <div className="p-6 sm:p-8 rounded-[1rem] bg-white/[0.01] border border-white/5 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              Engineering DNA & Heritage
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We collaborate closely with {brandName} to deliver tyre technology that redefines the bounds of safety, road feel, and cornering stability. Sourced directly from authorized manufacturer channels, each set undergoes rigorous quality audits.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Whether you are carving mountain passes, tracking laps, or commuting on long road trips, {brandName} compounds provide elite-level durability, high heat dispersion, and predictable wet-road grip index when it matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techSpecs.map((spec, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-orange-500/20 transition-colors duration-300 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 flex-shrink-0">
                  {spec.icon}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">{spec.title}</h4>
                  <div className="text-sm font-bold text-white uppercase tracking-tight">{spec.value}</div>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="lg:col-span-1">
          <div className="p-6 sm:p-8 rounded-[1rem] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 shadow-2xl space-y-6 flex flex-col sticky top-24">

            <div className='flex gap-4'>
              <div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <FiShield size={24} />
                </div>
              </div>

              <div className="space-y-2 ">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider leading-tight">
                  Request Fitment & Sizing Quotes
                </h3>
               
              </div>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Looking for exclusive pricing or specific sizing catalogs for {brandName} compounds? Contact our certified specialist pipeline directly.
            </p>

            <ul className="space-y-3 font-medium text-[11px] text-zinc-400 tracking-wide uppercase select-none">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Direct Warehouse Pricing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Stock Availability
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Complimentary Fitment Review
              </li>
            </ul>

            {/* Direct Action WhatsApp Button */}
            <div className="pt-2">
              <WhatsAppButton
                text={`Request ${brandName} Quote`}
                value={`Hi Torque Block! I'm interested in premium tyres from ${brandName}. Can you check active deals and warehouse stock lists for my vehicle?`}
                className="w-full h-12"
              />
            </div>

            {/* Subtle disclaimer */}
            <p className="text-[10px] text-zinc-600 text-center leading-relaxed">
              We respond instantly to all fitment and direct sourcing inquiries. Secure pricing guaranteed.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BrandsDetailsClient;
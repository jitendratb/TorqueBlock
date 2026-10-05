'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiZap, FiCheckCircle, FiStar, FiInfo, FiLayers, } from 'react-icons/fi';
import { RiShieldCheckFill, RiThumbUpFill, RiCheckboxCircleFill, RiThumbDownFill, RiCloseCircleFill } from 'react-icons/ri';
import CustomImage from '@/components/molecules/CustomImage';
import RecommendedTyres from './RecommendedTyres';
import TyreSection from '../NewLaunchTyres';
import FAQSection from '@/components/atoms/FAQSection';

const ExpandableText = ({ text, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!text) return null;

  return (
    <div className="space-y-3">
      <div className={`text-zinc-400 text-sm leading-relaxed whitespace-pre-line ${!isExpanded ? 'line-clamp-4' : ''}`}>
        {text}
      </div>
      {text.length > 250 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: color }}
          className="text-xs font-bold hover:brightness-125 transition-all uppercase tracking-wider"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

function BrandsDetailsClient({ brand }) {
  const brandName = brand?.name || brand?.brandName || "Premium Partner";
  const primaryColor = brand?.featuredData?.primaryColor || '#f97316';
  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out] w-full max-w-[1400px] mx-auto">

      <section className="relative h-[300px] sm:h-[400px] md:h-[480px] w-auto overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
      
          <CustomImage
            src={brand.brandBanner}
            alt={`${brandName} Banner`}
            fill
            priority
            className="object-cover object-center"
          />

        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ background: `linear-gradient(to top right, ${primaryColor}, transparent)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />

        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-start p-6 md:p-8">
          {brand?.brandLogo ? (
            <div className="relative flex h-14 w-36 items-center justify-center sm:h-20 sm:w-72">
              <CustomImage
                src={brand.brandLogo}
                alt={`${brandName} Logo`}
                fill
                sizes="(max-width: 640px) 144px, 288px"
                imageClassName="object-contain object-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              />
            </div>
          ) : (
            <div
              className="flex h-20 w-20 select-none items-center justify-center rounded-3xl border border-white/10 bg-zinc-950 text-4xl font-black uppercase shadow-2xl sm:h-28 sm:w-28 sm:text-5xl"
              style={{ color: primaryColor }}
            >
              {brandName.substring(0, 2)}
            </div>
          )}

          <div className="flex items-center gap-3">
            <h1 className="text-sm md:text-lg lg:text-xl font-black tracking-tight text-white drop-shadow-md sm:text-2xl md:text-4xl">
              {brand?.focusKeyword || brandName}
            </h1>
          </div>

          {brand?.shortDescription && (
            <p className="max-w-2xl text-xs font-medium leading-relaxed text-zinc-300 drop-shadow-md sm:text-sm md:text-sm py-2">
              {brand.shortDescription}
            </p>
          )}

          {brand?.popularSeries?.length > 0 && (
            <div className="hidden md:flex flex-wrap items-center gap-2 pt-1">
              {brand.popularSeries.slice(0, 4).map((series, i) => (
                <span
                  key={i}
                  className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md sm:text-xs"
                  style={{ borderColor: `${primaryColor}66`, background: `${primaryColor}26` }}
                >
                  {series}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  sm:px-0 relative">

        <div className="lg:col-span-2 space-y-6">
          {brand?.description && (
            <div className="p-6 rounded-xl bg-white/10 border border-white/5 backdrop-blur-md shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${primaryColor}33, ${primaryColor}1A)`,
                    boxShadow: `0 0 0 1px ${primaryColor}4D, 0 0 14px ${primaryColor}26`
                  }}
                >
                  <FiInfo size={18} style={{ color: primaryColor }} />
                </div>
                <div>
                  <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    About {brandName}
                  </h2>
                  <p className="text-zinc-500 text-[10px] mt-0.5">
                    Learn more about their legacy and mission
                  </p>
                </div>
              </div>
              <div className="space-y-5 ">
                {brand?.description && (
                  <ExpandableText text={brand.description} color={primaryColor} />
                )}
              </div>
            </div>
          )}

          {brand?.whyChooseBrand && (
            <div className="p-6 rounded-xl bg-white/10 border border-white/5 backdrop-blur-md shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${primaryColor}33, ${primaryColor}1A)`,
                    boxShadow: `0 0 0 1px ${primaryColor}4D, 0 0 14px ${primaryColor}26`
                  }}
                >
                  <FiStar size={18} style={{ color: primaryColor }} />
                </div>
                <div>
                  <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Why Choose {brandName}
                  </h2>
                  <p className="text-zinc-500 text-[10px] mt-0.5">
                    What makes their products stand out
                  </p>
                </div>
              </div>
              <ExpandableText text={brand.whyChooseBrand} color={primaryColor} />
            </div>
          )}

          {(brand?.pros?.length > 0 || brand?.cons?.length > 0) && (
            <section className="relative ">

              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${primaryColor}33, ${primaryColor}1A)`,
                    boxShadow: `0 0 0 1px ${primaryColor}4D, 0 0 14px ${primaryColor}26`
                  }}
                >
                  <RiShieldCheckFill style={{ color: primaryColor }} className="text-base" />
                </div>
                <div>
                  <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Brand Analysis
                  </h2>
                  <p className="text-zinc-500 text-[10px] mt-0.5">
                    Key strengths &amp; limitations of {brandName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">

                {brand?.pros?.length > 0 && (
                  <div className="group relative overflow-hidden rounded-2xl border border-zinc-700/60 bg-white/10 hover:bg-green-500/10 cursor-pointer transition-all duration-300 hover:border-green-500/40 hover:shadow-[0_4px_24px_rgba(16,185,129,0.10)]">

                    <div className="p-4 lg:p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/15 transition-all duration-300 group-hover:bg-green-500/25">
                          <RiThumbUpFill className="text-green-400 text-lg" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm leading-tight">
                            Advantages
                          </h3>
                          <p className="text-zinc-500 text-[10px] mt-0.5">
                            What riders love about this brand
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {brand.pros?.slice(0, 6).map((pro, index) => (
                          <li key={index} className="flex items-center gap-2.5 text-xs md:text-sm text-zinc-300 transition-colors duration-150 hover:text-white">
                            <RiCheckboxCircleFill className="mt-0.5 shrink-0 text-sm text-green-400" />
                            <span className="leading-relaxed">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {brand?.cons?.length > 0 && (
                  <div className="group relative overflow-hidden rounded-2xl border border-zinc-700/60 bg-white/10 hover:bg-red-500/10 cursor-pointer transition-all duration-300 hover:border-red-500/40 hover:shadow-[0_4px_24px_rgba(239,68,68,0.10)]">

                    <div className="p-4 lg:p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 transition-all duration-300 group-hover:bg-red-500/25">
                          <RiThumbDownFill className="text-red-400 text-lg" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm leading-tight">
                            Limitations
                          </h3>
                          <p className="text-zinc-500 text-[10px] mt-0.5">
                            Areas where alternatives may perform better
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {brand.cons?.slice(0, 6)?.map((con, index) => (
                          <li key={index} className="flex items-center gap-2.5 text-xs md:text-sm text-zinc-300 transition-colors duration-150 hover:text-white">
                            <RiCloseCircleFill className="mt-0.5 shrink-0 text-sm text-red-400" />
                            <span className="leading-relaxed">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            </section>
          )}

          <div className="grid grid-cols-1 gap-2 ">
            {brand?.popularSeries?.length > 0 && (
              <div className="relative ">
                <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center  justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(to bottom right, ${primaryColor}33, ${primaryColor}1A)`,
                      boxShadow: `0 0 0 1px ${primaryColor}4D, 0 0 14px ${primaryColor}26`
                    }}
                  >
                    <FiLayers size={18} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                      Popular Series
                    </h2>
                    <p className="text-zinc-500 text-[10px] mt-0.5">
                      Top-performing lineups from {brandName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {brand.popularSeries.map((series, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs sm:text-sm text-zinc-300 font-medium tracking-wide hover:bg-white/15 transition-colors cursor-default">
                      {series}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 self-start z-10">
          <RecommendedTyres brandId={brand?._id} primaryColor={primaryColor} />
        </div>
      </div>
      <div className="">
        <TyreSection brandId={brand?._id} primaryColor={primaryColor} />
      </div>
      {brand?.faq?.length > 0 && <FAQSection faqs={brand?.faq} />}
    </div>
  );
}

export default React.memo(BrandsDetailsClient);
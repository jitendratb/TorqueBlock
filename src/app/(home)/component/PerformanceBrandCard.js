import Link from 'next/link';
import React from 'react';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import CustomImage from '@/components/molecules/CustomImage';
import { getCategoryPreset } from './performanceBrandPresets';

const MAX_CHIPS = 3;
const MAX_HEADLINE_LINES = 2;

function splitHeadline(headline) {
  if (typeof headline !== 'string') return [];

  return (headline.match(/[^.]+\.?/g) || [])
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, MAX_HEADLINE_LINES);
}

function PerformanceBrandCard({ brand }) {
  if (!brand?._id) return null;

  const name = brand?.name;
  const headlineLines = splitHeadline(brand?.focusKeyword);
  const chips = brand?.categories?.slice(0, MAX_CHIPS) || [];

  return (
    <Link
      href={`/brands/${brand._id}`}
      aria-label={`Shop ${name}`}
      className="group relative flex h-[380px] lg:h-[420px] w-full flex-col overflow-hidden rounded-[2rem] bg-[#07090d] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-orange-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black  [.light-mode_&]:border-black/10"
    >
      <div className="absolute inset-0 z-0">
        <CustomImage
          src={brand?.brandBanner}
          alt={name}
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 31vw"
          className="h-full w-full"
          imageClassName="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(6,8,12,0.97)_0%,rgba(6,8,12,0.84)_28%,rgba(6,8,12,0.3)_60%,transparent_100%)]"
      />



      <div className="justify-end relative z-30 flex h-full flex-col p-4 gap-4">

        <div className="relative h-10 w-36 sm:h-11 sm:w-40">
          <CustomImage
            src={brand?.brandLogo}
            alt={`${name} logo`}
            fill
            sizes="160px"
            className="h-full w-full"
            imageClassName="object-contain object-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          />
        </div>

        {headlineLines.length > 0 && (
          <h3 className="text-xl font-black leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-[1.7rem] lg:text-[1.5rem]">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className={`line-clamp-2 ${i === 0 ? 'text-white' : 'text-orange-500'}`}
              >
                {line}
              </span>
            ))}
          </h3>
        )}

        {chips.length > 0 && (
          <div className="flex flex-nowrap items-center gap-1">
            {chips.map((chip) => {
              const { Icon, label } = getCategoryPreset(chip?.name);
              return (
                <span
                  key={chip?._id || label}
                  className="flex flex-col ax-w-full items-center gap-1.5 px-2.5 py-1 transition-colors duration-300"
                >
                  <Icon
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 text-orange-400 transition-colors duration-300"
                  />
                  <span className="min-w-0 text-center line-clamp-2 text-[10px] font-bold uppercase text-white/80">
                    {label}
                  </span>
                </span>
              );
            })}
          </div>
        )}

        <span className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-orange-500/80 bg-orange-500/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-orange-400 backdrop-blur-sm transition-colors duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
          <span className="min-w-0 truncate">Shop {name}</span>
          <FiArrowRight
            size={16}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>

    </Link>
  );
}

export default PerformanceBrandCard;

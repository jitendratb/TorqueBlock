import React from 'react';
import Link from 'next/link';
import CustomImage from '@/components/molecules/CustomImage';

/**
 * Wide promo strip: brand name in white, product name in orange, over a
 * darkened tyre shot that bleeds in from the right.
 */
function ProductBanner({
  brand,
  productName,
  image,
  href,
  priority = false,
  className = '',
}) {
  if (!brand && !productName) return null;

  const label = [brand, productName].filter(Boolean).join(' ');
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href ? { href, 'aria-label': label } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative isolate flex h-[96px] w-full items-center overflow-hidden rounded-2xl bg-[#07090d] ring-1 ring-white/10 sm:h-[120px] lg:h-[140px] ${href
        ? 'transition-[box-shadow,ring-color] duration-500 ease-out hover:ring-orange-500/40 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
        : ''
        } [.light-mode_&]:ring-black/10 ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <CustomImage
          src={image}
          alt={label}
          fill
          priority={priority}
          sizes="(max-width: 1023px) 100vw, 1280px"
          className="h-full w-full"
          imageClassName={`object-cover object-right ${href ? 'transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]' : ''}`}
        />
      </div>

      {/* Base dim so the tread reads as texture, not subject */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-black/45" />

      {/* Left-weighted wash: solid black under the type, clearing by the right edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,#07090d_0%,rgba(7,9,13,0.94)_28%,rgba(7,9,13,0.62)_52%,rgba(7,9,13,0.2)_78%,transparent_100%)]"
      />

      <h2 className="relative z-20 pl-6 pr-6 text-[1.25rem] font-black leading-none tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:pl-10 sm:text-[2rem] lg:pl-14 lg:text-[2.75rem]">
        {brand && <span className="text-white">{brand}</span>}
        {brand && productName ? ' ' : null}
        {productName && <span className="text-orange-500">{productName}</span>}
      </h2>
    </Wrapper>
  );
}

export default ProductBanner;

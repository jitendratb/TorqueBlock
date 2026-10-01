import React from 'react';

/**
 * Mirrors the shared home section heading: an orange eyebrow flanked by
 * hairlines, with the display heading underneath.
 */
function SectionHeadingSkeleton({
  eyebrowClassName = 'w-40',
  headingClassName = 'w-60 md:w-[24rem]',
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className='flex items-center gap-3'>
        <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/40 md:w-12' />
        <div className={`h-2.5 rounded-full bg-orange-500/25 ${eyebrowClassName}`} />
        <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/40 md:w-12' />
      </div>

      <div className={`mt-2 h-8 rounded-lg bg-zinc-800/70 md:h-12 [.light-mode_&]:bg-black/10 ${headingClassName}`} />
    </div>
  );
}

export default SectionHeadingSkeleton;

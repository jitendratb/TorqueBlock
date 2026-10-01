import React from 'react'
import brandService from "@/services/brandService";
import BrandsCarouselClient from './BrandsCarouselClient';

async function BrandsCard() {
  let brands = [];
  try {
    brands = await brandService.getPerformanceBrands();
  } catch (error) {
    console.error("Error fetching brands on Server Side:", error);
  }


  return (
    <div className='w-full mx-auto flex flex-col gap-6' id='brand-section'>
      <div className='flex flex-col items-center text-center'>
        <div className='flex items-center gap-3'>
          <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' />
          <span className='text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000'>
            Premium Brands
          </span>
          <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' />
        </div>

        <h2 className='text-2xl md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter text-black transition-colors duration-1000'>
          Ultimate <span className='text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000'>Performance</span>
        </h2>
      </div>

      {brands?.length > 0 ? (
        <div className='mx-auto w-full max-w-7xl'>
          <BrandsCarouselClient brands={brands} />
        </div>
      ) : (
        <p className='text-center [.light-mode_&]:text-zinc-500 [.dark-mode_&]:text-gray-400 text-gray-500 py-10 transition-colors duration-1000'>
          No brands available at the moment.
        </p>
      )}
    </div>
  )
}

export default BrandsCard

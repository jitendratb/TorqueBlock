import React from 'react'
import brandService from "@/services/brandService";
import BrandCard from './BrandCard';

async function BrandsCard() {
  let brands = [];
  try {
    brands = await brandService.getPerformanceBrands();
  } catch (error) {
    console.error("Error fetching brands on Server Side:", error);
  }

  return (
    <div className='w-full mx-auto flex flex-col gap-8 overflow-hidden' id='brand-section'>

      <div className='flex flex-col items-center text-center space-y-2'>
        <span className="text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000">PREMIUM BRANDS</span>
        <h2 className='text-3xl md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter mt-2 text-black transition-colors duration-1000'>
          Ultimate <span className="text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000">Performance</span>
        </h2>
      </div>

      

      <div className='flex flex-col md:flex-row gap-4 w-full items-center md:justify-center'>
        {brands?.length > 0 ? (
          brands.slice(0, 3).map((brand) => (
            <BrandCard brand={brand} key={brand._id} />
          ))
        ) : (
          <p className="md:col-span-3 text-center text-gray-500 py-10">No brands available at the moment.</p>
        )}
      </div>
    </div>
  )
}

export default BrandsCard
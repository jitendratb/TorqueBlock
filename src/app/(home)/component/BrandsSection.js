import React from 'react'
import TorqueBlockApi from "@/lib/api"
import BrandCard from './BrandCard';

async function BrandsCard() {
  let brands = [];
  try {
    const res = await TorqueBlockApi.get("/brands", { params: { isActive: true }})
    brands = res?.data || [];
  } catch (error) {
    console.error("Error fetching brands on Server Side:", error);
  }

  return (
    <div className='w-full mx-auto flex flex-col gap-6 overflow-hidden'>
      <div className='flex flex-col md:flex-row gap-4 w-full items-center md:justify-center md:py-6'>
        {brands?.length > 0 ? (
          brands.map((brand) => (
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
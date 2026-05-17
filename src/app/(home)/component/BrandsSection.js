"use client"
import React, { useEffect, useState } from 'react'
import TorqueBlockApi from "@/lib/api"
import BrandCard from './BrandCard';
import { BrandCardSkeletonGroup } from './BrandCardSkeleton';

function BrandsCard() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleBrands = async () => {
      setIsLoading(true);
      try {
        const res = await TorqueBlockApi.get("/brands", { params: { isActive: true }})
        setBrands(res?.data || [])
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    handleBrands()
  }, [])

  console.log(brands)
  return (
    <div className='w-full  mx-auto flex flex-col gap-6 overflow-hidden'>
      <div className='flex flex-col md:flex-row gap-4 w-full items-center md:justify-center md:py-6'>
        {isLoading ? (
          <BrandCardSkeletonGroup count={3} />
        ) : brands?.length > 0 ? (
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
import React from 'react'
import CategorySchema from '../../../components/seo/CategorySchema';
import categoryServiceInstance from '@/services/categoryService'
import CategoryCarouselClient from './CategoryCarouselClient';

async function Category() {

  let categories = [];
  try {
    categories = await categoryServiceInstance.getCategory() || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
  if (!Array.isArray(categories)) categories = [];

  return (
    <div className='' id="category-section">
      <CategorySchema categories={categories} />
      <div className='flex flex-col items-center text-center '>
        <div className='flex items-center gap-3'>
          <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' />
          <span className='text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000'>
            Find Your Ride
          </span>
          <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' />
        </div>

        <h2 className='text-2xl md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter text-black transition-colors duration-1000'>
          Shop By <span className='text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000'>Riding Style</span>
        </h2>
      </div>
      <div className=''>
        <CategoryCarouselClient categories={categories} />
      </div>

    </div>
  )
}

export default Category
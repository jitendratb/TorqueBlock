import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FiArrowRight } from 'react-icons/fi';

function BrandCard({ brand }) {
  console.log(brand)
  return (
    <Link href={`/search?q=${brand?.name}`} className='group block cursor-pointer relative h-[200px] md:h-[180px] lg:h-[240px] w-[280px] md:w-[280px] lg:w-[320px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-zinc-900 shadow-xl w-full'>
         <Image
        src={brand?.brandBanner}
        alt={brand?.brandName || brand?.name || "Brand"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105'
      />
     
      <div className='absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-center justify-between z-10'>
        <div className='w-full'>
          <div className='text-white/60 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 mb-1 -translate-x-4 group-hover:translate-x-0'>
            Explore Brand
          </div>
          <div className='flex justify-between items-end  w-full'>
            <h3 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-white bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2">
              {brand?.name || brand?.brandName}
            </h3>
            <div>
              <div className="w-8 h-8 lg:w-10 lg:h-10  flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-white/90 group-hover:bg-black/40 group-hover:text-white transition-all duration-500 ease-out">
                <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BrandCard;
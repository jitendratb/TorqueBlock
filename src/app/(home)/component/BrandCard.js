import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FiArrowRight } from 'react-icons/fi';

function BrandCard({ brand, className = "w-[280px]  lg:w-[320px]" }) {

  console.log(brand)
  return (
    <Link href={`/brands/${brand?._id}`} className={`group block cursor-pointer relative h-[240px] md:h-[180px] lg:h-[240px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-zinc-900 shadow-xl w-full ${className}`}>
      <Image
        src={brand?.brandBanner}
        alt={brand?.brandName || brand?.name || "Brand"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110'
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-center justify-between z-10'>
        <div className='w-full'>
          <div className="">
            <span className="inline-flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em]  shadow-xl">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Explore Brand
            </span>
          </div>


          <div className='flex justify-between items-end  w-full'>
            <h3 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-white bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2">
              {brand?.name || brand?.brandName}
            </h3>
            <div>
              <div className="w-8 h-8 lg:w-10 lg:h-10  flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/90 group-hover:bg-white/20 group-hover:text-white transition-all duration-500 ease-out">
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
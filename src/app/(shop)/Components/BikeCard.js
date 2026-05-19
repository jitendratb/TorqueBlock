import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

function BikeCard({ brand , index , className='' }) {
    return (
        <Link
            href={`/bikes/${brand.identifier || brand.bikeBrand.toLowerCase().replace(/\s+/g, '-')}`}
            className={`group relative h-[24rem] md:h-[30rem] bg-zinc-950 border border-zinc-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:border-orange-500/50 transition-all duration-700 shadow-2xl ${className}`}
        >
            <div className="absolute inset-0">
                <Image
                    src={brand?.heroImage}
                    alt={`${brand?.bikeBrand}`}
                    fill
                    priority={index < 6}
                    className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 saturate-[0.1] md:saturate-[0.1] group-hover:saturate-100 group-hover:brightness-110"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            <div className="absolute inset-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <div className="absolute top-6 left-6 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-orange-500/50" />
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-orange-500/50" />

                <div className="absolute top-8 left-8 hidden lg:flex flex-col gap-1">
                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest animate-pulse">READY FOR DEPLOYMENT</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">ID: TB-00{index + 1}</span>
                </div>
            </div>

            <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-30 space-y-3 md:space-y-4 w-[80%]">
                <div className="space-y-0">
                    <span className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] block mb-1 md:mb-2 opacity-100 lg:opacity-0 group-hover:opacity-100 translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Elite Grade
                    </span>
                    <h3 className="text-4xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none transition-transform duration-500 group-hover:-translate-y-2">
                        {brand.bikeBrand}
                    </h3>
                    <p className="text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-widest mt-1 md:mt-2">
                        Performance Intent
                    </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <div className="px-4 py-1.5 md:px-6 md:py-2 bg-orange-500 text-black text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                        Enter Roster
                    </div>
                    <FiArrowRight size={16} className="text-white group-hover:translate-x-2 transition-transform" />
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        </Link>
    )
}

export default BikeCard
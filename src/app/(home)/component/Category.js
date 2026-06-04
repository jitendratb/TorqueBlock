import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

import Cruiser from "../../../../public/Category/Cruiser.webp"
import DualSport from "../../../../public/Category/DualSport.webp"
import OffRoading from "../../../../public/Category/OffRoading.webp"
import RacingSlicks from "../../../../public/Category/RacingSlicks.webp"
import SportTouring from "../../../../public/Category/SportTouring.webp"
import SuperSport from "../../../../public/Category/SuperSport.webp"

import CategorySchema from '../../../components/seo/CategorySchema';

function Category() {
  const categories = [
    { title: "Super Sport", subtitle: "Track & Street", image: SuperSport, href: "/search?q=supersport", className: "md:col-span-2 md:row-span-2" },
    { title: "Cruiser", subtitle: "Highway Dominance", image: Cruiser, href: "/search?q=cruiser", className: "md:col-span-1 md:row-span-1" },
    { title: "Off-Roading", subtitle: "Dirt & Trail", image: OffRoading, href: "/search?q=off-road", className: "md:col-span-1 md:row-span-1" },
    { title: "Sport Touring", subtitle: "Endurance & Speed", image: SportTouring, href: "/search?q=touring", className: "md:col-span-2 md:row-span-1" },
    { title: "Racing Slicks", subtitle: "Pure Track Performance", image: RacingSlicks, href: "/search?q=racing", className: "md:col-span-2 md:row-span-1" },
    { title: "Dual Sport", subtitle: "Any Terrain", image: DualSport, href: "/search?q=sports", className: "md:col-span-2 md:row-span-1" },
  ];

  const pairedCategories = [];
  for (let i = 0; i < categories.length; i += 2) {
    pairedCategories.push(categories.slice(i, i + 2));
  }

  return (
    <div className='' id="category-section">
      <CategorySchema categories={categories} />
      <div className="mb-10 text-center">
          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em]">Riding Styles</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 [.light-mode_&]:text-black [.dark-mode_&]:text-white transition-colors duration-1000">
              Select Your <span className="text-orange-500">Playground</span>
          </h2>
      </div>

      <div className='flex flex-col gap-4'>
          {pairedCategories.map((pair, rowIndex) => (
            <div key={rowIndex} className='flex flex-col md:flex-row gap-4 h-[500px] lg:h-[450px]'>
              {pair.map((cat, idx) => (
                  <Link href={cat.href} key={idx} className={`group relative rounded-[2rem] overflow-hidden border border-zinc-800/30 hover:border-orange-500/40 bg-zinc-950 transition-all duration-700 ease-out shadow-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] h-[250px] md:h-auto flex-1 md:hover:flex-[2] w-full`}>
                      <Image 
                          src={cat.image} 
                          alt={cat.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={75}
                          placeholder="blur"
                          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 saturate-50 group-hover:saturate-100"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                      
                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end z-10">
                          <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 mb-1 -translate-x-4 group-hover:translate-x-0">
                              {cat.subtitle}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-1000 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2">
                              {cat.title}
                          </h3>
                      </div>

                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10">
                          <svg className="w-4 h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                      </div>
                  </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Category
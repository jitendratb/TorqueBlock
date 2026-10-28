"use client"
import { useEffect, useState } from 'react'
import { BsSpeedometer2 } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AVATARS, RATING, REVIEWS } from './socialProof'

const HEADINGS = [
  ['Find the Right', 'Tyres for Your', 'Motorcycle'],
  // ["India's Best", 'Performance Tyres', 'for Every Ride'],
  // ['Premium Grip', 'Built for', 'Performance Riders'],
  // ['Engineered for Grip', 'Built for', 'Performance'],
  // ['Choose Compare', 'Find Your Perfect', 'Performance Tyre'],
]



function H1Tags({ rating = RATING, reviews = REVIEWS }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % HEADINGS.length)
      }, 3500)
    }, 4000)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [])

  const [lead, accent, tail] = HEADINGS[index]

  return (
    <div className='flex flex-col justify-start md:justify-center space-y-4 md:space-y-3 lg:space-y-5'>
      <div className='flex items-center gap-3 animate-slide-down-fade'>
        <BsSpeedometer2 aria-hidden="true" className='shrink-0 text-orange-500 text-lg sm:text-xl' />
        <span className='text-orange-500  text-[12px] sm:text-xs font-bold md:font-semibold md:tracking-[0.25em] [text-shadow:0_0_10px_rgba(249,115,22,0.9)]'>
         Performance Motorcycle Tyres For Every Ride
        </span>
      </div>

      <h1 className='flex flex-col text-3xl md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black  tracking-tighter  text-black transition-colors duration-1000'>
        <span className='sr-only'>Find the Right Performance Tyre for Your Motorcycle - Premium Performance Motorcycle Tyres in India.</span>
        <span key={index} aria-hidden="true" className='flex flex-col animate-slide-down-fade'>
          <span className='text-3xl md:text-5xl xl:text-7xl text-white'>{lead}</span>
          <span className='text-3xl md:text-5xl xl:text-7xl text-orange-500'>{accent}</span>
          <span className='text-3xl md:text-5xl xl:text-7xl text-white'>{tail}</span>
        </span>
      </h1>

      <p className='max-w-lg text-xs md:text-base lg:text-lg font-semibold leading-relaxed text-zinc-200 animate-slide-down-fade transition-colors duration-1000'>
       Premium & Value Performance Motorcycle Tyres - Matched to Your Motorcycle and Delivered Across India.
      </p>

      <div className='relative isolate flex lg:hidden w-fit max-w-full items-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-white/10 px-3 py-2 shadow-lg shadow-black/30 backdrop-blur-xl'>
        <span aria-hidden="true" className='pointer-events-none absolute inset-x-4 top-0 block h-px bg-gradient-to-r from-transparent via-white/50 to-transparent' />
        <span aria-hidden="true" className='flex shrink-0 -space-x-2'>
          {AVATARS.map((a) => (
            a.img ? (
              <img key={a.initials} src={a.img} alt="" className='h-7 w-7 rounded-full border-2 border-[#0B0F19] object-cover' />
            ) : (
              <span key={a.initials} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-gray-300/40 bg-gradient-to-br ${a.tint} text-[9px] font-bold text-white`}>
                {a.initials}
              </span>
            )
          ))}
        </span>
        <span aria-hidden="true" className='h-8 w-px shrink-0 bg-white/15' />
        <div className='min-w-0 leading-tight'>
          <div className='flex items-center gap-1.5'>
            <span className='text-sm font-black text-white'>{rating}<span className='text-[10px] font-semibold text-white/50'>/5</span></span>
            <span aria-hidden="true" className='flex items-center gap-0.5 text-orange-400'>
              {[0, 1, 2, 3, 4].map((i) => <FaStar key={i} className='text-[10px]' />)}
            </span>
          </div>
          <p className='mt-0.5 inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-white/80'>
            <FcGoogle className='shrink-0 text-xs' /> {reviews} Google Reviews
          </p>
        </div>
      </div>
    </div>
  )
}

export default H1Tags;

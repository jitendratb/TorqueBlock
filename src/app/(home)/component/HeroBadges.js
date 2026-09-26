import { FaStar } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AVATARS, RATING, REVIEWS, RIDERS } from './socialProof'

function HeroBadges({ rating = RATING, reviews = REVIEWS }) {
  return (
    <div className='hidden md:flex justify-end h-auto'>
      <div className='relative isolate flex items-center gap-4 overflow-hidden rounded-2xl border border-white/15 bg-white/10 px-3 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl'>
        <span aria-hidden="true" className='pointer-events-none absolute inset-x-6 top-0 block h-px bg-gradient-to-r from-transparent via-white/50 to-transparent' />

        {/* Trusted-by headline */}
        <div className='leading-tight'>
          <p className='text-sm font-black uppercase tracking-wide text-white'>Trusted by {RIDERS}</p>
          <p className='text-[11px] font-medium uppercase tracking-wide text-white/60'>Riders across India</p>
        </div>

        <span aria-hidden="true" className='h-10 w-px bg-white/15' />


        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-3'>
            <span aria-hidden="true" className='flex -space-x-2.5'>
              {AVATARS.map((a) => (
                a.img ? (
                  <img key={a.initials} src={a.img} alt="" className='h-8 w-8 rounded-full border-2 border-[#0B0F19] object-cover' />
                ) : (
                  <span key={a.initials} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-gray-300/40 bg-gradient-to-br ${a.tint} text-[10px] font-bold text-white`}>
                    {a.initials}
                  </span>
                )
              ))}
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='text-base font-black text-white'>{rating}<span className='text-xs font-semibold text-white/50'>/5</span></span>
              <span aria-hidden="true" className='flex items-center gap-0.5 text-orange-400'>
                {[0, 1, 2, 3, 4].map((i) => <FaStar key={i} className='text-[11px]' />)}
              </span>
            </span>
          </div>
          <p className='inline-flex items-center gap-1.5 text-xs font-medium text-white/80'>
            <FcGoogle className='text-base' /> {reviews} Google Reviews
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroBadges;

import React from 'react'

function TrendCardSkelton({ count = 4 }) {
  return (
    <section className='py-4'>
        {/* Section Header Skeleton */}
        <div className='flex flex-col items-center mb-8 text-center space-y-2'>
            <div className="h-3 w-32 bg-orange-500/20 rounded-full animate-pulse" />
            <div className="h-10 md:h-12 w-64 md:w-96 bg-zinc-900/50 rounded-lg animate-pulse mt-2" />
        </div>

        {/* Horizontal Scroll Cards Skeleton */}
        <div className='flex overflow-x-auto gap-2 md:gap-4 w-full flex-1'>
            {[...Array(count)].map((_, i) => (
                <div key={i} className='relative h-[300px] rounded-[2.5rem] w-full md:w-[320px] lg:w-[360px] shrink-0 overflow-hidden bg-zinc-900/50 animate-pulse border border-white/5'>
                    {/* Top left badge skeleton */}
                    <div className="absolute top-6 left-6 h-8 w-20 bg-white/10 rounded-full" />
                    
                    {/* Bottom content skeletons */}
                    <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end space-y-4">
                        {/* Bike Info Badge */}
                        <div className="h-7 w-32 bg-white/10 rounded-full" />

                        {/* Tyre Info */}
                        <div className="space-y-2">
                            <div className="h-8 w-3/4 bg-white/10 rounded-lg" />
                        </div>
                        
                        {/* Tagline */}
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-white/10 rounded-lg" />
                            <div className="h-3 w-4/5 bg-white/10 rounded-lg" />
                        </div>

                        {/* Footer Stats */}
                        <div className="flex items-center gap-4 pt-2">
                            <div className="h-8 w-16 bg-white/10 rounded-full" />
                            <div className="h-8 w-16 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default TrendCardSkelton
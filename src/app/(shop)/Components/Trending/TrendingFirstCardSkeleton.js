import React from 'react';

function TrendingFirstCardSkeleton() {
    return (
        <div className='relative w-full lg:max-w-5xl h-[400px] lg:h-[450px] rounded-[1rem] overflow-hidden ring-1 ring-white/10 ring-inset bg-zinc-900 animate-pulse'>
            
            <div className='absolute top-4 lg:top-6 left-4 lg:left-6 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-2 md:px-4 py-1 md:py-2 rounded-full w-32 h-6 lg:h-8'></div>

            <div className='absolute bottom-0 md:bottom-6 lg:bottom-4 inset-x-0 p-4 lg:p-10 flex flex-col sm:flex-row justify-end sm:justify-between items-start sm:items-end gap-4 sm:gap-6 h-full z-10'>
                
                <div className='flex flex-col gap-6 lg:flex-1 w-full lg:max-w-3xl'>
                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-full w-28 h-6 lg:h-8'></div>
                        <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-full w-40 h-6 lg:h-8'></div>
                    </div>

                    <div>
                        <div className='h-8 sm:h-12 bg-white/5 rounded-md w-3/4 mb-2 sm:mb-4'></div>
                        <div className='h-4 bg-white/5 rounded-md w-1/2 mt-2'></div>
                    </div>
                </div>

                <div className='w-full sm:w-auto hidden lg:block shrink-0'>
                    <div className='flex sm:flex-col gap-4'>
                        <div className='bg-white/5 rounded-xl w-12 h-12'></div>
                        <div className='hidden sm:block w-full h-px bg-white/5'></div>
                        <div className='bg-white/5 rounded-xl w-12 h-12'></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TrendingFirstCardSkeleton;

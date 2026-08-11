"use client"
import { Suspense } from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb'
import TrendingFirstCard from './TrendingFirstCard';
import TrendingFirstCardSkeleton from './TrendingFirstCardSkeleton';
import TrendCard from '@/components/atoms/TrendCard';
import Pagination from '@/components/atoms/Pagination';
import { FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import TrendCardSkelton from '@/components/atoms/TrendCardSkelton';

function TrendingClient({ trendAll, trendingFirst, loading, error }) {

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='px-4 md:px-0'>
        <Breadcrumb items={[{ label: "Trending" }]} />
      </div>

      <section aria-label="Top Trending Item">
        <Suspense fallback={<TrendingFirstCardSkeleton />}>
          <TrendingFirstCard trendingFirst={trendingFirst} />
        </Suspense>
      </section>

      <section aria-label="All Trending Tyres" className='flex flex-col gap-4'>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)] backdrop-blur-md">
              <FiTrendingUp className="text-lg text-orange-400" />
            </div>
            <div>
           
              <h2 className="text-xl md:text-xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                More Trending Tyres
              </h2>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 block mb-0.5">
                Curated Collection
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  w-full mb-4'>
          {trendAll?.length > 0 ? ( trendAll?.map((item) => (
            <TrendCard item={item} key={item._id} className="w-full md:w-full lg:w-full" />
          ))) : <TrendCardSkelton count={8} />}
        </div>
      </section>
    </div>
  )
}

export default TrendingClient
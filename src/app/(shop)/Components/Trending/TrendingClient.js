"use client"
import { Suspense } from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb'
import TrendingFirstCard from './TrendingFirstCard';
import TrendingFirstCardSkeleton from './TrendingFirstCardSkeleton';
import TrendCard from '@/components/atoms/TrendCard';
import Pagination from '@/components/atoms/Pagination';
import { FiAlertCircle } from 'react-icons/fi';

function TrendingClient({ trendAll, trendingFirst, error }) {

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

      <section aria-label="All Trending Tyres" className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>More Trending Tyres</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  w-full '>
          {trendAll?.map((item) => {
            return (
              <>
                <TrendCard item={item} key={item._id} className="w-full md:w-full lg:w-full" />
              </>)
          })}
        </div>

        <div className='mt-4 flex justify-center'>
          <Pagination />
        </div>
      </section>
    </div>
  )
}

export default TrendingClient
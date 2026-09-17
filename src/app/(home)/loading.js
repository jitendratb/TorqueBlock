import { PageShell } from '@/components/layout/page-shell'
import { BrandCardSkeletonGroup } from './component/BrandCardSkeleton'
import TrendCardSkelton from '@/components/atoms/TrendCardSkelton'
import {
  FeatureCardSkeleton,
  CategorySkeleton,
  ValuePerformanceBrandsSkeleton,
  B2BEnterpriseSkeleton,
  ReviewsSectionSkeleton,
} from './component/HomeSkeletons'

export default function Loading() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-[#0B0F19]">

      <section className="relative w-full h-[100svh] overflow-hidden bg-zinc-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start md:items-center justify-center z-10 px-4">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-[55%_45%] gap-5 items-start md:items-center">
            <div className="space-y-4">
              <div className="h-4 w-32 bg-orange-500/20 rounded-full" />
              <div className="h-14 md:h-20 w-3/4 bg-zinc-700/50 rounded-xl" />
              <div className="h-14 md:h-20 w-1/2 bg-zinc-700/40 rounded-xl" />
              <div className="h-4 w-full max-w-sm bg-zinc-700/30 rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 md:bottom-10 left-0 w-full flex justify-center z-10 px-4">
          <div className="max-w-xl lg:max-w-4xl w-full h-14 bg-white/10 rounded-2xl border border-white/10" />
        </div>
      </section>

      <div className="bg-[#0B0F19] w-full">
        <PageShell>
          <div className="space-y-10 pb-10 mt-10">

            <section aria-label="Motorcycle Tyre Brands">
              <BrandCardSkeletonGroup count={3} />
            </section>

            <section aria-label="Trending Motorcycle Tyres">
              <TrendCardSkelton count={4} />
            </section>

            <section aria-label="Featured Products">
              <FeatureCardSkeleton count={4} />
            </section>

            <section aria-label="Product Families">
              <FeatureCardSkeleton count={4} />
            </section>

            <section aria-label="Tyre Categories">
              <CategorySkeleton />
            </section>

            <section aria-label="Value & Performance Brands">
              <ValuePerformanceBrandsSkeleton />
            </section>

            <section aria-label="Customer Reviews">
              <ReviewsSectionSkeleton />
            </section>

            <section aria-label="B2B Enterprise Tyre Distribution">
              <B2BEnterpriseSkeleton />
            </section>

          </div>
        </PageShell>
      </div>

    </main>
  )
}

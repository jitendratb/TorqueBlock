import Image, { getImageProps } from 'next/image'
import React, { Suspense } from 'react'
import { preload } from 'react-dom'
import H1Tags from './component/H1Tags'
import QueryBox from './component/QueryBox'
import BrandsSection from './component/BrandsSection'
import { BrandCardSkeletonGroup } from './component/BrandCardSkeleton'
import { PageShell } from '@/components/layout/page-shell'
import ScrollBackgroundWrapper from './component/ScrollBackgroundWrapper'
import WebPageSchema from '@/components/seo/WebPageSchema'
import dynamic from 'next/dynamic'
import TrendingSection from './component/TrendingSection'
import TrendCardSkelton from '@/components/atoms/TrendCardSkelton'

import { FeatureCardSkeleton, CategorySkeleton, ValuePerformanceBrandsSkeleton, B2BEnterpriseSkeleton, ReviewsSectionSkeleton } from './component/HomeSkeletons'
import AiSearchBar from './component/BigSearchBar'
import HeroSearchObserver from './component/HeroSearchObserver'

const FeatureCard = dynamic(() => import('./component/FeatureCard'), {
  ssr: true,
  loading: () => <FeatureCardSkeleton count={4} />
});
const Category = dynamic(() => import('./component/Category'), {
  ssr: true,
  loading: () => <CategorySkeleton />
});
const ValuePerformanceBrands = dynamic(() => import('./component/ValuePerformanceBrands'), {
  ssr: true,
  loading: () => <ValuePerformanceBrandsSkeleton />
});
const ReviewsSection = dynamic(() => import('./component/ReviewSection'), {
  ssr: true,
  loading: () => <ReviewsSectionSkeleton />
});
const B2BEnterpriseSection = dynamic(() => import('./component/B2BEnterpriseSection'), {
  ssr: true,
  loading: () => <B2BEnterpriseSkeleton />
});

export const revalidate = 60;

function page() {
  const banners = [
    {
      id: 2,
      image: "https://cdn.torqueblock.com/GT-650-tyre-18ebf1ae-fdd0-47d0-ac66-c6d13131e4d8.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Continental GT 650 Tyres || Torque Block",
    },
    {
      id: 3,
      image: "https://cdn.torqueblock.com/brand-tyre-7b173d58-a7a2-4ba4-a0a0-96531ffc6f63.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Himalayan 450 Tyres || Torque Block",
    },
    {
      id: 5,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India || KTM Duke 250 Tyres || Torque Block",
    },
    {
      id: 6,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India || KTM Duke 390 Tyres || Torque Block",
    },
    {
      id: 7,
      image: "https://cdn.torqueblock.com/brand-tyre-53adac61-7de9-4113-8b10-90526ae6cba7.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Interceptor 650 Tyres || Torque Block",
    }
  ];

  const selectedBanner = banners[Math.floor(Math.random() * banners.length)];
  const commonProps = { alt: selectedBanner.alt, fill: true, priority: true, sizes: '100vw', quality: 75 };
  const { props: { srcSet: desktop } } = getImageProps({ ...commonProps, src: selectedBanner.image });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...commonProps, src: selectedBanner.mobileImage });
  preload(desktop, { as: 'image', fetchPriority: 'high', media: "(min-width: 768px)" });
  preload(mobile, { as: 'image', fetchPriority: 'high', media: "(max-width: 767px)" });

  return (
    <div className='overflow-hidden'>
      <WebPageSchema
        type="WebSite"
        title="Torque Block | Premium Motorcycle Tyres India"
        description="India's premium performance motorcycle tyre platform for superbikes, track riding, sport touring, and ADV motorcycles."
        url="/"
      />
      <div className='relative w-full h-screen ' >
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} />
          <img {...rest} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="object-cover" />
        </picture>
        <span className='absolute bg-gradient-to-r from-black/60 to-black/40 inset-0 z-0' />
        <div className='w-full h-full flex flex-col items-start md:items-center justify-center absolute top-0 left-0 z-10'>
          <div className='max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-[55%_45%] px-4 lg:pt-20 lg:pb-6 md:py-0 text-white text-2xl font-bold gap-5 items-start md:items-center'>
            <H1Tags />
          </div>
        </div>
        <div className='w-full h-full flex flex-col items-center justify-end absolute bottom-20 md:bottom-10 z-10 '>
          <div className='max-w-xl lg:max-w-4xl px-4 w-full mx-auto text-white text-2xl font-bold items-center '>
            <HeroSearchObserver>
              <AiSearchBar />
            </HeroSearchObserver>
          </div>
        </div>
      </div>
      <ScrollBackgroundWrapper>
        <PageShell>
          <div className='space-y-10 pb-10 mt-10'>
            <Suspense fallback={<BrandCardSkeletonGroup count={3} />}>
              <BrandsSection />
            </Suspense>

            <Suspense fallback={<TrendCardSkelton count={4} />} >
              <TrendingSection />
            </Suspense>
            <Suspense fallback={<FeatureCardSkeleton count={4} />} >
              <FeatureCard />
            </Suspense>
            <Category />
            <Suspense fallback={<ValuePerformanceBrandsSkeleton />} >
              <ValuePerformanceBrands />
            </Suspense>
            <ReviewsSection />
            <B2BEnterpriseSection />
          </div>
        </PageShell>
      </ScrollBackgroundWrapper>
    </div>
  )
}

export default page
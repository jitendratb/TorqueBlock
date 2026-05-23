import Image from 'next/image'
import React, { Suspense } from 'react'
import H1Tags from './component/H1Tags'
import QueryBox from './component/QueryBox'
import BrandsSection from './component/BrandsSection'
import { BrandCardSkeletonGroup } from './component/BrandCardSkeleton'
import { PageShell } from '@/components/layout/page-shell'
import TyreSection from './component/TyreSection'
import ReviewsSection from './component/ReviewSection'
import B2BEnterpriseSection from './component/B2BEnterpriseSection'
import Category from './component/Category'
import ScrollBackgroundWrapper from './component/ScrollBackgroundWrapper'

function page() {
  const banners = [
    {
      id: 2,
      image: "/bg1.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    },
    {
      id: 4,
      image: "/bg3.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    }, {
      id: 5,
      image: "/bg4.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    }, {
      id: 6,
      image: "/bg5.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    }
  ];


  return (
    <div className=''>
      <div className='relative w-full h-screen ' >
        <Image 
          src={banners[Math.floor(Math.random() * banners.length)].image} 
          alt="Premium Motorcycle Tyres India" 
          fill 
          priority 
          sizes="100vw"
          quality={85}
          className='hidden md:block object-cover' 
        />
        <Image 
          src="/Home/HomeBannerMobile.webp" 
          alt="Premium Motorcycle Tyres India" 
          fill 
          priority 
          sizes="100vw"
          quality={85}
          className='md:hidden object-cover' 
        />
        <span className='absolute bg-gradient-to-r from-black/80 to-black/40 inset-0 z-0' />
        <div className='w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 z-10'>
          <div className='max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 px-4 pt-20 pb-6 md:py-0 text-white text-2xl font-bold gap-5 items-center'>
            <H1Tags />
            <QueryBox />
          </div>
        </div>
      </div>
      <ScrollBackgroundWrapper>
        <PageShell>
          <div className='space-y-10 pb-10 mt-10'>
            <Suspense fallback={<BrandCardSkeletonGroup count={3} />}>
              <BrandsSection />
            </Suspense>
            <Category />
            {/* <TyreSection /> */}
            <ReviewsSection />
            <B2BEnterpriseSection />
          </div>
        </PageShell>
      </ScrollBackgroundWrapper>

    </div>
  )
}

export default page
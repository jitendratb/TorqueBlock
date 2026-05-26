import Image from 'next/image'
import React, { Suspense } from 'react'
import H1Tags from './component/H1Tags'
import QueryBox from './component/QueryBox'
import BrandsSection from './component/BrandsSection'
import { BrandCardSkeletonGroup } from './component/BrandCardSkeleton'
import { PageShell } from '@/components/layout/page-shell'
import ReviewsSection from './component/ReviewSection'
import B2BEnterpriseSection from './component/B2BEnterpriseSection'
import Category from './component/Category'
import ScrollBackgroundWrapper from './component/ScrollBackgroundWrapper'
import WebPageSchema from '@/components/seo/WebPageSchema'
import ValuePerformanceBrands from './component/ValuePerformanceBrands'

function page() {
  const banners = [
     {
      id:2,
      image: "https://cdn.torqueblock.com/GT-650-tyre-18ebf1ae-fdd0-47d0-ac66-c6d13131e4d8.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    },
      {
      id:3,
      image: "https://cdn.torqueblock.com/brand-tyre-7b173d58-a7a2-4ba4-a0a0-96531ffc6f63.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    },
       {
      id:4,
      image: "https://cdn.torqueblock.com/brand-tyre-bcbac7bf-3391-4730-864e-2ee0fa43c82d.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    },
       {
      id:5,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    },
       {
      id:6,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    },
    {
      id:7,
      image: "https://cdn.torqueblock.com/brand-tyre-53adac61-7de9-4113-8b10-90526ae6cba7.webp",
      mobileImage: "/Home/HomeBannerMobile.webp",
      alt: "Premium Motorcycle Tyres India",
    }
  ];


  return (
    <div className=''>
      <WebPageSchema 
        type="WebSite"
        title="Torque Block | Premium Motorcycle Tyres India"
        description="India's premium performance motorcycle tyre platform for superbikes, track riding, sport touring, and ADV motorcycles."
        url="/"
      />
      <div className='relative w-full h-screen ' >
        <Image 
          src={banners[Math.floor(Math.random() * banners.length)].image} 
          alt="Premium Motorcycle Tyres India" 
          fill 
          priority
          fetchPriority="high" 
          sizes="(max-width: 768px) 0vw, 100vw"
          quality={75}
          className='hidden md:block object-cover' 
        />
        <Image 
          src="/Home/HomeBannerMobile.webp" 
          alt="Premium Motorcycle Tyres India" 
          fill 
          priority
          fetchPriority="high" 
          sizes="(max-width: 768px) 100vw, 0vw"
          quality={75}
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
            <ValuePerformanceBrands />
            <ReviewsSection />
            <B2BEnterpriseSection />
          </div>
        </PageShell>
      </ScrollBackgroundWrapper>
    </div>
  )
}

export default page
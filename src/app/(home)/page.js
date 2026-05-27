import Image, { getImageProps } from 'next/image'
import React, { Suspense } from 'react'
import { preload } from 'react-dom'
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

export const revalidate = 60;

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

  // Pick a random banner on every server request
  const selectedBanner = banners[Math.floor(Math.random() * banners.length)];
  const commonProps = { alt: selectedBanner.alt, fill: true, priority: true, sizes: '100vw', quality: 75 };
  const { props: { srcSet: desktop } } = getImageProps({ ...commonProps, src: selectedBanner.image });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...commonProps, src: selectedBanner.mobileImage });

  // Manually preload the correct image based on device size since we are using custom <picture> tags.
  // This tells the browser to start downloading the LCP image before it even parses the HTML body.
  preload(desktop, { as: 'image', fetchPriority: 'high', media: "(min-width: 768px)" });
  preload(mobile, { as: 'image', fetchPriority: 'high', media: "(max-width: 767px)" });

  return (
    <div className=''>
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
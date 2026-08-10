import Image, { getImageProps } from 'next/image'
import React, { Suspense } from 'react'
import { preload } from 'react-dom'
import H1Tags from './component/H1Tags'
import BrandsSection from './component/BrandsSection'
import { BrandCardSkeletonGroup } from './component/BrandCardSkeleton'
import { PageShell } from '@/components/layout/page-shell'
import ScrollBackgroundWrapper from './component/ScrollBackgroundWrapper'
import WebPageSchema from '@/components/seo/WebPageSchema'
import TrendingSection from './component/TrendingSection'
import TrendCardSkelton from '@/components/atoms/TrendCardSkelton'

import { FeatureCardSkeleton, CategorySkeleton, ValuePerformanceBrandsSkeleton, B2BEnterpriseSkeleton, ReviewsSectionSkeleton } from './component/HomeSkeletons'
import AiSearchBar from './component/BigSearchBar'
import HeroSearchObserver from './component/HeroSearchObserver'
import ProductFamilyFeatureCard from './component/ProductFamilyFeatureCard'

import FeatureCard from './component/FeatureCard'
import Category from './component/Category'
import ValuePerformanceBrands from './component/ValuePerformanceBrands'
import ReviewsSection from './component/ReviewSection'
import B2BEnterpriseSection from './component/B2BEnterpriseSection'
import FAQSchema from '@/components/seo/FAQSchema'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'

export const revalidate = 3600;

function page() {
  const banners = [
    {
      id: 2,
      image: "https://cdn.torqueblock.com/GT-650-tyre-18ebf1ae-fdd0-47d0-ac66-c6d13131e4d8.webp",
      mobileImage: "https://cdn.torqueblock.com/brand-tyre-9b20e872-77b7-4d23-83e1-cc965efa947f.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Continental GT 650 Tyres || Torque Block",
    },
    {
      id: 3,
      image: "https://cdn.torqueblock.com/brand-tyre-7b173d58-a7a2-4ba4-a0a0-96531ffc6f63.webp",
      mobileImage: "https://cdn.torqueblock.com/brand-tyre-9b20e872-77b7-4d23-83e1-cc965efa947f.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Himalayan 450 Tyres || Torque Block",
    },
    {
      id: 5,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "https://cdn.torqueblock.com/brand-tyre-9b20e872-77b7-4d23-83e1-cc965efa947f.webp",
      alt: "Premium Motorcycle Tyres India || KTM Duke 250 Tyres || Torque Block",
    },
    {
      id: 6,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "https://cdn.torqueblock.com/brand-tyre-9b20e872-77b7-4d23-83e1-cc965efa947f.webp",
      alt: "Premium Motorcycle Tyres India || KTM Duke 390 Tyres || Torque Block",
    },
    {
      id: 7,
      image: "https://cdn.torqueblock.com/brand-tyre-53adac61-7de9-4113-8b10-90526ae6cba7.webp",
      mobileImage: "https://cdn.torqueblock.com/brand-tyre-9b20e872-77b7-4d23-83e1-cc965efa947f.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Interceptor 650 Tyres || Torque Block",
    }
  ];

  const selectedBanner = banners[Math.floor(Math.random() * banners.length)];
  const commonProps = { alt: selectedBanner.alt, fill: true, priority: true, sizes: '100vw', quality: 75 };
  
  const { props: desktopProps } = getImageProps({ ...commonProps, src: selectedBanner.image });
  const { props: { srcSet: mobileSrcSet, ...rest } } = getImageProps({ ...commonProps, src: selectedBanner.mobileImage });
  
  preload(desktopProps.src, { as: 'image', imageSrcSet: desktopProps.srcSet, imageSizes: desktopProps.sizes, fetchPriority: 'high', media: "(min-width: 768px)" });
  preload(rest.src, { as: 'image', imageSrcSet: mobileSrcSet, imageSizes: rest.sizes, fetchPriority: 'high', media: "(max-width: 767px)" });

  return (
    <main className='overflow-hidden'>
      <WebPageSchema
        type="WebSite"
        title="Torque Block | Premium Motorcycle Tyres India"
        description="India's premium performance motorcycle tyre platform for superbikes, track riding, sport touring, and ADV motorcycles."
        url="/"
      />
      <LocalBusinessSchema />
      <FAQSchema 
        faqs={[
          {
            question: "What is Torque Block?",
            answer: "Torque Block is India's premium performance motorcycle tyre platform, catering specifically to superbikes, track riding, sport touring, and ADV motorcycles."
          },
          {
            question: "Which tyre brands are available on Torque Block?",
            answer: "We offer top international premium motorcycle tyre brands including Pirelli, Michelin, Metzeler, Vredestein, Apollo, and CEAT."
          },
          {
            question: "Do you ship motorcycle tyres across India?",
            answer: "Yes, Torque Block provides fast and secure shipping for all premium motorcycle tyres across India."
          }
        ]}
      />
      <section className='relative w-full h-screen' aria-label="Hero Section">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} sizes={desktopProps.sizes} />
          <img {...rest} fetchPriority="high" decoding="async" style={{ ...rest.style, objectFit: 'cover' }} className="object-cover" />
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
      </section>
      <ScrollBackgroundWrapper>
        <PageShell>
          <div className='space-y-10 pb-10 mt-10'>
            <section aria-label="Motorcycle Tyre Brands">
              <Suspense fallback={<BrandCardSkeletonGroup count={3} />}>
                <BrandsSection />
              </Suspense>
            </section>

            <section aria-label="Trending Motorcycle Tyres">
              <Suspense fallback={<TrendCardSkelton count={4} />} >
                <TrendingSection />
              </Suspense>
            </section>

            <section aria-label="Featured Products">
              <Suspense fallback={<FeatureCardSkeleton count={4} />} >
                <FeatureCard />
              </Suspense>
            </section>

            <section aria-label="Product Families">
              <Suspense fallback={<FeatureCardSkeleton count={4} />} >
                <ProductFamilyFeatureCard />
              </Suspense>
            </section>

            <section aria-label="Tyre Categories">
              <Suspense fallback={<CategorySkeleton />}>
                <Category />
              </Suspense>
            </section>

            <section aria-label="Value & Performance Brands">
              <Suspense fallback={<ValuePerformanceBrandsSkeleton />}>
                <ValuePerformanceBrands />
              </Suspense>
            </section>

            <section aria-label="Customer Reviews">
              <Suspense fallback={<ReviewsSectionSkeleton />}>
                <ReviewsSection />
              </Suspense>
            </section>

            <section aria-label="B2B Enterprise Tyre Distribution">
              <Suspense fallback={<B2BEnterpriseSkeleton />}>
                <B2BEnterpriseSection />
              </Suspense>
            </section>
            
          </div>
        </PageShell>
      </ScrollBackgroundWrapper>
    </main>
  )
}

export default page
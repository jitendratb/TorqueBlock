import Image, { getImageProps } from 'next/image'
import React, { Suspense } from 'react'
import { preload, preconnect } from 'react-dom'
import { FiChevronDown } from 'react-icons/fi'
import { MdTwoWheeler } from 'react-icons/md'
import H1Tags from './component/H1Tags'
import HeroBadges from './component/HeroBadges'
import HeroTrustBar from './component/HeroTrustBar'
import BrandsSection from './component/BrandsSection'
import { BrandCardSkeletonGroup } from './component/BrandCardSkeleton'
import { PageShell } from '@/components/layout/page-shell'
import ScrollBackgroundWrapper from './component/ScrollBackgroundWrapper'
import WebPageSchema from '@/components/seo/WebPageSchema'
import TrendingSection from './component/TrendingSection'
import TrendCardSkelton from '@/components/atoms/TrendCardSkelton'
import dynamic from 'next/dynamic'
import { FeatureCardSkeleton, CategorySkeleton, ValuePerformanceBrandsSkeleton, B2BEnterpriseSkeleton, ReviewsSectionSkeleton } from './component/HomeSkeletons'
import AiSearchBar from './component/BigSearchBar'
import HeroSearchObserver from './component/HeroSearchObserver'
import HeroSearchChips from './component/HeroSearchChips'
import ProductFamilyFeatureCard from './component/ProductFamilyFeatureCard'


const FeatureCard = dynamic(() => import('./component/FeatureCard'))
const Category = dynamic(() => import('./component/Category'))
const ValuePerformanceBrands = dynamic(() => import('./component/ValuePerformanceBrands'))
const ReviewsSection = dynamic(() => import('./component/ReviewSection'))
const B2BEnterpriseSection = dynamic(() => import('./component/B2BEnterpriseSection'))
import FAQSchema from '@/components/seo/FAQSchema'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import { getTrustindexStats } from '@/services/trustindexStats'

export const revalidate = 0;


const POPULAR_SEARCHES = [
  'Pirelli Rosso 3',
  'Duke 390',
  'Z900',
  'S 1000 RR',
  'Interceptor 650',
  'Hayabusa',
  'Michelin Road 6'
];


async function page() {

  const stats = await getTrustindexStats()
  const liveRating = stats.rating 
  const liveReviews = stats.reviews ? `${stats.reviews}+` : undefined

  const banners = [
  {
      id: 1,
      image: "https://cdn.torqueblock.com/torqueblock1-1.webp",
      mobileImage: "https://cdn.torqueblock.com/torqueblock-1.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Continental GT 650 Tyres || Torque Block",
    },
    {
      id: 2,
      image: "https://cdn.torqueblock.com/GT-650-tyre-18ebf1ae-fdd0-47d0-ac66-c6d13131e4d8.webp",
      mobileImage: "https://cdn.torqueblock.com/street-triple1-5.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Continental GT 650 Tyres || Torque Block",
    },
    {
      id: 3,
      image: "https://cdn.torqueblock.com/brand-tyre-7b173d58-a7a2-4ba4-a0a0-96531ffc6f63.webp",
      mobileImage: "https://cdn.torqueblock.com/cbr-2.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Himalayan 450 Tyres || Torque Block",
    },
    {
      id: 5,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "https://cdn.torqueblock.com/torqueblock14-4.webp",
      alt: "Premium Motorcycle Tyres India || KTM Duke 250 Tyres || Torque Block",
    },
    {
      id: 6,
      image: "https://cdn.torqueblock.com/brand-tyre-c4dcba85-4aa9-48f2-8b77-d77623f336e1.webp",
      mobileImage: "https://cdn.torqueblock.com/torqueblock13-3.webp",
      alt: "Premium Motorcycle Tyres India || KTM Duke 390 Tyres || Torque Block",
    },
    {
      id: 7,
      image: "https://cdn.torqueblock.com/brand-tyre-53adac61-7de9-4113-8b10-90526ae6cba7.webp",
      mobileImage: "https://cdn.torqueblock.com/torqueblock12-2.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Interceptor 650 Tyres || Torque Block",
    },
     {
      id: 8,
      image: "https://cdn.torqueblock.com/torqueblock1-1.webp",
      mobileImage: "https://cdn.torqueblock.com/torqueblock-1.webp",
      alt: "Premium Motorcycle Tyres India || Royal Enfield Continental GT 650 Tyres || Torque Block",
    },
  {
    id: 9,
    image: "https://cdn.torqueblock.com/torqueblock4.webp",
    mobileImage: "https://cdn.torqueblock.com/torqueblock11-1.webp",
    alt: "Premium Motorcycle Tyres India || Torque Block",
  },
  {
    id: 10,
    image: "https://cdn.torqueblock.com/torqueblock5.webp",
    mobileImage: "https://cdn.torqueblock.com/torqueblock11-1.webp",
    alt: "Premium Motorcycle Tyres India || Torque Block",
  },
  {
    id: 11,
    image: "https://cdn.torqueblock.com/torqueblock6-1.webp",
    mobileImage: "https://cdn.torqueblock.com/torqueblock9-8.webp",
    alt: "Premium Motorcycle Tyres India || Torque Block",
  },
  {
    id: 12,
    image: "https://cdn.torqueblock.com/torqueblock7-2.webp",
    mobileImage: "https://cdn.torqueblock.com/torqueblock8-7.webp",
    alt: "Premium Motorcycle Tyres India || Torque Block",
  },
  ];

  const selectedBanner = banners[Math.floor(Math.random() * banners.length)];
  const commonProps = { alt: selectedBanner.alt, fill: true, loading: 'eager', sizes: '100vw', quality: 75 };

  const { props: desktopProps } = getImageProps({ ...commonProps, src: selectedBanner.image });
  const { props: mobileProps } = getImageProps({ ...commonProps, src: selectedBanner.mobileImage });

    preload(desktopProps.src, { as: 'image', imageSrcSet: desktopProps.srcSet, imageSizes: desktopProps.sizes, fetchPriority: 'high', media: "(min-width: 768px)" });
    preload(mobileProps.src, { as: 'image', imageSrcSet: mobileProps.srcSet, imageSizes: mobileProps.sizes, fetchPriority: 'high', media: "(max-width: 767px)" });

  preconnect('https://cdn.trustindex.io');


  return (
    <main className=''>
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
      <section className='relative w-full min-h-svh ' aria-label="Hero Section">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} sizes={desktopProps.sizes} />
          <source media="(max-width: 767px)" srcSet={mobileProps.srcSet} sizes={mobileProps.sizes} />
          <img {...mobileProps} fetchPriority="high" decoding="async" style={{ ...mobileProps.style, objectFit: 'cover' }} className="hero-kenburns object-cover" />
        </picture>

        <span aria-hidden="true" className='pointer-events-none absolute inset-0 z-0 hero-scrim' />
        <span aria-hidden="true" className='pointer-events-none absolute inset-0 z-0 hero-vignette' />

        <div className='absolute  inset-0 z-10 flex flex-col justify-start top-[120px] md:top-[150px] lg:top-0 lg:justify-center'>
          <div className='max-w-7xl lg:pb-18 w-full mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] items-center px-4 text-white'>
            <H1Tags rating={liveRating} reviews={liveReviews} />
            <div className='hidden lg:flex h-full items-end justify-end self-stretch'>
              <HeroBadges rating={liveRating} reviews={liveReviews} />
            </div>
          </div>
        </div>

        <div className='absolute inset-0 z-10 flex flex-col items-center justify-end pb-4 lg:pb-12 pointer-events-none'>
          <div className='w-full max-w-xl lg:max-w-4xl mx-auto px-4 pointer-events-auto text-white'>
            <div className='mb-3 flex items-center justify-between px-1'>
              <span className='inline-flex items-center gap-2 text-orange-400 text-[11px] font-bold uppercase tracking-[0.25em]'>
                <MdTwoWheeler aria-hidden="true" className='text-orange-500 text-sm drop-shadow-[0_0_10px_rgba(249,115,22,0.9)]' />
                Find Your Tyres
              </span>
            </div>

            <HeroSearchObserver>
              <AiSearchBar />
            </HeroSearchObserver>

            <HeroSearchChips popular={POPULAR_SEARCHES} />
          </div>

          <HeroTrustBar />

          <div aria-hidden="true" className='pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:block'>
            <FiChevronDown className='hero-scroll-cue text-white/60 text-2xl' />
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
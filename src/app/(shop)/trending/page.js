import React from 'react'
import TrendingClient from '../Components/Trending/TrendingClient'
import trendingService from '@/services/trending.service'
import TrendingSchema from '@/components/seo/TrendingSchema'

export async function generateMetadata() {
  let ogImage = "https://www.torqueblock.com/newLogo.webp";
  try {
    const res = await trendingService.fetchFirstTrending();
    if (res?.data?.bannerImage) {
      ogImage = res.data.bannerImage;
    }
  } catch (err) {
    console.error("Failed to fetch first trending item for metadata:", err);
  }

  return {
    title: "Trending Performance Motorcycle Tyres & Fitments | Torque Block",
    description: "Explore the most popular and trending performance motorcycle tyres in India. Real-time fitment verification, views, and ratings for Pirelli, Metzeler, and Michelin tyres.",
    keywords: [
      "trending motorcycle tyres",
      "popular superbike tyres",
      "motorcycle tyre trends",
      "best superbike tyres India",
      "Pirelli trending tyres",
      "Metzeler popular tyres",
      "Michelin superbike tyres"
    ],
    alternates: {
      canonical: "https://www.torqueblock.com/trending",
    },
    openGraph: {
      title: "Trending Performance Motorcycle Tyres & Fitments | Torque Block",
      description: "Explore the most popular and trending performance motorcycle tyres in India. Real-time fitment verification, views, and ratings for Pirelli, Metzeler, and Michelin tyres.",
      url: "https://www.torqueblock.com/trending",
      siteName: "Torque Block",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Trending Performance Motorcycle Tyres | Torque Block"
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Trending Performance Motorcycle Tyres & Fitments | Torque Block",
      description: "Explore the most popular and trending performance motorcycle tyres in India.",
      images: [ogImage],
    }
  };
}

export default async function Trending({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = 16;

  let trendingAll = null;
  let trendingFirst = null;
  let error = null;

  try {
    const [allRes, firstRes] = await Promise.allSettled([
      trendingService.fetchAllTrending({ limit, page, trendFirst: false }),
      trendingService.fetchFirstTrending()
    ]);
    
    if (allRes.status === 'fulfilled') {
      trendingAll = allRes.value?.data;
    } else {
      error = allRes.reason?.message || "Failed to fetch all trending items";
    }

    if (firstRes.status === 'fulfilled') {
      trendingFirst = firstRes.value?.data;
    } else {
      console.error("Failed to fetch first trending item:", firstRes.reason);
    }
  } catch (err) {
    error = err.message || "An unexpected error occurred";
  }

  return (
    <>
      <TrendingSchema trendAll={trendingAll} trendingFirst={trendingFirst} />
      <TrendingClient trendAll={trendingAll} trendingFirst={trendingFirst} loading={false} error={error} />
    </>
  )
}
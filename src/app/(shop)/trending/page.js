import React from 'react'
import TrendingClient from '../Components/Trending/TrendingClient'
import trendingService from '@/services/trending.service'

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
    <TrendingClient trendAll={trendingAll} trendingFirst={trendingFirst} loading={false} error={error} />
  )
}
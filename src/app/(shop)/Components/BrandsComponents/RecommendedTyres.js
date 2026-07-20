'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiZap } from 'react-icons/fi';
import Carousel from '@/components/organisms/Carousel';
import TyreCard from '@/components/atoms/TyreCard';
import tyresService from '@/services/tyresService';
import TyreCardSkelton from '@/components/atoms/TyreCardSkelton';

export default function RecommendedTyres({ brandId, primaryColor = '#f97316' }) {
  const [recommendedTyres, setRecommendedTyres] = useState([]);
  const [isLoadingTyres, setIsLoadingTyres] = useState(true);
  const loadingRef = useRef(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTyres = async (currentPage) => {
    try {
      loadingRef.current = true;
      setIsLoadingTyres(true);
      const res = await tyresService.getRecommandation({
        brandId,
        limit: 10,
        page: currentPage
      });
      if (res?.success) {
        const newTyres = res.data || [];
        setRecommendedTyres(prev => currentPage === 1 ? newTyres : [...prev, ...newTyres]);

        const totalPages = res.pagination?.totalPages || 1;
        setHasMore(currentPage < totalPages);
      } else {
        if (currentPage === 1) setRecommendedTyres(res?.data || []);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch recommended tyres", error);
    } finally {
      loadingRef.current = false;
      setIsLoadingTyres(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      fetchTyres(page);
    }
  }, [brandId, page]);

  const handleReachEnd = () => {
    if (hasMore && !loadingRef.current) {
      setPage(prev => prev + 1);
    }
  };

  if (recommendedTyres.length === 0 && !isLoadingTyres) return null;

  if (recommendedTyres.length === 0 && isLoadingTyres) {
    return (
      <div className="pt-4 lg:p-6 lg:rounded-xl lg:bg-zinc-900/40 border-t lg:border border-white/5 lg:backdrop-blur-md lg:shadow-xl space-y-5">
        <div className="flex items-center gap-3 lg:border-b lg:border-white/10 lg:pb-4 animate-pulse">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10"></div>
          <div className="space-y-2">
            <div className="h-3 w-24 bg-white/10 rounded-md"></div>
            <div className="h-2 w-32 bg-white/5 rounded-md"></div>
          </div>
        </div>
        <div className="relative flex gap-4 overflow-hidden animate-pulse">
          <div className="w-[280px] h-[360px] shrink-0 bg-white/5 rounded-[2rem] border border-white/5"></div>
          <div className="w-[280px] h-[360px] shrink-0 bg-white/5 rounded-[2rem] border border-white/5 hidden md:block"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 lg:p-6 lg:rounded-xl lg:bg-zinc-900/40 border-t lg:border border-white/5 lg:backdrop-blur-md lg:shadow-xl space-y-5">
      <div className="flex items-center gap-3 lg:border-b lg:border-white/10 lg:pb-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(to bottom right, ${primaryColor}33, ${primaryColor}1A)`,
            boxShadow: `0 0 0 1px ${primaryColor}4D, 0 0 14px ${primaryColor}26`
          }}
        >
          <FiZap size={18} style={{ color: primaryColor }} />
        </div>
        <div>
          <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Recommended
          </h2>
          <p className="text-zinc-500 text-[10px] mt-0.5">
            Top picks for this brand
          </p>
        </div>
      </div>
      <div className="relative">
        <Carousel
          items={recommendedTyres}
          itemWidth="w-[280px] md:w-[300px] lg:w-[350px]"
          renderItem={(tyre) => (
              <TyreCard product={tyre} />
          )}
          gap={16}
          showArrows={true}
          onReachEnd={handleReachEnd}
        />
      
      </div>
    </div>
  );
}

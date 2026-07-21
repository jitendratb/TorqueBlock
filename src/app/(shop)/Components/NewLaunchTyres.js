'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiLayers } from 'react-icons/fi';
import Carousel from '@/components/organisms/Carousel';
import ProductFamilyCard from '@/components/atoms/ProductFamilyCard';
import tyresService from '@/services/tyresService';
import { TyreCardSkeletonGroup } from '@/app/(home)/component/Tyre/TyreCardSkeleton';

export default function TyreSection({ categoryId, brandId, isNewLaunch, isBestSeller, isFeatured, title = "Available Products", subtitle = "Explore all products", primaryColor = '#f97316' }) {
  const [tyres, setTyres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTyres = async (currentPage) => {
    try {
      loadingRef.current = true;
      setIsLoading(true);
      const res = await tyresService.getTyreByFamily({
        brandId,
        categoryId,
        isNewLaunch,
        isBestSeller,
        isFeatured,
        limit: 16,
        page: currentPage
      });
      if (res?.success) {
        const newTyres = res.data || [];
        setTyres(prev => currentPage === 1 ? newTyres : [...prev, ...newTyres]);

        const totalPages = res.pagination?.totalPages || 1;
        setHasMore(currentPage < totalPages);
      } else {
        if (currentPage === 1) setTyres(res?.data || res || []);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch Section tyres", error);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTyres(page);
  }, [brandId, categoryId, isNewLaunch, isBestSeller, isFeatured, page]);

  const handleReachEnd = () => {
    if (hasMore && !loadingRef.current) {
      setPage(prev => prev + 1);
    }
  };

  if (tyres.length === 0 && !isLoading) return null;

  if (tyres.length === 0 && isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 lg:border-b lg:border-white/10 lg:pb-4 animate-pulse">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10"></div>
          <div className="space-y-2">
            <div className="h-3 w-32 bg-white/10 rounded-md"></div>
            <div className="h-2 w-48 bg-white/5 rounded-md"></div>
          </div>
        </div>
        <TyreCardSkeletonGroup count={4} />
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 lg:border-b lg:border-white/10 lg:pb-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(to bottom right, ${primaryColor}33, ${primaryColor}1A)`,
            boxShadow: `0 0 0 1px ${primaryColor}4D, 0 0 14px ${primaryColor}26`
          }}
        >
          <FiLayers size={18} style={{ color: primaryColor }} />
        </div>
        <div>
          <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-zinc-500 text-[10px] mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="relative">
        <Carousel
          items={tyres}
          itemWidth="w-[280px] md:w-[300px]"

          renderItem={(tyre) => {
            return (
              <ProductFamilyCard tyre={tyre} />
            )
          }}
          gap={16}
          showArrows={true}
          onReachEnd={handleReachEnd}
        />
      </div>
    </div>
  );
}

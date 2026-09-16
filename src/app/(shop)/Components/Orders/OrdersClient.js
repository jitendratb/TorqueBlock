"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import useOrderStore from '@/stores/orderStore';
import useAuthStore from '@/stores/authStore';
import { useToast } from '@/context/ToastContext';
import OrderCard from './OrderCard';
import OrderSkeleton from './OrderSkeleton';
import OrderStatCard from './OrderStatCard';
import OrderTabs from './OrderTabs';
import InfiniteScroll from '@/components/atoms/InfiniteScroll';
import Login from '@/components/organisms/login';
import orderService from '@/services/orderService';
import { CgSpinner } from 'react-icons/cg';
import {
  IoReceiptOutline,
  IoPulseOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoBagHandleOutline,
  IoSearchOutline,
  IoCloseOutline,
} from 'react-icons/io5';

export default function OrdersClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [isLoginDismissed, setIsLoginDismissed] = useState(false);
  const isLoginOpen = !isAuthenticated && !isLoginDismissed;
  const isInitialMount = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchOrders = useCallback(
    async (targetPage, isAppend = false, searchVal = debouncedSearch, statusVal = activeTab) => {
      if (isAppend) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const response = await orderService.getOrderHistory(targetPage, limit, searchVal, statusVal);
        if (response?.success) {
          setOrders((prev) => {
            if (!isAppend || !prev?.orders) {
              return response;
            }
            const existingIds = new Set(prev.orders.map((o) => o._id));
            const incomingOrders = response.orders || [];
            const newOrders = incomingOrders.filter((o) => !existingIds.has(o._id));

            return {
              ...response,
              orders: [...prev.orders, ...newOrders],
              statusStats: response.statusStats || prev.statusStats,
            };
          });
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit, debouncedSearch, activeTab]
  );

  // Refetch on auth, tab change, or debounced search change
  useEffect(() => {
    if (!isAuthenticated) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Skip redundant initial fetch if server already provided initial orders
      if (initialOrders?.orders && initialOrders.orders.length > 0 && !debouncedSearch && !activeTab) {
        return;
      }
    }

    setPage(1);
    fetchOrders(1, false, debouncedSearch, activeTab);
  }, [isAuthenticated, debouncedSearch, activeTab, fetchOrders, initialOrders]);

  // Check if more pages exist
  const hasMore = useMemo(() => {
    if (!orders?.pagination) return false;
    const { currentPage, totalPages, total } = orders.pagination;
    const currentCount = orders.orders?.length || 0;
    if (typeof total === 'number' && currentCount >= total) return false;
    if (typeof totalPages === 'number' && currentPage >= totalPages) return false;
    return Boolean(totalPages && currentPage < totalPages);
  }, [orders]);

  // Load next page
  const handleLoadMore = useCallback(() => {
    if (!loading && !loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage, true, debouncedSearch, activeTab);
    }
  }, [loading, loadingMore, hasMore, page, fetchOrders, debouncedSearch, activeTab]);

  const statCards = useMemo(() => {
    const stats = orders?.statusStats?.[0];
    const totalOrders = stats
      ? (stats.pending || 0) + (stats.confirmed || 0) + (stats.delivered || 0) + (stats.cancelled || 0)
      : (orders?.pagination?.total || 0);

    return [
      { id: '', label: 'All Orders', value: totalOrders > 0 ? `${totalOrders}` : "0", icon: IoReceiptOutline, color: 'orange' },
      { id: 'pending', label: 'Pending', value: stats?.pending ?? "0", icon: IoPulseOutline, color: 'blue' },
      { id: 'confirmed', label: 'Confirmed', value: stats?.confirmed ?? "0", icon: IoCheckmarkCircleOutline, color: 'emerald' },
      { id: 'cancelled', label: 'Cancelled', value: stats?.cancelled ?? "0", icon: IoCloseCircleOutline, color: 'rose' },
    ];
  }, [orders]);

  if (!isAuthenticated && (!orders || (Array.isArray(orders) && orders.length === 0) || !orders?.orders?.length)) {
    return (
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginDismissed(true)} />
    );
  }

  if (Array.isArray(orders) && orders.length === 0) {
    return (
      <div className="space-y-4 pt-2">
        <OrderSkeleton />
      </div>
    );
  }

  const orderList = orders?.orders || (Array.isArray(orders) ? orders : []);

  return (
    <div className="space-y-4 py-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((card, idx) => (
          <OrderStatCard key={idx} {...card} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white/5 border border-white/10 p-2 md:p-2.5 rounded-2xl backdrop-blur-xl">
        <OrderTabs
          tabs={statCards}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        <div className="relative w-full md:w-72 shrink-0">
          <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order, tyre, tracking #..."
            className="w-full pl-9 pr-8 py-2 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-orange-500/50 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5"
              aria-label="Clear search"
            >
              <IoCloseOutline className="text-sm" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <OrderSkeleton />
      ) : orderList.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center text-zinc-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
            <IoBagHandleOutline className="text-2xl text-orange-500/70" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">No Orders Found</h3>
            <p className="text-xs text-zinc-400 max-w-[240px] leading-relaxed">
              {search.trim()
                ? "We couldn't find any orders matching your search query. Try another term."
                : `You don't have any orders in the "${activeTab || 'All Orders'}" category yet.`}
            </p>
          </div>
          {search ? (
            <button
              onClick={() => setSearch('')}
              className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all cursor-pointer"
            >
              Clear Search
            </button>
          ) : (
            <Link
              href="/tyres"
              className="px-7 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)]"
            >
              Explore Tyres
            </Link>
          )}
        </div>
      ) : (
        <InfiniteScroll
          hasMore={hasMore}
          loading={loadingMore}
          onLoadMore={handleLoadMore}
          loader={
            <div className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-400 text-xs font-semibold shadow-lg">
              <CgSpinner className="animate-spin text-base text-orange-500" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-300">
                Loading more orders...
              </span>
            </div>
          }
          endMessage={
            orderList.length > 5 ? (
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 py-3 text-center">
                You have reached the end of your orders
              </p>
            ) : null
          }
        >
          <div className="space-y-4">
            {orderList.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

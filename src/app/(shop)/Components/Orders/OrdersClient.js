"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useOrderStore from '@/stores/orderStore';
import useAuthStore from '@/stores/authStore';
import { useToast } from '@/context/ToastContext';
import OrderCard from './OrderCard';
import CancelOrderModal from './CancelOrderModal';
import OrderSkeleton from './OrderSkeleton';
import Login from '@/components/organisms/login';
import { IoLockClosedOutline, IoSearchOutline, IoReceiptOutline, IoPulseOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoBagHandleOutline } from 'react-icons/io5';

export default function OrdersClient() {
  const router = useRouter();
  const toast = useToast();
  const { isAuthenticated } = useAuthStore();
  const { orders, loading, error, fetchOrderHistory, cancelOrder } = useOrderStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [cancelOrderId, setCancelOrderId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrderHistory(1, 20);
    }
  }, [isAuthenticated, fetchOrderHistory]);

  const handleCancelConfirm = useCallback(async (orderId, note) => {
    const result = await cancelOrder(orderId, note);
    if (result?.success) {
      toast.success('Order cancelled successfully.');
    } else {
      toast.error(result?.message || 'Failed to cancel the order. Please try again.');
      throw new Error(result?.message || 'Cancellation failed');
    }
  }, [cancelOrder, toast]);

  const stats = useMemo(() => {
    const total = orders.length;
    let active = 0;
    let completed = 0;
    let cancelled = 0;

    orders.forEach(order => {
      const status = (order.orderStatus || 'pending').toLowerCase();
      if (status === 'delivered') {
        completed++;
      } else if (status === 'cancelled' || status === 'failed') {
        cancelled++;
      } else {
        active++;
      }
    });

    return { total, active, completed, cancelled };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const status = (order.orderStatus || 'pending').toLowerCase();
      if (activeTab === 'active') {
        if (['delivered', 'cancelled', 'failed', 'returned'].includes(status)) return false;
      } else if (activeTab === 'completed') {
        if (status !== 'delivered') return false;
      } else if (activeTab === 'cancelled') {
        if (!['cancelled', 'failed', 'returned'].includes(status)) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const orderIdMatches = order._id?.toLowerCase().includes(query);
        const itemMatches = order.items?.some(item =>
          item.productName?.toLowerCase().includes(query) ||
          item.size?.toLowerCase().includes(query)
        );
        return orderIdMatches || itemMatches;
      }

      return true;
    });
  }, [orders, activeTab, searchQuery]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 border border-white/5 rounded-2xl p-4.5 backdrop-blur-xl flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Total Orders</span>
            <span className="text-xl font-black text-white">{stats.total}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <IoReceiptOutline className="text-lg" />
          </div>
        </div>

        <div className="bg-white/10 border border-white/5 rounded-2xl p-4.5 backdrop-blur-xl flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Active Items</span>
            <span className="text-xl font-black text-white">{stats.active}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <IoPulseOutline className="text-lg" />
          </div>
        </div>

        <div className="bg-white/10 border border-white/5 rounded-2xl p-4.5 backdrop-blur-xl flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Completed</span>
            <span className="text-xl font-black text-white">{stats.completed}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <IoCheckmarkCircleOutline className="text-lg" />
          </div>
        </div>

        <div className="bg-white/10 border border-white/5 rounded-2xl p-4.5 backdrop-blur-xl flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Cancelled</span>
            <span className="text-xl font-black text-white">{stats.cancelled}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <IoCloseCircleOutline className="text-lg" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/10 border border-white/5 p-4 rounded-2xl backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">

        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer select-none ${activeTab === tab.id
                  ? 'bg-white/10 text-white border border-white/10 shadow-[0_2px_10px_rgba(255,255,255,0.05)]'
                  : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <OrderSkeleton />
      ) : error ? (
        <div className="text-center py-12 bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 text-rose-400">
          <p className="text-xs font-bold uppercase tracking-wider">Error Fetching Orders</p>
          <p className="text-xs text-rose-300/80 mt-1">{error}</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white/10 border border-white/5 rounded-3xl backdrop-blur-xl max-w-md mx-auto gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
          <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
            <IoBagHandleOutline className="text-2xl text-orange-500/70" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">No Orders Found</h3>
            <p className="text-xs text-zinc-400 max-w-[240px] leading-relaxed">
              {searchQuery.trim()
                ? 'We couldn\'t find any orders matching your search query. Try another term.'
                : `You don't have any orders in the "${activeTab}" category yet.`}
            </p>
          </div>
          <Link
            href="/tyres"
            className="px-7 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)]"
          >
            Explore Tyres
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <OrderCard
              key={order._id}
              order={order}
              onCancelClick={setCancelOrderId}
            />
          ))}
        </div>
      )}

      <CancelOrderModal
        isOpen={cancelOrderId !== null}
        orderId={cancelOrderId}
        onClose={() => setCancelOrderId(null)}
        onConfirm={handleCancelConfirm}
      />

    </div>
  );
}

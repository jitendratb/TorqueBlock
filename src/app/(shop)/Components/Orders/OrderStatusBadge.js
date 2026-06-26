import React from 'react';

export default function OrderStatusBadge({ status }) {
  const normalizedStatus = (status || 'pending').toLowerCase();

  let styles = {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
    label: 'Pending',
  };

  switch (normalizedStatus) {
    case 'confirmed':
      styles = {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        dot: 'bg-blue-400',
        label: 'Confirmed',
      };
      break;
    case 'processing':
      styles = {
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30',
        text: 'text-indigo-400',
        dot: 'bg-indigo-400',
        label: 'Processing',
      };
      break;
    case 'shipped':
      styles = {
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        dot: 'bg-violet-400',
        label: 'Shipped',
      };
      break;
    case 'out_for_delivery':
      styles = {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        dot: 'bg-purple-400',
        label: 'Out For Delivery',
      };
      break;
    case 'delivered':
      styles = {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400',
        label: 'Delivered',
      };
      break;
    case 'cancelled':
      styles = {
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        dot: 'bg-rose-400',
        label: 'Cancelled',
      };
      break;
    case 'returned':
      styles = {
        bg: 'bg-zinc-500/10',
        border: 'border-zinc-500/30',
        text: 'text-zinc-400',
        dot: 'bg-zinc-400',
        label: 'Returned',
      };
      break;
    case 'failed':
      styles = {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        dot: 'bg-red-400',
        label: 'Failed',
      };
      break;
    default:
      // default is pending
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${styles.bg} ${styles.border} ${styles.text} shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`} />
      {styles.label}
    </span>
  );
}

import React from 'react';
import {
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoSyncOutline,
  IoRocketOutline,
  IoCubeOutline,
  IoBicycleOutline,
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
  IoArrowUndoOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';

const STATUS_CONFIGS = {
  pending: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: IoTimeOutline,
    label: 'Pending',
  },
  confirmed: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: IoCheckmarkCircleOutline,
    label: 'Confirmed',
  },
  processing: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    icon: IoSyncOutline,
    label: 'Processing',
  },
  in_transit: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    icon: IoRocketOutline,
    label: 'In Transit',
  },
  shipped: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    icon: IoCubeOutline,
    label: 'Shipped',
  },
  out_for_delivery: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    icon: IoBicycleOutline,
    label: 'Out For Delivery',
  },
  delivered: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    icon: IoCheckmarkDoneCircleOutline,
    label: 'Delivered',
  },
  cancelled: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    icon: IoCloseCircleOutline,
    label: 'Cancelled',
  },
  returned: {
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/30',
    text: 'text-zinc-400',
    icon: IoArrowUndoOutline,
    label: 'Returned',
  },
  failed: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: IoAlertCircleOutline,
    label: 'Failed',
  },
};

export default function OrderStatusBadge({ status }) {
  const normalizedStatus = (status || 'pending').toLowerCase().trim().replace(/\s+/g, '_');
  const matched = STATUS_CONFIGS[normalizedStatus];
  const styles = matched || {
    ...STATUS_CONFIGS.pending,
    label: status ? String(status).replace(/_/g, ' ') : 'Pending',
  };

  const Icon = styles.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${styles.bg} ${styles.border} ${styles.text} shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
      {Icon && <Icon className="text-xs shrink-0" />}
      {styles.label}
    </span>
  );
}

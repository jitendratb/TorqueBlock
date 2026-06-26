"use client";

import React, { useState, useEffect } from 'react';
import Model from '@/components/organisms/CustomModel';
import { CgSpinner } from 'react-icons/cg';
import { IoWarningOutline } from 'react-icons/io5';

export default function CancelOrderModal({ isOpen, orderId, onClose, onConfirm }) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setNote('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNote(value);
    
    if (value.trim().length === 0) {
      setError('Cancellation reason is required.');
    } else if (value.trim().length < 10) {
      setError(`Reason is too short. Please write at least ${10 - value.trim().length} more characters.`);
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (note.trim().length < 10) {
      setError('A cancellation reason of at least 10 characters is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(orderId, note.trim());
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to cancel the order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNoteValid = note.trim().length >= 10;

  return (
    <Model
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Order"
      subtitle="This action will request cancellation of your order."
      themeGlow="red"
      size="md"
      closeOnBackdropClick={!isSubmitting}
      showCloseButton={!isSubmitting}
    >
      <form onSubmit={handleSubmit} className="space-y-5 px-1">
        {/* Warning Banner */}
        <div className="flex gap-3 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 text-rose-400">
          <IoWarningOutline className="text-2xl shrink-0" />
          <div className="text-xs space-y-1">
            <p className="font-black uppercase tracking-wider">Warning: Critical Action</p>
            <p className="text-rose-300/80 font-medium leading-relaxed">
              Once cancelled, this transaction cannot be reversed. If you paid using an online method (Razorpay), your refund process will be initiated in accordance with our return and refund policy.
            </p>
          </div>
        </div>

        {/* Reason Input */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Cancellation Reason <span className="text-rose-400">*</span>
            </label>
            <span className={`text-[10px] font-black uppercase tracking-wider ${isNoteValid ? 'text-emerald-400' : 'text-zinc-500'}`}>
              {note.trim().length} / Min 10 chars
            </span>
          </div>
          <textarea
            value={note}
            onChange={handleNoteChange}
            disabled={isSubmitting}
            placeholder="Please explain why you are cancelling this order (e.g. ordered wrong size, found better price, delayed shipping reason)..."
            className="w-full min-h-[120px] px-4 py-3 rounded-xl text-sm bg-zinc-950/60 border border-white/5 focus:border-rose-500/50 text-white placeholder-zinc-600 focus:outline-none transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            required
          />
          {error ? (
            <p className="text-[10.5px] font-bold text-rose-400 mt-1 uppercase tracking-wider">
              {error}
            </p>
          ) : (
            <p className="text-[10.5px] font-semibold text-zinc-500 mt-1 uppercase tracking-wider">
              Provide a detailed reason to help us speed up your refund approval.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-white/5 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 transition-all cursor-pointer"
          >
            Go Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isNoteValid}
            className="px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-[0_0_25px_rgba(239,68,68,0.15)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:border-white/5 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <CgSpinner className="animate-spin text-sm" />
                Cancelling...
              </>
            ) : (
              'Confirm Cancellation'
            )}
          </button>
        </div>
      </form>
    </Model>
  );
}

"use client";

import React, { useEffect, useCallback } from 'react';
import { FaXmark } from 'react-icons/fa6';

const Model = ({ isOpen = false, onClose, title, subtitle, children, footer, size = 'md', closeOnBackdropClick = true, showCloseButton = true, className = '', bodyClassName = '', headerClassName = '', footerClassName = '', themeGlow = 'orange' }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose?.();
    }
  }, [closeOnBackdropClick, onClose]);

  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-[95vw] md:max-w-[90vw] h-[90vh]'
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;

  const glowClasses = {
    orange: 'bg-orange-500/5 shadow-[0_0_50px_rgba(249,115,22,0.03)]',
    purple: 'bg-purple-500/5 shadow-[0_0_50px_rgba(139,92,246,0.03)]',
    cyan: 'bg-cyan-500/5 shadow-[0_0_50px_rgba(6,182,212,0.03)]',
    green: 'bg-emerald-500/5 shadow-[0_0_50px_rgba(16,185,129,0.03)]',
    none: ''
  };

  const selectedGlowClass = glowClasses[themeGlow] || glowClasses.orange;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div
        onClick={handleBackdropClick}
        className={`absolute inset-0 bg-white/05 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={typeof title === 'string' ? 'modal-title' : undefined}
        className={`relative w-full ${selectedSizeClass} max-h-[85vh] rounded-xl bg-white/10 backdrop-blur-3xl border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] flex flex-col z-[101] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          } ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-cyan-500/[0.02] to-orange-500/[0.03] opacity-80 pointer-events-none mix-blend-screen" />

        {themeGlow !== 'none' && (
          <>
            <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[80px] pointer-events-none ${selectedGlowClass}`} />
            <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[80px] pointer-events-none ${selectedGlowClass}`} />
          </>
        )}

        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        {(title || showCloseButton) && (
          <div className={`relative flex items-start justify-between px-4 py-3 border-b border-white/[0.06] shrink-0 z-10 ${headerClassName}`}>
            <div className="flex flex-col gap-1 min-w-0 pr-6">
              {title && (
                <div id="modal-title" className="text-sm font-black uppercase tracking-widest text-white truncate">
                  {typeof title === 'string' ? title : title}
                </div>
              )}
              {subtitle && (
                <div className="text-[10px] font-medium tracking-wide text-zinc-400">
                  {subtitle}
                </div>
              )}
            </div>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300 hover:rotate-90 cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                <FaXmark className="w-4 h-4 text-current" />
              </button>
            )}
          </div>
        )}

        <div className={`relative flex-1 overflow-y-auto custom-scroll p-4 min-h-0 z-10 ${bodyClassName}`}>
          {children}
        </div>

        {footer && (
          <div className={`relative px-4 py-2 border-t border-white/[0.06] shrink-0 z-10 bg-black/10 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Model;

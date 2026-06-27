"use client";
import React, { useEffect, useCallback } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function Slider({ isOpen = false, onClose, title, children, size = 'sm', placement = 'right', className = '', footer = '' }) {

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
            const locks = parseInt(document.body.dataset.scrollLocks || '0', 10);
            if (locks === 0) {
                document.body.style.overflow = 'hidden';
            }
            document.body.dataset.scrollLocks = (locks + 1).toString();
            return () => {
                const currentLocks = parseInt(document.body.dataset.scrollLocks || '0', 10);
                const newLocks = Math.max(0, currentLocks - 1);
                document.body.dataset.scrollLocks = newLocks.toString();
                if (newLocks === 0) {
                    document.body.style.overflow = '';
                }
            };
        }
    }, [isOpen]);

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    }, [onClose]);

    const sizeClasses = {
        sm: 'w-[360px]',
        md: 'w-[460px]',
        lg: 'w-[640px]',
        xl: 'w-[800px]',
        full: 'w-screen'
    };

    const selectedSizeClass = sizeClasses[size] || sizeClasses.md;

    const placementClasses = {
        right: {
            container: 'justify-end',
            aside: `right-0 border-l border-white/[0.08] `,
            translate: isOpen ? 'translate-x-0' : 'translate-x-full'
        },
        left: {
            container: 'justify-start',
            aside: `left-0 border-r border-white/[0.08] `,
            translate: isOpen ? 'translate-x-0' : '-translate-x-full'
        }
    };

    const placementConfig = placementClasses[placement] || placementClasses.right;

    return (
        <div className={`fixed inset-0 z-[100] flex ${placementConfig.container} transition-all duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            aria-hidden={!isOpen}
        >
            <div
                onClick={handleBackdropClick}
                className={`absolute inset-0 bg-black/5 backdrop-blur-xs transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={typeof title === 'string' ? title : 'Sidebar Drawer'}
                className={`relative ${selectedSizeClass} max-w-[95vw] rounded-l-xl  h-full bg-zinc-950/10 backdrop-blur-3xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col z-[101] overflow-hidden ${placementConfig.aside} ${placementConfig.translate} ${className}`}
            >
    
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-cyan-500/[0.02] to-yellow-500/[0.03] opacity-80 pointer-events-none mix-blend-screen" />

                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/5 blur-[80px] pointer-events-none" />

                <div className="relative flex items-center justify-between px-4 py-4 border-b border-white/[0.06] shrink-0 z-10">
                    <div className="flex items-center gap-2 min-w-0">
                        {typeof title === 'string' ? (
                            <h3 className="text-sm font-black uppercase tracking-widest text-white truncate">
                                {title}
                            </h3>
                        ) : (
                            title
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300 hover:rotate-90 cursor-pointer"
                        aria-label="Close drawer"
                    >
                        <FaXmark className="w-4 h-4 text-current" />
                    </button>
                </div>

                <div className="relative flex-1 overflow-y-auto px-4 py-2 space-y-2 min-h-0 glass-prism-scrollbar z-10">
                    {children}
                </div>

                {footer && (
                    <div className="relative px-4 py-4 border-t border-white/[0.06] shrink-0  z-10">
                        {footer}
                    </div>
                )}
            </aside>
        </div>
    );
}
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setToasts(prevToasts => {
                if (prevToasts.length === 0) return prevToasts;
                let hasChanged = false;
                const updated = prevToasts.map(t => {
                    if (t.isHovered) return t;
                    const nextTime = t.remainingTime - 100;
                    if (nextTime <= 0) {
                        hasChanged = true;
                        return null;
                    }
                    hasChanged = true;
                    return { ...t, remainingTime: nextTime };
                }).filter(Boolean);

                return hasChanged ? updated : prevToasts;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const showToast = (message, type = 'info') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { 
            id, 
            message, 
            type, 
            remainingTime: 4000, 
            isHovered: false 
        }]);
    };

    const handleMouseEnter = (id) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, isHovered: true } : t));
    };

    const handleMouseLeave = (id) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, isHovered: false } : t));
    };

    const toast = {
        success: (msg) => showToast(msg, 'success'),
        error: (msg) => showToast(msg, 'error'),
        info: (msg) => showToast(msg, 'info'),
        warning: (msg) => showToast(msg, 'warning')
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-[300px] pointer-events-none">
                {toasts.map((toastItem) => (
                    <div
                        key={toastItem.id}
                        onMouseEnter={() => handleMouseEnter(toastItem.id)}
                        onMouseLeave={() => handleMouseLeave(toastItem.id)}
                        className="animate-toast-slide-in pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 text-white max-w-md w-full relative overflow-hidden group"
                    >
                        <div className="flex items-center gap-3 pl-1.5">
                            <div className={`p-1.5 rounded-xl ${
                                toastItem.type === 'success' ? 'bg-orange-500/20 text-orange-400' :
                                toastItem.type === 'error' ? 'bg-red-500/20 text-red-400' :
                                toastItem.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                                {toastItem.type === 'success' && <FiCheck className="text-base" />}
                                {toastItem.type === 'error' && <FiX className="text-base" />}
                                {toastItem.type === 'warning' && <FiAlertCircle className="text-base" />}
                                {toastItem.type === 'info' && <FiInfo className="text-base" />}
                            </div>
                            <div>
                                <p className="text-xs font-bold leading-normal text-zinc-200">{toastItem.message}</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setToasts(prev => prev.filter(t => t.id !== toastItem.id))}
                            className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
                        >
                            <FiX className="text-xs" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

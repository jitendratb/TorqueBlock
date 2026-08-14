import React from 'react';

export default function PaymentSkeleton() {
    return (
        <div className="bg-white/10 border border-white/5 rounded-xl p-4 backdrop-blur-xl space-y-4 animate-pulse">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <div className="w-5 h-5 rounded-md bg-white/10"></div>
                <div className="h-4 bg-white/10 rounded w-1/3"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-2/3"></div>
                        <div className="h-3 bg-white/10 rounded w-full"></div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-2/3"></div>
                        <div className="h-3 bg-white/10 rounded w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

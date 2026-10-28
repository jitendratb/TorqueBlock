import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function TbrnLoading() {
    return (
        <div className="min-h-screen pb-16 animate-pulse">
            <Breadcrumb items={[{ label: 'TBRN', isLast: true }]} />

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-10 md:px-10 md:py-16">
                <div className="h-2.5 w-56 rounded-full bg-orange-500/25" />
                <div className="mt-4 h-10 w-64 rounded-lg bg-zinc-800/70 md:h-14 md:w-[26rem]" />
                <div className="mt-2 h-10 w-56 rounded-lg bg-zinc-800/70 md:h-14 md:w-[30rem]" />
                <div className="mt-5 h-3 w-full max-w-xl rounded-full bg-white/10" />
                <div className="mt-2 h-3 w-4/5 max-w-md rounded-full bg-white/10" />
            </div>

            <div className="mt-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:grid-cols-[minmax(0,300px)_1fr] md:gap-6 md:p-4">
                        <div className="aspect-[16/9] rounded-xl bg-zinc-800/70 md:aspect-auto md:min-h-[220px]" />
                        <div>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 shrink-0 rounded-full bg-orange-500/25 md:h-14 md:w-14" />
                                <div className="flex-1">
                                    <div className="h-6 w-2/3 rounded-lg bg-zinc-800/70" />
                                    <div className="mt-2 h-3 w-full max-w-md rounded-full bg-white/10" />
                                </div>
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {[0, 1].map((box) => (
                                    <div key={box} className="h-28 rounded-xl bg-black/30" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

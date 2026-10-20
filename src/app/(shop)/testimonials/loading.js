import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import TestimonialCardSkeleton from '@/components/atoms/TestimonialCardSkeleton';

export default function TestimonialsLoading() {
    return (
        <div className="min-h-screen pb-16 animate-pulse">
            <Breadcrumb items={[{ label: 'Testimonials', isLast: true }]} />

            <div className="mt-6 flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-10 md:py-14">
                <div className="h-2.5 w-48 rounded-full bg-orange-500/25" />
                <div className="mt-3 h-9 w-60 rounded-lg bg-zinc-800/70 md:h-12 md:w-[22rem]" />
                <div className="mt-4 h-3 w-full max-w-xl rounded-full bg-white/10" />
                <div className="mt-2 h-3 w-4/5 max-w-md rounded-full bg-white/10" />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TestimonialCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import affiliateTestimonialService from '@/services/affiliateTestimonialService';
import TestimonialCard from '@/components/molecules/TestimonialCard';
import TestimonialMarquee from './TestimonialMarquee';

const HOME_LIMIT = 12;

async function AffiliateTestimonials() {
    const { testimonials, pagination } = await affiliateTestimonialService.getTestimonials({ limit: HOME_LIMIT });

    if (!testimonials.length) return null;

    const half = Math.ceil(testimonials.length / 2);
    const rows = testimonials.length >= 6
        ? [testimonials.slice(0, half), testimonials.slice(half)]
        : [testimonials];
    const total = pagination?.total;

    return (
        <div className="relative w-full">
            <div className='flex flex-col items-center text-center'>
                <div className='flex items-center gap-3'>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' />
                    <span className='text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000'>
                        From Our Community Riders
                    </span>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' />
                </div>

                <h2 className='text-2xl pt-2 md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter text-black transition-colors duration-1000'>
                   Our Community<span className='text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000'> Partners</span>
                </h2>
            </div>

            <div className="mt-6 space-y-2">
                {testimonials.length < 3 ? (
                    <div className="flex flex-wrap justify-center gap-5">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial._id} testimonial={testimonial} clamp className="w-full sm:w-[440px]" />
                        ))}
                    </div>
                ) : (
                    rows.map((row, i) => (
                        <TestimonialMarquee key={i} items={row} reverse={i === 1} />
                    ))
                )}
            </div>

            {/* <div className="mt-6 flex justify-center">
                <Link
                    href="/testimonials"
                    className="group inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-orange-500 transition-colors hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 [.light-mode_&]:text-orange-700"
                >
                    {total > testimonials.length ? `Read all ${total} rider stories` : 'Read all rider stories'}
                    <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div> */}
        </div>
    );
}

export default AffiliateTestimonials;

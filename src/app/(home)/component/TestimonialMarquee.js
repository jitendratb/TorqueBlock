import React from 'react';
import TestimonialCard from '@/components/molecules/TestimonialCard';

export const MARQUEE_CARD_CLASS = 'mr-5 w-[290px] shrink-0 sm:w-[380px] md:w-[440px]';

const MIN_CARDS_PER_LOOP = 6;
const SECONDS_PER_CARD = 9;

function fillRow(items) {
    if (!items.length) return [];
    const row = [...items];
    while (row.length < MIN_CARDS_PER_LOOP) row.push(...items);
    return row;
}

function TestimonialMarquee({ items, reverse = false }) {
    const row = fillRow(items);
    const cards = row.map((testimonial, i) => (
        <TestimonialCard key={`${testimonial._id}-${i}`} testimonial={testimonial} clamp className={MARQUEE_CARD_CLASS} />
    ));

    return (
        <div className="overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto">
            <div
                className="animate-marquee flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
                style={{
                    animationDuration: `${row.length * SECONDS_PER_CARD}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                <div className="flex shrink-0 items-stretch">{cards}</div>
                <div className="flex shrink-0 items-stretch motion-reduce:hidden" aria-hidden="true" inert>
                    {cards}
                </div>
            </div>
        </div>
    );
}

export default TestimonialMarquee;

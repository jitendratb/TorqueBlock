import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiChevronLeft, FiChevronRight, FiMessageCircle } from 'react-icons/fi';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import TestimonialCard from '@/components/molecules/TestimonialCard';
import affiliateTestimonialService from '@/services/affiliateTestimonialService';

const PAGE_SIZE = 12;
const TITLE = 'Rider Stories & Testimonials';
const DESCRIPTION = 'Real feedback from riders in the Torque Block affiliate community on performance motorcycle tyres, fitment, delivery and support across India.';

const toPage = (value) => {
    const page = parseInt(value, 10);
    return Number.isFinite(page) && page > 0 ? page : 1;
};

const pageHref = (page) => (page > 1 ? `/testimonials?page=${page}` : '/testimonials');

export async function generateMetadata({ searchParams }) {
    const page = toPage((await searchParams)?.page);
    const title = page > 1 ? `${TITLE} – Page ${page}` : TITLE;

    return {
        title,
        description: DESCRIPTION,
        alternates: {
            canonical: pageHref(page),
        },
        openGraph: {
            title: `${title} | Torque Block`,
            description: DESCRIPTION,
            url: pageHref(page),
            siteName: 'Torque Block',
            images: [{ url: '/main.jpg', width: 1200, height: 630 }],
            type: 'website',
        },
    };
}

function TestimonialsPager({ page, totalPages }) {
    if (!totalPages || totalPages <= 1) return null;

    const linkClass = 'inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500';

    return (
        <nav aria-label="Testimonials pages" className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-800/50 pt-6">
            {page > 1 ? (
                <Link href={pageHref(page - 1)} rel="prev" className={linkClass}>
                    <FiChevronLeft aria-hidden="true" /> Previous
                </Link>
            ) : <span />}

            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Page <span className="text-orange-500">{page}</span> / {totalPages}
            </span>

            {page < totalPages ? (
                <Link href={pageHref(page + 1)} rel="next" className={linkClass}>
                    Next <FiChevronRight aria-hidden="true" />
                </Link>
            ) : <span />}
        </nav>
    );
}

export default async function TestimonialsPage({ searchParams }) {
    const page = toPage((await searchParams)?.page);
    const { testimonials, pagination } = await affiliateTestimonialService.getTestimonials({ page, limit: PAGE_SIZE });

    if (page > 1 && pagination?.pages && page > pagination.pages) notFound();

    return (
        <>
            <WebPageSchema
                type="CollectionPage"
                title="Torque Block Rider Stories"
                description={DESCRIPTION}
                url="/testimonials"
            />
        <Breadcrumb items={[{ label: 'Testimonials', isLast: true }]} />
            <div className="flex-1 my-2">
        
                {testimonials.length > 0 ? (
                    <ul className=" grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <li key={testimonial._id}>
                                <TestimonialCard testimonial={testimonial} className="h-full" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-8 flex flex-col items-center rounded-[1.75rem] border border-dashed border-white/10 px-6 py-16 text-center">
                        <FiMessageCircle aria-hidden="true" className="h-8 w-8 text-orange-500" />
                        <p className="mt-4 text-lg font-bold text-white">Rider stories are on their way</p>
                        <p className="mt-1 max-w-md text-sm text-zinc-400">
                            Our affiliate riders are putting their tyres through their paces. Check back soon.
                        </p>
                        <Link
                            href="/tyres"
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-orange-500 transition-colors hover:bg-orange-500/10"
                        >
                            Browse tyres <FiChevronRight aria-hidden="true" />
                        </Link>
                    </div>
                )}

                <TestimonialsPager page={page} totalPages={pagination?.pages} />
            </div>
        </>
    );
}

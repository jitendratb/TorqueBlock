import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiLink, FiPlay, FiStar, FiUsers } from 'react-icons/fi';
import { FaCheckCircle, FaUser, FaUsers } from 'react-icons/fa';
import { MdGroups, MdTwoWheeler } from 'react-icons/md';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import TyresPageBanner from '../Components/TyresPageBanner';
import WebPageSchema from '@/components/seo/WebPageSchema';
import PartnersCarouselClient from '../Components/PartnersCarouselClient';
import JoinTbrnButton from '@/components/molecules/JoinTbrnButton';
import affiliateTestimonialService from '@/services/affiliateTestimonialService';

const PAGE_SIZE = 12;
const TITLE = 'Torque Block Riders Network (TBRN)';
const DESCRIPTION = 'Ways to work with Torque Block as a rider, creator or riding community: affiliate and referral partnerships, content collaborations, community partnerships and paid campaigns.';

// Card photos in public/tbrn are from Unsplash (free for commercial use under the Unsplash License):
// unsplash.com/photos/4_Y4GVX5HUQ, QEf3mq665qU, CtTm0jP2-rE and Fgd_jRPl41g
const WAYS_TO_WORK = [
    {
        title: 'Affiliate & Referral Partners',
        description: 'For riders, creators and community builders who can introduce relevant customers to Torque Block.',
        icon: FiLink,
        image: '/tbrn/affiliate-referral.jpg',
        imageAlt: 'Motorcycle rider silhouetted against a sunset',
        imageClassName: 'object-[45%_center]',
        youGet: ['Commission on eligible sales', 'Unique link or code', 'Special partner offers'],
        audienceGets: ['Genuine recommendations', 'Access to exclusive offers', 'Help choosing the right tyres'],
    },
    {
        title: 'Content Creators & Reviewers',
        description: 'For people who create useful motorcycle content like reviews, comparisons, explainers and riding stories.',
        icon: FiPlay,
        image: '/tbrn/content-creators.jpg',
        imageAlt: 'Video camera with a shotgun microphone recording on a tripod',
        imageClassName: 'object-center',
        youGet: ['Product support (tyres)', 'Paid collaboration opportunities', 'Early access to new products'],
        audienceGets: ['Honest reviews and real-world riding experiences', 'Useful tyre knowledge', 'Better buying decisions'],
    },
    {
        title: 'Riding Groups & Communities',
        description: 'For local riding groups, clubs, touring communities, online groups and forums.',
        icon: MdGroups,
        image: '/tbrn/riding-groups.jpg',
        imageAlt: 'Group of motorcycle riders riding together',
        imageClassName: 'object-center',
        youGet: ['Community partnership opportunities', 'Member offers', 'Event or ride support (where applicable)'],
        audienceGets: ['Exclusive member offers', 'Access to tyre information', 'Invites to rides, events and special activities'],
    },
    {
        title: 'Campaign & Product Collaborations',
        description: 'For selected creators and communities interested in paid campaigns, product-supported content, barter arrangements or a combination.',
        icon: FiStar,
        image: '/tbrn/product-collaborations.jpg',
        imageAlt: 'Close-up of a motorcycle tyre on an orange alloy wheel',
        imageClassName: 'object-[35%_center]',
        youGet: ['Paid campaign opportunities', 'Tyre or product support', 'Flexible collaboration options'],
        audienceGets: ['High-quality, in-depth content', 'Early access to new products', 'Useful riding and tyre information'],
    },
];

const toPage = (value) => {
    const page = parseInt(value, 10);
    return Number.isFinite(page) && page > 0 ? page : 1;
};

const pageHref = (page) => (page > 1 ? `/tbrn?page=${page}` : '/tbrn');

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

function BenefitList({ icon: Icon, label, items }) {
    return (
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-orange-500">
                <Icon aria-hidden="true" /> {label}
            </p>
            <ul className="space-y-1 mt-2 text-sm text-zinc-300">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <FaCheckCircle aria-hidden="true" className="mt-[3px] shrink-0 text-orange-500" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function WayToWorkCard({ way, eager = false }) {
    const Icon = way.icon;

    return (
        <article className="grid gap-4 rounded-2xl border border-white/10 bg-white/10 p-3 md:grid-cols-[minmax(0,300px)_1fr] md:gap-6 md:p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-auto md:min-h-[220px]">
                <Image
                    src={way.image}
                    alt={way.imageAlt}
                    fill
                    loading={eager ? 'eager' : undefined}
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={`object-cover ${way.imageClassName}`}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xl text-white shadow-lg shadow-orange-500/30 md:h-10 md:w-10 md:text-2xl">
                        <Icon aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold md:text-xl">{way.title}</h2>
                        <p className="text-sm text-zinc-400">{way.description}</p>
                    </div>
                    <JoinTbrnButton
                        source="tbrn_ways_to_work"
                        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-orange-500/40 p-2 text-xs font-bold uppercase tracking-widest text-orange-500 transition-colors hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:px-4"
                    >
                        <span className="sr-only sm:not-sr-only">Join TBRN</span>
                        <FiArrowRight aria-hidden="true" className="text-base" />
                    </JoinTbrnButton>
                </div>

                <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-2">
                    <BenefitList icon={FaUser} label="What you get" items={way.youGet} />
                    <BenefitList icon={FaUsers} label="Your audience gets" items={way.audienceGets} />
                </div>
            </div>
        </article>
    );
}

function PartnersPager({ page, totalPages }) {
    if (!totalPages || totalPages <= 1) return null;

    const linkClass = 'inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500';

    return (
        <nav aria-label="Partner pages" className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-800/50 pt-6">
            {page > 1 ? (
                <Link href={`${pageHref(page - 1)}#partners`} rel="prev" className={linkClass}>
                    <FiChevronLeft aria-hidden="true" /> Previous
                </Link>
            ) : <span />}

            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Page <span className="text-orange-500">{page}</span> / {totalPages}
            </span>

            {page < totalPages ? (
                <Link href={`${pageHref(page + 1)}#partners`} rel="next" className={linkClass}>
                    Next <FiChevronRight aria-hidden="true" />
                </Link>
            ) : <span />}
        </nav>
    );
}

export default async function TbrnPage({ searchParams }) {
    const page = toPage((await searchParams)?.page);
    const { testimonials: partners, pagination } = await affiliateTestimonialService.getTestimonials({ page, limit: PAGE_SIZE });

    if (page > 1 && pagination?.pages && page > pagination.pages) notFound();

    return (
        <>
            <WebPageSchema
                type="WebPage"
                title={TITLE}
                description={DESCRIPTION}
                url="/tbrn"
            />
            <Breadcrumb items={[{ label: 'TBRN', isLast: true }]} />

            <div className="mt-2">
                <TyresPageBanner
                    badge="Torque Block Riders Network"
                    title="Ways to Work with Torque Block"
                    description="Choose the option that fits you best. Whether you're a rider, creator or part of a riding community, there are many ways to collaborate and create value together."
                    badgeIcon={MdTwoWheeler}
                    mainIcon={MdGroups}
                    icon1={FiLink}
                    icon2={FiPlay}
                />
            </div>

            <div className="mt-6 space-y-4">
                {WAYS_TO_WORK.map((way, index) => (
                    // The first card's photo is the largest image above the fold
                    <WayToWorkCard key={way.title} way={way} eager={index === 0} />
                ))}
            </div>

            <section id="partners" aria-labelledby="partners-heading" className="mt-14 mb-10 scroll-mt-28">
                <p className="text-xs font-black uppercase  text-orange-500">Meet the TBRN Network</p>
                <h2 id="partners-heading" className="mt-2 mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">
                    Influencers & Affiliates
                </h2>

                {partners.length > 0 ? (
                    <PartnersCarouselClient partners={partners} />
                ) : (
                    <div className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-white/10 px-6 py-16 text-center">
                        <FiUsers aria-hidden="true" className="h-8 w-8 text-orange-500" />
                        <p className="mt-4 text-lg font-bold text-white">Our first partners are joining soon</p>
                        <p className="mt-1 max-w-md text-sm text-zinc-400">
                            Ride, create and grow with Torque Block. Be one of the first riders in the network.
                        </p>
                        <JoinTbrnButton
                            source="tbrn_partners"
                            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-orange-500/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-orange-500 transition-colors hover:bg-orange-500/10"
                        >
                            Become a TBRN Creator <FiChevronRight aria-hidden="true" />
                        </JoinTbrnButton>
                    </div>
                )}

                <PartnersPager page={page} totalPages={pagination?.pages} />
            </section>
        </>
    );
}

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TyreSection from '@/app/(home)/component/TyreSection';
import dynamic from 'next/dynamic';
const BrandsSection = dynamic(() => import('@/app/(home)/component/BrandsSection'), { ssr: true, loading: () => <div className="h-48 w-full animate-pulse bg-zinc-900 rounded-xl mt-4" /> });
import { BrandCardSkeletonGroup } from '@/app/(home)/component/BrandCardSkeleton';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import { FaChevronRight, FaFilter } from 'react-icons/fa';
import { FiZap, FiMap, FiShield, FiTarget, FiCompass } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import WebPageSchema from '@/components/seo/WebPageSchema';

export async function generateMetadata() {
  return {
    title: 'Premium Motorcycle Tyres | Torque Block',
    description: 'Shop the best premium motorcycle tyres online in India. Official partners for Pirelli, Michelin, Metzeler, Bridgestone, and more. Expert fitment support.',
    alternates: { canonical: 'https://torqueblock.com/tyres' },
    openGraph: {
      title: 'Premium Motorcycle Tyres | Torque Block',
      description: 'Shop the best premium motorcycle tyres online in India. Official partners for top brands.',
      url: 'https://torqueblock.com/tyres',
      siteName: 'Torque Block',
      type: 'website',
      images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
    },
  };
}

export default function TyresPage() {
    const breadcrumbItems = [
        { label: 'Tyres', isLast: true },
    ];

    const categories = [
        { name: "Sports", slug: "sports", icon: <FiZap /> },
        { name: "Touring", slug: "touring", icon: <FiMap /> },
        { name: "Cruiser", slug: "cruiser", icon: <FiShield /> },
        { name: "Off-Road", slug: "off-road", icon: <FiTarget /> },
        { name: "Adventure", slug: "adventure", icon: <FiCompass /> },
    ];

    const schemaItems = categories.map((cat) => ({
        name: cat.name,
        url: `/tyres?category=${cat.slug}`
    }));

    return (
        <>
        <WebPageSchema 
            type="CollectionPage"
            title="Premium Motorcycle Tyres Collection"
            description="Shop the best premium motorcycle tyres online in India. Official partners for top brands."
            url="/tyres"
            items={schemaItems}
        />
        <div className="space-y-16 pb-4">
            <div >
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.8)] group">
                <Image src="https://i.postimg.cc/GmGNLGtX/hero-road6.webp" alt="Premium Motorcycle Tyres" fill priority className="object-cover brightness-[0.5] transition-transform duration-[2s] group-hover:scale-110" />

                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

                <div className="absolute inset-0 z-20">
                    <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-orange-500/30" />
                    <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-orange-500/30" />

                    <div className="absolute top-12 left-12 flex flex-col gap-1">
                        <span className="text-[8px] font-black text-orange-500 uppercase tracking-[0.5em] animate-pulse">SYSTEM: ACTIVE</span>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">SPEC: PERFORMANCE_HUB_V2</span>
                    </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30">
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Elite Grade Selection</span>
                    </div>

                    <h1 className="text-5xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
                        THE <span className="text-orange-500 outline-text text-transparent">RUBBER</span> <br />
                        ROSTER
                    </h1>

                    <p className="text-zinc-400 max-w-2xl text-sm md:text-xl mb-12 font-medium italic opacity-80">
                        ENGINEERED FOR MAXIMUM ADHERENCE. SELECT YOUR COMPOUND BELOW.
                    </p>

                    <div className="group/btn relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full blur opacity-20 group-hover/btn:opacity-60 transition duration-1000 group-hover/btn:duration-200" />
                        <div className="relative min-w-[400px]">
                            <WhatsAppButton 
                                text="CLAIM FREE UPGRADE PLAN" 
                                value="Hey Torque Block! I'm looking to upgrade my tyres. Can I get my free Performance Fitment Plan to see what compounds match my riding style?" 
                                className='h-14'
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-10 px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full w-fit">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">Sort by DNA</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                            Shop by <span className="text-zinc-700">Category</span>
                        </h2>
                    </div>
                    <Link href="/search?q=tyres" className="group flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-orange-500/50 hover:text-white transition-all">
                        Launch Advanced Filters <FaFilter className="text-xs group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {categories?.map((cat, idx) => (
                        <Link
                            key={cat.slug}
                            href={`/search?q=${cat.slug}`}
                            className="group relative flex flex-col items-center justify-center p-10 bg-zinc-950 border border-zinc-900 rounded-[2rem] hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all" />
                            <span className="text-4xl md:text-5xl mb-6 text-zinc-600 group-hover:text-orange-500 transform group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0)] group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                                {cat.icon}
                            </span>

                            <span className="relative z-10 text-[10px] md:text-xs font-black text-zinc-500 group-hover:text-white transition-colors uppercase tracking-[0.3em] text-center">
                                {cat.name}
                            </span>

                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-zinc-900 group-hover:border-orange-500/30 transition-colors" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-zinc-900 group-hover:border-orange-500/30 transition-colors" />
                        </Link>
                    ))}
                </div>
            </section>

            <div className="space-y-24">
                <div className="relative">
                    <div className="absolute inset-0 pointer-events-none" />
                    <TyreSection />
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-900">
                <div className="text-center mb-4 space-y-4">
                    <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em]">Global Partners</span>
                    <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">THE <span className="outline-text text-transparent">ALLIANCE</span></h3>
                </div>
                <Suspense fallback={<BrandCardSkeletonGroup count={3} />}>
                    <BrandsSection />
                </Suspense>
            </div>
        </div>
        </>
    );
}
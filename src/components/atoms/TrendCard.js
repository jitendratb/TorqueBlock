import React from 'react'
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getCategoryPreset } from '@/app/(home)/component/performanceBrandPresets';
import CustomImage from '../molecules/CustomImage';

function TrendCard({ item, className = "w-full" }) {
    const productName = item?.productId?.productName || item?.name || 'Performance Tyre';
    const heroImage = item?.image || item?.bannerImage || '/placeholder.jpg';
    const categoryName = item?.productId?.categoryId?.name || item?.category || 'Premium';
    const { Icon: CategoryIcon, label: categoryLabel } = getCategoryPreset(categoryName);

    return (
        <Link
            href={`/trending/${item?.slug}`}
            className={`group relative block h-[380px] lg:h-[420px] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:-translate-y-1 ${className}`}
        >
            <CustomImage
                src={heroImage}
                alt={productName}
                fill
                priority={false}
                imageClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                className="absolute inset-0"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0)_0%,rgba(5,7,11,0.12)_0%,rgba(5,7,11,0.78)_60%,rgba(5,7,11,0.94)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 space-y-3">
                <div className="flex items-center justify-start gap-1">
                    <div className="h-auto w-16">
                        <CustomImage src={item?.bike?.bikeId?.brandId?.brandLogo} alt={productName} />
                    </div>

                    <h3 className="text-lg font-black leading-[1.05] text-white drop-shadow-md sm:text-sm"> {item?.bike?.bikeId?.brandId?.brandName} <span>{item?.bike?.bikeId?.modelName}</span> </h3>
                </div>



                <div className="flex items-center justify-start">
                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
                        <CategoryIcon className="h-3.5 w-3.5 text-orange-400" />
                        {categoryLabel}
                    </span>
                </div>

                <h1 className="font-black leading-[1.05] text-xl drop-shadow-md">
                    <span className="text-white">{item?.productId?.productName?.split(' ')?.[0]}</span>{' '}
                    <span className="text-orange-500">{item?.productId?.productName?.split(' ')?.slice(1).join(' ')}</span>
                </h1>
                <p className="line-clamp-2 max-w-[90%] text-[13px] leading-relaxed font-semibold text-white/70">
                    {item?.shortDescription}
                </p>

                <div className="flex items-end justify-between gap-4">
                    <button className="flex justify-center backdrop-blur-sm w-full items-center gap-2.5 rounded-xl border border-orange-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                        View Tyre
                        <FiArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default TrendCard
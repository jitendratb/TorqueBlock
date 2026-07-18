import React from 'react'
import Link from 'next/link';
import { FiTrendingUp, FiTrendingDown, FiEye, FiHeart, FiActivity } from 'react-icons/fi';
import CustomImage from '../molecules/CustomImage';

function TrendCard({ item, className = "w-full md:w-[320px] lg:w-[360px]" }) {
    const currentScore = typeof item?.trendScore === 'object' ? item.trendScore?.totalScore || 0 : item?.trendScore || 0;
    const isTrendingUp = currentScore >= (item?.previousScore || 0);

    return (
        <Link href={`/trending/${item?.slug}`} className={`group relative h-[280px] rounded-[2.5rem] block shrink-0 overflow-hidden cursor-pointer ${className}`}>
            <CustomImage
                src={item?.bannerImage || item?.image || '/placeholder.jpg'}
                alt={item?.name || 'Trending Tyre'}
                fill
                imageClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
         

            <div className="absolute bottom-0 inset-x-0 p-4 z-20 flex flex-col justify-end space-y-2">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em]  shadow-xl">
                        <FiActivity className="text-orange-500" size={12} />
                        {item?.bike?.bikeBrand?.brandName} {item?.bike?.bikeModel}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter transform translate-y-7 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-orange-500">{item?.productId?.productName.split(' ')?.[0]} </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">{` `} {item?.productId?.productName.split(' ').slice(1).join(' ')}</span>
                </h3>

                <p className="text-zinc-400 text-xs font-medium italic transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-150 line-clamp-2">
                    "{item?.shortDescription || 'Experience the best trending tyres for your vehicle.'}"
                </p>


                <div className="flex items-center gap-4 transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                    <div className="flex items-center gap-3 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        <div className="p-2 bg-white/5 rounded-full">
                            <FiEye className="text-xs" />
                        </div>
                        <span className="text-sm font-bold">{(item?.totalViews || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-500 group-hover:text-red-400 transition-colors">
                        <div className="p-2 bg-white/5 rounded-full group-hover:bg-red-500/10 transition-colors">
                            <FiHeart className="text-xs" />
                        </div>
                        <span className="text-sm font-bold">{(item?.totalClicks || 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TrendCard
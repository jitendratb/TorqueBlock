'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongRight, HiFire } from 'react-icons/hi2';


export default function BlogCard({ blog, size = 'standard', index = 0 }) {
    if (!blog) return null;

    const { image, header, subHeader, category, blogid } = blog;
    const categoryName = category?.category ?? 'General';
    const slug = blogid?.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const isFeatured = size === 'featured';

    const delayClass = ['animation-delay-0', '[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]', '[animation-delay:320ms]', '[animation-delay:400ms]',][Math.min(index, 5)];

    return (
        <Link
            href={`/blogs/${slug}`}
            aria-label={`Read blog: ${header}`}
            className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gray-900/70 border border-white/[0.07] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 ${isFeatured ? 'col-span-2 max-md:col-span-1' : ''}    cursor-pointer no-underline text-inherit`}
        >
            <div className={`relative w-full overflow-hidden bg-[#0B0F19] ${isFeatured ? 'h-[280px] md:min-h-[325px]' : 'min-h-[200px]'} `}>
                {image ? (
                    <Image
                        src={image}
                        alt={header ?? 'Blog cover'}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-106"
                        priority={index < 3}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-orange-500/40 text-3xl font-black tracking-widest font-[Inter,sans-serif]">
                        TB
                    </div>
                )}

                {isFeatured && (
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-sm  backdrop-blur-md">
                        <HiFire className="h-3.5 w-3.5 text-orange-500" />
                        <span className="text-white text-[9px] font-black tracking-wider uppercase">Trending</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F19]/70 pointer-events-none" />
                <div className="absolute bottom-1 md:bottom-5 left-2 md:left-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/10 hover:bg-white/10 hover:backdrop-blur-sm text-orange-100 hover:text-white backdrop-blur-xs text-[0.72rem] font-bold uppercase tracking-wider transition-all duration-300">
                    <span>Read More</span>
                    <HiArrowLongRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
            </div>

            <div className={`  ${!isFeatured ? "flex flex-col gap-2 p-2 md:p-5 flex-1" : "absolute bottom-12 left-2 flex flex-col gap-2 p-2 md:p-5 flex-1 "}`}>
                <h3 className='text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2'>
                    {header}
                </h3>
                {subHeader && (
                    <p className="text-xs text-gray-400 leading-relaxed m-0 line-clamp-2">
                        {subHeader}
                    </p>
                )}
            </div>
        </Link>
    );
}

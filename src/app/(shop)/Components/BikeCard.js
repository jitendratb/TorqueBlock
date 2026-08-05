import React from 'react';
import Link from 'next/link';
import { FiActivity, FiArrowRight } from 'react-icons/fi';
import CustomImage from '@/components/molecules/CustomImage';

function BikeCard({ brand, index, className = "" }) {
    if (!brand) return null;

    const href = `/bikes/${brand.identifier || brand.slug || brand.bikeBrand?.toLowerCase().replace(/\s+/g, '-')}`;
    const imageSrc = brand?.heroImage || brand?.mobileHeroImage || brand?.image || '/placeholder.jpg';
    const brandName = brand?.bikeBrand || brand?.name || 'Motorcycle Brand';
    const modelName = brand?.bikeModel || '';
    const title = modelName ? `${brandName} ${modelName}` : brandName;

    const titleWords = title.trim().split(' ');
    const firstWord = titleWords[0];
    const restOfTitle = titleWords.slice(1).join(' ');

    return (
        <Link href={href} className={`group relative h-[320px] rounded-[2rem] border border-white/20 block shrink-0 overflow-hidden cursor-pointer ${className}`}>
            <CustomImage
                src={imageSrc}
                alt={title}
                fill
                priority={index < 6}
                imageClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end space-y-2">
                <div className="transform translate-y-0 group-hover:-translate-y-4 transition-all duration-500 delay-75 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl backdrop-blur-md">
                        <FiActivity className="text-orange-500" size={12} />
                        {modelName ? brandName : "Official Brand"}
                    </span>                </div>

                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-500">
                    <span className="text-orange-500">{firstWord}</span>
                    {restOfTitle && (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400"> {restOfTitle}</span>
                    )}
                </h3>

                <p className="text-zinc-400 text-xs font-medium italic transform translate-y-0 group-hover:-translate-y-4 transition-all duration-500 delay-150 line-clamp-2">
                    "{brand?.subTitle || 'Discover precision performance tyres & fitments.'}"
                </p>
            </div>
            <div className='absolute  top-6 right-6 border border-white/20 p-2 rounded-full bg-white/10 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0'>
                <FiArrowRight className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0" size={18} />

            </div>
        </Link>
    );
}

export default BikeCard;
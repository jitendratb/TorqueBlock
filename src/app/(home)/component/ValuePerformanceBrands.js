import React from "react";
import brandServiceInstance from "@/services/brandService";
import ValuePerformanceBrandsCarouselClient from "./ValuePerformanceBrandsCarouselClient";

async function ValuePerformanceBrands() {
    let brands = [];
    try {
        let data = await brandServiceInstance.getBrands({ isActive: true });
        const getBrandPriority = (name = "") => {
            const lower = name?.toLowerCase() || "";
            if (lower.includes('eurogrip')) return 1;
            if (lower.includes('vredestein')) return 2;
            return 3;
        };

        brands = (data?.filter((brand) =>
            brand?.name?.toLowerCase() !== 'pirelli' &&
            brand?.name?.toLowerCase() !== 'michelin' &&
            brand?.name?.toLowerCase() !== 'metzeler'
        ) || []).sort((a, b) => getBrandPriority(a?.name) - getBrandPriority(b?.name));
    } catch (error) {
        console.error("Error fetching brands:", error);
    }

    if (!brands?.length) return null;

    return (
        <section className="w-full">
            <div className='flex flex-col items-center text-center'>
                <div className='flex items-center gap-3'>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' />
                    <span className='text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000'>
                        Trusted Motorcycle Tyre Brands
                    </span>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' />
                </div>

                <h2 className='text-2xl pt-2 md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter text-black transition-colors duration-1000'>
                    Value Performance <span className='text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000'>Brands</span>
                </h2>
            </div>
            <div className="pt-8">
                <ValuePerformanceBrandsCarouselClient brands={brands} />
            </div>
        </section>
    );
}

export default ValuePerformanceBrands;
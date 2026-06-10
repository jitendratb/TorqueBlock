import React from "react";
import brandServiceInstance from "@/services/brandService";
import ValuePerformanceBrandsCarouselClient from "./ValuePerformanceBrandsCarouselClient";

async function ValuePerformanceBrands() {
    let brands = [];

    try {
        let data = await brandServiceInstance.getBrands({ isActive: true });
        brands = data?.filter((brand) =>
            brand.name.toLowerCase() !== 'pirelli' &&
            brand.name.toLowerCase() !== 'michelin' &&
            brand.name.toLowerCase() !== 'metzeler'
        );
    } catch (error) {
        console.error("Error fetching brands:", error);
    }

    if (!brands?.length) return null;

    return (
        <section className="py-8 w-full">
            <div className="mb-10 text-center">
                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em]">
                    Trusted Motorcycle Tyre Brands
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 [.light-mode_&]:text-black [.dark-mode_&]:text-white transition-colors duration-1000">
                    Value Performance <span className="text-orange-500">Brands</span>
                </h2>
            </div>

            <ValuePerformanceBrandsCarouselClient brands={brands} />

        </section>
    );
}

export default ValuePerformanceBrands;
import React from 'react'
import Breadcrumb from '@/components/atoms/BreadCrumb';
import BrandModelsClient from '../../Components/BikeModelsClient';
import { cache } from 'react';
import vehicleService from '@/services/vehicleService';
import { notFound } from 'next/navigation';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import BikeSchema from '@/components/seo/BikeSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import { getBikeFAQs } from '@/lib/seo/faqs';


const getBikeBrand = cache(async (slug) => {
    const response = await vehicleService.getBrandModels(slug);
    return response;
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const bikeBrand = await getBikeBrand(slug);

    if (!bikeBrand) return {};

    const displayTitle = bikeBrand?.bikeBrand
        ? `${bikeBrand.bikeBrand} ${bikeBrand.bikeModel} Review, Sizes & Compatible Bikes`
        : "Bike Brand Review, Sizes & Compatible Bikes";

    const displayDescription = bikeBrand?.subTitle
        || (bikeBrand?.bikeBrand ? `Explore ${bikeBrand.bikeBrand} ${bikeBrand.bikeModel} sizes, compatibility, grip performance, and reviews.` : "Explore bike brand sizes, compatibility, grip performance, and reviews.");

    const ogTitle = bikeBrand?.seo?.title || (bikeBrand?.bikeBrand ? `${bikeBrand.bikeBrand} ${bikeBrand.bikeModel} Details` : "Bike Details");

    return {
        title: bikeBrand?.seo?.title || displayTitle,
        description: bikeBrand?.seo?.description || displayDescription,
        alternates: { canonical: `https://torqueblock.com/bikes/${slug}`, },
        robots: { index: true, follow: true, },
        openGraph: {
            type: "website",
            url: `https://torqueblock.com/bikes/${slug}`,
            title: ogTitle,
            description: bikeBrand?.seo?.description || displayDescription,
            images: [
                {
                    url: bikeBrand?.heroImage || "/newLogo.webp",
                    width: 1200,
                    height: 630,
                    alt: bikeBrand?.bikeModel || "Bike",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: bikeBrand?.seo?.description || displayDescription,
            images: [bikeBrand?.heroImage || "/newLogo.webp",],
        },
    };
}

export default async function BrandPage({ params }) {
    const { slug } = await params;
    const bikeBrand = await getBikeBrand(slug);

    if (!bikeBrand) {
        notFound();
    }

    const brandName = bikeBrand?.bikeBrand ? `${bikeBrand.bikeBrand} ${bikeBrand.bikeModel}` : slug;
    const breadcrumbItems = [{ label: 'Bikes', href: '/bikes' }, { label: brandName, isLast: true },];
    const faqs = getBikeFAQs(bikeBrand);

    return (
        <div className="space-y-4 lg:space-y-6 pb-4 overflow-hidden  xl:overflow-visible">
            <Breadcrumb items={breadcrumbItems} />
            <BrandModelsClient data={bikeBrand} />

            {/* Structured JSON-LD Schema */}
            <BikeSchema bike={bikeBrand} />
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={breadcrumbItems} />
        </div>
    )
}

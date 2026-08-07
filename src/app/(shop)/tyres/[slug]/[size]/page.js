import React from 'react'
import tyresService from '@/services/tyresService';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import { formatTitle } from '@/components/atoms/FormatTitle';
import TyresSizeClient from '../../../Components/TyresSizeComponents/TyreSizeClient';
import TyreSizeSchema from '@/components/seo/TyreSizeSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ReviewService from '@/services/reviewSevice';
import { notFound } from 'next/navigation';
import { normalizeImageArray, normalizeImageString, normalizeProductImageFields } from '@/lib/utils/imageUtils';

export async function generateMetadata({ params }) {
    const { slug, size } = await params;
    const tyreBySize = await tyresService.getTyreBySize(`${slug}-${size}`);

    if (!tyreBySize) {
        return {
            title: 'Tyre Not Found - Torque Block',
            description: 'The requested tyre size could not be found.',
        };
    }

    const title = tyreBySize?.seo?.metaTitle || tyreBySize?.hero?.title || `${tyreBySize?.availableTyres?.brand?.name || ''} ${tyreBySize?.availableTyres?.productName || ''} ${tyreBySize?.size || ''} - Buy Online`.trim();
    const description = tyreBySize?.seo?.metaDescription || tyreBySize?.hero?.subtitle || tyreBySize?.description || `Buy ${title} online at Torque Block. Explore specifications, compatible bikes, and reviews.`;

    const heroImg = normalizeImageString(tyreBySize?.hero?.heroImage) || normalizeImageString(tyreBySize?.availableTyres?.hero?.heroImage);
    const availableImgs = normalizeImageArray(tyreBySize?.availableTyres?.productImages);
    const mainImage = heroImg || availableImgs[0] || '/newLogo.webp';

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.torqueblock.com/tyres/${slug}/${size}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.torqueblock.com/tyres/${slug}/${size}`,
            siteName: 'Torque Block',
            images: [
                {
                    url: mainImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [mainImage],
        },
        robots: {
            index: tyreBySize?.seo?.robots?.includes('index') ?? true,
            follow: tyreBySize?.seo?.robots?.includes('follow') ?? true,
        }
    };
}

async function Page({ params , searchParams }) {
    const { slug, size } = await params;
    const awaitedSearchParams = await searchParams;
    const opposteProductId = awaitedSearchParams?.opposteProductId;
    const tyreBySize = await tyresService.getTyreBySize(`${slug}-${size}`);


    console.log("opposteProductId", opposteProductId);
    if (!tyreBySize) {
        notFound();
    }

    const Review = await ReviewService.getReviews({ productId: tyreBySize?._id });
    const formattedData = normalizeProductImageFields(tyreBySize) || {};
    if (formattedData?.availableTyres) {
        formattedData.availableTyres = normalizeProductImageFields(formattedData.availableTyres);
    }

    const breadcrumbItems = [
        { label: 'Tyres', href: '/tyres' },
        { label: formatTitle(formattedData?.availableTyres?.productName ?? slug), href: `/tyres/${slug}` },
        { label: formatTitle(formattedData?.hero?.title ?? size), href: `/tyres/${slug}/${size}` }
    ];

    return (
        <div className="space-y-4">
            <TyreSizeSchema sizeData={formattedData} tyreSlug={slug} sizeSlug={size} />
            <BreadcrumbSchema items={breadcrumbItems} />
            <Breadcrumb items={breadcrumbItems} />
            <TyresSizeClient initialData={formattedData} reviewData={Review} opposteProductId={opposteProductId} />
        </div>
    )
}

export default Page;
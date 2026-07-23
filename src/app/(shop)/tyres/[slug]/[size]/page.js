import React from 'react'
import tyresService from '@/services/tyresService';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import {formatTitle} from '@/components/atoms/FormatTitle';
import TyresSizeClient from '../../../Components/TyresSizeComponents/TyreSizeClient';
import TyreSizeSchema from '@/components/seo/TyreSizeSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

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
                    url: tyreBySize?.hero?.heroImage || tyreBySize?.availableTyres?.hero?.heroImage || '/newLogo.webp',
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
            images: [tyreBySize?.hero?.heroImage || tyreBySize?.availableTyres?.hero?.heroImage || '/newLogo.webp'],
        },
        robots: {
            index: tyreBySize?.seo?.robots?.includes('index') ?? true,
            follow: tyreBySize?.seo?.robots?.includes('follow') ?? true,
        }
    };
}

async function Page({ params }) {
    const { slug, size } = await params;
    const tyreBySize = await tyresService.getTyreBySize(`${slug}-${size}`);


    const breadcrumbItems = [
        { label: 'Tyres', href: '/tyres' }, 
        { label: formatTitle(tyreBySize?.availableTyres?.productName ?? slug), href: `/tyres/${slug}` }, 
        { label: formatTitle(tyreBySize?.hero?.title ?? size), href: `/tyres/${slug}/${size}` }
    ];

    return (
        <div className="space-y-4">
            <TyreSizeSchema sizeData={tyreBySize} tyreSlug={slug} sizeSlug={size} />
            <BreadcrumbSchema items={breadcrumbItems} />
            <Breadcrumb items={breadcrumbItems} />
            <TyresSizeClient initialData={tyreBySize} />
        </div>
    )
}

export default Page;
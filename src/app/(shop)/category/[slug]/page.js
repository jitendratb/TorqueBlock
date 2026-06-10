import React from 'react';
import { notFound } from 'next/navigation';
import categoryServiceInstance from '@/services/categoryService';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import WebPageSchema from "@/components/seo/WebPageSchema";
import CategoryDetailsClient from '../../Components/CategoryComponents/CategoryDetailsClient';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = await categoryServiceInstance.getCategoryBySlug(slug);

    if (!category) {
        return {
            title: "Category Not Found | Torque Block",
            description: "The requested category could not be found.",
            robots: "noindex,nofollow"
        };
    }

    const title = category.seo?.metaTitle || category.openGraph?.title || `${category.name} Motorcycle Tyres | Torque Block`;
    const description = category.seo?.metaDescription || category.openGraph?.description || category.shortDescription || `Shop the best ${category.name} motorcycle tyres at Torque Block.`;
    const keywords = category.seo?.metaKeywords || category.seo?.focusKeyword || [`${category.name} tyres`, 'motorcycle tyres', 'Torque Block'];
    const canonical = `https://www.torqueblock.com/category/${slug}`;
    const ogImage = category.openGraph?.image || category.bannerImage || category.image;

    return {
        title,
        description,
        keywords,
        alternates: { canonical },
        robots: category.seo?.robots || 'index,follow',
        openGraph: {
            title: category.openGraph?.title || title,
            description: category.openGraph?.description || description,
            url: canonical,
            siteName: 'Torque Block',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ],
            locale: 'en_IN',
            type: 'website',
        }
    };
}

async function CategoryDetails({ params }) {
    const { slug } = await params;
    const category = await categoryServiceInstance.getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const breadcrumbItems = [
        { label: 'Category', href: '/category' },
        { label: category.name, isLast: true }
    ];

    const title = category.seo?.metaTitle || category.openGraph?.title || category.name;
    const description = category.seo?.metaDescription || category.openGraph?.description || category.shortDescription;

    return (
        <div className='flex flex-col gap-4'>
            <WebPageSchema
                type="CollectionPage"
                title={title}
                description={description}
                url={`https://www.torqueblock.com/category/${slug}`}
            />
            <BreadcrumbSchema items={breadcrumbItems} />
            <Breadcrumb items={breadcrumbItems} />
            <CategoryDetailsClient category={category} />
        </div>
    );
}

export default CategoryDetails;
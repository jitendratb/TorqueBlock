import React from "react";
import Breadcrumb from '@/components/atoms/BreadCrumb';
import CategoryClient from '../Components/CategoryComponents/CategoryClient';
import WebPageSchema from "@/components/seo/WebPageSchema";
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import categoryServiceInstance from "@/services/categoryService";

export const metadata = {
    title: 'Shop Motorcycle Tyres by Riding Category | Torque Block',
    description: 'Explore our premium selection of motorcycle tyres categorized by riding style. Find the perfect rubber for dual-sport, street, touring, adventure, and track racing.',
    keywords: ['motorcycle tyres', 'bike tires', 'riding category', 'dual sport tyres', 'street bike tyres', 'track day tyres', 'touring tyres', 'Torque Block'],
    alternates: { canonical: 'https://www.torqueblock.com/category' },
    openGraph: {
        title: 'Shop Motorcycle Tyres by Riding Category | Torque Block',
        description: 'Explore our premium selection of motorcycle tyres categorized by riding style. Find the perfect rubber for dual-sport, street, touring, adventure, and track racing.',
        url: 'https://www.torqueblock.com/category',
        siteName: 'Torque Block',
        images: [
            {
                url: 'https://cdn.torqueblock.com/default-category-og.webp',
                width: 1200,
                height: 630,
                alt: 'Shop Motorcycle Tyres by Riding Category'
            }
        ],
        locale: 'en_IN',
        type: 'website',
    }
};

async function Category() {
    const breadcrumbItems = [{ label: 'Category', isLast: true }];

    let categories = [];
    try {
        const data = await categoryServiceInstance.getCategory();
        categories = data;
    } catch (e) {
        console.error('Category fetch failed, using static fallback:', e.message);
    }
    return (
        <div>
            <WebPageSchema
                type="CollectionPage"
                title="Shop Motorcycle Tyres by Riding Category | Torque Block"
                description="Explore our premium selection of motorcycle tyres categorized by riding style. Find the perfect rubber for dual-sport, street, touring, adventure, and track racing."
                url="https://www.torqueblock.com/category"
            />
            <BreadcrumbSchema items={breadcrumbItems} />
            <Breadcrumb items={breadcrumbItems} />
            <CategoryClient categories={categories} />
        </div>
    );
}

export default Category;
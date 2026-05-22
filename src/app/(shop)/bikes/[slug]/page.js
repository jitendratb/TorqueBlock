import React from 'react'
import Breadcrumb from '@/components/atoms/BreadCrumb';
import BrandModelsClient from '../../Components/BikeModelsClient';

export default async function BrandPage({ params }) {
    const { slug } = await params;
    const brandName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const breadcrumbItems = [
        { label: 'Bikes', href: '/bikes' },
        { label: brandName, isLast: true },
    ];

    return (
        <div className="space-y-4 lg:space-y-6 pb-4 overflow-hidden  xl:overflow-visible">
            <Breadcrumb items={breadcrumbItems} />
            <BrandModelsClient brandSlug={slug} />
        </div>
    )
}

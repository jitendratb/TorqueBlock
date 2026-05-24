import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import compareServiceInstance from '@/services/compareService';
import CompareClient from './components/CompareClient';
import WebPageSchema from '@/components/seo/WebPageSchema';

export const metadata = {
    title: 'Tyre Battles - Torque Block',
    description: 'Compare premium motorcycle tyres and find the ultimate performance weapon. Side-by-side spec comparison of the best tyre brands.',
    alternates: { canonical: 'https://torqueblock.com/compare' },
    openGraph: {
        title: 'Tyre Battles - Torque Block',
        description: 'Compare premium motorcycle tyres and find the ultimate performance weapon.',
        url: 'https://torqueblock.com/compare',
        siteName: 'Torque Block',
        type: 'website',
        images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
    },
};

export default async function ComparePage({ searchParams }) {
    const resolvedParams = await searchParams;
    const page = parseInt(resolvedParams?.page || '1', 10);
    const limit = parseInt(resolvedParams?.limit || '12', 10);

    let initialResponse = null;
    try {
        initialResponse = await compareServiceInstance.getAllCompare({ page, limit });
    } catch (error) {
        console.error("Failed to fetch initial comparisons", error);
    }

    const initialComparisons = initialResponse?.data || [];
    const pagination = initialResponse?.pagination || {};

    const initialPage = pagination?.currentPage || page;
    const initialTotalPages = pagination?.totalPages || 1;
    const initialTotalCount = pagination?.totalItems || 0;

    const breadcrumbItems = [
        { label: 'Compare', isLast: true },
    ];

    const schemaItems = initialComparisons.map((comp) => ({
        name: comp.title || "Tyre Comparison",
        url: `/compare/${comp.slug || ''}`
    }));

    return (
        <>
            <WebPageSchema 
                type="CollectionPage"
                title="Tyre Battles - Compare Premium Motorcycle Tyres"
                description="Compare premium motorcycle tyres and find the ultimate performance weapon. Side-by-side spec comparison."
                url="/compare"
                items={schemaItems}
            />
            <div className="space-y-4 mb-4">
                <Breadcrumb items={breadcrumbItems} />
                <CompareClient
                    initialComparisons={initialComparisons}
                    initialPage={initialPage}
                    initialTotalPages={initialTotalPages}
                    initialTotalCount={initialTotalCount}
                />
            </div>
        </>
    );
}
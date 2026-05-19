import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import compareServiceInstance from '@/services/compareService';
import CompareClient from './components/CompareClient';

export const metadata = {
    title: 'Tyre Battles - Torque Block',
    description: 'Compare premium motorcycle tyres and find the ultimate performance weapon.',
};

export default async function ComparePage({ searchParams }) {
    const page = parseInt(searchParams?.page || '1', 10);
    const limit = parseInt(searchParams?.limit || '12', 10);

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

    console.log(initialResponse)

    const breadcrumbItems = [
        { label: 'Compare', isLast: true },
    ];


    return (
        <div className="space-y-4 mb-4">
            <Breadcrumb items={breadcrumbItems} />
            <CompareClient
                initialComparisons={initialComparisons}
                initialPage={initialPage}
                initialTotalPages={initialTotalPages}
                initialTotalCount={initialTotalCount}
            />
        </div>
    )
}
import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import compareServiceInstance from '@/services/compareService';
import dynamic from 'next/dynamic';
const CompareClient = dynamic(() => import('./components/CompareClient'), { ssr: true, loading: () => <div className="min-h-[500px] w-full animate-pulse bg-zinc-900 rounded-xl mt-4" /> });
import WebPageSchema from '@/components/seo/WebPageSchema';

export async function generateMetadata() {
  return {
    title: 'Compare Performance Motorcycle Tyres | Torque Block',
    description: 'Compare premium motorcycle tyres side-by-side. Analyze specifications, grip, longevity, and ratings for Pirelli, Metzeler, Michelin, and more to find the best tyre for your superbike.',
    keywords: [
      'compare motorcycle tyres',
      'tyre comparison India',
      'Pirelli vs Metzeler',
      'Michelin vs Pirelli',
      'best superbike tyre comparison'
    ],
    alternates: {
      canonical: 'https://www.torqueblock.com/compare',
    },
    openGraph: {
      title: 'Compare Performance Motorcycle Tyres | Torque Block',
      description: 'Compare premium motorcycle tyres side-by-side. Analyze specifications, grip, longevity, and ratings for Pirelli, Metzeler, and Michelin.',
      url: 'https://www.torqueblock.com/compare',
      siteName: 'Torque Block',
      images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

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
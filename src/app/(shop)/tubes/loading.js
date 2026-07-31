import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import TubesPageBanner from '../Components/TubesComponents/TubesPageBanner';
import TubeCardSkeleton from '../Components/TubesComponents/TubeCardSkeleton';

const BREADCRUMB_ITEMS = [{ label: 'Tubes', isLast: true }];

export default function Loading() {
    return (
        <main className="w-full">
            <div className="space-y-4 pb-4">
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <TubesPageBanner />
                <section className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        {[...Array(8)].map((_, i) => (
                            <TubeCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
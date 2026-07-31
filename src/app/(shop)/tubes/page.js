import React from 'react'
import Breadcrumb from '@/components/atoms/BreadCrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import TubesClint from '../Components/TubesComponents/TubesClint'
import TubesPageBanner from '../Components/TubesComponents/TubesPageBanner'
import TubesService from '@/services/TubesService';

export async function generateMetadata() {
    return {
        title: 'Premium Motorcycle Inner Tubes | Torque Block',
        description: 'Shop the best premium motorcycle inner tubes online in India. High quality tubes for all motorcycle types. Expert fitment support.',
        keywords: [
            'motorcycle tubes India',
            'superbike tubes India',
            'inner tubes Bangalore',
            'buy motorcycle tubes online',
            'heavy duty tubes'
        ],
        alternates: { canonical: 'https://www.torqueblock.com/tubes' },
        openGraph: {
            title: 'Premium Motorcycle Inner Tubes | Torque Block',
            description: 'Shop the best premium motorcycle inner tubes online in India.',
            url: 'https://www.torqueblock.com/tubes',
            siteName: 'Torque Block',
            type: 'website',
            images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
        },
    };
}

const BREADCRUMB_ITEMS = [{ label: 'Tubes', isLast: true }];

export default async function Tubes() {
    const Tubes = await TubesService.getTube({ page: 1, limit: 16})

    return (
        <main className="w-full">
            <WebPageSchema
                type="CollectionPage"
                title="Premium Motorcycle Tubes Collection"
                description="Shop the best premium motorcycle inner tubes online in India."
                url="/tubes"
            />
            <div className="space-y-4 pb-4">
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <TubesPageBanner />
                <section>
                    <TubesClint initailTubes={Tubes} />
                </section>
            </div>
        </main>
    )
}
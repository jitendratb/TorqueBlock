import React from 'react'
import tyresService from '@/services/tyresService';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import {formatTitle} from '@/components/atoms/FormatTitle';
import TyresSizeClient from '../../../Components/TyresSizeComponents/TyreSizeClient';

async function Page({ params }) {
    const { slug, size } = await params;
    const tyreBySize = await tyresService.getTyreBySize(`${slug}-${size}`);

    return (
        <div className="space-y-4 pb-4">
            <Breadcrumb items={[{ label: 'Tyres', href: '/tyres' }, { label: formatTitle(tyreBySize?.availableTyres?.productName ?? slug), href: `/tyres/${slug}` }, { label: formatTitle( tyreBySize?.hero?.title ?? size) }]} />
            <TyresSizeClient initialData={tyreBySize} />
        </div>
    )
}

export default Page;
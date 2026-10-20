"use client";

import React, { useEffect, useState } from 'react';
import Description from './Description';
import BuyingGuide from './BuyingGuide';
import CompatibleBikesSection from './CompatibleBikesSection';
import FAQSection from '@/components/atoms/FAQSection';
import SubProductDetails from '../SubProductDetails';
import ReviewsCard from '@/components/atoms/reviewCard';
import TyreSection from '../NewLaunchTyres';
import TubeSection from './TubeSection';
import SimilarTyre from '@/components/atoms/SimilarTyre';

function TyreSizeClient({ initialData, opposteProductId }) {
    const [tyreSize] = useState(initialData);
    const [productIds, setProductIds] = useState([]);
    useEffect(() => {
        if (tyreSize?.availableTyres?.length > 0) {
            setProductIds(tyreSize?.availableTyres?.map((item) => item?._id));
        }
    }, [tyreSize])

    const isTubeType = tyreSize?.tubeType?.includes?.("TT") || tyreSize?.tubeType === "TT";
    // Cards need populated size records; bare ids fall back to the category section
    const hasSimilorTyre = tyreSize?.similorTyre?.some?.((item) => item && typeof item === "object");
    const tyreName = tyreSize?.availableTyres?.productName;
    const similarTitle = tyreName ? `Alternatives to ${tyreName}` : "Similar Tyres";
    const similarSubtitle = tyreSize?.size
        ? `Hand-picked tyres to compare with this ${tyreSize.size}: check grip, mileage and price before you buy`
        : "Hand-picked tyres to compare: check grip, mileage and price before you buy";
    const categoryName = tyreSize?.availableTyres?.categoryId?.name;

    console.log(tyreSize)

    return (
        <div className="flex flex-col gap-4  py-2 relative">
            <SubProductDetails tyreData={tyreSize} setProductIds={setProductIds} opposteProductId={opposteProductId} />
            <Description tyreData={tyreSize} />
            <BuyingGuide tyreData={tyreSize} />
            <CompatibleBikesSection
                compatibleModel={tyreSize?.compatibleModel}
                popularBikes={tyreSize?.quickFacts?.popularBikes}
            />
            {isTubeType && (
                <TubeSection productIds={productIds} />
            )}

            {hasSimilorTyre ? (
                <SimilarTyre items={tyreSize.similorTyre} title={similarTitle} subtitle={similarSubtitle} />
            ) : (
                <TyreSection
                    categoryId={tyreSize?.availableTyres?.categoryId?._id}
                    title="Riders Also Viewed"
                    subtitle={categoryName ? `Popular ${categoryName} tyres from top brands` : "Popular tyres from top brands"}
                />
            )}

            <FAQSection faqs={tyreSize?.faqs} />
        </div>
    );
}

export default TyreSizeClient;
